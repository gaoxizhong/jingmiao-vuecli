<template>
  <footer>
    <el-row class="content-box">
      <el-col :span="24" class="content-col-box">
        <div>footer</div>
      </el-col>
    </el-row>
  </footer>
</template>

<style scoped>
footer{
  width:100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333333;
  color: #fff;
}
.content-box{
  width: 1200px;
}
.content-col-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
export default {
  data() {
    return {
      phone:''
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>
