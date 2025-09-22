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

const Table_20 = ({ year, district}) => {
  const tableData = [
    {
      item: "Computers",
      required: 24,
      actual: 12,
      remarks:
        "Gap needs to be bridged in order to ensure effective and efficient service delivery",
    },
    {
      item: "Printers",
      required: 13,
      actual: 10,
      remarks:
        "Gap needs to be bridged in order to ensure effective and efficient service delivery",
    },
    {
      item: "Projectors",
      required: 2,
      actual: 1,
      remarks:
        "Gap needs to be bridged in order to ensure effective and efficient service delivery",
    },
    {
      item: "Office Space",
      required: 11,
      actual: 11,
      remarks:
        "Gap needs to be bridged in order to ensure effective and efficient service delivery",
    },
    {
      item: "Vehicle",
      required: 14,
      actual: 4,
      remarks:
        "Gap needs to be bridged in order to ensure effective and efficient service delivery",
    },
  ];

  const chartData = {
    labels: tableData.map((row) => row.item),
    datasets: [
      {
        label: "Required",
        data: tableData.map((row) => row.required),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: tableData.map((row) => row.actual),
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
        text: `Logistic Analysis, ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        title: {
          display: true,
          text: "Number",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 20: Logistics Analysis</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                                year={year}
                                districtId = {district}
                                 tableCommentedId={`table20-${year}`}
                               
                              />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead
                style={{
                  backgroundColor: "#d4edda",
                  fontWeight: "bold",
                  border: "1px solid #000",
                }}
              >
                <tr>
                  <th style={{ border: "1px solid #000", fontWeight: "bold" }}>
                    Item
                  </th>
                  <th style={{ border: "1px solid #000", fontWeight: "bold" }}>
                    Required
                  </th>
                  <th style={{ border: "1px solid #000", fontWeight: "bold" }}>
                    Actual
                  </th>
                  <th style={{ border: "1px solid #000", fontWeight: "bold" }}>
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.item}</td>
                    <td style={{ border: "1px solid #000" }}>{row.required}</td>
                    <td style={{ border: "1px solid #000" }}>{row.actual}</td>
                    <td style={{ border: "1px solid #000" }}>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>
              Source: Fixed Asset Register & HR Department Report, {year}
            </small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 8: Logistic Analysis, {year}</h4>
          <Bar data={chartData} options={chartOptions} />

           <APRComment
                      data={tableData}
                      year={year}
                      districtId={district}
                      tableCommentedId={`table20-${year}`}
                     
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

export default Table_20;
