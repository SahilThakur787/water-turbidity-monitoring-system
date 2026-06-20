// Import navigation tools
import { Link, useNavigate } from "react-router-dom";

// Import CSS
import "../Styles/Components/Navbar.css";

// Navbar component
function Navbar() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* App title */}
      <h2 className="navbar-logo">Water Turbidity App</h2>

      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </nav>
  );
}

export default Navbar;