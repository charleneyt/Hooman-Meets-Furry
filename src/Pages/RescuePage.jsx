/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from "react";
import {FormGroup} from "@mui/material";
import {Form, FormInput, Button} from "shards-react";
import {Row, Col} from "antd";
import {getSearchRescues} from "../fetcher";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  WY: "WY"
};

const menuItems_type = {
  Cat: "Cat",
  Dog: "Dog"
};

function RescuePageSelector(props) {
  const {setRescueResults} = props;
  const {state: stateQuery, setState: setStateQuery, city: cityQuery, setCity: setCityQuery, type: typeQuery, setType: setTypeQuery} = props;
  const [open, setOpen] = React.useState(false);

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
    getSearchRescues(cityQuery, stateQuery, typeQuery, null, null).then(resp => resp.json()).then(resp => {
      setRescueResults(resp.results);
    });
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Enter your location to find rescues</h1>
      <Form style={{width: "80vw", margin: "0 auto", marginTop: "5vh"}}>
        <Row>
          <Col flex={2}>
            <FormGroup style={{width: "20vw", margin: "0 auto"}}>
              <label>City</label>
              <FormInput
                value={cityQuery}
                onChange={handleCityQueryChange}
              />
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{width: "20vw", margin: "0 auto"}}>
              {/* TODO: change the style of select bar */}
              <label>State</label>
              <Select
                value={stateQuery}
                onChange={handleStateQueryChange}
              >
                {Object.keys(menuItems_state).map((key) => (
                  <MenuItem key={key} value={key}>{menuItems_state[key]}</MenuItem>
                ))}
              </Select>
              <label>Type</label>
              <Select
                value={typeQuery}
                onChange={handleTypeQueryChange}
              >
                {Object.keys(menuItems_type).map((key) => (
                  <MenuItem key={key} value={key}>{menuItems_type[key]}</MenuItem>
                ))}
              </Select>
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{width: "10vw", margin: "0 auto"}}>
              <Button style={{marginTop: "4vh"}} onClick={updateSearchResults}>
                Search
              </Button>
            </FormGroup>
          </Col>
        </Row>
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
    getSearchRescues(city, state, type, null, null).then(resp => resp.json()).then(resp => {
      setRescueResults(resp.results);
    })
  }, []);

  return (
    <div>
      <RescuePageSelector 
        setRescueResults={setRescueResults} city={city} setCity={setCity} state={state} setState={setState} type={type} setType={setType}
      />
      {/* <CatDogSwitch type={type} setType={setType}/> */}
      <div
        style={{
          minWidth: 750,
          width: "80%",
          margin: "auto",
          marginTop: "5vh",
        }}
      >
        <RescueTable data={rescueResults}/>
      </div>
    </div>
  );
}
