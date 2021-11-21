<template>
  <div class="content-box">
    <div class="back-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in crumbs" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <a href="#" class="box2-span" @click="fanhui_btn()">
          <img src="../assets/image/fan-left.png" alt /> 返回
        </a>
      </div>
    </div>
    <div class="info-box" :style="`height:${viewHeight - 140}px;`">
      <div class="info-box1">
        <div class="info-box2">
          <div class="infoDetail-title">{{infoDetail.title}}</div>
          <div class="tap-top-span">
            <a href="javascript:0;" v-for="(items,index) in infoDetail.author" :key="index" @click.prevent="goToauthor(items.kgid)">{{items.name?items.name:''}}</a>
          </div>
          <div class="info-box3">
            <div>
              <div class="info-box3-title">摘要:</div>
              <div class="info-box3-text">{{ infoDetail.abstract }}</div>
            </div>
            <div style="padding:2px 0;" v-if="infoDetail.keyword.length > 0">
              <div class="info-box3-title">关键词:</div>
              <div class="info-box3-text icon-info-keys">
                <span v-for="(keys,index) in infoDetail.keyword" :key="index">{{keys}}</span>
              </div>
            </div>
            <div>
              <div class="info-box3-title">期刊:</div>
              <div class="info-box3-text">{{ infoDetail.publishMagazine }}</div>
            </div>
            <!-- <div class="zaixian" @click.stop="goToyuedu(item.id)"><i class="el-icon-reading"></i>在线阅读</div> -->
          </div>
          <!-- 参考文献 -->
          <div class="daohang-box">
            <div class="daohang-tags">
              <a href="javascript:0;" :class="!tagspane?'active':''" @click="clickSpan(1)">参考文献</a>
              <a href="javascript:0;" :class="tagspane?'active':''" @click="clickSpan(2)">引证文献</a>
            </div>
            <div class="tagspane-box" v-if="!tagspane">
              <div v-if="infoDetail.similarDocument && infoDetail.similarDocument.length != 0">
                <a href="javascript:0;" v-for="(auts,index) in infoDetail.similarDocument.titles" :key="index" class="auts1-box" @click="clickAuts(auts)">
                  [{{index+1}}]{{auts}}
                </a>
              </div>
              <div v-else>暂无信息...</div>
            </div>
            <div class="tagspane-box" v-if="tagspane">
              <div v-if="infoDetail.citationDocument && infoDetail.citationDocument.length != 0">
                <a href="javascript:0;" v-for="(auts2,idx) in infoDetail.citationDocument.titles" :key="idx" class="auts2-box" @click="clickAuts(auts2)">
                  [{{idx+1}}]{{auts2}}
                </a>
              </div>
              <div v-else>暂无信息...</div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;
}
.tap-top-span>a{
    margin: 0 12px;
    color: #5578F0;
}
.tap-top-span>a:hover{
    color: #D54B4B;
}
.infoDetail-title{
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
  color: #333333;
  opacity: 1;
}
.info-box3{
  width: 100%;
  font-size: 16px;
}
.info-box3>div{
  display: flex;
  align-items: flex-start;
}
.info-box3>div .info-box3-title{
  width:auto;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  color: #464646;
  text-align: left;
}
.info-box3>div .info-box3-text{
  padding-left: 20px;
  font-size: 15px;
  font-weight: 500;
  line-height: 30px;
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
.info-box3>div .info-box3-text.icon-info-keys{
  padding-left: 10px;
  margin: 0 10px;
  color: #5578F0;
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
.auts1-box,.auts2-box{
  display: block;
  padding: 6px 0;
  color: #333333;
}
.auts1-box:hover,.auts2-box:hover{
  color: #D54B4B;
}
/* .info-box3>div.zaixian{
    padding: 9px;
    color: #5578F0;
    border: 1px solid #5578F0;
    font-size: 14px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    align-items: center;
}
.el-icon-reading{
    margin-right: 6px;
} */
</style>
<style scoped>
 @media only screen and (max-width: 1390px){
  /* .info-box3 > div.zaixian {
    padding: 6px;
    font-size: 12px;
    margin: 6px 0;
    width: 78px;
  }
  .el-icon-reading {
    margin-right: 0px;
  } */
}
</style>

<script>
import { getDocDetail } from "@/api/data";
export default {
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      title: "",
      tag: "",
      tagspane: false,
      crumbs:[]
    };
  },
  created() {
    //生命周期里接收参数
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.title = this.$route.query.name; //接受参数关键代码
    this.tag = this.$route.query.tag;
    this.getDetail(this.title);
  },
  methods: {

    // 点击在线阅读
    goToyuedu(name){
      let that = this;
       that.$message.error({
          message: '暂无数据'
        });
    },
    clickAuts(name){
      let auts_text = name;
      this.$message.error({
        message: '暂无数据...'
      });
    },
      // 点击作者
      goToauthor(_kgid){
          let kgid = _kgid;
          let tag = tag;
          this.$router.push({  //核心语句
              path:'/authorDetails',   //跳转的路径
              query:{
                  kgid,
                  tag,
              }
          })
      },
    // 参考印证切换
    clickSpan(tab){
      let is_tab = tab;
      if(is_tab == 1){
        this.tagspane = false;
      }else{
        this.tagspane = true;
      }
    },

    // 返回上一步
    fanhui_btn() {
      let crumbs = this.crumbs;
      crumbs.pop();
      // this.$router.go(-1);  // ios 不支持
      location.href = "javascript:history.go(-2);"
    },

    // 获取详情
    getDetail(name) {
      let that = this;
      let title = name;
      let pearms = {
        title,
        tag: that.tag
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector("body")
      });
      that.infoDetail = {};
      getDocDetail(pearms)
        .then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.infoDetail = res.data.data;
            let crumbs =  that.$store.state.crumbsarr;
            crumbs.push(res.data.data.title)
            this.crumbs = crumbs;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });
    }
  }
};
</script>

