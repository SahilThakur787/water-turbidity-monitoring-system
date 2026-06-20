import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Pages/Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="alerts-container">
        <h1 className="alerts-title">System Alerts</h1>

        {alerts.map((alert, index) => (
          <div key={index} className={`alert-card ${alert.type}`}>
            {alert.message}
          </div>
        ))}

      </div>
    </div>
  );
}

export default Alerts;