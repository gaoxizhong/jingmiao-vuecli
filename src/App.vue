<template>
  <div id="app" :style="`main-height:${viewHeight}px;`" >
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
h6 {
  font-size: 16px;
  line-height: 25px;
  font-family: 'Lora', serif;
  font-weight: 400;
  margin-bottom: 10px;
  color: #222222;
  margin-top: 0px;
}
a{
  text-decoration: none;
}
a{
  color: #333;
}
a:hover{
  color: #026ae0;
}
img, svg {
  vertical-align: middle;
}
button{
  outline:none;
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
.el-main{
  min-height: 580px;
  padding: 30px 36px;
  padding-top: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #f5f5f5;
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
.el-header{
  padding: 0px !important;
  width: 100%;
  height: auto !important;
  background: #fff;
  border-bottom: 1px solid #ececec;
  // box-shadow: 0px 2px 6px 0px rgba(197, 197, 197, 0.5);
}
.el-container{
  // background: #f7f7f7;
  height: 100%;
}
.el-footer{
  width: 100%;
  height: auto !important;
  padding: 0;
}
.pagecontent-box{
  width: 1200px;
  overflow: hidden;
}
.is_pom{
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 1000;
}
  table{
    margin: 0 auto;
    position: relative;
  }
  
  table::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border: 1px solid #dfdcdc;
    transform-origin: 0 0;
    transform: scale(0.5);
  }

  table tbody tr{
    padding: 4px 0;
    height: 30px;
  }
  table tbody tr th,table tbody tr td{
    text-align: center;
    margin: 0 auto;
    position: relative;
  }
  table tbody tr th::before,table tbody tr td::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border: 1px solid #dfdcdc;
    transform-origin: 0 0;
    transform: scale(0.5);
  }
@media only screen and (max-width: 1366px){
  .el-main{
    padding: 10px 36px 56px 36px;
  }
}
</style>
<script>
export default {
  name:'app',
  provide(){ // 1、在App.vue,声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载。(provide /inject )
    return {  
      reload: this.reload   // 2、通过provide向子组件注入依赖
    }
  }, 
  data() {
    return {
      isCollapse: false,
      is_view: true,
      isRouterAlive: true,  //  3、声明变量
      viewHeight:0,
    };
  },
  methods: {
    reload(){   // 控制变量的方法
      this.isRouterAlive = false;
      this.$nextTick( function(){
        this.isRouterAlive = true;
      })
      console.log(this.isRouterAlive)
    },

  },
  created(){
    let getViewportSize = this.$getViewportSize();
    let viewHeight = getViewportSize.height
    this.viewHeight = viewHeight;

  },


}
</script>
