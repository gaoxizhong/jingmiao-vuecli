<template>
    <el-container :style="`height:${viewHeight}px;`">
        <el-aside>
            <div class="aside-icontitle-box"><i class="el-icon-printer"></i><span style="padding-left:10px;">处置建议</span></div>
            <div class="cjyp-table-box">
               <div class="cjyp-table-th"><div style="color:#53bfb4;text-align:left;flex:1;">常见药品</div><div style="color:#a9acac;text-align:right;width:80px;">说明书</div></div>
               <div class="cjyp-table-tr" v-for="(item,index) in tableData" :key="index">
                   <div class="cjyp-table-tr-l">{{item.address}}</div>
                   <a class="cjyp-table-tr-r" href="javascript:0;">{{item.name}}</a>
               </div>
            </div>
        </el-aside>
        <el-main>Main</el-main>
    </el-container>
</template>
<script>
// import {WesternMedicine} from '@/api/data'
export default {
  provide(){
    return {
      setsickNess: this.setsickNess
    }
  },
  name: 'inquiryResultPage',
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: true,
      is_article: false,
      is_view: true,
      tableData: [{
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }, {
        name: '药品详情',
        address: '胰岛素剂量个体化胰岛素剂量个体化胰岛素剂量个体化'
        }]
    }
  },
  mounted(){
    let that = this;
    //  this.WesternMedicine();
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },

  methods: {
    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
      })
    },

  },
}
</script>
<style lang="scss" scoped>
  .el-aside{
    width: 375px !important;
    position: relative;
    padding: 30px 20px;
    text-align: left;
    font-size: 15px;
  }
  .el-aside::after{
    content: '';
    width:1px;
    height:100%;
    transform: scaleX(0.5);
    background: #a1a1a1;
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-main{
    padding: 20px 36px;
  }
  .aside-icontitle-box{
      padding: 10px 0;
      display: flex;
      align-items: center;
  }
.cjyp-table-th{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #eff9f8;
    margin: 10px 0;
    padding: 0 10px;
}
.cjyp-table-tr{
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
}
.cjyp-table-tr-l{
    flex: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 0 5px;
}
.cjyp-table-tr-r{
    width: 80px;
    color: #53bfb4;
    text-align: right;
    padding: 0 5px;
    font-size: 14px;
    text-decoration:revert;
}
</style>