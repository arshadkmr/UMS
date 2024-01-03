import React, { useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import AdminDashboard from "../Components/AdminHome/AdminHome";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

function AdminHome() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            const user = jwt(token);
            if (!user) {
                localStorage.removeItem("adminToken");
                navigate("/admin");
            }
        } else {
            navigate("/admin");
        }
    }, [navigate]);

    return (
        <div>
            <AdminNav />
            <AdminDashboard />
        </div>
    );
}

export default AdminHome;
