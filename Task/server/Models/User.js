const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  f_sno: {
    type: Number,
    required: true,
    unique: true,
  },
  f_userName: {
    type: String,
    required: true,
    unique: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("f_Pwd")) {
    return next();
  }
  try {
        const salt = await bcrypt.genSalt(10);
    this.f_Pwd = await bcrypt.hash(this.f_Pwd, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
        return await bcrypt.compare(enteredPassword, this.f_Pwd);
  } catch (error) {
        console.error("Error comparing password:", error);
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema, "t_login");
