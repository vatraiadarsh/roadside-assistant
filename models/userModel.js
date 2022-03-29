const bcrypt = require('bcryptjs');
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
      required: [true, "Date of birth is required"],
    },
    mobile_number: {
      type: Number,
      required: [true, "Mobile number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
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



userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (next){
  if(this.isModified("password")){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
  }
})





const User = mongoose.model("User", userSchema);
module.exports = User;
