import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChatImage1 from "./chat-1.png";
import ChatImage2 from "./chat-2.png";
import Joyride from "react-joyride";
import VerifierImage1 from "./verifier-1.png";
import VerifierImage2 from "./verifier-2.png";
import VerifierImage3 from "./verifier-3.png";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const [run, setRun] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      content: <h2>Let's begin our journey!</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: "center",
      target: ".start-div", // Updated target class
    },
    {
      target: ".hidden-div-2",
      content: "Don't worry, it's friendly :)",
      placement: "center",
      spotlightPadding: 20,
      placement: "top",
      title: "It's AI",
    },
    {
      target: ".third-div span",
      content: "Here's how to do it!",
      placement: "center",
      spotlightPadding: 20,
      placement: "left",
      title: "Let's dive into it",
    },
    {
      target: ".image-1",
      content:
        "reply it's greeting nicely!!\nand type \"yes\" if you wan't to talk 😉",
      placement: "center",
      spotlightPadding: 20,
      placement: "left",
      title: "Upload Documents",
    },
    {
      target: ".image-2",
      content:
        'reply with "no" if there are no more documents or you don\'t want to talk anymore 😔',
      placement: "center",
      spotlightPadding: 20,
      placement: "right",
      title: "No Worries Maybe Next time",
    },
    {
      target: ".fourth-div span",
      content: "We got you.. 😏",
      placement: "center",
      spotlightPadding: 20,
      placement: "bottom",
    },
    {
      target: ".fifth-div span",
      content: "You have 2 options now",
      spotlightPadding: 20,
      placement: "top",
      title: "Greet Nicely (Again)",
    },
    {
      target: ".image-3",
      content: "Nice Greetings ",
      placement: "right",
      spotlightPadding: 20,
      title: "Greetings",
    },
    {
      target: ".image-4",
      content: "You can sieze the moment",
      placement: "center",
      spotlightPadding: 20,
      placement: "left",
      title: "Option 1",
    },
    {
      target: ".image-5",
      content: "Or let it slip",
      placement: "center",
      spotlightPadding: 20,
      placement: "right",
      title: "Option 2",
    },
    {
      target: ".seventh-div",
      content: "That's All folks",
      placement: "center",
      spotlightPadding: 20,
      placement: "top",
      title: "Game Over",
    },
  ];

  const handleJoyrideCallback = (data) => {
    if (data.action === "skip" || data.type === "finished") {
      localStorage.setItem("firstTime", false);
      setRun(false);
      const role = localStorage.getItem("role");
      if (role === "client") {
        navigate("/chatbox");
      } else {
        navigate("/chatbox-verifier");
      }
    }
  };

  const finishOnBoarding = () => {
    localStorage.setItem("firstTime", false);
    const role = localStorage.getItem("role");
    if (role === "client") {
      navigate("/chatbox");
    } else {
      navigate("/chatbox-verifier");
    }
  };

  return (
    <>
      <div
        className="start-div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#FF5E5E",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: "60px" }}>
          Welcome to SureSource
        </span>
        <div style={{ fontWeight: "normal", fontSize: "25px" }}>
          Get Your Documents verified with ease
        </div>
        <Button
          sx={{
            my: 2,
            mx: 1,
            color: "black",
            display: "block",
            border: "1px solid white",
            fontWeight: "bold",
            p: 1,
            backgroundColor: "white",
            borderRadius: "7px",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "white",
            },
          }}
          onClick={() => setRun(true)}
        >
          Let's Start
        </Button>
      </div>

      <div
        className="second-div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#58D063",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span
          className="hidden-div-2"
          style={{
            fontWeight: "bolder",
            fontSize: "60px",
            position: "relative",
          }}
        >
          Chat with out ChatBot{" "}
          <span style={{ position: "absolute", top: -11 }}>🤖</span>
        </span>
        {/* <div
          className="hidden-div-2"
          style={{ fontWeight: "normal", fontSize: "25px" }}
        ></div> */}
      </div>

      <div
        className="third-div"
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#66A5FF",
          color: "white",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <span
          style={{ fontWeight: "bolder", fontSize: "40px", paddingTop: "2%" }}
        >
          let's check how it is done
        </span>
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <img className="image-1" src={ChatImage1} style={{ width: "45%" }} />
          <img className="image-2" src={ChatImage2} style={{ width: "45%" }} />
        </div>
      </div>
      <div
        className="fourth-div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#FF995D",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: "30px" }}>
          WHAT IF A PERSON WANTS TO VERIFY DOCUMENTS??
        </span>
      </div>

      <div
        className="fifth-div"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#d15656",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: "30px" }}>
          Greet nicely
        </span>
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="image-3" src={VerifierImage1} />
        </div>
      </div>

      <div
        className="sixth-div"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#a7d6c9",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontWeight: "bolder",
            fontSize: "30px",
            padding: "2%",
            color: "black",
          }}
        >
          Two Options
        </span>
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <img
            className="image-4"
            src={VerifierImage2}
            style={{ width: "45%" }}
          />
          <img
            className="image-5"
            src={VerifierImage3}
            style={{ width: "45%" }}
          />
        </div>
      </div>

      <div
        className="seventh-div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#d49fd4",
          color: "white",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: "50px" }}>Done!</span>
        <Button
          sx={{
            my: 2,
            mx: 1,
            color: "black",
            display: "block",
            border: "1px solid white",
            fontWeight: "bold",
            p: 1,
            backgroundColor: "white",
            borderRadius: "7px",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "white",
            },
          }}
          onClick={finishOnBoarding}
        >
          Finished
        </Button>
      </div>

      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        callback={handleJoyrideCallback}
      />
    </>
  );
}
