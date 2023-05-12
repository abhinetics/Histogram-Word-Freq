import Chart from "react-apexcharts";
import { useState } from "react";
import React from "react";
import { CSVLink } from "react-csv";
import "bootstrap/dist/css/bootstrap.min.css";

const Histogram = ({ frequency }) => {
  // set data in the frequency object
  const [histogramData, setHistogramData] = useState([]);
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: frequency.map((word) => {
          return word[0];
        }),
      },
    },
    series: [
      {
        name: "Frequency",
        data: frequency.map((word) => {
          return word[1];
        }),
      },
    ],
  });

  return (
    <div>
      <Chart className="chart"
        options={data.options}
        series={data.series}
        type="bar"
        height="200"
        width="380"
      />
      <div className="text-center">
        <CSVLink
          className="btn btn-primary "
          filename={"histogram.csv"}
          data={frequency}
        >
          Export
        </CSVLink>
        
      </div>
    </div>
  );
};

export default Histogram;
