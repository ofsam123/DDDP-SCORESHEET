import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { filterTrackedEntitiesByCreatedAt, getStageValue } from "../../utils/utils";
import axios from "../../api/axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table1_1 = ({ year, district, period }) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getBaselinesAndTargets();
  }, [year, district, period]);

  function getBaselinesAndTargets() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=pcG18cDzLtf&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {

          axios
            .get(`/tracker/events?program=pcG18cDzLtf&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);

              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const temps = [];

              // console.log("djiba aap data: ", { data, reports })

              let completedBaseline = 0;
              let completedTarget = 0;
              let onGoingBaseline = 0;
              let onGoingTarget = 0;
              let abandonedBaseline = 0;
              let abandonedTarget = 0;
              let yetToStartBaseline = 0;
              let yetToStartTarget = 0;

              let mtdpBaseline = 0;
              let mtdpTarget = 0;
              let mtdpActual = 0;

              data.forEach((item, idx) => {

                const trackerReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);

                if (trackerReport) {

                  trackerReport.forEach(currentReport => {
                    //Completed AAP
                    completedBaseline += getStageValue(currentReport, "dxOHO0QnZsR");
                    completedTarget += getStageValue(currentReport, "KNoWsIA6kze");

                    //Ongoing AAP
                    onGoingBaseline += getStageValue(currentReport, "ZVRR4ozm2od");
                    onGoingTarget += getStageValue(currentReport, "lrVDQzE3hpM");

                    //Abandoned AAP
                    abandonedBaseline += getStageValue(currentReport, "WfyEAyQQlfr");
                    abandonedTarget += getStageValue(currentReport, "xAw7tiaoQTm");

                    //Yet to start AAP
                    yetToStartBaseline += getStageValue(currentReport, "Z69ZIsB8TbP");
                    yetToStartTarget += getStageValue(currentReport, "QZYgxnf7mP3");

                    //MTDP
                    mtdpBaseline += getStageValue(currentReport, "WrLpyyxA5pZ");
                    mtdpTarget += getStageValue(currentReport, "U635zrF1mKK");
                    mtdpActual += getStageValue(currentReport, "UMxVuTWkMrC");

                  });


                };

                const dataSet = [
                  {
                    baseline: completedBaseline,
                    target: completedTarget,
                    indicator:"Percentage of activities completed",
                    actual: 0

                  },
                  {
                    baseline: onGoingBaseline,
                    target: onGoingTarget,
                    indicator:"Percentage of on-going activities ",
                    actual: 0
                  },
                    {
                    baseline: abandonedBaseline,
                    target: abandonedTarget,
                    indicator:"Percentage of activities abandoned",
                    actual: 0
                    },
                    {
                    baseline: yetToStartBaseline,
                    target: yetToStartTarget,
                    indicator:"Percentage of activities yet to start",
                    actual: 0
                    },
                    {
                    baseline: mtdpBaseline,
                    target: mtdpTarget,
                    actual: mtdpActual,
                    indicator:"Proportion of the overall Medium-Term Development Plan implemented",
                    
                  }
                ];

                console.log("djiba aap data: ", dataSet)


                temps.push(dataSet);
                setTableData(dataSet);
              });

              


            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
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
      <div className="card">
        <div className="card-header">Table 1.1 – Proportion of the AAP and the MTDP Implemented</div>
        <div className="card-body">
          <h5>1.1 Summary of Achievement of the Implementation of the District
            Medium Term Development Plan (DMTDP)</h5>
          <h7>
            In assessing the implementation status of the MTDP 2022-2025 for the year under review,
            premium was placed on the analysis of the progress made in implementing the key
            activities outlined in the 2022 Annual Action Plan and the Medium-Term Development
            Plan as a whole. The achievements in set indicators were used as the basis for the
            assessment.
            The analysis further grouped proposed interventions into three categories. These are
            “Fully implemented” which describes projects or programmes outlined in the Annual
            Action Plan that have been started and completed. “Ongoing” describes projects/
            programmes that have been started but not yet completed and “Not Implemented”
            describes a project/programme that has not been started or yet to start.
            A total number of 137 activities were captured in the 2022 Annual Action Plan whilst the
            MTDP contained a total number of 528 interventions. By the end of the year 2022, 121
            activities representing 88.32% projects were completed, 13 activities representing 9.49%
            were ongoing and 3 activities representing 2.19% were yet to be started. In all 134
            2 | P a g e
            3 | P a g e
            projects and programmes representing 97.81% of the Annual Action Plan for 2022 were
            implemented.
            This so far translates into 25.4% achievement of the total 528 planned interventions of
            the 2022-2025 Medium-Term Development Plan as of December 2022. Table 1.1
            presents the summary of the level of implementation in the MTDP and the AAP for 2022.
            Table 1.1 – Proportion of the AAP and the MTDP Implemented
          </h7>
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
                {/* {JSON.stringify(tableData)} */}
                <tr>
                  <th style={{ border: '1px solid #000' }}>Indicators</th>
                  <th style={{ border: '1px solid #000' }}>Baseline</th>
                  <th style={{ border: '1px solid #000' }}>Target</th>
                  <th style={{ border: '1px solid #000' }}>Actual</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>
                      {row.baseline}
                    </td>
                    <td style={{ border: '1px solid #000' }}>
                      {row.target}
                    </td>
                    <td style={{ border: '1px solid #000' }}>
                      {row.actual}
                    </td>
                    
                  </tr>
                ))}
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
          <h5>Comparison of Implementation Status: 2021 vs 2022</h5>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table1_1;