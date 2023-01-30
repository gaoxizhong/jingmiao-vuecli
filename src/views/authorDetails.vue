<template>
  <el-container>
    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :id="`${id}`" :tag_pages="tag_pages" :is_search='is_search'></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
        <div class="info-box">
          <div class="info-box1">
            <div class="info-box2">
              <div class="infoDetail-title">{{infoDetail.name}}</div>
              <div class="tap-top-span">
                <span>{{infoDetail.organization?infoDetail.organization:''}}</span>
              </div>
              <div class="info-box3">
                <div class="info-box3-title">作者关注领域</div>
                <div class="info-box3-text icon-info-keys">
                    <span v-for="(keys,index) in infoDetail.focusField" :key="index">{{keys}}</span>
                </div>
              </div>
              <!-- 参考文献 -->
              <div class="daohang-box">
                <div class="daohang-tags">
                  <a href="javascript:0;" class="active">作者文献</a>
                </div>
                <div class="tagspane-box">
                  <a v-for="(auts,index) in infoDetail.authorDocument" :key="index" class="auts-box" @click="clickAuts(auts)">[{{index+1}}]{{auts}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <!-- 主题结束 -->
    <!-- 底部开始 -->
    <el-footer>
      <CommonFooter></CommonFooter>
    </el-footer>
    <!-- 底部结束 -->
  </el-container>
</template>
<style scoped>
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
    padding: 12px;
  }
.content-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
}
.back-box {
  width: 100%;
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  margin-bottom: 50px;
}
.box2-span {
  width: 80px;
  height: 30px;
  background: #f0f2f5;
  opacity: 1;
  border-radius: 18px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box2-span img {
  width: 10px;
  height: 12px;
  margin-right: 4px;
}
.info-box {
  width: 100%;
  padding: 10px 0;
}
.info-box1 {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.info-box2 {
  height: auto;
  padding-right: 12px;
}
.tap-top-span{
    margin: 10px 0;
    text-align: left;
}
.tap-top-span>span{
    color: #5578F0;
}
.infoDetail-title{
  font-size: 26px;
  font-weight: bold;
  line-height: 46px;
  color: #333333;
  opacity: 1;
  text-align: left;
}
.info-box3{
  width: 100%;
  font-size: 16px;
  margin-top: 40px;
}

.info-box3>div.info-box3-title{
  width:auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 36px;
  color: #464646;
  text-align: left;
}
.info-box3>div.info-box3-text{
  font-size: 16px;
  font-weight: 500;
  color: #707070;
  opacity: 1;
  /* overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; */
  flex: 1;
  text-align: left;
}
.info-box3>div.icon-info-keys{
  padding-right: 10px;
  color: #50699D;
}
.info-box3>div.icon-info-keys span{
    margin: 0 8px;
}
.daohang-box{
  margin-top: 60px;
}
.daohang-tags{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #839BF0;
}
.daohang-tags>a{
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  color: #707070;
  opacity: 1;
  padding: 4px 12px;
}
.daohang-tags>a.active{
  background: #839BF0;
  color: #fff;
}
.tagspane-box{
  text-align: left;
  padding: 10px 0;
  font-size: 15px;
}
.auts-box{
  display: block;
  padding: 6px 0;
  color: #333333;
}
.auts-box:hover{
  color: #D54B4B;
}
</style>
<script>
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
import { getAuthorDetail } from "@/api/data";
export default {
  components: {
    CommonHeader,
    CommonFooter,
  },
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      tag: "",
      kgid:"",
      tagspane: false,
      is_search:true,
      main_bg:{},
      tag_pages:'',
      id: 0,
    };
  },
  created() {
    //生命周期里接收参数
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.kgid = this.$route.query.kgid; //接受参数关键代码
    this.tag = this.$route.query.tag;
    this.tag_pages = this.$route.query.tag_pages;
    this.main_bg = this.$root.main_bg;  // 背景图
    this.id = Number(this.$route.query.id);
    this.getDetail(this.kgid);
  },
  methods: {
    clickAuts(name){
      let auts_text = name;
      this.$message.error({
        message: '暂无数据...'
      });
    },

    // 获取详情
    getDetail(_kgid) {
      let that = this;
      let kgid = _kgid;
      let pearms = {
        kgid,
      };
      that.infoDetail = {};
      getAuthorDetail(pearms)
        .then(res => {
          if (res.data.code == 0) {
            that.infoDetail = res.data.data;
            document.title = res.data.data.name;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

