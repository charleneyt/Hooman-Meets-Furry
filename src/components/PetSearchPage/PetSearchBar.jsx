import React from "react";
import AppBar from "@mui/material/AppBar";
import {styled} from "@mui/material/styles";
import {IconButton, TextField, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import {FaCat, FaDog} from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import {HiOutlineLocationMarker} from "react-icons/hi";
import Divider from "@mui/material/Divider";
import PaginationButton from "../utils/PaginationButton";

const PaginationButtonStyle = styled("div")(({theme}) => ({
  position: "relative",
  marginLeft: "10%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function PetSearchBar(props) {
  const {type, setType, setLocation, pageSize, setPageSize} = props;
  const [value, setValue] = React.useState("");

  // TODO: fix location change
  const handleLocationChange = (event) => {
    //  location search by pressing the enter key
    // if (event.keyCode === 13) {
    //   setValue(event.target.value);
    //   setLocation(event.target.value);
    //   console.log(event.target.value);
    // }

    setValue(event.target.value);
    setLocation(event.target.value);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="relative" style={{background: "#FFF"}}>
        <Toolbar>
          {/* TODO: change the button to ToggleButton */}
          {/* TODO: change button css */}
          {/* TODO: Onclick change color */}
          {/* TODO: hover change color */}
          <IconButton
            color={type === "Cat" ? "secondary" : undefined}
            value="catButton"
            size="large"
            edge="start"
            sx={{mr: 1}}
            onClick={() => {
              setType("Cat");
            }}
          >
            <FaCat />
          </IconButton>

          <Divider orientation="vertical" variant="middle" flexItem light />
          {/* Dog */}
          <IconButton
            color={type === "Dog" ? "secondary" : undefined}
            value="dogButton"
            size="large"
            edge="start"
            sx={{mr: 2, ml: 0.8}}
            onClick={() => {
              setType("Dog");
            }}
          >
            <FaDog />
          </IconButton>

          {/* TODO: Location implement*/}
          <Box component="form">
            <TextField
              onChange={handleLocationChange}
              value={value}
              // TODO: Cursor pointer
              placeholder="User's Location"
              variant="standard"
              fontFamily="Dongle"
              InputProps={{
                disableUnderline: true,
                style: {fontFamily: "Dongle", fontSize: 25},
                startAdornment: (
                  <InputAdornment position="start">
                    <HiOutlineLocationMarker />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <PaginationButtonStyle style={{marginLeft: "auto"}}>
            <PaginationButton
              pageSize={pageSize}
              setPageSize={setPageSize}
              type={type}
            />
          </PaginationButtonStyle>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
