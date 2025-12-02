import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

const Table_3 = forwardRef(({ year, district, period, hideTableDis }, ref) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_3",
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

              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              // console.log("djiba reports 1: ", reports);
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

                    if (rep.dataElement === "f1T48vHfJc1") {
                      // console.log("percentage: ", rep.value)
                      percentage = rep.value;
                    }
                  });

                }

                const sumTotal = getAttributeValue("Contract Sum", project);

                const dataSetTemp = {
                  no: idx + 1,
                  code: getAttributeValue("ProjectID", project),
                  description: getAttributeValue("Description", project),
                  dimension: getAttributeValue("Development Dimension", project),
                  location: getAttributeValue("Location", project),
                  contractor: getAttributeValue("Contractor", project),
                  contractSum: sumTotal,
                  fundingSource: getAttributeValue("Primary Funding Source", project),
                  dateOfAward: getAttributeValue("Awarded Date", project),
                  dateStarted: getAttributeValue("Start Date", project),
                  expectedCompletion: getAttributeValue("Expected Completion Date", project),
                  expenditure: expendature,
                  outstanding: parseFloat(sumTotal) - parseFloat(expendature),
                  implementationStatus: percentage,
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


  const tableStyle = {
    tableLayout: "fixed",
    border: '1px solid #000',
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: "20px",
    minWidth: '700px' // Ensure enough width for horizontal scroll
  };

  const thStyle = {
    border: '1px solid #000',
    fontWeight: 'bold',
    backgroundColor: '#d4edda'
  };

  const tdStyle = {
    border: '1px solid #000'
  };


  return (
    <div className="col-12">
      <h3>Table 3 – Project Register</h3>
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
          <h7>3 Programme / Project Status for the year
            The projects and programmes being implemented in the Tarkwa-Nsuaem Municipality
            have been categorized under the various sources of funding available to the Assembly.
            These sources of funding are the District Assemblies Common Fund (DACF) and the
            District Assemblies Common Fund Responsive Factor Grant (DACF-RFG). Others are the
            Internally Generated Funds (IGF) and the Minerals Development Fund (MDF).
            The update on projects and programmes has been presented in the registers in Table 2.1
            and 2.2. The registers are made up of the name of the project or programme,
            development dimension, project location, contractor or consultant involved, budget,
            source of funding and type of funding. The other columns also show date started,
            expected completion date, contract sum, expenditure to date, implementation status and
            remarks on the status of implementation. The remarks state the exact physical progress
            of work.
            Projects implementation progressed steadily, and visible improvements were made over
            the period.
          </h7>
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table3-${year}`}
            hideTableDis={hideTableDis}

          />

          {/* --- Two Horizontal Scrollable Tables for Screen View --- */}
          <div className="screen-view-tables">
            <h4>Part 1: Identification and Contract Details</h4>
            <div className="table-responsive">
              <table className="table table-bordered" style={tableStyle}>
                <thead>
                  <tr style={{ border: '1px solid #000' }}>
                    <th style={{ ...thStyle, width: '10%' }}>Code</th>
                    <th style={{ ...thStyle, width: '25%' }}>Project Description</th>
                    <th style={{ ...thStyle, width: '20%' }}>Development Dimension of Policy Framework</th>
                    <th style={{ ...thStyle, width: '15%' }}>Location</th>
                    <th style={{ ...thStyle, width: '20%' }}>Contractor/Consultant</th>
                    <th style={{ ...thStyle, width: '15%' }}>Contract Sum GHȻ</th>
                    <th style={{ ...thStyle, width: '15%' }}>Source of Funding</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{row.code}</td>
                      <td style={tdStyle}>{row.description}</td>
                      <td style={tdStyle}>{row.dimension}</td>
                      <td style={tdStyle}>{row.location}</td>
                      <td style={tdStyle}>{row.contractor}</td>
                      <td style={tdStyle}>{row.contractSum}</td>
                      <td style={tdStyle}>{row.fundingSource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ marginTop: '30px' }}>Part 2: Schedule and Status</h4>
            <div className="table-responsive">
              <table className="table table-bordered" style={tableStyle}>
                <thead>
                  <tr style={{ border: '1px solid #000' }}>
                    <th style={{ ...thStyle, width: '15%' }}>Date of Award</th>
                    <th style={{ ...thStyle, width: '15%' }}>Date Started</th>
                    <th style={{ ...thStyle, width: '15%' }}>Expected Date of Completion</th>
                    <th style={{ ...thStyle, width: '15%' }}>Expenditure to Date</th>
                    <th style={{ ...thStyle, width: '15%' }}>Outstanding Balance</th>
                    <th style={{ ...thStyle, width: '10%' }}>Implementation Status %</th>
                    <th style={{ ...thStyle, width: '25%' }}>Strategies to improve project completion rate</th>
                    <th style={{ ...thStyle, width: '25%' }}>How Citizen were involved in monitoring of works contract</th>
                    <th style={{ ...thStyle, width: '25%' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{row.dateOfAward}</td>
                      <td style={tdStyle}>{row.dateStarted}</td>
                      <td style={tdStyle}>{row.expectedCompletion}</td>
                      <td style={tdStyle}>{row.expenditure}</td>
                      <td style={tdStyle}>{row.outstanding}</td>
                      <td style={tdStyle}>{row.implementationStatus}</td>
                      <td style={tdStyle}>{ }</td> {/* Empty column 1 */}
                      <td style={tdStyle}>{ }</td> {/* Empty column 2 */}
                      <td style={tdStyle}>{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Printable Version (Compact) --- */}
          <div className="table-printable-version" style={{ display: 'none' }}>
            <div className="table-responsive">
              <table className="table table-bordered" style={{ ...tableStyle, tableLayout: 'auto' }}>
                <thead>
                  <tr style={{ border: '1px solid #000' }}>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Code</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Project Description</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Development Dimension</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Location</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Contractor</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Contract Sum GHȻ</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Funding Source</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Award/Start/Expected Completion Dates</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Expenditure/Outstanding</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Impl. Status % / Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.code}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.description}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.dimension}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.location}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.contractor}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.contractSum}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.fundingSource}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Award:** {row.dateOfAward}<br />
                        **Start:** {row.dateStarted}<br />
                        **Exp. Comp:** {row.expectedCompletion}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Exp.:** {row.expenditure}<br />
                        **Out.:** {row.outstanding}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Status:** {row.implementationStatus}%<br />
                        **Remarks:** {row.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>

          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table3-${year}`}
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

export default Table_3;