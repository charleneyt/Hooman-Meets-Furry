import Card from "@mui/material/Card";
import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {RiHeart3Fill, RiHomeHeartLine} from "react-icons/ri";
import {GiCat, GiSittingDog} from "react-icons/gi";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";



export default function PetSearchCard(props) {
  const dataRow = props.data;
  return <Card sx={{margin: 1, width: 280}}>
      <CardHeader
        titleTypographyProps={{fontFamily: "Dongle", fontSize: 25}}
        title={dataRow.name}
        // Breed?
        subheaderTypographyProps={{fontFamily: "Dongle", fontSize: 25}}
        subheader={dataRow.breed}
        // TODO: add img?
        avatar={
          <Avatar
            alt={dataRow.type === "Cat" ? "Cat" : "Dog"}
            sx={{bgcolor: "#ef6694"}}
          >
            {dataRow.type === "Cat" ? <GiCat /> : <GiSittingDog />}
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
        image={dataRow.photo}
        alt={dataRow.name}
      />
      <CardContent>
        {/* TODO: fix css */}
        {/* Add location? */}
      <Typography style={{fontSize: 25, fontFamily: "Dongle"}}> 
      {dataRow.age} 
       {dataRow.name} 
        </Typography>
        <Typography style={{fontSize: 25, fontFamily: "Dongle"}}>
          {dataRow.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
          {dataRow.gender} 
          {dataRow.size}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <RiHeart3Fill />
        </IconButton>
        <IconButton aria-label="rescue">
          <RiHomeHeartLine />
        </IconButton>
      </CardActions>
    </Card>;
}
