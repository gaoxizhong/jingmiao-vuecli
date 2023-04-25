<template>
  <div class="rightsupport">
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <div slot="reference" class="joinQRcode1">
        <div class="contactMain"></div>
        <div class="contactMain"></div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    created(){
     
    },
    mounted(){
      
    },
    methods:{
    
    },
    computed:{
     
    }

}
</script>

<style scoped>
  .rightsupport {
    width: 100px;
    position: fixed;
    bottom: 20%;
    right: 0;
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
    background: #fff;
  }
  .joinQRcode1{
    display: inline-block;
    padding: 15px;
    position: relative;
  }
  .contactMain {
    display: inline-block;
  }
</style>
