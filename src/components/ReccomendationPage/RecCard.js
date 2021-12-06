import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {getRecommend} from "../../fetcher";

const bull = (
  <Box
    component="span"
    sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)"}}
  >
    •
  </Box>
);
// SELECT P.id, P.organization_id, type, breed, color, age, gender, P.name, P.photo, O.city AS location

export default function RecCard() {
  const [feature, setFeature] = useState("");
  const [type, setType] = useState("cat");
  const [data, setData] = useState({});

  return (
    <Card variant="outlined" sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          "a benevolent smile"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
