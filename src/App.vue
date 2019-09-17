<template>
  <div id="app">
    <Header/>
    <router-view class="container footer-bottom"/>
    <Footer/>
  </div>
</template>

<script>

import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'app',
  components: {
    Footer,
    Header
  }
}
</script>

<style>
  .footer-bottom {
    position: relative;
    min-height: 100vh;
  }
</style>
