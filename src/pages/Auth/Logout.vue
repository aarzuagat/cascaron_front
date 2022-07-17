<template>
  <div class="log">
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('mystore/logoutUser')
        .then(() => {
          this.$router.push({name:'home'})
        })
    }
  }
</script>

<style scoped>
</style>
