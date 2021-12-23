import React from "react";
import {makeStyles} from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {List} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import {GrSearchAdvanced} from "react-icons/gr";
import PetSearchBar from "../components/PetSearchPage/PetSearchBar";
import PetSearchEngine from "../components/PetSearchPage/PetSearchEngine";
import PetSearchCard from "../components/PetSearchPage/PetSearchCard";
import {getPetSearch, getLiked} from "../fetcher";

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
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
});

export default function PetSearchPage(props) {
  const username = props.username;
  // Fetch data and set data hooks
  const [checkBoxOptions, setCheckBoxOptions] = React.useState({});
  const [type, setType] = React.useState("Cat");
  const [location, setLocation] = React.useState("");
  const [selectOptions, setSelectOptions] = React.useState({});
  const [userLiked, setUserLiked] = React.useState(new Set());
  const [forceUpdate, setForceUpdate] = React.useState(0);

  // Pagination
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);
  const [pageCount, setPageCount] = React.useState(10);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    getLiked(username)
      .then((resp) => resp.json())
      .then((resp) => {
        setUserLiked(new Set(resp.results.map((item) => item.pet_id)));
      });
  }, [username, forceUpdate, page, pageSize]);

  // Store data
  const [data, setData] = React.useState([]);

  const styles = useStyles();

  React.useEffect(() => {
    setCheckBoxOptions({});
    setSelectOptions({});
  }, [type]);

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

  const [rendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    // Don't update the results unless drawer is closed
    // if (state?.Menu && rendered) return;
    // if (!rendered) {
    //   setIsRendered(true);
    // }

    const params = {};
    Object.entries(checkBoxOptions).forEach(([key, entry]) => {
      params[key] = [...entry];
    });
    Object.entries(selectOptions).forEach(([key, entry]) => {
      params[key] = [...entry];
    });
    params["type"] = type;
    params["location"] = location;

    getPetSearch(params)
      .then((resp) => resp.json())
      .then((resp) => {
        setPageCount(resp.results.length);
      });

    getPetSearch(params, page, pageSize)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp.results);
      });
  }, [
    checkBoxOptions,
    type,
    page,
    pageSize,
    location,
    selectOptions,
    state,
    rendered,
  ]);

  const totalPages = (pageCount, pageSize) => {
    return Math.ceil(pageCount / pageSize);
  };

  return (
    <div>
      {/* Pagination things */}
      <PetSearchBar
        type={type}
        setType={setType}
        location={location}
        setLocation={setLocation}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      <div className={styles.cardContainerStyle}>
        {data.map((row) => (
          <PetSearchCard
            key={row.id}
            data={row}
            username={username}
            liked={userLiked.has(row.id)}
            addLike={(newId) => {
              setUserLiked(new Set([...userLiked, newId]));
            }}
            setForceUpdate={() => setForceUpdate(forceUpdate + (1 % 100))}
          />
        ))}
      </div>
      <div className={styles.root}>
        <Box className={styles.fabStyle}>
          <Fab
            className={styles.fabStyle}
            aria-label="Menu"
            onClick={toggleDrawer("Menu", true)}
            style={{
              backgroundColor: "#FDE4E4",
            }}
          >
            <GrSearchAdvanced />
          </Fab>
          <Drawer
            ModalProps={{
              keepMounted: true,
            }}
            anchor="left"
            open={state.Menu}
            onClose={toggleDrawer("Menu", false)}
            sx={{
              width: 280,
              flexShrink: 0,
            }}
          >
            <List>
              <PetSearchEngine
                type={type}
                checkBoxOptions={checkBoxOptions}
                setCheckBoxOptions={setCheckBoxOptions}
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
              />
            </List>
          </Drawer>
        </Box>
      </div>
      <div className="pet-search-pagination">
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{marginTop: 10, marginBottom: 10}}
        >
          {/* Pagination */}
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={totalPages(pageCount, pageSize)}
          />
        </Stack>
      </div>
    </div>
  );
}
