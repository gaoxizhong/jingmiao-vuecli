<template>
  <div class="content-box">
    <div class="back-box">
      <a href="#" class="box2-span" @click="fanhui_btn()">
        <img src="../assets/image/fan-left.png" alt /> 返回
      </a>
    </div>
    <div class="info-box" :style="`height:${viewHeight - 130}px;`">
      <div class="info-box1">
        <div class="info-box2">
          <div class="infoDetail-title">{{infoDetail.title}}</div>
          <div class="tap-top-span">
            <span v-for="(items,index) in infoDetail.author" :key="index">{{items.name?items.name:''}}</span>
          </div>
          <div class="info-box3">
            <div>
              <div class="info-box3-title">摘要:</div>
              <div class="info-box3-text">{{ infoDetail.abstract }}</div>
            </div>
            <div style="padding:2px 0;">
              <div class="info-box3-title">关键词:</div>
              <div class="info-box3-text icon-info-keys">
                <span v-for="(keys,index) in infoDetail.keyword" :key="index">{{keys}}</span>
              </div>
            </div>
            <div>
              <div class="info-box3-title">期刊:</div>
              <div class="info-box3-text">{{ infoDetail.publishMagazine }}</div>
            </div>
          </div>
          <!-- 参考文献 -->
          <div class="daohang-box">
            <div class="daohang-tags">
              <a href="javascript:0;" :class="tagspane == 1 ?'active':''" @click="clickSpan(1)">参考文献</a>
              <a href="javascript:0;" :class="tagspane == 2 ?'active':''" @click="clickSpan(2)">引证文献</a>
            </div>
            <div class="tagspane-box" v-if="tagspane == 1">
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>
              <div>我是参考文献</div>

            </div>
            <div class="tagspane-box" v-if="tagspane == 2">
              <div>我是引证文献</div>
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
.tap-top-span>span{
    margin: 0 12px;
    color: #5578F0;
}
.infoDetail-title{
  font-size: 30px;
  font-weight: bold;
  line-height: 46px;
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
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  color: #707070;
  opacity: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
</style>
<script>
import { getDetail } from "@/api/data";
export default {
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      title: "",
      tag: "",
      tagspane: 1
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
    // 参考印证切换
    clickSpan(tab){
      this.tagspane = tab;
    },
    // handleClick(tab, event) {
    //     console.log(tab, event);
    // },
    // 返回上一步
    fanhui_btn() {
      this.$router.go(-1);
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
      getDetail(pearms)
        .then(res => {
          loading.close();
          if (res.data.code == 0) {
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

