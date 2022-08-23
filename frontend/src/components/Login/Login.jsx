import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
`;

const Login = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Login</h1>
      <span>
        Don't have an account?
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </span>
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value.trim())}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value.trim())}
      />
      <button onClick={props.handleLogin}>Login</button>
      <button onClick={() => navigate("/forgot-password")}>
        Forgot your password?
      </button>
    </Container>
  );
};

export default Login;
