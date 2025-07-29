
import React, { useEffect, useState } from "react";
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
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral } from "../../utils/utils";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table2_4 = ({ year, district }) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);
 
   useEffect(() => {
     getData();
   }, [year, district]);
 
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
         baseline: baselineItem ? Number(baselineItem.value).toLocaleString() : 0,
         target: targetItem ? Number(targetItem.value).toLocaleString() : 0,
         actual: 0
       };
     });
 
     result.map(el => {
 
       for (let r of reports.dataValues) {
         if (el.name === 'COMPENSATION' && r.dataElement === "iF3bVYzJUE6") {
           el.actual = Number(r.value).toLocaleString();
           break;
         } else if (el.name === 'GOODS AND SERVICES' && r.dataElement === "ZKwpRsX6DIE") {
           el.actual = Number(r.value).toLocaleString();
           break;
         } else if (el.name === 'INVESTMENTS/ASSETS' && r.dataElement === "LKTrRHSCoEk") {
           el.actual = Number(r.value).toLocaleString();
           break;
         }
       }
 
     });
 
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
             .get(`/tracker/events?program=WHILilRZRhT&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
             .then(resp => {
               const data = filterTrackedEntitiesByCreatedAt(result.data.instances, startDate, endDate);
 
               const disbursements = formatDataGeneral(data, "Years", "2025") || [];
 
               const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              //  console.log("disbursement: ", disbursements)
 
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
             .catch(err => console.log(err))
         }
 
       })
       .catch(err => console.log(err))
   }
 

  // Data for Figure 2.3: Revenue, Expenditure, and Surplus (2022)
  const chartData = {
    labels: ["2022"],
    datasets: [
      {
        label: "Revenue (2022) (GHȼ)",
        data: [26533161.85], // From Table 2.3 TOTAL, Actual 2022
        backgroundColor: "rgba(255, 215, 0, 0.6)", // Yellow (approximating image color)
        borderColor: "rgba(255, 215, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenditure (2022) (GHȼ)",
        data: [25320798.32], // From Table 2.4 TOTAL, Actual 2022
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red (approximating image color)
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Surplus (GHȼ)",
        data: [1212363.53], // Revenue - Expenditure
        backgroundColor: "rgba(0, 128, 0, 0.6)", // Green (approximating image color)
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Figure 2.3 – Total Receipt against Total Expenditure",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-GH", {
                style: "currency",
                currency: "GHS",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (GHȼ)",
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-GH", {
              style: "currency",
              currency: "GHS",
              minimumFractionDigits: 0,
            }).format(value);
          },
        },
        suggestedMin: 0, // Start from 0 to match image
        suggestedMax: 30000000, // End around 30M to match image
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 2.4 – Update of Disbursement</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Expenditure Item</th>
                  <th>Baseline (GHȼ)</th>
                  <th>Target (GHȼ)</th>
                  <th>Actual (GHȼ)</th>
                </tr>
              </thead>
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
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <h4 className="mt-4">Figure 2.3 – Total Receipt against Total Expenditure</h4>
          <p>Figure 2.3 compares total receipts against total disbursement during the year under review.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide Figure 2.3" : "Show Figure 2.3"}
          </button>
          {showChart && (
            <div className="mt-4" style={{ height: "300px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table2_4;
