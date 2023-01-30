<template>
  <div style="width:100%;height:100%;">
    <!-- <svg id="svg1" :width="initWidth" :height="initHeight" /> -->
    <svg id="svg1" width="100%" height="100%" />
  </div>
</template>

<script>
// import { getd3Atlas } from "../api/data";
import * as d3 from "d3";
export default {
  name: "d3Atlas",
  props:{
    data: {
      type: Object,
      default: function () {
        return {
          nodes: [],
          links: [],
        }
      }
    },
    labels: Array,
    is_cdss: String,
    width: Number,
    height:Number,
  },
  data() {
    return {
      initWidth: 0,
      initHeight: 0,
      viewHeight: "",
      viewWidth: "",
      svgDom: null, // svg的DOM元素 => d3.select('#svg1')
      nodes: [],
      links: [],
      colors: [
        "#55cccc",
        "#aaaaff",
        "#4e88af",
        "#ca635f",
        "#FFC0CB",
        "#BA55D3",
        "#1E90FF",
        "#7FFFD4"
      ],
      states: [],
    };
  },
  computed: {

    isShowNode: function() {
      // `this` 指向 vm 实例
      return this.nodeState === 0;
    },
    isShowText: function() {
      // `this` 指向 vm 实例
      return this.textState === 0;
    }
  },
  watch: {
    // 当请求到新的数据时，重新渲染
    data(newData, oldData) {
      // console.log(newData, oldData);
      // 移除svg和元素注册事件，防止内存泄漏
      this.svgDom.on(".", null);
      this.svgDom.selectAll("*").on(".", null);
      this.d3init();
    }
  },
  created() {
    let that = this;
    let getViewportSize = this.$getViewportSize();
    that.viewHeight = getViewportSize.height;
    that.viewWidth = getViewportSize.width;
    that.initWidth = that.width;
    that.initHeight = that.height;
  },
  mounted() {
    this.d3init();
  },
  beforeDestroy() {
    // 移除svg和元素注册事件，防止内存泄漏
    this.svgDom.on(".", null);
    this.svgDom.selectAll("*").on(".", null);
  },
  methods: {
    // d3初始化，包括数据解析、数据渲染
    d3init() {
      this.links = this.data.links;
      this.nodes = this.data.nodes;
      this.svgDom = d3.select("#svg1"); // 获取svg的DOM元素
      // this.d3jsonParser(this.graph)
      this.d3render();
      // 数据状态初始化
      this.stateInit();
    },
    // 数据状态初始化
    stateInit() {
      this.nodeState = 0;
      this.textState = 0;
      // console.log(this.names)
      this.states = Array(this.labels.length).fill("on");
    },
    d3render() {
      var _this = this; // 临时获取Vue实例，避免与d3的this指针冲突
      _this.nodes = _this.data.nodes.filter(node => {
        if (node.data_type === "is_show") return false;
        return true;
      });
      _this.links = _this.data.links.filter(node => {
        if (node.data_type === "is_show") return false;
        return true;
      });
      // 渲染前清空svg内的元素
      _this.svgDom.selectAll("*").remove();
      // svg.selectAll('g').remove()

      var svg = _this.svgDom
        // 给画布绑定zoom事件（缩放、平移）
        .call(
          d3.zoom().on("zoom", event => {
            // console.log(event)
            var scale = event.transform.k,
              translate = [event.transform.x, event.transform.y];
            svg.attr(
              "transform",
              "translate(" +
                translate[0] +
                ", " +
                translate[1] +
                ") scale(" +
                scale +
                ")"
            );
          })
        )
        .append("g")
        .attr("width", "100%")
        .attr("height", "100%");

      this.addMarkers();

      // 定义碰撞检测模型
      var forceCollide = d3
        .forceCollide()
        .radius(d => {
          return 16 * 3;
        })
        .iterations(0.15)
        .strength(0.75);

      // 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
      var simulation = d3
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3.forceLink().id(d => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-100))
        // .force("center", d3.forceCenter(width / 2, height / 2)
        .force(
          "center",
          d3.forceCenter(
            svg.node().parentElement.clientWidth / 2,
            svg.node().parentElement.clientHeight / 2
          )
        )
        .force("collision", forceCollide);

      // D3映射数据至HTML中
      // g用于绘制所有边,selectALL选中所有的line,并绑定数据data(graph.links),enter().append("line")添加元素
      // 数据驱动文档,设置边的粗细
      var link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.links)
        .enter()
        .append("line")
        .attr("stroke-width", function(d) {
          // 每次访问links的一项数据
          return 2; //所有线宽度均为2
        })
        .join("path")
        .attr("marker-end", "url(#posMarker)");

      var linksName = svg
        .append("g")
        .attr("class", "linkTexts")
        .selectAll("text")
        .data(this.links)
        .join("text")
        .style("text-anchor", "middle")
        .style("fill", "#fff")
        .style("font-size", "12px")
        // .style('font-weight', 'bold')
        .text(d =>
          d.properties.name.text ? d.properties.name.text : d.properties.name
        );

      // 添加所有的点
      // selectAll("circle")选中所有的圆并绑定数据,圆的直径为d.size
      // 再定义圆的填充色,同样数据驱动样式,圆没有描边,圆的名字为d.id
      // call()函数：拖动函数,当拖动开始绑定dragstarted函数，拖动进行和拖动结束也绑定函数
      var node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("circle")
        .attr("r", function(d) {
          // 每次访问nodes的一项数据
          // console.log(d)
          let size = 14;
          switch (d.label) {
            case _this.labels[0]:
              break;
            case _this.labels[1]:
              size = 13;
              break;
            case _this.labels[2]:
              size = 12;
              break;
            default:
              size = 12;
              break;
          }
          return size * 2;
        })
        .attr("fill", d => {
          for (let i = 0; i < this.labels.length; i++) {
            if (d.label === this.labels[i]) {
              return this.colors[i];
            }
          }
        })
        .attr("stroke", "none")
        .attr("name", d =>
          d.properties.name.text ? d.properties.name.text : d.properties.name
        )
        .attr("id", d => d.id)
        .call(this.drag(simulation))
        .on("click", nodeClick)
        .on("mouseleave", event => {});
      // 设置大小、填充颜色、名字、text()设置文本
      // 使用 attr("text-anchor", "middle")设置文本居中
      var text = svg
        .append("g")
        .attr("class", "texts")
        .selectAll("text")
        .data(this.nodes)
        .enter()
        .append("text")
        .attr("font-size", () => 12)
        .attr("fill", () => "#fff")
        .attr("name", d =>
          d.properties.name.text ? d.properties.name.text : d.properties.name
        )
        .attr("text-anchor", "middle")
        .attr("x", function(d) {
          return textBreaking(
            d3.select(this),
            d.properties.name.text ? d.properties.name.text : d.properties.name
          );
        })
        .call(this.drag(simulation))
        .on("click", nodeClick)
        .on("mouseleave", event => {});

      // 圆增加title
      node
        .append("title")
        .text(d =>
          d.properties.name.text ? d.properties.name.text : d.properties.name
        );

      // simulation中ticked数据初始化并生成图形
      simulation.on("tick", ticked);

      simulation
        .force("link")
        .links(this.links)
        .distance(d => {
          // 每一边的长度
          let distance = 20;
          switch (d.source.label) {
            case _this.labels[0]:
              distance += 25;
              break;
            case _this.labels[1]:
              distance += 22;
              break;
            case _this.labels[2]:
              distance += 20;
              break;
            default:
              distance += 20;
              break;
          }
          switch (d.target.label) {
            case _this.labels[0]:
              distance += 30;
              break;
            case _this.labels[1]:
              distance += 25;
              break;
            case _this.labels[2]:
              distance += 22;
              break;
            default:
              distance += 20;
              break;
          }
          return distance * 2;
        });

      /******************************************
       * 内部功能函数
       * 包括：ticked、文本分隔、节点和文本的点击事件
       */
      // ticked()函数确定link线的起始点x、y坐标 node确定中心点 文本通过translate平移变化
      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        linksName.attr("transform", d => {
          let x =
            Math.min(d.source.x, d.target.x) +
            Math.abs(d.source.x - d.target.x) / 2;
          let y =
            Math.min(d.source.y, d.target.y) +
            Math.abs(d.source.y - d.target.y) / 2 -
            1;
          // tanA = a / b
          // A = arctan(tanA)
          let tanA =
            Math.abs(d.source.y - d.target.y) /
            Math.abs(d.source.x - d.target.x);
          let angle = (Math.atan(tanA) / Math.PI) * 180;
          // let angle = Math.atan2(1,1)/Math.PI*180
          // console.log(angle)
          // 第一、二象限额外处理
          if (d.source.x > d.target.x) {
            // 第二象限
            if (d.source.y <= d.target.y) {
              angle = -angle;
            }
            // else {  // 第三象限
            //   angle = angle
            // }
          } else if (d.source.y > d.target.y) {
            // 第一象限
            angle = -angle;
          }
          return "translate(" + x + "," + y + ")" + "rotate(" + angle + ")";
        });

        node.attr("cx", d => d.x).attr("cy", d => d.y);

        text.attr("transform", function(d) {
          let size = 14;
          switch (d.label) {
            case _this.labels[0]:
              break;
            case _this.labels[1]:
              size = 14;
              break;
            case _this.labels[2]:
              size = 13;
              break;
            default:
              size = 12;
              break;
          }
          size -= 5;
          return (
            "translate(" + (d.x - size / 2 + 3) + "," + (d.y + size / 2) + ")"
          );
        });
      }

      /**
       * 文本分隔（根据字数在当前选择器中分隔三行，超过10字省略）
       * @method textBreaking
       * @param {d3text} 文本对应的DOM对象
       * @param {text} 节点名称的文本值
       * @return {void}
       */
      function textBreaking(d3text, text) {
        const len = text.length;
        if (len <= 3) {
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", 2)
            .text(text);
        } else {
          const topText = text.substring(0, 3);
          const midText = text.substring(3, 7);
          let botText = text.substring(7, len);
          let topY = -16;
          let midY = 0;
          let botY = 16;
          if (len <= 7) {
            topY += 10;
            midY += 10;
          } else if (len > 10) {
            botText = text.substring(7, 9) + "...";
          }

          d3text.text("");
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", topY)
            .text(function() {
              return topText;
            });
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", midY)
            .text(function() {
              return midText;
            });
          d3text
            .append("tspan")
            .attr("x", 0)
            .attr("y", botY)
            .text(function() {
              return botText;
            });
        }
      }
      function nodeClick(event, d) {
        // 直接通过this.selectNodeData拿到节点信息
        event.cancelBubble = true;
        event.stopPropagation(); // 阻止事件冒泡

        const name = _this.selectNodeData.name;
        _this.isNodeClicked = true;

        return false;
      }
    },
    drag(simulation) {
      function dragsubject(event) {
        return simulation.find(event.x, event.y);
      }

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        // 注释以下代码，使拖动结束后固定节点
        // event.subject.fx = null;
        // event.subject.fy = null;
      }

      return d3
        .drag()
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
    // 绘制关系箭头
    addMarkers() {
      // 定义箭头的标识
      var defs = this.svgDom.append("defs");
      const posMarker = defs
        .append("marker")
        .attr("id", "posMarker")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 31)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", "#e0cac1")
        .attr("stroke-opacity", 0.6);
      const posActMarker = defs
        .append("marker")
        .attr("id", "posActMarker")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 31)
        .attr("refY", 0)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", "#1E90FF")
        .attr("stroke-opacity", 0.6);
    },
  }
};
</script>

