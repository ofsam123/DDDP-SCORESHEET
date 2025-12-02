
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import moment from "moment";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

const ranges = [
  { label: "Projects that are 20 years but less than 24 years", min: 20, max: 24 },
  { label: "Projects that are 11 years but less than 20 years", min: 11, max: 20 },
  { label: "Projects that are 10 years but less than 11 years", min: 10, max: 11 },
  { label: "Projects that are 9 years but less than 10 years", min: 9, max: 10 },
  { label: "Projects that are 8 years but less than 9 years", min: 8, max: 9 },
  { label: "Projects that are 7 years but less than 8 years", min: 7, max: 8 },
  { label: "Projects that are 6 years but less than 7 years", min: 6, max: 7 },
  { label: "Projects that are 5 years but less than 6 years", min: 5, max: 6 },
  { label: "Projects that are 4 years but less than 5 years", min: 4, max: 5 },
  { label: "Projects that are 3 years but less than 4 years", min: 3, max: 4 },
  { label: "Projects that are 2 years but less 3 years", min: 2, max: 3 },
  { label: "Projects that are 1 years but less than 2 years", min: 1, max: 2 },
  { label: "Projects that are 0 years but less than 1 years", min: 0, max: 1 }
];

const Table_6 = forwardRef(({ year, district, period, hideTableDis }, ref) => {

  const [tableData, setTableData] = useState([]);
  const [tableDataDummy, setTableDataDummy] = useState([]);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_6",
      tableData
    }),
  }));

  function getProjects() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const projects = formatDataGeneral(data, "Project & Programme Type", "Project") || [];
              const reports = resp.data.instances;
              const temp = [];

              projects.forEach((project, idx) => {

                const currentReport = reports.filter(rep => rep.trackedEntity === project.trackedEntity);
                let projectStatus = "";
                let completionPercentage = 0;

                if (currentReport) {

                  currentReport.forEach(curReport => {
                    curReport.dataValues.forEach(rep => {
                      if (rep.dataElement === "tE3QKB203nh") {
                        projectStatus = rep.value;
                      }

                      if (rep.dataElement === "GDx6SDw1pgH") {
                        completionPercentage = rep.value;
                      }

                    });
                  })

                }

                const expectedCompletion = getAttributeValue("Expected Completion Date", project);
                const dataSetTemp = {
                  no: idx + 1,
                  expectedStart: getAttributeValue("Expected Start Date", project),
                  expectedCompletion,
                  department: getAttributeValue("Department", project),
                  costOverrun: getAttributeValue("Rollover Cost", project),
                  projectStatus,
                  completionPercentage,
                  duration: calculateTimeOverrun(expectedCompletion)
                };

                temp.push(dataSetTemp);
              });



              const dataGrouped = groupOverrolByDepartments(temp);

              setTableDataDummy(dataGrouped);

              setTableData(dataGrouped);


            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  };

  function calculateTimeOverrun(expectedCompletionDate) {
    const today = new Date();
    const completion = new Date(expectedCompletionDate);

    // If expected completion is in the future, no overrun
    if (completion >= today) {
      return "0 years, 0 months";
    }

    let years = today.getFullYear() - completion.getFullYear();
    let months = today.getMonth() - completion.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years} years, ${months} months`;
  }


  const groupOverrolByDepartments = (projects) => {

    const temp = [];

    projects.forEach(p => {
      if (!p.expectedStart.includes(year)) {
        const projectYear = new Date(p.expectedCompletion).getFullYear();
        if ((projectYear < year) && !p.projectStatus.includes("Completed")) {
          temp.push(p);
        }
      }
    });

    // Utility to calculate duration between completion date & today
    function calculateDurationInYears(project) {
      const completion = new Date(project.expectedCompletion);
      const today = new Date();
      let years = today.getFullYear() - completion.getFullYear();
      let months = today.getMonth() - completion.getMonth();

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      return { years, months };
    }

    // Format duration like "X years, Y months"
    function formatDuration(totalMonths) {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} years, ${months} months`;
    }

    // Build static ranges (covering all ranges you want)


    // Main grouping function
    function groupProjectsByRanges(projects) {
      return ranges.map(range => {
        // Get projects in this range
        const filtered = projects.filter(p => {
          const { years } = calculateDurationInYears(p);
          return years >= range.min && years < range.max;
        });

        if (filtered.length === 0) {
          return {
            range: range.label,
            count: "N/A*",
            overrun: "N/A*",
            costOverrun: "N/A*",
            averageCompletionRate: "N/A*",
            highest: "N/A*",
            least: "N/A*"
          };
        }

        // Compute aggregates
        const totalMonths = filtered.reduce((sum, p) => {
          const { years, months } = calculateDurationInYears(p);
          return sum + years * 12 + months;
        }, 0);

        const totalCostOverrun = filtered.reduce((sum, p) => {
          const value = typeof p.costOverrun === "string"
            ? Number(p.costOverrun.replace(/,/g, "")) // remove commas
            : Number(p.costOverrun || 0);
          return sum + (isNaN(value) ? 0 : value);
        }, 0);


        // 🔑 Ensure percentages are numbers
        const completionRates = filtered
          .map(p => Number(p.completionPercentage))
          .filter(n => !isNaN(n));

        const avg =
          completionRates.reduce((a, b) => a + b, 0) / completionRates.length;

        return {
          range: range.label,
          count: filtered.length,
          overrun: formatDuration(totalMonths),
          costOverrun: totalCostOverrun,
          averageCompletionRate: avg.toFixed(2),
          highest: Math.max(...completionRates),
          least: Math.min(...completionRates)
        };
      });
    }

    return groupProjectsByRanges(temp);
  }

  return (
    <div className="col-12">
      <h3>Table 6 - Project Age Analysis</h3>
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
          {/* {JSON.stringify(tableDataDummy)} */}
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table6-${year}`}
            hideTableDis={hideTableDis}

          />


          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Project Age</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No. of projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Time Over runs(in years and months)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Cost overruns</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Completion status</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                </tr>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Average Completion Rate (%)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Highest(%)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Least(%)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.range}</td>
                    <td style={{ border: '1px solid #000' }}>{row.count}</td>
                    <td style={{ border: '1px solid #000' }}>{row.overrun}</td>
                    <td style={{ border: '1px solid #000' }}>{row.costOverrun}</td>
                    <td style={{ border: '1px solid #000' }}>{row.averageCompletionRate}</td>
                    <td style={{ border: '1px solid #000' }}>{row.highest}</td>
                    <td style={{ border: '1px solid #000' }}>{row.least}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table7-${year}`}

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

export default Table_6;
