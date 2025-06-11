
import React from "react";

const Table2_8 = () => {
  // Activity data as provided
  const activityData = [
    {
      no: "1",
      activity: "Support clients to register business with RGD",
      targetGroup: "SME’s",
      venue: "RGD office Tarkoradi",
      participants: "4",
      fundingSource: "GEA/Clients",
      remarks: "Successfully implemented",
    },
    {
      no: "2",
      activity: "Support clients to access FDA & GSA certificate",
      targetGroup: "SME’s",
      venue: "FDA office",
      participants: "4",
      fundingSource: "GEA/Clients",
      remarks: "Ongoing",
    },
    {
      no: "3",
      activity: "CAPBuss Recovery",
      targetGroup: "Beneficiaries",
      venue: "Municipal wide",
      participants: "1",
      fundingSource: "GEA",
      remarks: "Ongoing",
    },
    {
      no: "4",
      activity: "Client Monitoring and counselling visitation",
      targetGroup: "GEA Clients",
      venue: "Municipal wide",
      participants: "4",
      fundingSource: "GEA/Client/MA",
      remarks: "Successfully implemented",
    },
    {
      no: "5",
      activity: "Consultative meetings/MSE Subcommittee meeting",
      targetGroup: "Subcommittee members",
      venue: "Assembly Conference Room",
      participants: "30",
      fundingSource: "MA",
      remarks: "Successfully implemented",
    },
    {
      no: "6",
      activity: "Clients Visitation",
      targetGroup: "Associations in Tarkwa",
      venue: "Municipal wide",
      participants: "4",
      fundingSource: "GEA/MA",
      remarks: "Successfully implemented",
    },
    {
      no: "7",
      activity: "Organize internship training",
      targetGroup: "SMEs, Artisans",
      venue: "Municipal wide",
      participants: "5",
      fundingSource: "REP/GEA",
      remarks: "Not implemented",
    },
    {
      no: "8",
      activity: "Provision of business counselling to 50 clients",
      targetGroup: "GEA Clients",
      venue: "Municipal wide",
      participants: "1",
      fundingSource: "REP/GEA",
      remarks: "Not implemented",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.8 – Details of all activities implemented by the BAC for the year 2022</h3>
      <div className="card">
        <div className="card-header">Table 2.8 – Details of all activities implemented by the BAC for the year 2022</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ }}>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "left" }}>Activity</th>
                  <th style={{ textAlign: "left" }}>Target Group</th>
                  <th style={{ textAlign: "left" }}>Venue</th>
                  <th style={{ textAlign: "center" }}>No. of Participants</th>
                  <th style={{ textAlign: "left" }}>Funding Source</th>
                  <th style={{ textAlign: "left" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{row.no}</td>
                    <td style={{ textAlign: "left" }}>{row.activity}</td>
                    <td style={{ textAlign: "left" }}>{row.targetGroup}</td>
                    <td style={{ textAlign: "left" }}>{row.venue}</td>
                    <td style={{ textAlign: "center" }}>{row.participants}</td>
                    <td style={{ textAlign: "left" }}>{row.fundingSource}</td>
                    <td style={{ textAlign: "left" }}>{row.remarks}</td>
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

export default Table2_8;
