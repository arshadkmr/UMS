import React, { useState, useEffect } from "react";
import { axiosApi } from "../../Axios/axios";
import "./UserHome.css";

function UserHome() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    useEffect(() => {
        setName(localStorage.getItem("userName"));
        setEmail(localStorage.getItem("userEmail"));
        setImage(localStorage.getItem("userImage"));
    }, []);
    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("email", email);

            await axiosApi
                .put("/api/uploadImage", formData)
                .then((response) => {
                    console.log(response.data.status);
                    if (response.data.status) {
                        setStatus(response.data.status);
                    } else {
                        setImage(response.data.image);
                        localStorage.setItem("userImage", response.data.image);
                        setStatus("");
                    }
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(image);
    return (
        <div>
            <div className="profile-wrap">
                <div className="mt-4">
                    <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                        <h2 style={{ color: "black" }}>Welcome &#160;</h2>

                        <h2> &#160;</h2>
                    </div>
                </div>

                <div className="Profile_photo">
                    
                        <img
                            src={image||"https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"}
                            alt="Profile "
                        />
                        
                </div>
                <div className="user_data">
                    <p>Name: {name ? name : ""}</p>
                    <p>Email: {email ? email : ""}</p>
                </div>
                <div>
                    <input accept="image/png , image/gif , image/jpeg" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button onClick={uploadImage}>Upload Profile</button>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "30px",
                    color: "red"
                }}
            >
                {status}
            </div>
        </div>
    );
}

export default UserHome;
