
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table2_3 = () => {
  // Revenue update data as provided
  const revenueData = [
    {
      revenueItem: "IGF",
      baseline2021: "5,338,851.75",
      target2022: "10,802,000.00",
      actual2022: "9,164,165.27",
      target2023: "15,139,209.00",
    },
    {
      revenueItem: "DACF",
      baseline2021: "603,272.00",
      target2022: "4,013,614.00",
      actual2022: "1,295,213.91",
      target2023: "2,126,825.00",
    },
    {
      revenueItem: "MP’s CF",
      baseline2021: "354,652.07",
      target2022: "600,000.00",
      actual2022: "520,777.15",
      target2023: "450,000.00",
    },
    {
      revenueItem: "PWD’s CF",
      baseline2021: "87,010.23",
      target2022: "200,000.00",
      actual2022: "194,732.31",
      target2023: "200,000.00",
    },
    {
      revenueItem: "DACF-RFG",
      baseline2021: "1,112,383.00",
      target2022: "1,953,335.00",
      actual2022: "1,174,498.30",
      target2023: "2,845,418.00",
    },
    {
      revenueItem: "DECENTRALISED DEPT",
      baseline2021: "59,257.06",
      target2022: "128,517.00",
      actual2022: "39,377.40",
      target2023: "89,000.00",
    },
    {
      revenueItem: "GOG SALARIES",
      baseline2021: "4,418,378.57",
      target2022: "4,556,991.00",
      actual2022: "4,785,537.85",
      target2023: "4,849,823.00",
    },
    {
      revenueItem: "MDF",
      baseline2021: "5,024,940.00",
      target2022: "6,800,000.00",
      actual2022: "8,792,482.00",
      target2023: "8,700,000.00",
    },
    {
      revenueItem: "STOOL LANDS",
      baseline2021: "748,755.50",
      target2022: "1,409,709.00",
      actual2022: "503,367.00",
      target2023: "1,390,709.00",
    },
    {
      revenueItem: "CIDA",
      baseline2021: "89,021.18",
      target2022: "63,011.00",
      actual2022: "63,010.66",
      target2023: "32,300.00",
    },
    {
      revenueItem: "TOTAL",
      baseline2021: "17,836,521.36",
      target2022: "30,527,177.00",
      actual2022: "26,533,161.85",
      target2023: "35,823,284.00",
    },
  ];

  // State for toggling chart visibility
  const [showChart, setShowChart] = useState(true);

  // Prepare data for Chart.js
  const chartData = {
    labels: revenueData.map((row) =>
      row.revenueItem === "DECENTRALISED DEPT"
        ? "DEC. DEPT"
        : row.revenueItem.length > 10
        ? row.revenueItem.substring(0, 8) + "..."
        : row.revenueItem
    ),
    datasets: [
      {
        label: "Baseline 2021 (GHȼ)",
        data: revenueData.map((row) => parseFloat(row.baseline2021.replace(/,/g, ""))),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Target 2022 (GHȼ)",
        data: revenueData.map((row) => parseFloat(row.target2022.replace(/,/g, ""))),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual 2022 (GHȼ)",
        data: revenueData.map((row) => parseFloat(row.actual2022.replace(/,/g, ""))),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Target 2023 (GHȼ)",
        data: revenueData.map((row) => parseFloat(row.target2023.replace(/,/g, ""))),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Updates (GHȼ)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-GH", {
                style: "currency",
                currency: "GHS",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Revenue Items",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (GHȼ)",
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-GH", {
              style: "currency",
              currency: "GHS",
              minimumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 2.3 – Revenue Updates</h3>
      <div className="card">
        <div className="card-header">Table 2.3 – Revenue Updates</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Revenue Item</th>
                  <th>Baseline 2021 (GHȼ)</th>
                  <th>Target 2022 (GHȼ)</th>
                  <th>Actual 2022 (GHȼ)</th>
                  <th>Target 2023 (GHȼ)</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.revenueItem}</td>
                    <td>{row.baseline2021}</td>
                    <td>{row.target2022}</td>
                    <td>{row.actual2022}</td>
                    <td>{row.target2023}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide Chart" : "Show Bar Graph"}
          </button>
          {showChart && (
            <div className="mt-4" style={{ height: "400px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table2_3;
