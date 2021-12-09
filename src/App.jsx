import UserBar from "./components/Navbar/UserBar"
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

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserBar />
          <Navbar />
          <div id="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="search" element={<PetSearchPage />} />
              <Route path="recommendations" element={<RecommendationsPage />} />
              <Route path="rescue_search" element={<RescuePage />} />
              <Route path="breed_rater" element={<BreedRaterPage />} />
              <Route path="compare" element={<PetComparePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
