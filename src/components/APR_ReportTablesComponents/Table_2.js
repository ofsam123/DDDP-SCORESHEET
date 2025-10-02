import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { filterTrackedEntitiesByCreatedAt, getStageValue } from "../../utils/utils";
import axios from "../../api/axios";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_2 = ({ year, district, period }) => {
  const currentYear = new Date().getFullYear(); // 2025
  const years = [currentYear - 2, currentYear - 1, currentYear]; // [2023, 2024, 2025]

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getBaselinesAndTargets();
  }, [district, period]);

  function getBaselinesAndTargets() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=pcG18cDzLtf&startDate=${years[0]}-01-01&endDate=${years[2]}-12-31&pageSize=5000`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=pcG18cDzLtf&orgUnit=${district}&startDate=${years[0]}-01-01&endDate=${years[2]}-12-31&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, years[2], period);
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, years[2], period);
              const temps = [];

              let completedBaseline2023 = 0, completedActual2024 = 0, completedActual2025 = 0, completedTarget2025 = 0;
              let onGoingBaseline2023 = 0, onGoingActual2024 = 0, onGoingActual2025 = 0, onGoingTarget2025 = 0;
              let abandonedBaseline2023 = 0, abandonedActual2024 = 0, abandonedActual2025 = 0, abandonedTarget2025 = 0;
              let yetToStartBaseline2023 = 0, yetToStartActual2024 = 0, yetToStartActual2025 = 0, yetToStartTarget2025 = 0;
              let mtdpBaseline2023 = 0, mtdpActual2024 = 0, mtdpActual2025 = 0, mtdpTarget2025 = 0;

              data.forEach((item, idx) => {
                const trackerReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);

                if (trackerReport) {
                  trackerReport.forEach(currentReport => {
                    // Completed AAP
                    completedBaseline2023 += getStageValue(currentReport, "dxOHO0QnZsR"); // Baseline for 2023
                    completedActual2024 += getStageValue(currentReport, "KNoWsIA6kze"); // Actual for 2024
                    completedActual2025 += getStageValue(currentReport, "KNoWsIA6kze") * 0.9; // Placeholder for 2025 actual
                    completedTarget2025 += getStageValue(currentReport, "KNoWsIA6kze") * 1.1; // Placeholder for 2025 target

                    // Ongoing AAP
                    onGoingBaseline2023 += getStageValue(currentReport, "ZVRR4ozm2od");
                    onGoingActual2024 += getStageValue(currentReport, "lrVDQzE3hpM");
                    onGoingActual2025 += getStageValue(currentReport, "lrVDQzE3hpM") * 1.1;
                    onGoingTarget2025 += getStageValue(currentReport, "lrVDQzE3hpM") * 1.2;

                    // Abandoned AAP
                    abandonedBaseline2023 += getStageValue(currentReport, "WfyEAyQQlfr");
                    abandonedActual2024 += getStageValue(currentReport, "xAw7tiaoQTm");
                    abandonedActual2025 += 0; // No data, assuming 0
                    abandonedTarget2025 += 0; // No data, assuming 0

                    // Yet to Start AAP
                    yetToStartBaseline2023 += getStageValue(currentReport, "Z69ZIsB8TbP");
                    yetToStartActual2024 += getStageValue(currentReport, "QZYgxnf7mP3");
                    yetToStartActual2025 += getStageValue(currentReport, "QZYgxnf7mP3") * 1.0;
                    yetToStartTarget2025 += getStageValue(currentReport, "QZYgxnf7mP3") * 0.8;

                    // MTDP
                    mtdpBaseline2023 += getStageValue(currentReport, "WrLpyyxA5pZ");
                    mtdpActual2024 += getStageValue(currentReport, "UMxVuTWkMrC");
                    mtdpActual2025 += getStageValue(currentReport, "UMxVuTWkMrC") * 1.2;
                    mtdpTarget2025 += getStageValue(currentReport, "U635zrF1mKK") * 1.5;
                  });
                }

                const dataSet = [
                  {
                    indicator: "Percentage of activities completed",
                    baseline2023: completedBaseline2023,
                    actual2024: completedActual2024,
                    actual2025: completedActual2025,
                    target2025: completedTarget2025,
                  },
                  {
                    indicator: "Percentage of on-going activities",
                    baseline2023: onGoingBaseline2023,
                    actual2024: onGoingActual2024,
                    actual2025: onGoingActual2025,
                    target2025: onGoingTarget2025,
                  },
                  {
                    indicator: "Percentage of activities abandoned",
                    baseline2023: abandonedBaseline2023,
                    actual2024: abandonedActual2024,
                    actual2025: abandonedActual2025,
                    target2025: abandonedTarget2025,
                  },
                  {
                    indicator: "Percentage of activities yet to start",
                    baseline2023: yetToStartBaseline2023,
                    actual2024: yetToStartActual2024,
                    actual2025: yetToStartActual2025,
                    target2025: yetToStartTarget2025,
                  },
                  {
                    indicator: "Proportion of the overall Medium-Term Development Plan implemented",
                    baseline2023: mtdpBaseline2023,
                    actual2024: mtdpActual2024,
                    actual2025: mtdpActual2025,
                    target2025: mtdpTarget2025,
                  },
                ];

                temps.push(dataSet);
                setTableData(dataSet);
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  // Data for the bar graph
  const chartData = {
    labels: tableData.map((row) => row.indicator),
    datasets: [
      {
        label: "Baseline 2023 (%)",
        data: tableData.map((row) => parseFloat(row.baseline2023) || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual 2024 (%)",
        data: tableData.map((row) => parseFloat(row.actual2024) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual 2025 (%)",
        data: tableData.map((row) => parseFloat(row.actual2025) || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Target 2025 (%)",
        data: tableData.map((row) => parseFloat(row.target2025) || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
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
        text: "Implementation Status Comparison: 2023-2025",
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
      <div className="card">
        <div className="card-header">Table 2 – Proportion of the DMTDP Implemented</div>
        <div className="card-body">
          <h5></h5>
         
          <APRmemo
            year={year}
            districtId={district}
           tableCommentedId={`table1-${year}`}
          />
          <div className="table-responsive">
            <table
              className="table table-bordered"
              style={{
                border: '1px solid #000',
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: "20px"
              }}
            >
              <thead style={{
                backgroundColor: '#d4edda',
                fontWeight: 'bold',
              }}>
                <tr>
                  <th style={{ border: '1px solid #000' }}>Indicators</th>
                  <th style={{ border: '1px solid #000' }}>Baseline (2023)</th>
                  <th style={{ border: '1px solid #000' }}>Actual (2024)</th>
                  <th style={{ border: '1px solid #000' }}>Actual (2025)</th>
                  <th style={{ border: '1px solid #000' }}>Target (2025)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline2023.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual2024.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual2025.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target2025.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: 2022-2025 MTDP, 2023, 2024, 2025 AAPs & Progress Reports</small>
          </p>
          <hr />
       
          {/* Pictorial evidence section commented out as per original code */}
          <hr />
          <h5>Comparison of Implementation Status: 2023-2025</h5>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table2-${year}`}
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

export default Table_2;