import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/emp/employees";
const DELETE_API_URL = "http://localhost:5000/api/v1/emp/employees";

export interface Employee {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    salary: string;
    date_of_joining: string;
    department: string;
}

// Fetch all employees
export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get(API_URL);
    return response.data; // Assuming the API returns the employees as an array
};

// Create a new employee
export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await axios.post(API_URL, employee);
    return response.data; // Returns the newly created employee
};

// Update an existing employee
export const updateEmployee = async (
    id: string,
    employee: Employee
): Promise<Employee> => {
    const response = await axios.put(`${API_URL}/${id}`, employee);
    return response.data; // Returns the updated employee
};

// Delete an employee
export const deleteEmployee = async (id: string): Promise<void> => {
    await axios.delete(`${DELETE_API_URL}/${id}`);
};
