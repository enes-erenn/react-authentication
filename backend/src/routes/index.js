import { login } from "./auth/login";
import { signup } from "./auth/signup";
import { testRoute } from "./testRoute";
import { updateUserInfo } from "./updateUserInfo";

export const routes = [testRoute, signup, login, updateUserInfo];
