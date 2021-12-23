/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from "react";
import {FormGroup} from "@mui/material";
import {Form, FormInput} from "shards-react";
import {Row, Col} from "antd";
import {getSearchRescues} from "../fetcher";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import {BiSearchAlt} from "react-icons/bi";

import RescueTable from "../components/RescuePage/RescueTable";

const menuItems_state = {
  AL: "AL",
  AK: "AK",
  AZ: "AZ",
  AR: "AR",
  CA: "CA",
  CO: "CO",
  CT: "CT",
  DE: "DE",
  DC: "DC",
  FL: "FL",
  GA: "GA",
  HI: "HI",
  ID: "ID",
  IL: "IL",
  IN: "IN",
  IA: "IA",
  KS: "KS",
  KY: "KY",
  LA: "LA",
  ME: "ME",
  MD: "MD",
  MA: "MA",
  MI: "MI",
  MN: "MN",
  MS: "MS",
  MO: "MO",
  MT: "MT",
  NE: "NE",
  NV: "NV",
  NH: "NH",
  NJ: "NJ",
  NM: "NM",
  NY: "NY",
  NC: "NC",
  ND: "ND",
  OH: "OH",
  OK: "OK",
  OR: "OR",
  PA: "PA",
  PR: "PR",
  RI: "RI",
  SC: "SC",
  SD: "SD",
  TN: "TN",
  TX: "TX",
  UT: "UT",
  VT: "VT",
  VA: "VA",
  VI: "VI",
  WA: "WA",
  WV: "WV",
  WI: "WI",
  WY: "WY",
};

const menuItems_type = {
  Cat: "Cat",
  Dog: "Dog",
};

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const theme = createTheme({
  palette: {
    lightblue: {
      main: "#8ac6d1",
      contrastText: "#fff",
    },
  },
});

function RescuePageSelector(props) {
  const {setRescueResults} = props;
  const {
    state: stateQuery,
    setState: setStateQuery,
    city: cityQuery,
    setCity: setCityQuery,
    type: typeQuery,
    setType: setTypeQuery,
  } = props;

  const handleCityQueryChange = (event) => {
    setCityQuery(event.target.value);
  };

  const handleStateQueryChange = (event) => {
    setStateQuery(event.target.value);
  };

  const handleTypeQueryChange = (event) => {
    setTypeQuery(event.target.value);
  };

  const updateSearchResults = () => {
    getSearchRescues(cityQuery, stateQuery, typeQuery, null, null)
      .then((resp) => resp.json())
      .then((resp) => {
        setRescueResults(resp.results);
      });
  };

  return (
    <div>
      <h1 style={{textAlign: "center", color: "#8dbdc7", fontSize: 50}}>
        Enter your location to find rescues
      </h1>
      <Form style={{width: "80vw", margin: "0 auto", marginTop: "5vh"}}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase sx={{width: 300, height: 300}}>
              <Img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg?crop=0.668xw:1.00xh;0.247xw,0&resize=768:*"
                alt="cat picture"
              />
            </ButtonBase>
          </Grid>
          <Grid item>
            <Row>
              <Col flex={2}>
                <FormGroup style={{width: "20vw", margin: "0 auto"}}>
                  <label>City</label>
                  <FormInput
                    value={cityQuery}
                    onChange={handleCityQueryChange}
                    style={{background: "#eeecee", border: "gray 1px solid"}}
                  />
                  <label>State</label>
                  <Select
                    value={stateQuery}
                    onChange={handleStateQueryChange}
                    sx={{height: 30, fontSize: 23, fontFamily: "Dongle"}}
                  >
                    {Object.keys(menuItems_state).map((key) => (
                      <MenuItem
                        style={{fontSize: 23, fontFamily: "Dongle"}}
                        key={key}
                        value={key}
                      >
                        {menuItems_state[key]}
                      </MenuItem>
                    ))}
                  </Select>
                  <label>Pet Type</label>
                  <Select
                    value={typeQuery}
                    onChange={handleTypeQueryChange}
                    sx={{height: 30, fontSize: 23, fontFamily: "Dongle"}}
                  >
                    {Object.keys(menuItems_type).map((key) => (
                      <MenuItem
                        style={{fontSize: 23, fontFamily: "Dongle"}}
                        key={key}
                        value={key}
                      >
                        {menuItems_type[key]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup
                  style={{width: "10vw", margin: "0 auto", marginTop: "4vh"}}
                >
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="lightblue"
                      startIcon={<BiSearchAlt />}
                      onClick={updateSearchResults}
                    >
                      Search
                    </Button>
                  </ThemeProvider>
                </FormGroup>
              </Col>
            </Row>
          </Grid>
          <Grid item>
            <ButtonBase sx={{width: 300, height: 300}}>
              <Img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
                alt="dog picture"
              />
            </ButtonBase>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}

export default function RescuePage() {
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [type, setType] = React.useState("");
  const [rescueResults, setRescueResults] = React.useState([]);

  React.useEffect(() => {
    getSearchRescues(city, state, type, null, null)
      .then((resp) => resp.json())
      .then((resp) => {
        setRescueResults(resp.results);
      });
  }, [city, state, type]);

  return (
    <div>
      <RescuePageSelector
        setRescueResults={setRescueResults}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        type={type}
        setType={setType}
      />
      <div
        style={{
          minWidth: 750,
          width: "80%",
          margin: "auto",
          marginTop: "5vh",
        }}
      >
        <RescueTable data={rescueResults} />
      </div>
    </div>
  );
}
