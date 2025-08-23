import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

// type SalesData = {
//   date: string;
//   totalSales: number;
// };

// interface SalesLineChartProps {
//   title: string;
//   data: SalesData[];
// }

const SalesLineChart = ({ title, data }) => {

  return (
    <div className="w-full h-80 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label value="Date" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Sales ($)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesLineChart;