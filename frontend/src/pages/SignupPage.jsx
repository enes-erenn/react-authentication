import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Signup from "../components/Signup/Signup";
import useToken from "../hooks/auth/useToken";

const SignupPage = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    if (password !== passwordConfirm) {
      return setError("Passwords do not match.");
    }
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/api/signup", {
          email,
          password,
          createdAt: new Date(),
        })
        .then((res) => {
          setToken(res.data.token);
          navigate("/verify");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Watches the Error state and handles if there is no error
  useEffect(() => {
    if (password.length > 3) {
      return setError("");
    }
    if (password === passwordConfirm) {
      return setError("");
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <Signup
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        handleSignup={handleSignup}
        setEmail={(email) => setEmail(email)}
        setPassword={(password) => setPassword(password)}
        setPasswordConfirm={(password) => setPasswordConfirm(password)}
      />
      {error && <Error error={error} />}
    </>
  );
};

export default SignupPage;
