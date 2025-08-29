import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const IncomeChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Monthly Income Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={safeData}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => {
              if (!value) return "";
              const date = new Date(value + "-01");
              return date.toLocaleString("en-US", { month: "short" });
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) =>
              value
                ? [`KSh ${Number(value).toLocaleString()}`, ""]
                : ["KSh 0", ""]
            }
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line type="monotone" dataKey="milk" stroke="#3B82F6" strokeWidth={2} name="Milk" />
          <Line type="monotone" dataKey="tea" stroke="#10B981" strokeWidth={2} name="Tea" />
          <Line type="monotone" dataKey="honey" stroke="#F59E0B" strokeWidth={2} name="Honey" />
          <Line type="monotone" dataKey="macadamia" stroke="#8B5CF6" strokeWidth={2} name="Macadamia" />
          <Line type="monotone" dataKey="apples" stroke="#EF4444" strokeWidth={2} name="Apples" />
          <Line type="monotone" dataKey="total" stroke="#1F2937" strokeWidth={3} name="Total" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
