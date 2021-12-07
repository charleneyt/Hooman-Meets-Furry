import React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import {FormControlLabel, FormGroup, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {produce} from "immer";

const catDataDemo = [
  {breed: "Domestic Short Hair"},
  {breed: "Bombay"},
  {breed: "Dilute Calico"},
  {breed: "Russian Blue"},
  {breed: "Tabby"},
  {breed: "Tuxedo"},
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

const checkBoxConfigs = {
  age: {
    options: { 
      "baby": "Baby", 
      "young": "Young",
      "adult": "Adult", 
      "senior": "Senior"
    }
  },
  spayed_neutered: {
    options: {
      "TRUE": "Spayed-neutered"
    }
  }
}

export default function PetSearchEngine(props) {
  const {checkBoxOptions, setCheckBoxOptions} = props;

  const setCheckBoxState = (settingName, attributeName) => (event) => {
    const newState = produce((checkBoxOptions) => {
      if (event.target.checked) {
        checkBoxOptions[settingName] = checkBoxOptions[settingName] || new Set();
        checkBoxOptions[settingName].add(attributeName);
      } else {
        if (checkBoxOptions[settingName]) {
          checkBoxOptions[settingName].delete(attributeName)
          if (!checkBoxOptions[settingName].size) {
            delete checkBoxOptions[settingName]
          }
        }
      }
    })
    setCheckBoxOptions(newState);
  };

  const getCheckBoxState = (settingName, attributeName) => {
    return (checkBoxOptions[settingName] || new Set()).has(attributeName)
  }

  // const [checked, setChecked] = React.useState([true, false]);
  const handleCheckedBoxChange = (event) => {
    setChecked([event.target.checked, checked[1]]);
    console.log(event.target.checked, checked[1])
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const generateCheckboxes = (configKey) => {
    const config = checkBoxConfigs[configKey];
    return Object.entries(config.options).map(([key, label]) => {
      return  <FormControlLabel
      key={key}
      control={
        <Checkbox
        checked={getCheckBoxState(configKey, key)}
        onChange={setCheckBoxState(configKey, key)}
        name={key} 
        inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={label}
    />
    });
  };

  return (
    <div>
      <Stack sx={{width: 280}}>
        {/* Breed Select */}
        <Box sx={{margin: 1}}>
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
        </Box>
        {/* Age Select */}
        <Box sx={{margin: 1, marginBottom: 0}}>
          {/* TODO: if the user select dog/cat => label should be pupply/kitten */}
          {/* TODO: change state function  */}
          {/* TODO: change font size */}
          <Typography> Age:</Typography>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            {generateCheckboxes('age')}
          </FormGroup>
        </Box>
        {/* Color Select */}
        <Box sx={{margin: 1, marginTop: 0}}>
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
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            <Typography> Gender: &nbsp;</Typography>
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="baby" />
              }
              label="Male"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="young" />
              }
              label="Female"
            />
          </FormGroup>
        </Box>
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <Typography> Size: </Typography>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="baby" />
              }
              label="Small"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="young" />
              }
              label="Medium"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="adult" />
              }
              label="Large"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckedBoxChange} name="senior" />
              }
              label="Extra Large"
            />
          </FormGroup>
        </Box>
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
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
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <FormGroup sx={{flexDirection: "row"}}>
            {generateCheckboxes('spayed_neutered')}
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckedBoxChange}
                  name="house-trained"
                />
              }
              label="House-trained"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckedBoxChange}
                  name="special-needs"
                />
              }
              label="Special Needs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckedBoxChange}
                  name="shots-current"
                />
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
                <Checkbox
                  onChange={handleCheckedBoxChange}
                  name="Dogs-friendly"
                />
              }
              label="Dogs-friendly"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckedBoxChange}
                  name="Cats-friendly"
                />
              }
              label="Cats-friendly"
            />
          </FormGroup>
        </Box>
      </Stack>
    </div>
  );
}
