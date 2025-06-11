
import React from "react";

const Table2_7 = () => {
  // School data as provided
  const schoolData = [
    {
      no: "1",
      school: "Abompuniso M/A Primary",
      caterer: "Elizabeth Amanamah",
      boys: "261",
      girls: "236",
      total: "497",
    },
    {
      no: "2",
      school: "Agona Wassa Meth. Primary",
      caterer: "Regina Kuchana",
      boys: "251",
      girls: "239",
      total: "490",
    },
    {
      no: "3",
      school: "Pataho M/A Primary",
      caterer: "Beatrice Howard",
      boys: "161",
      girls: "120",
      total: "281",
    },
    {
      no: "4",
      school: "Bonsa M/A Basic Primary",
      caterer: "Mavis Kwamekyi",
      boys: "157",
      girls: "142",
      total: "299",
    },
    {
      no: "5",
      school: "Amantin M/A Primary",
      caterer: "Kubara Shaibu",
      boys: "157",
      girls: "142",
      total: "351",
    },
    {
      no: "6",
      school: "Benso Essamang M/A Primary",
      caterer: "Ernestina Quaicoo",
      boys: "61",
      girls: "48",
      total: "109",
    },
    {
      no: "7",
      school: "Memahomo M/A Primary",
      caterer: "Ruth Amanamah",
      boys: "229",
      girls: "223",
      total: "452",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.7 – Details of beneficiary schools and corresponding enrolment figures</h3>
      <div className="card">
        <div className="card-header">Table 2.7 – Details of beneficiary schools and corresponding enrolment figures</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ }}>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "left" }}>School</th>
                  <th style={{ textAlign: "left" }}>Name of Caterer</th>
                  <th style={{ textAlign: "center" }}>Enrolment Boys</th>
                  <th style={{ textAlign: "center" }}>Enrolment Girls</th>
                  <th style={{ textAlign: "center" }}>Total Enrolment Figure</th>
                </tr>
              </thead>
              <tbody>
                {schoolData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{row.no}</td>
                    <td style={{ textAlign: "left" }}>{row.school}</td>
                    <td style={{ textAlign: "left" }}>{row.caterer}</td>
                    <td style={{ textAlign: "center" }}>{row.boys}</td>
                    <td style={{ textAlign: "center" }}>{row.girls}</td>
                    <td style={{ textAlign: "center" }}>{row.total}</td>
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

export default Table2_7;
