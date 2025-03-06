import React from "react";
import ReactECharts from "echarts-for-react";
import styles from "./chart.module.css";

const Chart = ({
  total = 0,
  checkin = 0,
  checkout = 0,
  late_checkin = 0,
  early_checkout = 0,
  overtime_checkout = 0,
}) => {
  const option = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      display: "flex",
      flexDirection: "column",
      width: "10%",
      right: "5%",
      marginBottom: "20px",
    },
    series: [
      {
        name: "Reports",

        type: "pie",
        radius: "95%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        color: ["#25616d", "#c5d86d", "#d7263d"],
        data: [
          { value: total, name: "Total" },
          { value: checkin, name: "Total Check In" },
          { value: checkout, name: "Total Check Out" },
          { value: late_checkin, name: "Late Check Out" },
          { value: early_checkout, name: "Early Check Out" },
          { value: overtime_checkout, name: "Overtime Check Out" },
        ],
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default Chart;
