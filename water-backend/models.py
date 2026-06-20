# Import column types
from sqlalchemy import Column, Integer, String

# Import Base from database (IMPORTANT: do NOT create new Base)
from database import Base


# ------------------ SENSOR DATA TABLE ------------------

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    turbidity = Column(Integer)
    status = Column(String(50))
    time = Column(String(50))


# ------------------ USER TABLE ------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))              # added name (important for your signup)
    email = Column(String(100), unique=True)
    password = Column(String(200))