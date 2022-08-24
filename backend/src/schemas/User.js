import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  info: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  verificationToken: {
    type: String,
  },
  passwordResetToken: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  signedIn: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
