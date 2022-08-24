import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/verify");
    }, 3000);
  }, [navigate]);

  return (
    <div>
      <h1>Thanks for Signing Up!</h1>
      <p>
        A verification email has been sent to the email address your provided.
        Please verify your email to access your account.
      </p>
    </div>
  );
};

export default VerifyPage;
