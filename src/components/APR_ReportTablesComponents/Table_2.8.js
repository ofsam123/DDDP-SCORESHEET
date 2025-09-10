import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import APRComment from "../APR_ReportTablesComponents/APRComments";

const Table2_8 = ({ year = "2025", district = "EmVZbr0kApz", period }) => {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivityData();
  }, [year, district, period]);

  async function fetchActivityData() {
    try {
      const response = await axios.get(
        `/tracker/trackedEntities?program=AcOikCwZH2x&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&paging=false&fields=trackedEntity,attributes[displayName,value]`
      );

      const trackedEntities = response.data.instances || [];
      const temps = [];

      trackedEntities.forEach((entity, idx) => {
        const mappedData = {
          no: (idx + 1).toString(),
          activity: getAttributeValue(entity, "Name") || `Activity ${idx + 1}`,
          targetGroup: getAttributeValue(entity, "Target Group") || "Unknown",
          venue: getAttributeValue(entity, "Venue") || "Unknown",
          participants: getAttributeValue(entity, "Target Beneficiaries") || "0",
          fundingSource: getAttributeValue(entity, "Primary Funding Source") || "Unknown",
          remarks: "N/A", // Not available; default to N/A
        };

        temps.push(mappedData);
      });

      setActivityData(temps);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching activity data:", err);
      setActivityData([]);
      setIsLoading(false);
    }
  }

  // Helper function to get attribute value from trackedEntity
  const getAttributeValue = (entity, attributeDisplayName) => {
    return entity.attributes.find(attr => attr.displayName === attributeDisplayName)?.value || null;
  };

  return (
    <div className="col-12">
      <h3>Table 2.8 – Details of all activities implemented by the BAC for the year {year}</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', textAlign: 'center' }}>No.</th>
                  <th style={{ border: '1px solid #000', textAlign: 'left' }}>Activity</th>
                  <th style={{ border: '1px solid #000', textAlign: 'left' }}>Target Group</th>
                  <th style={{ border: '1px solid #000', textAlign: 'left' }}>Venue</th>
                  <th style={{ border: '1px solid #000', textAlign: 'center' }}>No. of Participants</th>
                  <th style={{ border: '1px solid #000', textAlign: 'left' }}>Funding Source</th>
                  <th style={{ border: '1px solid #000', textAlign: 'left' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" style={{ border: '1px solid #000', textAlign: 'center' }}>Loading data...</td>
                  </tr>
                ) : activityData.length > 0 ? (
                  activityData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #000', textAlign: 'center' }}>{row.no}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'left' }}>{row.activity}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'left' }}>{row.targetGroup}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'left' }}>{row.venue}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'center' }}>{row.participants}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'left' }}>{row.fundingSource}</td>
                      <td style={{ border: '1px solid #000', textAlign: 'left' }}>{row.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ border: '1px solid #000', textAlign: 'center' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          {/* Integrate APRComment component */}
          <APRComment
            data={activityData}
            year={year}
            districtId={district}
            tableCommentedId="Table2_8"
            hideComment={false}
          >
            {({ renderCommentInput, renderCommentList }) => (
              <div className="mt-4">
                {renderCommentInput()}
                {renderCommentList()}
              </div>
            )}
          </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table2_8;