import db from "../../db";
import User from "../../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    // Getting data from the request
    const { email, password, createdAt } = req.body;

    // Connecting the Database (This is a custom func, be aware of that it is not a built-in func of the packages)
    await db.connect();

    const isThereAlready = await User.findOne({ email });

    // If there is a user with the same email, then stop the signing-up process.
    if (isThereAlready) {
      return res.status(409).send({
        result: "duplicate error",
        message: "There is already an account with that email.",
      });
    }

    // If there is no duplicate error, then hash the raw password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Sending user to the Database
    const user = await new User({
      email,
      password: hashedPassword,
      createdAt,
      signedIn: createdAt,
    });

    await user.save();

    // Generating jwt token to allow user to use the application
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Sending response to the request
    res.status(200).send({
      id: user._id,
      createdAt: user.createdAt,
      signedIn: user.signedIn,
      email: user.email,
      token,
    });

    // Disconnecting from the database
    return await db.disconnect();
  },
};
