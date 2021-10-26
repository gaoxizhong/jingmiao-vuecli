<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  font-family:Source Han Serif CN;
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
<script>
export default {
  name:'app',
  data() {
    return {
        isCollapse: false,
        is_view: true
    };
  },

  methods: {

  },
  created(){

  }
}
</script>
