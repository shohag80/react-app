import React from "react";
import { useAuth } from "../../contexts/auth_context";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    return (
        <button className="btn btn-danger" onClick={logout}>
            Log Out
        </button>
    );
};

export default LogoutButton;
