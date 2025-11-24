import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { formatDataGeneral, getAttributeValue } from "../../utils/utils";
import axios from "../../api/axios";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_2 = forwardRef(({ year, district, period }, ref) => {

  const [tableData, setTableData] = useState([]);
  const [tableDummy, setTableDummy] = useState([]);


  useEffect(() => {
    getBaselinesAndTargets();
  }, [year, district, period]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_2",
      tableData
    }),
  }));

  function getBaselinesAndTargets() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=pcG18cDzLtf&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {

          // const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
          const aapBaselinesAndTargets = result.data.instances
          const currentYear = formatDataGeneral(aapBaselinesAndTargets, "Years", `${year}`) || [];
          const oldActivities = formatDataGeneral(aapBaselinesAndTargets, "Years", `${year - 3}`) || [];

          const temps = [];

          axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(results => {
              if (results.data.instances.length > 0) {

                axios
                  .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=10000`)
                  .then(response => {

                    const aapReports = response.data.instances;
                    const plans = results.data.instances;

                    const currentYearActual = formatDataGeneral(plans, "Year", `${year}`) || [];
                    const currentYearActual1 = formatDataGeneral(plans, "Year", `${year - 1}`) || [];
                    const currentYearActual2 = formatDataGeneral(plans, "Year", `${year - 2}`) || [];

                    const actualFormated = formatData(currentYearActual, aapReports);
                    const actual1Formated = formatData(currentYearActual1, aapReports);
                    const actual2Formated = formatData(currentYearActual2, aapReports);

                    const calculatedData = calculateActivityPercentages({ actualFormated, actual1Formated, actual2Formated });

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

                      oldCompletedBaseline = parseFloat(getAttributeValue("Proportion of Completed AAP Baseline", item));

                      //Ongoing AAP
                      oldOnGoingBaseline = parseFloat(getAttributeValue("Proportion of  On Going AAP Intervention Baseline", item));

                      //Abandoned AAP
                      oldAbandonedBaseline = parseFloat(getAttributeValue("Proportion of  Abandoned AAP Intervention Baseline", item));

                      //Yet to start AAP
                      oldYetToStartBaseline = parseFloat(getAttributeValue("Proportion of  Yet to Start AAP Intervention Baseline", item));

                      //MTDP
                      oldMtdpBaseline += parseFloat(getAttributeValue("Proportion of MTDP Implemented Baseline", item));

                    });

                    currentYear.forEach((item, idx) => {


                      //Completed AAP
                      completedBaseline = parseFloat(getAttributeValue("Proportion of Completed AAP Baseline", item));
                      completedTarget = parseFloat(getAttributeValue("Proportion of Completed AAP Target", item));

                      //Ongoing AAP
                      onGoingBaseline = parseFloat(getAttributeValue("Proportion of  On Going AAP Intervention Baseline", item));
                      onGoingTarget = parseFloat(getAttributeValue("Proportion of  On Going AAP Intervention Target", item));

                      //Abandoned AAP
                      abandonedBaseline = parseFloat(getAttributeValue("Proportion of  Abandoned AAP Intervention Baseline", item));
                      abandonedTarget = parseFloat(getAttributeValue("Proportion of  Abandoned AAP Intervention Target", item));

                      //Yet to start AAP
                      yetToStartBaseline = parseFloat(getAttributeValue("Proportion of  Yet to Start AAP Intervention Baseline", item));
                      yetToStartTarget = parseFloat(getAttributeValue("Proportion of  Yet to Start AAP Intervention Target", item));

                      //MTDP
                      mtdpBaseline = parseFloat(getAttributeValue("Proportion of MTDP Implemented Baseline", item));
                      mtdpTarget = parseFloat(getAttributeValue("Proportion of MTDP Implemented Target", item));
                      mtdpActual = parseFloat(getAttributeValue("Proportion of MTDP Implemented Actual", item));



                      const dataSet = [
                        {
                          oldCompletedBaseline,
                          target: completedTarget,
                          indicator: "Percentage of activities completed",
                          actual2: 0,
                          actual1: 0,
                          actual: 0
                        },
                        {
                          oldOnGoingBaseline,
                          target: onGoingTarget,
                          indicator: "Percentage of on-going activities",
                          actual2: 0,
                          actual1: 0,
                          actual: 0
                        },
                        {
                          oldAbandonedBaseline,
                          target: abandonedTarget,
                          indicator: "Percentage of activities abandoned",
                          actual2: 0,
                          actual1: 0,
                          actual: 0
                        },
                        {
                          oldYetToStartBaseline,
                          target: yetToStartTarget,
                          indicator: "Percentage of activities yet to start",
                          actual2: 0,
                          actual1: 0,
                          actual: 0
                        },
                        {
                          oldMtdpBaseline,
                          target: mtdpTarget,
                          actual: mtdpActual,
                          indicator: "Proportion of the overall Medium-Term Development Plan implemented",
                          actual2: 0,
                          actual1: 0,
                        }
                      ];

                      temps.push(dataSet);
                      setTableData(dataSet);
                    });


                    const finalData = mergeCalculatedData({ temps, calculatedData }, year)
                    const flattenData = finalData ? finalData[0] : [];
                    const finalFlap = renameBaselineKey(flattenData);

                    setTableDummy(finalFlap);
                    setTableData(finalFlap);
                  })
                  .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));



        }


      })
      .catch(err => console.log(err))
  }

  const formatData = (aap, reports) => {

    const temp = [];
    aap.forEach((item, idx) => {

      const currentReport = reports.filter(rep => rep.trackedEntity === item.trackedEntity);
      let status = "";

      if (currentReport) {

        currentReport.forEach(curReport => {
          curReport.dataValues.forEach(rep => {
            if (rep.dataElement === "SZcHb5mvjJx") {
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

  function mergeCalculatedData(data, year) {
    const { temps, calculatedData } = data;

    // Map indicators to statuses for easy matching
    const statusMap = {
      "Percentage of activities completed": "Completed",
      "Percentage of on-going activities": "Ongoing",
      "Percentage of activities abandoned": "Abandoned",
      "Percentage of activities yet to start": "Yet to be started",
    };

    // Create a deep copy of temps to avoid mutating original
    const mergedTemps = temps.map((group) =>
      group.map((item) => {
        const newItem = { ...item };

        // Match indicator to corresponding status in calculatedData
        const statusKey = statusMap[item.indicator];

        // Assign actual values for each year (2023 = actual2, 2024 = actual1, 2025 = actual)
        if (statusKey) {
          newItem.actual2 = parseFloat(calculatedData[year - 2][statusKey] || 0);
          newItem.actual1 = parseFloat(calculatedData[year - 1][statusKey] || 0);
          newItem.actual = parseFloat(calculatedData[year][statusKey] || 0);
        }

        return newItem;
      })
    );

    return mergedTemps;
  }


  function calculateActivityPercentages(data) {
    const statuses = ["Completed", "Yet to be started", "Ongoing", "Abandoned"];

    // Merge all year arrays
    const allYears = [
      ...(data.actualFormated || []),
      ...(data.actual1Formated || []),
      ...(data.actual2Formated || []),
    ];

    // Group by year
    const grouped = allYears.reduce((acc, { year, status }) => {
      if (!acc[year]) acc[year] = [];
      acc[year].push(status?.trim() || "");
      return acc;
    }, {});

    // Calculate percentages
    const result = {};
    for (const [year, statusList] of Object.entries(grouped)) {
      const total = statusList.length;
      const yearResult = {};

      // Count each defined status
      statuses.forEach((s) => {
        const count = statusList.filter((st) => st === s).length;
        yearResult[s] = ((count / total) * 100).toFixed(2);
      });

      // Count unspecified/empty
      const unspecifiedCount = statusList.filter((st) => !st).length;
      yearResult["Unspecified"] = ((unspecifiedCount / total) * 100).toFixed(2);
      yearResult["Total"] = total;

      result[year] = yearResult;
    }

    return result;
  }

  const renameBaselineKey = (data) => {
    return data.map(item => {
      const newItem = { ...item };
      // Find the key that ends with "Baseline"
      for (const key in newItem) {
        if (key.endsWith("Baseline")) {
          newItem["baseline"] = newItem[key]; // rename
          delete newItem[key]; // remove old key
        }
      }
      return newItem;
    });
  };




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
        <div className="card-header">Table 1.1 – Proportion of the DMTDP Implemented </div>
        <div className="card-body">
          <h5>1.1 Summary of Achievement of the Implementation of the District
            Medium Term Development Plan (DMTDP)</h5>

          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table1_1-${year}`}


          />

          <div className="table-responsive">
            {/* {JSON.stringify(tableDummy)} */}
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
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual2}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual1}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                  </tr>
                ))}
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
            tableCommentedId={`table1_1-${year}`}

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

export default Table_2;