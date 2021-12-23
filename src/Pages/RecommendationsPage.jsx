import React from "react";
import RecCard from "../components/ReccomendationPage/RecCard";
import CatDogSwitch from "../components/utils/CatDogSwitch";
import {getRecommend} from "../fetcher";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationButton from "../components/utils/PaginationButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const useStyles = makeStyles({
  selectBox: {
    marginLeft: 10,
  },
});

export default function RecommendationsPage() {
  // for type button
  const [type, setType] = React.useState("Dog");
  // for select
  const [feature, setFeature] = React.useState("general_health");
  const [open, setOpen] = React.useState(false);
  // page and pagesize
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  // data and setData
  const [data, setData] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeFeature = (event) => {
    setFeature(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const styles = useStyles();

  // This is for pagination
  React.useEffect(() => {
    getRecommend(feature, type)
      .then((resp) => resp.json())
      .then((resp) => {
        setItemCount(resp.results.length);
      });
  }, [feature, type]);

  // Query
  React.useEffect(() => {
    getRecommend(feature, type, page, pageSize)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp.results);
      });
  }, [type, feature, page, pageSize]);

  return (
    <div className={styles.selectBox}>
      <h1 style={{textAlign: "center", color: "#8dbdc7", fontSize: 50}}>
        Recommended Just For You
      </h1>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{marginBottom: 5}}
      >
        <CatDogSwitch type={type} setType={setType} />
        {/* Select Bar */}
        <FormControl variant="standard" sx={{minWidth: 225}}>
          <InputLabel style={{fontSize: 25, fontFamily: "Dongle"}} id="label">
            Feature
          </InputLabel>
          <Select
            labelId="select-label"
            id="rater-select-bar"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={feature}
            label="Feature"
            onChange={handleChangeFeature}
            sx={{fontSize: 25, fontFamily: "Dongle"}}
            // setFeature={setFeature}
            // onClick={handleChangeFeature}
          >
            {Object.keys(features).map((key) => (
              <MenuItem
                style={{fontSize: 25, fontFamily: "Dongle"}}
                key={key}
                value={key}
              >
                {features[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <PaginationButton pageSize={pageSize} setPageSize={setPageSize} />
      </Stack>
      {/* Recommending cards */}
      <div>
        <Grid container spacing={2}>
          {data.map((row) => (
            <Grid key={row.id} item xs={12} sm={6} md={2.4}>
              <RecCard key={row.id} data={row} />
            </Grid>
          ))}
        </Grid>
      </div>
      {/* Pagination */}
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{marginTop: 10, marginBottom: 10}}
      >
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={Math.ceil(itemCount / pageSize)}
        />
      </Stack>
    </div>
  );
}
