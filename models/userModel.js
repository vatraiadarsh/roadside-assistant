const bcrypt = require("bcryptjs");
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
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
      required: true,
    },
    avatar: {
      type: String,
      default: "uploads/noavatar.jpg",
    },
    role: {
      type: String,
      enum: ["user", "professional", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
