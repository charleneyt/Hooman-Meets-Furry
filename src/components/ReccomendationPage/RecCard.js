import Card from "@mui/material/Card";
import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoPawSharp } from "react-icons/io5";

// SELECT P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location

export default function RecCard(props) {
  const dataRow = props.data;
  return (
    // TODO: Add what kind of element we want in the card
    <Card variant="outlined" sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 25, fontFamily: "Dongle"}} color="#8dbdc7" gutterBottom>
          <IconButton aria-label="more" sx={{marginLeft: "auto", color: "#8dbdc7"}}>
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
          {dataRow.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
          {dataRow.gender} 
        </Typography>
        <Typography style={{fontSize: 25, fontFamily: "Dongle"}} variant="body2">
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
        <Button style={{fontSize: 20, fontFamily: "Dongle", textAlign: "center"}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
