import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: { display: false },
  elements: { point: { radius: 0 } },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxis: [
      {
        type: "time",
        time: { format: "MM/DD//YY", tooltipFormat: "ll" },
      },
    ],
    yAxis: [
      {
        gridLines: { display: false },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ dataType = "cases" }) {
  const [data, setData] = useState({});

  const buildChartData = (data, dataType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[dataType]) {
      //console.log(date + " " + data[dataType][date]);
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[dataType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[dataType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, dataType);
          //console.log("chartData");
          //console.log(chartData);
          setData(chartData);
        });
    };
    fetchData();
  }, [dataType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          type="line"
          data={{
            datasets: [
              {
                data: data,
                label: dataType,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
