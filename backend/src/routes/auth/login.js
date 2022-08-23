import db from "../../db";
import User from "../../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    // Getting data from the request
    const { email, password } = req.body;

    // Connecting the Database (This is a custom func, be aware of that it is not a built-in func of the packages)
    await db.connect();

    const user = await User.findOne({ email });

    // If there is not a user with that email, then stop the logging-in process.
    if (!user) {
      return res
        .status(401)
        .send({ result: "not found", message: "User not found." });
    }

    // Comparing the passwords that come from the request with the database
    const isCorrect = await bcrypt.compare(password, user.password);

    // If the password is correct then generate a token to allow user to use the application
    if (isCorrect) {
      const token = jwt.sign(
        {
          id: user._id,
          createdAt: user.createdAt,
          signedIn: user.signedIn,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Sending response to the request
      res.status(200).send({
        id: user._id,
        createdAt: user.createdAt,
        signedIn: user.signedIn,
        email: user.email,
        token,
      });
    }

    return await db.disconnect();
  },
};
