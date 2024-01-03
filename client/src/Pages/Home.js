import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHome from "../Components/UserHome/UserHome";
import UserNav from "../Components/UserNav/UserNav";
import jwt from "jwt-decode";

function Home() {
    const navigate = useNavigate();
    // async function populateQuote(){
    //     const req=await fetch('http://localhost:3001/api/quote',{
    //         headers:{
    //             'x-access-token':localStorage.getItem('token')
    //         }
    //     })
    //     const data=req.json()
    // }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt(token);
            if (!user) {
                localStorage.removeItem("token");
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <UserNav />
            <UserHome />
        </div>
    );
}

export default Home;
