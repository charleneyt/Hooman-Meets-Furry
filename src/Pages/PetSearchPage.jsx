import React from "react";
import {makeStyles} from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {List, Grid} from "@mui/material";
import Fab from "@mui/material/Fab";
import {GrSearchAdvanced} from "react-icons/gr";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchCard from "../components/PetSearchPage/PetSearchCard";

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
});

export default function PetSearchPage() {
  const styles = useStyles();

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

  // const sideBarSearchEng = (
  //   <Box>
  //     <Button onClick={toggleDrawer("Menu", true)}>Menu</Button>
  //     <Drawer
  //       anchor="left"
  //       open={state["Menu"]}
  //       onClose={toggleDrawer("Menu", false)}
  //       sx={{
  //         width: 280,
  //       }}
  //     >
  //       <PetSearchEngine />

  //       {console.log("left drawer open")}
  //     </Drawer>
  //   </Box>
  // );

  const sideSearchBar = (
    <Box>
      {/* TODO: uncomment this after finish the page */}
      {/* <Fab>
        <GrSearchAdvanced />
      </Fab> */}
      <Button onClick={toggleDrawer("Menu", true)}>Menu</Button>
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
          <PetSearchEngine />
        </List>
      </Drawer>
    </Box>
  );

  return (
    <div>
      <PetSearchBar />
      <div className="pet-search-card">
        <Grid container>
          <Grid item>
            <PetSearchCard />
          </Grid>
        </Grid>
      </div>
      <div className={styles.root}>{sideSearchBar}</div>
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
