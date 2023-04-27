<template>
   <div class="content-box">
     <div class="inside-content-box" id="inside-content-box">
      <el-row>
        <el-col :span="12" :offset="5">
          <div class="el-input-box">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-button slot="append" icon="el-icon-search" @click="getInputBtn()" style=" padding: 12px 30px;"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding: 20px 120px 10px 120px;">
          <div class="main_left2">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box" v-for="(item,index) in getListInfo" :key="index">
              <li>
                <a href="javascript:0;" :title="item.title" @click="gotoVideo(item.video_url,item.id)">
                  <!-- <img :src="item.cover_img" alt="" /> -->
                  <div style="width:100%;height:240px;">
                    <video :src="item.video_url" style="object-fit: fill;" width="100%" height="100%" ></video>
                  </div>
                  <div class="list_title">
                    <h2>{{item.title}}</h2>
                    <p class="relainfo">
                     <i class="el-icon-view"></i><span class="relainfo-span">{{item.page_view}}</span>
                    </p>
                  </div>
                </a>
              </li>
            </el-col>
          </div>
          <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
      </el-row>
      <!-- 分页展示 -->
      <div class="pagination-box">
        <el-pagination
          background
           @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page='current_page'>
        </el-pagination>
      </div>

    </div>
   </div>
</template>
<style scoped>
  .inside-content-box{
    padding-top: 20px;
  }
  .gengduo{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 27px;
    color: #5578F0;
    opacity: 1;
    padding-left: 10px;
    cursor: pointer;
  }
  .content-box{
    padding: 30rpx 20prx;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .main_left2 {
    width: 100%;
    height: 100%;
    display: block;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .main_left2 li {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 5px;
    margin-bottom: 20px;
    background-color: #F6F6F6;
  }
   .main_left2 li>a{
     display: inline-block;
     width: 100%;
     height: 100%;
   }
  .main_left2 li>a:hover{
    box-shadow: 1px 2px 2px #00000020;
  }

.main_left2 li .list_title {
    width: 100%;
    height: auto;
    display: block;
}
.main_left2 li .list_title h2, p {
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    padding: 4px 6px;
}
.likeNum {
    width: 16px!important;
    height: 16px!important;
    margin-left: 10px;
    padding-right: 0!important;
}
.col-box{
  padding: 0 5px;
}
.el-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
}
.el-select-box{
  width: auto;
  min-width: 120px;
}
.relainfo-span{
  padding-left:10px;
  font-size:12px;
  color: #a9a9a9;
}
.pagination-box{
  padding: 20px 0;
}
</style>
<script>

import { getVideoList } from '@/api/data'
  export default {
    name: 'VideoHome',
    data() {
      return {
        is_search:true,
        tag_pages:'',
        search:'',
        title:'',
        getListInfo:[],
        hove_index: 0,
        current_page:1,
        total: 0,
        pageSize: 20,
        crumbs:[],
        showFull: [],
      }
    },
    active(){
      console.log('active')
    },
    created(){
      console.log('created')
      this.tag_pages = this.$route.query.tag_pages;
      this.tag = this.$route.query.tag_pages;
      this.id = Number(this.$route.query.id);
      this.getHomeRightList();
    },
    mounted(){
    },
    updated() {
     },
    methods:{
            // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getInputBtn();
        }
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        // if(that.search == ''){
        //   this.$message.error({
        //       message: '请填写内容',
        //   });
        //   return
        // }
        that.current_page = 1;
        that.getHomeRightList();
      },
      gotoVideo(s,v){
        console.log(s)
        console.log(v)

      // 新页面打开
        let newUrl = this.$router.resolve({
          path: "/VideoDetails",
          query:{
            src:s,
            v_id:v
          }
        });
      window.open(newUrl.href, "_blank");
    },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        console.log(that.current_page)
        that.getHomeRightList();
        // 回到顶部的方法。
        window.scrollTo(0,0);
      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;

      },
      // 获取视频列表
      getHomeRightList(){
        let that = this;
        let search = that.search;
        let pearms = {
          'pn': that.current_page
        }
        if(search != '' || search){
          pearms.search = search
        }
        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        getVideoList(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            that.total = res.data.data.count;
            that.getListInfo= getListInfo;
          }
        }).catch(e =>{
            loading.close();
            console.log(e)
        })
      },
    },
    computed: {

    },
  }
</script>
