import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_11 = (year = 2025, district) => {
  const tableData = [
    {
      item: "GoG",
      unconstrained: 15837367.10,
      constrained: 8139057.19,
      released: 4558617.69,
      expenditure: 4558617.69,
      variationAB: 7698309.90,
      variationBC: 3580439.50,
      variationCD: 0.00,
    },
    {
      item: "IGF",
      unconstrained: 125000.00,
      constrained: 115000.00,
      released: 65000.00,
      expenditure: 65000.00,
      variationAB: 10000.00,
      variationBC: 50000.00,
      variationCD: 0.00,
    },
    {
      item: "Donor",
      unconstrained: 0.00,
      constrained: 0.00,
      released: 0.00,
      expenditure: 0.00,
      variationAB: 0.00,
      variationBC: 0.00,
      variationCD: 0.00,
    },
    {
      item: "Total",
      unconstrained: 15962367.10,
      constrained: 8254057.19,
      released: 4623617.69,
      expenditure: 4623617.69,
      variationAB: 7708309.90,
      variationBC: 3630439.50,
      variationCD: 0.00,
    },
  ];

  const chartData = {
    labels: tableData.map(item => item.item),
    datasets: [
      {
        label: "Unconstrained Estimate (GH¢)",
        data: tableData.map(item => item.unconstrained),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Constrained Estimate (GH¢)",
        data: tableData.map(item => item.constrained),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
      {
        label: "Released (GH¢)",
        data: tableData.map(item => item.released),
        backgroundColor: "#ffc107",
        borderColor: "#d39e00",
        borderWidth: 1,
      },
      {
        label: "Expenditure (GH¢)",
        data: tableData.map(item => item.expenditure),
        backgroundColor: "#dc3545",
        borderColor: "#bd2130",
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
        text: "CAPEX Budget Performance Analysis, 2024",
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
      <h3>Table 11: CAPEX Budget Performance Analysis, 2024</h3>
      <div className="card">
        <div className="card-body">
           <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table11-${year}`}
          />
          <div className="table-responsive">
            <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}>
                <tr>
                  <th style={{ border: "1px solid #000" }}>Item</th>
                  <th style={{ border: "1px solid #000" }}>Estimate</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Released</th>
                  <th style={{ border: "1px solid #000" }}>Expenditure</th>
                  <th style={{ border: "1px solid #000" }} colSpan="3">Variation</th>
                </tr>
                <tr>
                  <th style={{ border: "1px solid #000" }}></th>
                  <th style={{ border: "1px solid #000" }}>Unconstrained (A)</th>
                  <th style={{ border: "1px solid #000" }}>Constrained (B)</th>
                  <th style={{ border: "1px solid #000" }}>(C)</th>
                  <th style={{ border: "1px solid #000" }}>(D)</th>
                  <th style={{ border: "1px solid #000" }}>(A-B)</th>
                  <th style={{ border: "1px solid #000" }}>(B-C)</th>
                  <th style={{ border: "1px solid #000" }}>(C-D)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.item}</td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.unconstrained.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.constrained.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.released.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.expenditure.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.variationAB.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.variationBC.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.variationCD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: CAPEX Budget Report, 2024</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 11: CAPEX Budget Performance, 2024</h4>
        
            <Bar data={chartData} options={chartOptions} />
            <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table11-${year}`}
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

export default Table_11;