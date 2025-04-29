// import React, { useContext, useState, useEffect } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import './Home.css'; // Your CSS styling
// import { AdminContext } from '../../Context/AdminContext';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement
// );

// const Home = () => {
//   // Retrieve orders and products from context
//   const { allorders, allproducts } = useContext(AdminContext);

//   if (!allorders || !allproducts) {
//     return <div>Loading...</div>;
//   }

//   // State to hold our aggregated totals and mappings
//   const [totals, setTotals] = useState({
//     totalIncome: 0,
//     totalProfit: 0,
//     totalLoss: 0,
//   });
//   const [ordersPerCity, setOrdersPerCity] = useState({});
//   const [ordersPerProduct, setOrdersPerProduct] = useState({});
//   const [monthlyOrderCounts, setMonthlyOrderCounts] = useState({});

//   useEffect(() => {
//     let totalIncome = 0;
//     let totalProfit = 0;
//     let totalLoss = 0;

//     // Mappings using simple objects
//     const cityMap = {}; // City => number of orders
//     const productMap = {}; // Product title => total units sold
//     const monthlyMap = {}; // Month (short string) => number of orders

//     allorders.forEach((order) => {
//       // Parse order total (remove commas and convert to float)
//       let orderTotal = 0;
//       if (order.total) {
//         orderTotal = parseFloat(String(order.total).replace(/,/g, '')) || 0;
//       }
//       totalIncome += orderTotal;

//       // Aggregate by city based on order.Address.city
//       let city = 'Unknown';
//       if (order.Address && order.Address.city) {
//         city = order.Address.city;
//       }
//       cityMap[city] = (cityMap[city] || 0) + 1;

//       // Aggregate orders per month (using order.orderDate)
//       const orderDate = new Date(order.orderDate);
//       const month = orderDate.toLocaleString('default', { month: 'short' });
//       monthlyMap[month] = (monthlyMap[month] || 0) + 1;

//       // Process the Items array for each order.
//       if (Array.isArray(order.Items)) {
//         order.Items.forEach((item) => {
//           // Clean quantity and price (they might be strings)
//           const quantity = parseInt(item.quantity, 10) || 0;
//           const price = parseFloat(String(item.price).replace(/,/g, '')) || 0;

//           // Use the trimmed item title as a key; adjust if you use another identifier.
//           let productKey = item.title ? item.title.trim() : 'Unknown';
//           productMap[productKey] = (productMap[productKey] || 0) + quantity;

//           // Attempt to find a product record that matches the order item
//           const product = allproducts.find(
//             (prod) =>
//               prod.title &&
//               prod.title.trim().toLowerCase() === productKey.toLowerCase()
//           );

//           if (product) {
//             const costPrice = product.costPrice || 0;
//             const discount = product.discount || 0;
//             // Profit: (selling price – cost price) * quantity
//             totalProfit += (price - costPrice) * quantity;
//             // Loss (e.g., discount loss): price * (discount percentage) * quantity
//             totalLoss += price * (discount / 100) * quantity;
//           } else {
//             // If product info is missing, use the item price for income but skip profit calc.
//             totalProfit += price * quantity;
//           }
//         });
//       }
//     });

//     setTotals({ totalIncome, totalProfit, totalLoss });
//     setOrdersPerCity(cityMap);
//     setOrdersPerProduct(productMap);
//     setMonthlyOrderCounts(monthlyMap);
//   }, [allorders, allproducts]);

//   // For debugging, you might want to log the computed totals and mappings
//   console.log('Aggregated Totals:', totals);
//   console.log('Orders per City:', ordersPerCity);
//   console.log('Orders per Product:', ordersPerProduct);
//   console.log('Monthly Order Counts:', monthlyOrderCounts);

//   // --- Chart Data Setup ---

//   // 1. Orders by City Chart (Bar Chart)
//   const cityLabels = Object.keys(ordersPerCity);
//   const ordersByCityValues = Object.values(ordersPerCity);
//   const ordersByCityData = {
//     labels: cityLabels,
//     datasets: [
//       {
//         label: 'Orders per City',
//         data: ordersByCityValues,
//         backgroundColor: cityLabels.map(
//           () =>
//             `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//               Math.random() * 255
//             )}, ${Math.floor(Math.random() * 255)}, 0.7)`
//         ),
//       },
//     ],
//   };
//   const ordersByCityOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Orders by City' },
//     },
//   };

//   // 2. Orders per Product Chart (Bar Chart)
//   const productNames = Object.keys(ordersPerProduct);
//   const ordersPerProductValues = Object.values(ordersPerProduct);
//   const ordersPerProductData = {
//     labels: productNames,
//     datasets: [
//       {
//         label: 'Units Sold per Product',
//         data: ordersPerProductValues,
//         backgroundColor: 'rgba(153, 102, 255, 0.7)',
//       },
//     ],
//   };
//   const ordersPerProductOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Orders per Product' },
//     },
//   };

