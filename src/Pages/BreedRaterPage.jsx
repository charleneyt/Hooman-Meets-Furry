import React from "react";
import BreedRaterTable from "../components/BreedRaterPage/BreedRaterTable";
import BreedRaterSelectBar from "../components/BreedRaterPage/BreedRaterSelectBar";

export default function BreedRaterPage() {
  return (
    <div className="container">
      <h1 style={{textAlign: "center"}}>Breed Rater</h1>
      <div
        style={{
          minWidth: 750,
          width: "80%",
          margin: "auto",
        }}
      >
        <BreedRaterSelectBar />
        <BreedRaterTable />
      </div>
    </div>
  );
}
