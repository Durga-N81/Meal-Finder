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

  async function getItems(){
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