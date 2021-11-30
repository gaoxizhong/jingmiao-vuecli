<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-aside width="auto">
      <CommonAside :datalist='datalist' @sickNess="setsickNess"></CommonAside>
    </el-aside>
    <el-container >
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <el-main>
      <keep-alive v-if="is_view">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
// import Home from "../components/Home";

import {WesternMedicine} from '@/api/data'
export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    // Home
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: true,
      is_article: false,
      id:'',
      datalist:[],
      input3:'',
      select: '请选择',
      options:[{label:'疾病',value:1},{label:'药品',value:2}],
      sickNess1:[],
      is_view: true
    }
  },
  mounted(){
    let that = this;
     this.WesternMedicine();
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },

  methods: {
    // 获取左侧信息
    async WesternMedicine(){
      let that = this;
      await  WesternMedicine({}).then( res =>{
        if(res.data.code == 0){
          let datalist = res.data.data;
          this.datalist = datalist;
          this.setsickNess();
        }else{
           this.$message.error({
              message: res.data.msg
          });
        }
      }).catch(e =>{
          console.log(e)
      })
    },
    setsickNess(){
      this.is_view = false;
      console.log(this.is_view)
      this.$nextTick(() => {
        this.is_view = true
        console.log(this.is_view)
      })

    },
  },
}
</script>
<style lang="scss" scoped>
  .el-header{
    background: #fff;
    border-bottom: 1px solid #ececec;
  }
  .el-container{
    // background: #f7f7f7;
    height: 100%;
  }
  .el-main{
    padding: 20px 36px;
  }
</style>
