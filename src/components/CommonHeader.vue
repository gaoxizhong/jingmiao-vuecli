<template>
  <div>
    <header>
      <el-row class="content-box">
        <el-col :span="24" class="content-col-box">
          <div class="l-content">
            <div class="l-content-title">菁苗健康</div>
            <span class="l-content-title-span">{{tag_name}}</span>
          </div>

          <div class="header-input-box" v-if="tag_name">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </div>

          <div class="r-content" v-if="phone">
            <span class="r-phone" v-if=" !tag_name || tag_name == '' ">{{ phone }}</span>
            <div class="r-toLogin" @click="toLogin"><img src="../assets/image/tui-icon.png" alt="" /> 退出</div>
          </div>
        </el-col>
      </el-row>
    </header>
    <!-- 导航分类模块 -->
    <div class="nav-center-box" v-if="tag_name">
      <div class="navitems-box">
        <div class="navitems navitems-active">{{tag_name}}</div>
        <!-- <div class="navitems">中医知识库</div> -->
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
  height: 80px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.navitems.navitems-active{
  background: #325296;
}
/* 媒体查询 */
@media only screen and (max-width: 1366px){
  header{
    height: 60px;
  }
  .content-box{
    width: 970px;
  }
  .navitems-box{
    width: 970px;
  }
  .l-content-title{
    font-size: 24px;
  }
  .header-input-box{
    width: 320px;
    height: 30px;
  }
  .header-input-box >>> .el-input__inner{
    height: 32px;
    line-height: 30px;
  }
  .header-input-box >>> .el-button{ 
    padding: 8px 20px;
  }
}
</style>
<script>
export default {
  props:{
    tag_pages: String,
  },
  data() {
    return {
      phone:'',
      tag_name:'',
    }
  },
  created(){
 
  },
  mounted(){
    let phone = window.localStorage.getItem('setUser');
    this.phone = phone;
    let tag_name = '';
    if(this.tag_pages == 'xyzsk'){
      tag_name = '西医知识库';
    }
    if(this.tag_pages == 'zyzsk'){
      tag_name = '中医知识库';
    }
    this.tag_name = tag_name;
  },
  methods:{
    toLogin(){
      this.$router.push({name: 'Login'});
    },
  }
}
</script>
