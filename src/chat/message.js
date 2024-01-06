import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Input } from "@mui/material";
import "./chatbox.css";
import DocumentInputMessage from "./documentInputMessage";
import UploadIcon from "@mui/icons-material/Upload";
import { storage } from "../firebase/firebase";
import "./chatbox.css";
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Message({ user, content, isDocumentInput, isUploaded}) {
  const message = content;
  const sender = user;
  const [showDocumentInput, setShowDocumentInput] = useState(isDocumentInput);

//   useEffect(() => {
//     console.log(message);
//   }, [message]);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  //const sender = "bot";
  const fileInputRef = useRef(null);

//   useEffect(() => {
//     console.log("Component mounted");
//   }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);

    if (selectedFile) {
      setUploading(true);

      const fileName = `${Date.now()}_${selectedFile.name}`;
      const storageRef = ref(storage, `/${sender}/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setUploading(false);
        },
        async () => {
          console.log("File uploaded successfully!");
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File URL:", url);
            setUploadedFile(url);
            isUploaded();
            setUploading(false);
          } catch (e) {
            setUploading(false);
          }
        }
      );
    }
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <Box className={`message-box ${sender}`}>
      {!showDocumentInput ? (
        <Typography>{message}</Typography>
      ) : (
        <div>
          <Typography>
            {uploadedFile
              ? "File uploaded!"
              : "Please upload a document for verification. After uploading, click save."}
          </Typography>
  
          {uploadedFile ? (
            <CloudDoneIcon variant="filled" />
          ) : (
            // Render file upload input if no file is uploaded
            <Box
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  display: "none",
                }}
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                startIcon={<UploadIcon />}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </Button>
            </Box>
          )}
        </div>
      )}
    </Box>
  );
  
}

export default Message;
