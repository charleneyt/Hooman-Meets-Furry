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
import {TiLocation} from "react-icons/ti";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function PetSearchCard(props) {
  const dataRow = props.data;
  


  return <Card sx={{margin: 1, width: 280}}>
      <CardHeader
        title={dataRow.name}
        titleTypographyProps={{fontSize: 22, fontWeight: 700}}
        subheader={<Typography> <TiLocation />{dataRow.location}</Typography>} 
        subheaderTypographyProps={{fontSize: 15, fontWeight: 500}}
        avatar={
          <Avatar
            alt={dataRow.type === "Cat" ? "Cat" : "Dog"}
            sx={{bgcolor: "#ef6694"}}
            src={dataRow.photo}
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
      
        {/* TODO: fix css */}
        {/* Add location? */}
        <CardActions disableSpacing>
          <IconButton aria-label="heart" sx={{marginRight: "0.3rem", marginTop: "-0.2rem"}}>
            <FavoriteIcon sx={{ fontSize: 30}} />
          </IconButton> 
          </CardActions>
          <CardContent disableSpacing>  
          <Typography>  
            {<img src="https://img.icons8.com/dusk/15/000000/teddy-bear.png"/>} {dataRow.age} 
          </Typography>
        
        <Typography>
          {dataRow.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
          {dataRow.gender} 
          {dataRow.size}
        </Typography>
      </CardContent>

    </Card>;
}
