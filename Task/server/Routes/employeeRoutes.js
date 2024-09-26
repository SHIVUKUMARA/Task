const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Employee = require("../Models/Employee");

const router = express.Router();

const uploadPath = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Uploading to: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log(`Received file: ${file.originalname}`);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("f_Image"), async (req, res) => {
  // console.log(req.file);
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
    req.body;
  const f_Image = req.file ? req.file.filename : null;

  if (!f_Image) {
    return res.status(400).json({ message: "File not uploaded" });
  }

  try {
    const newEmployee = new Employee({
      f_Id,
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course: Array.isArray(f_Course) ? f_Course : [f_Course],
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: err.message });
  }
});


// Get all Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Single Employee by f_Id
router.get("/:f_Id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ f_Id: req.params.f_Id });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Employee by f_Id
router.put("/:f_Id", upload.single("f_Image"), async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
    req.body;
  const f_Image = req.file ? req.file.filename : null; 

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_Id: req.params.f_Id },
      {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course: Array.isArray(f_Course) ? f_Course : [f_Course],
        ...(f_Image && { f_Image }),
      },
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updatedEmployee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: err.message });
  }
});

// Delete Employee by f_Id
router.delete("/:f_Id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      f_Id: req.params.f_Id,
    });
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
