<template>
  <div>

  </div>
</template>

<script>
  export default {
    name:'HomeView',
    mounted () {
      // this.$store.state.activePage = 'home';
      this.$router.push('/shop')
    },
  }
</script>

<style lang="scss" scoped>

</style>