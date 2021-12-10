import React from "react";
import RecCard from "../components/ReccomendationPage/RecCard";
import CatDogSwitch from "../components/utils/CatDogSwitch";
import { getRecommend } from "../fetcher";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from '@mui/material/Grid';

const features = {
  general_health: "General health",
  affectionate_with_family: "Affectionate with Family",
  amount_of_shedding: "Amount of shedding",
  easy_to_groom: "Easy to groom",
  intelligence: "Intelligence",
  kid_friendly: "Kid friendly",
  pet_friendly: "Pet friendly",
  potential_for_playfulness: "Potential for playfulness",
};

// TODO: add a just for you on top

export default function RecommendationsPage() {
  // for type button
  const [type, setType] = React.useState("Dog")
  // for select
  const [feature, setFeature] = React.useState("general_health");
  const [open, setOpen] = React.useState(false);
  // TODO: do pagination 
  // page and pagesize
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);
  // data and setData
  const [data, setData] = React.useState([]);

  const handleChangeFeature = (event) => {
    setFeature(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  React.useEffect(() => {
    getRecommend(feature, type, page, pageSize).then(resp => resp.json()).then(resp => {
      
      setData(resp.results);
    })

    console.log("after change: " + feature + "," + type + "," + page + "," + pageSize);
  }, [type, feature, page, pageSize]);


  return (
    <div>
      {/* TODO: icon bigger, add colors, or even change the icon */}
      <div className="select-type">
        <CatDogSwitch type={type} setType={setType}/>
      </div>
      <div>
      {/* Select Bar */}
      <FormControl variant="standard" sx={{marginBottom: 5, minWidth: 300}}>
        <InputLabel id="label">Feature</InputLabel>
        <Select
          labelId="select-label"
          id="rater-select-bar"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={feature}
          label="Feature"
          onChange={handleChangeFeature}
          // setFeature={setFeature}
          // onClick={handleChangeFeature}
        >
          {Object.keys(features).map((key) => (
            <MenuItem key={key} value={key}>{features[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      {/* Recommending cards */}
  
      <div>
        <Grid container spacing={1}>
          {data.map(row =>           
          <Grid key={row.id} item xs={12} sm={6} md={2.4}>
            <RecCard key={row.id}  data={row}/>
          </Grid>)}
        </Grid>
      </div>
    </div>
  );
}
