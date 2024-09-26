import React, { useEffect, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css"; import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../Utils/api";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  const fetchAllEmployees = async () => {
    try {
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
    } catch (error) {
      setMessage("Error fetching employees.");
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const handleSubmit = async (employeeData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.f_Id, employeeData);
        toast.success("Employee updated successfully.");
        setEditingEmployee(null);
      } else {
        await createEmployee(employeeData);
        toast.success("Employee created successfully.");
      }
      fetchAllEmployees();
    } catch (error) {
      toast.error("Error saving employee.");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (f_Id) => {
    try {
      await deleteEmployee(f_Id);
      toast.success("Employee deleted successfully.");
      fetchAllEmployees();
    } catch (error) {
      toast.error("Error deleting employee.");
    }
  };

  const confirmDelete = (employee) => {
    setDeletingEmployee(employee);
  };

  const cancelDelete = () => {
    setDeletingEmployee(null);
  };

  const handleConfirmDelete = async () => {
    await handleDelete(deletingEmployee.f_Id);
    cancelDelete();
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <CreateEmployee
        onSubmit={handleSubmit}
        initialData={editingEmployee}
        editing={!!editingEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
