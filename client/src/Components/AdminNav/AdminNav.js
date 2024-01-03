import React from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminNav() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        navigate("/admin");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <h4 style={{ color: "green" }}>U M S</h4>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-3 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active ms-5"
                                    aria-current="page"
                                    to="/adminHome"
                                    style={{ color: "green " }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link ms-5" to="/userinfo" style={{ color: "green" }}>
                                    Users
                                </Link>
                            </li>
                        </ul>

                        <button className="btn btn-success" type="submit" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AdminNav;
