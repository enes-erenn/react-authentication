import { login } from "./auth/login";
import { signup } from "./auth/signup";
import { forgotPassword } from "./forgotPassword";
import { resetPassword } from "./resetPassword";
import { testEmailRoute } from "./testEmailRoute";
import { testRoute } from "./testRoute";
import { updateUserInfo } from "./updateUserInfo";
import { verifyEmail } from "./verifyEmail";

export const routes = [
  testRoute,
  signup,
  login,
  updateUserInfo,
  testEmailRoute,
  verifyEmail,
  forgotPassword,
  resetPassword,
];
