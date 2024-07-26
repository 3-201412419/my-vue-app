<template>
<div id = "app">
  <nav v-if = "!isPostDetailPage">
    <router-link to ="/">Home</router-link> |
    <router-link to="/board">Board</router-link>
  </nav>
  <router-view />
</div>
</template>

<script lang="ts">
 import {defineComponent , computed } from 'vue';
 import { useRoute } from 'vue-router';
 
 export default defineComponent({
    name : 'App',
    setup() {
      const route = useRoute();
      const isPostDetailPage = computed(() => route.name === 'PostDetail');
      
      return { isPostDetailPage};
    }
 })
</script>


<style lang = "scss">

body {
  margin : 0;
  padding : 0;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width : 100%;
  max-width : 1200px;
  margin : 0 auto;
  padding : 0 20px;
  box-sizing : border-box;
}

nav {
  padding: 30px;
  text-align : center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin : 0 10px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

main  {
  width : 100%;
}

</style>
