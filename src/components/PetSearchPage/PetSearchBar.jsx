import React from "react"; 
import AppBar from "@mui/material/AppBar";
import {styled, alpha} from "@mui/material/styles";
import {IconButton, TextField, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import {FaCat, FaDog} from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import {HiOutlineLocationMarker} from "react-icons/hi";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { ConstructionOutlined } from "@mui/icons-material";


// Search bar theme
const Search = styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#00bcd4", 0.15),
  "&:hover": {
    backgroundColor: alpha("#00bcd4", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
  color: "#000",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  // TODO: Input test color
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));



export default function PetSearchBar(props) {
  const {type, setType, location, setLocation} = props; 
  const [value, setValue] = React.useState("");
  

  const handleLocationChange = (event) => {
    //  location search by pressing the enter key
    if (event.keyCode === 13) {
      setLocation(event.target.value);
    }
    setValue(event.target.value)
  }


  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="relative" style={{background: "#FFF"}}>
        <Toolbar>
          {/* TODO: change the button to ToggleButton */}
          {/* TODO: change button css */}
          {/* TODO: Onclick change color */}
          {/* TODO: hover change color */}
          <IconButton color={type === "Cat" ? "secondary" : undefined} value="catButton" size="large" edge="start" sx={{mr: 1}} onClick={() => {setType("Cat")}}>
            <FaCat />
          </IconButton>
          
          <Divider orientation="vertical" variant="middle" flexItem light />
          {/* Dog */}
          <IconButton color={type === "Dog" ? "secondary" : undefined} value="dogButton" size="large" edge="start" sx={{mr: 2, ml:0.8}} onClick={() => {setType("Dog")}}>
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
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <HiOutlineLocationMarker />
                  </InputAdornment>
                ),
              }}
            />
            
          </Box>
          {/* TODO: Search for pet name? */}
          <Search style={{marginLeft: "auto"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Pet..."
              inputProps={{"aria-label": "search"}}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
