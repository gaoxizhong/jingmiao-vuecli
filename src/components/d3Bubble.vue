<template>
  <div style="width:100%;height:100%;overflow: hidden;">
    <svg
      id="svg"
      :width="initWidth"
      :height="initHeight"
    ></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'd3bubble',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          nodes: [],
          yData: [],
        }
      }
    },
  },
  data () {
    return {
      viewHeight:'',
      viewWidth:'',
      initWidth: 420,
      initHeight: 440,
      svgDom: null, // svg的DOM元素 => d3.select('#svg1')
      nodes: [],
      yData: [],
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

  },
  mounted () {
    this.d3init();
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
      _this.yData = _this.data.yData;
      _this.nodes = _this.data.nodes;
      let yData = _this.yData;
      let nodes = _this.nodes;
      let yData1 = yData.reverse();
      for (let j = 0;j<=yData1.length;j++ ){
        for(let i = 0;i<nodes.length;i++ ){
          let year = nodes[i].year
          if(year == yData1[j]){
            nodes[i].y = (j+1)*60 + (Math.round(Math.random()*30) -15)
          }
        }
      }
      // 渲染前清空svg内的元素
      _this.svgDom.selectAll('*').remove();
      var initWidth = _this.initWidth;
      var initHeight = _this.initHeight;
      var padding = {
            left: 44,
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
            .attr("transform", "translate(" + "0 ,-20" + ")")
            .call(yAxis);

          //添加x轴坐标轴

          // //x轴比例尺
          var xData = [20,70,140,210,280]
          var xScale = d3.scaleBand().rangeRound([0, initWidth]).padding(1)
          .domain(xData.map(function(d) {
              return d;
            }))
          //定义x轴
          var xAxis = d3.axisBottom(xScale)

          //添加x轴
          svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + "0," + initHeight + ")")
            .call(xAxis);

          d3.selectAll('.domain').remove() // 删除多余的两端刻度线



// ======================================================================


              var xRange = d3.scaleLinear()
                .range([50, 220])
                .domain(xData,function(d){
                  return d;
                });
           var yRange = d3.scaleLinear()
                .range([380,40])
                .domain([d3.min(nodes , function(d) {
                  return d.y;
                }), d3.max(nodes , function(d) {
                  return d.y;
                })]);
// ======================================================================
        //添加颜色
        var colorLinear = d3.scaleLinear()
            .domain(ydata.map(function(d) {
              return d;
            }))
            .range(["#F3A7A7","#84C68B","#A7A8F3","#84BEC6"]);

        var radiusLinear = d3.scaleLinear()
            .domain([d3.min(nodes , function (d) {
                  return d.count; } ),
            d3.max(nodes , function (d) {
                return d.count; })])

        //添加circle包裹层，有几种类型添加几个
        var cover = svg.append("g")
          //添加circle
          cover.selectAll("circle")
            .data(nodes)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr("cx", function(d) {
              return xRange(d.x)
            })
            .attr("cy", function(d) {
              return yRange(d.y)
            })
            .attr("r", function(d) {
              // var a =  Math.round(Math.random()*20) + 15
                // d.r = a
                // return a
                return d.r
            })
            .attr("fill", function(d) {
              return colorLinear(d.year)
            })
            // .attr("opacity", function () {
            //   let num = Math.round(Math.random() * (1 - 0) + 0) + 0.8;
            //   return num;
            // })
            .on("mouseover", function(d) {
              let self = this;
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") * 1.1)
                return false
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") / 1.1)
                return false
            })
          .on("click", nodeClick);
          let texts = svg.selectAll(null)
            .data(nodes)
            .enter()
            .append('text')

            .text('')
            .attr('fill','#333')
            .attr("class", "textcla")
            .attr('text-anchor', 'middle')
            .attr("font-size", 10)
            .on("click", nodeClick);
            texts.attr("x", function(d) {
                return xRange(d.x)
              })
              .attr("y", function(d) {
                return yRange(d.y)
              })
              let topY = -4
              let midY = 0
              let botY = 8
            texts.append('tspan')
            .attr("x", function(d) {
                return xRange(d.x)
              })
            .attr("y", function(d) {
                return yRange(d.y) + topY
              })
            .text(function (d) {
              return d.name
            })
            texts.append('tspan')
            .attr("x", function(d) {
                return xRange(d.x)
              })
            .attr("y", function(d) {
                return yRange(d.y) + botY
              })
            .text(function (d) {
              return ('热点值：' + d.count)
            })
            // texts
            // .attr("transform", function(d) {
            //   return "translate(-" + (d.r - 6) + ","+ 0 + ")"
            // })
            // .attr("style", function(d) {
            //   return "width:"+ d.r*2 + "px;"
            // });

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
            let hot_name = d.name;
            // _this.$store.dispatch("hotName",hot_name);
            // console.log(hot_name)
            // console.log(_this.$store.state.hot_name)
            _this.$emit('getData',hot_name)
            return false
          };


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
    #svg .xaxis{
      font-size: 12px;
  }
  // #svg .textcla{
  //   transform: translate(-10px,-10px);
  // }
</style>
