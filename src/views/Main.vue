<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-aside width="auto">
      <CommonAside :datalist='datalist'></CommonAside>
    </el-aside>
    <el-container >
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <el-main>
        <!-- <CommonSujectList v-if="is_list" @chenglistId="chenglistId($event)"></CommonSujectList>
        <ArticleDetails :_id='id' v-if="is_article"></ArticleDetails> -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
// import CommonSujectList from "../components/CommonSujectList"
// import ArticleDetails from "../components/ArticleDetails"
import {WesternMedicine} from '@/api/data'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    // CommonSujectList,
    // ArticleDetails
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: true,
      is_article: false,
      id:'',
      datalist:[]
    }
  },
  mounted(){
    let that = this;
    that.WesternMedicine();
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },
  methods: {

    // 获取列表id方法
    chenglistId(_id){
      this.id = _id;
      this.is_list = false;
      this.is_article = true;
    },
    // 获取左侧信息

    WesternMedicine(){
      let that = this;
      WesternMedicine({}).then( res =>{
          if(res.data.code == 0){
          let datalist = res.data.data;
          this.datalist = datalist;
          console.log(datalist)
          }else{
          this.$message.error({
              message: res.data.msg
          });
          }
      }).catch(e =>{
          console.log(e)
      })
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
