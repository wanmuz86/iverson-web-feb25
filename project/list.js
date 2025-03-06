
document.addEventListener("DOMContentLoaded", function(){
   // After the page is loaded, this will be executed

   function fetchDataFromAPI(){

    fetch("https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/employees")
    .then(response=> response.json())
    .then(data => {
        console.log(data)

        // Verify with your API / Sheety data
        const employees = data.employees;

        // For loop to create the rows (5)
        for (let i = 0; i < employees.length; i++){

            // Create new row tr
            let newTr = document.createElement("tr");

            // Verify on your table, how many columns are there - 4
            // Create new column ? 4 columns
            let newTd1 = document.createElement("td");
            let newTd2 = document.createElement("td");
            let newTd3 = document.createElement("td");
            let newTd4 = document.createElement("td");

             // Set the  innerHTML of the column
             newTd1.innerHTML = employees[i].empid;
             newTd2.innerHTML = employees[i].name;
             newTd3.innerHTML = employees[i].department;
             // Homework, for those who want to do it, add the button - View, Edit, Delete

             // Create 3 buttons
             // Add class to the button "btn btn-primary" , "btn btn-secondary" , "btn btn-danger"
             // AddEventListener "click" to each of the button
             // Append to newTd
             newTd4.innerHTML = "TODO BUTTONS LATER!!"

             // Add the Columns to The row
             newTr.appendChild(newTd1);
             newTr.appendChild(newTd2);
             newTr.appendChild(newTd3);
             newTr.appendChild(newTd4);
             
             // Add the rows to the tbody
             let tbody = document.getElementById("employee_tbody");
             tbody.appendChild(newTr)
        }
   
    })
    .catch(err=> console.log(err))
   }

   // Invoke the function
   fetchDataFromAPI()

})

