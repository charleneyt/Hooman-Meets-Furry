import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FaCat, FaDog } from "react-icons/fa";
import Grid from "@mui/material/Grid";
import RecCard from "../components/ReccomendationPage/RecCard";

const features = {
  "General Health": "general_health",
  "Affectionate with Family": "affectionate_with_family",
  "Amount of Shedding": "amount_of_shedding",
  "Easy to Groom": "easy_to_groom",
  Intelligence: "intelligence",
  "Kid Friendly": "kid_friendly",
  "Pet Friendly": "pet_friendly",
  "Potential for Playfulness": "potential_for_playfulness",
};

export default function RecommendationsPage() {
  // for type button
  const [alignment, setAlignment] = React.useState("left");
  // for select
  const [value, setValue] = React.useState(features[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      {/* TODO: icon bigger, add colors */}
      <div className="select-type">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          size="large"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FaCat />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FaDog />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* Text field */}
      <div>
        {/* TODO: Delete and change this */}
        <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={Object.keys(features)}
          sx={{ width: 300 }}
          renderInput={(params) => {
            return <TextField {...params} label="Features" />;
          }}
        />
        <RecCard />
      </div>

      {/* Recommending cards*/}
      {/* TODO: implement card and uncoment this*/}
      {/* <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card />
          </Grid>
        </Grid>
      </div> */}
    </div>
  );
}
