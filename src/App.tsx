import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth_context";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import EmployeeList from "./components/employee/employee_list";
import CreateEmployee from "./components/employee/employee_create";
import UpdateEmployee from "./components/employee/employee_update";
import Header from "./components/template/header";
import ProtectedRoute from "./contexts/protected_route";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
                    <Route path="/create" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
                    <Route path="/update/:id" element={<ProtectedRoute><UpdateEmployee /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
