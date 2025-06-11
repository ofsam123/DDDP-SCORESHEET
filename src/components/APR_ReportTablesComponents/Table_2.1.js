
import React from "react";

const Table2_1 = () => {
  // Dummy data for demonstration purposes
  const dummyData = [
    {
      no: 1,
      description: "Construction of 1No. 3-Unit Classroom Block with Ancillary Facilities",
      dimension: "Social Development",
      location: "Kwameville",
      contractor: "Messrs BuildWell Ltd, P.O. Box 123, Accra",
      contractSum: "350,000.00",
      fundingSource: "DACF",
      dateOfAward: "15/03/22",
      dateStarted: "01/04/22",
      expectedCompletion: "30/09/22",
      expenditure: "280,000.00",
      outstanding: "70,000.00",
      implementationStatus: "80%",
      remarks: "Classroom completed, toilet facilities ongoing",
    },
    {
      no: 2,
      description: "Rehabilitation of 5km Community Road",
      dimension: "Environment, Infrastructure and Human Settlement",
      location: "Adutown",
      contractor: "RoadFix Engineering, P.O. Box 456, Kumasi",
      contractSum: "1,200,000.00",
      fundingSource: "Road Fund",
      dateOfAward: "10/01/22",
      dateStarted: "20/02/22",
      expectedCompletion: "15/12/22",
      expenditure: "900,000.00",
      outstanding: "300,000.00",
      implementationStatus: "75%",
      remarks: "Earthworks completed, surfacing in progress",
    },
    {
      no: 3,
      description: "Supply of 100 Dual Desks to Municipal Schools",
      dimension: "Social Development",
      location: "Municipal Wide",
      contractor: "EduFurnish Co. Ltd, P.O. Box 789, Tarkwa",
      contractSum: "150,000.00",
      fundingSource: "DACF-RFG",
      dateOfAward: "05/07/22",
      dateStarted: "15/07/22",
      expectedCompletion: "30/08/22",
      expenditure: "150,000.00",
      outstanding: "0.00",
      implementationStatus: "100%",
      remarks: "Furniture delivered and distributed",
    },
    {
      no: 4,
      description: "Construction of Community Center",
      dimension: "Social Development",
      location: "Asantekrom",
      contractor: "Messrs Unity Builders, P.O. Box 321, Takoradi",
      contractSum: "500,000.00",
      fundingSource: "MDF",
      dateOfAward: "20/09/22",
      dateStarted: "10/10/22",
      expectedCompletion: "30/06/23",
      expenditure: "200,000.00",
      outstanding: "300,000.00",
      implementationStatus: "40%",
      remarks: "Substructure completed, superstructure ongoing",
    },
    {
      no: 5,
      description: "Installation of Solar Street Lights",
      dimension: "Environment, Infrastructure and Human Settlement",
      location: "Nsuaem",
      contractor: "BrightLight Solutions, P.O. Box 654, Accra",
      contractSum: "250,000.00",
      fundingSource: "IGF",
      dateOfAward: "01/06/22",
      dateStarted: "15/06/22",
      expectedCompletion: "30/09/22",
      expenditure: "225,000.00",
      outstanding: "25,000.00",
      implementationStatus: "90%",
      remarks: "Lights installed, final testing in progress",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.1 – Project Register</h3>
      <div className="card">
        <div className="card-header">Table 2.1 – Project Register</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Project Description</th>
                  <th>Development Dimension of Policy Framework</th>
                  <th>Location</th>
                  <th>Contractor/Consultant</th>
                  <th>Contract Sum GHȻ</th>
                  <th>Source of Funding</th>
                  <th>Date of Award</th>
                  <th>Date Started</th>
                  <th>Expected Date of Completion</th>
                  <th>Expenditure to Date</th>
                  <th>Outstanding Balance</th>
                  <th>Implementation Status %</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.no}</td>
                    <td>{row.description}</td>
                    <td>{row.dimension}</td>
                    <td>{row.location}</td>
                    <td>{row.contractor}</td>
                    <td>{row.contractSum}</td>
                    <td>{row.fundingSource}</td>
                    <td>{row.dateOfAward}</td>
                    <td>{row.dateStarted}</td>
                    <td>{row.expectedCompletion}</td>
                    <td>{row.expenditure}</td>
                    <td>{row.outstanding}</td>
                    <td>{row.implementationStatus}</td>
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
            <small>Note: This is dummy data for demonstration purposes.</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table2_1;
