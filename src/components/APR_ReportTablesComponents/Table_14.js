import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import { filterTrackedEntitiesByCreatedAt, getAttributeValue, getDataByTypes, getProjectDetails, groupProjectsBySectorAmount, groupProjectsBySectorAmountWithBudget } from "../../utils/utils";
import axios from "../../api/axios";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Table14 Component
const Table_14 = forwardRef(({ year, district, period , hideTableDis}, ref) => { // Updated to 2025 as per current date
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);

  useImperativeHandle(ref, () => ({
      getData: () => ({
        indicator: "Table_14",
        tableData
      }),
    }));


  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        axios
          .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
          .then(resp => {
            const reports = resp.data.instances;
            const projectDetails = getProjectDetails(result.data.instances, reports);
            axios
              .get(`/tracker/trackedEntities?orgUnit=${district}&program=YHVtzXj8iIC&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
              .then(resp => {
                const budgets = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);

                const sectors = [
                  "Health", "Education", "Governance/Administration", "Water and Sanitation",
                  "Roads and Transport", "Trade, Industry and Tourism", "Security"
                ];

                const budgetBySectors = getDataByTypes(budgets, "Sector", sectors) || [];
                const tempBudget = [];

                 budgetBySectors.forEach(b=>{
                  tempBudget.push({
                    sector: getAttributeValue("Sector", b),
                    budget: getAttributeValue("Allocated Budget", b),
                  })
                });

                const goupBySector = groupProjectsBySectorAmountWithBudget(projectDetails, sectors, tempBudget,  year);

                setTableData(goupBySector);


              })
              .catch(err => console.log(err))

          })
          .catch(err => console.log(err))


      })
      .catch(err => console.log(err))
  };

  const chartData = {
    labels: tableData.map((row) => row.sector),
    datasets: [
      {
        label: "Capital Envelope Amount",
        data: tableData.map((row) => row.capitalEnvelope),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Amount Spent on Rollover Projects",
        data: tableData.map((row) => row.rollover),
        backgroundColor: "#ff9800",
        borderColor: "#e07a00",
        borderWidth: 1,
      },
      {
        label: "Amount Spent on New Projects",
        data: tableData.map((row) => row.newProjects),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Capital Envelope Spending Analysis, ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (GHS)",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 14: Amount of capital envelope spent on active projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">

          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table14-${year}`}
            hideTableDis={hideTableDis}

          />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Sector</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Capital envelope amount</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount spent on rollover projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount spent on new projects</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row?.sector}</td>
                    <td style={{ border: '1px solid #000' }}>{row?.capitalEnvelop.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row?.rolloverCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row?.newCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Payment Vouchers & Trial Balance, {year}</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 9: Capital Envelope Spending Analysis, {year}</h4>
          <Bar data={chartData} options={chartOptions} />
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table14-${year}`}

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

export default Table_14;