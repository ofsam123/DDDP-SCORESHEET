import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

const Table_8 = forwardRef(({ year, district, period, hideTableDis }, ref) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_8",
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
              const projects = formatDataGeneral(data, "Project & Programme Type", "Programme") || [];

              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              const temps = [];

              projects.forEach((project, idx) => {

                const currentReport = reports.find(rep => rep.trackedEntity === project.trackedEntity);
                let expendature = 0.00;
                let percentage = 0;

                if (currentReport) {

                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "jr8gk707kAw") {
                      expendature = rep.value;
                    }

                    if (rep.dataElement === "f1T48vHfJc1") {
                      percentage = rep.value;
                    }
                  });

                }

                const sumTotal = getAttributeValue("Contract Sum", project);

                const dataSetTemp = {
                  no: idx + 1,
                  description: getAttributeValue("Description", project),
                  dimension: getAttributeValue("Development Dimension", project),
                  contractSum: sumTotal,
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
  
  const tableStyle = {
    tableLayout: "fixed",
    border: '1px solid #000',
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: "20px",
    minWidth: '950px' // Ensure enough width for horizontal scroll
  };

  const thStyle = {
    border: '1px solid #000',
    fontWeight: 'bold',
    backgroundColor: '#d4edda',
    textAlign: 'center',
    verticalAlign: 'middle'
  };

  const tdStyle = {
    border: '1px solid #000',
    verticalAlign: 'top',
    padding: '8px'
  };

  return (
    <div className="col-12">
      <h3>Table 8 – Programmes (Non-Physical Projects) Register</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table8-${year}`}
            hideTableDis={hideTableDis}
          />
          
          {/* --- Two Horizontal Scrollable Tables for Screen View --- */}
          <div className="screen-view-tables">
             {/* Part 1: Identification, Dates, and Financials */}
            <h4>Part 1: Programme Details, Dates, and Financials</h4>
            <div className="table-responsive">
              <table className="table table-bordered" style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                    <th style={{ ...thStyle, width: '5%' }} rowSpan="2">#</th>
                    <th style={{ ...thStyle, width: '25%' }} rowSpan="2">Programme Description</th>
                    <th style={{ ...thStyle, width: '20%' }} rowSpan="2">Development Dimension of Policy Framework</th>
                    <th style={{ ...thStyle, width: '15%' }} rowSpan="2">Amount Involved GH¢</th>
                    <th style={{ ...thStyle, width: '15%' }} rowSpan="2">Source of Funding</th>
                    <th style={{ ...thStyle, width: '10%' }} rowSpan="2">Date Started</th>
                    <th style={{ ...thStyle, width: '10%' }} rowSpan="2">Expected Date of Completion</th>
                    <th style={{ ...thStyle, width: '15%' }} colSpan="2">Balance</th>
                  </tr>
                  <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                     <th style={{ ...thStyle, width: '7.5%' }}>Expenditure to Date</th>
                     <th style={{ ...thStyle, width: '7.5%' }}>Outstanding Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{row.no}</td>
                      <td style={tdStyle}>{row.description}</td>
                      <td style={tdStyle}>{row.dimension}</td>
                      <td style={tdStyle}>{row.contractSum}</td>
                      <td style={tdStyle}>{row.fundingSource}</td>
                      <td style={tdStyle}>{row.dateStarted}</td>
                      <td style={tdStyle}>{row.expectedCompletion}</td>
                      <td style={tdStyle}>{row.expenditure}</td>
                      <td style={tdStyle}>{row.outstanding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Part 2: Status, Pictures, and Beneficiaries */}
            <h4 style={{ marginTop: '30px' }}>Part 2: Status, Pictures, and Beneficiaries/Remarks</h4>
            <div className="table-responsive">
              <table className="table table-bordered" style={{...tableStyle, minWidth: '550px'}}>
                <thead>
                  <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                    <th style={{ ...thStyle, width: '10%' }} rowSpan="2">Implementation Status (%)</th>
                    <th style={{ ...thStyle, width: '10%' }} rowSpan="2">Pictures</th>
                    <th style={{ ...thStyle, width: '20%' }} colSpan="2">Total Beneficiaries</th>
                    <th style={{ ...thStyle, width: '20%' }} rowSpan="2">Remarks</th>
                  </tr>
                  <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                    <th style={{ ...thStyle, width: '10%' }}>Male</th>
                    <th style={{ ...thStyle, width: '10%' }}>Female</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{row.implementationStatus}</td>
                      <td style={tdStyle}>{/* Insert image link/component here if available */}</td>
                      <td style={tdStyle}>{row.beneficiariesMale}</td>
                      <td style={tdStyle}>{row.beneficiariesFemale}</td>
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
                   <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">No.</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Programme / Dimension</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Amount GH¢ / Source</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Start/Expected Completion Dates</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Expenditure / Outstanding Balance</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Impl. Status (%)</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} colSpan="2">Total Beneficiaries</th>
                    <th style={{ ...thStyle, fontSize: '10px' }} rowSpan="2">Remarks</th>
                  </tr>
                  <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold' }}>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Male</th>
                    <th style={{ ...thStyle, fontSize: '10px' }}>Female</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.no}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Desc:** {row.description}<br />
                        **Dim:** {row.dimension}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                         **Amt:** {row.contractSum}<br />
                         **Src:** {row.fundingSource}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Start:** {row.dateStarted}<br />
                        **Exp. Comp:** {row.expectedCompletion}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>
                        **Exp.:** {row.expenditure}<br />
                        **Out.:** {row.outstanding}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.implementationStatus}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.beneficiariesMale}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.beneficiariesFemale}</td>
                      <td style={{ ...tdStyle, fontSize: '9px' }}>{row.remarks}</td>
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
            tableCommentedId={`table8-${year}`}
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

export default Table_8;