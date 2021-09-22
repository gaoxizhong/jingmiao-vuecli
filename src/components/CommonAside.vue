<template>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :background-color="menuBackgroundColor"
        :text-color="menuTextColor"
        unique-opened
    >
        <h3 class="menu-h3" v-show="!isCollapse">菁苗健康</h3>
        <h3 class="menu-h3" v-show="isCollapse">菁苗</h3>
        <el-submenu  :index="item.knowledge_base_name" v-for="(item,index) in datalist" :key="index">
            <!-- 一级标题 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.knowledge_base_name}}</span>
            </template>
            <!-- 二级标题 -->
            <el-submenu :index="item_2.department.name" v-for="(item_2,idx) in item.data" :key="idx" >
                <span slot="title" :data-name='item_2.department.name' :data-sickNess='item_2.sickNess' @click="clickItem_2($event)">{{item_2.department.name}}</span>
            <!-- 三级标题 -->
                <el-menu-item :index="item_3.name" v-for="(item_3,idxx) in item_2.sickNess" :key="idxx">{{item_3.name}}</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>

</template>
<style>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
    height: 100%;
  }
  .el-menu{
      height: 100%;
  }
  .menu-h3{
    height:60px;
    line-height: 60px;
  }
  .el-submenu__title{
    display: flex;
    align-items: center;
  }
</style>
<script>
export default {
    props:['datalist'],
    data() {
        return {
            menuBackgroundColor:'#fff',
            menuTextColor:'#303133',
        }
    },
    watch:{
        datalist(datalist){
        this.datalist = datalist
        console.log(datalist)
        }
    },
    mounted(){

    },
    created(){

    },
    methods: {

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickItem_2(e){
            console.log(e)
            console.log(1)
        },
    },
    computed: {
        noChild() {
            return this.menu.filter( (item) => !item.child)
        },
        hasChild() {
            return this.menu.filter( (item) => item.child)
        },
        isCollapse() {
          return this.$store.state.isCollapse
        }

    }

}
</script>
