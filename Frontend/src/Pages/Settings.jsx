import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Pages/Settings.css";

function Settings() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-card">
          <p>🌙 Dark Mode: {settings.dark_mode ? "ON" : "OFF"}</p>
          <p>🔔 Notifications: {settings.notifications ? "ON" : "OFF"}</p>
          <p>⚙ Dirty Water Limit: {settings.threshold} NTU</p>
        </div>

      </div>
    </div>
  );
}

export default Settings;