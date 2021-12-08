import React from "react";
import {makeStyles} from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {List, Grid, Typography} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import {GrSearchAdvanced} from "react-icons/gr";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchCard from "../components/PetSearchPage/PetSearchCard";
import { getPetSearch } from "../fetcher";

const useStyles = makeStyles({
  root: {
    height: "100%",
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
  },
  searchItem: {
    width: 800,
    minWidth: 300,
    marginTop: 50,
  },
  cardContainerStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    marginTop: 30,
  },
  fabStyle: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
});

export default function PetSearchPage() {
  // Fetch data and set data hoooks
  const [checkBoxOptions, setCheckBoxOptions] = React.useState({});
  const [type, setType] = React.useState("Cat");
  const [location, setLocation] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Store data
  const [data, setData] = React.useState([]);

  // TODO: Make a select bar for user to decide pagesize
  const styles = useStyles();
  
  React.useEffect(() => {
    const params = {};
    
    Object.entries(checkBoxOptions).forEach(([key, entry]) => {
      params[key] = [...entry]
    })

    params["type"] = type;
    params["location"] = location;

    getPetSearch(params, currentPage, 25).then(resp => resp.json()).then(resp => {
      setData(resp.results);
    })
  }, [checkBoxOptions, type, currentPage, location]);

  // Drawer
  const [state, setState] = React.useState({Menu: false});
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // we want to set the drawer to open
    setState({...state, [anchor]: open});
  };

  return (
    <div>
      <PetSearchBar type={type} setType={setType} location={location} setLocation={setLocation}/>
      <div className={styles.cardContainerStyle}>      
        {
        data.map(row => 
          <PetSearchCard key={row.id} data={row}/>)
        }
      </div>
      <div className={styles.root}>
        <Box className={styles.fabStyle}>
          {console.log(styles)}
          <Fab className={styles.fabStyle} aria-label="Menu" onClick={toggleDrawer("Menu", true)}>
            <GrSearchAdvanced />
          </Fab>
          <Drawer
            anchor="left"
            open={state.Menu}
            onClose={toggleDrawer("Menu", false)}
            sx={{
              width: 280,
              flexShrink: 0,
            }}
          >
            <List>
              <PetSearchEngine type={type} checkBoxOptions={checkBoxOptions} setCheckBoxOptions={setCheckBoxOptions}/>
            </List>
          </Drawer>
        </Box>
      </div>
      <div className="pet-search-pagination">
        <Stack spacing={2}>
          <Typography>Page: {currentPage}</Typography>
          {/* TODO: Add count for pages */}
          <Pagination page={currentPage} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
}
