import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminEditUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { allUserDetails } = useSelector((state) => state.users);
  console.log(allUserDetails[0]);
  useEffect(() => {
    setName(allUserDetails[0].name);
    setEmail(allUserDetails[0].email);
  }, [allUserDetails]);

  async function editUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/admin/api/editUser", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("adminToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: allUserDetails[0]._id,
        name,
        email,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      navigate("/userinfo");
    } else {
      alert("error");
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <form onSubmit={editUser}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditUserPage;
