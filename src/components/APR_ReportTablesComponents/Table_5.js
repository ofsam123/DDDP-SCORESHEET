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

const Table_5 = ({ year = 2024 }) => { // Default year set to 2024, adjustable via prop
  const tableData = [
    {
      department: "Education, Youth and Sports",
      totalProjects: 9,
      collaboratingDepartment: "Works",
      rollover: 4,
      new: 5,
    },
    {
      department: "Health",
      totalProjects: 5,
      collaboratingDepartment: "Works",
      rollover: 3,
      new: 2,
    },
    {
      department: "Works",
      totalProjects: 21,
      collaboratingDepartment: "",
      rollover: 13,
      new: 8,
    },
    {
      department: "Roads",
      totalProjects: 4,
      collaboratingDepartment: "Works",
      rollover: 2,
      new: 2,
    },
    {
      department: "Trade, Industry and Tourism",
      totalProjects: 5,
      collaboratingDepartment: "",
      rollover: 3,
      new: 2,
    },
    {
      department: "Works, Agric, BAC",
      totalProjects: 0,
      collaboratingDepartment: "",
      rollover: 0,
      new: 0,
    },
    {
      department: "Central Administration",
      totalProjects: 4,
      collaboratingDepartment: "Works",
      rollover: 4,
      new: 0,
    },
    {
      department: "Total",
      totalProjects: 48,
      collaboratingDepartment: "",
      rollover: 29,
      new: 19,
    },
  ];

  const chartData = {
    labels: tableData.map((row) => row.department),
    datasets: [
      {
        label: "Total Projects",
        data: tableData.map((row) => row.totalProjects),
        backgroundColor: "#007bff", // Blue for total projects
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
        text: `Distribution of Physical Projects among Departments, ${year}`,
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
      <h3>Table 5: Distribution of Physical projects among departments of the Assembly</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Departments</th>
                  <th colSpan="2" style={{ border: '1px solid #000', fontWeight: 'bold' }}>No. of projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Collaborating Department</th>
                </tr>
                <tr>
                  {/* <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th> */}
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Rollover</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>New</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover}</td>
                    <td style={{ border: '1px solid #000' }}>{row.new}</td>
                    <td style={{ border: '1px solid #000' }}>{row.totalProjects}</td>
                     <td style={{ border: '1px solid #000' }}>{row.collaboratingDepartment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: 2022, 2023, 2024 Progress Reports</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 5: Distribution of Physical Projects among Departments</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Table_5;