import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const menuItems = {
  affectionate_with_family: "Affectionate with Family",
  amount_of_shedding: "Amount of shedding",
  easy_to_groom: "Easy to groom",
  general_health: "General health",
  intelligence: "Intelligence",
  kid_friendly: "Kid friendly",
  pet_friendly: "Pet friendly",
  potential_for_playfulness: "Potential for playfulness",
};

export default function SelectLabels() {
  const [feature, setFeature] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChangeFeature = (event) => {
    setFeature(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl variant="standard" sx={{marginBottom: 5, minWidth: 300}}>
        <InputLabel id="label">Feature</InputLabel>
        <Select
          labelId="select-label"
          id="rater-select-bar"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={feature}
          label="Feature"
          onChange={handleChangeFeature}
        >
          {Object.keys(menuItems).map((key) => (
            <MenuItem value={key}>{menuItems[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
