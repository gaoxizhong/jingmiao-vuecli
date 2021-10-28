<template>
  <div style="width:100%;height:100%;overflow: hidden;">
    <svg
      id="svg"
      :width="initWidth"
      :height="initHeight"
    >123</svg>
  </div>
</template>
<!-- this.$emit('getData',tag,name) -->
<script>
import {getDochots} from '../api/data'
import * as d3 from 'd3'
export default {
  name: 'd3bubble',
  props: {
    // data1: Array,
  },
  data () {
    return {
      viewHeight:'',
      viewWidth:'',
      initWidth: 340,
      initHeight: 440,
      svgDom: null, // svg的DOM元素 => d3.select('#svg1')
      yData: [2019,2020,2021,2022],
      links: [],
      data1:[],
      dataset:[
        { x: 69, y: 45, weight: 5 },{ x: 30, y: 37, weight: 10 },
        { x: 43, y: 10, weight: 23 },{ x: 54, y: 48, weight: 41 },
        { x: 18, y: 18, weight: 41 },{ x: 88, y: 21, weight: 32 },
        { x: 45, y: 48, weight: 12 },{ x: 14, y: 32, weight: 9 },
        { x: 78, y: 18, weight: 16 },{ x: 13, y: 45, weight: 32 }
    ]


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
    data1 (newData, oldData) {
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
    // 获取文献气泡图数据
    this.getDochots();
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
      console.log(yData)
      // 渲染前清空svg内的元素
      _this.svgDom.selectAll('*').remove();
      var initWidth = _this.initWidth;
      var initHeight = _this.initHeight;
      var padding = {
            left: 40,
            top: 20,
            right: 0,
            bottom: 30
          }
      // var height = initWidth - padding.top - padding.bottom
      // var width = initHeight - padding.left - padding.right
      var svg = _this.svgDom
            .style("padding-left", padding.left)
            // .style("padding-right", padding.right)
            // .style("padding-top", padding.top)
            // .style("padding-bottom", padding.bottom)
 
          //添加y轴坐标轴
          //y轴比例尺
          var ydata = yData
          var yScale = d3.scaleBand().rangeRound([initHeight, 0]).padding(1)
            .domain(ydata.map(function(d) {
              return d;
            }))
          //定义y轴
          var yAxis = d3.axisLeft(yScale)
          //添加y轴
          svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .call(yAxis);
 
          //添加x轴坐标轴
 
          // //x轴比例尺
          var xData = [0,20,40,60,80,100]
          var xScale = d3.scaleBand().rangeRound([0, initWidth]).padding(1)
          .domain(xData.map(function(d) {
              return d;
            }))
          //定义x轴
          var xAxis = d3.axisBottom(xScale)
 
          //添加x轴
          svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + "0 ," + initHeight + ")")
            .call(xAxis);
 
          d3.selectAll('.domain').remove() // 删除多余的两端刻度线

        var colorLinear = d3.scaleLinear()
            .domain([d3.min(_this.dataset , function (d) {
            				  return Number(1); } ),
                    d3.max(_this.dataset , function (d) {
                    	 return Number(20); })])
            .range(["red", "blue"]);
 
        var radiusLinear = d3.scaleLinear()
            .domain([d3.min(_this.dataset , function (d) {
                  return d.weight; } ),
            d3.max(_this.dataset , function (d) {
                return d.weight; })])

        //添加circle包裹层，有几种类型添加几个
          var cover = svg.append("g")
        //添加circle
          cover.selectAll("circle")
            .data(_this.dataset)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr("cx", function(d) {
              return xScale(d.x)
            })
            .attr("cy", function(d) {
              return yScale(d.y)
            })
            .attr("r", function(d) {
              return d.weight
            })
            .attr("fill", function(d) {
              return 'red'
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") / 1.6)
              showtext.text("")
            })
          //添加左侧提示部分包裹层
          let detail = cover.append("g")
          let showtext = svg.append("text")
            .text("")
            .attr("font-size", '14px')

    },
    // 获取文献气泡图数据
    getDochots(){
    let that = this;
    let pearms = {
      // tag: that.tag,
      // is_search: 'notis',
    }
    const loading = that.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)',
      target:document.querySelector('.bubble-box'),
    });
    getDochots(pearms).then( res =>{
      loading.close();
      if(res.data.code == 0){
        that.data1 = res.data.data;
      }else{
        that.$message.error({
            message: res.data.msg
        });
      }
    }).catch(e =>{
        loading.close();
        console.log(e)
    })
  },
  }
}
</script>

<style lang="scss">
  #svg{
    overflow: overlay;
    font-weight: 600
  }
  #svg .yaxis{
    opacity: 0;
  }
  .bubble{
    position: absolute;
  }
</style>
