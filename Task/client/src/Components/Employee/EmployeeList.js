import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../assets/user.jpg";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("f_Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 5;
  const navigate = useNavigate();

  const fetchAllEmployees = async () => {
    try {
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
    } catch (error) {
      toast.error("Error fetching employee data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const handleEdit = (employee) => {
    navigate(`/EmployeeManagement/update/${employee.f_Id}`);
  };

  const confirmDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.f_Name}?`)) {
      handleDelete(employee.f_Id);
    }
  };

  const handleDelete = async (f_Id) => {
    try {
      await deleteEmployee(f_Id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.f_Id !== f_Id)
      );
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error("Error deleting employee.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedEmployees = [...employees].sort((a, b) => {
      // Determine the sorting logic based on the field
      if (field === "f_Createdate") {
        return order === "asc"
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      } else if (field === "f_Id") {
        // Sort by ID: assuming f_Id is a number or can be treated as a number
        return order === "asc" ? a.f_Id - b.f_Id : b.f_Id - a.f_Id;
      } else {
        return order === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    setEmployees(sortedEmployees);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const paginatedEmployees = employees.slice(
    currentPage * employeesPerPage,
    (currentPage + 1) * employeesPerPage
  );

  const filteredEmployees = paginatedEmployees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <h1 className="bg-warning text-left py-2 px-4 w-100">Employee List</h1>
      <div className="container mt-4">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <span className="me-2 px-3 fw-bold">
            Total Count: {employees.length}
          </span>
          <label className="px-3 fw-bold">Search </label>
          <input
            type="text"
            className="form-control w-25 px-3"
            placeholder="Search Keyword"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="bg-info">
              <tr>
                <th
                  onClick={() => handleSort("f_Id")}
                  className="cursor-pointer"
                >
                  Unique Id
                </th>
                <th>Image</th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("f_Name")}
                >
                  Name
                </th>
                <th
                  onClick={() => handleSort("f_Email")}
                  className="cursor-pointer"
                >
                  Email
                </th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th onClick={() => handleSort("f_Createdate")}>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.f_Id}>
                    <td>{employee.f_Id}</td>
                    <td>
                      <img
                        src={
                          employee.f_Image
                            ? `http://localhost:5000/uploads/${employee.f_Image}`
                            : defaultImage
                        }
                        alt={employee.f_Name}
                        className="img-fluid"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{employee.f_Name}</td>
                    <td>{employee.f_Email}</td>
                    <td>{employee.f_Mobile}</td>
                    <td>{employee.f_Designation}</td>
                    <td>{employee.f_Gender}</td>
                    <td>{employee.f_Course}</td>
                    <td>{formatDate(employee.f_Createdate)}</td>
                    <td className="d-flex align-items-center">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => confirmDelete(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={
            <button className="btn btn-success p-2">{"<< "}Prev</button>
          }
          nextLabel={
            <button className="btn btn-success p-2">Next{" >>"}</button>
          }
          breakLabel={"..."}
          pageCount={Math.ceil(employees.length / employeesPerPage)}
          pageRangeDisplayed={1}
          marginPagesDisplayed={0}
          onPageChange={handlePageClick}
          containerClassName={
            "pagination justify-content-center align-items-center"
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link px-3 py-2"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default EmployeeList;
