import * as React from "react";
import Card from "@mui/material/Card";
import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {RiHeart3Fill, RiHomeHeartLine} from "react-icons/ri";
import {GiCat, GiSittingDog} from "react-icons/gi";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const dataDemo = [
  createData(
    "Cat",
    "Domestic Short Hair",
    "Black & White / Tuxedo",
    "Baby",
    "Male",
    "Small",
    "Short",
    true,
    true,
    false,
    true,
    "None",
    "None",
    "None",
    "Orlando",
    "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53106827/1/?bust=1632791542",
  ),
  createData(
    "Cat",
    "Domestic Short Hair",
    "Orange & White",
    "Baby",
    "Male",
    "Medium",
    "Short",
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    "Murray",
    "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53106825/1/?bust=1632791520",
  ),
];
function createData(
  type,
  breed,
  color,
  age,
  gender,
  size,
  coat,
  spayedNeutered,
  houseTrained,
  specialNeeds,
  shotsCurrent,
  childrenFriendly,
  dogsFriendly,
  catsFriendly,
  name,
  photo,
) {
  return {
    type,
    breed,
    color,
    age,
    gender,
    size,
    coat,
    spayed_neutered: spayedNeutered,
    house_trained: houseTrained,
    special_needs: specialNeeds,
    shots_current: shotsCurrent,
    children_friendly: childrenFriendly,
    dogs_friendly: dogsFriendly,
    cats_friendly: catsFriendly,
    name,
    photo,
  };
}
export default function PetSearchCard() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandedClick = () => {
    setExpanded(!expanded);
  };

  return (
    // TODO: Change the data demo to real data
    <Card sx={{margin: 1, minWidth: 250, maxWidth: 345}}>
      <CardHeader
        // Name
        title={dataDemo[0].name}
        // Breed?
        subheader={dataDemo[0].breed}
        // TODO: add img
        avatar={
          <Avatar
            alt={dataDemo[0].type === "Cat" ? "Cat" : "Dog"}
            sx={{bgcolor: "#ef6694"}}
          >
            {dataDemo[0].type === "Cat" ? <GiCat /> : <GiSittingDog />}
          </Avatar>
        }
        action={
          <IconButton aria-label="more" sx={{marginLeft: "auto"}}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      {/* Pet Pictures */}
      <CardMedia
        component="img"
        height="225"
        image={dataDemo[0].photo}
        alt="cat name"
      />
      <CardContent>
        {/* Gender */}

        {/* Ugly */}
        <Chip
          icon={dataDemo[0].gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
          label={dataDemo[0].gender}
          variant="outlined"
          sx={{
            background: dataDemo[0].gender === "Male" ? "#afdcec" : "#ffc0cb",
          }}
        />
        <Typography>
          {dataDemo[0].gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
          {dataDemo[0].gender}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <RiHeart3Fill />
        </IconButton>
        <IconButton aria-label="rescue">
          <RiHomeHeartLine />
        </IconButton>
        {/* TODO: ask if we need collapse */}
        <IconButton
          sx={{
            marginLeft: "auto",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ExpandMoreIcon
            expand={expanded}
            onClick={handleExpandedClick}
            aria-expanded={expanded}
            aria-label="show more"
          />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography paragraph>This is hidden text</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
