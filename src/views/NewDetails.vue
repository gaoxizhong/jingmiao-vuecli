<template>
  <!-- <el-container :style="`height:${viewHeight}px;`"> -->
  <el-container>

    <!-- 头部开始 -->
    <el-header>
      <CommonHeader :tag_pages="tag_pages"></CommonHeader>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主题开始 -->
    <el-main :style="main_bg">
      <div class="pagecontent-box">
      <!-- 疾病属性分类展示模块开始 -->
        <div class="diseaseAttributes-box">

          <div class="diseaseAttributes-title">
            <span>{{name}} -- <span style="color:#FA6400;font-size:15px;">{{properties_name}}</span></span>
            <a href="javascript:0;" class="cktp-span">查看图谱</a>
          </div>
          
          <div class="dabutes-c-box">
            <div class="dabutes-centent-box">
              <!-- 属性模块展示开始 -->
              <div class="dabutes-items-box">
                <div class="chapter" v-for="(item,index) in dabutes" :key="index">
                  <div class="chapter-title">{{item.name}}</div>
                  <div class="chapter-li-box" v-if="item.DiseaseCategoryProperties.length > 0">
                    <a href="javascript:0;" class="chapter-li-a" :class="(li_index == index && a_idx == idx) ? 'chapterA-active' :'' "
                    v-for="(items,idx) in item.DiseaseCategoryProperties" 
                    :key="idx" 
                    @click="clickDiseaseCategoryProperties(index,idx,items.property_ch_name,items.property_zh_name)"
                    >{{items.property_zh_name}}</a>
                  </div>
                </div>
              </div>
              <!-- 属性模块展示结束 -->
              <!-- 属性值内容模块开始 -->
              <div></div>
              <!-- 属性值内容模块结束 -->
            </div>

          </div>
        </div>
      <!-- 疾病属性分类展示模块结束 -->
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

<script>
  import CommonHeader from "../components/CommonHeader";
  import CommonFooter from "../components/CommonFooter";
  // import Home from "../components/Home";
  import {getNewDetail,getPropertyDetail} from "@/api/data"
  export default {
    // provide(){
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'NewDetails',
    components: {
      CommonHeader,
      CommonFooter,
      // Home
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        main_bg:{
          backgroundImage:'url(' + require('../assets/image/home/icon_bjt.png') + ')',
          backgroundRepeat:'no-repeat',
          backgroundSize: '100% 100%',
        },
        tag_pages:'',
        is_pages:'',
        name:'',
        dabutes:[], //疾病的属性类数组
        li_index: 0,
        a_idx: 0,
        properties_name:'',
      }
    },
    mounted(){
    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height -200;
      this.viewWidth = getViewportSize.width;
      this.tag_pages = this.$route.query.tag_pages;
      this.name = this.$route.query.name;
      if(this.tag_pages == 'xyzsk'){
        document.title = '西医知识库'
      }
      if(this.tag_pages == 'zyzsk'){
        document.title = '中医知识库'
      }
      this.getNewDetail();
    },

    methods: {
      // setsickNess(){
      //   this.is_view = false;
      //   this.$nextTick(() => {
      //     this.is_view = true
      //     console.log(this.is_view)
      //   })
      // },

      //获取详情页默认展示
      getNewDetail(){
        let that = this;
        let params = {};
        getNewDetail(params).then(res =>{
          if(res.data.code == 0){
            let dabutes = res.data.data;
            let li_index= that.li_index;
            let a_idx= that.a_idx;
            let property_zh_name = dabutes[li_index].DiseaseCategoryProperties[a_idx].property_zh_name;
            let property_ch_name = dabutes[li_index].DiseaseCategoryProperties[a_idx].property_ch_name;
            that.dabutes = dabutes;
            that.clickDiseaseCategoryProperties(li_index,a_idx,property_ch_name,property_zh_name);
          }
        }).catch( e =>{
          console.log(e)
        })
      },
      // 点击上面属性名称请求下方属性详情
      clickDiseaseCategoryProperties(i,ix,ch,zh){
        let that = this;
        let index = i;
        let idx = ix;
        let property_zh_name = zh;
        this.properties_name = property_zh_name;
        this.li_index = index;
        this.a_idx = idx;
        let params = {
          name: that.name,
          property_zh_name,
          property_ch_name: ch,
        }
        getPropertyDetail(params).then(res =>{
          if(res.data.code == 0){

          }
        }).catch(e =>{
          console.log(e)
        })
      }

    },
  }
</script>
<style lang="scss" scoped>
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    margin: 10px 0;
  }
  .diseaseAttributes-box{
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #20C3A7;
    overflow: hidden;
  }
 .diseaseAttributes-title{
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to bottom, #EEFFFA, #fff);
    font-size: 16px;
    text-align: left;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #bdbdbd;
  } 
  .dabutes-c-box{
    width: 100%;
    padding: 0 10px;
  }
  .dabutes-centent-box{
    padding: 10px 0;
    width: 100%;  
    height: auto;
    overflow-x: auto;
  }
  .dabutes-items-box{
    width: auto;
    display: flex;
  }
  .chapter{
    width: 126px;
    height: auto;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-left: 10px;
  }
  .chapter-title{
    width: 126px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    background: #AFE1D3;
    border-radius: 7px;
  }
  .chapter-li-box{
    margin-top: 10px;
    width: 100%;
    height: auto;
    background: #afe1d32e;
    border-radius: 0px 0px 7px 7px;
    text-align: center;
    padding: 4px 0;
  }
  .chapter-li-box>a{
    display: inline-block;
    width: 100%;
    font-size: 15px;
    padding: 4px 6px;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .chapter-li-a:hover{
    color: #FA6400;
  }
  .cktp-span:hover{
    color: #20C3A7;
  }
  .chapterA-active{
    color: #FA6400;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 
    .diseaseAttributes-title{
      height: 40px;
      line-height: 40px;
    }
    .chapter{
      width: 108px;
    }
    .chapter-title{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
    }
    .chapter-li-box>a{
      font-size: 13px;
    }
    
  }
</style>
