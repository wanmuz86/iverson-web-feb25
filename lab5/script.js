function buttonClicked(){
    // Retrieve data from Randomuser.me/api
    // The data will be passed back to us in data format  
    // After the data is retrieved , we transform to JSON 
    // (response.json())
    // Show the data into our console
    // Any time during this process, if there is an error, (catch) it
    fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => {
        console.log(data); // See the data in console

        // Object = {} , . ["name"]
        // Array = [] , [index]
        let person = data.results[0];
        document.getElementById("jodoh_email").innerHTML = person.email
        // Bring out the phone
        
        document.getElementById("jodoh_phone").innerHTML = person.phone
        // dob

        // title, first name , last name

        // city + country

        // image 

        // loading (spiner when the button pressed)
    })
    .catch(error=> console.log("error", error));
}