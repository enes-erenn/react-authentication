import { createGoogleUser } from "../utils/createGoogleUser";
import { getGoogleUser } from "../utils/getGoogleUser";
import jwt from "jsonwebtoken";

export const googleOAuthCallback = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;

    // Returns the google account of user with infos
    const oauthUserInfo = await getGoogleUser({ code });

    // This func is creates or updates the google user
    const updatedUser = await createGoogleUser({ oauthUserInfo });

    const { _id: id, isVerified, email, info } = updatedUser;

    // Sends the user token
    const token = jwt.sign(
      { id, isVerified, email, info },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Redirecets to the
    res.redirect(`http://localhost:3000/login?token=${token}`);
  },
};
