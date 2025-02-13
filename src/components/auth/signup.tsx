import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth_api";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (!formData.name || !formData.email || !formData.password) {
            alert("All fields are required.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await createUser(formData);
            setSuccess("User Registered successfully!");
            navigate("/login");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            setError(errorMessage); // Set the error message from API response
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3 rounded border border-warning p-5">
                <h2 className="text-center">Signup</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary col-md-12"
                        disabled={loading || !formData.name || !formData.email || !formData.password}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
