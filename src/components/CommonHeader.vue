<template>
  <div>
    <header>
      <el-row class="content-box">
        <el-col :span="24" class="content-col-box">
          <div class="l-content">
            <div class="l-content-title">菁苗健康</div>
            <span class="l-content-title-span">{{tag_name}}</span>
          </div>

          <!-- <div class="header-input-box" v-if="!is_search">
            <el-input :placeholder="tag_pages == 'xyzsk'?'搜索疾病、药品、检查、临床路径等':'搜索证型、方剂、中药、体质等' " v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-button slot="append" @click="headerInputClick" >搜索</el-button>
            </el-input>
          </div> -->

          <div class="r-content" v-if="phone">
            <div class="position-relative ms-2 dropdown">
              <a href="javascript:0;">
                <img src="../assets/image/img-user1.png" alt="" class="rounded-circle d-lg-inline-block" @click="clickUserset">
              </a>
            </div>
            <div class="s-top-userset-menu c-floating-box c-font-normal" v-if="is_userset">
              <!-- <a href="javascript:;" class="user-menu-item">帐号设置</a> -->
              <a href="javascript:;" class="user-menu-item" @click="toLogin">退出登录</a>
            </div>
            <!-- <span class="r-phone" v-if=" !tag_name || tag_name == '' ">{{ phone }}</span> -->
            <!-- <div class="r-toLogin" @click="toLogin"><img src="../assets/image/tui-icon.png" alt="" /> 退出</div> -->
          </div>
        </el-col>
      </el-row>
    </header>
    <!-- 导航分类模块 -->
    <div class="nav-center-box">
      <div class="navitems-box">
        <div class="navitems" :class=" item.id === nav_id?'navitems-active':'' " v-for="(item,index) in contentItems" :key="index">
          <a href="javascript:0;" @click="clickItem_2(item.id,item.name,item.path,item.tag_pages)">{{item.name}}</a>
        </div>
         <div class="navitems">
          <a href="http://121.36.94.218:8000/zh" target="_blank">标注平台前端</a>
        </div>
         <div class="navitems">
          <a href="http://121.36.94.218:8000/admin/login/?next=/admin/" target="_blank">标注平台后端</a>
        </div>
        <div class="navitems">
          <a href="http://121.36.94.218:10090/disease/ner/predict?sentence=" target="_blank">病历结构化</a>
        </div>
      </div>
    </div>
    <!-- 导航分类模块 -->

  </div>

</template>

