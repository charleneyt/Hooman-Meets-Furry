import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function PetRating(props) {
  const {value} = props;
  return (
    <Box
      sx={{
        "& > legend": {mt: 2},
      }}
    >
      <StyledRating
        readOnly
        name="customized-color"
        defaultValue={2}
        value={value}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit"/>}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
      />
      
    </Box>
  );
}
