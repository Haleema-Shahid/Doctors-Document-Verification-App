import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const userRole = localStorage.getItem("role");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleApplicationsClick = () => {
    console.log("handleApplicationsClick");
    if (userRole === "verifier") {
      navigate("/application-table");
    } else if (userRole === "client") {
      navigate("/application-table-client");
    } else if (userRole === "admin") {
      navigate("/admin-table");
    }
  };

  const handleChatClick = () => {
    const role = localStorage.getItem("role");
    if (role == "client") {
      navigate("/chatbox");
    } else {
      navigate("/chatbox-verifier");
    }
  };

  const handleDashboardClick = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/dashboard-verifier");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      style={
        {
          //backgroundColor: "#cbdaf2"
        }
      }
    >
      <Container
        maxWidth="100%"
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            style={{
              marginRight: "20px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontFamily: "Poppins",
            }}
          >
            eDoc Veriff
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Applications</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Chat Bot</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              mx: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eDoc Veriff
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userRole === "verifier" || userRole === "admin" ? (
              <Button
                //key={page}
                onClick={handleDashboardClick}
                style={{
                  padding: "22px",
                  height: "100%",
                  color: "#1976D2",
                  display: "block",
                  fontWeight: "bold",
                  //borderLeft: "1px solid white",
                  //borderRight: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                  //backgroundColor: "white", // Set initial background color
                  "&:hover": {
                    backgroundColor: "white", // Change background color on hover
                    color: "#1976D2", // Change text color on hover
                  },
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "white"; // Change background color on hover
                  e.target.style.color = "#1976D2"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                  e.target.style.color = "white"; // Reset text color on hover out
                }}
              >
                Dashboard
              </Button>
            ) : (
              " "
            )}

            {userRole === "verifier" || userRole === "admin" ? (
              <Button
                //key={page}
                onClick={handleApplicationsClick}
                style={{
                  padding: "22px",
                  height: "100%",
                  color: "#1976D2",
                  display: "block",
                  fontWeight: "bold",
                  //borderLeft: "1px solid white",
                  //borderRight: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                  //backgroundColor: "white", // Set initial background color
                  "&:hover": {
                    backgroundColor: "white", // Change background color on hover
                    color: "#1976D2", // Change text color on hover
                  },
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "white"; // Change background color on hover
                  e.target.style.color = "#1976D2"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                  e.target.style.color = "white"; // Reset text color on hover out
                }}
              >
                Applications
              </Button>
            ) : (
              <Button
                //key={page}
                onClick={handleApplicationsClick}
                style={{
                  padding: "22px",
                  height: "100%",
                  color: "#1976D2",
                  display: "block",
                  fontWeight: "bold",
                  //borderLeft: "1px solid white",
                  borderRadius: "0px",
                  color: "white",
                  //backgroundColor: "white", // Set initial background color
                  "&:hover": {
                    backgroundColor: "white", // Change background color on hover
                    color: "#1976D2", // Change text color on hover
                  },
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "white"; // Change background color on hover
                  e.target.style.color = "#1976D2"; // Change text color on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                  e.target.style.color = "white"; // Reset text color on hover out
                }}
              >
                Your Application(s)
              </Button>
            )}
            <Button
              //key={page}

              style={{
                padding: "22px",
                height: "100%",
                color: "#1976D2",
                display: "block",
                fontWeight: "bold",
                //borderLeft: "1px solid white",
                //borderRight: "1px solid white",
                borderRadius: "0px",
                color: "white",
                //backgroundColor: "white", // Set initial background color
                "&:hover": {
                  backgroundColor: "white", // Change background color on hover
                  color: "#1976D2", // Change text color on hover
                },
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white"; // Change background color on hover
                e.target.style.color = "#1976D2"; // Change text color on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent"; // Reset background color on hover out
                e.target.style.color = "white"; // Reset text color on hover out
              }}
            >
              Let's Talk
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "Logout" ? (
                    <Typography textAlign="center" onClick={handleLogout}>
                      {setting}
                    </Typography>
                  ) : (
                    <Typography textAlign="center">{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
