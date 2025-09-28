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
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";
import axios from "../../api/axios";
import { getProjectDetails, groupProjectByDevelopmentDimension } from "../../utils/utils";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_4 = ({ year, district, period }) => { // Default year set to 2024, adjustable via prop
  const [tableData, setTableData] = useState([]);
  const [tableDataDummy, setTableDataDummy] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);


  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        axios
          .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
          .then(resp => {
            const reports = resp.data.instances;
            const projectDetails = getProjectDetails(result.data.instances, reports);

            const developmentDimension = [
              "Economic Development (ED)", "Social Development (SD)",
              "Governance, Corruption And Public Accountability(GCPA)", "Environment, infrastructure and human settlement",
              "Emergency Planning And Covid-19 Response", "Implementation, Coordination, Monitoring And Evaluation"
            ];

            const groupDevelopment = groupProjectByDevelopmentDimension(projectDetails, developmentDimension, year);
            const groupDevelopment1 = groupProjectByDevelopmentDimension(projectDetails, developmentDimension, `${year - 1}`);
            const groupDevelopment2 = groupProjectByDevelopmentDimension(projectDetails, developmentDimension, `${year - 2}`);
            const dataGrouped = { groupDevelopment, groupDevelopment1, groupDevelopment2 };
            // console.log("Djiba DD data: ", dataGrouped);

            // Step 1: merge departments by index (assuming they align by index/department)
            const formatted = dataGrouped.groupDevelopment.map((dept, index) => {
              const dept1 = dataGrouped.groupDevelopment1[index];
              const dept2 = dataGrouped.groupDevelopment2[index];

              return {
                department: dept.department.replace(/\s*\([^)]*\)/, ""), // remove text in brackets e.g. (ED)
                rollover2: dept2.rollover,
                rollover1: dept1.rollover,
                rollover: dept.rollover,
                new2: dept2.new,
                new1: dept1.new,
                new: dept.new
              };
            });

            // Step 1: add totalRow for each department
            const withRowTotals = formatted.map(item => {
              const totalRow = item.rollover2 + item.rollover1 + item.rollover + item.new2 + item.new1 + item.new;
              return { ...item, totalRow };
            });

            // Step 2: compute overall totals row
            const totals = withRowTotals.reduce(
              (acc, item) => {
                acc.rollover2 += item.rollover2;
                acc.rollover1 += item.rollover1;
                acc.rollover += item.rollover;
                acc.new2 += item.new2;
                acc.new1 += item.new1;
                acc.new += item.new;
                acc.totalRow += item.totalRow;
                return acc;
              },
              { department: "Total", rollover2: 0, rollover1: 0, rollover: 0, new2: 0, new1: 0, new: 0, totalRow: 0 }
            );

            // Step 3: append total row
            const finalResult = [...withRowTotals, totals];


            setTableDataDummy(finalResult);
            setTableData(finalResult)


          })
          .catch(err => console.log(err))


      })
      .catch(err => console.log(err))
  };


  const chartData = {
    labels: tableData.map((row) => row.developmentDimension),
    datasets: [
      {
        label: "Total Projects",
        data: tableData.map((row) => row.total),
        backgroundColor: "#007bff", // Blue for total projects
        borderColor: "#0056b3",
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
        text: `Total Number of Active Projects by Development Dimension, ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Projects",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 4: Total number of active projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table4-${year}`}

          />
          <div className="table-responsive">
            {/* {JSON.stringify(tableDataDummy)} */}
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimension</th>
                  <th colSpan="3" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Roll over projects from previous years</th>
                  <th colSpan="3" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Approved new projects introduced in the year</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total</th>
                </tr>

                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year - 2}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year - 1}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year - 2}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year - 1}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>{year}</th>

                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover2}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover1}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover}</td>
                    <td style={{ border: '1px solid #000' }}>{row.new2}</td>
                    <td style={{ border: '1px solid #000' }}>{row.new1}</td>
                    <td style={{ border: '1px solid #000' }}>{row.new}</td>
                    <td style={{ border: '1px solid #000' }}>{row.totalRow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table4-${year}`}

          >
            {({ renderCommentInput, renderCommentList }) => (
              <>
                {renderCommentInput()}
                {renderCommentList()}
              </>
            )}
          </APRComment>

          {/* Bar Chart */}
          <h4>Figure 4: Total Number of Active Projects by Development Dimension</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Table_4;