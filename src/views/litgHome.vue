<template>
  <div class="content-box">
    <div class="inside-content-box" id="inside-content-box">
        <el-row>
            <el-col :span="13" :offset="5">
                <div class="el-input-box el-col">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getInputBtn()" style="width:80px;"></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div class="content-box1">
            <div class="content-box1-left">
                <div class="title-info-box">
                    <div>1</div>
                    <div style="color:#999;">找到<span style="color:#5578F0;">{{count}}</span>条结果</div>
                </div>
                <a href="javascript:0;" class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index" @click="getarticle(item.title)">
                    <div class="item-title">{{item.title}}</div>
                    <div class="tag-top-box">
                        <div style="padding-right:12px;">[期刊论文]</div>
                        <div class="tap-top-span">
                            <a href="javascript:0;" v-for="(items,index) in item.author" @click.stop="goToauthor(items.kgid)" :key="index">{{items.name?items.name:''}}</a>
                        </div>
                    </div>
                    <div class="item-center-box">{{item.abstract}}</div>
                    <div class="key-box">
                        <span :class="{active: index == 0 }" v-for="(keys,idx) in item.keyword" :key="idx">{{keys}}</span>
                    </div>
                    <div class="zaixian"><i class="el-icon-reading"></i>在线阅读</div>
                </a>
                <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
            </div>
            <div  class="content-box1-right">
                <div>
                  <div class="bubble-box" style="background:#fff5f5;">
                    <d3Bubble :data1="data1" :yData="yData" @getData="medicine_click" />
                  </div>
                  <div style="background:#9ffa9b;">2</div>
                </div>
            </div>
        </div>
              <!-- 分页展示 -->
        <div class="pagination-box">
            <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :total="count"
            :page-size="pageSize"
            :current-page='current_page'>
            </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import d3Bubble from "../components/d3Bubble";
import {getLitgSearch} from '@/api/data'
export default {
  name: 'litgHome',
  components: {
    d3Bubble,
  },
    data(){
      return{
        search:'',
        // select_name:'',
        getListInfo:[],
        current_page:1,
        pageSize: 10,
        active: true,
        count:0,
        data1: {},
        yData: [],
      }
    },
    active(){
      console.log('active')
    },
    created(){
      console.log('created') //接受参数关键代码
        // this.select_name = this.$route.query.name;
        // this.tag = this.$route.query.tag;
        this.tag = 'document';
        this.getHomeRightList();
    },
    methods:{
      medicine_click(){
        console.log(1)
      },
        // 点击作者
        goToauthor(_kgid){
            let that = this;
            let kgid = _kgid;
            let tag = that.tag;
            this.$router.push({  //核心语句
                path:'/authorDetails',   //跳转的路径
                query:{
                    kgid,
                    tag,
                }
            })
            return
        },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        console.log(that.current_page)
        that.getHomeRightList();
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        if(that.search == ''){
          this.$message.error({
              message: '请填写内容',
          });
          return
        }

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        that.current_page = 1;
       getLitgSearch({
          tag: that.tag,
          search: that.search,
          pn: that.current_page,
          is_search: 'is',
       }).then(res =>{
          loading.close();
         if(res.data.code == 0){
           console.log(1)
           this.$message.error({
                message: res.data.data,
            });
            let getListInfo = res.data.data.list;
            that.getListInfo= getListInfo;
            that.count = res.data.data.count;
         }else if(res.data.code == 1){
            this.$message.error({
                message: res.data.msg,
            });
            setTimeout(function(){
               this.$router.push({name: 'Login'});
            },1500)
            return
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            loading.close();
            this.$message.error({
                message: '请求报错！',
            });
            console.log(e)
        })
      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        this.$router.push({  //核心语句
          path:'/litgDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
            tag,
            type:'lg'
          }
        })
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let pearms = {
        //   'tag': that.tag,
          tag: 'document',
          is_search: 'notis',
          pn: that.current_page,
        }
        that.getListInfo = [];
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
          target:document.querySelector('.content-box'),
        });
        getLitgSearch(pearms).then( res =>{
          loading.close();
          if(res.data.code == 0){
            let getListInfo = res.data.data.list;
            that.count = res.data.data.count;
            that.getListInfo= getListInfo;
          }else if(res.data.code == 1){
            that.$message.error({
                message: res.data.msg,
            });
            return
          }else{
            that.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            loading.close();
            console.log(e)
        })
      },

      searchDownChange(e){
        console.log(e)
        this.selectSearchChange = e;
      }
    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
            if(from.path === "/litgHome"){
                document.getElementById('inside-content-box').scrollTop = to.meta.scollTopPosition;
            }
        });
    },
    beforeRouteLeave (to, from, next) {
        if(from.meta.keepAlive){
            from.meta.scollTopPosition = document.getElementById('inside-content-box').scrollTop;
        }
        next();
    }
}
</script>

<style scoped>
    .content-box{
        padding: 30rpx 20prx;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .content-box1{
      display: flex;
      align-items: flex-start;
      padding-top:20px;
      padding-right:20px;
    }
    .content-box1-left{
      flex: 1;
    }
    .content-box1-right{
      width: 340px;
      height: auto;
    }
    .el-col {
        border-radius: 4px;
    }
    .el-input-box{
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .bg-purple-dark{
        padding: 0 10px;
        display: block;
        border-bottom: 1px solid #EDEDED;
    }
    /* a.bg-purple-dark:hover .item-title{
        color: #D54B4B;
    } */
    .title-info-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 10px;
    }
    .item-title{
        width: auto;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 37px;
        color: #333333;
        opacity: 1;
        text-align: left;
        margin: 10px 0;
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; */
    }
    .tag-top-box{
        display: flex;
        align-items: center;
        font-size:14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #777777;
    }
    .tap-top-span{
        display: flex;
        align-items: center;
    }
    .tap-top-span>a{
        margin: 0 7px;
        color: #5578F0;
    }
    .tap-top-span>a:hover{
        color: #D54B4B;
    }
    .item-center-box{
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-align: left;
        color: #707070;
        opacity: 0.8;
        margin: 10px 0;
    }
    .key-box{
        width: 100%;
        padding: 2px 0;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #777777;
        text-decoration: underline;
        opacity: 1;
        display: flex;
        align-items: center;
    }
    .key-box>span{
        padding: 1px 0;
        margin: 0 6px;
    }
    .key-box>span.active{
        color: #D54B4B;
    }
    .zaixian{
        padding: 9px;
        color: #5578F0;
        border: 1px solid #5578F0;
        font-size: 14px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100px;
    }
    .el-icon-reading{
        margin-right: 6px;
    }
    .bubble-box{
      width: 100%;
    }

</style>
