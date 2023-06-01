// Retrieve the DOM element for the drink list container
const drinkListContainer = document.getElementById("drink-list-container");

// An array to store favorite drinks
const favoriteDrinks = [];

// Asynchronous function to fetch drink data from the API based on the given query
async function fetchDrink(query) {
  // Make a fetch request to the API endpoint with the query parameter
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}`);

  // Extract the 'drinks' array from the API response
  const { drinks } = await res.json();

  // Retrieve the DOM element for the drink list
  const drinkList = document.getElementById("drink-list");

  // Clear the drink list container before appending new drinks
  drinkList.innerHTML = "";

  // Loop through each drink in the 'drinks' array
  drinks.forEach((drink) => {
    // Arrays to store the drink's ingredients and measurements
    const drinkIngredients = [];
    const drinkMeasurements = [];

    // Loop through the drink's ingredients and measurements using the 'strIngredient' and 'strMeasure' properties
    for (let i = 1; i <= 15; i++) {
      // Retrieve the ingredient and measurement values using dynamic property access
      const ingredient = drink[`strIngredient${i}`];
      const measurement = drink[`strMeasure${i}`];

      // Check if the ingredient exists and is not an empty string
      if (ingredient && ingredient.trim() !== "") {
        // Add the ingredient to the drinkIngredients array
        drinkIngredients.push(ingredient);
      }

      // Check if the measurement exists and is not an empty string
      if (measurement && measurement.trim() !== "") {
        // Add the measurement to the drinkMeasurements array
        drinkMeasurements.push(measurement);
      }
    }

    // Create a string of HTML for the drink's ingredients using the drinkIngredients array
    const ingredientsHTML = drinkIngredients.map((ingredient) => `<li>${ingredient}</li>`).join("");

    // Create a string of HTML for the drink's video, if available
    const videoHTML = drink.strVideo
      ? `
        <div>
          <h3>Drink Video</h3>
          <iframe src="https://www.youtube.com/embed/${drink.strVideo.split("v=")[1]}" allowfullscreen></iframe>
        </div>
      `
      : "";

    // Create a string of HTML for the entire drink using the retrieved properties and generated HTML
    const drinkHTML = `
      <li>
        <div class="drink-list--drink">
          <div class="flex flex-row gap-x-[50px]">
            <img src="${drink.strDrinkThumb}" alt="drink thumbnail">
            <div>
              <h1 class="drink-name">${drink.strDrink}</h1>
              <ul class="drink-ingredients">
                <h2>Ingredients</h2>
                ${ingredientsHTML}
              </ul>
            </div>
          </div>
          ${videoHTML}
          <button class="recipe-button" onclick="showRecipe(
            '${drink.strInstructions}', 
            '${drinkIngredients}',
            '${drinkMeasurements}',
            '${drink.strDrink}', 
            '${drink.strAlcoholic}',
            '${drink.strCategory}',
            '${drink.strGlass}',
            '${drink.strDrinkThumb}'
          )">I want this!</button>
        </div>
      </li>
      <div class="list-splitter">
        <img src="./assets/wooden-floor-isolate-png.png" alt="list item splitter hanging shelf"/>
      </div>
    `;

    // Append the drink's HTML to the drink list
    drinkList.innerHTML += drinkHTML;
  });
}

// Function to display the recipe details for a drink
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
  // Retrieve the recipe modal and drink information container
  const modal = document.getElementById("recipe-modal");
  const drinkInfo = document.getElementById("recipe--drink-info");
  const drinkIngredients = document.getElementById("recipe--drink-ingredients");

  // Split the ingredients and measurements strings into arrays
  ingredients = ingredients.split(",");
  measurements = measurements.split(",");

  // Format the ingredients array with measurements and HTML styling
  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i] = `<span style="font-family: 'Lulo Bold'">${measurements[i] || ""}</span> ${ingredients[i]}`;
  }

  // Show the recipe modal
  modal.showModal();

  // Set the content of various elements in the modal with the drink details
  modal.querySelector("#recipe--drink-name").innerHTML = drinkName;
  modal.querySelector("#recipe--instructions").innerHTML = instructions;
  modal.querySelector("#recipe--glass-type").innerHTML = `Glass: ${glassType}`;
  modal.querySelector("#recipe--drink-thumb").src = thumbnail;

  // Create a string of HTML for the drink's ingredients using the formatted ingredients array
  drinkIngredients.innerHTML = ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");

  // Set the content of the drink information list in the modal
  drinkInfo.innerHTML = `
    <li>${isAlcoholic}</li>
    <li>${drinkCategory}</li>
    <li></li>
    <li></li>
  `;
}

// Function to initialize the page
async function init() {
  // Retrieve the DOM element for the drink letters category
  const drinkLetters = document.getElementById("drink-letters-category");

  // Define the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Generate buttons for each letter of the alphabet and attach event listeners
  drinkLetters.innerHTML = alphabet
    .split("")
    .map((letter) => `<button onclick="fetchDrink('f=${letter}')">${letter}</button>`)
    .join("");
}

// Call the 'init' function when the window has finished loading
window.onload = () => {
  init();
  fetchDrink("s=gin");
};