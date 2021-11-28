<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
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
.el-breadcrumb__separator {
    margin: 0 !important;
}
.el-breadcrumb{
  font-size: 13px !important;
  padding-bottom: 20px;
}
.el-breadcrumb__inner{
  color: #9b9797 !important;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
  color: #333 !important;
  font-weight: 600;
}
</style>
<script>
export default {
  name:'app',
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
        isCollapse: false,
        is_view: true,
        isRouterAlive: true
    };
  },

  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick( function(){
        this.isRouterAlive = true;
      })
    }
  },
  created(){

  }
}
</script>
