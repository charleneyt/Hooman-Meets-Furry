import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IconButton } from "@mui/material";




export default function PetSimilarCard(props) {
  const dataRow = props.dataRow;
  const styles = { 
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    },
    card: {
      boxShadow: 1,
      // Spaces between cards
      display: "flex",
      flexDirection: 'column',
      
    },
    grid: {
      display: "flex",
      justifyContent: 'space-between', 
      flexDirection: 'column',
      height: "100%",
    }
  };
  return (
    <>
    <Grid item className={styles.grid} sx={{ m: 1 }} style={{height: 350}}>
    <Card className={styles.card} raised style={{height: 350, width: 250}}>
        <CardMedia
          className={styles.media}
          component="img"
          height="160"
          image={dataRow.photo}
          alt={dataRow.name}
        />
        <CardActionArea disableSpacing style={{maxHeight: 130}}>
        <CardContent >
          <Grid container spacing={1}>
            <Grid item xs="auto">
          <Typography gutterBottom component="div" sx={{ fontFamily: "Dongle", fontSize: 23 }}>
            {dataRow.name} 
            {dataRow.gender === "Male" ? <img src="https://img.icons8.com/color/20/000000/male.png"/> : <img src="https://img.icons8.com/color/20/000000/female.png"/>}
          </Typography>
          </Grid>
          <Grid item xs>
          <Typography style={{fontSize: 20, fontFamily: "Dongle", color: "gray", textAlign:"right"}}>
          <IconButton aria-label="more" sx={{marginLeft: "auto"}}>
            <HiOutlineLocationMarker />
          </IconButton>
          {dataRow.location}
        </Typography></Grid>
        </Grid>
          <Box spacing={1} >
            <Chip label={dataRow.age}  style={{backgroundColor:"#E0F2F1"}}/>
            <Chip label={dataRow.breed}  style={{backgroundColor:"#FAD4E0"}}/>
            <Chip label={dataRow.color}  style={{backgroundColor:"#FFF0D7"}} />
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" style={{marginBottom: "auto",marginLeft: "auto", backgroundColor:"#F48BA9"}}>
          Adopt
        </Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  );
}
