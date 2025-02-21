function buttonClicked(){
    
    // DOM manipulation on the Attribute of the button
   document.getElementById("search_btn").setAttribute("disabled", true);
   document.getElementById("search_btn").innerHTML = 
   'Loading ... <i class="fas fa-spinner fa-spin"></i>'

    // Retrieve data from Randomuser.me/api
    // The data will be passed back to us in data format 
    fetch("https://randomuser.me/api?gender=female")
    // After the data is retrieved , we transform to JSON 
    // (response.json())
    .then(response => response.json())
    .then(data => {
         // Show the data into our console
     
        console.log(data); // See the data in console

        // Object = {} , . ["name"]
        // Array = [] , [index]
        let person = data.results[0];
        document.getElementById("jodoh_email").innerHTML = person.email
        // Bring out the phone
        
        document.getElementById("jodoh_phone").innerHTML = person.phone
        // dob
        document.getElementById("jodoh_dob").innerHTML = person.dob.date
        // title, first name , last name
        document.getElementById("jodoh_name").innerHTML = `${person.name.title} ${person.name.first} ${person.name.last}`
        // city + country
        document.getElementById("jodoh_city").innerHTML = `${person.location.city} ${person.location.country}`
        
        // image 
        let image = person.picture.large;
        document.getElementById("jodoh_image").setAttribute("src", image);

        // Remove the attribute hidden, to show the card
        document.getElementById("jodoh_card").removeAttribute("hidden")
        document.getElementById("search_btn").removeAttribute("disabled");
        document.getElementById('search_btn').innerHTML = "Get me a jodoh"

        // loading (spiner when the button pressed)
    })  // Any time during this process, if there is an error, (catch) it
   
    .catch(error=> console.log("error", error));
}