<template>
  <div class="main-box">
    <el-row class="content-box">
      <el-col :span="12" class="content-col-box" v-for="(item,index) in contentItems" :key="index">
        <div class="content-items">
          <img :src="require('../assets/image' + item.image)" alt=""  class="content-items-img img-responsive" />
          <div class="content-items-title">
            <p class="items-title-p">{{item.name}}</p>
            <p class="items-title-m" @click="clickMore(item.path,item.tag)">查看详情</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.main-box{
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.content-box{
  padding: 10px;
  background: #fff;
}
.content-col-box{
  padding: 10px;
  position: relative;
}
  .content-items{
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
  .content-items-img{
    width: 100%;
    height: 100%;
  }
  .content-items-title{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 5%;
  }
  .content-items-title>p{
    display: inline-block;
    margin: 10px;
  }
  .items-title-p{
    font-size: 26px;
    font-weight: 600;
    color: #0b7969;
  }
  .items-title-m{
    width: 130px;
    height: 38px;
    background:#0b7969;
    color: #fff;
    border-radius: 20px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
  }
    /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .main-box{
      width: 900px;
    }
    .content-box{
      padding: 5px;
    }
    .content-col-box{
      padding: 5px;
    }
    .items-title-p{
      font-size: 22px;
    }
    .items-title-m{
      font-size: 14px;
      width: 100px;
      height: 30px;
      background:#0b7969;
      color: #fff;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      contentItems:[
        {name:'西医知识库',path:'/XyRepositoryPage',tag:'xyzsk',image:'/home/icon_xyzsk.png'},
        {name:'西医CDSS',path:'/WesternMedicineCdss',tag:'xycdss',image:'/home/icon_xycdss.png'},
        {name:'中医知识库',path:'/ZyRepositoryPage',tag:'zyzsk',image:'/home/icon_zyzsk.png'},
        {name:'智能问答',path:'/QAhome',tag:'znwd',image:'/home/icon_znwd.png'}
      ]
    }
  },
  mounted(){

  },
  methods:{
    clickMore(p,t){
      let that = this;
      let path = p;
      let tag = t;
      // 新页面打开
      let newUrl = this.$router.resolve({
        path,
        query:{
          tag,
        }
      });
      window.open(newUrl.href, "_blank");
    }
  }
}
</script>
