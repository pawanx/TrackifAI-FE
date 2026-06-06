import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF4560",
];

const StatusChart = ({ stats }) => {
  const data = [
    {
      name: "Applied",
      value: stats.applied,
    },
    {
      name: "Assessment",
      value: stats.assessment,
    },
    {
      name: "Interview",
      value: stats.interview,
    },
    {
      name: "Offer",
      value: stats.offer,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={120}
          label
        >
          {data.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;