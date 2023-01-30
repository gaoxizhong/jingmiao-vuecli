  // 折线图
const getLine_eacharts = (d,i,t) =>{
        let taht = t;
        let id = i;
        let newData = d;
        let myChart = taht.$echarts.init(document.getElementById(id));
        let data_val = [];
        let xAxis_val = [];
        newData.forEach(ele =>{
          data_val.push(ele.doc_count);
          xAxis_val.push(ele.key);
        })
       
        let option = {
          backgroundColor: "#fff",
          grid: {  // 控制图标在模块内距离边框的距离，不设置会自动居中
            left: 0,
            top: 20,
            bottom: 0,
            right: 10,
            containLabel: true,
          },
          tooltip: { // 鼠标浮动展示框样式
            show: true,
            backgroundColor: "#fff",
            textStyle: {
              color: "#333",
            },
            formatter: "{b}:{c}",
            borderWidth:0
            // borderColor: "rgba(0, 0, 0, 1)",
            // borderWidth: 0.5,
            // extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 1)",
          },
          toolbox: {
            show: true,
            itemSize: 16,
            right:-4,
            top: -4,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          xAxis: {  // X轴
            data: xAxis_val,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
            axisLabel: {
              formatter:function(value) { //X轴的内容
                var ret = ""; //拼接加\n返回的类目项
                var max = 10;  //每行显示的文字字数
                var val = value.length;  //X轴内容的文字字数
                var rowN = Math.ceil(val / max);  //需要换的行数
                if(rowN > 1){ //判断 如果字数大于2就换行
                  for(var i = 0; i<rowN;i++){
                    var temp = "";  //每次截取的字符串
                    var start = i * max;  //开始截取的位置
                    var end = start + max;  //结束截取的位置
                    temp = value.substring(start,end)+ "\n";
                    ret += temp;  //最终的字符串
                  }
                  return ret;
                }
                else {return value}
              },
              color: "#999",
              fontSize: '0.7rem',
              interval: 0, // 设置斜切
              rotate: 40 // 设置斜切
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
                fontSize: '0.7rem',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#EFEFEF",
              },
            },
          },

          series: [
              // 柱状
            // {
            //   type: "bar",
            //   name: "linedemo",
            //   tooltip: {
            //     show: false,
            //   },
            //   animation: false,
            //   barWidth: 1.4,
            //   hoverAnimation: false,
            //   data: data_val,
            //   itemStyle: {
            //     normal: {
            //       color: "#3664D9",
            //       opacity: 0.6,
            //       label: {
            //         show: false,
            //       },
            //     },
            //   },
            // },
              // 折线
            { 
              type: "line", 
              name: "linedemo",
              smooth: true,
              symbolSize: 8, // 节点圆球的直径大小
              animation: true,// 初始加载时动画
              lineWidth: 1,
              hoverAnimation: false,
              data: data_val,
              symbol: "circle",
              itemStyle: { // 圆球及连线样式样式
                normal: {
                  color: "#3664D9",
                  shadowBlur: 40,
                  label: { // 节点上的字体展示
                    show: false,
                    position: "top",
                    textStyle: {
                      color: "#000",
                    },
                  },
                },
              },
              areaStyle: { // 面积图
                normal: {
                  color: "#3664D9",
                  opacity: 0.07,
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      }
    // 力导图 --- 关系图谱
const getForceRelation_eacharts = (d,i,t) =>{
        let taht = t;
        let id = i;
        let newData = d;
        let myChart = taht.$echarts.init(document.getElementById(id));

        var baseName = newData.search;
        let k = [];
        newData.keyword.forEach(ele =>{
          if(ele != baseName){
            k.push(ele)
          }
        })
        
        var chartData = {};
        k.forEach(ele =>{
          chartData[ele] = [];
        })
        var datas = [
          {
            name: baseName || "",
            draggable: true,
          },
        ];
        var lines = [];
        var categoryIdx = 0;
        var keyIndex = 0;
        var dataIndex = 0;
        $.each(chartData, function (key, values) {
          keyIndex = dataIndex;
          datas.push({ name: key, category: categoryIdx, draggable: true });
          keyIndex++;
          dataIndex++;
          lines.push({  // 关系连线
            source: 0,
            target: keyIndex,
            value: "",
          });
          $(values).each(function (idx, val) {
            datas.push({ name: val, category: categoryIdx, draggable: true });
            dataIndex++;
            lines.push({
              source: keyIndex,
              target: dataIndex,
              value: "",
            });
          });
          categoryIdx++;
        });
        var option = {
          title: {
            text: "",
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          toolbox: {
            show: true,
            itemSize: 16,
            right:-4,
            top: -4,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              type: "graph",
              layout: "force", //采用力引导布局
              symbolSize: 45,  // 球大小
              legendHoverLink: true, //启用图例 hover 时的联动高亮。
              focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              roam: true,
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
              force: {
                repulsion: 400,
              },
              edgeSymbolSize: [4, 50],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10,
                  },
                  formatter: "{c}",
                },
              },
              categories: [
                {
                  itemStyle: {
                    normal: {
                      color: "#BB8FCE",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#0099FF",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#5DADE2",
                    },
                  },
                },
              ],
              data: datas,
              links: lines,
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0,
                },
              },
            },
          ],
        };


        myChart.setOption(option);
      }
// 力导图 --- 浮点气泡图-- 相关作者
const getForceFloating_eacharts = (d,i,t) =>{
        let that = t;
        let id = i;
        let data = d;
        data.forEach( (ele,index) =>{
          ele.symbolSize = 48;
          ele.draggable = true;
          ele.itemStyle = {
            normal: {
              color: '#5DADE2',
            },
          }
        })


        let myChart = that.$echarts.init(document.getElementById(id));

        let option = {
              toolbox: {
                show: true,
                itemSize: 16,
                right:0,
                top: 0,
                feature: {
                  saveAsImage: {}  // 导出图片
                }
              },
            // 图表标题
            title: {
              show: false, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
              text: '"新时代"主题图谱', //主标题文本，'\n'指定换行
              x: "center", // 水平安放位置，默认为左对齐，可选为：
              // 'center' ¦ 'left' ¦ 'right'
              // ¦ {number}（x坐标，单位px）
              y: "bottom", // 垂直安放位置，默认为全图顶端，可选为：
              // 'top' ¦ 'bottom' ¦ 'center'
              // ¦ {number}（y坐标，单位px）
              //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: "#ccc", // 标题边框颜色
              borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
              padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
              // 接受数组分别设定上右下左边距，同css
              itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
              textStyle: {
                fontSize: 16,
                fontWeight: "bolder",
                color: "#333", // 主标题文字颜色
              },
              subtextStyle: {
                color: "#aaa", // 副标题文字颜色
              },
            },
            backgroundColor: "#fff",
            tooltip: {},
            animationDurationUpdate: function (idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
            animationEasingUpdate: "bounceIn",
            series: [
              {
                type: "graph",
                layout: "force",
                force: {
                  repulsion: 80,
                  edgeLength: 10,
                },
                roam: true,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: '#333',
                    },
                  },
                },
                data,
              },
            ],
        };
        myChart.setOption(option);
        //跳转代码
        myChart.on("click", function (d) {
          that.$emit('setsickNess', '');
          that.$router.push({
            path:'/literatureAuthor',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name:d.name,
            }
          })
        });
      }
export {getLine_eacharts,getForceRelation_eacharts,getForceFloating_eacharts}