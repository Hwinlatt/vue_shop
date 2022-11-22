<template>
  <TopBar></TopBar>
  <NavBar></NavBar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import NavBar from './views/components/NavBar.vue';
import TopBar from './views/components/TopBar.vue';
import Footer from './views/components/Footer.vue';
  export default {
    name:"App",
    mounted () {
      this.$store.dispatch('getUserData');
    },
    components: {
      NavBar,TopBar,Footer
    },
  }
</script>

<style lang="scss" scoped>

</style>