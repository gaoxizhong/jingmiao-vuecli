<template>
  <div style="width: 100%;">
    chatPDF-chat

  </div>
</template>

<script>
  import { } from "@/api/data"
  export default {
    name: 'chatPDFChat',
    components: {
      
    },
    data(){
      return {
        main_bg:{},
        activeIndex: '',
        uid:'',
      }
    },
    mounted(){

    },
    created(){
      this.activeIndex = this.$route.query.active_id;
      this.uid = window.localStorage.getItem('uid');
      // 获取历史记录
    },

    methods: {

    },
  }
</script>
<style scoped>
  .flex-1 {
    flex: 1;
  }
  .el-container{
    background: #fff;
    height: 100%;
  }
  .el-main{
    background: #F8F8FB;
  }

</style>
<style>
  @media only screen and (max-width: 1390px){

  }
</style>

