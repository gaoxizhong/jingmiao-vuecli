<template>
  <footer>
    <div class="content-box">
      <span>@Copyright 2020.</span>
      <span>北京菁苗健康科技有限公司</span>
      <span>All Rights Reserved.</span>
      <span>京ICP备2021023471号</span>
    </div>
  </footer>
</template>

<style scoped>
footer{
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333333;
  color: #fff;
}
.content-box{
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.content-box span {
  padding: 0px 5px;
}
/* 媒体查询 */
@media only screen and (max-width: 1366px){
  footer{
    height: 36px;
  }
}  

</style>
<script>
export default {
  data() {
    return {
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>
