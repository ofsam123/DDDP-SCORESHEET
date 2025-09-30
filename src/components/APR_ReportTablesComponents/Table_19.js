import React, { useEffect, useState } from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, getAttributeValue } from "../../utils/utils";

// Table19 Component
const Table_19 = ({ year, district, period, hideTableDis }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=Sqzqe1y30hF&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);

        const temp = [];

        data.forEach(val => {
          const beneficiaryMale = getAttributeValue("DPAT | Number of Attendance - Male", val);
          const beneficiaryFemale = getAttributeValue("DPAT | Number of Attendance - Female", val)
          const dataSet = {
            name: getAttributeValue("Topic", val),
            location: getAttributeValue("Location", val),
            purpose: getAttributeValue("Purpose", val),
            funding: getAttributeValue("Primary Funding Source", val),
            target: getAttributeValue("Group of Target", val),
            facilitators: getAttributeValue("Facilitators", val),
            total: parseInt(beneficiaryMale) + parseInt(beneficiaryFemale),
            male: beneficiaryMale,
            female: beneficiaryFemale
          };

          temp.push(dataSet);
        });

        setTableData(temp);


      })
      .catch(err => console.log(err))
  };

  return (
    <div className="col-12">
      <h3>Table 19: Capacity Development</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table19-${year}`}
            hideTableDis={hideTableDis}

          />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}> Capacity Development Name</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Venue/Location</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Purpose</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Source of funding</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Target group</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Facilitators</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Female</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Male</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.name}</td>
                    <td style={{ border: '1px solid #000' }}>{row.location}</td>
                    <td style={{ border: '1px solid #000' }}>{row.purpose}</td>
                    <td style={{ border: '1px solid #000' }}>{row.funding}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.facilitators}</td>
                    <td style={{ border: '1px solid #000' }}>{row.total}</td>
                    <td style={{ border: '1px solid #000' }}>{row.female}</td>
                    <td style={{ border: '1px solid #000' }}>{row.male}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year} Training Reports</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table19-${year}`}

          >
            {({ renderCommentInput, renderCommentList }) => (
              <>
                {renderCommentInput()}
                {renderCommentList()}
              </>
            )}
          </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table_19