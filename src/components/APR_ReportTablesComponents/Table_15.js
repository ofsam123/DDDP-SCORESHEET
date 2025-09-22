import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table15 Component
const Table_15 = ({ year, district }) => {
  const tableData = [
    { sector: "Education", totalContract: 2288082.70, revisedContract: 804662.80, costOverruns: 229771.59, actualPayment: 764092.52, outstandingBalance: 1663510.28, percentWorkDone: 67.8 },
    { sector: "Health", totalContract: 172491.59, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 567609.96, outstandingBalance: 120481.63, percentWorkDone: 57.5 },
    { sector: "Water and Sanitation", totalContract: 2068987.04, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 888426.85, outstandingBalance: 1180561.19, percentWorkDone: 13 },
    { sector: "Roads and Transport", totalContract: 1994017.92, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 556247.60, outstandingBalance: 1437770.32, percentWorkDone: 25 },
    { sector: "Trade, Industry and Tourism", totalContract: 2654628.34, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 794704.23, outstandingBalance: 1859924.11, percentWorkDone: 40.8 },
    { sector: "Security", totalContract: 386955.45, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 0.00, outstandingBalance: 386955.45, percentWorkDone: 70 },
    { sector: "Governance", totalContract: 368891.00, revisedContract: 0.00, costOverruns: 0.00, actualPayment: 183212.45, outstandingBalance: 185678.55, percentWorkDone: 88.3 },
    { sector: "Total", totalContract: 11534054.04, revisedContract: 804662.80, costOverruns: 229771.59, actualPayment: 3754293.61, outstandingBalance: 7192805.53, percentWorkDone: null }
  ];

  return (
    <div className="col-12">
      <h3>Table 15: Estimated Cost and Cost Overruns of Active Projects</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
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
                    <td style={{ border: '1px solid #000' }}>{row.totalContract.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.revisedContract.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.costOverruns.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ border: '1px solid #000' }}>{row.percentWorkDone !== null ? `${row.percentWorkDone}` : ''}</td>
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