import React from "react";
import { DollarSign, FileText, Calendar, Award } from "lucide-react";

const SummaryCards = ({
  prices = [],
  monthlyIncome = [],
  todayIncome = 0,
  todayProductsCount = 0,
}) => {
  const safePrices = Array.isArray(prices) ? prices : [];
  const safeMonthlyIncome = Array.isArray(monthlyIncome) ? monthlyIncome : [];

  // 🔹 Current month & income
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const monthData = safeMonthlyIncome.find((m) => m.month === currentMonth);
  const monthTotal = monthData?.total || 0;

  // 🔹 Find top product this month
  let topProduct = null;
  if (monthData) {
    const { milk = 0, tea = 0, honey = 0, macadamia = 0, apples = 0 } = monthData;
    const products = { milk, tea, honey, macadamia, apples };

    const [best, amount] = Object.entries(products).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ["none", 0]
    );

    if (amount > 0) {
      topProduct = { name: best, amount };
    }
  }

  const cards = [
    {
      title: `Income (${new Date(currentMonth + "-01").toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      })})`,
      value: `KSh ${monthTotal.toLocaleString()}`,
      icon: Calendar,
      color: "text-indigo-600",
    },
    {
      title: "Today's Income",
      value: `KSh ${todayIncome.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Products",
      value: safePrices.length,
      icon: FileText,
      color: "text-purple-600",
    },
  ];

  if (topProduct) {
    cards.push({
      title: "Top Contributor (This Month)",
      value: `${topProduct.name} (KSh ${topProduct.amount.toLocaleString()})`,
      icon: Award,
      color: "text-yellow-600",
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <card.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