<style scoped>
.s-top-userset-menu {
  /* display: none; */
  width: auto;
  padding: 8px 10px;
  top: 48px;
  position: absolute;
  right: 10px;
  float: right;
  z-index: 999;
  text-align: left;
}
.c-floating-box {
  background: #fff;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
  -webkit-box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
  -moz-box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
  -o-box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
  border-radius: 6px;
  *border: 1px solid #d7d9e0;
}
.s-top-userset-menu a {
  display: block;
  padding: 5px 10px;
  color: #939393;
  font-size: 15px;
  border-bottom: 1px solid #f2f2f2;
}
.s-top-userset-menu a:hover{
  color: #fa6400;
}
.l-content-title-span{
  font-size: 14px;
  padding-left: 20px;
  margin-top: 15px;
}
.r-phone{
  color: #333333;
}
.r-toLogin{
  width: 80px;
  height: 30px;
  background: #EFEFEF;
  opacity: 1;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7B7B7B;
  font-size: 15px;
  cursor: pointer;
}
.r-toLogin>img{
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
header{
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-box{
  width: 1200px;
}
.content-col-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.l-content-title{
  font-size:34px;
  padding-left:10px;
  color:#00C792;
  font-weight:600;
  font-family: '宋体';
  cursor: pointer;
}

.r-content{
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;
}
.r-content span{
  margin: 0 10px;
}
.header-input-box{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 599px;
  border-radius: 4px;
  margin-right: 30px;
  cursor: pointer;
}
.header-input-box >>> .el-input__inner{
  border: 1px solid #00C792;
  border-radius: 0;
}
.header-input-box >>> .el-button{ 
  background: #00C792;
  color: #fff;
  border: 1px solid #00C792;
  border-radius: 0;
  margin-bottom: -10px
}
.header-input-box-i{
  flex: 1;
  display: flex;
}
.nav-center-box{
  width:100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #008c68;
  color: #c0eae7;
}
.navitems-box{
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
}
.navitems{
  flex: 1;
  height: 100%;
  /* padding: 0 26px; */
  position: relative;
}
.navitems::after{
  content: '';
  width: 1px;
  height: 100%;
  transform: translateX(0.5);
  background: #c0eae760;
  position: absolute;
  left: 0;
  top:0;

}

.navitems>a{
   display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #c0eae7;
}
.navitems.navitems-active{
  background: #0f7e60;
}
.navitems.navitems-active>a{
  color:#fff;
}
.position-relative {
    position: relative!important;
}
.rounded-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%!important;
}
/* 媒体查询 */
@media only screen and (max-width: 1366px){
  .content-box{
    padding: 0 30px;
  }
  /*.navitems-box{
    width: 970px;
  } */
  
  .l-content-title{
    font-size: 24px;
  }
  .header-input-box{
    width: 400px;
    height: 30px;
  }
  .header-input-box >>> .el-input__inner{
    height: 32px;
    line-height: 30px;
  }
  .header-input-box >>> .el-button{ 
    padding: 8px 20px;
    margin-bottom: -5px
  }
  .l-content-title-span{
    margin-top: 10px;
  }
}
</style>
<script>
import {WesternMedicine} from '@/api/data'
export default {
  props:{
    tag_pages: String,
    is_norouter: Number,
    is_search: null,
    id: String
  },
  data() {
    return {
      phone:'',
      tag_name:'',
      headerInput:'',
      contentItems:[],
      nav_id: '',
      is_userset: false
    }
  },
  created(){
      let headerNavItems = [
        {id:1,name:'西医知识库',path:'/SearchPages',tag_pages:'xyzsk'},
        {id:2,name:'中医知识库',path:'/SearchPages',tag_pages:'zyzsk'},
        // {id:3,name:'科研探索',path:'/DocumentGuidePages',tag_pages:'Document'},
        {id:3,name:'科研探索',path:'/popularLiterature',tag_pages:'Document'},
        // {id:4,name:'指南',path:'/DocumentGuidePages',tag_pages:'Guide'},
        {id:5,name:'西医CDSS',path:'/WesternMedicineCdss',tag_pages:'xycdss'},
        {id:7,name:'疾病图像库',path:'/ImagesList',tag_pages:'jbtxk'},
        // {id:8,name:'疾病病例库',path:'/CaseLibrary',tag_pages:'jbblk'},
        {id:6,name:'智能问答',path:'/QAhome',tag_pages:'znwd'},

      ];
      this.nav_id = Number(this.id);
      this.contentItems = headerNavItems;
      let tag_name = '';
      this.contentItems.forEach(element => {
        if(element.id == this.nav_id){
          tag_name = element.name
        }
      });
      this.tag_name = tag_name;
    // ============================================
    // 在页面加载时读取sessionStorage里的状态信息
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    // if (sessionStorage.getItem('headerNavItems')) {
    //   this.$store.dispatch('headerNavItems',JSON.parse(sessionStorage.getItem('headerNavItems') ))
    //   let headerNavItems =  this.$store.state.headerNavItems;
    //   this.nav_id = Number(this.id);
    //   this.contentItems = headerNavItems;
    //   let tag_name = '';
    //   this.contentItems.forEach(element => {
    //     if(element.id == this.nav_id){
    //       tag_name = element.name
    //     }
    //   });
    //   this.tag_name = tag_name;
    // }
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('headerNavItems', JSON.stringify(this.$store.state.headerNavItems))
    // })
    // ============================================
  },
  mounted(){
    let phone = window.localStorage.getItem('setUser');
    this.phone = phone;
  },
  methods:{
    toLogin(){
      window.localStorage.setItem('token','')
      this.$router.push({name: 'Login'});
    },

    clickUserset(){
      this.is_userset = !this.is_userset;
    },
    clickItem_2(i,n,p,t){
      let id = i;
      let name = n;
      let path = p;
      let tag_pages = t;
      if(path == '/WesternMedicineCdss' || path == '/QAhome'){
        // 新页面打开
        let newUrl = this.$router.resolve({
          path,
        });
        window.open(newUrl.href, "_blank");
      }else if(path == '/popularLiterature'){
        this.$router.push({
          path,
        });
      }else{
        // this.nav_id = id;
        // this.tag_name = name;
        this.$emit('sickNess');
        // this.$router.replace({
        //   path,  
        //   query:{
        //     id,
        //     tag_pages,
        //   }
        // })
       let newUrl = this.$router.resolve({
          path,
          query:{
            id,
            tag_pages,
          }
        });
        window.open(newUrl.href, "_blank");
      }
    },





    headerInputClick(){
      let tag_pages = this.tag_pages;
      let id = this.nav_id;
      let input_name = this.headerInput;
      // 新页面打开
      let newUrl = this.$router.resolve({
        path: '/SearchPages',
        query:{
          input_name,
          tag_pages,
          is_search: 1,
          id
        }
      });
      window.open(newUrl.href, "_blank");
    },
    // 点击LOGO
    // clickLogo(){
    //   let newUrl = this.$router.resolve({
    //     path: '/FrontPage',
    //     query:{}
    //   });
    //   window.open(newUrl.href, "_blank");
    // }
    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.headerInputClick();
      }
    },
  }
}
</script>
