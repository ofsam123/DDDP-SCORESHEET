
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";

const Table2_1 = ({ year, district, period }) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

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
                      console.log("percentage: ", rep.value)
                      percentage = rep.value;
                    }
                  });

                }

                const sumTotal = getAttributeValue("Contract Sum", project);

                const dataSetTemp = {
                  no: idx + 1,
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


  return (
    <div className="col-12">
      <h3>Table 2.1 – Project Register</h3>
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
          <h7>2.1 Programme / Project Status for the year
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
            the period. </h7>
          <div className="table-responsive">
            <table className="table table-bordered" style={{
              border: '1px solid #000',
              borderCollapse: 'collapse',
              width: '100%',
              marginTop: "20px"
            }}>
              <thead>
                <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No.</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Project Description</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimension of Policy Framework</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Location</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Contractor/Consultant</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Contract Sum GHȻ</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Source of Funding</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Date of Award</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Date Started</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expected Date of Completion</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expenditure to Date</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Outstanding Balance</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Implementation Status %</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.no}</td>
                    <td style={{ border: '1px solid #000' }}>{row.description}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dimension}</td>
                    <td style={{ border: '1px solid #000' }}>{row.location}</td>
                    <td style={{ border: '1px solid #000' }}>{row.contractor}</td>
                    <td style={{ border: '1px solid #000' }}>{row.contractSum}</td>
                    <td style={{ border: '1px solid #000' }}>{row.fundingSource}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dateOfAward}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dateStarted}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expectedCompletion}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expenditure}</td>
                    <td style={{ border: '1px solid #000' }}>{row.outstanding}</td>
                    <td style={{ border: '1px solid #000' }}>{row.implementationStatus}</td>
                    <td style={{ border: '1px solid #000' }}>{row.remarks}</td>
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
                      tableCommentedId={`table2_1-${year}`}
                     
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

export default Table2_1;
