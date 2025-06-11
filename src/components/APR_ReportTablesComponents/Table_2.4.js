
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

const Table2_4 = () => {
  // Disbursement update data as provided
  const disbursementData = [
    {
      expenditureItem: "COMPENSATION",
      baseline2021: "5,131,254.91",
      target2022: "5,485,952.00",
      actual2022: "5,435,057.13",
      target2023: "5,984,823.00",
    },
    {
      expenditureItem: "GOODS AND SERVICES",
      baseline2021: "9,491,368.27",
      target2022: "13,475,360.00",
      actual2022: "13,962,273.65",
      target2023: "15,087,967.00",
    },
    {
      expenditureItem: "INVESTMENTS/ ASSETS",
      baseline2021: "2,290,934.66",
      target2022: "11,565,865.00",
      actual2022: "5,645,814.35",
      target2023: "13,359,785.00",
    },
    {
      expenditureItem: "TOTAL",
      baseline2021: "16,913,557.84",
      target2022: "30,527,177.00",
      actual2022: "25,320,798.32",
      target2023: "34,432,575.00",
    },
  ];

  // State for toggling chart visibility
  const [showChart, setShowChart] = useState(true);

  // Data for Figure 2.3: Revenue, Expenditure, and Surplus (2022)
  const chartData = {
    labels: ["2022"],
    datasets: [
      {
        label: "Revenue (2022) (GHȼ)",
        data: [26533161.85], // From Table 2.3 TOTAL, Actual 2022
        backgroundColor: "rgba(255, 215, 0, 0.6)", // Yellow (approximating image color)
        borderColor: "rgba(255, 215, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenditure (2022) (GHȼ)",
        data: [25320798.32], // From Table 2.4 TOTAL, Actual 2022
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red (approximating image color)
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Surplus (GHȼ)",
        data: [1212363.53], // Revenue - Expenditure
        backgroundColor: "rgba(0, 128, 0, 0.6)", // Green (approximating image color)
        borderColor: "rgba(0, 128, 0, 1)",
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
        text: "Figure 2.3 – Total Receipt against Total Expenditure",
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
          text: "Year",
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
        suggestedMin: 0, // Start from 0 to match image
        suggestedMax: 30000000, // End around 30M to match image
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 2.4 – Update of Disbursement</h3>
      <div className="card">
        <div className="card-header">Table 2.4 – Update of Disbursement</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Expenditure Item</th>
                  <th>Baseline 2021 (GHȼ)</th>
                  <th>Target 2022 (GHȼ)</th>
                  <th>Actual 2022 (GHȼ)</th>
                  <th>Target 2023 (GHȼ)</th>
                </tr>
              </thead>
              <tbody>
                {disbursementData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.expenditureItem}</td>
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
          <h4 className="mt-4">Figure 2.3 – Total Receipt against Total Expenditure</h4>
          <p>Figure 2.3 compares total receipts against total disbursement during the year under review.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide Figure 2.3" : "Show Figure 2.3"}
          </button>
          {showChart && (
            <div className="mt-4" style={{ height: "300px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table2_4;
