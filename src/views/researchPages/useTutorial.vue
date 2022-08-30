<template>
  <div class="pages-b">
    <div class="pages-titlebox">
      <img src="../../assets/image/researchPages/useTutorial-bg1.png" alt="" />
      <img src="../../assets/image/researchPages/useTutorial-bg2.png" alt="" />
      <img src="../../assets/image/researchPages/useTutorial-bg3.png" alt="" />
    </div>
    <div class="pages-itemsbox">
      <div class="pages-items">
        <div class="items-1">
          <p class="items-t">文献探索</p>
          <p class="items-text">免费智能化中英文献检索平台，为广大科研工作者提供科研<br/>服务；可输入关键词、标题、作者等各种样式检索。</p>
          <div class="items-btn" @click="goToMyFavorite('/popularLiterature')">去探索</div>
        </div>
      </div>
      <div class="pages-items">
        <div class="items-2">
          <p class="items-t">学科分析</p>
          <p class="items-text">探究学科知识脉络，展示学科研究情况，<br/>反映学科建设水平</p>
          <div class="items-btn" @click="goToMyFavorite('/subjectAnalysis')">立即分析</div>
        </div>
      </div>
      <div class="pages-items">
        <div class="items-3">
          <p class="items-t">学者分析</p>
          <p class="items-text">统计学者各年发文量、被引频次等，分析学者间合作关系，<br/>揭示其研究热点和趋势</p>
          <div class="items-btn" @click="goToMyFavorite('/scholarAnalysis')">立即分析</div>
        </div>
      </div>
      <div class="pages-items">
        <div class="items-4">
          <p class="items-t">期刊分析</p>
          <p class="items-text">统计期刊出版及被引情况，跟踪影响因子等评价指标变化，<br/>揭示期刊影响力及产出趋势</p>
          <div class="items-btn" @click="goToMyFavorite('/journalAnalysis')">立即分析</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    inject: ['setsickNess'],
    name: 'useTutorial',
    data() {
      return {
        viewHeight: "",
      };
    },
    created() {
      //生命周期里接收参数
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;

    },
    methods: {

      goToMyFavorite(u){
        let path = u;
        this.$emit('setsickNess', '');
        this.$router.push({
          path,
          query:{},
        })
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
  .pages-titlebox{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .pages-titlebox>img{
    width: 25.5rem;
    height: 8.5rem;
  }
  .pages-itemsbox{
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .pages-itemsbox>div.pages-items{
    width: 25.5rem;
    height: 11.25rem;
    background: #fff;
    border-radius: 6px;
    margin-top: 1rem;
    overflow: hidden;
    box-shadow: 0px 2px 9px 0px rgba(227,227,227,0.5);
  }
  .pages-items>div{
    width: 100%;
    height: 100%;
    padding: 1.35rem 0.8rem 0.8rem 1.6rem;
    text-align: left;
  }

  .pages-items .items-1{

    background: url('../../assets/image/researchPages/useTutorial-icon-wxts.png') no-repeat;
    background-size: 6.65rem 6.65rem;
    background-position: 95.2% 80%;
  }
  .pages-items .items-2{
    background: url('../../assets/image/researchPages/useTutorial-icon-xkfx.png') no-repeat;
    background-size: 6.05rem 5.8rem;
    background-position: 95.2% 80%;
  }
  .pages-items .items-3{

    background: url('../../assets/image/researchPages/useTutorial-icon-xzfx.png') no-repeat;
    background-size: 7.95rem 6.35rem;
    background-position: 95.2% 80%;
  }
  .pages-items .items-4{
    background: url('../../assets/image/researchPages/useTutorial-icon-qkfx.png') no-repeat;
    background-size: 6.25rem 6.25rem;
    background-position: 95.2% 80%;
  }
  .items-t{
    font-size: 1rem;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #333333;
    line-height: 1.4rem;
  }
  .items-text{
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1.75rem;
    margin-top: 0.4rem;
  }
  .items-btn{
    margin-top: 0.85rem;
    width: 5.8rem;
    height: 2rem;
    background: #1674CF;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
  }

</style>