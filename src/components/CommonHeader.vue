<template>
  <div>
    <header>
      <el-row class="content-box">
        <el-col :span="24" class="content-col-box">
          <div class="l-content">
            <div class="l-content-title">菁苗健康</div>
            <span class="l-content-title-span">{{tag_name}}</span>
          </div>

          <div class="header-input-box" v-if="!is_search">
            <el-input :placeholder="tag_pages == 'xyzsk'?'搜索疾病、药品、检查、临床路径等':'搜索证型、方剂、中药、体质等' " v-model="headerInput" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-button slot="append" @click="headerInputClick" >搜索</el-button>
            </el-input>
          </div>

          <div class="r-content" v-if="phone">
            <!-- <span class="r-phone" v-if=" !tag_name || tag_name == '' ">{{ phone }}</span> -->
            <div class="r-toLogin" @click="toLogin"><img src="../assets/image/tui-icon.png" alt="" /> 退出</div>
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
      </div>
    </div>
    <!-- 导航分类模块 -->

  </div>

</template>

<style scoped>
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
  background: #365AA9;
  color: #fff;
}
.navitems-box{
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
}
.navitems{
  height: 100%;
  padding: 0 14px;
  border-left: 1px solid #4855c7;
}

.navitems>a{
   display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
}
.navitems.navitems-active{
  background: #325296;
}
/* 媒体查询 */
@media only screen and (max-width: 1366px){
  /* .content-box{
    width: 970px;
  }
  .navitems-box{
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
    }
  },
  created(){
      let headerNavItems = [
        {id:1,name:'西医知识库',path:'/RepositoryPage',tag_pages:'xyzsk'},
        {id:2,name:'中医知识库',path:'/RepositoryPage',tag_pages:'zyzsk'},
        {id:3,name:'文献',path:'/DocumentGuidePages',tag_pages:'Document'},
        {id:4,name:'指南',path:'/DocumentGuidePages',tag_pages:'Guide'},
        {id:5,name:'西医CDSS',path:'/WesternMedicineCdss',tag_pages:'xycdss'},
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
      this.$router.push({name: 'Login'});
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
      }else{
        this.nav_id = id;
        this.tag_name = name;
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
