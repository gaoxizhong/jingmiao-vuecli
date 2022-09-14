  // 研究趋势
const getLine_eacharts = (d,i,t) =>{
        let taht = t;
        let id = i;
        let newData = d;
        let myChart = taht.$echarts.init(document.getElementById(id));
        let data_val = [2220, 1682, 2791, 3000, 4090, 3230, 2910, 2791, 3000, 4090, 2220, 1682, 2910],
          xAxis_val = ["2010", "2011", "2012", "2013", "2014", "2015", "2016","2017","2018","2019","2020","2021","2022"];
        let option = {
          backgroundColor: "#fff",
          grid: {  // 控制图标在模块内距离边框的距离，不设置会自动居中
            left: 0,
            top: 14,
            bottom: 0,
            right: 14,
            containLabel: true,
          },
          tooltip: { // 鼠标浮动展示框样式
            show: true,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            textStyle: {
              color: "#fff",
            },
            formatter: "{b}:{c}",
            borderWidth:0
            // borderColor: "rgba(0, 0, 0, 1)",
            // borderWidth: 0.5,
            // extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 1)",
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
              textStyle: {
                color: "#999",
              },
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
export {getLine_eacharts}