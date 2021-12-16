import React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {FormControlLabel, FormGroup, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {produce} from "immer";
import {getAllBreeds, getAllColors} from "../../fetcher";

const catCoatLengthOptions = ["Hairless", "Short", "Medium", "Long"];
const dogCoatLengthOptions = [
  "Hairless",
  "Short",
  "Medium",
  "Long",
  "Wire",
  "Curly",
];

const checkBoxConfigs = {
  age: {
    options: {
      baby: "Baby",
      young: "Young",
      adult: "Adult",
      senior: "Senior",
    },
  },
  size: {
    options: {
      Small: "Small",
      Medium: "Medium",
      Large: "Large",
      "Extra Large": "Extra Large",
    },
  },
  gender: {
    options: {
      male: "Male",
      female: "Female",
    },
  },

  spayed_neutered: {
    options: {
      TRUE: "Spayed-neutered",
    },
  },
  house_trained: {
    options: {
      TRUE: "Housed-trained",
    },
  },
  special_needs: {
    options: {
      TRUE: "Special Needs",
    },
  },
  shots_current: {
    options: {
      TRUE: "Current Shots",
    },
  },
  children_friendly: {
    options: {
      TRUE: "Children-friendly",
    },
  },
  dogs_friendly: {
    options: {
      TRUE: "Dogs-friendly",
    },
  },
  cats_friendly: {
    options: {
      TRUE: "Cats-friendly",
    },
  },
};

export default function PetSearchEngine(props) {
  const {
    checkBoxOptions,
    setCheckBoxOptions,
    type,
    selectOptions,
    setSelectOptions,
  } = props;
  const [breedOptions, setBreedOptions] = React.useState([]);
  const [colorOptions, setColorOptions] = React.useState([]);

  // Populate the selections
  React.useEffect(() => {
    getAllBreeds(type)
      .then((resp) => resp.json())
      .then((resp) => {
        setBreedOptions(resp.results);
      });
    getAllColors(type)
      .then((resp) => resp.json())
      .then((resp) => {
        setColorOptions(resp.results);
      });
  }, [type]);

  // Check box
  const setCheckBoxState = (settingName, attributeName) => (event) => {
    const newState = produce((checkBoxOptions) => {
      if (event.target.checked) {
        checkBoxOptions[settingName] =
          checkBoxOptions[settingName] || new Set();
        checkBoxOptions[settingName].add(attributeName);
      } else {
        if (checkBoxOptions[settingName]) {
          checkBoxOptions[settingName].delete(attributeName);
          if (!checkBoxOptions[settingName].size) {
            delete checkBoxOptions[settingName];
          }
        }
      }
    });
    setCheckBoxOptions(newState);
  };

  const getCheckBoxState = (settingName, attributeName) => {
    return (checkBoxOptions[settingName] || new Set()).has(attributeName);
  };

  // TODO: fix duplicate code
  const onBreedClickChange = (event, values) => {
    const breedArr = values.map((element) => element.breed_name);
    setSelectOptions({...selectOptions, breed: breedArr});
  };

  const onColorClickChange = (event, values) => {
    const colorArr = values.map((element) => element.color);
    setSelectOptions({...selectOptions, color: colorArr});
  };

  const generateCheckboxes = (configKey) => {
    const config = checkBoxConfigs[configKey];
    return Object.entries(config.options).map(([key, label]) => {
      return (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              checked={getCheckBoxState(configKey, key)}
              onChange={setCheckBoxState(configKey, key)}
              name={key}
              inputProps={{"aria-label": "controlled"}}
            />
          }
          label={
            <Typography sx={{fontSize: 25, fontFamily: "Dongle"}}>
              {label}
            </Typography>
          }
        />
      );
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
            id="breed"
            options={breedOptions}
            getOptionLabel={(option) => option.breed_name}
            isOptionEqualToValue={(option, value) =>
              option.breed_name === value.breed_name
            }
            onChange={onBreedClickChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Breed"
                placeholder="Breeds"
                InputLabelProps={{style: {fontFamily: "Dongle", fontSize: 25}}}
              />
            )}
          />
        </Box>
        {/* Age Select */}
        <Box sx={{margin: 1, marginBottom: 0}}>
          {/* TODO: if the user select dog/cat => label should be pupply/kitten */}
          {/* TODO: change font size */}
          <Typography sx={{fontFamily: "Dongle", fontSize: 25}}>
            {" "}
            Age:
          </Typography>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            {generateCheckboxes("age")}
          </FormGroup>
        </Box>
        {/* Color Select */}
        <Box sx={{margin: 1, marginTop: 0}}>
          <Autocomplete
            disableCloseOnSelect
            multiple
            id="cat-color-select"
            options={colorOptions}
            getOptionLabel={(option) => option.color}
            isOptionEqualToValue={(option, value) =>
              option.color === value.color
            }
            onChange={onColorClickChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Colors"
                placeholder="Colors"
                InputLabelProps={{style: {fontFamily: "Dongle", fontSize: 25}}}
              />
            )}
          />
        </Box>
        {/* Gender */}
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            <Typography sx={{fontFamily: "Dongle", fontSize: 25}}>
              {" "}
              Gender: &nbsp;
            </Typography>
            {generateCheckboxes("gender")}
          </FormGroup>
        </Box>
        {/* Size */}
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <Typography sx={{fontFamily: "Dongle", fontSize: 25}}>
            {" "}
            Size:{" "}
          </Typography>
          <FormGroup sx={{flexDirection: "row", alignItems: "center"}}>
            {generateCheckboxes("size")}
          </FormGroup>
        </Box>
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          {/* Coat Selection */}
          <Autocomplete
            disableCloseOnSelect
            multiple
            id="coat"
            options={
              type === "Cat" ? catCoatLengthOptions : dogCoatLengthOptions
            }
            getOptionLabel={(option) => option}
            // TODO: Fix this
            onChange={(event, values) => {
              setSelectOptions({...selectOptions, coat: values});
            }}
            // renderTags?
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Coat Length"
                placeholder="Coat length"
                InputLabelProps={{style: {fontFamily: "Dongle", fontSize: 25}}}
              />
            )}
          />
        </Box>
        {/* Check boxes for attributes */}
        <Box sx={{margin: 1, marginTop: 0, marginBottom: 0}}>
          <FormGroup sx={{flexDirection: "row"}}>
            {generateCheckboxes("spayed_neutered")}
            {generateCheckboxes("house_trained")}
            {generateCheckboxes("special_needs")}
            {generateCheckboxes("shots_current")}
            {generateCheckboxes("children_friendly")}
            {generateCheckboxes("dogs_friendly")}
            {generateCheckboxes("cats_friendly")}
          </FormGroup>
        </Box>
      </Stack>
    </div>
  );
}
