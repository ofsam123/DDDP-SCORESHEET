import React, { forwardRef, useImperativeHandle } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_12 = forwardRef(({year, district, hideTableDis}, ref) => {
  const tableData = {
    throwForward: [
      {
        category: "Land acquisition and resettlement",
        mtbpPeriod: "2022-2025",
        totalMTDPEstimate: 5000000.00,
        annualEstimate2025: 1500000.00,
        annualEstimate2024: 1250000.00,
        annualCeiling2025: 1400000.00,
        annualCeiling2024: 1200000.00,
        approvedReleased2024: 1150000.00,
        expenditure2024: 1100000.00,
      },
    ],
    projects: [
      {
        projectCode: "CAP-001",
        name: "Road Rehabilitation Project",
        age: 2,
        originalEstimatedCost: 2000000.00,
        revisedCost: 2100000.00,
        expenditureToDate: 1800000.00,
        completionStatus: "75%",
        timeOverruns: 3,
        costOverruns: 100000.00,
      },
      {
        projectCode: "CAP-002",
        name: "School Construction",
        age: 1,
        originalEstimatedCost: 1500000.00,
        revisedCost: 1550000.00,
        expenditureToDate: 1200000.00,
        completionStatus: "60%",
        timeOverruns: 2,
        costOverruns: 50000.00,
      },
    ],
  };

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_12",
      tableData
    }),
  }));

  const chartData = {
    labels: tableData.projects.map(project => project.name.substring(0, 15) + "..."),
    datasets: [
      {
        label: "Original Estimated Cost (GH¢)",
        data: tableData.projects.map(project => project.originalEstimatedCost),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Revised Cost (GH¢)",
        data: tableData.projects.map(project => project.revisedCost),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
      {
        label: "Expenditure to Date (GH¢)",
        data: tableData.projects.map(project => project.expenditureToDate),
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
        text: "CAPEX Budget Allocation and Implementation, 2024",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (GH¢)",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 12: CAPEX Budget Allocation and Implementation of Active Projects</h3>
      <div className="card">
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table12-${year}`}
            hideTableDis={hideTableDis}
          />
          <div className="table-responsive">
            {/* Multi-year CAPEX Throw Forward Section */}
            <h4>Multi-year CAPEX Throw Forward</h4>
            <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}>
                <tr>
                  <th style={{ border: "1px solid #000" }} rowSpan="2">MTBF Envelope</th>
                  <th style={{ border: "1px solid #000" }} rowSpan="2">Performance</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Total MTDP Estimate (Plan)</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Annual Estimate</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Annual Ceilings</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Approved/Released</th>
                  <th style={{ border: "1px solid #000" }} rowSpan="2">Expenditure</th>
                </tr>
                <tr>
                  <th style={{ border: "1px solid #000" }}>2025</th>
                  <th style={{ border: "1px solid #000" }}>2024</th>
                  <th style={{ border: "1px solid #000" }}>2025</th>
                  <th style={{ border: "1px solid #000" }}>2024</th>
                  <th style={{ border: "1px solid #000" }}>2025</th>
                  <th style={{ border: "1px solid #000" }}>2024</th>
                  <th style={{ border: "1px solid #000" }}>2025</th>
                  <th style={{ border: "1px solid #000" }}>2024</th>
                </tr>
              </thead>
              <tbody>
                {tableData.throwForward.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.category} ({row.mtbpPeriod})</td>
                    <td style={{ border: "1px solid #000" }}>Details of Capital Projects, 2024</td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.totalMTDPEstimate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.annualEstimate2024.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.annualEstimate2025.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.annualCeiling2024.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.annualCeiling2025.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.approvedReleased2024.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>0.00</td> {/* Placeholder for 2025 Approved/Released */}
                    <td style={{ border: "1px solid #000" }}>
                      {row.expenditure2024.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Details of Capital Projects Section */}
            <h4>Details of Capital Projects, 2024</h4>
            <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}>
                <tr>
                  <th style={{ border: "1px solid #000" }}>Project Code</th>
                  <th style={{ border: "1px solid #000" }}>Name</th>
                  <th style={{ border: "1px solid #000" }}>Age (Year)</th>
                  <th style={{ border: "1px solid #000" }}>Original Estimated Cost</th>
                  <th style={{ border: "1px solid #000" }}>Revised Cost</th>
                  <th style={{ border: "1px solid #000" }}>Expenditure to date</th>
                  <th style={{ border: "1px solid #000" }}>Completion Status</th>
                  <th style={{ border: "1px solid #000" }}>Time Overruns</th>
                  <th style={{ border: "1px solid #000" }}>Cost Overruns</th>
                </tr>
              </thead>
              <tbody>
                {tableData.projects.map((project, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{project.projectCode}</td>
                    <td style={{ border: "1px solid #000" }}>{project.name}</td>
                    <td style={{ border: "1px solid #000" }}>{project.age}</td>
                    <td style={{ border: "1px solid #000" }}>
                      {project.originalEstimatedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {project.revisedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {project.expenditureToDate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>{project.completionStatus}</td>
                    <td style={{ border: "1px solid #000" }}>{project.timeOverruns} months</td>
                    <td style={{ border: "1px solid #000" }}>
                      {project.costOverruns.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: CAPEX Implementation Report, 2024</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 12: CAPEX Project Cost Analysis, 2024</h4>

          <Bar data={chartData} options={chartOptions} />
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table12-${year}`}
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
});

export default Table_12;