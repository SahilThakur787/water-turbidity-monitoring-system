import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Pages/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-card">
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
          <p>Project: {profile.project}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;