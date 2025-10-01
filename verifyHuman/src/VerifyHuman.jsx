import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const VerifyHuman = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!showCaptcha) {
      // First click: show captcha
      setShowCaptcha(true);
    } else {
      // Second click: verify captcha
      const captchaValue = recaptchaRef.current.getValue();
      if (!captchaValue) {
        alert("Please verify that you are human.");
      } else {
        alert("Form submitted!");
        // Here you can actually submit the form or call your login API
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign in</h2>
      <form onSubmit={handleSignIn} style={styles.form}>
        <label>Email:</label>
        <input type="email" name="email" required style={styles.input} />

        <label>Password:</label>
        <input type="password" name="password" required style={styles.input} />

        <div style={styles.forgot}>
          <a href="#">Forgot password?</a>
        </div>

        {showCaptcha && (
          <div style={{ marginBottom: "15px" }}>
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY"
              ref={recaptchaRef}
            />
          </div>
        )}

        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    backgroundColor: "#2c2c2c",
    color: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#1a1a1a",
    color: "white"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  forgot: {
    textAlign: "right",
    marginBottom: "15px"
  }
};

export default VerifyHuman;
