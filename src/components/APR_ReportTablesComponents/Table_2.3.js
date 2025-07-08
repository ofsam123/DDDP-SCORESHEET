
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
   
     useEffect(() => {
       getProjects();
     }, [year, district]);
   
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
                 const projects = formatDataGeneral(data, "Project & Programme Type", "Programme") || [];
   
                 const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);
   
                 console.log("djiba reports: ", {data, reports});
                 const temps = [];
   
                 projects.forEach((project, idx) => {
   
                   const currentReport = reports.find(rep => rep.trackedEntity === project.trackedEntity);
                   let expendature = 0.00;
                   let percentage = 0;
   
                   if (currentReport) {
   
                     currentReport.dataValues.forEach(rep => {
                       if (rep.dataElement === "jr8gk707kAw") {
                         // console.log("expendature: ",rep.value)
                         expendature = rep.value;
                       }
   
                       if(rep.dataElement === "f1T48vHfJc1"){
                         console.log("percentage: ",rep.value)
                           percentage = rep.value;
                       }
                     });
   
                   }
   
                   const sumTotal = getAttributeValue("Contract Sum", project);
   
                   const dataSetTemp = {
                     no: idx + 1,
                     description: getAttributeValue("Description", project),
                     dimension: getAttributeValue("Development Dimension", project),
                     contractSum: sumTotal ,
                     fundingSource: getAttributeValue("Primary Funding Source", project),
                     dateStarted: getAttributeValue("Start Date", project),
                     expectedCompletion: getAttributeValue("Expected Completion Date", project),
                     expenditure: expendature,
                     outstanding: parseFloat(sumTotal) - parseFloat(expendature),
                     implementationStatus: percentage,
                     beneficiariesMale: getAttributeValue("Total Male Beneficiary", project),
                     beneficiariesFemale: getAttributeValue("Total Female Beneficiary", project),
                     remarks: getAttributeValue("Remarks", project)
                   };
  
                   temps.push(dataSetTemp);
                 });
   
   
                 setTableData(temps);
   
   
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
                  <th>Baseline 2021 (GHȼ)</th>
                  <th>Target 2022 (GHȼ)</th>
                  <th>Actual 2022 (GHȼ)</th>
                  <th>Target 2023 (GHȼ)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.revenueItem}</td>
                    <td>{row.baseline2021}</td>
                    <td>{row.target2022}</td>
                    <td>{row.actual2022}</td>
                    <td>{row.target2023}</td>
                  </tr>
                ))}
              </tbody>
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
