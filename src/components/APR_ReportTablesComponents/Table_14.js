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
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Table14 Component
const Table_14 = ({ year,district }) => { // Updated to 2025 as per current date
  const tableData = [
    { sector: "Education", capitalEnvelope: 1504679.80, rollover: 160113.12, newProjects: 1344566.68 },
    { sector: "Health", capitalEnvelope: 487609.96, rollover: 487609.96, newProjects: 0.00 },
    { sector: "Water and Sanitation", capitalEnvelope: 734089.85, rollover: 507392.45, newProjects: 226697.40 },
    { sector: "Roads and Transport", capitalEnvelope: 406659.09, rollover: 406659.09, newProjects: 0.00 },
    { sector: "Trade, Industry and Tourism", capitalEnvelope: 819695.48, rollover: 819695.48, newProjects: 0.00 },
    { sector: "Security", capitalEnvelope: 0.00, rollover: 0.00, newProjects: 0.00 },
    { sector: "Governance", capitalEnvelope: 0.00, rollover: 0.00, newProjects: 0.00 },
    { sector: "Total", capitalEnvelope: 3952741.18, rollover: 2381470.10, newProjects: 1571264.08 }
  ];

  const chartData = {
    labels: tableData.map((row) => row.sector),
    datasets: [
      {
        label: "Capital Envelope Amount",
        data: tableData.map((row) => row.capitalEnvelope),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Amount Spent on Rollover Projects",
        data: tableData.map((row) => row.rollover),
        backgroundColor: "#ff9800",
        borderColor: "#e07a00",
        borderWidth: 1,
      },
      {
        label: "Amount Spent on New Projects",
        data: tableData.map((row) => row.newProjects),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
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
        text: `Capital Envelope Spending Analysis, ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (GHS)",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 14: Amount of capital envelope spent on active projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
            
             <APRmemo
                    year={year}
                    districtId = {district}
                     tableCommentedId={`table14-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Sector</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Capital envelope amount</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount spent on rollover projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount spent on new projects</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.sector}</td>
                    <td style={{ border: '1px solid #000' }}>{row.capitalEnvelope.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.newProjects.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Payment Vouchers & Trial Balance, {year}</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 9: Capital Envelope Spending Analysis, {year}</h4>
          <Bar data={chartData} options={chartOptions} />
           <APRComment
                      data={tableData}
                      year={year}
                      districtId={district}
                      tableCommentedId={`table14-${year}`}
                     
                    >
                      {({ renderCommentInput, renderCommentList }) => (
                        <>
                          {renderCommentInput()}
                          {renderCommentList()}
                        </>
                      )}
                    </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table_14;