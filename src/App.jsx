import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Recipes from "./pages/Recipes/Recipes";
import Signup from "./pages/Signup/Signup";
import Verify from "./pages/Verify/Verify";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AboutPage from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/category/:categoryId" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about-us" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
