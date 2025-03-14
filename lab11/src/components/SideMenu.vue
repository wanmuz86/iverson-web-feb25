<template >
    <div class="card">
  <div class="card-header">
    Featured
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
        <!-- <a href="/">Home Page</a></li> -->
        <router-link to="/">Home Page</router-link></li>
    <li class="list-group-item">
        <router-link to="/about">About Page</router-link></li>
    <li class="list-group-item">
        <router-link to="/add">Add Employee</router-link></li>
    <li class="list-group-item">
        <router-link to="/contact-us">Contact Us</router-link></li>
  </ul>
</div>
</template>
<script>
export default {
    
}
</script>
<style>
/* It will only be reflected in this component not globally */
/* router-link , behind it will be transformed to a (without 
refreshing the UI)
*/
    ul li a {
        text-decoration: none;
        color: #111;
        text-transform: uppercase;
    }

    ul li a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    ul li a:active {
        color:#bbb;
    }
</style>