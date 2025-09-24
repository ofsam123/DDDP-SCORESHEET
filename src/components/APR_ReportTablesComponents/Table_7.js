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

const Table_7 = ({ year = 2024, district }) => { // Default year set to 2024, adjustable via prop
  const tableData = [
    {
      sn: 1,
      assetInfrastructure: "Road Network (Main Road)",
      location: "Nkwanta Central",
      typeOfMaintenance: "Repair",
      estimatedCost: 150000.00,
      actualRelease: 120000.00,
      gap: 30000.00,
      expenditure: 118000.00,
      recommendation: "Allocate additional funds for full repair",
    },
    {
      sn: 2,
      assetInfrastructure: "School Building",
      location: "Kete Krachi",
      typeOfMaintenance: "Maintenance",
      estimatedCost: 80000.00,
      actualRelease: 70000.00,
      gap: 10000.00,
      expenditure: 68000.00,
      recommendation: "Prioritize roof repairs in next budget",
    },
    {
      sn: 3,
      assetInfrastructure: "Market Shed",
      location: "Dambai",
      typeOfMaintenance: "Rehabilitation",
      estimatedCost: 50000.00,
      actualRelease: 45000.00,
      gap: 5000.00,
      expenditure: 44000.00,
      recommendation: "Engage local contractors for cost efficiency",
    },
    {
      sn: 4,
      assetInfrastructure: "Borehole",
      location: "Chinderi",
      typeOfMaintenance: "Repair",
      estimatedCost: 25000.00,
      actualRelease: 20000.00,
      gap: 5000.00,
      expenditure: 19500.00,
      recommendation: "Secure grants for water infrastructure",
    },
  ];

  const chartData = {
    labels: tableData.map((row) => row.assetInfrastructure.substring(0, 15) + '...'), // Truncate for labels
    datasets: [
      {
        label: "Estimated Cost (GHS)",
        data: tableData.map((row) => row.estimatedCost),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Actual Release (GHS)",
        data: tableData.map((row) => row.actualRelease),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
      {
        label: "Expenditure (GHS)",
        data: tableData.map((row) => row.expenditure),
        backgroundColor: "#ffc107",
        borderColor: "#d39e00",
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
        text: `Repair and Maintenance of Existing Infrastructure, ${year}`,
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
      <h3>Table 7: Repair and maintenance of Existing Infrastructure</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                        tableCommentedId={`table7-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>S/N</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Asset/Infrastructure</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Location</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Type of Maintenance</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Estimated Cost</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual Release</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Gap</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expenditure</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.sn}</td>
                    <td style={{ border: '1px solid #000' }}>{row.assetInfrastructure}</td>
                    <td style={{ border: '1px solid #000' }}>{row.location}</td>
                    <td style={{ border: '1px solid #000' }}>{row.typeOfMaintenance}</td>
                    <td style={{ border: '1px solid #000' }}>{row.estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualRelease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.gap.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expenditure.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Infrastructure Maintenance Report, {year}</small>
          </p>
           
          {/* Bar Chart */}
          <h4>Figure 7: Repair and Maintenance Cost Analysis, {year}</h4>
          <Bar data={chartData} options={chartOptions} />
           <APRComment
                  data={tableData}
                    year={year}
                 districtId={district}
               tableCommentedId={`table7-${year}`}
                               
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

export default Table_7;