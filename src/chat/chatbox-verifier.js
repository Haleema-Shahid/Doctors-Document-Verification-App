import React, { useState } from "react";
import "./chatbox.css";
import Message from "./message";
import { Box, Typography, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Header from "../header/header.js";
import DocumentInputMessage from "./documentInputMessage.js";
function ChatBoxVerifier() {
  const botMessages = [
    {
      sender: "bot",
      text: "Hello! How are you?",
      sequenceNumber: 1,
    },
    {
      sender: "bot",
      text: "Alright! Let's get started. Would you like to view client's documents?",
      sequenceNumber: 2,
    },
    {
      //if user says yes to "documents ready?"
      sender: "bot",
      text: "Great!",
      sequenceNumber: 3,
    },
    {
      //if user says no to "documents ready?"
      sender: "bot",
      text: "Please get your documents so we can proceed",
      sequenceNumber: 4,
    },
    {
      sender: "bot",
      text: "Do you want to get more documents verified?",
      sequenceNumber: 5,
    },
    //if user says yes to "more documents" then display msg number 4

    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Thank you for submitting your documents! I will email you once your documents have been verified by our certified verifier",
      sequenceNumber: 6,
    },
  ];

  const getMessageBySequenceNumber = (sequenceNumber) => {
    const message = botMessages.find(
      (msg) => msg.sequenceNumber === sequenceNumber
    );
    return message || null; // Return null if the message is not found
  };

  const [seqNumber, setSeqNumber] = useState(2);
  const botFirstMessage = getMessageBySequenceNumber(1);
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [messages, setMessages] = useState([
    { text: botFirstMessage.text, sender: botFirstMessage.sender },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleSetSeqNumber = (value) => {
    const newValue = value; // Replace with the value you want
    setSeqNumber(newValue);
  };
  const afterUpload = () => {
    const botMessage = getMessageBySequenceNumber(5);
    const newSeqNumber = botMessage.sequenceNumber;
    handleSetSeqNumber(newSeqNumber); //not getting updated
    console.log(
      "after upload: ",
      seqNumber,
      " ",
      botMessage.text,
      " botseq: ",
      botMessage.sequenceNumber
    );
    setMessages([
      ...messages,
      { text: botMessage.text, sender: "bot", isDocumentInput: false },
    ]);
    if (seqNumber < 6) {
      handleSetSeqNumber(seqNumber + 1);
    }
    setShowDocumentInput(true);
  };

  const handleSendMessage = () => {
    let botMessage = {};
    if (inputMessage.trim() !== "") {
      console.log(
        "in handlesend: ",
        seqNumber,
        " ",
        inputMessage,
        " ",
        isUploaded
      );
      if (seqNumber == 5) {
        if (inputMessage == "no") {
          console.log("said no*****************");
          handleSetSeqNumber(6);
          botMessage = getMessageBySequenceNumber(6);
        } else if (inputMessage == "yes") {
          handleSetSeqNumber(3);
          botMessage = getMessageBySequenceNumber(3);
          console.log("displaying document input************5");
          setShowDocumentInput(true);
        }
      } else if (seqNumber == 3) {
        if (inputMessage == "no") {
          console.log("said no*****************");
          handleSetSeqNumber(seqNumber + 1); //4
          botMessage = getMessageBySequenceNumber(4);
          //seqNumber = 4;
        } else if (inputMessage == "yes") {
          //setSeqNumber(seqNumber+1);
          console.log("displaying document input************3");
          //seqNumber = 3;
          botMessage = getMessageBySequenceNumber(3);
          setShowDocumentInput(true);
        }
      } else {
        botMessage = getMessageBySequenceNumber(seqNumber);
      }

      console.log(botMessage.text, " ", botMessage.sequenceNumber);
      setMessages([
        ...messages,
        { text: inputMessage, sender: "user", isDocumentInput: false },
        {
          text: botMessage.text,
          sender: botMessage.sender,
          isDocumentInput: botMessage.sequenceNumber == 3 ? true : false,
        },
      ]);

      if (seqNumber < 6) {
        handleSetSeqNumber(seqNumber + 1);
      }

      setInputMessage("");
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="chatbox">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message`}>
                {/* {console.log(message.text)}
                {console.log(seqNumber)} */}
                <Message
                  user={message.sender}
                  content={message.text}
                  isUploaded={afterUpload}
                  isDocumentInput={message.isDocumentInput}
                />
              </div>
            ))}
            {/* {showDocumentInput && (
              <DocumentInputMessage isUploaded={setIsUploaded} />
            )} */}
          </div>
          <div className="chat-input">
            <TextField
              variant="standard"
              style={{
                flex: "1",
                //resize: "none",
                overflowY: "auto",
                maxHeight: "600px",
                scrollbarWidth: "thin",
                scrollbarColor: "#4caf50 #e0e0e0",
                width: "100%",
                zIndex: "0",
              }}
              multiline
              maxRows={5}
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              //onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            ></TextField>
            <button className={"send-button"} onClick={handleSendMessage}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxVerifier;
