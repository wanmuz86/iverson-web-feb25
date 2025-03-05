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
        alert("Data successfully added!")
    }).catch(err => {
        alert("There was an error!")
        console.log(err);
    });  
})