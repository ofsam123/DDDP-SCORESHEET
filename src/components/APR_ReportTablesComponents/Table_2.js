import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue, getStageValue } from "../../utils/utils";
import axios from "../../api/axios";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_2 = ({ year, district, period }) => {

  const currentYear = new Date().getFullYear(); // 2025
  const years = [currentYear - 2, currentYear - 1, currentYear]; // [2023, 2024, 2025]


  const [tableData, setTableData] = useState([]);
  const [tableDummy, setTableDummy] = useState([]);


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
              // const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const currentYear = formatDataGeneral(result.data.instances, "Years", `${year}`) || [];
              const oldActivities = formatDataGeneral(result.data.instances, "Years", `${year - 3}`) || [];

              const reports = resp.data.instances;
              const temps = [];

              axios
                .get(`/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
                .then(results => {
                  if (results.data.instances.length > 0) {

                    axios
                      .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=10000`)
                      .then(response => {
                        console.log("aap reports");

                        const currentYearActual = formatDataGeneral(results.data.instances, "Year", `${year}`) || [];
                        const currentYearActual1 = formatDataGeneral(results.data.instances, "Year", `${year -1}`) || [];
                        const currentYearActual2 = formatDataGeneral(results.data.instances, "Year", `${year - 2}`) || [];
                      })
                      .catch(err => console.log(err));
                  } 
                })
                .catch(err => console.log(err));


              let completedBaseline = 0;
              let completedTarget = 0;
              let onGoingBaseline = 0;
              let onGoingTarget = 0;
              let abandonedBaseline = 0;
              let abandonedTarget = 0;
              let yetToStartBaseline = 0;
              let yetToStartTarget = 0;

              //old activities baselines
              let oldCompletedBaseline = 0;
              let oldOnGoingBaseline = 0;
              let oldAbandonedBaseline = 0;
              let oldYetToStartBaseline = 0;
              let oldMtdpBaseline = 0

              let mtdpBaseline = 0;
              let mtdpTarget = 0;
              let mtdpActual = 0;

              oldActivities.forEach((item, idx) => {

                const trackerReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);

                if (trackerReport) {

                  trackerReport.forEach(currentReport => {
                    //Completed AAP
                    oldCompletedBaseline += getStageValue(currentReport, "dxOHO0QnZsR");

                    //Ongoing AAP
                    oldOnGoingBaseline += getStageValue(currentReport, "ZVRR4ozm2od");

                    //Abandoned AAP
                    oldAbandonedBaseline += getStageValue(currentReport, "WfyEAyQQlfr");

                    //Yet to start AAP
                    oldYetToStartBaseline += getStageValue(currentReport, "Z69ZIsB8TbP");

                    //MTDP
                    oldMtdpBaseline += getStageValue(currentReport, "WrLpyyxA5pZ");

                  });


                };
              });

              currentYear.forEach((item, idx) => {

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
                    oldCompletedBaseline,
                    target: completedTarget,
                    indicator: "Percentage of activities completed",
                    actual: 0

                  },
                  {
                    oldOnGoingBaseline,
                    target: onGoingTarget,
                    indicator: "Percentage of on-going activities",
                    actual: 0
                  },
                  {
                    oldAbandonedBaseline,
                    target: abandonedTarget,
                    indicator: "Percentage of activities abandoned",
                    actual: 0
                  },
                  {
                    oldYetToStartBaseline,
                    target: yetToStartTarget,
                    indicator: "Percentage of activities yet to start",
                    actual: 0
                  },
                  {
                    oldMtdpBaseline,
                    target: mtdpTarget,
                    actual: mtdpActual,
                    indicator: "Proportion of the overall Medium-Term Development Plan implemented",
                  }
                ];

                console.log("djiba aap impletemented data: ", dataSet)


                temps.push(dataSet);
                setTableData(dataSet);
              });




            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  }

  const formatData = (aap, reports)=>{

    const temp = [];
      aap.forEach((item, idx) => {
    
        const currentReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);
        let status = "";
    
        if (currentReport) {
    
          currentReport.forEach(curReport => {
            curReport.dataValues.forEach(rep => {
              if (rep.dataElement === "tE3QKB203nh") {
                status = rep.value;
              }
    
            });
          })
    
        }
    
        const dataSetTemp = {
          year: getAttributeValue("Year", item),
          developmentDimension: getAttributeValue("Development Dimension", item),
          status
        };
    
        temp.push(dataSetTemp);
      });
    
      return temp;
  }


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
        <div className="card-header">Table 2 – Proportion of the DMTDP Implemented </div>
        <div className="card-body">

       
         
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
              <thead style={{
                backgroundColor: '#d4edda',
                fontWeight: 'bold',
              }}>
                <tr>
                  <th style={{ border: '1px solid #000' }}>Indicators</th>
                  <th style={{ border: '1px solid #000' }}>Baseline {year - 3}</th>
                  <th style={{ border: '1px solid #000' }}>Actual {year - 2}</th>
                  <th style={{ border: '1px solid #000' }}>Actual {year - 1}</th>
                  <th style={{ border: '1px solid #000' }}>Target {year}</th>
                  <th style={{ border: '1px solid #000' }}>Actual {year}</th>
                </tr>
              </thead>
              <tbody>
                {/* {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline2023.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual2024.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual2025.toFixed(1)}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target2025.toFixed(1)}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year - 3} - {year} MTDP, {year - 2}, {year - 1}, {year} AAPs & Progress Reports</small>
          </p>
          <hr />

          {/* Pictorial evidence section commented out as per original code */}
          <hr />
          <h5>Comparison of Implementation Status: {year - 2} - {year}</h5>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions}

            />
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