import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
//redux
import { addUserDetails } from "../../redux/userReducer";
import { useDispatch } from "react-redux";

function AllUserDetails() {
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function getUserDetails() {
        const req = await fetch("http://localhost:3001/admin/api/userDetails", {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        });
        const data = await req.json();

        if (data.status === "ok") {
            setUserDetails(data.userDetails);
        } else {
             alert(data.error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            const user = jwt(token);
            if (!user) {
                localStorage.removeItem("adminToken");
                navigate("/admin");
            } else {
                getUserDetails();
            }
        } else {
            navigate("/admin");
        }
    },[navigate]);

    const deleteUser = async (id) => {
        const req = await fetch("http://localhost:3001/admin/api/deleteUser", {
            method: "POST",
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });
        const data = await req.json();
        console.log(data,"SDZDZSFV");
        if (data.status === "ok") {
            getUserDetails()
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <div className="container">
                <table className="table mt-5">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((data, index) => {
                            return (
                                <tr className="table-info" key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                dispatch(addUserDetails(data));
                                                navigate("/editUser");
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button className="btn btn-danger" onClick={() => deleteUser(data._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllUserDetails;
