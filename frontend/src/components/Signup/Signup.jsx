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

const Signup = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Signup</h1>
      <span>
        Already haven an account?
        <button onClick={() => navigate("/login")}>Login</button>
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
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Enter your password"
        value={props.passwordConfirm}
        onChange={(e) => props.setPasswordConfirm(e.target.value.trim())}
      />
      <button onClick={props.handleSignup}>Signup</button>
    </Container>
  );
};

export default Signup;
