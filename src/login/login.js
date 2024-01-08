import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ChatBg from "./chat-bg.jpg";
import SureSourceLogo from "./sureSource.png";

// import users from "./../../data/users";
import image from "./image.jpg";
// import authService from "./../service/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../Toast/Toast";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${ChatBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //opacity: "2"
    borderRadius: "10px",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  //   if(authService.isLoggedIn()){

  //     props.history.push("./home");

  //   }

  const classes = useStyles();
  const navigate = useNavigate();

  console.log(typeof classes.root);

  const [client, setClient] = useState({
    username: "client",
    password: "client123",
  });
  const [verifier, setVerifier] = useState({
    username: "verifier",
    password: "verifier123",
  });

  const [account, setAccount] = useState({ username: "", password: "" });

  const handleAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);
  };

  const isClient = (username, password) => {
    if (client.username === username && client.password === password) {
      return true;
    }
    return false;
  };
  const isVerifier = (username, password) => {
    if (verifier.username === username && verifier.password === password) {
      return true;
    }
    return false;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    //TODO: create an empty list of clientFiles and store it in local storage.
    const clientFiles = [
      "https://firebasestorage.googleapis.com/v0/b/document-verification-ap-88a6a.appspot.com/o/bot%2F1704547880926_test_document?alt=media&token=14f1c920-5037-4e98-bf13-bbb24a33a34f",
      "https://firebasestorage.googleapis.com/v0/b/document-verification-ap-88a6a.appspot.com/o/bot%2F1704547934839_test_document?alt=media&token=5620fe28-73da-48c4-a190-5b23830b9b14",
      "https://firebasestorage.googleapis.com/v0/b/document-verification-ap-88a6a.appspot.com/o/bot%2F1704547959482_test_document?alt=media&token=fa02014d-b579-4028-b434-a56c4add2cdc",
    ];

    // Store the empty list and role in local storage
    localStorage.setItem("clientFiles", JSON.stringify(clientFiles));
    if (isClient(account.username, account.password)) {
      localStorage.setItem("role", "client");
      successToast("Login Successfull");
      navigate("/application-table-client");
    } else if (isVerifier(account.username, account.password)) {
      localStorage.setItem("role", "verifier");
      successToast("Login Successfull");
      navigate("/dashboard");
    } else {
      console.log("Nope");
      //TODO: show a toast or something for invalid credentials
      errorToast("Invalid Credentials!!");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <img src={SureSourceLogo}/>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(event) => handleAccount("username", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={(event) => handleAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="black" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => handleLogin(event)}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Login;
