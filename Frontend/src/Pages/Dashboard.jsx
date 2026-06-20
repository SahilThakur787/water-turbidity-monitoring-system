import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Styles/Pages/Dashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [turbidity, setTurbidity] = useState(0);
  const [status, setStatus] = useState("No Data");
  const [motorOn, setMotorOn] = useState(false);
  const [currentTime, setCurrentTime] = useState("--:--:--");

  const [chartData, setChartData] = useState([]);

  // LOGIN CHECK
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // FETCH DATA FROM FASTAPI
  useEffect(() => {
    const fetchData = () => {
      fetch("http://127.0.0.1:8000/dashboard-summary")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Server Error");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.latest_reading) {
            const latest = data.latest_reading;

            setTurbidity(latest.turbidity || 0);
            setStatus(latest.status || "No Data");
            setCurrentTime(latest.time || "--:--:--");

            setChartData((prev) => {
              const newData = [
                ...prev,
                {
                  time: latest.time,
                  value: latest.turbidity
                }
              ];

              // Keep only latest 10 readings
              if (newData.length > 10) {
                newData.shift();
              }

              return newData;
            });
          }
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMotor = () => {
    setMotorOn((prev) => !prev);
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Water Monitoring Dashboard
        </h1>

        <div className="dashboard-cards">

          {/* Turbidity */}
          <div className="dashboard-card">
            <h2>Turbidity</h2>
            <p>{turbidity} NTU</p>
          </div>

          {/* Turbidity Level */}
          <div className="dashboard-card">
            <h2>Turbidity Level</h2>

            <div className="progress-bar">
              <div
                className={
                  status === "clean"
                    ? "progress-fill clean-bar"
                    : "progress-fill dirty-bar"
                }
                style={{
                  width: `${Math.min(
                    (turbidity / 4095) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <p>{turbidity} NTU</p>
          </div>

          {/* Status */}
          <div className="dashboard-card">
            <h2>Status</h2>
  

            <p
              className={
                status === "clean"
                  ? "status clean"
                  : "status dirty"
              }
            >
              {status === "clean"
                ? "Clean Water"
                : "Dirty Water"}
            </p>
          </div>

          {/* Time */}
          <div className="dashboard-card">
            <h2>Last Updated</h2>
            <p>{currentTime}</p>
          </div>

          {/* Motor */}
          <div className="dashboard-card">
            <h2>Motor Control</h2>

            <button
              className={
                motorOn
                  ? "motor-btn off"
                  : "motor-btn"
              }
              onClick={handleMotor}
            >
              {motorOn ? "Turn OFF" : "Turn ON"}
            </button>
          </div>

          {/* Chart */}
          <div className="dashboard-card chart-card">
            <h2>Turbidity Trend</h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;