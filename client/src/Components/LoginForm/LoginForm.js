import React, { useState } from "react";
import "../Signup/Signup.css";
import { useNavigate, Link } from "react-router-dom";
import jwt from "jwt-decode";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/login", {
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

        if (data.user) {
            localStorage.setItem("token", data.user);
            const user = jwt(data.user);
            console.log(user);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userEmail", user.email);

            localStorage.setItem("userImage", user.image);
            navigate("/home", { replace: true });
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
                                    <div className="card-body p-5 ">
                                        <h2 className="text-uppercase text-center mb-5">User Login</h2>

                                        <form onSubmit={loginUser}>
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

                                            <p className="text-center text-muted mt-5 mb-0">
                                                Don't have an account?{" "}
                                                <Link to="/signup" className="fw-bold text-body">
                                                    <u>Signup here</u>
                                                </Link>
                                            </p>
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

export default LoginForm;
