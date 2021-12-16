import React from "react";
import UserLoginBar from "./components/Navbar/UserBar";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import HomePage from "./Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import PetSearchPage from "./Pages/PetSearchPage";
import RecommendationsPage from "./Pages/RecommendationsPage";
import RescuePage from "./Pages/RescuePage";
import PetComparePage from "./Pages/PetComparePage";
import BreedRaterPage from "./Pages/BreedRaterPage";
import PetSimilarPage from "./Pages/PetSimilarPage";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [auth, setAuth] = React.useState(false);
  const [username, setUsername] = React.useState("testuser");
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserLoginBar
            auth={auth}
            setAuth={setAuth}
            username={username}
            setUsername={setUsername}
          />
          <Navbar />
          <div id="content">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage setAuth={setAuth} setUsername={setUsername} />
                }
              />
              <Route
                path="search"
                element={<PetSearchPage username={username} />}
              />
              <Route path="recommendations" element={<RecommendationsPage />} />
              <Route path="rescue_search" element={<RescuePage />} />
              <Route path="breed_rater" element={<BreedRaterPage />} />
              <Route
                path="compare"
                element={<PetComparePage username={username} />}
              />
              <Route
                path="similar"
                element={<PetSimilarPage username={username} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
