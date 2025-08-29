// src/components/PriceManagement.js
import React, { useState, useEffect } from "react";
import api from "../services/api";

const PriceManagement = () => {
  const [prices, setPrices] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch prices from DB on mount
  const fetchPrices = async () => {
    try {
      const data = await api.getCurrentPrices();
      console.log("📊 Prices API Response:", data);
      setPrices(data);
    } catch (err) {
      console.error("❌ Error fetching prices:", err);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleEditClick = (product, price) => {
    setEditingProduct(product);
    setNewPrice(price);
  };

  const handleSaveClick = async () => {
    if (!newPrice || isNaN(newPrice)) return;

    setLoading(true);
    try {
      await api.updatePrice(editingProduct, parseFloat(newPrice));
      await fetchPrices(); // ✅ refresh from DB
    } catch (err) {
      console.error("❌ Error updating price:", err);
    } finally {
      setEditingProduct(null);
      setNewPrice("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Current Prices
      </h2>

      {prices.length === 0 ? (
        <p className="text-gray-500">No prices available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 sm:px-4 border text-left">Product</th>
                <th className="py-2 px-3 sm:px-4 border text-left">Price (KSh)</th>
                <th className="py-2 px-3 sm:px-4 border"></th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item) => (
                <tr key={item.product} className="border-t">
                  <td className="py-2 px-3 sm:px-4 capitalize">{item.product}</td>
                  <td className="py-2 px-3 sm:px-4">
                    {editingProduct === item.product ? (
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="border rounded px-2 py-1 w-20 sm:w-28 text-sm sm:text-base"
                      />
                    ) : (
                      `KSh ${item.price}`
                    )}
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-right">
                    {editingProduct === item.product ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleSaveClick}
                          disabled={loading}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(item.product, item.price)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm sm:text-base"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PriceManagement;
