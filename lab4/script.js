// We use localStorage to store the added to do item , inside our browser
// As long as user does not remove data, the todo tasks can be retrieved
// w3schools reference - Local Storage (for reading)
// TO save item in localStorage = localStorage.setItem("tasks", <Item to be saved>)
// To retrieve item from localStorage = localStorage.getItem("tasks")

// LocalStorage can only store = String, number and boolean
// If we want to save Array, Object or Array of Object, Transform it to String
// JSON.stringify -> Transform Array,Object or Array of Object (JSON) -> String
// JSON.parse -> String -> Array,Object, Array Object (JSON)

let tasks = [];

// When the page is loaded, call the function loadFromStorage
// document -> In the page
// addEventListener -> Wait until
document.addEventListener("DOMContentLoaded", function(){
    // When the entire page is loaded properly, call the loadFromStorage function
    loadFromStorage();
})

// This function will be called when the button is clicked
// We use 1st methody: onclick property of button
function buttonClicked(){
    // Go inside  HTML, get the element with the id ="item_name"
    // Retrieve the value , whatever entered by user
    let name = document.getElementById("item_name").value;
    let place = document.getElementById("item_place").value;

    // alert(`User enter name: ${name} and place: ${place}`);
    let messageEl = document.getElementById("message");

    /// Verify, and get the place as well
    if (name == "" || place == ""){
        // Notes: innerHTML is a property, indicate to be
        // put as a content of element, eg <p></p>
        messageEl.innerHTML = "Please enter both name and place";
    }
    else {
        messageEl.innerHTML = `User enter name: ${name} and
        place: ${place}`;

        // Creating an object {"name":"Have Lunch","place":"KFC"}
        let newItem = {
            "name":name,
            "place":place
        };
        
        tasks.push(newItem);
        // SAVE THE DATA IN LOCAL STORAGE
        saveToStorage();

        console.log(tasks);

        // In DOM Manipulation
        // When the property, eg: .value is set on the right side, 
        // we retrieve the value of the element ->getter

        // When the property, eg: .value is on the left side.
        // We set the value of the element -> setter

        // Eg: These 2 lines will reset the input
        document.getElementById("item_name").value = "";
        document.getElementById("item_place").value = "";

        // Reload all table
        loadData();
       
    }

}
// 2nd method: addEventListener() method TBC
document.getElementById("add_item_btn").addEventListener("click", buttonClicked);

function loadData(){
   
    // Clear first all existing data
    document.getElementById("taskList").innerHTML = "";

 // Go through the array - repeat tasks.length times
    for (let i = 0; i < tasks.length ; i++){

    // Create an li
    let newLi = document.createElement("li"); // <li></li>
    // Inside the li put the item name - item place
    newLi.innerHTML = `${tasks[i].name} - ${tasks[i].place}`;

    // Create a button
    let newButton = document.createElement("button");
    newButton.innerHTML = "X";

    // KIV ()=>  and document.addEventListener("click", function())
    // When the page is loaded, call the function ()=>
    newButton.addEventListener("click", () => removeData(newLi,i));
    newLi.appendChild(newButton)
    
    //Add it to the ul of id tasks
    document.getElementById("taskList").appendChild(newLi);
    }
}
function removeData(el, index){
    // Remove the li from ul [this already reload the UI]
    //el.remove();
    // Remove from array
    tasks.splice(index,1);
    // Save the data
    saveToStorage()
    loadData()
    

}

function saveToStorage(){
    // Transform the array tasks -> String
    // Save it inside the local storage, with key name "tasks"
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadFromStorage(){
    // Get the data from local storage
    let tasksString = localStorage.getItem("tasks");
    // If user have saved the data previously, 
    if (tasksString != null){
        // Transform from string to JSON, (Array of Object)- Load it to tasks
        tasks = JSON.parse(tasksString);
        // Reload the ul with the updated data
        loadData();
    }
}