import React, { useState, useEffect } from "react";
import { updateEmployee, fetchEmployees, Employee } from "../../services/employee_api";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateEmployee: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Employee | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEmployee = async () => {
            const employees = await fetchEmployees();
            const employee = employees.find((emp) => emp._id === id);
            if (employee) setFormData(employee);
        };

        loadEmployee();
    }, [id]);

    if (!formData) return <p className="text-center mt-4">Loading...</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEmployee(id!, formData);
            alert("Employee updated successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between bg-primary p-4 rounded">
                <h4 className="text-white">Update Employee</h4>
                <Link to="/" className="btn btn-info mb-3 col-md-2">
                    Back
                </Link>
            </div><br />
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="date"
                            className="form-control"
                            name="date_of_joining"
                            value={formData.date_of_joining}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    Update
                </button>
            </form >
        </div >
    );
};

export default UpdateEmployee;
