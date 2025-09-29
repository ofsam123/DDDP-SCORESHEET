
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue, hideTableDis} from "../../utils/utils";
import ExeAPR from "./APRComment.js/ExecutiveSummary";

const AppendixTwoTable = ({ year, district, period, hide }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getProjectsPrograms();
  }, [year, district, period]);

  function getProjectsPrograms() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {
        if (result.data.instances.length > 0) {
          

          axios
            .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);

              const temps = [];
              data.forEach((project, idx) => {
                const currentReport = reports.find(rep => rep.trackedEntity === project.trackedEntity);
                let expenditure = 0.00;
                let percentage = 0; // Declared here to fix 'percentage is not defined'
                let statusValue = "New"; // Default status

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "tE3QKB203nh") {
                      // Use the status value from the report (e.g., "Ongoing" or "New")
                      statusValue = rep.value === "Ongoing" ? "Ongoing" : "New";
                    }
                    if (rep.dataElement === "jr8gk707kAw") {
                      expenditure = parseFloat(rep.value) || 0;
                    }
                    if (rep.dataElement === "f1T48vHfJc1") {
                      percentage = parseFloat(rep.value) || 0;
                    }
                  });
                }

                // Check if the project has an Awarded Date to mark as New
                const awardedDate = getAttributeValue("Awarded Date", project);
                if (awardedDate && !statusValue) {
                  statusValue = "New"; // Mark as New if Awarded Date exists and no other status is set
                }

                const contractSum = parseFloat(getAttributeValue("Contract Sum", project)) || 0;
                const outstanding = contractSum - expenditure;

                // Get funding source and amount data
                const primaryFundingSource = getAttributeValue("Primary Funding Source", project) || "";
                const secondaryFundingSource = getAttributeValue("Secondary Funding Source", project) || "";
                const tertiaryFundingSource = getAttributeValue("Tertiary Funding Source", project) || "";
                const primaryAmount = parseFloat(getAttributeValue("Primary Amount Contributed", project)) || 0;
                const secondaryAmount = parseFloat(getAttributeValue("Secondary Amount Contributed", project)) || 0;
                const tertiaryAmount = parseFloat(getAttributeValue("Tertiary Amount Contributed", project)) || 0;

                // Initialize budget object
                let budget = {
                  GoG: 0,
                  IGFABFA: 0,
                  Others: 0,
                };

                // Assign amounts based on funding sources
                if (primaryFundingSource.toLowerCase().includes("gog")) budget.GoG += primaryAmount;
                else if (primaryFundingSource.toLowerCase().includes("internally generated fund")) budget.IGFABFA += primaryAmount;
                else budget.Others += primaryAmount;

                if (secondaryFundingSource.toLowerCase().includes("gog")) budget.GoG += secondaryAmount;
                else if (secondaryFundingSource.toLowerCase().includes("internally generated fund")) budget.IGFABFA += secondaryAmount;
                else if (secondaryFundingSource) budget.Others += secondaryAmount;

                if (tertiaryFundingSource.toLowerCase().includes("gog")) budget.GoG += tertiaryAmount;
                else if (tertiaryFundingSource.toLowerCase().includes("internally generated fund")) budget.IGFABFA += tertiaryAmount;
                else if (tertiaryFundingSource) budget.Others += tertiaryAmount;

                const mappedData = {
                  no: idx + 1,
                  programme: getAttributeValue("Sector", project) || "Economic Development",
                  subProgramme: getAttributeValue("Development Dimension", project) || "Trade Industry and Tourism Service",
                  activity: getAttributeValue("Description", project) || "",
                  location: getAttributeValue("Location", project) || "Municipal wide",
                  budget: budget,
                  status: {
                    New: statusValue === "New",
                    Ongoing: statusValue === "Ongoing",
                  },
                  agencies: {
                    Lead: getAttributeValue("Consultant", project) || "Central Admin.",
                    Collaboration: getAttributeValue("Contractor", project) || "Private Sector",
                  },
                };

                temps.push(mappedData);
              });

              setTableData(temps);
            })
            .catch(err => console.error("Error fetching events:", err));
        }
      })
      .catch(err => console.error("Error fetching tracked entities:", err));
  }

  const cellStyle = {
    border: "2px solid black",
    verticalAlign: "middle",
  };

  return (
    <div>
      <h3 className="mb-3 text-start">
        APPENDIX TWO (2): COMPOSITE ANNUAL ACTION FOR {year}
      </h3>
      <div className="card" style={{ width: "100%" }}>
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-striped"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "2px solid black",
              }}
            >
              <thead className="table-success" style={{ fontWeight: "bold" }}>
                <tr>
                  <th style={cellStyle}>No.</th>
                  <th style={cellStyle}>Programmes</th>
                  <th style={cellStyle}>Sub Programmes (PBB)</th>
                  <th style={cellStyle}>Broad Activities/Projects (PBB)</th>
                  <th style={cellStyle}>Location</th>
                  <th colSpan="3" style={{ ...cellStyle, textAlign: "center" }}>
                    Indicative Budget/Cost
                  </th>
                  <th colSpan="2" style={{ ...cellStyle, textAlign: "center" }}>
                    Programme Status
                  </th>
                  <th colSpan="2" style={{ ...cellStyle, textAlign: "center" }}>
                    Implementing Agencies/Departments/Institutions
                  </th>
                </tr>
                <tr>
                  <th style={cellStyle}></th>
                  <th style={cellStyle}></th>
                  <th style={cellStyle}></th>
                  <th style={cellStyle}></th>
                  <th style={cellStyle}></th>
                  <th style={cellStyle}>GoG</th>
                  <th style={cellStyle}>IGF/ABFA</th>
                  <th style={cellStyle}>Others</th>
                  <th style={cellStyle}>New</th>
                  <th style={cellStyle}>Ongoing</th>
                  <th style={cellStyle}>Lead</th>
                  <th style={cellStyle}>Collaboration</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row) => (
                    <tr key={row.no}>
                      <td style={cellStyle}>{row.no}</td>
                      <td style={cellStyle}>{row.subProgramme}</td>
                      <td style={cellStyle}>{row.programme}</td>
                      <td style={cellStyle}>{row.activity}</td>
                      <td style={cellStyle}>{row.location}</td>
                      <td style={cellStyle}>
                        {row.budget.GoG.toLocaleString()}
                      </td>
                      <td style={cellStyle}>
                        {row.budget.IGFABFA.toLocaleString()}
                      </td>
                      <td style={cellStyle}>
                        {row.budget.Others.toLocaleString()}
                      </td>
                      <td style={cellStyle}>{row.status.New ? "✓" : ""}</td>
                      <td style={cellStyle}>{row.status.Ongoing ? "✓" : ""}</td>
                      <td style={cellStyle}>{row.agencies.Lead}</td>
                      <td style={cellStyle}>{row.agencies.Collaboration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" style={cellStyle} className="text-center">
                      No data available for {year}
                    </td>
                  </tr>
                )}
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

export default AppendixTwoTable;