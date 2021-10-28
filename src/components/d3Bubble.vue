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
      yData: [],
      nodes:[],
      links: []
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
    nodes (newData, oldData) {
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
            top: 10,
            right: 0,
            bottom: 30
          }
      // var height = initWidth - padding.top - padding.bottom
      // var width = initHeight - padding.left - padding.right
      var svg = _this.svgDom
            .style("padding-left", padding.left)
            // .style("padding-right", padding.right)
            .style("padding-top", padding.top)
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
          var xData = [0,100]
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



// ======================================================================


              var xRange = d3.scaleLinear()
                .range([0, 260])
                .domain(xData,function(d){
                  return d;
                });
           var yRange = d3.scaleLinear()
                .range([360, 60])
                .domain([d3.min(_this.nodes , function(d) {
                  return d.year;
                }), d3.max(_this.nodes , function(d) {
                  return d.year;
                })]);
// ======================================================================
        //添加颜色
        var colorLinear = d3.scaleLinear()
            .domain([d3.min(_this.nodes , function (d) {
            				  return Number(d.year); } ),
                    d3.max(_this.nodes , function (d) {
                    	 return Number(d.year); })])
            .range(["#95E3E4","#F3A7A7","#A7A8F3","#5578f0"]);
 
        var radiusLinear = d3.scaleLinear()
            .domain([d3.min(_this.nodes , function (d) {
                  return d.count; } ),
            d3.max(_this.nodes , function (d) {
                return d.count; })])

        //添加circle包裹层，有几种类型添加几个
        var cover = svg.append("g")
          //添加circle
          cover.selectAll("circle")
            .data(_this.nodes)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr("cx", function(d) {
              return xRange(d.x)
            })
            .attr("cy", function(d) {
              return yRange(d.year) + Math.round(Math.random()*60) -30
            })
            .attr("r", function(d) {
                return Math.round(Math.random()*10) + 20
            })
            .attr("fill", function(d) {
              return colorLinear(d.year)
            })
            .attr("opacity", function () {
              let num = Math.round(Math.random() * (1 - 0) + 0) + 0.8;
              return num;
            })
            .on("mouseover", function(d) {
              let self = this;
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") * 1.1)
              showtext.text(function() {
                  return d.name
                })
                .attr("text-anchor", "middle")
                .attr("fill", "#666")

                return false
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") / 1.1)
                showtext.text("")
                return false
            })
            .on("click", nodeClick)
          // 添加文字
            // .append("text")
            // .attr("font-size", 12)
            // .style("fill", "#fff")
            // .style("text-anchor", "middle")
            // .text(function (d) {
            //   return d.name;
            // });
          function nodeClick(event, d) {
            event.cancelBubble = true
            event.stopPropagation() // 阻止事件冒

            return false
          }
          //添加左侧提示部分包裹层
          let detail = cover.append("g")
          let showtext = svg.append("text")
            .text("")
            .attr("font-size", '14px')

    },
    // 获取文献气泡图数据
   async getDochots(){
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
    await getDochots(pearms).then( res =>{
      loading.close();
      if(res.data.code == 0){
        let data = res.data.data;
        let nodes = []; // 节点
        let yData = [];  // 年份
        data.forEach(el => {
          yData.push(el.year)
          for(let i = 0; i<el.hots.length; i++){
            nodes.push({
              x: (i+1)*20,
              name: el.hots[i].name,
              year: el.year,
              count: el.hots[i].count
            })
          }
        });

        that.nodes = nodes;
        that.yData = yData.reverse();
        that.d3init();
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
