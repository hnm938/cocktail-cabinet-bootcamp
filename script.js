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

// #region Map Functions
var map;
// Function to create the map
function initMap() {
  // Check if the browser supports Geolocation
  if (navigator.geolocation) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map = new google.maps.Map(document.getElementById("map"), {
          center: currentLocation,
          zoom: 12,
        });

        var request = {
          location: currentLocation,
          radius: "4000",
          type: ["bar"],
        };

        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i], map);
            }
          }
        });

        // Add a marker at the user's current location
        var marker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          title: "Your Location",
        });
      },
      function () {
        // Handle errors when retrieving the user's location
        handleLocationError(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}

// Error function if user location cannot be found
function handleLocationError(browserHasGeolocation) {
  var error = browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.";
  console.error(error);
  // Display a default map centered at a specific location
  var defaultLocation = { lat: -34.397, lng: 150.644 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 8,
  });
}

// Marker function to create bar markers
function createMarker(place, map) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", function () {
    // Show additional information about the place in an info window
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(
      "<strong>" + place.name + "</strong><br>" + place.vicinity
    );
    infowindow.open(map, this);
  });
}

// Function to show map via CSS
function showMap(e, map) {
  map.classList.toggle("active");
  e.classList.toggle("active");
  console.log(map);
}
// #endregion

// Get the container for the drink list
const drinkListContainer = document.getElementById("drink-list-container");
// Array to store favorite drinks
const favoriteDrinks = [];

//#region Drink Functions
async function fetchDrink(query, usingID, drinkIDs) {
  // queries: s= search by drink name, i= serach by ingredient name, f= search by first letter,
  let drinks = null;

  // Fetch from API using drink name
  let savedDrinks = [];
  if (usingID) {
    // Set drinks to an empty array
    drinks = [];
    for (drinkID of drinkIDs) {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`
      );
      drinks.push((await res.json()).drinks[0]);
    }
  } else {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}`
    );
    drinks = (await res.json()).drinks; // get drinks from data query
  }

  console.log(drinks);

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

  // Clear the drink list container
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
            <div class="recipe-button-container">
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
              <button class="recipe-button rounded-full aspect-square text-[1.25rem]" onclick="saveDrink(${
                drink.idDrink
              })">⭐</button>
              ${
                window.location.href.includes("favorites") == false
                  ? ""
                  : `<button class="recipe-button rounded-full aspect-square text-[1.25rem]" onclick="removeSavedDrink(${drink.idDrink})">🗑️</button>`
              }
            </div>
          </div>
        </li>
        <div class="list-splitter">
          <img src="./assets/wooden-floor-isolate-png.png" alt="list item splitter hanging shelf"/>
        </div>
      `;
    })
    .join("");
}
//#endregion

// Function to save the drink ID to local storage
async function saveDrink(drinkID) {
  let savedDrinks = [localStorage.getItem("saved-drinks")];
  savedDrinks = savedDrinks == null ? [] : savedDrinks;

  // Prevent duplicate saved drinks
  if (localStorage.getItem("saved-drinks") !== null) {
    if (localStorage.getItem("saved-drinks").includes(drinkID)) {
      return;
    }
  }
  savedDrinks.push(drinkID.toString());
  localStorage.setItem("saved-drinks", savedDrinks);
  alert("🍸 Drink Added to Favorites 🍹");
}

function removeSavedDrink(drinkID) {
  let savedDrinks = localStorage.getItem("saved-drinks").split(",");
  savedDrinks = savedDrinks.filter((id) => ![`${drinkID}`].includes(id));

  localStorage.setItem("saved-drinks", savedDrinks);
  window.location.reload();
}

function loadSavedDrinks() {
  let savedDrinks = localStorage.getItem("saved-drinks").split(",");
  savedDrinks.splice(0, 1);
  fetchDrink("", true, savedDrinks);
}

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

  for (let ingredient in ingredients) {
    ingredients[ingredient] = `<span style="font-family: 'Lulo Bold'">${
      measurements[ingredient] == undefined ? "" : measurements[ingredient]
    }</span> ${ingredients[ingredient]}`;
  }

  // Show the modal

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
