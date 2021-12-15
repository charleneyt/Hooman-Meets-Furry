import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// SELECT P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location

export default function RecCard(props) {
  const dataRow = props.data;
  return (
    // TODO: Add what kind of element we want in the card
    <Card variant="outlined" sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 20, fontFamily: "Dongle"}} color="text.secondary" gutterBottom>
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
        <Typography style={{fontSize: 25, fontFamily: "Dongle"}} variant="body2">
          {dataRow.color}
          <br />
          {dataRow.age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button style={{fontSize: 20, fontFamily: "Dongle", textAlign: "center"}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
