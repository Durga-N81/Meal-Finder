// hambuger menu

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((response) => response.json())

  .then((data) => {
    let output = "";

    data.categories.forEach((item) => {
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
  });
