import React, { useState } from "react";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

import { Data } from "./Data";

Chart.register(CategoryScale);

function BarChart({ data }) {
  //   console.log("data: " + data);

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data),
    datasets: [
      {
        label: "Accuracy",
        data: data.map((data) => data),
        backgroundColor: ["rgba(75,192,192,0.5)"], // no. of color = NUMBER of charts
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div
      className="row "
      style={{
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // width: "99%",
        // height: "10vh" /* Magic here */,
        flexDirection: "row",
      }}
    >
      <h2>Bar Chart</h2>

      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sound Events Detection",
            },
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 14,
                },
              },
            },
            responsive: false,
          },
          scales: {
            y: {
              suggestedMin: 0,
              suggestedMax: 1,
            },
            x: {
            ticks: {
                font: {
                    size: 17,
                }
            }
        }
          },
        }}
      />
    </div>
  );
}

export default BarChart;
