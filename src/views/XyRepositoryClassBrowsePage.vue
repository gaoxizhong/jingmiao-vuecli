<template>
   <div class="classBrowseContent-box">
     <div class="classBrowse-title">分类浏览</div>
     <div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>

     </div>
   </div>
</template>
<style scoped>
  .classBrowseContent-box{
    width: 1200px;
    height: auto;
    min-height: 500px;
    background: #FFFFFF;
    border-radius: 13px;
    border: 1px solid #20C3A7;
    margin: 10px 0;
    display: flex;
    overflow: hidden;
  }
  .classBrowse-title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to bottom,#EEFFFA,#fff);;
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    color: #20C3A7;

  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
    .classBrowseContent-box{
      width: 900px;
    }
  }
</style>

<script>
// import {getHomeRightList,getSearch} from '@/api/data'
  export default {
    // inject: ['setsickNess'],
    data() {
      return {
        classBrowseList: [],
      }
    },
    active(){
    },
    created(){

    },
    mounted(){
    },
    updated() {
     },
    methods:{

    },
    computed: {

    },
  }
</script>
