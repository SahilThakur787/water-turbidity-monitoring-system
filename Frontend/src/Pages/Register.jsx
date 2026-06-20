import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Registration failed");
      return;
    }

    alert("User Registered Successfully ✅");

    navigate("/"); // go to login page

  } catch (error) {
    console.error("Error:", error);
  }
};

  // ✅ Styles object
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9"
    },
    title: {
      marginBottom: "20px",
      color: "#0f172a"
    },
    input: {
      width: "280px",
      padding: "12px",
      marginBottom: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "14px"
    },
    button: {
      width: "300px",
      padding: "12px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px"
    },
    link: {
      marginTop: "15px",
      color: "#2563eb",
      cursor: "pointer",
      fontSize: "14px"
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Create Account</h2>

      <input
        style={styles.input}
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={handleRegister}>
        Register
      </button>

      <p style={styles.link} onClick={() => navigate("/")}>
        Already have an account? Login
      </p>

    </div>
  );
}

export default Register;