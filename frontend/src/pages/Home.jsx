import axios from "axios";
import { useState, useEffect } from "react";
import DishTypes from "../components/DishTypes";
import RecipesList from "../components/RecipesList";

import "../styles/Home.scss";
import NavBar from "../components/NavBar";

import Footer from "../components/Footer";

export default function Home() {
  const [recipesData, setRecipesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const today = new Date();
  const time = today.getHours();

  let mealSearchType;
  switch (true) {
    case time > 0 && time <= 10:
      mealSearchType = "Breakfast";
      break;
    case time > 10 && time <= 14:
      mealSearchType = "Lunch";
      break;
    case time > 14 && time <= 16:
      mealSearchType = "Teatime";
      break;
    case time > 16 && time <= 18:
      mealSearchType = "Snack";
      break;
    case time > 18 && time <= 22:
      mealSearchType = "Dinner";
      break;
    default:
      mealSearchType = "Lunch";
  }

  useEffect(() => {
    const getRecipesData = () => {
      axios
        .get(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
            import.meta.env.VITE_APP_ID_CF
          }&app_key=${
            import.meta.env.VITE_APP_KEY_CF
          }&mealType=${mealSearchType}&time=1%2B&imageSize=LARGE&random=true`
        )
        .then((response) => {
          setRecipesData(response.data.hits.splice(0, 6));
          setIsLoaded(true);
        });
    };
    getRecipesData();
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container">
          <DishTypes />
          <section id="chef-suggestion">
            <h2>Chef's suggestions</h2>
            {isLoaded ? (
              <RecipesList data={recipesData} listClass="home" />
            ) : (
              <p>Loading...</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
