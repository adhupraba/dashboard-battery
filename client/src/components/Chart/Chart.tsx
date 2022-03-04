import { FC } from "react";
import ApexCharts from "react-apexcharts";
import { containerTitleStyles } from "src/constants";

interface IChartProps {}

const chartSeries = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

const chartOptions: any = {
  title: {
    text: "Power Cost",
    style: containerTitleStyles,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

export const Chart: FC<IChartProps> = () => {
  return (
    <div className="container">
      <ApexCharts type="area" options={chartOptions} series={chartSeries} height={350} />
    </div>
  );
};
