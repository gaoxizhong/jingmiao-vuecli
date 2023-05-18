<template>
  <div class="center-box">
    <el-row :gutter="10" class="row-bg" type="flex">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <div class="userinfo-title">个人信息</div>
          <div class="userinfo-imgName">
            <img src="../../assets/image/researchPages/img-user.png" alt="" />
            <span>{{ userInfo.username }}</span>
          </div>
          <div class="num-box">
            <div>{{userInfo.phone}}</div>
            <div>创建时间： {{userInfo.create_time}}</div>
          </div>
          <div class="footer-box">
            <span @click="toLogin">退出</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <div class="userinfo-title">账号设置</div>
          <div class="grid-content-item"></div>
          <div class="grid-content-item">邮箱：<span>{{userInfo.email}}</span></div>
          <div class="grid-content-item">单位名称：<span>{{userInfo.company_name}}</span></div>
          <div class="grid-content-item">部门：<span>{{userInfo.department}}</span></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="grid-content" id="myCollectionList">
          <div class="userinfo-title">我的收藏</div>
          <div class="content-left-1">
            <p  v-for="(item,index) in myCollectionList" :key='index' :title="item.title" @click="clickListItem(index,item.periodical_md5?item.periodical_md5:'',item.uniq_id?item.uniq_id:'')">
              {{item.title}}
            </p >
          </div>
          <div class="pagination-box">
            <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page='page'>
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="grid-content">
          <div class="userinfo-title">检索历史</div>
            <div class="sh-tabscont">
              <el-table :data="historyList"  height="400" stripe style="width: 100%">
                <el-table-column prop="search_desc" label="检索式" align="left" width="">
                  <template slot-scope="scope">
                    <p @click="clickhistoryList(scope.row)" title="点击检索" class="tbale-title">{{scope.row.search_desc}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="search_doc_count" label="检索类型" align="center" width="80">
                  <template slot-scope="scope">
                    <p @click="clickhistoryList(scope.row)" title="" style="cursor: pointer;">{{scope.row.tag == 1?'快速检索':'高级检索'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="search_doc_count" label="检索结果" align="center" width="80">
                  <template slot-scope="scope">
                    <p @click="clickhistoryList(scope.row)" title="点击检索" style="cursor: pointer;">{{scope.row.search_doc_count}}条</p>
                  </template>''
                </el-table-column>
                <el-table-column prop="search_time" label="检索时间" width="80">
                  <template slot-scope="scope">
                    <p @click="clickhistoryList(scope.row)" title="点击检索" style="cursor: pointer;">{{scope.row.search_time}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="70">
                  <template slot-scope="scope">
                    <p class="tbale-p" @click="clickClear(scope.row)">清除</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>
  import { getProfile,getMyCollection,getliteratureHistory,clearHistory } from '@/api/data'
  export default {
    name: 'userCenter',
    data(){
      return{
        phone:'',
        userInfo:{},
        uid:'',
        myCollectionList: [],
        page: 1,
        total_page: 1,
        total: 0,
        pageSize: 10,
        historyList:[], // 历史检索
        options_0:[{label:'AND',value:'and'},{label:'OR',value:'or'},{label:'NOT',value:'not'}],
        options_1:[
          {label:'标题',value:'title'},
          {label:'作者',value:'author'},
          {label:'摘要',value:'abstract'},
          {label:'关键词',value:'keyword'},
          {label:'基金',value:'funds'},
          {label:'参考文献',value:'references'},
          {label:'doi',value:'doi'},
          {label:'期刊',value:'album'},
          {label:'作者单位',value:'organization'},
          {label:'篇名',value:'title_'},
          {label:'第一作者',value:'author_'},
          {label:'通讯作者',value:'author_o'},
          {label:'分类号',value:'number'},
          {label:'文献来源',value:'references_'}
        ],
        options_2:[{label:'精准',value:'term'},{label:'模糊',value:'match'}],
      }
    },
    created(){
      
    },
    mounted(){
      let that = this;
      let uid = window.localStorage.getItem('uid');
      that.uid = uid;
      that.getUserInfo();
      that.getMyCollection();
      that.getliteratureHistory();
    },

    methods: {
      // 个人信息
      getUserInfo(){
        let that = this;
        getProfile({
          uid: that.uid,
          }).then((res) => {
          if (res.data.code == 0) {
            that.userInfo = res.data.data;
          }
        }).catch((e) => {
          console.log(e);
        });
      },

      toLogin(){
        window.localStorage.setItem('token','');
        this.$router.push({name: 'Login'});
      },
      // 获取我的收藏列表
      getMyCollection(){
        let that = this;
        let uid = that.uid;
        let page = that.page;
        let pearms = {
          uid,
          page,
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.1)",
          target: document.getElementById("myCollectionList")
        });
        getMyCollection(pearms).then(res => {
          loading.close();
          if (res.data.code == 0) {
            that.myCollectionList = res.data.data.data;
            that.total_page = res.data.data.total_page;
            that.total = res.data.data.total;
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        })
        .catch(e => {
          loading.close();
          console.log(e);
        });

      },
      // 点击文献列表
      clickListItem(i,p,u){
        let periodical_md5 = p;
        let uniq_id = u;
        // 新页面打开
        this.$router.push({  //核心语句
          path:'/literatureDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            periodical_md5,
            uniq_id
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.page = Number(val);
        that.getMyCollection();
      },
      // 获取历史记录
      getliteratureHistory(){
        let that = this;
        let p = {
          uid: that.uid,
        }
        getliteratureHistory(p).then(res =>{
          if(res.data.code == 0){
            that.historyList = res.data.data?res.data.data:[];
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      // 点击历史记录检索
      clickhistoryList(n){
        let that = this;
        // let date = d;
        let sel_info = n;
        let titleTag = sel_info.tag;
        let obj = {};
        if(titleTag == 1){
          obj.headerInput = sel_info.search_desc;
          obj.advancedCondition = sel_info.content;
        }else{
          let content = sel_info.content;
          let options_0 = that.options_0;
          let options_1 = that.options_1;
          let options_2 = that.options_2;
          content.forEach(ele =>{
            ele.options_0 = options_0;
            ele.options_1 = options_1;
            ele.options_2 = options_2;
          })
          obj.advancedCondition = content;
        }
          
        let userHistory  = JSON.stringify(obj);
        that.$emit('setsickNess', '');
        that.$router.push({
          path:'/popularLiterature', 
          query:{   
            userHistory,  
          }
        })
        return
      },
      // 点击清除历史记录
      clickClear(e){
        const that = this;
        clearHistory({
          uid: e.uid,
          id: e.id,
          tag:'single'
        }).then(res =>{
          if(res.data.code == 0){
            that.$message.success({
              message:'删除成功！',
              duration: 1500,
              onClose(){
                // 获取历史记录
                that.getliteratureHistory();
              }
            });
          }
        }).catch(e =>{
          console.log(e)
        })
      },
    },
  }
</script>


<style scoped>
  .el-main{
    padding-top: 4.5rem;
    padding-right: 1rem;
    overflow: auto;
  }
  .center-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: auto;
    background: #fff;
    box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
    padding: 1rem;
  }
  .grid-content{
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 0.2rem 1rem;
    transition: 0.5s;
    text-align: left;
  }
  .row-bg .el-col{
    padding: 0.5rem;
  }
  .row-bg.el-row{
    flex-wrap: wrap;
  }
  .userinfo-title{
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 1rem 0.2rem;
  }
  .userinfo-imgName{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .userinfo-imgName>img{
    width: 5rem;
    height: 5rem;
    display: inline-block;
  }
  .userinfo-imgName>span{
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: 700;
  }
  .num-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .num-box>div{
    flex: 1;
    font-size: 14px;
  }
  .footer-box{
    width: 100%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .footer-box span{
    color: #ff0000;
    font-size: 15px;
    padding: 0.3rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .footer-box span:hover{
    background: rgb(231, 231, 234);
  }
  .grid-content-item{
    width: 100%;
    font-size: 15px;
    padding: 5px 0;
  }
  .grid-content-item span{
    font-size: 14px;
  }
  .content-left-1{
    width: 100%;
    height: auto;
  } 
  .content-left-1>p{
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: #000;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 4px 0;
    cursor: pointer;
  }
  .content-left-1>p:hover{
    color: #3664D9;
  }
  .el-pagination{
    padding: 12px 0;
    text-align: right;
  }
  .sh-tabscont {
    position: relative;
  }
  .sh-tabscont >>> table tbody tr th::before, .sh-tabscont >>> table tbody tr td::before{
    border: none;
    z-index: -1;
  }
  .sh-tabscont >>> table::before{
    border: none;
  }
  .sh-tabscont >>>.el-table td.el-table__cell,.sh-tabscont >>> .el-table th.el-table__cell.is-leaf{
    border: 0;
    padding: 6px 0;
    border-top: 1px #ebebeb solid;
    line-height: 20px;
    padding: 6px 5px;
    font-size: 0.7rem;
    background: none;
  }
  .sh-tabscont >>> .tbale-p{
    color: #3664D9;
    cursor: pointer;
  }
  .tbale-p:hover{
    color: #3664D9;
  }
  .sh-tabscont >>> .tbale-title{
    text-align: left;
    cursor: pointer;
  }
  .sh-tabscont >>> .tbale-title:hover{
    color: #3664D9;
  }

.sh-tabscont >>> .el-table, .el-table__expanded-cell{
  background: none;
}
.sh-tabscont >>> .el-table tr{
  background: none;
}
</style>
