<template>
  <div style="width:100%;height:100%;">
    <!-- 绘制模式选择 -->
    <div id="mode">
      <div style="color:#444;font-size:15px;padding-right:10px;">关系文字显示</div>
      <div class="gState" style="margin: 6px 0;">
        <el-switch v-model="value" active-value="1" inactive-value="0" @change="changeTextState($event)"></el-switch>
      </div>
    </div>
    <svg
      id="svg"
      width="100%"
      :height="viewHeight - 200"
    ></svg>
    <!-- 绘制图例 -->
  </div>
</template>

<script>
import * as d3 from 'd3'
// import install from '@/plugins/d3-context-menu'
// install(d3)
export default {
  name: 'd3graph',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          tag:'',
          nodes: [],
          links: [],
        }
      }
    },
    /* eslint-disable */
    // 自定义图例（数组保证一一对应）
    // names		图例名称变量制作图标
    // labels		节点的标签名称（与records.json中保证相同）
    // names: {
    //   type: Array
    // },
    labels: Array,
    linkTypes: Array
  },
  data () {
    return {
      value: '1',
      title:'显示节点',
      viewHeight:'',
      viewWidth:'',
      svgDom: null, // svg的DOM元素 => d3.select('#svg1')
      nodeState: 0,
      // 文本状态，表示是否显示文本信息（0：显示/1：不显示）
      textState: 0,
      // d3render()最终展示到页面上的数据（节点隐藏功能）
      nodes: [],
      links: [],
      /* eslint-disable */
      // 自定义图例及颜色（数组保证一一对应）
      // colors		图例颜色（8个颜色）
      // states   图例状态（on：显示 / off：不显示）
      colors: ['#55cccc', '#aaaaff', '#4e88af', '#ca635f','#FFC0CB', '#BA55D3', '#1E90FF', '#7FFFD4'],
      states: [],
      selectNodeData: {}, // 选中节点的详细信息展示
      isNodeClicked: false, // 是否点击（选中）节点
      // 用于位置、大小矫正（暂不使用）
      // svgTranslate: [240, 130],
      // svgScale: 0.5,
      // 右击事件的菜单栏
      menu: [
          {
          id: 1,
          title: '搜索节点',
          action: (elm, d) => {
            console.log(d)
            let name = d.properties.name.text?d.properties.name.text:'';
            let kgid = d.properties.kgid?d.properties.kgid.text:'';
            let tag = d.tag;
            this.$emit('getData',tag,name,kgid)
          }
        },
        {
          id: 2,
          title: '',
          action: (elm, d) => {
            console.log(d)
            let name = d.properties.name.text?d.properties.name.text:'';
            if(d.is_show == '2'){
              d.is_show = '1';
              this.title = '隐藏节点'
              this.nodes.forEach(element => {
                  let id = element.id + '';
                  let b = id.indexOf('-');
                  let c = id.slice(0,b);
                  if (element.label === 'Att' && c == d.id){
                    element.data_type = 'is_show'
                  }
              });
              this.links.forEach(element => {
                  if (element.type === 'att' && element.source.id == d.id){
                    element.data_type = 'is_show'
                  }
              });
            }else{
              d.is_show = '2';
              this.title = '显示节点'
              for( let key in d.properties){
                if(d.properties[key].text != ""){
                  this.data.nodes.push({
                    id: `${d.id}-${key}`,
                    label: 'Att',
                    properties: {
                      'name': d.properties[key].text
                    }
                  })
                  this.data.links.push({
                    source: d.id,
                    target: `${d.id}-${key}`,
                    type: 'att',
                    properties: {
                      'name': d.properties[key].name
                    }
                  })
                }

              }
            }

            // 重新渲染图
            this.d3render()
            // this.stateInit()
          }
        },

      ],
      isEdit: true,
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
      // console.log(newData, oldData)
      // 移除svg和元素注册事件，防止内存泄漏
      this.svgDom.on('.', null)
      this.svgDom.selectAll('*').on('.', null)
      this.d3init();
    }
  },
  created () {
    // this.states = Array(this.names.length).fill('on')
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
    // 注册右击功能
    contextMenu(menu, openCallback) {
      let _this = this;
      let _menu = menu;
      // create the div element that will hold the context menu
      d3.selectAll('.d3-context-menu').data([1])
        .enter()
        .append('div')
        .attr('class', 'd3-context-menu')

      // close menu
      d3.select('body').on('click.d3-context-menu', function () {
        d3.select('.d3-context-menu').style('display', 'none')
      })

      // this gets executed when a contextmenu event occurs
      return function (event, data) {
      event.stopPropagation() // 阻止事件冒泡
        // 指向右键触发的节点
        var elm = this
        if(data.label == 'Att'){
          return
        }else{
        if(data.is_show == '1'){
          _this.title = '显示节点'
        }else{
          _this.title = '隐藏节点'
        }
        _menu.forEach(e =>{
          if(e.id == 2){
            e.title = _this.title
          }
        })
        d3.selectAll('.d3-context-menu').html('')
        var list = d3.selectAll('.d3-context-menu').append('ul')
        list.selectAll('li').data(_menu).enter()
          .append('li')
          .html(function (d) {
            return d.title
          })
          .on('click', function (e, d) {
            // console.log(d)
            d.action(elm, data)
            d3.select('.d3-context-menu').style('display', 'none')
          })

        // the openCallback allows an action to fire before the menu is displayed
        // an example usage would be closing a tooltip
        if (openCallback) openCallback(data)

        // display context menu
        d3.select('.d3-context-menu')
          .style('left', (event.pageX - 2) + 'px')
          .style('top', (event.pageY - 2) + 'px')
          .style('display', 'block')
        event.preventDefault()
        }

      }
    },
    // 隐藏文字
    changeTextState (state) {
      // state发生变化时才进行更新、处理
        this.textState = state
        const text = d3.selectAll('.linkTexts text')
        // 根据新的节点状态，在节点上展示不同的文本信息
        if (this.textState == '0') {
          text.style('display', 'none')
        } else {
          text.style('display', 'block')
        }
    },
    // 隐藏该类型的所有节点（图例）
    hideNodeOfType (event) {
      if (this.nodes.length === this.data.nodes.length
        || this.states.some((state) => state === 'off')) {
        const index = event.target.dataset.index
        const state = event.target.dataset.state
        // 图例的状态切换（对应类型的节点隐藏）
        if (state === 'on') {
          // 隐藏该类型的所有节点及关联关系
          // this.states[index] = 'off'
          this.$set(this.states, index, 'off')
        } else {
          // this.states[index] = 'on'
          this.$set(this.states, index, 'on')
        }
        /**************************************
         * 状态更新后，同时对数据更新
         */
        const indexs = this.states.map(s => {
          if (s === 'on') {
            return '1'
          } else {
            return '0'
          }
        })
        // 遍历删除节点
        this.nodes = this.data.nodes.filter(node => {
          for (let i = 0; i < indexs.length; i++) {
            if (node.label === this.labels[i] && indexs[i] === '0') return false
          }
          return true
        })
        // 遍历删除关系
        this.links = this.data.links.filter(link => {
          for (let i = 0; i < indexs.length; i++) {
            if (i === 0 && indexs[i] === '0') return false
            else if (link.type === this.linkTypes[i] && indexs[i] === '0') return false
          }
          return true
        })
        // 调试时使用
        // console.log(indexs)
        // console.log(this.data.nodes.length, this.data.links.length)
        // console.log(this.nodes.length)
        // console.log(this.links.length)
        // 重新渲染
        this.d3render()
      } else {
        this.$message.error('展示全部节点时才能隐藏图例')
      }
    },
    // d3初始化，包括数据解析、数据渲染
    d3init () {
      this.links = this.data.links
      this.nodes = this.data.nodes
      this.svgDom = d3.select('#svg')  // 获取svg的DOM元素
      // this.d3jsonParser(this.graph)
      this.d3render()
      // 数据状态初始化
      this.stateInit()
    },
    // 数据状态初始化
    stateInit () {
      this.nodeState = 0
      this.textState = 0
      // console.log(this.names)
      this.states = Array(this.labels.length).fill('on')
    },
    d3render () {
      var _this = this // 临时获取Vue实例，避免与d3的this指针冲突

        _this.nodes = _this.data.nodes.filter(node => {
          if (node.data_type === 'is_show') return false
          return true
        })
        _this.links = _this.data.links.filter(node => {
          if (node.data_type === 'is_show') return false
          return true
        })
      // 渲染前清空svg内的元素
      _this.svgDom.selectAll('*').remove()
      // svg.selectAll('g').remove()

      var svg = _this.svgDom
        .on('click', () => {
              d3.select('body').on('click.d3-context-menu', function () {
                d3.select('.d3-context-menu').style('display', 'none')
              })
          // console.log(this.isNodeClicked)
          this.isNodeClicked = false
          // 移除所有样式
          this.clearGraphStyle();
        })
        // 给画布绑定zoom事件（缩放、平移）
        .call(d3.zoom().on('zoom', event => {
          // console.log(event)
          var scale = event.transform.k,
              translate = [event.transform.x, event.transform.y]

          // if (this.svgTranslate) {
          //     translate[0] += this.svgTranslate[0]
          //     translate[1] += this.svgTranslate[1]
          // }

          // if (this.svgScale) {
          //     scale *= this.svgScale
          // }

          svg.attr('transform', 'translate(' + translate[0] + ', ' + translate[1] + ') scale(' + scale + ')');
        }))
        .append('g')
        .attr('width', '100%')
        .attr('height', '100%')

      this.addMarkers()
      // console.log(svg)
      // 动态变化时，不再固定宽高
      // var width = svg.attr("width"),
      //     height = svg.attr("height")

      // 解析json和数据处理
      // 现在解析json直接在d3jsonParser()中更新nodes和links
      // const data = this.d3jsonParser(this.graph)
      // this.links = data.links.map(d => Object.create(d))
      // this.nodes = data.nodes.map(d => Object.create(d))

      // 定义碰撞检测模型
      var forceCollide = d3.forceCollide()
        .radius(d => { return 16 * 3 })
        .iterations(0.15)
        .strength(0.75)

      // 利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
      var simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-100))
        // .force("center", d3.forceCenter(width / 2, height / 2)
        .force("center", d3.forceCenter(svg.node().parentElement.clientWidth / 2, svg.node().parentElement.clientHeight / 2))
        .force("collision", forceCollide)

      // D3映射数据至HTML中
      // g用于绘制所有边,selectALL选中所有的line,并绑定数据data(graph.links),enter().append("line")添加元素
      // 数据驱动文档,设置边的粗细
      var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.links).enter()
        .append("line")
        .attr("stroke-width", function(d) {
          // 每次访问links的一项数据
          return 2 //所有线宽度均为2
        })
        .join("path")
        .attr("marker-end", "url(#posMarker)")

      var linksName = svg.append("g")
        .attr("class", "linkTexts")
        .selectAll("text")
        .data(this.links)
        .join("text")
        .style('text-anchor','middle')
        // .style('fill', '#fff')
        .style('font-size', '12px')
        // .style('font-weight', 'bold')
        .text(d => d.properties.name.text?d.properties.name.text:d.properties.name)
      // 添加所有的点
      // selectAll("circle")选中所有的圆并绑定数据,圆的直径为d.size
      // 再定义圆的填充色,同样数据驱动样式,圆没有描边,圆的名字为d.id
      // call()函数：拖动函数,当拖动开始绑定dragstarted函数，拖动进行和拖动结束也绑定函数
      var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes).enter()
        .append("circle").attr("r", function(d) {
          // 每次访问nodes的一项数据
          // console.log(d)
          let size = 16
          switch(d.label){
            case _this.labels[0]: break;
            case _this.labels[1]: size = 14; break;
            case _this.labels[2]: size = 12; break;
            default: size = 12; break;
          }
          return size * 2
        })
        .attr("fill", d => {
          for (let i = 0;i < this.labels.length;i++) {
            if (d.label === this.labels[i]){
                return this.colors[i]
              }
          }
        })
        .attr("stroke", "none")
        .attr("name", d => d.properties.name.text?d.properties.name.text:d.properties.name)
        .attr("id", d => d.id)
        .call(this.drag(simulation))
        .on("click",  _this.contextMenu(this.menu))
        .on('mouseenter', function (event) {
          const node = d3.select(this)
          //获取被选中元素的名字
          let name = node.attr("name")
          let id = node.attr("id")
          let color = node.attr('fill')
          // console.log(name, id, color)
          //设置#info h4样式的颜色为该节点的颜色，文本为该节点name
          _this.$set(_this.selectNodeData, 'id', id)
          _this.$set(_this.selectNodeData, 'name', name)
          _this.$set(_this.selectNodeData, 'color', color)
          //遍历查找id对应的属性
          for (let item of _this.nodes) {
            if (item.id == id) {
              // for(var key in item.properties)
              _this.$set(_this.selectNodeData, 'properties', item.properties)
            }
          }
          // 遍历节点，并调整图的样式
          _this.changeGraphStyle(name)
        })
        .on('mouseleave', event => {
          if (!this.isNodeClicked) {
            // 移除所有样式
            this.clearGraphStyle();
          }
        })
        // .on('contextmenu', _this.contextMenu(this.menu))

      // 显示所有的文本

      // 设置大小、填充颜色、名字、text()设置文本
      // 使用 attr("text-anchor", "middle")设置文本居中
        var text = svg.append("g")
        .attr("class", "texts")
        .selectAll("text")
        .data(this.nodes)
        .enter()
        .append("text").attr("font-size", () => 13)
        .attr("fill", () => '#fff')
        .attr('name', d => d.properties.name.text?d.properties.name.text:d.properties.name)
        .attr("text-anchor", "middle")
        .attr('x', function (d) {
          return textBreaking(d3.select(this), d.properties.name.text?d.properties.name.text:d.properties.name)
        })
        .call(this.drag(simulation))
        .on("click",  _this.contextMenu(this.menu))
        .on('mouseenter', function (event) {
          // console.dir(this)
          const text = d3.select(this)
          // console.log(text)
          // 获取被选中元素的名字
          let name = text.attr("name")
          _this.$set(_this.selectNodeData, 'name', name)

          // 根据文本名称获取节点的id
          for (let item of _this.nodes) {
            if (item.properties.name == name) {
              // 设置节点id和标签属性
              _this.$set(_this.selectNodeData, 'id', item.id)
              _this.$set(_this.selectNodeData, 'properties', item.properties)
              // 根据节点类型label获取节点颜色
              let index = 0
              switch (item.label) {
                case _this.labels[0]: break;
                case _this.labels[1]: index = 1;break;
                case _this.labels[2]: index = 2;break;
                case _this.labels.last == 'Att': index = 7;break;

                default: index = 3;break;
              }
              _this.$set(_this.selectNodeData, 'color', _this.colors[index])
            }
          }
          _this.changeGraphStyle(name)
        })
        .on('mouseleave', (event) => {
          if(!this.isNodeClicked) {
            this.clearGraphStyle()
          }
        })

        // .on('contextmenu', _this.contextMenu(this.menu))


      // 圆增加title
      node.append("title").text(d => d.properties.name.text?d.properties.name.text:d.properties.name)

      // simulation中ticked数据初始化并生成图形
      simulation.on("tick", ticked)

      simulation.force("link")
        .links(this.links)
        .distance(d => { // 每一边的长度
          let distance = 20
          switch(d.source.label) {
            case _this.labels[0]: distance += 30;break;
            case _this.labels[1]: distance += 25;break;
            case _this.labels[2]: distance += 22;break;
            default: distance += 20;break;
          }
          switch(d.target.label) {
            case _this.labels[0]: distance += 30;break;
            case _this.labels[1]: distance += 25;break;
            case _this.labels[2]: distance += 22;break;
            default: distance += 20;break;
          }
          return distance * 2
        })

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
          .attr("y2", d => d.target.y)

        linksName
          .attr('transform', d => {
            let x = Math.min(d.source.x, d.target.x) + Math.abs(d.source.x - d.target.x) / 2
            let y = Math.min(d.source.y, d.target.y) + Math.abs(d.source.y - d.target.y) / 2 - 1
            // tanA = a / b
            // A = arctan(tanA)
            let tanA = Math.abs(d.source.y - d.target.y) / Math.abs(d.source.x - d.target.x)
            let angle = Math.atan(tanA) / Math.PI * 180
            // let angle = Math.atan2(1,1)/Math.PI*180
            // console.log(angle)
            // 第一、二象限额外处理
            if (d.source.x > d.target.x) {
              // 第二象限
              if (d.source.y <= d.target.y) {
                angle = -angle
              }
              // else {  // 第三象限
              //   angle = angle
              // }
            } else if (d.source.y > d.target.y) {
              // 第一象限
              angle = -angle
            }
            return 'translate(' + x + ',' + y + ')' + 'rotate(' + angle + ')'
          })

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)

        text.attr('transform', function(d) {
          let size = 15
          switch(d.label){
            case _this.labels[0]: break;
            case _this.labels[1]: size = 14;break;
            case _this.labels[2]: size = 13;break;
            default: size = 12;break;
          }
          size -= 5
          return 'translate(' + (d.x - size / 2 + 3) + ',' + (d.y + size / 2) + ')'
        })
      }

      /**
       * 文本分隔（根据字数在当前选择器中分隔三行，超过10字省略）
       * @method textBreaking
       * @param {d3text} 文本对应的DOM对象
       * @param {text} 节点名称的文本值
       * @return {void}
       */
      function textBreaking(d3text, text) {
        const len = text.length
        if (len <= 3) {
          d3text.append('tspan')
            .attr('x', 0)
            .attr('y', 2)
            .text(text)
        } else {
          const topText = text.substring(0, 3)
          const midText = text.substring(3, 7)
          let botText = text.substring(7, len)
          let topY = -16
          let midY = 0
          let botY = 16
          if (len <= 7) {
            topY += 10
            midY += 10
          } else if (len > 10){
            botText = text.substring(7, 9) + '...'
          }

          d3text.text('')
          d3text.append('tspan')
            .attr('x', 0)
            .attr('y', topY)
            .text(function () {
              return topText
            })
          d3text.append('tspan')
            .attr('x', 0)
            .attr('y', midY)
            .text(function () {
              return midText
            })
          d3text.append('tspan')
            .attr('x', 0)
            .attr('y', botY)
            .text(function () {
              return botText
            })
        }
      }


      function nodeClick(event,d){
        let name = '';
        name = d.properties.kgid?d.properties.kgid.text:d.properties.name.text;
        let tag = d.tag;
        // _this.$emit('getData',tag,name)


        _this.contextMenu(this.menu)
      }
      // 分别定义节点和文本的点击事件
      // 优化：由于点击前必定触发mouseenter事件，所以不用再去查找节点id
      //      直接根据this.selectNodeData拿到节点信息
      // 优化后：只需定义一个点击事件即可
      // function nodeClick(event, d) {

      //   // console.log('node clicked!')
      //   // sticked用于固定节点（无法实现节点固定功能）
      //   // delete d.fx
      //   // delete d.fy
      //   // d3.select(this).classed("fixed", true)
      //   // simulation.alpha(1).restart()

      //   // 获取被选中元素信息
      //   // const node = d3.select(this)
      //   // let name = node.attr("name")
      //   // let id = node.attr("id")
      //   // let color = node.attr('fill')
      //   // console.log(name, id, color)

      //   // 直接通过this.selectNodeData拿到节点信息
      //   event.cancelBubble = true
      //   event.stopPropagation() // 阻止事件冒泡

      //   const name = _this.selectNodeData.name
      //   _this.isNodeClicked = true
      //   _this.changeGraphStyle(name)

      //   return false
      // }
    },
    // 根据当前节点名称来更改图样式
    changeGraphStyle (name) {
      // console.log(this.isNodeClicked)
      // 选择#svg1 .nodes中所有的circle，再增加个class
      this.svgDom.select('.nodes').selectAll('circle').attr('class', d => {
        // 节点属性name是否等于name，返回fixed（激活选中样式）
        if(d.properties.name.text?d.properties.name.text:d.properties.name == name) {
          return 'fixed'
        }
        // 当前节点返回空，否则其他节点循环判断是否被隐藏起来(CSS设置隐藏)
        else {
          // links链接的起始节点进行判断,如果其id等于name则显示这类节点
          // 注意: graph = data
          for (var i = 0; i < this.links.length; i++) {
            // 如果links的起点等于name，并且终点等于正在处理的则显示
            if (this.links[i]['source'].properties.name == name && this.links[i]['target'].id == d.id) {
                return 'active'
            }
            if (this.links[i]['target'].properties.name == name && this.links[i]['source'].id == d.id) {
                return 'active'
            }
          }
          return this.isNodeClicked ? 'inactive' : ''
        }
      })
      // 处理相邻的文字是否隐藏
      this.svgDom.select('.texts').selectAll('text')
        .attr('class', d => {
          // 节点属性name是否等于name，返回fixed（激活选中样式）
          if(d.properties.name.text?d.properties.name.text:d.properties.name == name) {
            return ''
          }
          // 当前节点返回空，否则其他节点循环判断是否被隐藏起来(CSS设置隐藏)
          else {
            // links链接的起始节点进行判断,如果其id等于name则显示这类节点
            // 注意: graph = data
            for (var i = 0; i < this.links.length; i++) {
              // 如果links的起点等于name，并且终点等于正在处理的则显示
              if (this.links[i]['source'].properties.name == name && this.links[i]['target'].id == d.id) {
                  return ''
              }
              if (this.links[i]['target'].properties.name == name && this.links[i]['source'].id == d.id) {
                  return ''
              }
            }
            return this.isNodeClicked ? 'inactive' : ''
          }
        })
      // 处理相邻的边line是否隐藏 注意 ||
      this.svgDom.select(".links").selectAll('line')
        .attr('class', d => {
          if (d.source.properties.name == name || d.target.properties.name == name) {
              return 'active'
          } else {
              return this.isNodeClicked ? 'inactive' : ''
          }
        })
        .attr('marker-end', d => {
          if (d.source.properties.name == name || d.target.properties.name == name) {
            return 'url(#posActMarker)'
          } else {
            return 'url(#posMarker)'
          }
        })
      // 处理相邻的边上文字是否隐藏 注意 ||
      this.svgDom.select(".linkTexts").selectAll('text')
        .attr('class', d => {
          if (d.source.properties.name == name || d.target.properties.name == name) {
              return 'active'
          } else {
              return this.isNodeClicked ? 'inactive' : ''
          }
        })
    },
    clearGraphStyle () {
      // 移除所有样式
      this.svgDom.select('.nodes').selectAll('circle').attr('class', '')
      this.svgDom.select(".texts").selectAll('text').attr('class', '')
      this.svgDom.select('.links').selectAll('line').attr('class', '').attr('marker-end', 'url(#posMarker)')
      this.svgDom.select(".linkTexts").selectAll('text').attr('class', '')


      // d3.select(this).attr('class', '')
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

      return d3.drag()
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    },
    // 绘制关系箭头
    addMarkers() {
      // 定义箭头的标识
      var defs = this.svgDom.append("defs")
      const posMarker = defs.append("marker")
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
        .attr('fill', '#e0cac1')
        .attr("stroke-opacity", 0.6);
      const posActMarker = defs.append("marker")
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
        .attr('fill', '#1E90FF')
        .attr("stroke-opacity", 0.6);
      // const negMarker = defs.append("marker")
      //   .attr("id","negMarker")
      //   .attr("orient","auto")
      //   .attr("stroke-width",2)
      //   .attr("markerUnits", "strokeWidth")
      //   .attr("markerUnits", "userSpaceOnUse")
      //   .attr("viewBox", "0 -5 10 10")
      //   .attr("refX", -25)
      //   .attr("refY", 0)
      //   .attr("markerWidth", 12)
      //   .attr("markerHeight", 12)
      //   .append("path")
      //   .attr("d", "M 10 -5 L 0 0 L 10 5")
      //   .attr('fill', '#999')
      //   .attr("stroke-opacity", 0.6);
    }
  }
}
</script>

<style lang="scss">
@import '@/plugins/d3-context-menu';

$opacity: 0.15;  /* 显示的不透明度 */
$activeColor: #1E90FF;  /* 激活的颜色 */
svg {
  margin: 4px 0px;
}
#svg{
  font-weight:100;
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
    stroke: #FFC0CB;  // #888;
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
    &.abcxde{
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
  &.abcxde{
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
  bottom: 10PX;
  left: 10px;
  width:160px;
  .gState span {
    display: inline-block;
    border: 1px solid #fff;
    color: #409eff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 14px;
    transition: color, background-color .3s;
    -o-transition: color, background-color .3s;
    -ms-transition: color, background-color .3s;
    -moz-transition: color, background-color .3s;
    -webkit-transition: color, background-color .3s;
    ~ .active, ~ :hover {
      background-color: #409eff;
      color: #fff;
      cursor: pointer;
    }
    ~ .active1{
      display: none;
    }
  }
  .gState span.active, .gState span:hover {
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
