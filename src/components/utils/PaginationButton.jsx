import React from "react";
import {styled, alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PetsIcon from "@mui/icons-material/Pets";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({theme}) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 60,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ColorButton = styled(Button)(({theme}) => ({
  // button txt color
  color: "#fff",
  backgroundColor: "#F7ADCF",
  borderRadius: "10px",
  padding: "10px 10px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#F48BA9",
  },
}));

export default function PaginationButton(props) {
  const {pageSize, setPageSize} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (!event.currentTarget || event.currentTarget === undefined) {
      setPageSize(25);
    } else {
      setPageSize(event.currentTarget.value);
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log(event);
    if (!event.currentTarget || event.currentTarget === undefined) {
      setPageSize(25);
    } else {
      setPageSize(event.currentTarget.value);
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <ColorButton
        id="page-size-button"
        aria-controls="page-size-button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {" "}
        {pageSize} <PetsIcon sx={{fontSize: 18, marginLeft: "0.5rem"}} />
      </ColorButton>

      <StyledMenu
        id="page-size-menu"
        MenuListProps={{
          "aria-labelledby": "page-size-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem value={10} onClick={handleClose} disableRipple>
          10
          <PetsIcon sx={{fontSize: 18, marginLeft: "0.5rem"}} />
        </MenuItem>
        <MenuItem value={20} onClick={handleClose} disableRipple>
          20
          <PetsIcon sx={{fontSize: 18, marginLeft: "0.5rem"}} />
        </MenuItem>
        <MenuItem value={25} onClick={handleClose} disableRipple>
          25 <PetsIcon sx={{fontSize: 18, marginLeft: "0.5rem"}} />
        </MenuItem>
        <MenuItem value={30} onClick={handleClose} disableRipple>
          30 <PetsIcon sx={{fontSize: 18, marginLeft: "0.5rem"}} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
