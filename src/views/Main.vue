<template>
  <el-container style="height:100%;">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>主题</el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside"
export default {
  name: 'Main',
  components: {
    CommonAside
  }
}
</script>
<style lang="scss" scoped>
  .el-header{
    background: #29bbff;
  }
  .el-main{
    padding-top: 0;
  }
</style>
