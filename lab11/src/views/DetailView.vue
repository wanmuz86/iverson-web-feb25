<template>
    <div>
        <h1>This is detail page for {{ $route.params.id }} </h1>
        <p>Later I will call API to get the data</p>
    </div>
</template>
<script>
export default {
    mounted(){
        console.log(this.$route.params.id)
        // TODO: PRACTICE TO CALL THE API /id
        // AND BRING OUT THE DATA IN UI
    },
    
}
</script>
<style>
    
</style>