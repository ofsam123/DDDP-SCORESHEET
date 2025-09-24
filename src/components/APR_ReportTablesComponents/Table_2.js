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
  const [tableData, setTableData] = useState([]);
  const currentYear = new Date().getFullYear(); // 2025
  const years = [currentYear - 2, currentYear - 1, currentYear]; // [2023, 2024, 2025]

  useEffect(() => {
    getBaselinesAndTargets();
  }, [year, district, period]);

  function getBaselinesAndTargets() {
    const startDate = `${years[0]}-01-01`;
    const endDate = `${years[2]}-12-31`;

    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=pcG18cDzLtf&startDate=${startDate}&endDate=${endDate}&pageSize=5000`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=pcG18cDzLtf&orgUnit=${district}&startDate=${startDate}&endDate=${endDate}&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const temps = [];

              data.forEach((item, idx) => {
                const trackerReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);

                let completedBaseline = 0, completedActualPrev = 0, completedActualCurr = 0, completedTarget = 0, completedActualNext = 0;
                let onGoingBaseline = 0, onGoingActualPrev = 0, onGoingActualCurr = 0, onGoingTarget = 0, onGoingActualNext = 0;
                let abandonedBaseline = 0, abandonedActualPrev = 0, abandonedActualCurr = 0, abandonedTarget = 0, abandonedActualNext = 0;
                let yetToStartBaseline = 0, yetToStartActualPrev = 0, yetToStartActualCurr = 0, yetToStartTarget = 0, yetToStartActualNext = 0;
                let mtdpBaseline = 0, mtdpActualPrev = 0, mtdpActualCurr = 0, mtdpTarget = 0, mtdpActualNext = 0;

                if (trackerReport && trackerReport.length > 0) {
                  trackerReport.forEach(currentReport => {
                    // Completed AAP
                    completedBaseline += getStageValue(currentReport, "dxOHO0QnZsR", years[0]) || 0;
                    completedActualPrev += getStageValue(currentReport, "dxOHO0QnZsR", years[1]) || 0;
                    completedActualCurr += getStageValue(currentReport, "dxOHO0QnZsR", years[2]) || 0;
                    completedTarget += getStageValue(currentReport, "KNoWsIA6kze", years[2]) || 0;
                    completedActualNext += getStageValue(currentReport, "dxOHO0QnZsR", years[2] + 1) || 0;

                    // Ongoing AAP
                    onGoingBaseline += getStageValue(currentReport, "ZVRR4ozm2od", years[0]) || 0;
                    onGoingActualPrev += getStageValue(currentReport, "ZVRR4ozm2od", years[1]) || 0;
                    onGoingActualCurr += getStageValue(currentReport, "ZVRR4ozm2od", years[2]) || 0;
                    onGoingTarget += getStageValue(currentReport, "lrVDQzE3hpM", years[2]) || 0;
                    onGoingActualNext += getStageValue(currentReport, "ZVRR4ozm2od", years[2] + 1) || 0;

                    // Abandoned AAP
                    abandonedBaseline += getStageValue(currentReport, "WfyEAyQQlfr", years[0]) || 0;
                    abandonedActualPrev += getStageValue(currentReport, "WfyEAyQQlfr", years[1]) || 0;
                    abandonedActualCurr += getStageValue(currentReport, "WfyEAyQQlfr", years[2]) || 0;
                    abandonedTarget += getStageValue(currentReport, "xAw7tiaoQTm", years[2]) || 0;
                    abandonedActualNext += getStageValue(currentReport, "WfyEAyQQlfr", years[2] + 1) || 0;

                    // Yet to Start AAP
                    yetToStartBaseline += getStageValue(currentReport, "Z69ZIsB8TbP", years[0]) || 0;
                    yetToStartActualPrev += getStageValue(currentReport, "Z69ZIsB8TbP", years[1]) || 0;
                    yetToStartActualCurr += getStageValue(currentReport, "Z69ZIsB8TbP", years[2]) || 0;
                    yetToStartTarget += getStageValue(currentReport, "QZYgxnf7mP3", years[2]) || 0;
                    yetToStartActualNext += getStageValue(currentReport, "Z69ZIsB8TbP", years[2] + 1) || 0;

                    // MTDP
                    mtdpBaseline += getStageValue(currentReport, "WrLpyyxA5pZ", years[0]) || 0;
                    mtdpActualPrev += getStageValue(currentReport, "UMxVuTWkMrC", years[1]) || 0;
                    mtdpActualCurr += getStageValue(currentReport, "UMxVuTWkMrC", years[2]) || 0;
                    mtdpTarget += getStageValue(currentReport, "U635zrF1mKK", years[2]) || 0;
                    mtdpActualNext += getStageValue(currentReport, "UMxVuTWkMrC", years[2] + 1) || 0;
                  });
                }

                const dataSet = [
                  {
                    indicator: "Proportion of the Annual Action Plans Implemented by the end of the year",
                    baseline2023: completedBaseline + onGoingBaseline + abandonedBaseline + yetToStartBaseline,
                    actual2024: completedActualPrev + onGoingActualPrev + abandonedActualPrev + yetToStartActualPrev,
                    actual2025: completedActualCurr + onGoingActualCurr + abandonedActualCurr + yetToStartActualCurr,
                    target2025: completedTarget + onGoingTarget + abandonedTarget + yetToStartTarget,
                    actual2026: completedActualNext + onGoingActualNext + abandonedActualNext + yetToStartActualNext,
                  },
                  {
                    indicator: "Percentage of activities completed",
                    baseline2023: completedBaseline,
                    actual2024: completedActualPrev,
                    actual2025: completedActualCurr,
                    target2025: completedTarget,
                    actual2026: completedActualNext,
                  },
                  {
                    indicator: "Percentage of on-going activities",
                    baseline2023: onGoingBaseline,
                    actual2024: onGoingActualPrev,
                    actual2025: onGoingActualCurr,
                    target2025: onGoingTarget,
                    actual2026: onGoingActualNext,
                  },
                  {
                    indicator: "Percentage of activities abandoned",
                    baseline2023: abandonedBaseline,
                    actual2024: abandonedActualPrev,
                    actual2025: abandonedActualCurr,
                    target2025: abandonedTarget,
                    actual2026: abandonedActualNext,
                  },
                  {
                    indicator: "Percentage of activities yet to start",
                    baseline2023: yetToStartBaseline,
                    actual2024: yetToStartActualPrev,
                    actual2025: yetToStartActualCurr,
                    target2025: yetToStartTarget,
                    actual2026: yetToStartActualNext,
                  },
                  {
                    indicator: "Proportion of the overall Medium-Term Development Plan implemented",
                    baseline2023: mtdpBaseline,
                    actual2024: mtdpActualPrev,
                    actual2025: mtdpActualCurr,
                    target2025: mtdpTarget,
                    actual2026: mtdpActualNext,
                  },
                ];

                temps.push(dataSet);
                setTableData(dataSet);
              });
            })
            .catch(err => console.log(err));
        } else {
          setTableData([]); // No data available
        }
      })
      .catch(err => console.log(err));
  }

  // Pictorial evidence data
  const pictorialEvidence = [
    {
      url: "https://cdn1.img.sputniknews.africa/img/07e7/07/02/1060284138_451:0:3134:2012_1920x0_80_0_0_43d738a714a35edc0190c43cbaa47b86.jpg",
      caption: "Construction of Community Center - 2022",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegQFFElp18bejV_lABjBxFymQizmSFnbmBQ&s",
      caption: "Road Improvement Project - Phase 1",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ84AeJyjvmIiYJZaK5Nz3lTPHUFSJVKyuybw&s",
      caption: "School Renovation - Completed 2022",
    },
  ];

  // Data for the bar graph
 const chartData = {
    labels: tableData.map((row) => row.indicator), // Shorten labels for readability
    datasets: [
      {
        label: "Baseline 2021 (%)",
        data: tableData.map((row) => parseFloat(row.baseline2021) || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual 2022 (%)",
        data: tableData.map((row) => parseFloat(row.actual2022) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
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
        text: "Implementation Status Comparison: 2021 vs 2022",
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
      <h3>Table 2 – Proportion of the DMTDP Implemented</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h5>2 Summary of Achievement of the Implementation of the District Medium Term Development Plan (DMTDP)</h5>
          <h7>
            In assessing the implementation status of the MTDP {years[1]}-{years[2] + 1} for the year under review,
            premium was placed on the analysis of the progress made in implementing the key
            activities outlined in the {years[1]} Annual Action Plan and the Medium-Term Development
            Plan as a whole. The achievements in set indicators were used as the basis for the
            assessment.
            The analysis further grouped proposed interventions into three categories. These are
            “Fully implemented” which describes projects or programmes outlined in the Annual
            Action Plan that have been started and completed. “Ongoing” describes projects/
            programmes that have been started but not yet completed and “Not Implemented”
            describes a project/programme that has not been started or yet to start.
            A total number of 137 activities were captured in the {years[1]} Annual Action Plan whilst the
            MTDP contained a total number of 528 interventions. By the end of the year {years[1]}, 121
            activities representing 88.32% projects were completed, 13 activities representing 9.49%
            were ongoing and 3 activities representing 2.19% were yet to be started. In all 134
            projects and programmes representing 97.81% of the Annual Action Plan for {years[1]} were
            implemented.
            This so far translates into 25.4% achievement of the total 528 planned interventions of
            the {years[1]}-{years[2] + 1} Medium-Term Development Plan as of December {years[1]}. Table 2
            presents the summary of the level of implementation in the MTDP and the AAP for {years[1]}.
          </h7>
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table2-${year}`}
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
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                <tr>
                  <th style={{ border: '1px solid #000' }}>Indicators</th>
                  <th style={{ border: '1px solid #000' }}>Baseline ({years[0]})</th>
                  <th style={{ border: '1px solid #000' }}>Actual ({years[1]})</th>
                  <th style={{ border: '1px solid #000' }}>Actual ({years[2]})</th>
                  <th style={{ border: '1px solid #000' }}>Target ({years[2]})</th>
                  <th style={{ border: '1px solid #000' }}>Actual ({years[2] + 1})</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                      <td style={{ border: '1px solid #000' }}>{row[`baseline${years[0]}`] || 0}</td>
                      <td style={{ border: '1px solid #000' }}>{row[`actual${years[1]}`] || 0}</td>
                      <td style={{ border: '1px solid #000' }}>{row[`actual${years[2]}`] || 0}</td>
                      <td style={{ border: '1px solid #000' }}>{row[`target${years[2]}`] || 0}</td>
                      <td style={{ border: '1px solid #000' }}>{row[`actual${years[2] + 1}`] || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", border: '1px solid #000' }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU-TNMA</small>
          </p>
          <hr />
          <h5>Pictorial Evidence of Projects under Implementation</h5>
          {pictorialEvidence.length > 0 ? (
            <div className="row">
              {pictorialEvidence.map((image, index) => (
                <div className="col-md-4 col-sm-6 mb-3" key={index}>
                  <div className="card">
                    <img
                      src={image.url}
                      className="card-img-top"
                      alt={image.caption}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="card-text">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pictorial evidence available.</p>
          )}
          <hr />
          <h5>Comparison of Implementation Status: {years[0]}-{years[2] + 1}</h5>
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