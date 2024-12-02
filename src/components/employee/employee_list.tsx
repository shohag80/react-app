import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, deleteEmployee, Employee } from "../../services/employee_api";

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
                setFilteredEmployees(data); // Initialize filtered list
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = employees.filter(
            (employee) =>
                employee.first_name.toLowerCase().includes(term) ||
                employee.last_name.toLowerCase().includes(term) ||
                employee.email.toLowerCase().includes(term) ||
                employee.department.toLowerCase().includes(term)
        );

        setFilteredEmployees(filtered);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
        }
        try {
            await deleteEmployee(id);
            alert("Employee deleted successfully!");
            setEmployees(employees.filter((employee) => employee._id !== id));
            setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
        } catch (error) {
            console.error(error);
            alert("Failed to delete employee.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between p-4 rounded" style={{ backgroundImage: "url('assets/background/4.jpg')" }}>
                <h2 className="text-center mb-4 text-white">Employee List</h2>
                <div className="mb-3 col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, email, or department"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <Link to="/create" className="btn btn-info mb-3">
                    New Employee
                </Link>
            </div>

            {/* Search Bar */}

            <hr />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Date of Joining</th>
                        <th>Department</th>
                        <th className="col-md-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.date_of_joining}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Link to={`/update/${employee._id}`} className="btn btn-warning btn-sm me-2">
                                        &nbsp; Edit &nbsp;
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(employee._id || "")}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
