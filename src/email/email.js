import React from "react";
import EmailImg from "./email.png"
import { Typography } from "@mui/material";
import Header from "../header/header";
import ChatBg from "./chat-bg.jpg";
function Email(){

    return(
        <>
        <Header/>
        <div
        style={{
            display: "flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            backgroundImage: `url(${ChatBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
        }}>
        <Typography
        variant="h5"
        style={{
            padding:"40px"
        }}>
            Here's the email that will be sent to the client.
        </Typography>
        <img src={EmailImg} 
        style={{
            width:"25%",
            margin: "20px"
        }}/>
        </div>
        </>
    );


}
export default Email;