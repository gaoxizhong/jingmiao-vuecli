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
          <div>{{infoDetail.title}}</div>
          <div class="tap-top-span">
            <span v-for="(items,index) in infoDetail.author">{{items.name?items.name:''}}</span>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content-box {
  padding: 0px 10px;
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
</style>
<script>
import { getDetail } from "@/api/data";
export default {
  data() {
    return {
      viewHeight: "",
      infoDetail: {},
      title: "",
      tag: ""
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
    // 返回上一步
    fanhui_btn() {
      this.$router.go(-1);
    },

    // 获取详情
    async getDetail(name) {
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
        target: document.querySelector(".content-box")
      });
      that.infoDetail = {};
      await getDetail(pearms)
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

