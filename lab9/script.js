const addBtn = document.getElementById('add_btn');
addBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const empId = document.getElementById('empId').value;
    const department = document.getElementById('department').value;
    const contact = document.getElementById('contact').value;
    const dateemployed = document.getElementById('dateemployed').value;

    // This is the data that we are going to send to the server
    // It should follow the format of JSON that we test in Postman
    const data = {
        "employee": {
            "name":name,
            "email":email,
            "empid":empId,
            "department":department,
            "contact":contact,
            "dateemployed":dateemployed
        }
    }
    // UX Feedback - tell user that we are loading something
   document.getElementById("loading_indicator").removeAttribute("hidden");
   document.getElementById("add_employee_text").setAttribute("hidden",true);
   document.getElementById("add_btn").setAttribute("disabled", true);

    fetch("https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/employees",
    {
        "method": "POST",
        "body": JSON.stringify(data),
        "headers": {
            "Authorization": "Bearer thisisasecretkeyforthisapi",
            "Content-Type": "application/json" // We pass data in JSON format
        }
    })
    .then(response => response.json())
    .then(data => {

        // Show the alert for 2 seconds, then hide it
        document.querySelector(".alert-success").removeAttribute("hidden");
        setTimeout(()=>{
            document.querySelector(".alert-success").setAttribute("hidden",true)
        },2000);

        // Undo back the hidden and the disabled
        document.getElementById("loading_indicator").setAttribute("hidden", true);
        document.getElementById("add_employee_text").removeAttribute("hidden");
        document.getElementById("add_btn").removeAttribute("disabled");

        // Reset the form after successful submission

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("empId").value = "";
        document.getElementById("department").value = "0"; // Default value for select
        document.getElementById("contact").value = "";
        document.getElementById("dateemployed").value = "";

    }).catch(err => {
        alert("There was an error!")
        console.log(err);
        // Undo back the hidden and the disabled
         document.getElementById("loading_indicator").setAttribute("hidden", true);
         document.getElementById("add_employee_text").removeAttribute("hidden");
         document.getElementById("add_btn").removeAttribute("disabled");
 


    });  
})