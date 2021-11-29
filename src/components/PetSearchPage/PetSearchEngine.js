import * as React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
// ${gender}, ${color}, ${breed}, ${location}, ${spayed/neutered}, ${shots_current}, ${children_friendly}, ${dogs_friendly}, ${cats_friendly} are parameters that user inputs.

const catDataDemo = [
  { breed: "Domestic Short Hair" },
  { breed: "Bombay" },
  { breed: "Dilute Calico" },
  { breed: "Russian Blue" },
  { breed: "Tabby" },
  { breed: "Tuxedo" },
];

const catColorDemo = [
  "Black",
  "White",
  "Tuxedo",
  "Orange",
  "Gray",
  "Blue",
  "Silver",
  "Brown",
  "Chocolate",
  "Red",
];

// TODO: dog has a different one
const catCoatLengthOptions = ["Hairless", "Short", "Medium", "Long"];

const petAge = ["Baby", "Young", "Adult", "Senior"];

export default function PetSearchEngine() {
  const [checked, setChecked] = React.useState([true, false]);
  const [catColorArr, setCatColorArr] = React.useState([]);
  const handleCheckedBoxChange = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  // TODO: onHandleChange
  const petBreedSelect = (
    <Autocomplete
      disableCloseOnSelect
      multiple
      id="catBreed"
      options={catDataDemo}
      getOptionLabel={(option) => option.breed}
      // renderTags?
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Select Breed"
          placeholder="Breeds"
        />
      )}
    />
  );

  const petAgeSelect = (
    <Box>
      {/* TODO: if the user select dog/cat => label should be pupply/kitten */}
      {/* TODO: change state function  */}
      {/* TODO: change font size */}

      <FormGroup sx={{ flexDirection: "row" }}>
        <Typography> Age: </Typography>
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="baby" />}
          label={petAge[0]}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="young" />}
          label={petAge[1]}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="adult" />}
          label={petAge[2]}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="senior" />}
          label={petAge[3]}
        />
      </FormGroup>
    </Box>
  );

  const petColorSelect = (
    <Box>
      <Autocomplete
        disableCloseOnSelect
        multiple
        id="cat-color-select"
        options={catColorDemo}
        getOptionLabel={(option) => option}
        // renderTags?
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Colors"
            placeholder="Colors"
          />
        )}
      />
    </Box>
  );

  const petGenderSelect = (
    <Box>
      <FormGroup sx={{ flexDirection: "row" }}>
        <Typography> Gender: </Typography>
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="baby" />}
          label="Male"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="young" />}
          label="Female"
        />
      </FormGroup>
    </Box>
  );

  const petSizeSelect = (
    <Box>
      <FormGroup sx={{ flexDirection: "row" }}>
        <Typography> Size: </Typography>
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="baby" />}
          label="Small"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="young" />}
          label="Medium"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="adult" />}
          label="Large"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckedBoxChange} name="senior" />}
          label="Extra Large"
        />
      </FormGroup>
    </Box>
  );

  const petCoatLengthSelect = (
    <Box>
      <Autocomplete
        disableCloseOnSelect
        multiple
        id="pet-coat-select"
        // TODO: if dog is selected then need to change the coat
        options={catCoatLengthOptions}
        getOptionLabel={(option) => option}
        // renderTags?
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select coat length"
            placeholder="Coat length"
          />
        )}
      />
    </Box>
  );

  const behaviroalCheckbox = (
    <Box>
      <FormGroup sx={{ flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckedBoxChange}
              name="spayed-neutered"
            />
          }
          label="Spayed-neutered"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckedBoxChange} name="house-trained" />
          }
          label="House-trained"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckedBoxChange} name="special-needs" />
          }
          label="Special Needs"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckedBoxChange} name="shots-current" />
          }
          label="Current Shots"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckedBoxChange}
              name="children-friendly"
            />
          }
          label="Children-friendly"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckedBoxChange} name="Dogs-friendly" />
          }
          label="Dogs-friendly"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckedBoxChange} name="Cats-friendly" />
          }
          label="Cats-friendly"
        />
      </FormGroup>
    </Box>
  );

  return (
    <div>
      <Stack sx={{ width: 280 }}>
        {petBreedSelect}
        {petAgeSelect}
        {petColorSelect}
        {petGenderSelect}
        {petSizeSelect}
        {petCoatLengthSelect}
        {behaviroalCheckbox}
      </Stack>
    </div>
  );
}
