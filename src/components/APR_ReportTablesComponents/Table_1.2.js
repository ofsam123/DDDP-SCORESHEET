
import React from "react";

const Table1_2 = () => {
  // Table 1.2 data
  const tableData = [
    {
      sn: 1,
      dimension: "Economic Development",
      planned: 30,
      executed: 30,
    },
    {
      sn: 2,
      dimension: "Social Development",
      planned: 48,
      executed: 45,
    },
    {
      sn: 3,
      dimension: "Environment, Infrastructure and Human Settlement",
      planned: 30,
      executed: 30,
    },
    {
      sn: 4,
      dimension: "Governance, Corruption and Public Accountability",
      planned: 22,
      executed: 22,
    },
    {
      sn: 5,
      dimension: "Emergency Planning & Preparedness",
      planned: 2,
      executed: 2,
    },
    {
      sn: 6,
      dimension: "Implementation, Co-ordination, Monitoring and Evaluation",
      planned: 5,
      executed: 5,
    },
    {
      sn: "Total",
      dimension: "",
      planned: 137,
      executed: 134,
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 1.2 – Details on Annual Action Plan Implemented under the Development Dimensions</h3>
      <div className="card">
        <div className="card-header">Table 1.2 – Details on Annual Action Plan Implemented under the Development Dimensions</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Development Dimensions</th>
                  <th colSpan="2">2022</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Planned</th>
                  <th>Executed</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sn}</td>
                    <td>{row.dimension}</td>
                    <td>{row.planned}</td>
                    <td>{row.executed}</td>
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
