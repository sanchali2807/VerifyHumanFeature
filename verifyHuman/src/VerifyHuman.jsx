import React, { useState, useEffect } from "react";

const VerifyHuman = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  useEffect(() => {
    let timer;
    if (email.trim() !== "" && password.trim() !== "") {
      // Show checkbox after 500ms
      timer = setTimeout(() => {
        setShowCheckbox(true);
      }, 600);
    } else {
      setShowCheckbox(false);
      setIsHuman(false);
    }
    return () => clearTimeout(timer); // Cleanup if fields change
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
    // Call your login API here
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

          <button type="submit" style={styles.button}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
  },
  container: {
    backgroundColor: "#2c2c2c",
    color: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default VerifyHuman;
