import { Card, Box, Paper } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function PetSimilarCard(props) {
  const{data} = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Card sx={{ display: 'flex' }}>
      
      <CardContent>           
        <Typography component="div" variant="h5">
          Live From Space
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Typography>123</Typography>
        </Box>
        <CardMedia component="img" image="" sx={{ width: 151 }} alt="pet"/>
    </Card>
    </Box>
  )
}