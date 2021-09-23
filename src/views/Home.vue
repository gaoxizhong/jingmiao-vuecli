<template>
   <div class="content-box">
     <div class="inside-content-box">
      <div  class="el-input-box">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select class="el-select-box" v-model="select" slot="prepend">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getInputBtn()"></el-button>
        </el-input>
      </div>
      <el-row style="padding-top:20px;">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle(item.id)" :sickNess1='sickNess1'>
            <div class="items-title">{{item.title}}</div>
            <div class="tags-list-box">
              <div class="options-class tags-list-items">临床表现</div>
              <div class="tags-list-items">病因</div>
              <div class="tags-list-items">并发症</div>
              <div class="tags-list-items">辅助检查</div>
              <div class="tags-list-items">诊断</div>
              <div class="tags-list-items">治疗</div>
            </div>
            <div class="tags-list-info">
              按时打卡十九大；是啊；了山东矿机啊；熟练度静安寺的；了静安寺；的氨基酸对啊圣诞节按时；了大口径啊了山东矿机阿斯兰的卡就了的撒；达拉斯雕刻机啊；是的卡萨丁喀什；收到了 阿萨德；阿萨德
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
   </div>
</template>
<style scoped>
  .content-box{
    padding: 30rpx 20prx;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .inside-content-box{
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 30px 0 30px;
  }
  .el-input-box{
    width: 56%;
    margin:0 auto;
  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark{
    padding: 12px;
  }
  .bg-purple-dark:nth-child(odd) {
    background: #f4f4f4;
  }
  .items-title{
    font-size: 16px;
    text-align: left;
    color: #29bbff;
  }
  .tags-list-box{
    width: 100%;
    padding: 12px 0;
    display: flex;
    align-items: center;
  }
  .tags-list-items{
    font-size: 14px;
    padding: 0 8px;
    position: relative;
  }
  .tags-list-items::after{
    content: '';
    width: 1px;
    height: 96%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #dbdbdb;
  }
  .tags-list-items.options-class{
    color: #29bbff;
  }
  .tags-list-info{
    overflow: hidden;
    box-sizing: border-box;
    font-size: 14px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
    line-height: 1.6;
  }
</style>
<script>
  export default {
    props:['datalist'],
    data() {
      return {
        input3:'',
        select: '请选择',
        options:[{label:'疾病',value:1},{label:'药品',value:2}],
        getListInfo:[],
        name:''
      }
    },
    watch:{
      datalist(datalist){
      this.datalist = datalist;
      console.log(datalist)
      }
    },


    created(){
     
    },
    actived(){
        console.log("actived")  
        this.name = this.$route.query.name,  //接受参数关键代码
        console.log(this.name)  

    },
    mounted(){

    },
    methods:{
      getInputBtn(){
        let that = this;
        console.log(that.select)
        console.log(that.input3)
      },
      getarticle(_id){
        let that = this;
        let id = _id;
        that.$store.dispatch("getlist_id",id); // 获取 vuex 储存的状态或变量
        that.$emit('chenglistId',id);
      }
    },
    computed: {
        sickNess() {
          console.log(this.$store.state.sickNess1)
          return this.$store.state.sickNess1
        },
        isCollapse() {
          console.log(this.$store.state.isCollapse)
          return this.$store.state.isCollapse
        }

    }
  }
</script>
