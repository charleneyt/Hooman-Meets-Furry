import * as React from "react";
import { makeStyles } from "@mui/styles";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";
import Drawer from "@mui/material/Drawer";

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

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <PetSearchBar />
      <div className={styles.root}>
        <div className={styles.searchItem}>
          <PetSearchEngine />
        </div>
      </div>
    </div>
  );
}
