import React from "react";

const ProductionTable = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* ✅ Horizontal scroll on small devices */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Date</th>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Product</th>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Unit</th>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Notes</th>
              <th className="px-3 sm:px-4 py-2 text-left font-medium text-gray-600">Income (KSh)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {safeData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  No production records found
                </td>
              </tr>
            ) : (
              safeData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {item.product}
                  </td>
                  <td className="px-3 sm:px-4 py-2">{item.quantity}</td>
                  <td className="px-3 sm:px-4 py-2">{item.unit}</td>
                  <td className="px-3 sm:px-4 py-2">{item.notes || "—"}</td>
                  <td className="px-3 sm:px-4 py-2 font-semibold whitespace-nowrap">
                    {item.income
                      ? `KSh ${Number(item.income).toLocaleString()}`
                      : "—"}
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

export default ProductionTable;
