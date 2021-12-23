import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import {getAllInfo} from "../fetcher";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import {makeStyles} from "@mui/styles";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles({
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  orgPhoto: {
    maxHeight: 200,
    maxWidth: 200,
  },
});

const BootstrapDialogTitle = (props) => {
  const {children, onClose, ...other} = props;
  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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

const addIfNotNull = (attribute, attrbuteResult) => {
  if (attrbuteResult !== null) {
    return (
      <p>
        {attribute}: {attrbuteResult}
      </p>
    );
  }
};

export default function AllPetInfoPage(props) {
  const {openModal, handleClose, petId} = props;
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    let isSubscribed = true;
    getAllInfo(petId)
      .then((resp) => resp.json())
      .then((resp) => {
        if (isSubscribed) {
          setData(resp.results[0]);
        }
      });

    return () => (isSubscribed = false);
  }, [petId]);

  const styles = useStyles();

  const chips = {
    "Spayed-neutered": data.spayed_neutered,
    "House-trained": data.house_trained,
    "Special-needs": data.special_needs,
    "Children-friendly": data.children_friendly,
    "Dogs-friendly": data.dogs_friendly,
    "Cats-friendly": data.cats_friendly,
  };

  return (
    <div>
      <BootstrapDialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="Dialog-Title"
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {data.type === "Dog" ? (
            <img
              src="https://img.icons8.com/color/25/000000/dog.png"
              alt="Dog"
            />
          ) : (
            <img
              src="https://img.icons8.com/color/25/000000/cat.png"
              alt="Cat"
            />
          )}
          {data.pet_name}
        </BootstrapDialogTitle>

        <Box sx={{display: "flex"}}>
          <Avatar
            alt="pet-image"
            src={data.pet_photo}
            sx={{marginLeft: "16px", width: 150, height: 150}}
          />
          {/* right side we want to put content */}
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <DialogContent>
              <div className={styles.chipContainer}>
                <Chip label={data.breed} />
                <Chip label={data.color} />
                <Chip label={data.size} />
                <Chip label={data.gender} />
                <Chip label={data.coat} />
                {Object.entries(chips).map(([key, entry]) => {
                  if (entry && entry !== "None") {
                    // TODO: add params for icon or color if have time
                    return (
                      <Chip
                        key={key}
                        icon={
                          entry === "TRUE" ? (
                            <DoneRoundedIcon />
                          ) : (
                            <CloseRoundedIcon />
                          )
                        }
                        label={key}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </DialogContent>
            <DialogContent dividers>
              {/* Rescue */}

              {data.org_photo === null ? (
                ""
              ) : (
                <img
                  className={styles.orgPhoto}
                  src={data.org_photo}
                  alt={data.org_name}
                  height="100"
                />
              )}
              <p>{data.org_name}</p>
              {addIfNotNull("Email", data.email)}
              {addIfNotNull("Phone", data.phone)}
              {addIfNotNull("Address", data.address)}
              {addIfNotNull("City", data.city)}
              {addIfNotNull("State", data.state)}
              {addIfNotNull("Zipcode", data.zipcode)}
              {addIfNotNull("Country", data.country)}
              {addIfNotNull("Website", data.website)}
              {addIfNotNull("Facebook", data.facebook)}
              {addIfNotNull("Twitter", data.twitter)}
              {addIfNotNull("Youtube", data.youtube)}
              {addIfNotNull("Instagram", data.instagram)}
              {addIfNotNull("Pinterest", data.pinterest)}
            </DialogContent>
          </Box>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
