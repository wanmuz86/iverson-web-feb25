
document.addEventListener("DOMContentLoaded", function(){
   // After the page is loaded, this will be executed

   function fetchDataFromAPI(){

    fetch("https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/employees")
    .then(response=> response.json())
    .then(data => {
        console.log(data)
        // Do for loop -
            // Create new row tr

            // Create new column ? How many columns are there

            // Set the innerText or HTML of the column

            // Add the Columns to The row


            // Add the rows to the body
    })
    .catch(err=> console.log(err))
   }

   // Invoke the function
   fetchDataFromAPI()

})

