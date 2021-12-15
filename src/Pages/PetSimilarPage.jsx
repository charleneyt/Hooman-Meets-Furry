import React from "react";
import {getSimilar} from "../fetcher";
import PetSimilarCard from "../components/PetSimilarPage/PetSimilarCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Box} from "@mui/material";
import CatDogSwitch from "../components/utils/CatDogSwitch";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 5,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
};

export default function PetSimilarPage(props) {
  const {username} = props;
  const [type, setType] = React.useState("Cat");
  const [data, setData] = React.useState([]);
  // Pagination
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    getSimilar(username, type, page, 20)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp.results);
      });
  }, [username, type, page]);

  return (
    <div>
      <h1 style={{textAlign: "center", color: "#8dbdc7", fontSize: 50}}>
        Meet more similar pets...
      </h1>
      {/* Find next 100 */}
      <Stack direction="row">
        <IconButton
          aria-label="delete"
          size="small"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
        {data.map((dataRow) => (
          <Box
            key={dataRow.id}
            style={{marginTop: "auto", marginBottom: "auto", display: "flex"}}
          >
            <img
              src={dataRow.photo}
              alt={dataRow.name}
              width="30"
              height="30"
            />
          </Box>
        ))}

        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => setPage(page + 1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <CatDogSwitch type={type} setType={setType} />
      {/* TODO: do we need to show dots? draggable? */}
      <Box style={{marginTop: 20}}>
        <Carousel
          responsive={responsive}
          centerMode={true}
          draggable={true}
          autoPlay={props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1200}
          deviceType={props.deviceType}
          infinite={true}
        >
          {data.map((dataRow) => (
            <div key={dataRow.id}>
              <PetSimilarCard dataRow={dataRow} />
            </div>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}
