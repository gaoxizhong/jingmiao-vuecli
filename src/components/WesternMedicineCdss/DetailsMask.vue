<template>
  <div>
    <div class="yp-position-mask"></div>
    <div class="yp-position-box">
      <div class="col-left-title">
        <p>{{ name_1 }}</p>
      </div>
      <div class="close-box" @click="ypxqclick_close">
        <i class="el-icon-circle-close"></i>
      </div>
      <div class="yp-position-nbox" :class="is_nofr ?'':'is-nofr'" id="scrollBox">
        <div class="yp-info-box applications-content">
          <div class="activi-1">
            <div v-for="(item, index) in getinfo" :key="index" class="do-jump">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-text" v-if="item.tag != '' && item.is_list == 1">
                <!-- <a class="item-text-a" @click="medicine_click(item.tag,items.kgid?items.name:items,items.kgid?items.kgid:'')" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</a> -->
                <span class="item-text-a" v-for="(items, index) in item.text" :key="index">{{ items.kgid ? items.name : items }}</span>
              </div>
              <div class="item-text" style="white-space:pre-line" v-html='item.text ? item.text : "暂无数据"' v-else></div>
            </div>
          </div>
          <div v-if="getinfo.length <= 0">暂无数据</div>
        </div>
      </div>
      <div class="fr" v-if="is_nofr">
        <div class="src-components-PushItems-DetailsModal-N686B">
          <div class="src-components-PushItems-DetailsModal-24j2q">
            <div class="src-components-PushItems-DetailsModal-1SgDc">
              <div class="src-components-PushItems-DetailsModal-31MMP" v-for="(item, index) in getinfo" :key="item.id" @click="jump(index)">
                <div>
                  <span class="src-components-PushItems-DetailsModal-2NyER" :class="[index===activeMenu?'active':'']">
                    <div class="src-components-PushItems-DetailsModal-3KPN8">
                      <img v-if="index===activeMenu" class="src-components-PushItems-DetailsModal-1xqmn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAb0lEQVQoU2O0nn9xK8P//14MxABGxv+MDAxrWBj44g4kKv5A1sJoPe/Cf2LMQNHEyLiThYEvANkwsgwCGcqIZhjZBqEbRpFBYO8yMc45mqCfSrFBjIyMs48k6qdRZBByOJFtEFUCG90QcMBTK0ECANYqQAtl57OTAAAAAElFTkSuQmCC" alt="" />
                      <span v-else class="src-components-PushItems-DetailsModal-2Fz4c"></span>
                    </div>
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.yp-position-nbox{
  position: relative; 
}
.fr{
  position: absolute;
  top: 60px;
  right: 20px;
  width: 200px;
  height: 80%;
  overflow: hidden;
}
.src-components-PushItems-DetailsModal-N686B {
  width: 240px;
  height: 100%;
  overflow-y: auto;
}
.src-components-PushItems-DetailsModal-24j2q {
  background: #F5F6F7;
  border: 1px solid #F5F6F7;
  width: 200px;
  padding: 15px 20px;
  height: 100%;
}
.src-components-PushItems-DetailsModal-1SgDc {
  border-left: 2px solid #E0E2E3;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.src-components-PushItems-DetailsModal-31MMP {
  padding: 0 4px 0 20px;
  position: relative;
  text-align: left;
  flex: 1;
}
.src-components-PushItems-DetailsModal-2NyER {
  position: relative;
  color: #777777;
  font-size: 14px;
  cursor: pointer;
  line-height: 19px;
}
.src-components-PushItems-DetailsModal-2NyER.active{
  color: #3b9ed0;
}
.src-components-PushItems-DetailsModal-3KPN8 {
  display: inline-block;
  position: absolute;
  left: -25px;
  background: #F5F6F7;
}
.src-components-PushItems-DetailsModal-2Fz4c {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #E0E2E3;
  margin-right: 10px;
}
.src-components-PushItems-DetailsModal-1xqmn {
  position: relative;
  z-index: 20;
  left: -3px;
  top: 0;
}
.src-components-PushItems-DetailsModal-29LoG img {
  max-width: 100%;
}
/* 媒体查询 */
@media only screen and (max-width: 1366px){

}  

</style>
<script>
export default {
  props:{
    name_1:String,
    getinfo: Array,
    is_nofr: Boolean
  },
  data() {
    return {
      activeMenu: 0,
      scrollBox:'',
    }
  },
  mounted(){
    let that = this;
    // 获取滚动dom元素
     that.scrollBox = document.getElementById('scrollBox')
     const jump = $('.do-jump');
     const topArr = [];
     for (let i = 0; i < jump.length; i++) {
      topArr.push(jump.eq(i).position().top)
     }
     // 监听dom元素的scroll事件
    //  that.scrollBox.addEventListener('scroll', () => {
    //   const current_offset_top = that.scrollBox.scrollTop;
    //   for (let i = 0; i < topArr.length; i++) {
    //     if (current_offset_top <= (topArr[i] + 20)) { // 根据滚动距离判断应该滚动到第几个导航的位置
    //       that.activeMenu = i
    //       break
    //     }
    //   }
    // }, true)
  },
  created(){
  },
  methods:{
    // 点击查看详情弹窗关闭按钮
    ypxqclick_close() {
      this.$emit('ypxqclick_close');
    },
    jump(i){
      let that = this;
      that.activeMenu = i; // 当前导航
      let jump = $('.do-jump').eq(i);
      let jumpTop = jump.position().top;
      let scrollBoxTop = that.scrollBox.scrollTop;
      // ==========================================
      let scrollTop = 0;
      if(scrollBoxTop < jumpTop){
         scrollTop = jumpTop + scrollBoxTop;
      }else{
         scrollTop = jumpTop;
      }
      // ==========================================

      // let scrollTop = jumpTop + scrollBoxTop;
      // Chrome
      that.scrollBox.scrollTo({
        top: scrollTop,
        behavior: 'smooth' // 平滑滚动
      })
    }
  }
}
</script>
