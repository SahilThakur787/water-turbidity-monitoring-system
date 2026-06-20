# 💧 Water Turbidity Monitoring System

## 📌 Project Overview

The Water Turbidity Monitoring System is an IoT-based solution designed to monitor water quality in real time. The system uses a turbidity sensor connected to an ESP32 microcontroller to measure water clarity. Sensor readings are transmitted over Wi-Fi to a FastAPI backend, stored in a database, and visualized through a React-based dashboard.

This project helps identify whether water is clean or contaminated and provides real-time monitoring, history tracking, and alert generation.

---

# 🎯 Problem Statement

Water contamination is a major concern in industries, agriculture, and public water supply systems. Traditional water testing methods are often manual and time-consuming.

This project aims to provide a low-cost, real-time, and automated water quality monitoring solution using IoT technologies.

---

# 🚀 Features

* Real-time turbidity monitoring
* ESP32 Wi-Fi connectivity
* FastAPI backend integration
* Water quality classification (Clean / Dirty)
* Historical data storage
* Interactive dashboard visualization
* User authentication (Login & Signup)
* Alert generation for contaminated water
* REST API architecture
* Responsive frontend interface

---

# 🛠 Hardware Components

| Component        | Description                |
| ---------------- | -------------------------- |
| ESP32 Dev Board  | Main microcontroller       |
| Turbidity Sensor | Measures water clarity     |
| Jumper Wires     | Hardware connections       |
| USB Cable        | Programming and power      |
| Laptop/PC        | Development and monitoring |

---

# 💻 Software Technologies

## Frontend

* React JS
* Vite
* React Router
* Recharts
* CSS

## Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

## Database

* SQLite

## Programming Languages

* Python
* JavaScript
* C++

---

# 🏗 System Architecture

```text
Turbidity Sensor
        │
        ▼
      ESP32
        │
   Wi-Fi Network
        │
        ▼
   FastAPI Backend
        │
        ▼
     Database
        │
        ▼
   React Dashboard
```

---

# ⚙ Working Principle

1. The turbidity sensor continuously measures water clarity.
2. ESP32 reads analog values from the sensor.
3. ESP32 sends readings to the FastAPI backend using HTTP requests.
4. FastAPI processes and stores the sensor data.
5. Water quality is classified as Clean or Dirty.
6. Data is saved in the database.
7. React Dashboard displays:

   * Current turbidity
   * Water status
   * Historical records
   * Alerts
   * Statistics

---

# 📊 Water Classification Logic

Based on sensor calibration:

| Sensor Reading | Water Status |
| -------------- | ------------ |
| Above 1700     | Clean Water  |
| Below 1700     | Dirty Water  |

The threshold can be adjusted according to sensor calibration and water testing requirements.

---

# 🔌 ESP32 Setup

### Install Arduino IDE

Download Arduino IDE and install ESP32 board support.

### Required Libraries

* WiFi.h
* HTTPClient.h

### Upload ESP32 Code

Configure:

```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

const char* serverName =
"http://YOUR_PC_IP:8000/sensor-data";
```

Upload the code to ESP32.

---

# ⚡ Backend Setup

Navigate to backend folder:

```bash
cd water-backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Swagger API:

```text
http://127.0.0.1:8000/docs
```

---

# 🌐 Frontend Setup

Navigate to frontend folder:

```bash
cd water-frontend
```

Install dependencies:

```bash
npm install
```

Run project:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📁 Project Structure

```text
Water-Turbidity-Monitoring-System
│
├── water-backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── requirements.txt
│
├── water-frontend
│   ├── src
│   ├── public
│   ├── package.json
│
├── README.md
│
└── .gitignore
```

---

# 🏭 Industrial Applications

### Water Treatment Plants

* Monitor water quality before distribution.
* Detect contamination levels in real time.

### Industrial Manufacturing

* Monitor wastewater quality.
* Ensure environmental compliance.

### Agriculture

* Monitor irrigation water quality.
* Improve crop health and productivity.

### Aquaculture

* Maintain healthy water conditions in fish farms.
* Reduce risk of aquatic diseases.

### Smart Cities

* Integrate with IoT-based monitoring systems.
* Enable automated water quality management.

### Environmental Monitoring

* Monitor rivers, lakes, and reservoirs.
* Detect pollution early.

---

# 🔮 Future Enhancements

* Automatic motor/pump control
* SMS alert notifications
* Email alerts
* Cloud deployment
* Mobile application integration
* AI-based water quality prediction
* Multiple sensor support (pH, TDS, Temperature)

---

# 📸 Project Screenshots

## Login Page

(Add Screenshot Here)

## Dashboard

(Add Screenshot Here)

## History Page

(Add Screenshot Here)

## Alerts Page

(Add Screenshot Here)

## Hardware Setup

(Add Screenshot Here)

---

# 👨‍💻 Author

**Sahil Thakur**

B.Tech Computer Science Engineering

Shoolini University

---

# ⭐ If you found this project useful, consider giving it a star on GitHub.
