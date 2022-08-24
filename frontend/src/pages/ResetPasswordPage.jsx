import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ResetPasswordFail from "./ResetPasswordFail";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { passwordResetToken } = useParams();

  const handleResetPassword = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/reset-password/${passwordResetToken}`,
        {
          password,
        }
      );
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setIsFailure(false);
    }
  };

  if (isFailure) return <ResetPasswordFail />;
  if (isSuccess) return <ResetPasswordSuccess />;

  return (
    <>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
        placholder="Password"
      />
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value.trim())}
        placholder="Password Confirm"
      />
      <button onClick={handleResetPassword}>Send</button>
    </>
  );
};

export default ResetPasswordPage;
