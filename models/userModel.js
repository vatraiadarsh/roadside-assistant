const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"],
      required: true,
    },
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: [true, "please select your gender"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },

    date_of_birth: {
      type: Date,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "professional", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
