import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';

export default function PetSimilarCard(props) {
  const dataRow = props.dataRow;
  return (
    <Box sx={{boxShadow: 1, minWidth: 300, margin: 1}}>
      {/* TODO: add descriptions */}
    <Card sx={{ maxWidth: 345, padding: 1, minWidth: 200 }}>
      {console.log(dataRow)}
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={dataRow.photo}
          alt={dataRow.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dataRow.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dataRow.age}
            {dataRow.type}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small">
          Adopt
        </Button>
      </CardActions>
    </Card>
    </Box>
  );
}