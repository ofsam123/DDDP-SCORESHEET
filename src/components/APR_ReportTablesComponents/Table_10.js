import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../../api/axios";
import { formatDataGeneral } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// Function to assign colors based on category
const getColor = (name) => {
  switch (name) {
    case "COMPENSATION":
      return "rgba(0, 0, 255, 0.6)"; // Blue
    case "GOODS AND SERVICES":
      return "rgba(255, 165, 0, 0.6)"; // Orange
    case "INVESTMENTS/ASSETS":
      return "rgba(128, 128, 128, 0.6)"; // Gray
    default:
      return "rgba(0, 0, 0, 0.6)"; // Black as fallback
  }
};

const Table_10 = ({ year, district, period, hideTableDis }) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    getData();
  }, [year, district, period]);

   const mapData = (data, report) => {
    const names = [
      "COMPENSATION", "GOODS AND SERVICES", "INVESTMENTS/ASSETS"
    ];

    const attributes = data[0]?.attributes;
    const reports = report.find(rep => rep.trackedEntity === data[0]?.trackedEntity);

    const result = names.map(name => {
      const releasedItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${name.toLowerCase()} released`
      );
      const targetItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${name.toLowerCase()} target`
      );

      return {
        name: name,
        released: releasedItem ? Number(releasedItem.value) : 0,
        target: targetItem ? Number(targetItem.value) : 0,
        actual: 0
      };
    });

    result.forEach(el => {
      for (let r of reports.dataValues) {
        if (el.name === 'COMPENSATION' && r.dataElement === "iF3bVYzJUE6") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'GOODS AND SERVICES' && r.dataElement === "ZKwpRsX6DIE") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'INVESTMENTS/ASSETS' && r.dataElement === "LKTrRHSCoEk") {
          el.actual = Number(r.value);
          break;
        }
      }
    });

    return result;
  };

 function transformDisbursements(data) {
  const keys = [
    "disbursementsThreeLessMapped",
    "disbursementsTwoLessMapped",
    "disbursementsOneLessMapped",
    "disbursementsFirstMapped"
  ];

  const suffixes = ["One", "Two", "Three", "Four"];

  // Get all names from the first set
  const names = data[keys[0]].map(item => item.name);

  // Transform grouped data
  const result = names.map(name => {
    let obj = { name };

    keys.forEach((key, i) => {
      const match = data[key].find(item => item.name === name);
      if (match) {
        obj[`released${suffixes[i]}`] = match.released;
        obj[`target${suffixes[i]}`] = match.target;
        obj[`actual${suffixes[i]}`] = match.actual;
      }
    });

    return obj;
  });

  // Build totals row
  const totalRow = { name: "Total" };

  suffixes.forEach((suf, i) => {
    totalRow[`released${suf}`] = result.reduce(
      (sum, el) => sum + (el[`released${suf}`] || 0),
      0
    );
    totalRow[`target${suf}`] = result.reduce(
      (sum, el) => sum + (el[`target${suf}`] || 0),
      0
    );
    totalRow[`actual${suf}`] = result.reduce(
      (sum, el) => sum + (el[`actual${suf}`] || 0),
      0
    );
  });

  result.push(totalRow);
  return result;
}



  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=WHILilRZRhT&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=WHILilRZRhT&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              
              const years = [`${year-3}`, `${year-2}`, `${year-1}`, `${year}`]
              const disbursementsFirst = formatDataGeneral(result.data.instances, "Years", `${year}`) || [];
              const disbursementsOneLess = formatDataGeneral(result.data.instances, "Years", `${year-1}`) || [];
              const disbursementsTwoLess = formatDataGeneral(result.data.instances, "Years", `${year-2}`) || [];
              const disbursementsThreeLess = formatDataGeneral(result.data.instances, "Years", `${year-3}`) || [];
              const reports = resp.data.instances;

              const reportFiltered = reports.filter(rep=> rep.programStage === "yJ86MwzF5Ak")
              
              const disbursementsFirstMapped = mapData(disbursementsFirst, reportFiltered);
              const disbursementsOneLessMapped = mapData(disbursementsOneLess, reportFiltered);
              const disbursementsTwoLessMapped = mapData(disbursementsTwoLess, reportFiltered);
              const disbursementsThreeLessMapped = mapData(disbursementsThreeLess, reportFiltered);
              const tempResult = {disbursementsFirstMapped, disbursementsOneLessMapped, disbursementsTwoLessMapped, disbursementsThreeLessMapped};
              const formatedData = transformDisbursements(tempResult);
             
              setTableData(formatedData);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  // Dynamic chart data based on tableData and year
  const chartData = {
    labels: ["Baseline 2021", `Target ${year}`, `Actual ${year}`, `Target ${parseInt(year) + 1}`],
    datasets: tableData.map(item => ({
      label: item.name,
      data: [
        item.baseline, // Baseline 2021
        item.target,   // Target for the selected year
        item.actual,   // Actual for the selected year
        item.target * 1.1, // Approximate Target for next year (dynamic scaling, adjust as needed)
      ],
      backgroundColor: getColor(item.name),
      borderColor: getColor(item.name),
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Figure 2.4 – Expenditure Analysis (${year})`,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Expenditure in GH¢",
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-GH", {
              style: "currency",
              currency: "GHS",
              minimumFractionDigits: 0,
            }).format(value);
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 10 - Update on Expenditure as of the Year ({year-3} – {year})</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          {/* <h5>2.2.3 Update on Disbursements</h5> */}
          <h7>
            During the year under review, funds received were disbursed under the components of
            Compensation, Goods and Services and Non–Financial Assets. Table 2.4 presents the
            disbursement for the years.</h7>
            <APRmemo
                    year={year}
                    districtId = {district}
                      tableCommentedId={`table10-${year}`}
                      hideTableDis={hideTableDis}
                   
                  />
          {/* {JSON.stringify(tableData)} */}
          <div className="table-responsive">
            <table className="table table-bordered" 
            style={{
              tableLayout: "fixed",
              border: '1px solid #000',
              borderCollapse: 'collapse',
              width: '100%',
              marginTop: "20px"
            }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}
              >
                <tr>
                  <th style={{ border: "1px solid #000" }} rowSpan="2">Budget Items</th>
                  {[`${year-3}`, `${year-2}`, `${year-1}`, `${year}`].map(year => (
                    <th key={year} style={{ border: "1px solid #000" }} colSpan="3">
                      {year}
                    </th>
                  ))}
                </tr>
                <tr>
                  {[`${year-3}`, `${year-2}`, `${year-1}`, `${year}`].flatMap(year => [
                    <th key={`${year}-approved`} style={{ border: "1px solid #000" }}>Approved</th>,
                    <th key={`${year}-released`} style={{ border: "1px solid #000" }}>Released</th>,
                    <th key={`${year}-expenditure`} style={{ border: "1px solid #000" }}>Expenditure</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.name !== 'INVESTMENTS/ASSETS' ? row.name : 'CAPEX '}</td>

                        <td style={{ border: "1px solid #000" }}>
                          {row.targetOne.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.releasedOne.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.actualOne.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.targetTwo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.releasedTwo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.actualTwo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.targetThree.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.releasedThree.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.actualThree.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.targetFour.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.releasedFour.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td style={{ border: "1px solid #000" }}>
                          {row.actualFour.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide Figure 2.4" : "Show Figure 2.4"}
          </button>
          {showChart && (
            <div className="mt-4" style={{ height: "400px" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
            
          )}

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