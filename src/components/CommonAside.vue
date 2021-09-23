<template>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :background-color="menuBackgroundColor"
        :text-color="menuTextColor"
        default-active="0-0"
        unique-opened
    >
        <h3 class="menu-h3" v-show="!isCollapse">菁苗健康</h3>
        <h3 class="menu-h3" v-show="isCollapse">菁苗</h3>
        <el-submenu  :index="`${index}`" v-for="(item,index) in datalist" :key="index">
            <!-- 一级标题 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.knowledge_base_name}}</span>
            </template>
            <!-- 二级标题 -->
            <el-menu-item style="width:100%;height:100%;" :index="`${index}-${idx}`" v-for="(item_2,idx) in item.data" :key="idx" :itemindex="index" :idx="idx" :name='item_2.department.name' @click="clickItem_2($event)">{{item_2.department.name}}</el-menu-item>
            <!-- <el-submenu :index="`${index}-${idx}`" v-for="(item_2,idx) in item.data" :key="idx" >
                <span slot="title" :data-name='item_2.department.name' :data-index="index" :data-idx="idx" @click="clickItem_2($event)" style="padding-left:30px;width:100%;height:100%;text-align:left;">{{item_2.department.name}}</span>
                <el-menu-item style="width:100%;height:100%;" :index="`${index}-${idx}-${idxx}`" v-for="(item_3,idxx) in item_2.sickNess" :key="idxx" :idxx="idxx" :name3='item_3.name' @click="clickItem_3($event)">{{item_3.name}}</el-menu-item>
            </el-submenu> -->
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
    justify-content: flex-start;
    padding-left: 20px !important;
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
        this.datalist = datalist;
        //  let sickNess1 = this.datalist[0].data[0];
        // console.log(sickNess1)
        //   this.$store.dispatch("sickNess",sickNess1);
        this.aa();
        }
    },
    mounted(){

    },
    created(){

    },
    methods: {
       aa(){
         let arryinfo = this.datalist;
         console.log(arryinfo)
          let sickNess1 = arryinfo[0].data[0];
          this.$store.dispatch("sickNess",sickNess1);
          this.$router.replace({  //核心语句
                path:'/Home',   //跳转的路径
                query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                name:sickNess1.department.name,
                }
            })
         console.log(this.datalist)

       },
       handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickItem_2(e){
            console.log(e)
            let name = e.$attrs.name;
            let arryinfo = this.datalist;
            let index = e.$attrs.itemindex;
            let idx = e.$attrs.idx;
            let sickNess1 = arryinfo[index].data[idx];
            this.$store.dispatch("sickNess",sickNess1);
            this.$emit('sickNess')
            this.$router.replace({  //核心语句
                path:'/Home',   //跳转的路径
                query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                name,
                }
            })
        },
        clickItem_3(e){
            // this.$router.push({  //核心语句
            //     path:'/Main/Details',   //跳转的路径
            //     query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            //     id:'1',
            //     }
            // })
            let arryinfo = this.datalist;
            let idxx = e.$attrs.idxx;
            this.$emit("clickItem_3",idxx);
        }
    },
    computed: {
        noChild() {
            return this.menu.filter( (item) => !item.child)
        },
        hasChild() {
            return this.menu.filter( (item) => item.child)
        },
        isCollapse() {
          console.log(this.$store.state.isCollapse)

          return this.$store.state.isCollapse
        },
    }

}
</script>
