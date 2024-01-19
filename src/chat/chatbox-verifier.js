import React, { useEffect, useState, useRef } from "react";
import "./chatbox.css";
import Message from "./message";
import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Header from "../header/header.js";
import DocumentInputMessage from "./documentInputMessage.js";
import ChatBg from "./chat-bg.jpg";
import { useNavigate } from "react-router-dom";
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
      text: "Have you verified the user?",
      sequenceNumber: 4,
    },
    {
      sender: "bot",
      text: "Do you want to verify the next document?",
      sequenceNumber: 5,
    },
    //if user says yes to "more documents" then display msg number 4

    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Thanks. For help, go to the Let's Chat tab.",
      sequenceNumber: 6,
    },
    {
      //if user says no to "more documents"
      sender: "bot",
      text: "Revisit when you're ready. GoodBye!",
      sequenceNumber: 7,
    },
  ];

  const navigate = useNavigate();
  const [clientFiles, setClientFiles] = useState();
  const [showInput, setShowInput] = useState(true);
  const [seqNumber, setSeqNumber] = useState(2);
  const [currentFile, setCurrentFile] = useState("");
  const [showDocumentInput, setShowDocumentInput] = useState(false);

  const [inputMessage, setInputMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [lastBotMessageIndex, setLastBotMessageIndex] = useState(null);


  useEffect(() => {
    const storedClientFiles = localStorage.getItem("clientFiles");

    if (storedClientFiles) {
      try {
        const parsedClientFiles = JSON.parse(storedClientFiles);
        setClientFiles(parsedClientFiles);
      } catch (error) {
        console.error("Error parsing clientFiles from local storage:", error);
      }
    }
  }, [botMessages]);

  const getMessageBySequenceNumber = (sequenceNumber) => {
    const message = botMessages.find(
      (msg) => msg.sequenceNumber === sequenceNumber
    );
    return message || null; // Return null if the message is not found
  };

  const botFirstMessage = getMessageBySequenceNumber(1);

  const [messages, setMessages] = useState([
    { text: botFirstMessage.text, sender: botFirstMessage.sender },
  ]);

  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to the last message after a short delay
    const scrollTimeout = setTimeout(() => {
      if (containerRef.current && messages.length > 0) {
        const lastMessage = containerRef.current.lastChild;
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    }, 100);

    return () => clearTimeout(scrollTimeout); // Cleanup the timeout on component unmount
  }, [messages]);
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

  const getDocumentType = (index) => {
    if (index === 0) {
      return "Bachelors document";
    }
    if (index === 1) {
      return "Masters document";
    }
    if (index === 2) {
      return "Associate document";
    }
    if (index === 3) {
      return "Diploma document";
    }
    return "other document";
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
        if (inputMessage.toLocaleLowerCase().includes("no")) {
          console.log("said no*****************");
          handleSetSeqNumber(6);
          botMessage = getMessageBySequenceNumber(6);
        } else if (inputMessage.toLowerCase().includes("yes")) {
          handleSetSeqNumber(3);
          botMessage = getMessageBySequenceNumber(3);
          console.log("displaying document output************5");
          const nextFile = clientFiles.shift(); // Remove the first element from the array
          setCurrentFile(nextFile);

          // Update the clientFiles in local storage without the processed file
          localStorage.setItem("clientFiles", JSON.stringify(clientFiles));
          //setShowDocumentInput(true);
        }
      } else if (seqNumber === 3) {
        if (inputMessage.toLowerCase().includes("no")) {
          setShowInput(false);
          botMessage = getMessageBySequenceNumber(7);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, sender: "user", isDocumentInput: null },
            {
              text: botMessage.text,
              sender: botMessage.sender,
              isDocumentInput: null,
            },
            //{ text: botMessage.text, sender: "bot", isDocumentInput: null },
          ]);
        } else if (inputMessage.toLowerCase().includes("yes")){
          // Display client files as separate messages
          const clientFilesMessages = clientFiles.map((file, index) => ({
            text: getDocumentType(index),
            sender: "bot",
            isDocumentInput: "output",
            outputFile: file,
          }));

          botMessage = getMessageBySequenceNumber(6);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputMessage, sender: "user", isDocumentInput: null },
            ...clientFilesMessages,
            { text: botMessage.text, sender: "bot", isDocumentInput: null },
          ]);

          setShowInput(false);
          // Update the clientFiles in local storage without the processed files
          //localStorage.setItem("clientFiles", JSON.stringify([]));
          handleSetSeqNumber(4);
        }
      }else {
        botMessage = getMessageBySequenceNumber(seqNumber);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: inputMessage, sender: "user", isDocumentInput: null },
          {
            text: botMessage.text,
            sender: botMessage.sender,
            isDocumentInput: seqNumber === 3 ? "output" : null,
          },
        ]);

        if (seqNumber < 6) {
          handleSetSeqNumber(seqNumber + 1);
        }
      }

      setInputMessage("");
    }
  };
  const handleEmailClick = () =>{
    navigate("/email")
  }
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
      <Button className="mail-button"
      onClick={handleEmailClick}
      >Send verification mail</Button>
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
            ref={containerRef}
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
                      outputFile={message.outputFile}
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

export default ChatBoxVerifier;
