import React from "react";

const ByProductTable = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  const grouped = {};
  safeData.forEach(({ month, product, total }) => {
    if (!grouped[month]) grouped[month] = { month };
    grouped[month][product.toLowerCase()] = Number(total);
  });

  const rows = Object.values(grouped);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Monthly Income Table</h3>

      {/* ✅ Mobile view (cards) */}
      <div className="space-y-3 sm:hidden">
        {rows.length === 0 ? (
          <p className="text-gray-500 text-center">No data available</p>
        ) : (
          rows.map((row, i) => (
            <div
              key={i}
              className="bg-gray-50 p-3 rounded-md shadow border text-sm"
            >
              <p className="font-semibold mb-1">
                {new Date(row.month + "-01").toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>Milk: KSh {row.milk?.toLocaleString() || 0}</p>
              <p>Tea: KSh {row.tea?.toLocaleString() || 0}</p>
              <p>Honey: KSh {row.honey?.toLocaleString() || 0}</p>
              <p>Macadamia: KSh {row.macadamia?.toLocaleString() || 0}</p>
              <p>Apples: KSh {row.apples?.toLocaleString() || 0}</p>
            </div>
          ))
        )}
      </div>

      {/* ✅ Desktop view (table) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Milk</th>
              <th className="p-2 border">Tea</th>
              <th className="p-2 border">Honey</th>
              <th className="p-2 border">Macadamia</th>
              <th className="p-2 border">Apples</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-3 text-center text-gray-500 border"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">
                    {new Date(row.month + "-01").toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-2 border">
                    {row.milk?.toLocaleString() || 0}
                  </td>
                  <td className="p-2 border">
                    {row.tea?.toLocaleString() || 0}
                  </td>
                  <td className="p-2 border">
                    {row.honey?.toLocaleString() || 0}
                  </td>
                  <td className="p-2 border">
                    {row.macadamia?.toLocaleString() || 0}
                  </td>
                  <td className="p-2 border">
                    {row.apples?.toLocaleString() || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ByProductTable;
