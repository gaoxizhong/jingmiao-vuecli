<template>
  <div class="pages-b">
    <div class="l-titlebox-1">
      <img src="../../assets/image/researchPages/icon-title.png" alt="" />
      <span style="margin-left: 0.5rem;">我收藏的</span>
    </div>
    <!-- 内容 开始 -->
    <div class="contentbox">
      <!-- 左侧模块 开始-->
      <div class="content-left">
        <div class="content-left-1">
          <div class="active">
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
          </div>
          <div>
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
          </div>
          <div>
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
          </div>
          <div>
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
          </div>
          <div>
            <p class="left-items-t">《中国高血压防治指南》在西藏贫困农村推广的现状及现状…</p>
            <p class="left-items-m">任彩萍-卫生职业教育</p>
            <p class="left-items-b">点击量：3</p>
          </div>
        </div>
      </div>
      <!-- 左侧模块 结束-->

      <!-- 右侧 开始-->
      <div class="content-right">

      </div>
      <!-- 右侧 结束-->
    </div>
    <!-- 内容 结束 -->

  </div>

</template>

<script>
  import { getGuideDetail } from "@/api/data";
  export default {
    inject: ['setsickNess'],
    name: 'myFavorite',
    data() {
      return {
        id:'',
        viewHeight: "",
        infoDetail: {},
        title: "",
      };
    },
    created() {

      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;

    },
    methods: {

      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击收藏列表获取详情
      getDetail(i) {
        let that = this;
        let id = i;
        let pearms = {
          id
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.querySelector("body")
        });
        that.infoDetail = {};
        getGuideDetail(pearms).then(res => {
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
      },

      // 点击作者
      goToauthor(n){
        let that = this;
        let name = n;
        // 新页面打开
        this.$router.push({
          path: '',
          query:{
            name,
          }
        });
      },
    }

  };
</script>
<style scoped>
  .pages-b{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .l-titlebox-1{
    height: auto;
  }
  .contentbox{
    flex: 1;
    width: 100%;
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .content-left{
    width: 21rem;
    height: 100%;
    overflow: auto;
  }
  .content-left::-webkit-scrollbar { 
    display: none;
  }
  .content-left-1{
    width: 21rem;
    height: auto;
    padding-top: 0.1rem;
  }
  .content-left-1>div{
    width: 100%;
    height: 6.95rem;
    border-radius: 6px;
    margin-bottom: 0.8rem;
    background: #fff;
    box-shadow: 0px 2px 6px 0px rgba(183,183,183,0.5);
    padding: 1rem 1.2rem 1.2rem 1.2rem;
  }
  .content-left-1>div.active{
    background: #ECF5FF;
  }
  .left-items-t{
    text-align: left;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .left-items-m{
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
    margin-top: 0.9rem;
    text-align: left;
  }
  .left-items-b{
    text-align: right;
    font-size: 0.7rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 1rem;
    margin-top: 0.6rem;
  }
</style>