import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, Grid} from "@mui/material";
import Chip from "@mui/material/Chip";
import {Box} from "@mui/system";
import {HiOutlineLocationMarker} from "react-icons/hi";
import AllPetInfoPage from "../../Pages/AllPetInfoPage";

export default function PetSimilarCard(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const dataRow = props.dataRow;
  const petId = dataRow.id;
  const handleClose = () => {
    setOpenModal(false);
  };
  const onButtonClick = (event) => {
    setOpenModal(true);
  };
  return (
    <>
      <Grid item sx={{m: 1}} style={{height: 350}}>
        <Card raised style={{height: 350, width: 250}}>
          <CardMedia
            component="img"
            height="160"
            image={dataRow.photo}
            alt={dataRow.name}
          />
          <CardActionArea style={{maxHeight: 130}}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{fontFamily: "Dongle", fontSize: 23}}
                  >
                    {dataRow.name}
                    {dataRow.gender === "Male" ? (
                      <img
                        alt="male"
                        src="https://img.icons8.com/color/20/000000/male.png"
                      />
                    ) : (
                      <img
                        alt="female"
                        src="https://img.icons8.com/color/20/000000/female.png"
                      />
                    )}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    style={{
                      fontSize: 20,
                      fontFamily: "Dongle",
                      color: "gray",
                      textAlign: "right",
                    }}
                  >
                    <HiOutlineLocationMarker />

                    {dataRow.location}
                  </Typography>
                </Grid>
              </Grid>
              <Box spacing={1}>
                <Chip
                  label={dataRow.age}
                  style={{backgroundColor: "#E0F2F1"}}
                />
                <Chip
                  label={dataRow.breed}
                  style={{backgroundColor: "#FAD4E0"}}
                />
                <Chip
                  label={dataRow.color}
                  style={{backgroundColor: "#FFF0D7"}}
                />
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              size="small"
              value={dataRow.id}
              onClick={onButtonClick}
              style={{
                marginBottom: "auto",
                marginLeft: "auto",
                backgroundColor: "#F48BA9",
              }}
            >
              Adopt
            </Button>
            <AllPetInfoPage
              openModal={openModal}
              handleClose={handleClose}
              petId={petId}
            />
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
