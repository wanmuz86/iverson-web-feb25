<template >
    <div>
       <input type="text" 
       placeholder="Enter your name" v-model="name">
       <input type="text" 
       placeholder="Enter your age" v-model="age">
       <!-- v-bind to link the attribute of an element to
    data or logic of datas... -->
    <!--In this example, the attribute disabled, is linked to the logic
     name and age cannot be empty -->
       <button @click="sayHello" v-bind:disabled="
       name ==='' || age===''">Click me</button> 
    
       <p>User is typing {{name}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // We use v-model to link/bind the input to the data
            name:"",
            age:""
        }
    },
    methods: {
        sayHello(){
            alert(`Hello ${this.name} you have entered ${this.age}`);
        }
    },
}
</script>
<style >
    
</style>