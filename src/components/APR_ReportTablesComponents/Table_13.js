import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

const Table_13 = ({ year ,district,hideTableDis }) => {  // Default year for source; can be passed as prop if needed
  const tableData = [
    {
      item: "CAPEX Throw Forward",
      amount: "10,272,867.00"
    },
    {
      item: "MTBF (Ceilings)",
      amount: "4,829,464.64"
    },
    {
      item: "Variation",
      amount: "5,443,402.36"  // Note: This appears to be MTBF minus CAPEX (4,829,464.64 - 10,272,867.00 = -5,443,402.36), but shown as positive in the table. If it's an absolute value or different calculation, adjust accordingly.
    }
  ];

  return (
    <div className="col-12">
      <h3>Table 13: Cumulative CAPEX Throw Forward and MTBF Envelope, 2025-2027</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
            <APRmemo
                    year={year}
                    districtId = {district}
                    tableCommentedId={`table13-${year}`}
                    hideTableDis ={hideTableDis}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Item</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.item}</td>
                    <td style={{ border: '1px solid #000' }}>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Composite Budget, {year}</small>
          </p>
           <APRComment
                      data={tableData}
                      year={year}
                      districtId={district}
                      tableCommentedId={`table13-${year}`}
                     
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

export default Table_13;