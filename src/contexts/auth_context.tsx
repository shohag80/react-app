import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            try {
                const decodedToken: any = jwtDecode(jwt_token);
                const currentTime = Date.now() / 1000;
                return decodedToken.exp > currentTime;
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
        return false;
    });

    useEffect(() => {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            try {
                const decodedToken: any = jwtDecode(jwt_token); // Decode the token
                const currentTime = Date.now() / 1000; // Convert to seconds
                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true);
                } else {
                    logout(); // Token expired, log out the user
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout(); // Invalid token, log out the user
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/login", { email, password });
            const jwt_token = response.data.jwt_token;
            localStorage.setItem("jwt_token", jwt_token); // Save the token in localStorage
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt_token");
        setIsAuthenticated(false);
    };

    // Attach the token to every request
    useEffect(() => {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt_token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
