<template>
  <div style="width:100%;height:100%;">
    <svg
      id="svg"
      width="100%"
      :height="440"
    >123</svg>
  </div>
</template>
<!-- this.$emit('getData',tag,name) -->
<script>
import * as d3 from 'd3'
export default {
  name: 'd3bubble',
  props: {
    data1: {
      type: Object,
    },
  },
  data () {
    return {
      viewHeight:'',
      viewWidth:'',
      svgDom: null, // svg的DOM元素 => d3.select('#svg1')
      yData: [2022,2021,2020,2019],
      links: [],
    }
  },
  computed: {
    isShowNode: function () {
      // `this` 指向 vm 实例
      return this.nodeState === 0
    },
    isShowText: function () {
      // `this` 指向 vm 实例
      return this.textState === 0
    },
  },
  watch: {
    // 当请求到新的数据时，重新渲染
    data (newData, oldData) {
      console.log(newData, oldData)
      // 移除svg和元素注册事件，防止内存泄漏
      this.svgDom.on('.', null)
      this.svgDom.selectAll('*').on('.', null)
      this.d3init()
    }
  },
  created () {
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
  },
  mounted () {
    this.d3init()
  },
  beforeDestroy () {
    // 移除svg和元素注册事件，防止内存泄漏
    this.svgDom.on('.', null)
    this.svgDom.selectAll('*').on('.', null)
  },
  methods: {
    // d3初始化，包括数据解析、数据渲染
    d3init () {
      var _this = this // 临时获取Vue实例，避免与d3的this指针冲突
      _this.svgDom = d3.select('#svg');  // 获取svg的DOM元素
      let yData = _this.yData;

      // 渲染前清空svg内的元素
      _this.svgDom.selectAll('*').remove();


    }
  }
}
</script>

<style lang="scss">

</style>
