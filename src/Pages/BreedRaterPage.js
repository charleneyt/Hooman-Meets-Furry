import React from "react";
import BreedRaterTable from "../components/BreedRaterPage/BreedRaterTable";
import Box from "@mui/material/Box";
import BreedRaterSelectBar from "../components/BreedRaterPage/BreedRaterSelectBar";

class BreedRaterPageClass extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Breed Rater</h1>
        <Box>
          <BreedRaterSelectBar />
        </Box>
        <div
          style={{
            minWidth: 750,
            width: "80%",
            margin: "auto",
          }}
        >
          <BreedRaterTable />
        </div>
      </div>
    );
  }
}

export default function BreedRaterPage() {
  return <BreedRaterPageClass />;
}
