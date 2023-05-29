// Get the container for the drink list
const drinkListContainer = document.getElementById("drink-list-container");

// Array to store favorite drinks
const favoriteDrinks = [];

//#region Drink Functions

// Function to fetch drink data from the API
async function fetchDrink(query) {
  // Fetch data from the API using the provided query
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}`
  );
  const drinks = (await res.json()).drinks; // Get drinks from the data query

  const drinkList = document.getElementById("drink-list");
  const drinkIngredients = [];

  // Clear the drink list container
  drinkList.innerHTML = "";

  // Iterate through drinks, appending each one as a list item
  drinks.forEach((drink) => {
    // Array to store drink ingredients
    const drinkIngredients = [];

    // Gather drink ingredients
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        drinkIngredients.push(drink[`strIngredient${i}`]);
      }
    }

    // Array to store drink measurements
    const drinkMeasurements = [];

    // Gather drink measurements
    for (let i = 1; i <= 15; i++) {
      if (drink[`strMeasure${i}`]) {
        drinkMeasurements.push(drink[`strMeasure${i}`]);
      }
    }

    // Create HTML for the drink list item
    const drinkListItem = `
      <li>
        <div class="drink-list--drink">
          <div class="flex flex-row gap-x-[50px]">
            <img src="${drink.strDrinkThumb}" alt="drink thumbnail">
            <div>
              <h1 class="drink-name">${drink.strDrink}</h1>
              <ul class="drink-ingredients">
                <h2>Ingredients</h2>
                ${drinkIngredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
              </ul>
            </div>
          </div>
          ${
            drink.strVideo
              ? `
              <div>
                <h3>Drink Video</h3>
                <iframe src="https://www.youtube.com/embed/${drink.strVideo.split("v=")[1]}" allowfullscreen></iframe>
              </div>
              `
              : ""
          }
          <button class="recipe-button" onclick="showRecipe(
            '${drink.strInstructions}', 
            '${drinkIngredients}',
            '${drinkMeasurements}',
            '${drink.strDrink}', 
            '${drink.strAlcoholic}',
            '${drink.strCategory}',
            '${drink.strGlass}',
            '${drink.strDrinkThumb}'
          )"
          >I want this!</button>
        </div>
      </li>
      <div class="list-splitter">
        <img src="./assets/wooden-floor-isolate-png.png" alt="list item splitter hanging shelf"/>
      </div>
    `;

    // Append the drink list item to the drink list
    drinkList.innerHTML += drinkListItem;
  });
}

//#endregion

// Function to show the recipe for a drink
function showRecipe(
  instructions,
  ingredients,
  measurements,
  drinkName,
  isAlcoholic,
  drinkCategory,
  glassType,
  thumbnail
) {
  const modal = document.getElementById("recipe-modal");
  const drinkInfo = document.getElementById("recipe--drink-info");
  const drinkIngredients = document.getElementById("recipe--drink-ingredients");

  // Split the ingredients and measurements into arrays
  ingredients = ingredients.split(",");
  measurements = measurements.split(",");

  // Combine the ingredients and measurements into formatted strings
  for (let i in ingredients) {
    ingredients[i] = `<span style="font-family: 'Lulo Bold'">${measurements[i] || ""}</span> ${ingredients[i]}`;
  }

  // Show the modal
  modal.showModal();

  // Set the drink information in the modal
  modal.querySelector("#recipe--drink-name").innerHTML = drinkName;
  modal.querySelector("#recipe--instructions").innerHTML = instructions;
  modal.querySelector("#recipe--glass-type").innerHTML = `Glass: ${glassType}`;
  modal.querySelector("#recipe--drink-thumb").src = thumbnail;

  // Set the drink ingredients in the modal
  drinkIngredients.innerHTML = ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");

  // Set the drink info in the modal
  drinkInfo.innerHTML = `
    <li>${isAlcoholic}</li>
    <li>${drinkCategory}</li>
    <li></li>
    <li></li>
  `;
}

// Function to initialize the page
async function init() {
  // Set drink start letter categories
  const drinkLetters = document.getElementById("drink-letters-category");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  drinkLetters.innerHTML = alphabet
    .split("")
    .map(
      (letter) => `
    <button onclick="fetchDrink('f=${letter}')">${letter}</button>
  `
    )
    .join("");
}

// When the window loads, initialize the page and fetch drinks with the 'gin' query
window.onload = () => {
  init();
  fetchDrink("s=gin");
};