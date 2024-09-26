import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

export const fetchEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const form = new FormData();
  for (let key in employeeData) {
    form.append(key, employeeData[key]);
  }
  const response = await axios.post(API_URL, form);
  return response.data;
};

export const updateEmployee = async (f_Id, employeeData) => {
  const form = new FormData();
  for (let key in employeeData) {
    form.append(key, employeeData[key]);
  }
  const response = await axios.put(`${API_URL}/${f_Id}`, form);
  return response.data;
};

export const deleteEmployee = async (f_Id) => {
  const response = await axios.delete(`${API_URL}/${f_Id}`);
  return response.data;
};
