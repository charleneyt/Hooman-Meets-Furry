/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from "react";

import {FormGroup} from "@mui/material";
import {Form, FormInput, Button} from "shards-react";

import {Row, Col} from "antd";
import {getRescues, getSearchRescues} from "../fetcher";

import RescueTable from "../components/RescuePage/RescueTable";

function RescuePageSelector(props) {
  const {state: stateQuery, setState: setStateQuery, city: cityQuery, setCity: setCityQuery} = props;
  const selectedRescueId = window.location.search
    ? window.location.search.substring(1).split("=")[1]
    : 0;
  const [selectedRescueDetails, setSelectedRescueDetails] =
    React.useState(null);
  const [rescueResults, setRescueResults] = React.useState([]);

  const handleCityQueryChange = (event) => {
    setCityQuery(event.target.value);
  };

  const handleStateQueryChange = (event) => {
    setStateQuery(event.target.value);
  };

  const updateSearchResults = () => {
    getSearchRescues(cityQuery, stateQuery, null, null).then((res) => {
      setRescueResults(res.results);
    });
  };

  React.useEffect(() => {
    getSearchRescues(cityQuery, stateQuery, null, null).then((res) => {
      setRescueResults(res.results);
    });

    getRescues(selectedRescueId).then((res) => {
      setSelectedRescueDetails(res.results[0]);
    });
  }, [cityQuery, selectedRescueId, stateQuery]);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Enter your location to find rescues</h1>
      <Form style={{width: "80vw", margin: "0 auto", marginTop: "5vh"}}>
        <Row>
          <Col flex={2}>
            <FormGroup style={{width: "20vw", margin: "0 auto"}}>
              <label>City</label>
              <FormInput
                placeholder="City"
                value={cityQuery}
                onChange={handleCityQueryChange}
              />
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{width: "20vw", margin: "0 auto"}}>
              <label>State</label>
              <FormInput
                placeholder="State"
                value={stateQuery}
                onChange={handleStateQueryChange}
              />
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

  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  

  return (
    <div>
      <RescuePageSelector 
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
      />
      <div
        style={{
          minWidth: 750,
          width: "80%",
          margin: "auto",
          marginTop: "5vh",
        }}
      >
        <RescueTable />
      </div>
    </div>
  );
}
