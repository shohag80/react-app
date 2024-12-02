import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth_context";
import Signup from "../components/auth/signup";
import Login from "../components/auth/login";
import EmployeeList from "../components/employee/employee_list";
import CreateEmployee from "../components/employee/employee_create";
import UpdateEmployee from "../components/employee/employee_update";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <header>
                        <h1>Employee Management System</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
                            <Route path="/create" element={<PrivateRoute><CreateEmployee /></PrivateRoute>} />
                            <Route path="/update/:id" element={<PrivateRoute><UpdateEmployee /></PrivateRoute>} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
