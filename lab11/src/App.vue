<script>
// Import to be recognized to be used in the file
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SideMenu from './components/SideMenu.vue'
import { RouterView } from 'vue-router';

export default {
  components: {
    Header,
    Footer,
    SideMenu
  }
}
</script>

<template>

<!-- This is where my content will be -->
<!-- Go to assets/main.css -> Remove everything -->
<!-- To position the components (top - header, bottom - footer) -->
<Header/>
<div class="container my-5">
<div class="row">
  <div class="col-3">
    <SideMenu/>
  </div>
  <div class="col-9">
    <RouterView />
  </div>
</div>
</div>
  
<Footer/>
</template>

<style scoped>

</style>
