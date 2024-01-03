import React, { useState } from "react";
import { axiosApi } from "../../Axios/axios";
import "./AdminHome.css";
import { addUserDetails } from "../../redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


let timeout;
function AdminHome() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchString, setString] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const findUsers = (val, fromDelete) => {
        val = val.trim();
        if (timeout) clearTimeout(timeout);
        if (!fromDelete) setString(val);
        if (val === "") {
            setSearchResults([]);
            return;
        }
        timeout = setTimeout(async () => {
            const response = await axiosApi.get(`admin/api/search?q=${val}`);
            setSearchResults(response.data.results);
        }, 300);
    };
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
        if (data.status === "ok") {
            findUsers(searchString, true);
        } else {
            alert(data.error);
        }
    };
    return (
        <div className="main">
            <h3 className="mt-5">Admin Home</h3>
            <input className="mt-5" placeholder="Search Users Here" onChange={(e) => findUsers(e.target.value)}></input>

            {searchResults ? (
                <div>
                    <div className="container">
                        <table className="table mt-5">
                            <tbody>
                                {searchResults.map((data, index) => {
                                    return (
                                        <tr className="table-info" key={data.id}>
                                            <td>{data.name}</td>
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
            ) : (
                ""
            )}
        </div>
    );
}

export default AdminHome;
