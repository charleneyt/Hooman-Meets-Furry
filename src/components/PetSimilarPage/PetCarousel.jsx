import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Paper from '@mui/material/Paper'

const AutoPlaySwipeableViews = SwipeableViews;

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=800&h=500&q=60"
  },
  {
    label: "Bluetit",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=800&h=500&q=60"
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=500&q=80"
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=800&h=500&q=60"
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=800&h=500&q=60"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  header: {
    color: "white",
    display: "flex",
    alignItems: "center",
    height: 50,
    width: "100%",
    paddingLeft: theme.spacing(4),
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    position: "absolute",
    top: 0,
    left: 0
  },
  img: {
    display: "block",
    maxWidth: 800,
    overflow: "hidden",
    width: "100%"
  },
  stepper: {
    position: "relative",
    top: -32,
    backgroundColor: "transparent"
  },
  buttonsContainer: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center"
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "white",
    margin: "0 8px"
  }
}));

export default function PetCarousel(props) {
  const {data} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // Number of dots
  const maxSteps = data.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }
  return (
  <div className={classes.root}>
    <AutoPlaySwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {tutorialSteps.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img
              className={classes.img}
              src={step.imgPath}
              alt={step.label}
            />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <div className={classes.header}>
      <Typography>{tutorialSteps[activeStep].label}</Typography>
    </div>
    <div>
      <Paper>Content</Paper>
    </div>
    <div className={classes.buttonsContainer}>
      <div className={classes.buttons}>
        <IconButton
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          className={classes.button}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          className={classes.button}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </div>
    </div>
    <MobileStepper
      steps={maxSteps}
      position="static"
      variant="dots"
      activeStep={activeStep}
      className={classes.stepper}
      backButton={<div />}
      nextButton={<div />}
    />
  </div>)
}