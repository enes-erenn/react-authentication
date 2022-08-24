import db from "../../db";
import User from "../../schemas/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../../utils/sendEmail";

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

    const verificationToken = uuidv4();

    // Sending user to the Database
    const user = new User({
      email,
      password: hashedPassword,
      createdAt,
      signedIn: createdAt,
      verificationToken,
    });

    await user.save();

    // Sending verification token to the email
    try {
      await sendEmail({
        to: email,
        from: "info@digicafes.com",
        subject: "Please verify your email",
        text: `
        Thanks for signing up! To verify your email, click here:
        http://localhost:3000/verify/${verificationToken}
        `,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }

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
      token,
    });

    // Disconnecting from the database
    return await db.disconnect();
  },
};
