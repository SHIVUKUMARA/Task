import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEmployees, updateEmployee } from "../../Utils/api";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeData = await fetchEmployees();
        const foundEmployee = employeeData.find((emp) => emp.f_Id === id);
        setEmployee(foundEmployee);
      } catch (error) {
        toast.error("Error fetching employee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        f_Image: reader.result,       }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateEmployee(id, employee);
      toast.success("Employee updated successfully.");
      navigate("/EmployeeManagement");
    } catch (error) {
      toast.error("Error updating employee.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <ToastContainer />
      <h1 className="bg-warning text-left py-2 px-4 w-100">Update Employee</h1>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-6">
            <form onSubmit={handleSubmit}>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={employee.f_Name}
                    onChange={(e) =>
                      setEmployee({ ...employee, f_Name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Email</label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    value={employee.f_Email}
                    onChange={(e) =>
                      setEmployee({ ...employee, f_Email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Mobile No</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={employee.f_Mobile}
                    onChange={(e) =>
                      setEmployee({ ...employee, f_Mobile: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Designation</label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    value={employee.f_Designation}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        f_Designation: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Gender</label>
                <div className="col-sm-8">
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={employee.f_Gender === "Male"}
                        onChange={(e) =>
                          setEmployee({ ...employee, f_Gender: e.target.value })
                        }
                      />{" "}
                      Male
                    </label>
                    <label className="ms-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={employee.f_Gender === "Female"}
                        onChange={(e) =>
                          setEmployee({ ...employee, f_Gender: e.target.value })
                        }
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>
              </div>
             
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Course</label>
                <div className="col-sm-8">
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          employee.f_Course && employee.f_Course.includes("MCA")
                        }
                        onChange={(e) => {
                          const newCourses = e.target.checked
                            ? [...(employee.f_Course || []), "MCA"]                             : (employee.f_Course || []).filter(
                                (course) => course !== "MCA"
                              );
                          setEmployee({ ...employee, f_Course: newCourses });
                        }}
                      />{" "}
                      MCA
                    </label>
                    <label className="ms-3">
                      <input
                        type="checkbox"
                        checked={
                          employee.f_Course && employee.f_Course.includes("BCA")
                        }
                        onChange={(e) => {
                          const newCourses = e.target.checked
                            ? [...(employee.f_Course || []), "BCA"]
                            : (employee.f_Course || []).filter(
                                (course) => course !== "BCA"
                              );
                          setEmployee({ ...employee, f_Course: newCourses });
                        }}
                      />{" "}
                      BCA
                    </label>
                    <label className="ms-3">
                      <input
                        type="checkbox"
                        checked={
                          employee.f_Course && employee.f_Course.includes("BSC")
                        }
                        onChange={(e) => {
                          const newCourses = e.target.checked
                            ? [...(employee.f_Course || []), "BSC"]
                            : (employee.f_Course || []).filter(
                                (course) => course !== "BSC"
                              );
                          setEmployee({ ...employee, f_Course: newCourses });
                        }}
                      />{" "}
                      BSC
                    </label>
                  </div>
                </div>
              </div>
            
              <div className="row mb-3">
                <label className="col-form-label col-sm-4">Image</label>
                <div className="col-sm-8">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {employee.f_Image && (
                    <img
                      src={employee.f_Image}
                      alt="Employee"
                      style={{ width: "50%", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
            
              <div className="row mb-3">
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary col-10">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
