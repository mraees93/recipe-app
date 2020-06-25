import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
// create variables for id and key
 const APP_ID = "0e13c384";
 const APP_KEY = "2f46b0e5e7af584732263cd37afed3cb";
//  usestate used without writing a class
// declares a new state variable(recipes, search, query)
const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
// set query for onsubmit
const [query, setQuery] = useState('');
  

useEffect( () => {
  getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
  
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}


 return(
    <div className = "App">
    <h1>MY RECIPE APP</h1>
    <h2>Type in any kind of food to get various recipes:</h2>
      <form onSubmit={getSearch} className = "search-form">
        <input 
        className = "search-bar" 
        type = "text"
        placeholder = "e.g Eggs" 
        value = {search} 
        onChange={updateSearch} 
        />
        <button className = "search-button" type = "submit">Search</button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe =>(
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
