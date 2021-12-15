
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import {getAllInfo} from "../fetcher";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';



const data = {pet_name: "Scott", pet_id:"VA226",org_id:"VA226",type:"Cat",breed:"Tabby",color:"Orange / Red",age:"Baby",gender:"Male", org_name:"SPCA-Eastern Shore Inc.",size:"Medium",coat:"Short",spayed_neutered:"TRUE",house_trained:"TRUE",special_needs:"FALSE",shots_current:"TRUE",children_friendly:"TRUE",dogs_friendly:"None",cats_friendly:"TRUE",name:"SPCA-Eastern Shore Inc.",pet_photo:"https://placekitten.com/200/300",email:"shorespca@gmail.com",phone:"(757)787-7385",address:"26528 Lankford Highway PO Box 164",city:"Onley",state:"VA",zipcode:"23418",country:"US","website":null,"facebook":null,"twitter":null,"youtube":null,"instagram":null,"pinterest":null, "org_photo": null};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// TODO: add params for icon or color if have time
const addAttributeIfNotNone = (attributeName, attributeResult) => {
  // If the result is not none, we want to show the attribute name and result
  // TODO: change color according to true false
  if (attributeResult !== "None") {
    return <Chip icon={attributeResult === "TRUE" ? <DoneRoundedIcon /> : <CloseRoundedIcon />} label={attributeName} />
  }
}



export default function AllPetInfoPage(props) {
  const {openModal, handleClose, petId} = props;
  // const [data, setData] = React.useState({});
  // React.useEffect(() => {
  //   getAllInfo(petId).then(resp => resp.json()).then(resp => {
  //     setData(resp.results[0]);
  //   })
  // }, [petId]);
  return (
    <div>
    <BootstrapDialog open={openModal} onClose={handleClose} aria-labelledby="Dialog-Title">
      <BootstrapDialogTitle onClose={handleClose}>
      {data.type === "Dog"? <img src="https://img.icons8.com/color/25/000000/dog.png" alt="Dog"/> :<img src="https://img.icons8.com/color/25/000000/cat.png" alt="Cat"/> }
 {data.pet_name}
      </BootstrapDialogTitle>

    <Box sx={{ display: 'flex' }}>
      <CardMedia 
      component="img"
      image={data.pet_photo}
      sx={{ width: 150 }}
      />

      {/* right side we want to put content */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContent>
          <Typography>
            {data.breed}·{data.color}·{data.size}·{data.gender}·{data.coat}
          </Typography>
          <Typography>
            {addAttributeIfNotNone("Spayed-neutered", data.spayed_neutered)}
            {addAttributeIfNotNone("House-trained", data.house_trained)}
            {addAttributeIfNotNone("Special-needs", data.special_needs)}
            {addAttributeIfNotNone("Children-friendly", data.children_friendly)}
            {addAttributeIfNotNone("Dogs-friendly", data.dogs_friendly)}
            {addAttributeIfNotNone("Cats-friendly", data.cats_friendly)}
          </Typography>
        </DialogContent>
        <DialogContent dividers>
          {/* Rescue */}
          <Typography>
            {data.org_name}
            {/* {data.org_photo? <img src={org_photo} alt={data.org_name}  /> : "" } */}
            {}
          </Typography>
        </DialogContent>
      </Box>

    </Box>


    </BootstrapDialog>
    </div>
  )
}