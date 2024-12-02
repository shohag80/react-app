import { useAuth } from "../../contexts/auth_context";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/logout";

const Header: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Employee Management</Link>
                {isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <div>
                        <Link className="btn btn-outline-primary" to="/login">Login</Link> &nbsp;&nbsp;
                        <Link className="btn btn-outline-success" to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
