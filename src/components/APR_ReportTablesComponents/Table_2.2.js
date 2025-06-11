
import React from "react";

const Table2_2 = () => {
  // Programme data as provided
  const programmeData = [
    {
      no: 1,
      description: "Support for Planting for food, Jobs and investment programmes and PERD",
      dimension: "Economic Development",
      amountInvolved: "116,750",
      fundingSource: "GOG",
      dateStarted: "January 2022",
      expectedCompletion: "December 2022",
      expenditure: "105,600",
      outstanding: "1,150",
      implementationStatus: "100%",
      beneficiariesMale: "5,246",
      beneficiariesFemale: "9,636",
      remarks: "Activity Implemented",
    },
    {
      no: 2,
      description: "Acquisition of (serviced) lands for the establishment of local industries through PPP",
      dimension: "Economic Development",
      amountInvolved: "600,000",
      fundingSource: "GOG",
      dateStarted: "January 2022",
      expectedCompletion: "December 2022",
      expenditure: "20,000",
      outstanding: "580,000",
      implementationStatus: "0%",
      beneficiariesMale: "9,500",
      beneficiariesFemale: "10,580",
      remarks: "Activity Not Implemented",
    },
    {
      no: 3,
      description: "Organize Training and Counselling Programmes on Business Development",
      dimension: "Economic Development",
      amountInvolved: "20,000",
      fundingSource: "GOG",
      dateStarted: "January 2022",
      expectedCompletion: "December 2022",
      expenditure: "20,000",
      outstanding: "0",
      implementationStatus: "100%",
      beneficiariesMale: "500",
      beneficiariesFemale: "420",
      remarks: "Activity Implemented",
    },
    {
      no: 4,
      description: "Organize Community Apprenticeship programme and Provision of start-up kits",
      dimension: "Economic Development",
      amountInvolved: "220,000",
      fundingSource: "GOG",
      dateStarted: "January 2022",
      expectedCompletion: "December 2022",
      expenditure: "205,000",
      outstanding: "15,000",
      implementationStatus: "100%",
      beneficiariesMale: "600",
      beneficiariesFemale: "540",
      remarks: "Activity Implemented",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.2 – Programmes (Non-Physical Projects) Register</h3>
      <div className="card">
        <div className="card-header">Table 2.2 – Programmes (Non-Physical Projects) Register</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Programme Description</th>
                  <th>Development Dimension of Policy Framework</th>
                  <th>Amount Involved GH¢</th>
                  <th>Source of Funding</th>
                  <th>Date Started</th>
                  <th>Expected Date of Completion</th>
                  <th>Expenditure to Date</th>
                  <th>Outstanding Balance</th>
                  <th>Implementation Status (%)</th>
                  <th colSpan="2">Total Beneficiaries</th>
                  <th>Remarks</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Male</th>
                  <th>Female</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {programmeData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.no}</td>
                    <td>{row.description}</td>
                    <td>{row.dimension}</td>
                    <td>{row.amountInvolved}</td>
                    <td>{row.fundingSource}</td>
                    <td>{row.dateStarted}</td>
                    <td>{row.expectedCompletion}</td>
                    <td>{row.expenditure}</td>
                    <td>{row.outstanding}</td>
                    <td>{row.implementationStatus}</td>
                    <td>{row.beneficiariesMale}</td>
                    <td>{row.beneficiariesFemale}</td>
                    <td>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <p className="mt-3">
            <small>Note: This is data for demonstration purposes.</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table2_2;
