<template>
    <div>
        <!-- In the real vuejs we can use <form> or without <form></form> -->
        <div class="alert alert-success" role="alert" v-if="showSucess">
            Employee successfully added
        </div>
        <div class="alert alert-danger" role="alert" v-if="showError">
            Something is wrong. Please verify your form
        </div>
        <h1>Add Employee</h1>
        <div class="mb-3">
            <input type="text" name="name" id="name"
            placeholder="Enter employee name" class="form form-control" v-model="newUser.name">
        </div>
        <div class="mb-3">
            <input type="email" name="email" id="email"
            placeholder="Enter employee email" class="form form-control" v-model="newUser.email">
        </div>
        <div class="mb-3">
            <input type="text" name="department" id="department"
            placeholder="Enter employee department" class="form form-control" v-model="newUser.department">
        </div>
        <div class="mb-3">
            <input type="text" name="address" id="address"
            placeholder="Enter employee address" class="form form-control" v-model="newUser.address"> 
        </div>

        <!-- THe button is disabled when any of the field is empty -->
        <button class="btn btn-primary" 
        @click="addUser" 
        v-bind:disabled="newUser.name=='' || newUser.address=='' 
        || newUser.department=='' || newUser.email==''|| loading == true"
        >
        <span v-if="!loading">Add Employee</span>
        <span v-if="loading">Adding...</span>
    </button>
    
    </div>
</template>
<script>

export default {
    data(){
        return {
            // variable to bind the user with v-model
            // the property of object needs to be the same
            // as column in sheet
            newUser:{
                'name':'',
                'email':'',
                'department':'',
                'address':''
            },
            loading:false,
            showSucess:false,
            showError:false
        }
    },
    methods : {
        addUser(){
            // TODO - > Call the API POST
            // fetch then.catch
            // Another way to call API using library axios [React.js class or feedback to Viview]
           
            const data= {"sheet1":this.newUser}
            this.loading = true
            fetch("https://api.sheety.co/d532f2aa4a270d7371d53dde2547ba28/employees/sheet1", 
            {
                method:"POST", // Method post
                headers: {
                    "Content-Type":"application/json" // Data type passed
                },
                body:JSON.stringify(data) // data
            }).then(response=> response.json())
            .then(data=> {
                console.log(data);
                this.loading = false;
                // Reset back the form = set to empty form

                
                this.showSucess = true
                setTimeout(()=> this.showSucess = false, 2000)

                this.newUser = {
                    'name':'',
                    'email':'',
                    'department':'',
                    'address':''
                }

            })
            .catch(err => {
                console.log(err);
                this.loading = false
                this.showError = true
                setTimeout(()=> this.showError = false, 2000)
            });
        
        }
    }
}
</script>
<style>
    
</style>