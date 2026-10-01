let mealId = location.search.split("=")[1];
let crumbName = document.getElementById("crumbName");
let mealImg = document.getElementById("mealImg");
let mealTitle = document.getElementById("mealTitle");
let mealCategory = document.getElementById("mealCategory");
let mealSource = document.getElementById("mealSource");
let mealTags = document.getElementById("mealTags");
let ingredientsList = document.getElementById("ingredientsList");
let measuresGrid = document.getElementById("measuresGrid");
let instructionsList = document.getElementById("instructionsList");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
function goSearch() {
    let query = searchInput.value.trim();
    if (query == "") {
        return;
    }
    location.href = "index.html?s=" + query;
}
if (searchBtn) {
    searchBtn.addEventListener("click", goSearch);
}
if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            goSearch();
        }
    });
}
async function getMeal() {
    try {
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId
        );
        let data = await response.json();
        let meal = data.meals[0];
        if (!meal) {
            mealTitle.innerHTML = "Meal not found";
            return;
        }
        crumbName.innerHTML = meal.strMeal;
        mealTitle.innerHTML = meal.strMeal;
        mealImg.src = meal.strMealThumb;
        mealImg.alt = meal.strMeal;
        mealCategory.innerHTML = meal.strCategory;
        if (meal.strSource) {
            mealSource.href = meal.strSource;
            mealSource.innerHTML = meal.strSource;
        }
        else {
            mealSource.parentElement.hidden = true;
        }
        let ingredientOutput = "";
        let measureOutput = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal["strIngredient" + i];
            let measure = meal["strMeasure" + i];
                if (ingredient && ingredient.trim() != "") {
                ingredientOutput += `
                    <li>
                        ${ingredient}
                    </li>
                `;
                measureOutput += `
                    <span>
                        ${measure}
                    </span>
                `;
            }  
        }
        ingredientsList.innerHTML = ingredientOutput;
        measuresGrid.innerHTML = measureOutput;
        let tags = meal.strTags;
        if (tags) {
            let tagArray = tags.split(",");
            let tagOutput = "";
            for (let i = 0; i < tagArray.length; i++) {
                tagOutput += `
                    <span>
                        ${tagArray[i].trim()}
                    </span>
                `;
            }
            mealTags.innerHTML = tagOutput;
        }
        let instructions = meal.strInstructions;
        let instructionArray = instructions.split("\n");
        let instructionOutput = "";
        for (let i = 0; i < instructionArray.length; i++) {
            if (instructionArray[i].trim() != "") {
                instructionOutput += `
                    <li>
                        ${instructionArray[i]}
                    </li>
                `;
            }
        }
        instructionsList.innerHTML = instructionOutput;
    }
    catch (error) {
        console.log("Error loading meal:", error);
        mealTitle.innerHTML = "Something went wrong.";
    }
}
if (mealId) {
    getMeal();
}
else {
    mealTitle.innerHTML = "No meal selected.";
}
renderCategoriesGrid("categoriesGrid");
