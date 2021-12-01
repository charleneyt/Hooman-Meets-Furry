import React from "react";

import RescueTable from "../components/RescuePage/RescueTable";

import { FormGroup } from "@mui/material";
import { Form, FormInput, Button } from "shards-react";

import config from '../config.json';

import {
    Row, 
    Col,
} from 'antd'
 
const getRescueSearch = async (city, state, page, pagesize) => {
    var result = await fetch(`http://${config.server_host}:${config.server_port}/search/rescue_serach?City=${city}&State=${state}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return result.json()
}

const getRescue = async (id) => {
    var result = await fetch(`http://${config.server_host}:${config.server_port}/rescue_serach?id=${id}`, {
        method: 'GET',
    })
    return result.json()
}

class RescuePageClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cityQuery: "",
            stateQuery: "",
            rescueResults: [],
            selectedRescueId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedRescueDetails: null
        }

        this.handleCityQueryChange = this.handleCityQueryChange.bind(this)
        this.handleStateQueryChange = this.handleStateQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToRescue = this.goToRescue.bind(this)
    }

    handleCityQueryChange(event) {
        this.setState({ cityQuery: event.target.value })
    }

    handleStateQueryChange(event) {
        this.setState({ stateQuery: event.target.value })
    }

    goToRescue(rescueId) {
        window.location = `/rescue_search?id=${rescueId}`
    }

    updateSearchResults() {
        getRescueSearch(this.state.cityQuery, this.state.stateQuery, null, null).then(res => {
            this.setState({ rescueResults: res.results })
        }) 
    }
    
    componentDidMount() {
        getRescueSearch(this.state.cityQuery, this.state.stateQuery, null, null).then(res => {
            this.setState({ rescueResults: res.results })
        })

        getRescue(this.state.selectedRescueId).then(res => {
            this.setState({ selectedRescueDetails: res.results[0] })
        })
    }

    render() {
        return (
                <div >
                    <h1 style={{ textAlign: "center" }}>Enter your location to find rescues</h1>
                    <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                        <Row>
                            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                                <label>City</label>
                                <FormInput placeholder="City" value={this.state.cityQuery} onChange={this.handleCityQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                                <label>State</label>
                                <FormInput placeholder="State" value={this.state.stateQuery} onChange={this.handleStateQueryChange} />
                            </FormGroup></Col>
                            <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup></Col>
                        </Row>
                    </Form>
                </div>
        )
    }
}

export default function RescuePage() {
  return (
    <div>
        <RescuePageClass />
        <div
            style={{
            minWidth: 750,
            width: "80%",
            margin: "auto",
            marginTop: '5vh'
            }}
        >
            <RescueTable />
        </div>
    </div>);
}
