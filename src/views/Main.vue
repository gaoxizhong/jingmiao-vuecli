<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container >
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <el-main>
        <CommonSujectList v-if="is_list"></CommonSujectList>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonSujectList from "../components/CommonSujectList"

export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    CommonSujectList
  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_list: false
    }
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },
}
</script>
<style lang="scss" scoped>
  .el-header{
    background: #29bbff;
  }
  .el-container{
    background: #f7f7f7;
    height: 100%;
  }
</style>
