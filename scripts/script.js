let hamburgerBtn = document.getElementById("hamburgerBtn");
let closeMenuBtn = document.getElementById("closeMenuBtn");
let sideMenu = document.getElementById("sideMenu");
let overlay = document.getElementById("overlay");
let menuList = document.getElementById("menuList");

// Open menu
function openMenu() {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
}

// Close menu
function closeMenu() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
}
// Check if button exists
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", openMenu);
}
if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeMenu);
}
if (overlay) {
  overlay.addEventListener("click", closeMenu);
}
async function loadMenu() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );
    let data = await response.json();
    let categories = data.categories;
    if (categories && categories.length > 0) {
      let filteredCategories = categories.filter(function (category) {
        return category.strCategory !== "Pork";
      });

      let menuItems = filteredCategories.map(function (category) {
        return `
                    <li>
                        <a href="category.html?c=${encodeURIComponent(category.strCategory)}">
                            ${category.strCategory}
                        </a>
                    </li>
                `;
      });
      let output = menuItems.reduce(function (total, item) {
        return total + item;
      }, "");
      menuList.innerHTML = output;
    } else {
      menuList.innerHTML = "<li>No categories found</li>";
    }
  } catch (error) {
    console.log("Error loading categories:", error);
    menuList.innerHTML = "<li>Could not load menu</li>";
  }
}
if (menuList) {
  loadMenu();
}
function mealCardHTML(meal) {
  let output = `
        <a class="card" href="meal.html?id=${meal.idMeal}">

            <div class="card-img-wrap">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                    loading="lazy"
                >

            </div>


            <div class="card-body">

                <span class="title">
                    ${meal.strMeal}
                </span>

            </div>

        </a>
    `;

  return output;
}
async function renderCategoriesGrid(targetId) {
  let grid = document.getElementById(targetId);
  if (!grid) {
    return;
  }

  try {
    // Fetch categories
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );

    // Convert to JSON
    let data = await response.json();

    // Get categories
    let categories = data.categories;
    for (let i = 0; i < categories.length; i++) {
      console.log(categories[i].strCategory);
    }
    let filteredCategories = categories.filter(function (category) {
      return category.strCategory !== "Pork";
    });
    let categoryCards = filteredCategories.map(function (category) {
      return `
                <a
                    class="card category-card"
                    href="category.html?c=${encodeURIComponent(category.strCategory)}"
                >

                    <div class="card-img-wrap">

                        <img
                            src="${category.strCategoryThumb}"
                            alt="${category.strCategory}"
                            loading="lazy"
                        >

                        <span class="badge">
                            ${category.strCategory}
                        </span>

                    </div>

                </a>
            `;
    });
    let finalOutput = categoryCards.reduce(function (total, card) {
      return total + card;
    }, "");

    // Display cards
    grid.innerHTML = finalOutput;
  } catch (error) {
    console.log("Error loading categories:", error);

    grid.innerHTML = "<p>Could not load categories.</p>";
  }
}
// Get category name from URL
let categoryName = location.search.split("=")[1];

// Get HTML elements
let categoryInfo = document.getElementById("categoryInfo");
let mealsGrid = document.getElementById("mealsGrid");
let noResultMsg = document.getElementById("noResultMsg");

async function getCategory() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  let data = await response.json();

  let categories = data.categories;

  let output = "";

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].strCategory == categoryName) {
      output = `
                <h2>${categories[i].strCategory}</h2>
                <p>${categories[i].strCategoryDescription}</p>
            `;
    }
  }

  categoryInfo.innerHTML = output;
}
async function getMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoryName,
  );

  let data = await response.json();

  let meals = data.meals;

  let output = "";
  if (meals == null) {
    noResultMsg.innerHTML = "No meals found";

    return;
  }
  for (let i = 0; i < meals.length; i++) {
    output += `
            <div class="card">

                <img 
                    src="${meals[i].strMealThumb}"
                    alt="${meals[i].strMeal}"
                >

                <h3>${meals[i].strMeal}</h3>

            </div>
        `;
  }

  mealsGrid.innerHTML = output;
}
if (categoryName) {
  getCategory();

  getMeals();
} else {
  categoryInfo.innerHTML = "No category selected";
}

