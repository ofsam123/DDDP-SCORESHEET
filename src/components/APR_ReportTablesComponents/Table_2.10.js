
import React from "react";

const Table2_10 = () => {
  // Dummy data for PM&E activities
  const pmeData = [
    {
      name: "Participatory Monitoring Tool A",
      policy: "Tarkwa-Nsuaem Education Program 2022-2025",
      consultant: "John Doe & Team",
      methodology: "Focus Group Discussions and Surveys",
      findings: "High engagement from local communities; some delays in implementation due to logistical issues.",
      recommendations: "Improve logistical planning and increase community training sessions.",
    },
    {
      name: "Evaluation Framework B",
      policy: "Health Infrastructure Project 2023",
      consultant: "Jane Smith & Associates",
      methodology: "Interviews and Data Analysis",
      findings: "Satisfactory progress in facility construction; funding gaps identified.",
      recommendations: "Secure additional funding and accelerate construction timelines.",
    },
    {
      name: "Community Feedback Tool C",
      policy: "Rural Development Initiative 2022",
      consultant: "Michael Brown",
      methodology: "Community Workshops",
      findings: "Positive feedback on agricultural support; need for better water access.",
      recommendations: "Prioritize water infrastructure development.",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.10 – Update on PM&E Conducted</h3>
      <div className="card">
        <div className="card-header">Table 2.10 – Update on PM&E Conducted</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ }}>
                <tr>
                  <th style={{ textAlign: "left" }}>Name of the PM&E Tool</th>
                  <th style={{ textAlign: "left" }}>Policy/Programme/Project Involved</th>
                  <th style={{ textAlign: "left" }}>Consultant or Resource Persons Involved</th>
                  <th style={{ textAlign: "left" }}>Methodology Used</th>
                  <th style={{ textAlign: "left" }}>Findings</th>
                  <th style={{ textAlign: "left" }}>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {pmeData.map((row, index) => (
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

export default Table2_10;
