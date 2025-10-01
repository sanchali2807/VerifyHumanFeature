import React, { useState, useEffect } from "react";

const VerifyHuman = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  // Email validation regex
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // Password validation: must be alphanumeric, at least 8 chars
  const validatePassword = (value) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;
    return regex.test(value);
  };

  // Debounced validation for BOTH email + password
  useEffect(() => {
    const timer = setTimeout(() => {
      // email
      if (email && !validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }

      // password
      if (password && !validatePassword(password)) {
        setPasswordError(
          "Password must be at least 8 characters long and contain only letters and numbers."
        );
      } else {
        setPasswordError("");
      }

      // checkbox logic
      if (email.trim() !== "" && password.trim() !== "") {
        setShowCheckbox(true);
      } else {
        setShowCheckbox(false);
        setIsHuman(false);
      }
    }, 800); // increased debounce to 800ms for more realistic "user finished typing"

    return () => clearTimeout(timer);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain only letters and numbers."
      );
      return;
    }

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
          {emailError && <span style={styles.error}>{emailError}</span>}

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {passwordError && <span style={styles.error}>{passwordError}</span>}

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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
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
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1a1a1a",
    color: "white",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
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
