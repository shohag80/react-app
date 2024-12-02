import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth_context";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
