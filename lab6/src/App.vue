<!-- Section for script -->
<script>
// Import any other components needed

import Header from './components/Header.vue'; // Import Header
import Footer from './components/Footer.vue'; // Import Footer
import Counter from './components/Counter.vue'; // Import Counter
import MyForm from './components/MyForm.vue'; // Import MyForm

export default {
  // This is where I declare all my variables
  data(){
    return {
      name:"Muzaffar", // String
      age:30, // Number
      married:true, // Boolean
      scores:[70,90,100,80,50], //Array
      info:{"name":"Muzaffar","profession":"Trainer","location":"KL"}, //Object
      counter:0, //Number,
      childMessage:""   // String to retrieve the info from child component  
    }
  },
  methods: {
    // This is where I declare all my functions
    sayHello(){
      this.counter++;
      alert("Hello Vue!");
    },
    updateMessage(message){
      // Message refers to the second parameter passed from the 
      //  child component (payload)
      // alert(message);
      this.childMessage = message;
    }
  },
  components: {
    // Components used in this file
    Header,
    Footer,
    Counter,
    MyForm
  }
}
</script>

<template>
  <!-- Section for HTML -->
  <div>
    <Header/>
    <h1>Hello Vue!</h1>
    <p>This is my first vue application</p>
    <!-- Interpolation {{ }} -->
    <p>My name is {{name}}, I am {{age}} years old.</p>
    <p>Married : {{married}}</p>
    <div>
      <h2>Today's exam scores</h2>
      <ul>
        <!-- Directive v-for  foreach (singular) in (plural)-->
        <li v-for="score in scores">{{ score }}</li>
      </ul>
    </div>
    <div>
      <h2>Cari Jodoh</h2>
      <!-- v-if directive -->
      <p v-if="!married">Jom cari Jodoh</p>
      <p v-if="married">Cannot cari jodoh</p>
    </div>
    <div>
    <h2>Example of click</h2>
    <p>User clicked {{counter}} times</p> 
    <button v-on:click="sayHello">Click me</button>
    <hr/>
    <h2>Counters</h2>
    <p>{{childMessage}}</p>
    <!-- The component is reusable and isolated/ independent
    data/state in Counter1 is isolated from Counter2 , Counter3 ...
    -->
    <!-- We can pass attribute/property / props to 
      properly configure/customized our Component-->
      <!-- We says that App Component is a parent component, 
        and Counter is the Child Component -->
        <!-- props is a way to pass data to parent to child -->
    <Counter :start="10" :max="1000" :min="-1000" name="A"
    @button-pressed="updateMessage"/>
    <hr/>
    <!-- 
      In the scenario of passing data from Child to Parent
      @button-pressed refers to the event name emitted from Child Component
      updateMessage is the name of the method in Parent, 
      that will be invoked
      when the event is emitted from the Child Component
    -->
    <Counter :min="-100" :max="100" :start="-5" name="B" 
    @button-pressed="updateMessage"/>
    <hr/>
    <Counter :min="0" :max="10" :start="0" name="C"
    @button-pressed="updateMessage"/>
    </div>
  </div>
  <hr/>
  <h2>Form Example</h2>
  <MyForm/>

  <Footer/>
</template>

<style scoped>
  /* Section for CSS */

</style>
