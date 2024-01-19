import React from "react";
import Header from "../header/header";
import { Container, Typography, Paper, Button, Box} from "@mui/material";
import Doctors from "./doctors.jpg";

const Contact = () => {
  const imageStyle = {
    width: "100%",
    //maxWidth: "400px",
    borderRadius: "8px",
    marginTop: "20px",
  };

  const infoContainerStyle = {
    //padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    width: "50%",
    justifyContent: "center", alignItems:"center" 
  };

  return (
    <div style={{
        backgroundColor:"#bbdef9",
        height:"100vh"
    }}>
      <Header />
      <Box //maxWidth="md"
       style={{
         marginTop: "50px",
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
         flexDirection:"column",

         }}>
        <div style={{width: "50%", }}>
          {/* Image Section */}
          <img
            src={Doctors} // Replace with your image URL
            alt="Contact"
            style={imageStyle}
          />
        </div>

        {/* Information Section */}
        {/* <Paper style={infoContainerStyle}> */}
        <Box style={infoContainerStyle}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>

          <Typography variant="body1" paragraph>
            If you have any questions or inquiries, feel free to reach out to us
            using the information below.
          </Typography>

          <Typography variant="body1">
            <strong>Email:</strong> contact@example.com
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> +1 (123) 456-7890
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
