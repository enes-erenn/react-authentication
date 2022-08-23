import db from "../db";
import User from "../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password, createdAt } = req.body;

    await db.connect();

    const isThereAlready = await User.findOne({ email });

    if (isThereAlready) {
      return res.status(409).send({
        result: "duplicate error",
        message: "There is already an account with that email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      email,
      password: hashedPassword,
      createdAt,
      signedIn: createdAt,
    });

    await user.save();

    console.log(user);

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

    res.status(200).send({
      email: user.email,
      token,
    });

    return await db.disconnect();
  },
};
