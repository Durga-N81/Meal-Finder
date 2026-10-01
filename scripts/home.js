let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let mealsSection = document.getElementById("mealsSection");
let mealsGrid = document.getElementById("mealsGrid");
let noResultMsg = document.getElementById("noResultMsg");
async function searchMeals(query) {
  try {
    // Fetch meals from API
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query,
    );
    let data = await response.json();
    let meals = data.meals;
    mealsSection.hidden = false;
    if (meals == null) {
      mealsGrid.innerHTML = "";
      noResultMsg.hidden = false;
      return;
    }
    noResultMsg.hidden = true;
    let output = "";
    for (let i = 0; i < meals.length; i++) {
      output += ` <div class="card">
                 <img src="${meals[i].strMealThumb}"
                 alt="${meals[i].strMeal}" > 
                 <h3>${meals[i].strMeal}</h3> 
                </div> 
                `;
    }
    mealsGrid.innerHTML = output;
  } catch (error) {
    console.log("Search error:", error);
    mealsGrid.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}
function handleSearch() {
  let query = searchInput.value.trim();
  if (query == "") {
    mealsSection.hidden = true;
    return;
  }
  searchMeals(query);
}
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    handleSearch();
  }
});
renderCategoriesGrid("categoriesGrid");
let query = location.search.split("=")[1];
if (query) {
  searchInput.value = query;
  searchMeals(query);
} else {
  mealsSection.hidden = true;
}
