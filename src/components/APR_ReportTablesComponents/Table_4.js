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
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_4 = ({ year = 2024, district }) => { // Default year set to 2024, adjustable via prop
  const tableData = [
    {
      developmentDimension: "Economic Development",
      physicalProjects2022: 1,
      physicalProjects2023: 0,
      physicalProjects2024: 2,
      rollOver2022: 0,
      rollOver2023: 10,
      rollOver2024: 6,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 19,
    },
    {
      developmentDimension: "Social Development",
      physicalProjects2022: 3,
      physicalProjects2023: 5,
      physicalProjects2024: 20,
      rollOver2022: 3,
      rollOver2023: 10,
      rollOver2024: 11,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 52,
    },
    {
      developmentDimension: "Environment/Infrastructure/Human Settlement",
      physicalProjects2022: 0,
      physicalProjects2023: 2,
      physicalProjects2024: 5,
      rollOver2022: 1,
      rollOver2023: 26,
      rollOver2024: 3,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 37,
    },
    {
      developmentDimension: "Governance/Corruption/Public Accountability",
      physicalProjects2022: 0,
      physicalProjects2023: 1,
      physicalProjects2024: 1,
      rollOver2022: 4,
      rollOver2023: 0,
      rollOver2024: 0,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 6,
    },
    {
      developmentDimension: "Emergency",
      physicalProjects2022: 0,
      physicalProjects2023: 0,
      physicalProjects2024: 0,
      rollOver2022: 0,
      rollOver2023: 0,
      rollOver2024: 0,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 0,
    },
    {
      developmentDimension: "ICME",
      physicalProjects2022: 0,
      physicalProjects2023: 0,
      physicalProjects2024: 0,
      rollOver2022: 0,
      rollOver2023: 0,
      rollOver2024: 0,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 0,
    },
    {
      developmentDimension: "Total",
      physicalProjects2022: 4,
      physicalProjects2023: 8,
      physicalProjects2024: 28,
      rollOver2022: 8,
      rollOver2023: 46,
      rollOver2024: 20,
      newProjects2022: 0,
      newProjects2023: 0,
      newProjects2024: 0,
      total: 114,
    },
  ];

  const chartData = {
    labels: tableData.map((row) => row.developmentDimension),
    datasets: [
      {
        label: "Total Projects",
        data: tableData.map((row) => row.total),
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
        text: `Total Number of Active Projects by Development Dimension, ${year}`,
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
      <h3>Table 4: Total number of active projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                        tableCommentedId={`table4-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimension</th>
                  <th colSpan="3" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Physical Projects Total</th>
                  <th colSpan="3" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Roll over projects from previous years</th>
                  <th colSpan="3" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Approved new projects introduced in the year</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total</th>
                </tr>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2022</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2023</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2024</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2022</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2023</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2024</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2022</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2023</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>2024</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.developmentDimension}</td>
                    <td style={{ border: '1px solid #000' }}>{row.physicalProjects2022}</td>
                    <td style={{ border: '1px solid #000' }}>{row.physicalProjects2023}</td>
                    <td style={{ border: '1px solid #000' }}>{row.physicalProjects2024}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollOver2022}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollOver2023}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollOver2024}</td>
                    <td style={{ border: '1px solid #000' }}>{row.newProjects2022}</td>
                    <td style={{ border: '1px solid #000' }}>{row.newProjects2023}</td>
                    <td style={{ border: '1px solid #000' }}>{row.newProjects2024}</td>
                    <td style={{ border: '1px solid #000' }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: 2022, 2023, 2024 Progress Reports</small>
          </p>
           <APRComment
                  data={tableData}
                    year={year}
                 districtId={district}
               tableCommentedId={`table4-${year}`}
                               
                >
           {({ renderCommentInput, renderCommentList }) => (
                                  <>
               {renderCommentInput()}
              {renderCommentList()}
         </>
         )}
            </APRComment>

          {/* Bar Chart */}
          <h4>Figure 4: Total Number of Active Projects by Development Dimension</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Table_4;