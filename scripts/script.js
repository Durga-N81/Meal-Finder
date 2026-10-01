


// Get category name from URL
let categoryName = location.search.split("=")[1];


// Get HTML elements
let categoryInfo = document.getElementById("categoryInfo");
let mealsGrid = document.getElementById("mealsGrid");
let noResultMsg = document.getElementById("noResultMsg");

async function getCategory() {

    let response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
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
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoryName
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

}
else {

    categoryInfo.innerHTML = "No category selected";

}
