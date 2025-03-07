console.log("Before bracket");
// wait for two seconds,after 2 seconds execute the function inside the {} [asynchronously]
setTimeout(()=> {
  console.log("I am in the {}");
}, 2000);
// while waiting, it will proceed with the rest of the line
// Excution wise this will be executed before line 4 because it is outside the {}
console.log("After bracket");

function fetchUserData(){
  // The return type is a Promise
  // resolve/succes => it will return {}
  // reject = > String
  return new Promise((resolve,reject)=> {
    setTimeout(()=>{
      const success = Math.random() > 0.5;
      if (success) {
        resolve({"id":1, "name": "Wan Wan"});
      }
      else {
        reject("An Error occured");
      }
    },2000);
  });
}

// 1) How do you invoke a function with Promise return type?
fetchUserData().then(data=> console.log(data))
                     .catch(err=>console.log(err));

// 2) async - await (used inside a function)

async function callPromise() {
  try {  
    // Retrieve the data and WAITTT for it
    // When you use the keyword "await", you need to add "async" to the function declaration
    const data = await fetchUser();
    console.log(data);
    
  } catch(e){
    // If something goes wrong during the process .. go to catch..
    console.log(e);
  }
}
console.log("Executing async-await");
callPromise();

async function retrieveRandomUser(){
  try {
    const response = await fetch("https://www.randomuser.me/api");
    const data = await response.json();
    console.log(data);
  } catch (e){
    console.log(e);
  }
};
retrieveRandomUser();