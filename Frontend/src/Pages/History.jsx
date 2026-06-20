// React hooks
import { useState, useEffect } from "react";

// Import Navbar component
import Navbar from "../Components/Navbar";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
      });
  }, []);

  const handleClearHistory = async () => {
    try {
      await fetch("http://127.0.0.1:8000/clear-history", {
        method: "DELETE",
      });

      setHistory([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🔥 Inline Styles
  const styles = {
    container: {
      padding: "30px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    button: {
      marginBottom: "15px",
      padding: "10px 16px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#0f172a",
      color: "white",
      padding: "10px",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
      textAlign: "center",
    },
    empty: {
      textAlign: "center",
      padding: "20px",
      color: "#64748b",
    }
  };

  return (
    <div>

      <Navbar />

      <div style={styles.container}>

        <h1 style={styles.title}>Water History Records</h1>

        {/* Clear Button */}
        <button style={styles.button} onClick={handleClearHistory}>
          Clear History
        </button>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Turbidity</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>

            {history.length === 0 ? (
              <tr>
                <td colSpan="4" style={styles.empty}>
                  No Data Available
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{new Date().toLocaleDateString()}</td>
                  <td style={styles.td}>{item.time}</td>
                  <td style={styles.td}>{item.turbidity} NTU</td>
                  <td style={styles.td}>
                    {item.status === "clean" ? "Clean" : "Dirty"}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default History;