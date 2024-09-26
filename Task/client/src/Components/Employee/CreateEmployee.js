import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee = ({
  onSubmit,
  initialData,
  editing,
  loggedInUser,
  SignOut,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(
    initialData || {
      f_Id: "",
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_Gender: "",
      f_Course: [],
      f_Image: null,
    }
  );

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "checkbox") {
      const newCourses = formData.f_Course.includes(value)
        ? formData.f_Course.filter((course) => course !== value)
        : [...formData.f_Course, value];

      setFormData({
        ...formData,
        f_Course: newCourses,
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });

      if (name === "f_Image" && files) {
        const file = files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
          setSelectedImage(URL.createObjectURL(file));
        } else {
          setSelectedImage(null);
          toast.warning("Please upload a valid jpg or png file.");
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.f_Course.length === 0) {
      toast.warning("Please select at least one course.");
      return;
    }

    onSubmit(formData);
    setFormData({
      f_Id: "",
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_Gender: "",
      f_Course: [],
      f_Image: null,
    });
    setSelectedImage(null);
    toast.success(
      editing
        ? "Employee updated successfully!"
        : "Employee created successfully!"
    );
  };

  return (
    <>
      <ToastContainer />
      <h1 className="bg-warning text-left py-2 px-4 w-100">Create Employee</h1>
      <div className="container mt-3 mb-5 d-flex justify-content-center">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="row g-3 mt-3 p-4"
          style={{
            maxWidth: "600px",
            border: "3px solid black",
            borderRadius: "10px",
            backgroundColor: "#c0cdd1b8",
          }}
        >
          <div className="col-12">
            <div className="row align-items-center mb-3">
              <label htmlFor="f_Id" className="col-4 form-label">
                Id
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="f_Id"
                  id="f_Id"
                  placeholder="Id"
                  value={formData.f_Id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label htmlFor="f_Name" className="col-4 form-label">
                Name
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="f_Name"
                  id="f_Name"
                  placeholder="Name"
                  value={formData.f_Name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label htmlFor="f_Email" className="col-4 form-label">
                Email
              </label>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control"
                  name="f_Email"
                  id="f_Email"
                  placeholder="Email"
                  value={formData.f_Email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label htmlFor="f_Mobile" className="col-4 form-label">
                Mobile No
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="f_Mobile"
                  id="f_Mobile"
                  placeholder="Mobile No"
                  value={formData.f_Mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label htmlFor="f_Designation" className="col-4 form-label">
                Designation
              </label>
              <div className="col-8">
                <select
                  name="f_Designation"
                  id="f_Designation"
                  className="form-select"
                  value={formData.f_Designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label className="col-4 form-label">Gender</label>
              <div className="col-8">
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="f_Gender"
                      value="Male"
                      checked={formData.f_Gender === "Male"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="f_Gender"
                      value="Female"
                      checked={formData.f_Gender === "Female"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label className="col-4 form-label">Course</label>
              <div className="col-8">
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="MCA"
                      checked={formData.f_Course.includes("MCA")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">MCA</label>
                  </div>
                  <div className="form-check me-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="BCA"
                      checked={formData.f_Course.includes("BCA")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">BCA</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="BSC"
                      checked={formData.f_Course.includes("BSC")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">BSC</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <label htmlFor="f_Image" className="col-4 form-label">
                Image Upload
              </label>
              <div className="col-8">
                <input
                  type="file"
                  className="form-control"
                  name="f_Image"
                  id="f_Image"
                  accept=".jpg,.png"
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  Upload only jpg/png files.
                </small>
              </div>
            </div>

            {selectedImage && (
              <div className="row mb-3">
                <div className="col-12 text-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="row mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success col-8">
              {editing ? "Update Employee" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;
