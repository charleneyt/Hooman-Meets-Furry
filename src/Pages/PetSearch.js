import * as React from "react";
import { makeStyles } from "@mui/styles";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Fab from "@mui/material/Fab";
import { GrSearchAdvanced } from "react-icons/gr";

const useStyles = makeStyles({
  root: {
    height: "100%",
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
  },
  searchItem: {
    wids: 800,
    minWidth: 300,
    marginTop: 50,
  },
});

export default function PetSearchPage() {
  const styles = useStyles();

  const [state, setState] = React.useState({ Menu: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // we want to set the drawer to open
    setState({ ...state, [anchor]: open });
  };

  const sideBarSearchEng = (
    <Box>
      <Button onClick={toggleDrawer("Menu", true)}>Menu</Button>
      <Drawer
        anchor="left"
        open={state["Menu"]}
        onClose={toggleDrawer("Menu", false)}
        sx={{
          width: 280,
        }}
      >
        <PetSearchEngine />

        {console.log("left drawer open")}
      </Drawer>
    </Box>
  );

  const sideSearchBar = (
    <Box>
      {/* TODO: uncomment this after finish the page */}
      {/* <Fab>
            <GrSearchAdvanced />
          </Fab> */}
      <Button onClick={toggleDrawer("Menu", true)}>Menu</Button>
      <Drawer
        anchor="left"
        open={state["Menu"]}
        onClose={toggleDrawer("Menu", false)}
        sx={{
          width: 280,
          flexShrink: 0,
        }}
      >
        <List>
          <PetSearchEngine />
        </List>

        {console.log("left drawer open")}
      </Drawer>
    </Box>
  );

  return (
    <div>
      <PetSearchBar />

      <div className={styles.root}>{sideSearchBar}</div>
    </div>
  );
}
