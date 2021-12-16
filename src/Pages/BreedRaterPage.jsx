import React from "react";
import BreedRaterTable from "../components/BreedRaterPage/BreedRaterTable";
import BreedRateSelectBar from "../components/BreedRaterPage/BreedRaterSelectBar";
import CatDogSwitch from "../components/utils/CatDogSwitch"
import { getTopTen } from "../fetcher";
import Stack from "@mui/material/Stack";


export default function BreedRaterPage() {

  const [feature, setFeature] = React.useState("affectionate_with_family");
  const [type, setType] = React.useState("Dog");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getTopTen(type, feature).then(resp => resp.json()).then(resp => {
       const modifiedResults = [];
      let i = 1;
      for (const result of resp.results) {
        modifiedResults.push({
          ...result,
          rank: i++
        })
      }
      setData(modifiedResults);
    });
  }, [feature, type])

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#8dbdc7", fontSize: 50 }}>Breed Rater</h1>
      <div
        style={{
          minWidth: 750,
          width: "80%",
          margin: "auto",
          textAlign: "left"
        }}
      >
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{marginBottom: 5}}
        >
        <CatDogSwitch textAlign="center" type={type} setType={setType}/>
        <BreedRateSelectBar feature={feature} setFeature={setFeature}/>
        </Stack>
        <BreedRaterTable data={data}/>
        
      </div>
    </div>
  );
}
