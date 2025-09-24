import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_10 = (year = 2025, district) => {
  const tableData = [
    {
      budgetItem: "Compensation",
      "2021": { approved: 2310543.17, released: 1347816.82, expenditure: 1347816.82 },
      "2022": { approved: 2625297.49, released: 2625397.49, expenditure: 2625397.49 },
      "2023": { approved: 2998350.18, released: 2998350.18, expenditure: 2998350.18 },
      "2024": { approved: 2515200.00, released: 6372830.52, expenditure: 6372830.52 },
    },
    {
      budgetItem: "Goods and Services",
      "2021": { approved: 2451923.83, released: 178223.64, expenditure: 178223.64 },
      "2022": { approved: 1755830.55, released: 2981126.12, expenditure: 2981126.12 },
      "2023": { approved: 11599110.82, released: 3029832.16, expenditure: 3029832.16 },
      "2024": { approved: 5413947.18, released: 2868750.00, expenditure: 2868750.00 },
    },
    {
      budgetItem: "CAPEX",
      "2021": { approved: 3258000.00, released: 796767.94, expenditure: 796767.94 },
      "2022": { approved: 5763819.96, released: 703686.28, expenditure: 703686.28 },
      "2023": { approved: 1287571.00, released: 521964.72, expenditure: 521964.72 },
      "2024": { approved: 10272867.00, released: 4829464.64, expenditure: 4829464.64 },
    },
    {
      budgetItem: "Total",
      "2021": { approved: 8020467.00, released: 2322808.40, expenditure: 2322808.40 },
      "2022": { approved: 10144948.00, released: 6310209.89, expenditure: 6310209.89 },
      "2023": { approved: 15885032.00, released: 6550147.06, expenditure: 6550147.06 },
      "2024": { approved: 18202014.18, released: 14071045.16, expenditure: 14071045.16 },
    },
  ];

  const chartData = {
    labels: tableData.map(item => item.budgetItem),
    datasets: [
      {
        label: "Approved (GH¢)",
        data: tableData.map(item => item["2024"].approved),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Released (GH¢)",
        data: tableData.map(item => item["2024"].released),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
      {
        label: "Expenditure (GH¢)",
        data: tableData.map(item => item["2024"].expenditure),
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
        text: "Expenditure Overview for 2024",
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
      <h3>Table 10: Update on Expenditure as of the Year </h3>
      
      <div className="card">
        <div className="card-body">
             <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table10-${year}`}
          />
          <div className="table-responsive">
            <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}>
                <tr>
                  <th style={{ border: "1px solid #000" }} rowSpan="2">Budget Items</th>
                  {["2021", "2022", "2023", "2024"].map(year => (
                    <th key={year} style={{ border: "1px solid #000" }} colSpan="3">
                      {year}
                    </th>
                  ))}
                </tr>
                <tr>
                  {["2021", "2022", "2023", "2024"].flatMap(year => [
                    <th key={`${year}-approved`} style={{ border: "1px solid #000" }}>Approved</th>,
                    <th key={`${year}-released`} style={{ border: "1px solid #000" }}>Released</th>,
                    <th key={`${year}-expenditure`} style={{ border: "1px solid #000" }}>Expenditure</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.budgetItem}</td>
                    {["2021", "2022", "2023", "2024"].map(year => (
                      <>
                        <td style={{ border: "1px solid #000" }}>
                          {row[year].approved.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row[year].released.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row[year].expenditure.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Expenditure Report, 2021-2024</small>
          </p>
          
          {/* Bar Chart */}
          <h4>Figure 10: Expenditure Breakdown for 2024</h4>
          
            <Bar data={chartData} options={chartOptions} />
            <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table10-${year}`}
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

export default Table_10;