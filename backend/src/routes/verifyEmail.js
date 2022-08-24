import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import db from "../db";
import User from "../schemas/User";

export const verifyEmail = {
  path: "/api/verify",
  method: "put",
  handler: async (req, res) => {
    const { verificationToken } = req.body;
    await db.connect();

    const result = await User.findOne({
      verificationToken,
    });

    if (!result) {
      return res
        .status(401)
        .json({ message: "The email verification code is incorrect!" });
    }

    const { _id: id, email, info } = result;

    await User.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: { isVerified: true },
      }
    );

    const token = jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token });

    await db.disconnect();
  },
};
