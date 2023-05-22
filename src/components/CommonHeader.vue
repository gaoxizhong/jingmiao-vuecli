<template>
  <div>
    <div class="navheader-box">
      <el-row class="content-box">
        <el-col :span="24" class="content-col-box">
          <div class="l-content">
            <div class="l-content-title">菁苗健康</div>
          </div>
          <div class="r-content" v-if="phone">
            <div class="position-relative ms-2 dropdown">
              <a href="javascript:0;">
                <img src="../assets/image/img-user1.png" alt="" class="rounded-circle d-lg-inline-block" @click="clickUserset">
              </a>
            </div>
            <div class="s-top-userset-menu c-floating-box c-font-normal" v-if="is_userset">
              <a href="javascript:;" class="user-menu-item" @click="toLogin">退出登录</a>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 导航分类模块 -->
    <div class="nav-center-box">
      <div class="navitems-box">

        <div class="navitems" :class="active_id == '1'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/textTranslation?active_id=1')">文字翻译</a>
        </div>
        <div class="navitems" :class="active_id == '2'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/xyzskPages?active_id=2')">西医知识库</a>
        </div>
        <div class="navitems" :class="active_id == '3'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/zyzskPages?active_id=3')">中医知识库</a>
        </div>
        <div class="navitems" :class="active_id == '4'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/popularLiterature?active_id=4')">科研探索</a>
        </div>
        <div class="navitems" :class="active_id == '5'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/newQAhome?active_id=5')">智能问答</a>
        </div>
        <!-- <div class="navitems" :class="active_id == '10'?'navitems-active':'' ">
          <a class="navitems-a" href="javascript:0;" @click="clickNavItem('/chatPDF?active_id=10')">chatPDF</a>
        </div> -->
        <div class="navitems" :class="(active_id == '6' || active_id == '7' || active_id == '8' || active_id == '9')?'navitems-active':'' ">
          <el-dropdown  @command="handleCommand">
            <a href="javascript:0;" class="navitems-a el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :class="active_id == '9'?'navitems-active':'' " command="/knowledgeQAhome?active_id=9">人力资源问答</el-dropdown-item>
              <el-dropdown-item :class="active_id == '6'?'navitems-active':'' " command="/WesternMedicineCdss?active_id=6">西医CDSS</el-dropdown-item>
              <el-dropdown-item :class="active_id == '7'?'navitems-active':'' " command="/ImagesList?active_id=7">疾病图像库</el-dropdown-item>
              <el-dropdown-item :class="active_id == '8'?'navitems-active':'' " command="/VideoHome?active_id=8">视频</el-dropdown-item>
              <a class="el-dropdown-menu__item" href="http://121.36.94.218:8000/zh" target="_blank">标注平台前端</a>
              <a class="el-dropdown-menu__item" href="http://121.36.94.218:8000/admin/login/?next=/admin/" target="_blank">标注平台后端</a>
              <a class="el-dropdown-menu__item" href="http://121.36.94.218:10090/disease/ner/predict?sentence=" target="_blank">病历结构化</a>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <a href="javascript:0;" @click="clickNavItem('/newQAhome?active_id=9')">更多</a> -->
        </div>
      </div>
    </div>
    <!-- 导航分类模块 -->

  </div>

</template>


<script>
export default {
  data() {
    return {
      phone:'',
      is_userset: false,
      active_id:'2'
      
    }
  },
  created(){
    let activeIndex = this.$route.query.active_id;
    if(activeIndex){
      this.active_id = activeIndex;
    }
    // this.setCurrentRoute();
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
  // watch: {
  //   $route() {
  //     this.setCurrentRoute();
  //   }
  // },
  methods:{
    //监听到当前路由状态并激活当前菜单
    // setCurrentRoute() {
    //   this.activeIndex = this.$route.path;    
    // },
    // handleSelect(key, keyPath) {
    //   console.log(key)
    //   console.log(keyPath)
    //   this.$emit('clickNav','');
    //   let newUrl = this.$router.resolve({
    //       path: keyPath[0],
    //     });
    //   window.open(newUrl.href, "_blank");
    // },
    handleCommand(command) {
      this.clickNavItem(command);
    },
    clickNavItem(p){
      let path = p;
      let newUrl = this.$router.resolve({
          path,
        });
        window.open(newUrl.href, "_blank");
    },
    toLogin(){
      window.localStorage.setItem('token','')
      this.$router.push({name: 'Login'});
    },

    clickUserset(){
      this.is_userset = !this.is_userset;
    },

    // 点击LOGO
    // clickLogo(){
    //   let newUrl = this.$router.resolve({
    //     path: '/FrontPage',
    //     query:{}
    //   });
    //   window.open(newUrl.href, "_blank");
    // }

  }
}
</script>
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
    border: 1px solid #d7d9e0;
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
  }
  .navheader-box{
    width: 100%;
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
  .navitems-box >>> .el-menu{
    height: 100%;
  }

.navitems-box >>> .el-menu-item ,.navitems-box >>> .el-submenu__title{
  height: 100%;
  line-height: normal;
  display: flex;  
  align-items: center;
  padding: 0 30px !important;
  position: relative;
}
.navitems-box >>> .el-menu-item:after,.navitems-box >>> .el-submenu__title:after{
  content: "";
  width: 1px;
  height: 100%;
  transform: translateX(.5);
  background: rgba(192,234,231,.3764705882352941);
  position: absolute;
  left: 0;
  top: 0;
}
.navitems-box >>> .el-menu--horizontal>.el-submenu{
  height: 100%;
  line-height: normal;
  display: flex;  
  align-items: center;
  padding: 0;
}
.navitems-box >>> .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
  color: #fff;
  margin-top: 0;
  margin-left: 10px;
}

.navitems-box >>> .el-menu--horizontal>.el-menu-item.is-active{
  border: none;
  background: #007658 !important;
}
.navitems-box >>> .el-menu.el-menu--horizontal{
  border: none;
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
.navitems .el-dropdown{
  width: 100%;
  height: 100%;
}
.navitems a.navitems-a{
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
.el-dropdown-menu__item{
  border-bottom:1px solid #c0eae760;
  display: block;
  padding: 0 40px;
}
 .el-dropdown-menu__item:focus,.el-dropdown-menu__item:not(.is-disabled):hover{
  background: #0f7e60;
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
.item-a{
  display: inline-block;
  width: 100%;
  height: 36px;
  text-align: center;
  line-height: 36px;
  color: #333;
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

