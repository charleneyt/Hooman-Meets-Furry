import "./Home.scss";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import yokiPic from "../assets/yoki.jpg";
import hotpotPic from "../assets/hotpot.jpg";
import moiaCat from "../assets/moiaCat.jpg";
import yellowCatPic from "../assets/yllwCat.jpg";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import rockyPic from "../assets/rocky.jpg";
import tubbyPic from "../assets/tubby.jpg";
import React from "react";
import LoginPage from "./LoginPage";

const catCards = [
  {
    name: "Yoki",
    img: yokiPic,
    catBtn: "https://img.icons8.com/color/30/000000/like--v1.png",
  },
  {
    name: "Hotpot",
    img: hotpotPic,
    catBtn:
      "https://img.icons8.com/external-konkapp-flat-konkapp/30/000000/external-pot-kitchen-konkapp-flat-konkapp-2.png",
  },
  {
    name: "Wotan",
    img: yellowCatPic,
    catBtn: "https://img.icons8.com/color/30/000000/fat-cat.png",
  },
  {
    name: "Tibbles",
    img: moiaCat,
    catBtn:
      "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/30/000000/external-cupcake-mother-day-vitaliy-gorbachev-flat-vitaly-gorbachev.png",
  },
  {
    name: "Rocky",
    img: rockyPic,
    catBtn: "https://img.icons8.com/cotton/30/000000/dog--v1.png",
  },
  {
    name: "Tubby",
    img: tubbyPic,
    catBtn: "https://img.icons8.com/emoji/30/000000/star-emoji.png",
  },
];

export default function HomePage(props) {
  const {setAuth, setUsername} = props;
  const [open, setOpen] = React.useState(false);

  const handleSignUpClicked = () => {
    setOpen(true);
  };

  const handleSignUpClose = () => {
    setOpen(false);
  };

  return (
    <div id="home-page">
      <header class="bg-image">
        <div class="container">
          <h1>Meet Your Purr-fect Friend</h1>
          <h2>Find | Match | Get Recommended</h2>
        </div>
      </header>

      <section>
        <div class="card-container">
          <Stack direction="row" spacing={3} alignItems="center">
            {catCards.map((catCard) => (
              <Card sx={{width: 200}}>
                <CardMedia
                  component="img"
                  image={catCard.img}
                  alt="cat"
                  sx={{height: 250}}
                />
                <CardContent>
                  {catCard.name}
                  <Button style={{marginRight: "auto"}}>
                    {<img src={catCard.catBtn} alt="pet button" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
      </section>

      <section class="section--primary">
        <div class="container">
          <div class="col-3 features">
            <i class="fa fa-paw"></i>
            <p>Provide a hand for a paw.</p>
          </div>
          <div class="col-3 features">
            <i class="fa fa-home"></i>
            <p>Make your house a home, adopt a pet.</p>
          </div>
          <div class="col-3 features">
            <i class="fa fa-heart"></i>
            <p>They deserve the love.</p>
          </div>
        </div>
      </section>

      <section class="section--primary--alt">
        <div class="container">
          <h3>Give pets a home.</h3>
          <p>
            Saving one creature wont change the world yet it will change the
            world for that one creature.
          </p>
        </div>
      </section>

      <section class="section--primary--alt bg-image bg-image-2">
        <div class="container text--center">
          <h3>Reasons to adopt this pet:</h3>
          <div class="col-5 text--left">
            <ul>
              <li>Its the best</li>
              <li>Its awesome</li>
              <li>It makes you happy</li>
              <li>It brings world peace</li>
              <li>Its free!</li>
            </ul>
          </div>
          <div class="col-5 text--left">
            <ul>
              <li>You're the best</li>
              <li>You're awesome</li>
              <li>You make you happy</li>
              <li> You bring world peace</li>
              <li>You like free!</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="text--center">
        <div class="container">
          <Button
            variant="contained"
            size="big"
            onClick={handleSignUpClicked}
            style={{
              boxShadow: "none",
              backgroundImage:
                "linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)",
            }}
          >
            Sign Up Now
          </Button>
          <LoginPage
            open={open}
            setOpen={setOpen}
            setAuth={setAuth}
            onClose={handleSignUpClose}
            setUsername={setUsername}
          />
        </div>
      </section>
    </div>
  );
}
