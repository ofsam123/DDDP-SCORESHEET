import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table1_1 = () => {
  // Table 1.1 data with sample percentage values
  const tableData = [
    {
      indicator: "Proportion of annual action plans implemented",
      baseline2021: "85",
      target2022: "90",
      actual2022: "88",
      target2023: "92",
    },
    {
      indicator: "A. Percentage completed",
      baseline2021: "70",
      target2022: "80",
      actual2022: "75",
      target2023: "85",
    },
    {
      indicator: "B. Percentage of on-going interventions",
      baseline2021: "15",
      target2022: "10",
      actual2022: "12",
      target2023: "8",
    },
    {
      indicator: "C. Percentage of interventions abandoned",
      baseline2021: "5",
      target2022: "3",
      actual2022: "4",
      target2023: "2",
    },
    {
      indicator: "D. Percentage of interventions yet to start",
      baseline2021: "10",
      target2022: "7",
      actual2022: "9",
      target2023: "5",
    },
    {
      indicator: "Proportion of the overall medium-term development plan implemented",
      baseline2021: "80",
      target2022: "85",
      actual2022: "82",
      target2023: "88",
    },
  ];

  // Pictorial evidence data
  const pictorialEvidence = [
    {
      url: "https://cdn1.img.sputniknews.africa/img/07e7/07/02/1060284138_451:0:3134:2012_1920x0_80_0_0_43d738a714a35edc0190c43cbaa47b86.jpg",
      caption: "Construction of Community Center - 2022",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegQFFElp18bejV_lABjBxFymQizmSFnbmBQ&s",
      caption: "Road Improvement Project - Phase 1",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ84AeJyjvmIiYJZaK5Nz3lTPHUFSJVKyuybw&s",
      caption: "School Renovation - Completed 2022",
    },
  ];

  // Data for the bar graph
  const chartData = {
    labels: tableData.map((row) => row.indicator.substring(0, 30) + (row.indicator.length > 30 ? "..." : "")), // Shorten labels for readability
    datasets: [
      {
        label: "Baseline 2021 (%)",
        data: tableData.map((row) => parseFloat(row.baseline2021) || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual 2022 (%)",
        data: tableData.map((row) => parseFloat(row.actual2022) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Implementation Status Comparison: 2021 vs 2022",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Indicators",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 1.1 – Proportion of the AAP and the MTDP Implemented</h3>
      <div className="card">
        <div className="card-header">Table 1.1 – Proportion of the AAP and the MTDP Implemented</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Indicators</th>
                  <th>Baseline 2021</th>
                  <th>Target 2022</th>
                  <th>Actual 2022</th>
                  <th>Target 2023</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.indicator}</td>
                    <td>{row.baseline2021 ? `${row.baseline2021}%` : "N/A"}</td>
                    <td>{row.target2022 ? `${row.target2022}%` : "N/A"}</td>
                    <td>{row.actual2022 ? `${row.actual2022}%` : "N/A"}</td>
                    <td>{row.target2023 ? `${row.target2023}%` : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU-TNMA</small>
          </p>
          <hr />
          <h5>Pictorial Evidence of Projects under Implementation</h5>
          {pictorialEvidence.length > 0 ? (
            <div className="row">
              {pictorialEvidence.map((image, index) => (
                <div className="col-md-4 col-sm-6 mb-3" key={index}>
                  <div className="card">
                    <img
                      src={image.url}
                      className="card-img-top"
                      alt={image.caption}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="card-text">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pictorial evidence available.</p>
          )}
          <hr />
          <h5>Comparison of Implementation Status: 2021 vs 2022</h5>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions}
            
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table1_1;