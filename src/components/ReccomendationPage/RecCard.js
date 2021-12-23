import React from "react";
import Card from "@mui/material/Card";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {IoPawSharp} from "react-icons/io5";
import AllPetInfoPage from "../../Pages/AllPetInfoPage";
import {pink, blue} from "@mui/material/colors";

// SELECT P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location

export default function RecCard(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const dataRow = props.data;
  const petId = dataRow.id;
  const handleClose = () => {
    setOpenModal(false);
  };
  const onButtonClick = (event) => {
    setOpenModal(true);
  };
  return (
    <Card variant="outlined" sx={{minWidth: 275}}>
      <CardContent>
        <Typography
          sx={{fontSize: 25, fontFamily: "Dongle"}}
          color="#8dbdc7"
          gutterBottom
        >
          <IconButton
            aria-label="more"
            sx={{marginLeft: "auto", color: "#8dbdc7"}}
          >
            <IoPawSharp />
          </IconButton>
          {dataRow.name}
        </Typography>
        {/* TODO: fix the height let it the smae  */}
        <CardMedia
          component="img"
          height="400"
          image={dataRow.photo}
          alt={dataRow.name}
        />
        <Typography sx={{mb: 1.5, fontFamily: "Dongle"}} color="text.secondary">
          {/* TODO: add icons for this  */}
          {/* {dataRow.type}  */}
          {dataRow.breed}
        </Typography>
        <Typography style={{fontSize: 25, fontFamily: "Dongle"}}>
          {dataRow.gender === "Male" ? (
            <MaleIcon sx={{color: blue[500], fontSize: 20}} />
          ) : (
            <FemaleIcon sx={{color: pink[500], fontSize: 20}} />
          )}
          {dataRow.gender}
        </Typography>
        <Typography
          style={{fontSize: 25, fontFamily: "Dongle"}}
          variant="body2"
        >
          {dataRow.color}
          <br />
          {dataRow.age}
        </Typography>
        <Typography style={{fontSize: 25, fontFamily: "Dongle"}}>
          <IconButton aria-label="more" sx={{marginLeft: "auto"}}>
            <HiOutlineLocationMarker />
          </IconButton>
          {dataRow.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          value={dataRow.id}
          onClick={onButtonClick}
          style={{fontSize: 20, fontFamily: "Dongle", textAlign: "center"}}
        >
          Learn More
        </Button>
        <AllPetInfoPage
          openModal={openModal}
          handleClose={handleClose}
          petId={petId}
        />
      </CardActions>
    </Card>
  );
}
