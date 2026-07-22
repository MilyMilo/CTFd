/* eslint-disable @typescript-eslint/no-explicit-any -- echarts option trees and
 * CTFd API payloads are both untyped; annotating them here would be fiction. */
import { mergeObjects } from "../../objects.js";

export function getOption(solves: number, fails: number, optionMerge?: any) {
  let option: any = {
    title: {
      left: "center",
      text: "Solve Percentages",
    },
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      orient: "vertical",
      top: "middle",
      right: 0,
      data: ["Fails", "Solves"],
    },
    series: [
      {
        name: "Solve Percentages",
        type: "pie",
        radius: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function (data: any) {
                return `${data.name} - ${data.value} (${data.percent}%)`;
              },
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              position: "center",
              textStyle: {
                fontSize: "14",
                fontWeight: "normal",
              },
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: fails,
            name: "Fails",
            itemStyle: { color: "rgb(207, 38, 0)" },
          },
          {
            value: solves,
            name: "Solves",
            itemStyle: { color: "rgb(0, 209, 64)" },
          },
        ],
      },
    ],
  };

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
