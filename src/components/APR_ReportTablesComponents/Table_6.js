import React from "react";
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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_6 = ({ year = 2025 }) => { // Default year set to 2025, adjustable via prop
  const tableData = [
    {
      projectAge: "Projects that are 20yrs but less than 24 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 11 years but less than 18 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 10 years but less than 11 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 9 years but less than 10 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 8 years but less than 9 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that 7 years but less than 8 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that 6 years but less than 7 years",
      noOfProjects: 1,
      timeOverruns: "6 years, 4 months",
      costOverruns: 101428.00,
      completionStatus: 79,
      avgCompletionRate: 79,
      highest: 79,
      least: 79,
    },
    {
      projectAge: "Projects that are 5 years but less than 6 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 4 years but less than 5 years",
      noOfProjects: 4,
      timeOverruns: "4 years, 2 months",
      costOverruns: 0.00,
      completionStatus: 60,
      avgCompletionRate: 60,
      highest: 60,
      least: 60,
    },
    {
      projectAge: "Projects that are 3 years but less than 4 years",
      noOfProjects: "N/A*",
      timeOverruns: "N/A*",
      costOverruns: "N/A*",
      completionStatus: "N/A*",
      avgCompletionRate: "N/A*",
      highest: "N/A*",
      least: "N/A*",
    },
    {
      projectAge: "Projects that are 2 years but less 3 years",
      noOfProjects: 1,
      timeOverruns: "2 years, 10 months",
      costOverruns: 0.00,
      completionStatus: 65,
      avgCompletionRate: 65,
      highest: 65,
      least: 65,
    },
    {
      projectAge: "Projects that are 1 year but less than 2 years",
      noOfProjects: 1,
      timeOverruns: "1 year, 11 months",
      costOverruns: 128343.00,
      completionStatus: 65,
      avgCompletionRate: 65,
      highest: 65,
      least: 65,
    },
  ];

  const chartData = {
    labels: tableData.map((row) => row.projectAge.substring(0, 20) + '...'), // Truncate for labels
    datasets: [
      {
        label: "No. of Projects",
        data: tableData.map((row) => (row.noOfProjects === "N/A*" ? 0 : row.noOfProjects)),
        backgroundColor: "#007bff", // Blue for number of projects
        borderColor: "#0056b3",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Project Age Analysis, ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Projects",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 6: Project Age Analysis</h3>
      <div className="card">
        <div className="card-header"></div>
        <div class="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Project Age</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No. of Projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Time Overruns (in years and months)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Cost Overruns</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Completion Status</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Average Completion Rate (%)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Highest (%)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Least (%)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.projectAge}</td>
                    <td style={{ border: '1px solid #000' }}>{row.noOfProjects}</td>
                    <td style={{ border: '1px solid #000' }}>{row.timeOverruns}</td>
                    <td style={{ border: '1px solid #000' }}>{row.costOverruns === "N/A*" ? "N/A*" : row.costOverruns.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.completionStatus === "N/A*" ? "N/A*" : `${row.completionStatus}%`}</td>
                    <td style={{ border: '1px solid #000' }}>{row.avgCompletionRate === "N/A*" ? "N/A*" : `${row.avgCompletionRate}%`}</td>
                    <td style={{ border: '1px solid #000' }}>{row.highest === "N/A*" ? "N/A*" : `${row.highest}%`}</td>
                    <td style={{ border: '1px solid #000' }}>{row.least === "N/A*" ? "N/A*" : `${row.least}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Not specified</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 6: Project Age Analysis</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Table_6;