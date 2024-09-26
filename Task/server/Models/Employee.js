const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  f_Id: { type: String, required: true, unique: true },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_Gender: { type: String, required: true },
  f_Course: { type: [String], required: true },
  f_Image: { type: String, required: false },   f_Createdate: {
    type: Date,
    default: Date.now,   },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema, "t_Employee");

module.exports = Employee;
