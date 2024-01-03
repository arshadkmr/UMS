import React from "react";
import { useNavigate } from "react-router-dom";

function UserNav() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImge");
        navigate("/");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <h2 style={{ color: "green" }}>U M S</h2>
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
                        <ul className="navbar-nav me-auto mb-3 mb-lg-0"></ul>

                        <button className="btn btn-success" type="submit" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default UserNav;
