import React, { useState, useEffect } from "react";

const VerifyHuman = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  useEffect(() => {
    let timer;
    if (email.trim() !== "" && password.trim() !== "") {
      timer = setTimeout(() => {
        setShowCheckbox(true);
      }, 500);
    } else {
      setShowCheckbox(false);
      setIsHuman(false);
    }
    return () => clearTimeout(timer);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showCheckbox) {
      alert("Please fill both email and password first.");
      return;
    }
    if (!isHuman) {
      alert("Please confirm that you are not a robot.");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Sign in</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {showCheckbox && (
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="notRobot"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
              />
              <label htmlFor="notRobot" style={{ marginLeft: "8px" }}>
                I am not a robot
              </label>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
  position: "fixed",        // make sure it covers whole screen
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center",     // center vertically
  backgroundColor: "#1a1a1a",
},

  container: {
    backgroundColor: "#2c2c2c",
    color: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 15px rgba(0,0,0,0.6)", // subtle shadow
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1a1a1a",
    color: "white",
    outline: "none",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default VerifyHuman;
