import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Input } from "@mui/material";
import "./chatbox.css";
import DocumentInputMessage from "./documentInputMessage";
import UploadIcon from "@mui/icons-material/Upload";
import { storage } from "../firebase/firebase";
import "./chatbox.css";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Message({ user, content, isDocumentInput, isUploaded, outputFile }) {
  const message = content;
  const sender = user;
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [showDocumentOutput, setShowDocumentOutput] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isDocumentInput === "input") {
      setShowDocumentInput(true);
    } else if (isDocumentInput === "output") {
      setUploadedFile(outputFile);
      setShowDocumentOutput(true);
    }
  }, [message]);

  //const sender = "bot";
  const fileInputRef = useRef(null);
  const [verified, setVerified] = useState(false);

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

  const handleVerifyClick = () => {
    setVerified(true);
  };

  return (
    <Box className={`message-box ${sender}`}>
      {showDocumentInput ? (
        // Render document input part
        <Box>
          {message !== "..." ? (
            <Typography>
              Please upload {message} document(s) for verification.
            </Typography>
          ):(
            <Typography>
              {message}
            </Typography>
          )}

          {uploadedFile ? (
            <CloudDoneIcon variant="filled" />
          ) : (
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
        </Box>
      ) : showDocumentOutput ? (
        // Render document output part
        <Box>
          Click the link to download the {message}:
          <Typography>
            {uploadedFile
              ? ("Click the link to view the file:",
                (
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <a
                      href={outputFile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {outputFile}
                    </a>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        height: "50%",
                      }}
                      onClick={handleVerifyClick}
                      //startIcon={<UploadIcon />}
                      disabled={verified}
                    >
                      Verify
                    </Button>
                  </div>
                ))
              : "No file uploaded."}
          </Typography>
          {/* {uploadedFile && <CloudDoneIcon variant="filled" />} */}
        </Box>
      ) : (
        // Render default message
        <Typography>{message}</Typography>
      )}
    </Box>
  );
}

export default Message;
