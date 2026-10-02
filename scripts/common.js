// common.js
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
// Button events
if (hamburgerBtn) {hamburgerBtn.addEventListener("click", openMenu);}
if (closeMenuBtn) {closeMenuBtn.addEventListener("click", closeMenu);}
if (overlay) {overlay.addEventListener("click", closeMenu);}
// menu links from api
async function loadMenu() {
    if (!menuList) {
        return;
    }    try {
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php");
        let data = await response.json();
        let categories = data.categories || [];
        let output = "";
        categories.map(function(category) {
            output += `
                <li>
                    <a href="category.html?c=${encodeURIComponent(category.strCategory)}">
                        ${category.strCategory}
                    </a>
                </li>
            `;

        });

        menuList.innerHTML = output;
    } catch (error) {
        console.log("Error:", error);
        menuList.innerHTML = "<li>Could not load menu</li>";
    }
}
loadMenu();
function mealCardHTML(meal) {
  const badge = meal.strCategory
    ? `<span class="badge">${meal.strCategory}</span>`
    : "";
  const area = meal.strArea
    ? `<span class="area">${meal.strArea}</span>`
    : "";

  return `
    <a class="card" href="meal.html?id=${meal.idMeal}">
      <div class="card-img-wrap">
        <img src="${meal.strMealThumb}" 
             alt="${meal.strMeal}" loading="lazy" />
        ${badge}
      </div>
      <div class="card-body">
        ${area}
        <span class="title">${meal.strMeal}</span>
      </div>
    </a>`;
}

// grid of every category (used on the home page and the meal details page)
async function renderCategoriesGrid(targetId) {
  let grid = document.getElementById(targetId);
  if (!grid) return;

  try {
    // let res = await fetch(`${BASE_URL}/categories.php`);
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await res.json();
    let categories = data.categories || [];

    grid.innerHTML = categories
      .map(
        (cat) => `
        <a class="card category-card" href="category.html?c=${encodeURIComponent(
          cat.strCategory
        )}">
          <div class="card-img-wrap">
            <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" loading="lazy" />
            <span class="badge">${cat.strCategory.toUpperCase()}</span>
          </div>
        </a>`
      )
      .join("");
  } catch (err) {
    console.error("could not load categories:", err);
    grid.innerHTML = "<p>Could not load categories right now.</p>";
  }
}
