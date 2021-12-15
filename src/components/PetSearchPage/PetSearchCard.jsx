import React from "react";
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
import AllPetInfoPage from "../../Pages/AllPetInfoPage";


export default function PetSearchCard(props) {
  const username = props.username;
  const dataRow = props.data;
  // TODO: kill defult useState?
  const[petId, setPetId] = React.useState(0);
  const[openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleMoreBttn = (event) => {
    setPetId(event.currentTarget.value);
    setOpenModal(true);
  };

  const handleLikeBtn = (event) => {
    console.log(event.currentTarget.value);
    console.log(username);
  };

  return <Card sx={{margin: 1, width: 280}}>
      <CardHeader
        titleTypographyProps={{fontFamily: "Dongle", fontSize: 25}}
        title={dataRow.name}
        titleTypographyProps={{fontSize: 22, fontWeight: 700}}
        subheader={<Typography> <TiLocation />{dataRow.location}</Typography>} 
        subheaderTypographyProps={{fontSize: 15, fontWeight: 500, fontFamily: "Dongle"}}
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
          <IconButton aria-label="rescue" onClick={()=>{console.log("clicked heart");}} sx={{marginLeft: "auto", marginTop: "0.5rem", marginRight: "0.5rem"}}>
            <RiHomeHeartLine style={{fontSize: 30}}/>
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

        <CardActions sx={{ paddingTop: 0.5}}>
          <IconButton aria-label="like" value={dataRow.id} onClick={handleLikeBtn} sx={{marginRight: "0.3rem"}} >
            <FavoriteIcon sx={{ fontSize: 25}} />
          </IconButton> 
          <IconButton aria-label="more" value={dataRow.id} onClick={handleMoreBttn} sx={{marginRight: "0.1rem"}} >
            <MoreIcon sx={{ fontSize: 25}} />
          </IconButton> 
          {/* Modal */}
          <AllPetInfoPage openModal={openModal} handleClose={handleClose} petId={petId}/>
        </CardActions>
      <CardContent sx={{ paddingTop: 0}}>  
      <Typography display="block">  
          {dataRow.gender === "Male" ? <img src="https://img.icons8.com/color/20/000000/male.png" alt="Male"/> : <img src="https://img.icons8.com/color/20/000000/female.png" alt="Female"/>}
          {dataRow.gender} 
        </Typography>
        <Typography display="block">  
          {<img src="https://img.icons8.com/color/20/000000/baby-bottle.png" alt="Age"/>} 
          {dataRow.age} 
        </Typography>
        
        <Typography display="block">  
          {<img src="https://img.icons8.com/color/20/000000/paint-palette.png" alt="Color"/>} 
          {dataRow.color} 
        </Typography>
        <Typography display="block">  
          {dataRow.type === "Dog"? <img src="https://img.icons8.com/color/20/000000/dog.png" alt="Dog"/> :<img src="https://img.icons8.com/color/20/000000/cat.png" alt="Cat"/> }
          {dataRow.breed}
        </Typography>
      </CardContent>
    </Card>;
}
