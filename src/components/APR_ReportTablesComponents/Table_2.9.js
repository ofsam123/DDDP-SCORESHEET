
import React from "react";

const Table2_9 = () => {
  // Evaluation data as provided, with placeholder for additional rows
  const evaluationData = [
    {
      name: "Terminal Evaluation of Tarkwa-Nsuaem Municipal Assembly’s 2018-2021 Medium-Term Development Plan",
      policy: "THE TARKWA-NSUAEM MEDIUM-TERM DEVELOPMENT PLAN 2018-2021",
      consultant: "KAAA CONSULT",
      methodology: "Appreciative Inquiry (AI) approach and Theory of Change",
      findings: " N/A",
      recommendations: "N/A",
    },
    // Placeholder for additional evaluations
    { name: "N/A", policy: "N/A", consultant: "N/A", methodology: "N/A", findings: "N/A", recommendations: "N/A" },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.9 – Update on Evaluations Conducted</h3>
      <div className="card">
        <div className="card-header">Table 2.9 – Update on Evaluations Conducted</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{  }}>
                <tr>
                  <th style={{ textAlign: "left" }}>Name of the Evaluation</th>
                  <th style={{ textAlign: "left" }}>Policy/Programme/Project Involved</th>
                  <th style={{ textAlign: "left" }}>Consultant or Resource Persons Involved</th>
                  <th style={{ textAlign: "left" }}>Methodology Used</th>
                  <th style={{ textAlign: "left" }}>Findings</th>
                  <th style={{ textAlign: "left" }}>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {evaluationData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.name}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.policy}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.consultant}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.methodology}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.findings}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.recommendations}</td>
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

export default Table2_9;
