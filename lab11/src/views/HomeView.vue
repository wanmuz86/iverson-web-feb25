<template >
  <div class="card p-3">
    <h1>Employee List</h1>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
        <td>{{ employee.id }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.department}}</td>
        <td width="40%">
          <button class="btn btn-primary me-3" @click="viewPressed(employee.id)">View More</button>
          <button class="btn btn-secondary me-3" @click="editPressed">Edit More</button>
          <button class="btn btn-danger" @click="deletePressed">Delete</button>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  // This is 1st way of defining the file
  // Another way is using setup (that we deleted just now)
  data(){
    return {
      // variable name to store your data
      employees : []
    }
  },
  mounted(){
    console.log("Component is added to the page / DOM")
    // Eg: we will call the API here
    fetch("https://api.sheety.co/d532f2aa4a270d7371d53dde2547ba28/employees/sheet1")
    .then(response => response.json())
    .then(data => this.employees = data.sheet1) //Put the data in the variables
    .catch(err => `Fetch error ${err}`)
  },
  methods: {
    viewPressed(id){
      //alert(`View for ${id} is pressed`);
      // To go to the detail page without refreshing
      // <router-link> if you call from function / redirect
      this.$router.push(`/detail/${id}`)
    },
    editPressed(){
      alert("Edit is pressed");
    },
    deletePressed(){
      alert("Delete is pressed");

    }
  }
}
</script>
<style>
  
</style>