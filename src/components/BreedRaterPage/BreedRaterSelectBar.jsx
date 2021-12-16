import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const menuItems = {
  affectionate_with_family: "Affectionate with Family",
  amount_of_shedding: "Amount of shedding",
  easy_to_groom: "Easy to groom",
  general_health: "General health",
  intelligence: "Intelligence",
  kid_friendly: "Kid friendly",
  pet_friendly: "Pet friendly",
  potential_for_playfulness: "Potential for playfulness",
};

// TODO: add cat dog select

export default function BreedRateSelectBar(props) {
  const {feature, setFeature} = props;
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
        <InputLabel style={{fontSize: 25, fontFamily: "Dongle"}} id="label">Feature</InputLabel>
        <Select style={{fontSize: 25, fontFamily: "Dongle", textAlign: "center"}}
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
            <MenuItem style={{fontSize: 25, fontFamily: "Dongle"}} key={key} value={key}>{menuItems[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
