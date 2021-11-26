import * as React from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";

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
          {/* <TextField
          label="Enter Your Search Query"
          value={value}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        /> */}
        </div>
      </div>
    </div>
  );
}
