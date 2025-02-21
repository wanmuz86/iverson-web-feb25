<template>
    <div>
        <h2>Counter {{name}}</h2>
        <h3>{{ counter }}</h3>
        <!-- Can use @click or v-on:click -->
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            counter:this.start // Counter intial value set from the props
        }
    },
    methods: {
        increment(){
            // Counter max value set from the props
            if (this.counter < this.max){
                this.counter++;
                // Communicate to parent component (App.vue)
                // And pass the updated data to parent component

                // Emit an event to parent component
                // button-pressed is the name of my event
                this.$emit('button-pressed', `User has increment
                counter ${this.name} to ${this.counter}`);


            } else {
                alert("The counter is maxed at " + this.max);
            }
          
        },
        decrement(){
            if (this.counter > this.min){
                this.counter--;
            } else {
                alert("The counter is min at " + this.min);
            }
            this.$emit('button-pressed', `User has decrement counter ${this.name}
            to the value ${this.counter}`);
        }
    },
    props:['min','max','start', 'name'] // Create props/parameters for the component 
}
</script>
<style>
    
</style>