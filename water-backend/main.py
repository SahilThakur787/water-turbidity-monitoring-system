from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal
import models
from models import SensorData as SensorModel, User

from database import engine, Base
from models import User, SensorData   # VERY IMPORTANT

Base.metadata.create_all(bind=engine)

# ------------------ SCHEMAS ------------------

class SensorData(BaseModel):
    turbidity: int = Field(ge=0, le=4095)


class UserRegister(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# ------------------ APP ------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"   #  ADD THIS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------ VARIABLES ------------------

alerts_data = []
DIRTY_LIMIT = 1700
total_readings = 0
clean_count = 0
dirty_count = 0


# ------------------ BASIC ROUTES ------------------

@app.get("/")
def home():
    return {"message": "Backend Running"}


@app.get("/health")
def health():
    return {"server": "running"}


# ------------------ SENSOR DATA ------------------

@app.post("/sensor-data")
def sensor_data(data: SensorData):
    global total_readings, clean_count, dirty_count

    db = SessionLocal()

    turbidity = data.turbidity
    total_readings += 1

    if turbidity < DIRTY_LIMIT:
        status = "dirty"

        alerts_data.append({
            "message": "Dirty water detected",
            "turbidity": turbidity,
            "time": datetime.now().strftime("%H:%M:%S")
        })
    else:
        status = "clean"

    if status == "clean":
        clean_count += 1
    else:
        dirty_count += 1

    # SAVE TO DATABASE
    new_entry = SensorModel(
        turbidity=turbidity,
        status=status,
        time=datetime.now().strftime("%H:%M:%S")
    )

    db.add(new_entry)
    db.commit()
    db.close()

    return {
        "message": "Sensor data received",
        "turbidity": turbidity,
        "status": status
    }


# ------------------ HISTORY ------------------

@app.get("/history")
def get_history():
    db = SessionLocal()

    data = db.query(SensorModel).all()

    result = []
    for item in data:
        result.append({
            "turbidity": item.turbidity,
            "status": item.status,
            "time": item.time
        })

    db.close()
    return result


# ------------------ ALERTS ------------------

@app.get("/alerts")
def get_alerts():
    return alerts_data if alerts_data else [{"message": "No alerts"}]


# ------------------ STATS ------------------

@app.get("/stats")
def stats():
    return {
        "total_readings": total_readings,
        "clean_readings": clean_count,
        "dirty_readings": dirty_count
    }


# ------------------ CLEAR HISTORY ------------------

@app.delete("/clear-history")
def clear_history():
    db = SessionLocal()

    db.query(SensorModel).delete()   #  DELETE ALL DATA
    db.commit()
    db.close()

    return {"message": "History cleared from database"}


# ------------------ AVERAGE ------------------

@app.get("/average")
def average():
    db = SessionLocal()

    try:
        data = db.query(SensorModel).all()

        if not data:
            return {"average_turbidity": 0}

        avg = sum(item.turbidity for item in data) / len(data)

        return {"average_turbidity": avg}

    finally:
        db.close()

# ------------------ USER AUTH ------------------

@app.post("/signup")
def signup(data: UserRegister):
    db = SessionLocal()

    print("👉 API HIT:", data.email, data.password)

    try:
        new_user = User(
            email=data.email,
            password=data.password
        )

        db.add(new_user)
        db.commit()

        print(" INSERTED SUCCESSFULLY")

    except Exception as e:
        print(" ERROR:", e)

    finally:
        db.close()

    return {"message": "done"}


@app.post("/login")
def login(data: UserLogin):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.password != data.password:
        raise HTTPException(status_code=401, detail="Wrong password")

    db.close()

    return {
       "message": "Login success",
       "email": user.email
}


# ------------------ STATIC DATA ------------------

@app.get("/profile")
def profile():
    return {
        "name": "Sahil Thakur",
        "email": "sahil@example.com",
        "role": "Admin",
        "project": "Water Turbidity Monitoring"
    }


@app.get("/settings")
def settings():
    return {
        "dark_mode": False,
        "notifications": True,
        "dirty_water_limit": DIRTY_LIMIT,
        "unit": "NTU"
    }



@app.get("/dashboard-summary")
def dashboard_summary():
    db = SessionLocal()

    try:
        data = db.query(SensorModel).all()

        if not data:
            return {
                "latest_reading": {
                    "turbidity": 0,
                    "status": "No Data",
                    "time": "--:--:--"
                },
                "total_readings": 0,
                "clean_count": 0,
                "dirty_count": 0,
                "average_turbidity": 0
            }

        latest = data[-1]

        clean = sum(1 for d in data if d.status == "clean")
        dirty = sum(1 for d in data if d.status == "dirty")

        avg = sum(d.turbidity for d in data) / len(data)

        return {
            "latest_reading": {
                "turbidity": latest.turbidity,
                "status": latest.status,
                "time": latest.time
            },
            "total_readings": len(data),
            "clean_count": clean,
            "dirty_count": dirty,
            "average_turbidity": avg
        }

    finally:
        db.close()