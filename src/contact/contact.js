import React, { useState } from "react";
import Header from "../header/header";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Doctors from "./doctors.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const imageStyle = {
    width: "100%",
    borderRadius: "8px",
    //marginTop: "10px",
  };

  const infoContainerStyle = {
    borderRadius: "8px",
    marginTop: "10px",
    marginBottom: "30px",
    width: "50%",
    textAlign: "center",
  };

  const handleSendMessage = () => {
    if (!email || !message) {
      toast.error("Please fill in both email and message fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to send the message?"
    );
    if (confirmed) {
      // Perform the action of sending the message (can be an API call, etc.)

      // Show "Message Sent" toast
      toast.success("Message Sent", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#bbdef9",
        //height:"100%"
        //height:"100vh"
      }}
    >
      <Header />
      <Box
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "50%" }}>
          {/* Image Section */}
          <img src={Doctors} alt="Contact" style={imageStyle} />
        </div>

        {/* Information Section */}
        <Box style={infoContainerStyle}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>

          <Typography variant="body1" paragraph>
            If you have any questions or inquiries, feel free to reach out to us
            using the information below.
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </Box>
      </Box>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Contact;
