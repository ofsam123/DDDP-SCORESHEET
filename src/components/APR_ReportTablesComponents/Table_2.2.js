
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";

const Table2_2 = ({ year, district }) => {
  
   const [tableData, setTableData] = useState([]);
  
    useEffect(() => {
      getProjects();
    }, [year, district]);
  
    function getProjects() {
      axios
        .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31`)
        .then(result => {
  
          if (result.data.instances.length > 0) {
            const startDate = `${year}-01-01`;
            const endDate = `${year}-12-31`;
  
            axios
              .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
              .then(resp => {
                const data = filterTrackedEntitiesByCreatedAt(result.data.instances, startDate, endDate);
                const projects = formatDataGeneral(data, "Project & Programme Type", "Programme") || [];
  
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
  

  return (
    <div className="col-12">
      <h3>Table 2.2 – Programmes (Non-Physical Projects) Register</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr >
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No.</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Programme Description</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimension of Policy Framework</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount Involved GH¢</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Source of Funding</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Date Started</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expected Date of Completion</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expenditure to Date</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Outstanding Balance</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Implementation Status (%)</th>
                  <th colSpan="2" style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total Beneficiaries</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Remarks</th>
                </tr>
                <tr>
                  <th style={{ borderBottom: '1px solid #000', borderLeft: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ borderBottom: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Male</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Female</th>
                  <th style={{ border: '1px solid #000' }}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.no}</td>
                    <td style={{ border: '1px solid #000' }}>{row.description}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dimension}</td>
                    <td style={{ border: '1px solid #000' }}>{row.contractSum}</td>
                    <td style={{ border: '1px solid #000' }}>{row.fundingSource}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dateStarted}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expectedCompletion}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expenditure}</td>
                    <td style={{ border: '1px solid #000' }}>{row.outstanding}</td>
                    <td style={{ border: '1px solid #000' }}>{row.implementationStatus}</td>
                    <td style={{ border: '1px solid #000' }}>{row.beneficiariesMale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.beneficiariesFemale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Table2_2;
