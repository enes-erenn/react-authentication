import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../hooks/auth/useToken";
import Error from "../components/Error";
import Login from "../components/Login/Login";
import { useQueryParams } from "../utils/useQueryParams";

const LoginPage = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token: oauthToken } = useQueryParams();
  const [googleOAuthUrl, setGoogleOAuthUrl] = useState("");

  const handleLogin = async (e) => {
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/api/login", {
          email,
          password,
          signedIn: new Date(),
        })
        .then((res) => {
          setToken(res.data.token);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // This Url is for make user ready to use google authentication
  useEffect(() => {
    const loadOAuthUrl = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/google/url"
        );
        const { url } = response.data;
        setGoogleOAuthUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    loadOAuthUrl();
  }, []);

  // If there is token then allow user to access the website
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/");
    }
  }, [oauthToken, setToken, navigate]);

  // Watches the Error state and handles if there is no error
  useEffect(() => {
    if (password.length > 3) {
      return setError("");
    }
  }, [password]);

  return (
    <>
      <Login
        email={email}
        setEmail={(email) => setEmail(email)}
        password={password}
        handleLogin={handleLogin}
        googleOAuthUrl={googleOAuthUrl}
        setPassword={(password) => setPassword(password)}
      />
      {error && <Error error={error} />}
    </>
  );
};

export default LoginPage;
