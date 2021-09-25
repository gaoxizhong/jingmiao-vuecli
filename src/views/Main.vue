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
      activeName:'1',
      iconList:[
        {id:1,name:'临床表现'},
        {id:2,name:'病因'},
        {id:3,name:'并发症'},
        {id:4,name:'辅助检查'},
        {id:5,name:'诊断'},
        {id:5,name:'治疗'},
      ],
      hove_id: 0,
      itemIndex: 0,
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
          let name = datalist[0].data[0].departmentLevel2.name[0].departmentLevel2;
          this.datalist = datalist;
          this.name = name;
          this.$store.dispatch("sickNess",name);
          this.setsickNess();
        }else if(res.data.code == 1){
          this.$message.error({
              message: res.data.msg
          });
          this.$router.push('/Login');
          return
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
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
          this.is_view = true
      })
    },
    iconClick(e){
      console.log(e)
      let hove_id = e.target.dataset.index;
      this.hove_id = hove_id;
      this.itemIndex = e.target.dataset.itemIndex
    },
  },
}
</script>
<style lang="scss" scoped>
  .el-header{
    background: #29bbff;
  }
  .el-container{
    background: #f7f7f7;
    height: 100%;
  }
  .el-main{
    padding: 20px 36px;
  }
</style>
