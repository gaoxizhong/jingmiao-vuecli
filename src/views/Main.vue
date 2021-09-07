<template>
  <el-container style="height:100%;">
    <el-aside width="auto">左侧</el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>主题</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  components: {}
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
