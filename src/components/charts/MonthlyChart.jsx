import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MonthlyChart = () => {

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [chartData, setChartData] =
    useState([]);

  useEffect(() => {
    fetchMonthlyStats();
  }, []);

  const fetchMonthlyStats =
    async () => {
      try {
        const { data } =
          await API.get(
            "/applications/stats/monthly"
          );

        const formatted =
          data.data.map(
            (item) => ({
              month: `${months[item._id.month]} ${item._id.year}`,
              applications:
                item.count,
            })
          );

        setChartData(
          formatted
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="applications"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;