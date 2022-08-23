import React from "react";
import styled from "styled-components";

const Container = styled.h2`
  color: tomato;
  text-align: center;
`;

const Error = ({ error }) => {
  return <Container>{error}</Container>;
};

export default Error;
