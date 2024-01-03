import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function loginAdmin(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:3001/admin/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        console.log("admin login data");
        console.log(data);

        if (data.user) {
            localStorage.setItem("adminToken", data.user);
            const user = jwt(data.user);
            localStorage.setItem("adminName", user.name);
            navigate("/adminHome");
        } else {
            setError("Invalid Email/Password");
        }
    }
    return (
        <div>
            <section className="vh-100 bg-image">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Admin Login</h2>

                                        <form onSubmit={loginAdmin}>
                                            <div className="form-outline mb-4">
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    id="form3Example3cg"
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                                <label className="form-label" for="form3Example3cg">
                                                    Email
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    id="form3Example4cg"
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                                <label className="form-label" for="form3Example4cg">
                                                    Password
                                                </label>
                                            </div>

                                            {error ? (
                                                <p style={{ color: "red" }} className="text-center">
                                                    {error}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminLogin;
