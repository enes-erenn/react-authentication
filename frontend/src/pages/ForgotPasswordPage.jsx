import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const ForgotPasswordPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      await axios
        .put(`http://localhost:8080/api/forgot-password/${email}`)
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    } catch (err) {
      setError("Something went wrong.");
      console.log(err);
    }
  };

  return success ? (
    <>
      <h1>Success</h1>
      <p>Check your email for a reset link.</p>
    </>
  ) : (
    <>
      <h1>Forgow Password</h1>
      <p>Enter your email and we'll send you a reset link</p>
      {error && <Error error={error} />}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />
      <button onClick={handleSendEmail}>Send</button>
    </>
  );
};

export default ForgotPasswordPage;
