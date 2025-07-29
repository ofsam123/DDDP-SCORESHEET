
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Table2_3 = ({ year, district }) => {
  // Revenue update data as provided
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getProjects();
  }, [year, district]);

  const mapRevenueData = (data, report) => {

    const revenueNames = [
      "IGF", "DACF", "MPs CF", "PWDs CF", "DACF-RFG",
      "Decentralized Dept", "GOG Salaries", "MDF", "Stool Lands", "CIDA"
    ];

    const attributes = data[0]?.attributes;
    const reports = report.find(rep => rep.trackedEntity === data[0]?.trackedEntity);

    const result = revenueNames.map(revName => {
      const baselineItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${revName.toLowerCase()} baseline`
      );
      const targetItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${revName.toLowerCase()} target`
      );

      return {
        name: revName,
        baseline: baselineItem ? Number(baselineItem.value).toLocaleString() : 0,
        target: targetItem ? Number(targetItem.value).toLocaleString() : 0,
        actual: 0
      };
    });

    result.map(el => {

      for (let r of reports.dataValues) {
        if (el.name === 'IGF' && r.dataElement === "Wp7KcuZgrJa") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'DACF' && r.dataElement === "rtZ2oyIrEZE") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'MPs CF' && r.dataElement === "sPtuvxHoqBI") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'PWDs CF' && r.dataElement === "iPJma6G8Pen") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'DACF-RFG' && r.dataElement === "PnPth1bxPDM") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'Decentralized Dept' && r.dataElement === "PO8QzvjK8VM") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'GOG Salaries' && r.dataElement === "nHtXhtCsha8") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'MDF' && r.dataElement === "IujXTMPpFux") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'Stool Lands' && r.dataElement === "J8qgTRwB7wj") {
          el.actual = Number(r.value).toLocaleString();
          break;
        } else if (el.name === 'CIDA' && r.dataElement === "WlVIx0WUbgt") {
          el.actual = Number(r.value).toLocaleString();
          break;
        }
      }

    });

    return result;
  }

  function getProjects() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=SY8TpfPgzr9&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {

        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=SY8TpfPgzr9&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, startDate, endDate);


              const revenues = formatDataGeneral(data, "Years", "2025") || [];

              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              const revenuMapped = mapRevenueData(revenues, reports);

              const cleanNumber = (val) => parseFloat((val || "0").toString().replace(/,/g, ''));

              const totalRow = {
                name: 'Total',
                baseline: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.baseline), 0),
                target: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.target), 0),
                actual: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.actual), 0),
              };



              setTotal(totalRow);
              setTableData(revenuMapped);


            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  }

  // State for toggling chart visibility
  // const [showChart, setShowChart] = useState(true);

  // // Prepare data for Chart.js
  // const chartData = {
  //   labels: revenueData.map((row) =>
  //     row.revenueItem === "DECENTRALISED DEPT"
  //       ? "DEC. DEPT"
  //       : row.revenueItem.length > 10
  //       ? row.revenueItem.substring(0, 8) + "..."
  //       : row.revenueItem
  //   ),
  //   datasets: [
  //     {
  //       label: "Baseline 2021 (GHȼ)",
  //       data: revenueData.map((row) => parseFloat(row.baseline2021.replace(/,/g, ""))),
  //       backgroundColor: "rgba(54, 162, 235, 0.6)",
  //       borderColor: "rgba(54, 162, 235, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "Target 2022 (GHȼ)",
  //       data: revenueData.map((row) => parseFloat(row.target2022.replace(/,/g, ""))),
  //       backgroundColor: "rgba(255, 99, 132, 0.6)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "Actual 2022 (GHȼ)",
  //       data: revenueData.map((row) => parseFloat(row.actual2022.replace(/,/g, ""))),
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "Target 2023 (GHȼ)",
  //       data: revenueData.map((row) => parseFloat(row.target2023.replace(/,/g, ""))),
  //       backgroundColor: "rgba(153, 102, 255, 0.6)",
  //       borderColor: "rgba(153, 102, 255, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // // Chart options
  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Revenue Updates (GHȼ)",
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           let label = context.dataset.label || "";
  //           if (label) {
  //             label += ": ";
  //           }
  //           if (context.parsed.y !== null) {
  //             label += new Intl.NumberFormat("en-GH", {
  //               style: "currency",
  //               currency: "GHS",
  //             }).format(context.parsed.y);
  //           }
  //           return label;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Revenue Items",
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Amount (GHȼ)",
  //       },
  //       ticks: {
  //         callback: function (value) {
  //           return new Intl.NumberFormat("en-GH", {
  //             style: "currency",
  //             currency: "GHS",
  //             minimumFractionDigits: 0,
  //           }).format(value);
  //         },
  //       },
  //     },
  //   },
  // };

  return (
    <div className="col-12">
      <h3>Table 2.3 – Revenue Updates</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Revenue Item</th>
                  <th>Baseline (GHȼ)</th>
                  <th>Target (GHȼ)</th>
                  <th>Actual (GHȼ)</th>

                </tr>
              </thead>
              {/* {JSON.stringify(tableData)} */}
              {tableData && <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.baseline}</td>
                    <td>{row.target}</td>
                    <td>{row.actual}</td>
                  </tr>
                ))}
                {total && <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  <td>{total.name}</td>
                  <td>{total.baseline.toLocaleString()}</td>
                  <td>{total.target.toLocaleString()}</td>
                  <td>{total.actual.toLocaleString()}</td>
                </tr>}
              </tbody>}
            </table>
          </div>
          {/* <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide Chart" : "Show Bar Graph"}
          </button>
          {showChart && (
            <div className="mt-4" style={{ height: "400px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Table2_3;