//   // 3. Monthly Order Count Chart (Line Chart)
//   // To display a full year, we use a fixed month order.
//   const monthsOrder = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ];
//   const monthlyOrderDataValues = monthsOrder.map(
//     (m) => monthlyOrderCounts[m] || 0
//   );
//   const monthlyOrdersData = {
//     labels: monthsOrder,
//     datasets: [
//       {
//         label: 'Order Count per Month',
//         data: monthlyOrderDataValues,
//         fill: false,
//         borderColor: 'rgb(33, 128, 245)',
//         tension: 0.2,
//       },
//     ],
//   };
//   const monthlyOrdersOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Monthly Order Count' },
//     },
//   };

//   // Determine a trending product based on units sold. Here we take the product with the highest count.
//   let trendingProduct = 'None';
//   let trendingCount = 0;
//   for (const key in ordersPerProduct) {
//     if (ordersPerProduct[key] > trendingCount) {
//       trendingCount = ordersPerProduct[key];
//       trendingProduct = key;
//     }
//   }

//   return (
//     <div className="home-container" style={{ padding: '20px' }}>
//       <h2>Sales and Orders Dashboard</h2>

//       <div className="totals">
//         <h3>Total Income: ₹{totals.totalIncome.toFixed(2)}</h3>
//         <h3>Total Profit: ₹{totals.totalProfit.toFixed(2)}</h3>
//         <h3>Total Loss (Discount Loss): ₹{totals.totalLoss.toFixed(2)}</h3>
//       </div>

//       <div className="trending-product">
//         <h3>
//           Trending Product: {trendingProduct} ({trendingCount} units sold)
//         </h3>
//       </div>

//       <div className="chart-container" style={{ marginTop: '40px' }}>
//         <div className="chart-box" style={{ marginBottom: '40px' }}>
//           <Bar data={ordersByCityData} options={ordersByCityOptions} />
//         </div>
//         <div className="chart-box" style={{ marginBottom: '40px' }}>
//           <Bar data={ordersPerProductData} options={ordersPerProductOptions} />
//         </div>
//         <div className="chart-box" style={{ marginBottom: '40px' }}>
//           <Line data={monthlyOrdersData} options={monthlyOrdersOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };



// export default Home;


import React, { useContext, useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Home.css'; // Your styling
import { AdminContext } from '../../Context/AdminContext';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Home = () => {
  // Retrieve data from context
  const { allorders, allproducts } = useContext(AdminContext);

  if (!allorders || !allproducts) {
    return <div>Loading...</div>;
  }

  // States to hold aggregated totals and mappings
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalProfit: 0,
    totalLoss: 0,
  });
  const [ordersPerCity, setOrdersPerCity] = useState({});
  const [ordersPerProduct, setOrdersPerProduct] = useState({});
  const [monthlyOrderCounts, setMonthlyOrderCounts] = useState({});
  const [paymentModeCounts, setPaymentModeCounts] = useState({});
  const [revenuePerCategory, setRevenuePerCategory] = useState({});

  useEffect(() => {
    let totalIncome = 0;
    let totalProfit = 0;
    let totalLoss = 0;

    // Initialize aggregators
    const cityMap = {};      // city -> count
    const productMap = {};   // product title -> total units sold
    const monthlyMap = {};   // month abbreviation -> order count
    const paymentMap = {};   // payment mode -> count
    const categoryRevenueMap = {}; // category -> revenue

    allorders.forEach((order) => {
      // Convert order.total to a number (remove commas if necessary)
      let orderTotal = parseFloat(String(order.total).replace(/,/g, '')) || 0;
      totalIncome += orderTotal;

      // Payment Mode Distribution (from order.Payment.mode)
      if (order.Payment && order.Payment.mode) {
        const mode = order.Payment.mode;
        paymentMap[mode] = (paymentMap[mode] || 0) + 1;
      }

      // Orders per City (from order.Address.city)
      const city =
        order.Address && order.Address.city ? order.Address.city : 'Unknown';
      cityMap[city] = (cityMap[city] || 0) + 1;

      // Monthly Order Count (using order.orderDate)
      const orderDate = new Date(order.orderDate);
      const month = orderDate.toLocaleString('default', { month: 'short' });
      monthlyMap[month] = (monthlyMap[month] || 0) + 1;

      // Process each order item
      if (Array.isArray(order.Items)) {
        order.Items.forEach((item) => {
          // Ensure we have numeric quantity and price
          const quantity = parseInt(item.quantity, 10) || 0;
          const price =
            parseFloat(String(item.price).replace(/,/g, '')) || 0;

          // Map product sold via its title (trim spaces)
          const productKey = item.title ? item.title.trim() : 'Unknown';
          productMap[productKey] = (productMap[productKey] || 0) + quantity;

          // Try to locate the corresponding product from allproducts
          const product = allproducts.find(
            (prod) =>
              prod.title &&
              prod.title.trim().toLowerCase() === productKey.toLowerCase()
          );

          if (product) {
            const costPrice = product.costPrice || 0;
            const discount = product.discount || 0;

            // Profit: (Selling price – cost price) x quantity sold
            totalProfit += (price - costPrice) * quantity;
            // Loss from discount: price x (discount percentage) x quantity
            totalLoss += price * (discount / 100) * quantity;

            // Aggregate revenue by product category
            const category = product.category || 'Unknown';
            categoryRevenueMap[category] =
              (categoryRevenueMap[category] || 0) + price * quantity;
          } else {
            // Fallback case if product info is missing
            totalProfit += price * quantity;
          }
        });
      }
    });

    setTotals({ totalIncome, totalProfit, totalLoss });
    setOrdersPerCity(cityMap);
    setOrdersPerProduct(productMap);
    setMonthlyOrderCounts(monthlyMap);
    setPaymentModeCounts(paymentMap);
    setRevenuePerCategory(categoryRevenueMap);
  }, [allorders, allproducts]);

  // Destructure totals
  const { totalIncome, totalProfit, totalLoss } = totals;

  // Determine trending product (based on highest units sold)
  let trendingProduct = 'None';
  let trendingCount = 0;
  for (const key in ordersPerProduct) {
    if (ordersPerProduct[key] > trendingCount) {
      trendingCount = ordersPerProduct[key];
      trendingProduct = key;
    }
  }

  // --- Chart Data Setup ---

  // 1. Orders by City (Bar Chart)
  const cityLabels = Object.keys(ordersPerCity);
  const ordersByCityValues = Object.values(ordersPerCity);
const rightColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235,1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
];

const ordersByCityData = {
    labels: cityLabels,
    datasets: [
        {
            label: 'Orders per City',
            data: ordersByCityValues,
            backgroundColor: cityLabels.map((_, index) =>
                rightColors[index % rightColors.length]
            ),
        },
    ],
};
  const ordersByCityOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Orders by City' },
    },
  };

  // 2. Orders per Product (Bar Chart)
  const productNames = Object.keys(ordersPerProduct);
  const ordersPerProductValues = Object.values(ordersPerProduct);
  const ordersPerProductData = {
    labels: productNames,
    datasets: [
      {
        label: 'Units Sold per Product',
        data: ordersPerProductValues,
        backgroundColor: productNames.map(() => 'rgba(153, 102, 255, 0.99)'),
      },
    ],
  };
  const ordersPerProductOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Orders per Product' },
    },
  };

  // 3. Monthly Order Count (Line Chart)
  const monthsOrder = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthlyOrderDataValues = monthsOrder.map(
    (m) => monthlyOrderCounts[m] || 0
  );
  const monthlyOrdersData = {
    labels: monthsOrder,
    datasets: [
      {
        label: 'Order Count per Month',
        data: monthlyOrderDataValues,
        fill: false,
        borderColor: 'rgb(33, 128, 245)',
        tension: 0.1,
      },
    ],
  };
  const monthlyOrdersOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Order Count' },
    },
  };

  // 4. Payment Mode Distribution (Pie Chart)
  const paymentModeLabels = Object.keys(paymentModeCounts);
  const paymentModeValues = Object.values(paymentModeCounts);
const brightColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'
];

const paymentModeData = {
    labels: paymentModeLabels,
    datasets: [
        {
            label: 'Payment Mode Distribution',
            data: paymentModeValues,
            backgroundColor: paymentModeLabels.map(
                (_, index) => brightColors[index % brightColors.length]
            ),
        },
    ],
};
  const paymentModeOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Payment Mode Distribution',
      },
    },
  };

  // 5. Revenue per Category (Bar Chart)
  const categoryLabels = Object.keys(revenuePerCategory);
  const revenueValues = Object.values(revenuePerCategory);
const bbrightColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'
];

const revenuePerCategoryData = {
    labels: categoryLabels,
    datasets: [
        {
            label: 'Revenue per Category',
            data: revenueValues,
            backgroundColor: categoryLabels.map((_, index) => brightColors[index % bbrightColors.length]),
        },
    ],
};
  const revenuePerCategoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Revenue per Category',
      },
    },
  };

  return (
    <div className="home-container" style={{ padding: '20px' }}>
      <h2>Sales and Orders Dashboard</h2>

      <div className="totals">
        <h3>Total Income: ₹{totalIncome.toFixed(2)}</h3>
        <h3>Total Profit: ₹{totalProfit.toFixed(2)}</h3>
        <h3>Total Loss (Discount Loss): ₹{totalLoss.toFixed(2)}</h3>
      </div>

      <div className="trending-product">
        <h3>
          Trending Product: {trendingProduct} ({trendingCount} units sold)
        </h3>
      </div>

      <div className="chart-container" style={{ marginTop: '40px' }}>
        <div className="chart-box" style={{ marginBottom: '40px' }}>
          <Bar data={ordersByCityData} options={ordersByCityOptions} />
        </div>

        <div className="chart-box" style={{ marginBottom: '40px' }}>
          <Bar data={ordersPerProductData} options={ordersPerProductOptions} />
        </div>

        <div className="chart-box" style={{ marginBottom: '40px' }}>
          <Line data={monthlyOrdersData} options={monthlyOrdersOptions} />
        </div>

        <div className="chart-box" style={{ marginBottom: '40px' }}>
          <Pie data={paymentModeData} options={paymentModeOptions} />
        </div>

        <div className="chart-box" style={{ marginBottom: '40px' }}>
          <Bar data={revenuePerCategoryData} options={revenuePerCategoryOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;