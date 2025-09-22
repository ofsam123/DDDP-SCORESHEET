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
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral } from "../../utils/utils";
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

const Table2_4 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);

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
      const baselineItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${name.toLowerCase()} baseline`
      );
      const targetItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${name.toLowerCase()} target`
      );

      return {
        name: name,
        baseline: baselineItem ? Number(baselineItem.value) : 0,
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

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=WHILilRZRhT&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=WHILilRZRhT&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const disbursements = formatDataGeneral(result.data.instances, "Years", "2025") || [];
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const disbursementMapped = mapData(disbursements, reports);

              const cleanNumber = (val) => parseFloat((val || "0").toString().replace(/,/g, ''));

              const totalRow = {
                name: 'Total',
                baseline: disbursementMapped.reduce((sum, el) => sum + cleanNumber(el.baseline), 0),
                target: disbursementMapped.reduce((sum, el) => sum + cleanNumber(el.target), 0),
                actual: disbursementMapped.reduce((sum, el) => sum + cleanNumber(el.actual), 0),
              };

              setTotal(totalRow);
              setTableData(disbursementMapped);
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
      <h3>Table 2.4 – Update of Disbursement</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h5>2.2.3 Update on Disbursements</h5>
          <h7>
            During the year under review, funds received were disbursed under the components of
            Compensation, Goods and Services and Non–Financial Assets. Table 2.4 presents the
            disbursement for the years.</h7>
            <APRmemo
                    year={year}
                    districtId = {district}
                      tableCommentedId={`table2_4-${year}`}
                   
                  />
          <div className="table-responsive">
            <table
              className="table table-bordered"
              style={{

                border: '1px solid #000',
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: '20px'
              }}
            >
              <thead style={{
                backgroundColor: '#d4edda',
                fontWeight: 'bold',
              }}>
                <tr>
                  <th style={{ border: '1px solid #000' }}>Expenditure Item</th>
                  <th style={{ border: '1px solid #000' }}>Baseline (GH¢)</th>
                  <th style={{ border: '1px solid #000' }}>Target (GH¢)</th>
                  <th style={{ border: '1px solid #000' }}>Actual (GH¢)</th>
                </tr>
              </thead>
              {tableData && (
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #000' }}>{row.name}</td>
                      <td style={{ border: '1px solid #000' }}>{row.baseline.toLocaleString()}</td>
                      <td style={{ border: '1px solid #000' }}>{row.target.toLocaleString()}</td>
                      <td style={{ border: '1px solid #000' }}>{row.actual.toLocaleString()}</td>
                    </tr>
                  ))}
                  {total && (
                    <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      <td style={{ border: '1px solid #000' }}>{total.name}</td>
                      <td style={{ border: '1px solid #000' }}>{total.baseline.toLocaleString()}</td>
                      <td style={{ border: '1px solid #000' }}>{total.target.toLocaleString()}</td>
                      <td style={{ border: '1px solid #000' }}>{total.actual.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>

          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <h4 className="mt-4">Figure 2.4 – Expenditure Analysis</h4>
          <p>Figure 2.4 further shows the expenditure trends of 2021 baseline and targets, actuals, and next year targets for {year}. It can be realized that the major expenditure during the period remained {tableData.reduce((maxItem, current) => current.actual > maxItem.actual ? current : maxItem, { actual: 0 }).name}.</p>
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
                      tableCommentedId={`table2_4-${year}`}
                     
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

export default Table2_4;