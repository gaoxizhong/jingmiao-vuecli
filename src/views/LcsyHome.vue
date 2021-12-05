<template>
  <div class="content-box">
    <div class="inside-content-box" id="inside-content-box">
      <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in crumbs" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="12" :offset="5">
          <div class="el-input-box el-col">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-select class="el-select-box" v-model="select" slot="prepend" @change="searchDownChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getInputBtn()" style=" padding: 12px 30px;"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="content-box1">
        <div class="content-box1-left">
            <div class="paddingSide15">
              <template>
                <el-table :data="tableData" border stripe style="width: 100%;"  @row-click="rowClick">
                  <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
                  <el-table-column prop="date" label="发布年份"></el-table-column>
                  <el-table-column prop="name" label="路径名称"></el-table-column>
                  <el-table-column prop="address" label="发布单位"></el-table-column>
                </el-table>
              </template>
            </div>
            <el-empty description="暂无数据"  v-if='!tableData || tableData.length == 0'></el-empty>
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
import {getLitgSearch} from '@/api/data'
export default {
  name: 'LcsyHome',
    data(){
      return{
        search:'',
        select: '请选择',
        select_name:'',
        selectSearchChange:'',
        options:[{label:'数据1',value:'document'},{label:'数据2',value:'guide'}],
        getListInfo:[],
        current_page:1,
        pageSize: 10,
        count:0,
        tag: '',
        is_show:false,
        is_Atlas:false,
        crumbs:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    active(){
      console.log('active')
    },
    created(){
        let crumbs =  this.$store.state.crumbsarr;
        this.crumbs = crumbs;
        console.log(crumbs)
        // this.select_name = this.$route.query.name;
        this.tag = this.$route.query.tag;
        this.setsickNess();
        // 获取列表
        this.getHomeRightList();
        window.localStorage.setItem('is_details',0);
    },
    methods:{
      indexMethod(index) {
        return index + 1;
      },
      rowClick(e){
        console.log(e)
        let name = e.name;
        // let tag = that.tag;
        this.setsickNess();
        this.$router.push({  //核心语句
          path:'/LcsyDetails',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            name,
            // tag,
          }
        })
      },
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        console.log(that.current_page)
        that.getHomeRightList();
      },
      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getInputBtn();
        }
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        //  if(that.selectSearchChange == ''){
        //   this.$message.error({
        //       message: '请先选择类型',
        //   });
        //   return
        // }
        // if(that.search == ''){
        //   this.$message.error({
        //       message: '请填写内容',
        //   });
        //   return
        // }
        that.current_page = 1;
        that.getHomeRightList();
      },
      // 点击列表
      getarticle(_name){
        let that = this;
        let name = _name;
        let tag = that.tag;
        if(tag == 'guide'){
          return
        }else{
          this.$router.push({  //核心语句
            path:'/litgDetails',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
              type:'lg'
            }
          })
        }

      },
      // 获取列表
       getHomeRightList(){
        let that = this;
        let pearms = {
            tag: that.tag,
            pn: that.current_page,
          }
        that.getListInfo = [];
        getLitgSearch(pearms).then( res =>{
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
            console.log(e)
        })
      },

      searchDownChange(e){
        console.log(e)
        this.selectSearchChange = e;
      },
    setsickNess(){
        this.is_show = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
            this.is_show = true
        })
    },

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
  .pagination-box{
    padding: 30px 0;
  }
  .content-box{
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
    width: 420px;
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
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .paddingSide15 {
    padding: 0 15px;
  }
  .searchTable {
    border: 0px #dedede solid;
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    margin-bottom: 15px;
  }
  .searchTable tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  .el-table >>> .el-table__cell{
    text-align: center !important;
    cursor: pointer;
  }
  .el-table >>> .el-table__cell:hover{
    color: #026ae0;
  }
  .el-table >>> th.el-table__cell.is-leaf{
    background: #edf3ff !important;
  }

</style>
