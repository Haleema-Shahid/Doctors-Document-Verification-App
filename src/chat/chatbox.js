import React, { useState, useEffect } from "react";
import "./chatbox.css";
import Message from "./message";
import { Box, Typography, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Header from "../header/header.js";
import DocumentInputMessage from "./documentInputMessage.js";
import ChatBg from "./chat-bg.jpg";
function ChatBox() {
  const botMessages = [
    {
      sender: "bot",
      text: "Hello! How are you?",
      sequenceNumber: 1,
    },
    {
      sender: "bot",
      text: "Alright! Let's get started. Do you have your documents ready?",
      sequenceNumber: 2,
    },
    {
      //if user says yes to "documents ready?"
      sender: "bot",
      text: "Primary Education",
      sequenceNumber: 3,
    },
    {
      //if user says no to "documents ready?"
      sender: "bot",
      text: "Secondary Education",
      sequenceNumber: 4,
    },
    {
      sender: "bot",
      text: "Bachelor's or equivalent",
      sequenceNumber: 5,
    },
    //if user says yes to "more documents" then display msg number 4

    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Specialization",
      sequenceNumber: 6,
    },
    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Other",
      sequenceNumber: 7,
    },
    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Let's chat again when you have your documents ready!",
      sequenceNumber: 8,
    },
    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Thank you for submitting your docs! I will email you once our certified verifier has verified your documents. You can view your application progress in Your Application(s) tab.",
      sequenceNumber: 9,
    },
  ];
  const [showTyping, setShowTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotMessageIndex, setLastBotMessageIndex] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [seqNumber, setSeqNumber] = useState(2);

  const botFirstMessage = {
    sender: "bot",
    text: "Hello! How are you?",
    sequenceNumber: 1,
  };
  //const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: botFirstMessage.text,
      sender: botFirstMessage.sender,
      sequenceNumber: botFirstMessage.sequenceNumber,
    },
  ]);
  const [inputMessage, setInputMessage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    const lastIndex = messages.reduceRight((index, message, currentIndex) => {
      if (message.sender === "bot" && index === null) {
        return currentIndex;
      }
      return index;
    }, null);

    setLastBotMessageIndex(lastIndex);

    if (lastIndex !== null) {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);

      // Clean up the timeout on component unmount or when the messages change
      return () => clearTimeout(typingTimeout);
    }
  }, [messages]);

  const getMessageBySequenceNumber = (sequenceNumber) => {
    const message = botMessages.find(
      (msg) => msg.sequenceNumber === sequenceNumber
    );
    return message || null; // Return null if the message is not found
  };

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
    //setShowDocumentInput(true);
  };

  const handleSendMessage = () => {
    let botMessage = messages[messages.length - 1];
    console.log(messages);
    console.log("botMessage: ", botMessage);
    console.log("sequence number:", botMessage.sequenceNumber);
    console.log("input message:", inputMessage)
    if (inputMessage.trim() !== "" || botMessage.sequenceNumber >= 3) {
      // console.log(
      //   "in handlesend: ",
      //   seqNumber,
      //   " ",
      //   inputMessage,
      //   " ",
      //   isUploaded
      // );
      if (botMessage.sequenceNumber == 1) {
        //after initial message
        const nextMessage = getMessageBySequenceNumber(2);
        setMessages([
          ...messages,
          { text: inputMessage, sender: "user", isDocumentInput: false },
          {
            text: nextMessage.text,
            sender: "bot",
            sequenceNumber: nextMessage.sequenceNumber,
            isDocumentInput: false,
          },
        ]);
      } else if (botMessage.sequenceNumber == 2) {
        //after ready message

        if (inputMessage.toLowerCase().includes("no")) {
          const nextMessage = getMessageBySequenceNumber(8);
          setMessages([
            ...messages,
            { text: inputMessage, sender: "user", isDocumentInput: false },
            {
              text: nextMessage.text,
              sender: "bot",
              sequenceNumber: nextMessage.sequenceNumber,
              isDocumentInput: false,
            },
          ]);
          setShowInput(false);
        } else if (inputMessage.toLowerCase().includes("yes")) {
          const nextMessage = getMessageBySequenceNumber(3);
          setMessages([
            ...messages,
            { text: inputMessage, sender: "user", isDocumentInput: false },
            {
              text: nextMessage.text,
              sender: "bot",
              sequenceNumber: nextMessage.sequenceNumber,
              isDocumentInput: "input",
            },
          ]);
        }
      } else if (botMessage.sequenceNumber == 3 || inputMessage == "") {
        const nextMessage = getMessageBySequenceNumber(
          botMessage.sequenceNumber + 1
        );
        console.log("nextMessage: ", nextMessage);
        setMessages([
          ...messages,
          //{ text: inputMessage, sender: "user", isDocumentInput: false },
          {
            text: nextMessage.text,
            sender: "bot",
            sequenceNumber: nextMessage.sequenceNumber,
            isDocumentInput: "input",
          },
        ]);
      } else if (botMessage.sequenceNumber == 4 || inputMessage == "") {
        console.log("in 4");
        const nextMessage = getMessageBySequenceNumber(
          botMessage.sequenceNumber + 1
        );
        setMessages([
          ...messages,
          //{ text: inputMessage, sender: "user", isDocumentInput: false },
          {
            text: nextMessage.text,
            sender: "bot",
            sequenceNumber: nextMessage.sequenceNumber,
            isDocumentInput: "input",
          },
        ]);
      } else if (botMessage.sequenceNumber == 5 || inputMessage == "") {
        const nextMessage = getMessageBySequenceNumber(
          botMessage.sequenceNumber + 1
        );
        setMessages([
          ...messages,
          //{ text: inputMessage, sender: "user", isDocumentInput: false },
          {
            text: nextMessage.text,
            sender: "bot",
            sequenceNumber: nextMessage.sequenceNumber,
            isDocumentInput: "input",
          },
        ]);
      } else if (botMessage.sequenceNumber == 6 || inputMessage == "") {
        const nextMessage = getMessageBySequenceNumber(
          botMessage.sequenceNumber + 1
        );
        setMessages([
          ...messages,
          //{ text: inputMessage, sender: "user", isDocumentInput: false },
          {
            text: nextMessage.text,
            sender: "bot",
            sequenceNumber: nextMessage.sequenceNumber,
            isDocumentInput: false,
          },
        ]);
      } else if (botMessage.sequenceNumber == 7) {
        if (inputMessage.toLowerCase().includes("no")) {
          const nextMessage = getMessageBySequenceNumber(9);
          setMessages([
            ...messages,
            { text: inputMessage, sender: "user", isDocumentInput: false },
            {
              text: nextMessage.text,
              sender: "bot",
              sequenceNumber: nextMessage.sequenceNumber,
              isDocumentInput: false,
            },
          ]);
          setShowInput(false);
        } else {
          const nextMessage = getMessageBySequenceNumber(7);
          setMessages([
            ...messages,
            { text: inputMessage, sender: "user", isDocumentInput: false },
            {
              text: nextMessage.text,
              sender: "bot",
              sequenceNumber: nextMessage.sequenceNumber,
              isDocumentInput: "input",
            },
          ]);
        }
      } else {
        console.log("im here haha");
      }
      // if (seqNumber == 5) {
      //   if (inputMessage.toLowerCase().includes("no")) {
      //     console.log("said no*****************");
      //     handleSetSeqNumber(6);
      //     botMessage = getMessageBySequenceNumber(6);
      //   } else if (inputMessage.toLowerCase().includes("yes")) {
      //     handleSetSeqNumber(3);
      //     botMessage = getMessageBySequenceNumber(3);
      //     console.log("displaying document input************5");
      //     setShowDocumentInput(true);
      //   }
      // } else if (seqNumber == 3) {
      //   if (inputMessage.toLowerCase().includes("no")) {
      //     console.log("said no*****************");
      //     handleSetSeqNumber(seqNumber + 1); //4
      //     botMessage = getMessageBySequenceNumber(4);
      //     setShowInput(false);
      //     //seqNumber = 4;
      //   } else if (inputMessage.toLowerCase().includes("yes")) {
      //     //setSeqNumber(seqNumber+1);
      //     console.log("displaying document input************3");
      //     //seqNumber = 3;
      //     botMessage = getMessageBySequenceNumber(3);
      //     setShowDocumentInput(true);
      //   }
      // } else {
      //   botMessage = getMessageBySequenceNumber(seqNumber);
      // }

      // console.log(botMessage.text, " ", botMessage.sequenceNumber);
      // setMessages([
      //   ...messages,
      //   { text: inputMessage, sender: "user", isDocumentInput: false },
      //   {
      //     text: botMessage.text,
      //     sender: botMessage.sender,
      //     isDocumentInput: botMessage.sequenceNumber == 3 ? "input" : null,
      //   },
      // ]);

      // if (seqNumber < 6) {
      //   handleSetSeqNumber(seqNumber + 1);
      // }

      setInputMessage("");
    }
  };

  return (
    <div
      //className="App"
      style={{
        backgroundImage: `url(${ChatBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        // overflow: "hidden",
        //minHeight: "100vh",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div className="chatbox">
        <div className="chat-container">
          <div
            className="add-scrollbar"
            style={{
              width: "65%",
              overflowY: "auto",
              height: "600px",
              display: "inline-grid",
            }}
          >
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message`}>
                  {message.sender === "user" ? (
                    <Message
                      user={message.sender}
                      content={message.text}
                      isUploaded={handleSendMessage}
                      isDocumentInput={message.isDocumentInput}
                    />
                  ) : (
                    <>
                      {lastBotMessageIndex === index && isTyping ? (
                        <Message
                        user="bot"
                        content="..."
                        //isUploaded={handleSendMessage}
                        //isDocumentInput={message.isDocumentInput}
                      />
                      ) : <Message
                      user={message.sender}
                      content={message.text}
                      isUploaded={handleSendMessage}
                      isDocumentInput={message.isDocumentInput}
                    />}
                      
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {showInput && (
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
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              ></TextField>
              <button className={"send-button"} onClick={handleSendMessage}>
                <SendIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
