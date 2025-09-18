
import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";

const Table2_6 = ({ year, district, period }) => {

  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  // const [total, setTotal] = useState(null);

  useEffect(() => {
    getData();
  }, [year, district, period]);


  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=QoHFZ6cd3Nm&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=QoHFZ6cd3Nm&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              //  const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);

              //  const disbursements = formatDataGeneral(data, "Years", "2025") || [];

              //  const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              //  console.log("disbursement: ", disbursements)
              const data = result.data.instances;
              const reports = resp.data.instances;

              const temps = [];

              data.forEach((key, idx) => {

                const currentReport = reports.find(rep => rep.trackedEntity === key.trackedEntity);
                let allocation = 0.00;
                let receipt = 0.00;
                let targetBen = 0;
                let actualFemale = 0;
                let actualMale = 0;

                if (currentReport) {

                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "HIsJGuRVMqN") {
                      allocation += parseFloat(rep.value);
                    }else if (rep.dataElement === "k3tpjhfxiVe") {
                      receipt += parseFloat(rep.value);
                    }else if (rep.dataElement === "ijnO4FfRU6u") {
                      targetBen += parseFloat(rep.value);
                    }else if (rep.dataElement === "nAvze5yaI4Z") {
                      actualFemale += parseFloat(rep.value);
                    }else if (rep.dataElement === "PazSogYpr0w") {
                      actualMale += parseFloat(rep.value);
                    }
                  });

                }

                const dataSetTemp = {
                  no: idx + 1,
                  issues: getAttributeValue("NDPC | CRIT Critical Development and Poverty Issues", key),
                  allocation,
                  receipt,
                  targetBen,
                  actualFemale,
                  actualMale
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
      <h3>Table 2.6 – Key Critical Poverty Issues, Allocations, Actual Receipt and the Number of Beneficiaries</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">

          <h5>Update on Critical Development and Poverty Issues</h5>

            <h7>
In the attempt to reduce poverty and promote development, Government has introduced 
a number of interventions in the Country. Among these interventions that are operational 
in the Tarkwa Nsuaem Municipal Assembly are: the National Health Insurance Scheme, 
Ghana School Feeding Programme, Capitation Grant, Livelihood Empowerment Against 
Poverty (LEAP) Programme, National Youth Employment Programme, One District One 
Factory Programme, Planting for Food and Jobs, Free SHS Programme, National 
Entrepreneurship and Innovation Plan (NEIP), Implementation of Infrastructure for 
Poverty Eradication Programme (IPEP) and the Nations Builders Corps (NABCO) 
Programme. Table 2.6 presents a matrix showing the summary of key critical poverty 
development issues, the Allocations, Actual Receipt and the Number of beneficiaries.
Details of the various interventions have been given below.</h7>
          <div className="table-responsive">
            <table className="table table-bordered"  style={{marginTop: '20px'}}>
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000',  }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Critical Development and Poverty Issues</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Allocation GH₵</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual Receipt GH₵</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Number of Beneficiaries Target</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Number of Beneficiaries Actual (Female)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Number of Beneficiaries Actual (Male)</th>
                </tr>
              </thead>
             {tableData &&  <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.issues}</td>
                    <td style={{ border: '1px solid #000' }}>{row.allocation.toLocaleString()}</td>
                    <td style={{ border: '1px solid #000' }}>{row.receipt.toLocaleString()}</td>
                    <td style={{ border: '1px solid #000' }}>{row.targetBen}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualFemale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualMale}</td>
                  </tr>
                ))}
              </tbody>}
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
              <APRComment
                data={tableData}
                year={year}
                  districtId={district}
            tableCommentedId={`table2_6-${year}`}
                     
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

export default Table2_6;
