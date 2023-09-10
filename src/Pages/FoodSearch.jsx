import { useState } from "react";
import "./FoodSearch.css";
const FoodSearch = () => {
  const [foodName, setFoodName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!foodName) {
      setError("Please enter a food name.");
      setSearchResult(null);
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
      );
      const data = await response.json();

      if (data.meals) {
        setSearchResult(data.meals);
        setError(null);
      } else {
        setSearchResult(null);
        setError("No food found. Please enter a valid food name.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };

  return (
    <div className="row" id="search-box">
      <div>
        <input
          className="col-8"
          id="search-input"
          type="text"
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <button className="col-1 btn" onClick={handleSearch}>
          <i
            className="fa-solid fa-magnifying-glass fa-2xl"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
      </div>
      {error && <p className="Error-message">{error}</p>}
      {searchResult && (
        <div className="own-card">
          <div className="row result-row">
              {searchResult.map((meal) => (
                <div key={meal.idMeal} className="row" id="box-box">
                  <div className="teacher" id="techerprofile">
      <section className="vh-100">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row" id="ro">
            <div className="col-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className=" mt-5 card-img"
                  width="150px"
                  src={meal.strMealThumb}
                />
                <span className="font-weight-bold">{meal.strMeal}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right topgap">
            <span className="font-weight-bold">Food Name           :  {meal.strMeal}</span><hr/>
            <span className="font-weight-bold">Category    :  {meal.strCategory}</span><hr/>   
            <span className="font-weight-bold">Area       :  {meal.strArea}</span><hr/>   
            <span className="font-weight-bold">Incrediants        :  {meal.strIngredient1},</span>  
            <span className="font-weight-bold">   {meal.strIngredient2},</span>
            <span className="font-weight-bold">    {meal.strIngredient3}, </span>
            <span className="font-weight-bold">   {meal.strIngredient4}, </span>
            <span className="font-weight-bold">     {meal.strIngredient5},</span>
            <span className="font-weight-bold">     {meal.strIngredient6}</span><hr/>
            <span className="font-weight-bold">   {meal.strIngredient7},</span>
            <span className="font-weight-bold">    {meal.strIngredient8}, </span>
            <span className="font-weight-bold">   {meal.strIngredient9}, </span>
            <span className="font-weight-bold">     {meal.strIngredient10},</span>
            <span className="font-weight-bold">     {meal.strIngredient11}</span>


               </div>
            <div className="col-md-4 ybtn">
              <a href={meal.strYoutube} className="btn btn-danger">
              <i className="fa-brands fa-youtube" style={{color:" #ffffff"}}></i>
              &nbsp;
                View Tutorial</a>
            </div>
              <h5>Instruction : </h5>
              <p> {meal.strInstructions}
</p>
          <hr/>
          </div>
        </div>
      </section>
    </div>
              </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
