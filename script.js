
function updateSuggestions(searchTerm) {
  const suggestionsList = document.getElementById("suggestions-list");
  const searchInput = document.getElementById("drink-search");

  if (searchTerm.length > 0) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const drinks = data.drinks;
        suggestionsList.innerHTML = ""; 

        if (drinks) {
          for (let i = 0; i < drinks.length && i < 5; i++) {
            const drinkName = drinks[i].strDrink;
            const li = document.createElement("li");
            li.textContent = drinkName;
            li.onclick = function () {
              searchInput.value = drinkName;
              suggestionsList.style.display = "none";
            };
            suggestionsList.appendChild(li);
          }
        }

        if (drinks && drinks.length > 0) {
          suggestionsList.style.display = "block";
        } else {
          suggestionsList.style.display = "none";
        }
      })
      .catch((error) => {
        console.error(error);
        suggestionsList.style.display = "none";
      });
  } else {
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
  }
}

// Event listener to hide the dropdown menu when clicking outside
window.addEventListener("click", function (event) {
  const suggestionsList = document.getElementById("suggestions-list");
  const searchInput = document.getElementById("drink-search");

  if (
    event.target !== suggestionsList &&
    event.target !== searchInput &&
    !suggestionsList.contains(event.target)
  ) {
    suggestionsList.style.display = "none";
  }
});

const drinkListContainer = document.getElementById("drink-list-container");
const favoriteDrinks = [];
async function fetchDrink(query) {
  // queries: s= search by drink name, i= serach by ingredient name, f= search by first letter,

  // Fetch from API using drink name
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}`
  );
  const drinks = (await res.json()).drinks; // get drinks from data query

  const drinkList = document.getElementById("drink-list");
  const drinkIngredients = [];

  // console.log(drinkIngredients);
  // return;

  // literate through drinks, appending each one as a list item
  /* 
  !! HTML is directly being set inline instead of appending a new element
  !! this not only results cleaner code but also
  !! prevents being able to re-appened any HTML to the container
  */
  drinkList.innerHTML = drinks
    .map((drink) => {
      let drinkIngredients = [];
      //#region Gather drink ingredients
      if (drink.strIngredient1) {
        drinkIngredients.push(drink.strIngredient1);
      }
      if (drink.strIngredient2) {
        drinkIngredients.push(drink.strIngredient2);
      }
      if (drink.strIngredient3) {
        drinkIngredients.push(drink.strIngredient3);
      }
      if (drink.strIngredient4) {
        drinkIngredients.push(drink.strIngredient4);
      }
      if (drink.strIngredient5) {
        drinkIngredients.push(drink.strIngredient5);
      }
      if (drink.strIngredient6) {
        drinkIngredients.push(drink.strIngredient6);
      }
      if (drink.strIngredient7) {
        drinkIngredients.push(drink.strIngredient7);
      }
      if (drink.strIngredient8) {
        drinkIngredients.push(drink.strIngredient8);
      }
      if (drink.strIngredient9) {
        drinkIngredients.push(drink.strIngredient9);
      }
      if (drink.strIngredient10) {
        drinkIngredients.push(drink.strIngredient10);
      }
      if (drink.strIngredient11) {
        drinkIngredients.push(drink.strIngredient11);
      }
      if (drink.strIngredient12) {
        drinkIngredients.push(drink.strIngredient12);
      }
      if (drink.strIngredient13) {
        drinkIngredients.push(drink.strIngredient13);
      }
      if (drink.strIngredient14) {
        drinkIngredients.push(drink.strIngredient14);
      }
      if (drink.strIngredient15) {
        drinkIngredients.push(drink.strIngredient15);
      }
      //#endregion

      let drinkMeasurements = [];
      //#region Gather drink measurements
      if (drink.strMeasure1) {
        drinkMeasurements.push(drink.strMeasure1);
      }
      if (drink.strMeasure2) {
        drinkMeasurements.push(drink.strMeasure2);
      }
      if (drink.strMeasure3) {
        drinkMeasurements.push(drink.strMeasure3);
      }
      if (drink.strMeasure4) {
        drinkMeasurements.push(drink.strMeasure4);
      }
      if (drink.strMeasure5) {
        drinkMeasurements.push(drink.strMeasure5);
      }
      if (drink.strMeasure6) {
        drinkMeasurements.push(drink.strMeasure6);
      }
      if (drink.strMeasure7) {
        drinkMeasurements.push(drink.strMeasure7);
      }
      if (drink.strMeasure8) {
        drinkMeasurements.push(drink.strMeasure8);
      }
      if (drink.strMeasure9) {
        drinkMeasurements.push(drink.strMeasure9);
      }
      if (drink.strMeasure10) {
        drinkMeasurements.push(drink.strMeasure10);
      }
      if (drink.strMeasure11) {
        drinkMeasurements.push(drink.strMeasure11);
      }
      if (drink.strMeasure12) {
        drinkMeasurements.push(drink.strMeasure12);
      }
      if (drink.strMeasure13) {
        drinkMeasurements.push(drink.strMeasure13);
      }
      if (drink.strMeasure14) {
        drinkMeasurements.push(drink.strMeasure14);
      }
      if (drink.strMeasure15) {
        drinkMeasurements.push(drink.strMeasure15);
      }
      //#endregion

      return `
        <li>
          <div class="drink-list--drink">
            <div class="flex flex-row gap-x-[50px]">
              <img src="${drink.strDrinkThumb}" alt="drink thumbnail">
              <div>
                <h1 class="drink-name">${drink.strDrink}</h1>
                <ul class="drink-ingredients">
                  <h2>Ingredients</h2>
                  ${drinkIngredients
                    .map((ingredient) => `<li>${ingredient}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
            ${
              drink.strVideo != null
                ? `
                <div>
                  <h3>Drink Video</h3>
                  <iframe src="https://www.youtube.com/embed/${
                    drink.strVideo.split("v=")[1]
                  }" allowfullscreen></iframe>
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
    })
    .join("");
}

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

  ingredients = ingredients.split(",");
  measurements = measurements.split(",");

  for (let ingredient in ingredients) {
    ingredients[ingredient] = `<span style="font-family: 'Lulo Bold'">${
      measurements[ingredient] == undefined ? "" : measurements[ingredient]
    }</span> ${ingredients[ingredient]}`;
  }

  modal.showModal();

  // Set drink name header
  modal.querySelector("#recipe--drink-name").innerHTML = drinkName;
  modal.querySelector("#recipe--instructions").innerHTML = instructions;
  modal.querySelector("#recipe--glass-type").innerHTML = `Glass: ${glassType}`;
  modal.querySelector("#recipe--drink-thumb").src = thumbnail;

  // Set drink ingredients
  drinkIngredients.innerHTML = `${ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("")}`;

  // Set drink info
  drinkInfo.innerHTML = `
    <li>${isAlcoholic}</li>
    <li>${drinkCategory}</li>
    <li></li>
    <li></li>
  `;
}

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
    const searchInput = document.getElementById("drink-search");

searchInput.addEventListener("keydown", function (event) {
  
  if (event.key === "Enter") {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
      fetchDrink(`s=${searchTerm}`);
    }
  }
});
}

window.onload = () => {
  init();
  fetchDrink("s=gin");
};