<style lang="scss">
$opacity: 0.15; /* 显示的不透明度 */
$activeColor: #1e90ff; /* 激活的颜色 */
svg {
  margin: 4px 0px;
}
/*设置节点及边的样式*/
.links line {
  stroke: #e0cac1b2; // #bbb
  stroke-opacity: 1;
  &.inactive {
    opacity: $opacity;
  }
  &.active {
    stroke: $activeColor;
    stroke-width: 1px;
  }
  &.hide {
    display: none !important;
  }
}
.nodes circle {
  // stroke: #000;
  // stroke-width: 1.5px;
  &.fixed {
    stroke: #ffc0cb; // #888;
    stroke-width: 14px;
    stroke-opacity: $opacity + 0.3;
    border: 10px #000 solid;
  }
  &.inactive {
    opacity: $opacity;
  }
  &.active {
    stroke: $activeColor;
    stroke-width: 4px;
  }
  &:hover {
    cursor: pointer;
  }
  &.hide {
    display: none !important;
  }
  &.abcxde {
    background: red !important;
  }
}
.texts text {
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
  &.inactive {
    opacity: $opacity;
  }
}
.linkTexts text {
  stroke: #333; // #bbb
  stroke-opacity: 1;
  &.active {
    stroke: $activeColor;
  }
  &.abcxde {
    background: red;
  }
  &.inactive {
    opacity: $opacity;
  }
}
</style>
<style lang="scss" scoped>
// @media only screen and (max-width: 1125px){
//   #info, #mode {
//     display: none !important;
//   }
// }
.font-sky {
  font-size: 18px;
  color: #034c6a !important;
}
#indicator {
  position: absolute;
  // left: 50px;
  // bottom: 30px;
  left: 1.5vw;
  bottom: 2vw;
  text-align: left;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  & > div {
    margin-bottom: 4px;
  }
  span {
    display: inline-block;
    width: 32px;
    height: 16px;
    position: relative;
    top: 2px;
    margin-right: 8px;
  }
}
/*mode选项样式*/
#mode {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 10px;
  left: 10px;
  width: 160px;
  .gState span {
    display: inline-block;
    border: 1px solid #fff;
    color: #409eff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 14px;
    transition: color, background-color 0.3s;
    -o-transition: color, background-color 0.3s;
    -ms-transition: color, background-color 0.3s;
    -moz-transition: color, background-color 0.3s;
    -webkit-transition: color, background-color 0.3s;
    ~ .active,
    ~ :hover {
      background-color: #409eff;
      color: #fff;
      cursor: pointer;
    }
    ~ .active1 {
      display: none;
    }
  }
  .gState span.active,
  .gState span:hover {
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
  }
}
/*悬浮节点的info样式*/
#info {
  position: absolute;
  bottom: 40px;
  right: 30px;
  width: 270px;
  .node-card {
    border: 1px solid #9faecf;
    background-color: #00aeff6b;
    color: #fff;
    text-align: left;
    // transition: background-color;
    // transition-delay: .3s;
    // transition-timing-function: ease;
    .el-card__header {
      border-bottom: 1px solid #50596d;
    }
  }
}
</style>
