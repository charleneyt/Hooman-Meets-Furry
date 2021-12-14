import React from 'react';
import Box from '@mui/material/Box';
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";


function valuetext(value) {
  return `${value} pages`;
}

const PinkSlider = styled(Slider)({
  color: "#F48BA9",
  height: 8,
  "& .MuiSlider-track": {
    border: "none"
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit"
    },
    "&:before": {
      display: "none"
    }
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#F48BA9",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
    },
    "& > *": {
      transform: "rotate(45deg)"
    }
  }
});

export default function PaginationSlider(props) {
  const{setPageSize} = props
  return (
    <Box sx={{ width: 300 }}>
      <PinkSlider
        aria-label="pagination-slider"
        min={10}
        max={50}
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        // marks={marks}
        size="small"
        onChangeCommitted={(event, value)=>{setPageSize(value)}}
      />
    </Box>
  );
}
