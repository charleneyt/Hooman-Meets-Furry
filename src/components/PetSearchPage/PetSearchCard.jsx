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
import {GiCat, GiSittingDog} from "react-icons/gi";
import {TiLocation} from "react-icons/ti";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreIcon from '@mui/icons-material/More';
import {RiHomeHeartLine} from "react-icons/ri";


export default function PetSearchCard(props) {
  const dataRow = props.data;

  return <Card sx={{margin: 1, width: 280}}>
      <CardHeader
        title={dataRow.name}
        titleTypographyProps={{fontSize: 22, fontWeight: 700}}
        subheader={<Typography> <TiLocation />{dataRow.location}</Typography>} 
        subheaderTypographyProps={{fontSize: 15, fontWeight: 500}}
        sx={{ paddingBottom: 1}}
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
          <IconButton aria-label="rescue" sx={{marginLeft: "auto", marginTop: "0.5rem", marginRight: "0.5rem", fontSize: 25}}>
            <RiHomeHeartLine />
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
        <CardActions disableSpacing sx={{ paddingTop: 0.5}}>
          <IconButton aria-label="heart" sx={{marginRight: "0.3rem"}}>
            <FavoriteIcon sx={{ fontSize: 25}} />
          </IconButton> 
          <IconButton aria-label="more" sx={{marginRight: "0.1rem"}} >
            <MoreIcon sx={{ fontSize: 25}} />
          </IconButton> 
        </CardActions>
      <CardContent disableSpacing sx={{ paddingTop: 0}}>  
      <Typography display="block">  
          {dataRow.gender === "Male" ? <img src="https://img.icons8.com/color/20/000000/male.png"/> : <img src="https://img.icons8.com/color/20/000000/female.png"/>}
          {dataRow.gender} 
        </Typography>
        <Typography display="block">  
          {<img src="https://img.icons8.com/color/20/000000/baby-bottle.png"/>} 
          {dataRow.age} 
        </Typography>
        
        <Typography display="block">  
          {<img src="https://img.icons8.com/color/20/000000/paint-palette.png"/>} 
          {dataRow.color} 
        </Typography>
        <Typography display="block">  
          {dataRow.type === "Dog"? <img src="https://img.icons8.com/color/20/000000/dog.png"/> :<img src="https://img.icons8.com/color/20/000000/cat.png"/> }
          {dataRow.breed}
        </Typography>


      </CardContent>

    </Card>;
}
