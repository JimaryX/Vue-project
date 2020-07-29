// echarts.EChartOption.SeriesLine
// https://www.echartsjs.com/option.html
// import i18n from "@/plugins/element";

export function getNOxOptions() {
  return {
    tooltip: {
      trigger: "axis",
      formatter: "{b} </br>NOx: {c}",
      axisPointer: {
        type: "line"
      }
    },
    xAxis: {
      data: [""],
      nameTextStyle: {
        fontSize: 12,
        color: "#000",
        padding: [13, 0, -15, -15]
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000"
        }
      },
      axisLabel: {
        show: true,
        interval: "auto",
        rotate: 0,
        formatter: "{value}" // function(value: string, index: number)
      },
      axisTick: {
        alignWithLabel: true,
        interval: "auto"
      }
    },
    yAxis: {
      name: "general.emissionVolume",
      nameLocation: "end",
      nameTextStyle: {
        fontSize: 10,
        color: "#000",
        padding: [0, 0, 0, 40]
      },
      nameGap: 10,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#000"
      },
      type: "value",
      // max: 150,
      splitNumber: 3,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dotted",
          color: "#000"
        }
      }
    },
    toolbox: {
      show: false,
      left: "center",
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "slider", // 图表下方的伸缩条
        show: true, // 是否显示
        realtime: true, //
        start: 70, // 伸缩条开始位置（1-100）%，可以随时更改
        end: 100, // 伸缩条结束位置（1-100）%，可以随时更改
        bottom: 3,
        height: 16, // 组件高度
        textStyle: {
          color: "#000"
        }
      },
      {
        type: "inside", // 鼠标滚轮
        realtime: true
      }
    ],
    grid: {
      containLabel: true,
      top: 25,
      right: 15,
      bottom: 20,
      left: 0
    },
    series: {
      name: "NOX",
      type: "line",
      data: [0],
      smooth: true,
      symbol: "circle", // 拐点类型
      symbolSize: 0, // 拐点圆的大小
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#DCE8F5" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#7AABD9" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      areaStyle: {
        type: "default",
        opacity: 1
      }
    }
  };
}
