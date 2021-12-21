<template>
   <div class="content-box">
     <div class="inside-content-box" id="inside-content-box">
       <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>视频</el-breadcrumb-item>
          <el-breadcrumb-item>列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-row style="padding-top:20px;">
          <div class="main_left2">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">
              <li>
                <a href="javascript:0;" title="人工智能NLP自然语言处理实战课程" @click="gotoVideo('https://video.pearvideo.com/mp4/adshort/20200715/cont-1685978-15265163_adpkg-ad_hd.mp4')">
                  <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                  <div class="list_title">
                    <h2>人工智能NLP自然语言处理实战课程</h2>
                    <p class="relainfo">
                      <img src="" alt="" class="likeNum"/>34
                    </p>
                  </div>
                </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">
              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">

              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">

              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">
              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">

              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" class="col-box">

              <li>
                  <a href="" target="_blank" title="人工智能NLP自然语言处理实战课程">
                      <img src="/Uploads/video/202112/1639881888/m_2021121902.jpg" alt="" />
                      <div class="list_title">
                          <h2>人工智能NLP自然语言处理实战课程</h2>
                          <p class="relainfo">
                              <img src="" alt="" class="likeNum"/>
                              34
                          </p>
                      </div>
                  </a>
              </li>
            </el-col>
          </div>
          <!-- <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty> -->
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
    float: left;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .main_left2 li {
    width: 100%;
    height: auto;
    display: block;
    float: left;
    margin: 0 5px;
    margin-bottom: 20px;
    border: solid 1px #CDCDCD;
    background-color: #F6F6F6;
  }
  .main_left2 li img {
    width: 100%;
    height: 160px;
    display: block;
    float: left;
    padding-bottom: 0px;
}
.main_left2 li .list_title {
    width: 100%;
    height: auto;
    display: block;
    float: left;
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
</style>
<script>
import {getHomeRightList} from '@/api/data'
  export default {
    inject: ['setsickNess'],
    data() {
      return {
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
        this.getHomeRightList();
    },
    mounted(){
    },
    updated() {
     },
    methods:{
      gotoVideo(s){
        console.log(s)
      // 新页面打开
        let newUrl = this.$router.resolve({
          path: "/VideoDetails",
          query:{
            src:s
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
      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;

      },
      // 获取科室下列表
      getHomeRightList(){
        let that = this;
        let pearms = {
          'pn': that.current_page
        }
        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        getHomeRightList(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            that.total = res.data.data.count;
            that.getListInfo= getListInfo;
          }else if(res.data.code == 1){
            that.$message.error({
                message: res.data.msg,
            });
            return
          }else{
            that.$message.error({
                message: res.data.msg
            });
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
