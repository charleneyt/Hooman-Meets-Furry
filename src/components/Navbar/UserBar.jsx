import React from "react";
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
import {MdPets} from "react-icons/md";
import {BsHeartFill} from "react-icons/bs";
import {FiUserPlus} from "react-icons/fi";
import LoginPage from "../../Pages/LoginPage";

// TODO: link this if have time (nice to have)
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const UserLoginBar = (props) => {
  const {auth, setAuth, username, setUsername} = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // See if user is logged in

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignUpClicked = () => {
    setOpen(true);
  };

  const handleSignUpClose = () => {
    setOpen(false);
  };

  // Buttons
  const notLoggedIn = (
    <Box>
      <Button
        variant="contained"
        size="medium"
        onClick={handleSignUpClicked}
        startIcon={<FiUserPlus />}
        style={{
          boxShadow: "none",
          backgroundImage:
            "linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)",
          borderRadius: "8px",
          fontFamily: "Dongle",
        }}
      >
        Sign Up / Login
      </Button>
      <LoginPage
        open={open}
        setOpen={setOpen}
        setAuth={setAuth}
        onClose={handleSignUpClose}
        setUsername={setUsername}
      />
    </Box>
  );

  const loggedIn = (
    <Box sx={{flexGrow: 0}}>
      {/* Heart */}
      <IconButton>
        <BsHeartFill />
      </IconButton>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar
            alt="User"
            src="https://img.icons8.com/pastel-glyph/100/000000/dog-muzzle.png"
            sx={{bgcolor: "#FED8B1"}}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: "45px"}}
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
          <MenuItem key={setting}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar
      sx={{minHeight: 32}}
      position="static"
      style={{backgroundColor: "#FFC0CB"}}
    >
      <Container>
        <Toolbar disableGutters={true} variant="dense">
          <MdPets
            size={26}
            style={{
              justifySelf: "start",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography
            noWrap
            component="div"
            // TODO: fix hardcode
            sx={{
              ml: 1,
              mr: 2,
              display: {
                xs: "none",
                md: "flex",
                fontFamily: "Dongle",
                fontSize: 30,
              },
            }}
            style={{
              display: "flex",
              alignItems: "flex",
              justifyContent: "center",
            }}
          >
            Hooman Meets Furry
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}></Box>
          {/* Middle*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
          >
            Hooman Meets Furry
          </Typography>
          {/* When the screen get's larger */}
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            <Typography sx={{fontFamily: "Dongle", fontSize: 25}}>
              {"          "}
              Welcome {auth ? username : "guest"}!
            </Typography>
          </Box>
          {/* If logged in render the logged in part */}
          {auth ? loggedIn : notLoggedIn}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default UserLoginBar;
