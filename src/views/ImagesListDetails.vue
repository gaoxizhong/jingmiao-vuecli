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
          <div class="guide_text">
            <div class="text_title_box">
              <h2 class="text_title">{{infoDetail.title?infoDetail.title:'无'}}</h2>
            </div>
            <div class="guide_info_list">
              <div class="one_info clearfix">
                <label>英文标题：</label>
                <p>{{infoDetail.enTitle?infoDetail.enTitle:'无'}}</p>
              </div>
              <div class="one_info clearfix">
                <label>中文摘要：</label>
                <div id="all_content">
                  <p v-html="infoDetail.abstract_trans?infoDetail.abstract_trans:'无'"></p>
                </div>
              </div>
              <div class="one_info clearfix" style="margin-top:4px;">
                <label>英文摘要：</label>
                <div id="all_content">
                  <p v-html="infoDetail.abstract?infoDetail.abstract:'无'"></p>
                </div>
              </div>
              <div class="one_info clearfix">
                <label>数据来源：</label>
                <p>{{infoDetail.source?infoDetail.source:'无'}}</p>
              </div>
              <div class="one_info clearfix">
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者：</label>
                <p>{{infoDetail.constitutor?infoDetail.constitutor:'无'}}</p>
              </div>
              <div class="one_info clearfix">
                <label>发布日期：</label>
                <p>{{infoDetail.year?infoDetail.year:'无'}}</p>
              </div>
              <div class="asub-box">
                <a :href="infoDetail.full_text_url?infoDetail.full_text_url:'javascript:0;'" :target="infoDetail.full_text_url?'_blank':''" :class="infoDetail.full_text_url?'asub-zaixian':'no-zaixian'"  @click.stop="goTofullText($event,infoDetail.full_text_url)"><i class="el-icon-reading"></i>原文链接</a>
                <a :href="infoDetail.onlineRead?infoDetail.onlineRead:'javascript:0;'" :class="infoDetail.onlineRead?'asub-zaixian':'no-zaixian'" :target="infoDetail.onlineRead?'_blank':''" @click.stop="goToyuedu($event,infoDetail.onlineRead)"><i class="el-icon-reading"></i>pdf在线阅读</a>
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

.info-box {
  width: 100%;
  padding: 10px;
}
.guide_text{
  padding-top: 6px;
  text-align: left;
}
.text_title_box{
  display: flex;
  align-items: center;
}
.text_title {
  flex: 1;
  font-size: 16px;
  font-family: "微软雅黑";
  line-height: 20px;
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
  color: #313131;
  font-weight: bold;
  text-align: center;
}
  .guide_info_list.cool {
    height: 50px;
    overflow: hidden;
  }
  .clearfix {
    display: flex;
  }
  .one_info {
    margin-bottom: 2px;
    overflow: hidden;
  }
  .asub-box {
    width: 100%;
    padding: 8px 0;
  }
  .one_info label {
    width: auto;
    font-size: 14px;
    font-weight: bold;
    text-align: right;
    float: left;
    padding-right: 10px;
  }
  .one_info p {
    flex: 1;
    line-height: 20px;
    float: left;
    margin-top: 2px;
    font-size: 14px;
    color: #626262;
  }
  .one_info #all_content{
    flex: 1;
  }
  .asub-zaixian {
    color: #20C3A7;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
  }
  .asub-zaixian .el-icon-reading {
    margin-right: 4px;
  }
  .asub-zaixian:hover{
    color: #fa6400;
  }
  .no-zaixian{
    color: #777777;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
    cursor: not-allowed;
  }

</style>
<style scoped>
 @media only screen and (max-width: 1390px){
  .zaixian {
    padding: 6px;
    font-size: 12px;
    margin: 6px 0;
    width: 78px;
  }
  .item-title{
    font-size: 17px;
    line-height: 25px;
    margin: 6px 0;
  }
  .el-icon-reading {
    margin-right: 0px;
  }
  .item-center-box{
    margin:4px 0;
  }
}
</style>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
import { getImagesListDetails } from "@/api/data";
export default {
  components: {
    CommonHeader,
    CommonFooter,
  },
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      title: "",
      tag: "",
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
    this.title = this.$route.query.name; //接受参数关键代码
    this.tag = this.$route.query.tag;
    this.tag_pages = this.$route.query.tag_pages;
    this.main_bg = this.$root.main_bg;  // 背景图
    this.id = Number(this.$route.query.id);
    // document.title = this.$route.query.name;
    this.getDetail(this.title);
  },
  methods: {
    // 点击原文链接
    goTofullText(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        return
      }
    },
    // 点击在线阅读
    goToyuedu(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        return
      }
    },
    // 获取详情
    getDetail(name) {
      let that = this;
      let title = name;
      let pearms = {
        img_name:title,
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector("body")
      });
      that.infoDetail = {};
      getImagesListDetails(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            document.title = res.data.data.title;
            that.infoDetail = res.data.data;
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

