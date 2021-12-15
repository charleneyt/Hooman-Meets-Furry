import React from "react";
import RecCard from "../components/ReccomendationPage/RecCard";
import CatDogSwitch from "../components/utils/CatDogSwitch";
import { getRecommend } from "../fetcher";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationButton from "../components/utils/PaginationButton";

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
  const [pageSize, setPageSize] = React.useState(20);
  // data and setData
  const [data, setData] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(10);

  const handlePageChange = (event, value) => {
    setPage(value);
  }
  const handleChangeFeature = (event) => {
    setFeature(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // This is for pagination
  React.useEffect(() => {
    getRecommend(feature, type).then(resp => resp.json()).then(resp => {
      setPageCount(resp.results.length);
    })
  }, [feature, type]);
  
  const totalPages = (pageCount, pageSize) => {
    return Math.ceil(pageCount/pageSize);
  }

  // Query
  React.useEffect(() => {   
    getRecommend(feature, type, page, pageSize).then(resp => resp.json()).then(resp => {
      setData(resp.results);
    })
  }, [type, feature, page, pageSize]);

  return (
    <div>
      <Box sx={{float:"right"}}>
      </Box>
      {/* TODO: icon bigger, add colors, or even change the icon */}
      <div className="select-type">
        <CatDogSwitch type={type} setType={setType}/>
      </div>
      {/* TODO: rerender */}
      <div>
        <PaginationButton pageSize={pageSize} setPageSize={setPageSize}/>
      </div>
      <div>
      {/* Select Bar */}
      <FormControl variant="standard" sx={{marginBottom: 5, minWidth: 300}}>
        <InputLabel style={{fontSize: 25, fontFamily: "Dongle"}} id="label">Feature</InputLabel>
        <Select
          labelId="select-label"
          id="rater-select-bar"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={feature}
          label="Feature"
          onChange={handleChangeFeature}
          sx={{ fontSize: 25, fontFamily: "Dongle" }}
          // setFeature={setFeature}
          // onClick={handleChangeFeature}
        >
          {Object.keys(features).map((key) => (
            <MenuItem style={{fontSize: 25, fontFamily: "Dongle"}} key={key} value={key}>{features[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      {/* Recommending cards */}
  
      <div>
        <Grid container spacing={2}>
          {data.map(row =>           
          <Grid key={row.id} item xs={12} sm={6} md={4}>
            <RecCard key={row.id}  data={row}/>
          </Grid>)}
        </Grid>
      </div>
      {/* Pagination */}
      <Box>
        <Pagination page={page} onChange={handlePageChange} count={totalPages(pageCount, pageSize)}/>
      </Box>
    </div>
  );
}
