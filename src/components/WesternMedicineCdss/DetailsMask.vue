<template>
  <div>
    <div class="yp-position-mask"></div>
    <div class="yp-position-box">
      <div class="col-left-title">{{ name_1 }}</div>
      <div class="yp-position-nbox">
        <div class="close-box" @click="ypxqclick_close">
          <i class="el-icon-circle-close"></i>
        </div>
        <div class="yp-info-box">
          <div class="activi-1">
            <div v-for="(item, index) in getinfo" :key="index">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-text" v-if="item.tag != '' && item.is_list == 1">
                <!-- <a class="item-text-a" @click="medicine_click(item.tag,items.kgid?items.name:items,items.kgid?items.kgid:'')" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</a> -->
                <span class="item-text-a" v-for="(items, index) in item.text" :key="index">{{ items.kgid ? items.name : items }}</span>
              </div>
              <div class="item-text" style="white-space:pre-line" v-html='item.text ? item.text : "暂无数据"' v-else></div>
              <!-- <div class="item-text">{{item.text?item.text:'暂无数据'}}</div> -->
            </div>
          </div>

          <div v-if="getinfo.length <= 0">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


/* 媒体查询 */
@media only screen and (max-width: 1366px){

}  

</style>
<script>
export default {
  props:{
    name_1:String,
    getinfo: Array,
  },
  data() {
    return {

    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    // 点击查看详情弹窗关闭按钮
    ypxqclick_close() {
      this.$emit('ypxqclick_close');
    },
  }
}
</script>
