
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, getAttributeValue, getPlanExecutionStats } from "../../utils/utils";

const Table1_2 = ({ year, district }) => {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getAnnualActionPlan();
  }, [year, district]);

  function getAnnualActionPlan() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {

        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const aap = filterTrackedEntitiesByCreatedAt(result.data.instances, startDate, endDate);
              const reports = resp.data.instances;
              const formatedPlans = [];

              aap.forEach((plan, idx) => {
                const dataSetTemp = {
                  index: idx,
                  dd: getAttributeValue("Development Dimension", plan),
                  date: plan.createdAt,
                  trackedEntity: plan.trackedEntity
                };

                formatedPlans.push(dataSetTemp);
              });

              console.log(formatedPlans)

              const counts = getPlanExecutionStats(formatedPlans, reports);

              setTableData(counts);


            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  }


  return (
    <div className="col-12">
      <h3>Table 1.2 – Details on Annual Action Plan Implemented under the Development Dimensions</h3>
      <div className="card">
        <div className="card-header">
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>S/N</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimensions</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold', textAlign: 'center' }} colSpan="2">2022</th>
                </tr>
                <tr style={{ fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Planned</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Executed</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} style={
                    row.dimension === "Total"
                      ? { fontWeight: 'bold'}
                      : {}
                  }>
                    <td style={{ border: '1px solid #000', fontWeight: 'bold' }}>{row.no}</td>
                    <td style={{ border: '1px solid #000' }}>{row.dimension}</td>
                    <td style={{ border: '1px solid #000' }}>{row.planned}</td>
                    <td style={{ border: '1px solid #000' }}>{row.executed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <p className="mt-3">
            From the above table, it can be noted that the Municipality placed premium on all the six development dimensions under the Agenda for Jobs II policy framework. It earmarked and implemented various interventions for a holistic development towards the achievement of the set goal. Development therefore was widely spread across the various sectors, and none skewed.
            <br /><br />
            Out of the 30 planned activities under Economic Development, all 30 were executed. Social Development had the highest number of planned activities during the year with 45 activities executed out of the total 48 activities. Under Environment, Infrastructure & Human Settlement dimension, all 30 planned activities were executed. Governance, Corruption & Public Accountability dimension also saw 22 activities executed out of 22 planned activities. Equally, all planned activities under Emergency Planning & Preparedness, as well as Implementation, Co-ordination, Monitoring and Evaluation dimensions were also executed. This puts the total number of activities implemented at 134 out of 137 planned.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table1_2;
