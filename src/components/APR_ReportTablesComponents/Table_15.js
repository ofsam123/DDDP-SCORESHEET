import React, { useEffect, useState } from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import axios from "../../api/axios";
import { getProjectDetails, groupProjectsBySectorAmountWithoutBudget } from "../../utils/utils";

// Table15 Component
const Table_15 = ({ year, district, period,hideTableDis }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);


  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        axios
          .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
          .then(resp => {
            const reports = resp.data.instances;
            const projectDetails = getProjectDetails(result.data.instances, reports);

            const sectors = [
              "Health", "Education", "Governance/Administration", "Water and Sanitation",
              "Roads and Transport", "Trade, Industry and Tourism", "Security"
            ];

            const goupBySector = groupProjectsBySectorAmountWithoutBudget(projectDetails, sectors, year);

            setTableData(goupBySector);


          })
          .catch(err => console.log(err))


      })
      .catch(err => console.log(err))
  };


  return (
    <div className="col-12">
      <h3>Table 15: Estimated Cost and Cost Overruns of Active Projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table15-${year}`}

          />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Sector</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total Contract Sum (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Revised Contract Sum (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Cost overruns (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual Payment (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Outstanding Balance (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>% Work Done (GHS)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.sector}</td>
                    <td style={{ border: '1px solid #000' }}>{row.contractSum?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.reviseContractSum?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rolloverCost?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualPayment?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.outstanding?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: 2024 Progress Reports, 2024 Composite Budget & Contract Register</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table15-${year}`}
            hideTableDis={hideTableDis}

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

export default Table_15;