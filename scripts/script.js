// hambuger menu

/* fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((response) => response.json())

  .then((data) => {
    let output = "";

    data.categories.map((item) => {
      output += `
                    <li class="list-group-item">
                        ${item.strCategory}
                    </li>
                `;
    });

    document.getElementById("categoryMenu").innerHTML = output;
  })

  .catch((error) => {
    console.log("Error:", error);
  }); */

 /* async function getItems(){
    try{
        let response=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data=await response.json();
        let output="";
        data.categories.map((item)=>{
            output+=`
            <li class="list-group-item">
            ${item.strCategory}
            </li>
            `;

        });
        document.getElementById("categoryMenu").innerHTML=output;
        

    }
    catch(error){
        console.log(error);
    }
  }
  getItems();
*/

  
// API URL
const API_URL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

// Get HTML elements
const categoryMenu = document.getElementById("categoryMenu");
const categoriesGrid = document.getElementById("categoriesGrid");


// Create async function
async function getCategories() {

    // fetch API
    const response = await fetch(API_URL);

    // Convert response into JSON
    const data = await response.json();

    // Get categories array
    const categories = data.categories;


    // -----------------------------
    // HAMBURGER MENU
    // -----------------------------

    const menuOutput = categories.map((item) => {

        return `
            <li class="list-group-item">
                ${item.strCategory}
            </li>
        `;

    }).join("");

    // Display menu
    categoryMenu.innerHTML = menuOutput;


    // -----------------------------
    // CATEGORY CARDS
    // -----------------------------

    const categoryOutput = categories.map((item) => {

        return `
            <div class="card">

                <img
                    src="${item.strCategoryThumb}"
                    alt="${item.strCategory}"
                >

                <div class="card-body">

                    <h5 class="card-title">
                        ${item.strCategory}
                    </h5>

                    <p class="card-text">
                        ${item.strCategoryDescription}
                    </p>

                </div>

            </div>
        `;

    }).join("");


    // Display cards
    categoriesGrid.innerHTML = categoryOutput;
}


// Call function
getCategories();
