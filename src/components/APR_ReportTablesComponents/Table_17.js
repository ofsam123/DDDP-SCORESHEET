import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table17 Component
const Table_17 = ({ year, district }) => {
  const tableData = [
    {
      program: "Ghana School Feeding Programme*",
      allocation: "N/A",
      actualReceipt: "N/A",
      beneficiariesTarget: 21000,
      beneficiariesActual: 27551,
      male: 14051,
      female: 13500
    },
    {
      program: "Capitation Grant",
      allocation: 278625.48,
      actualReceipt: 278625.48,
      beneficiariesTarget: 34200,
      beneficiariesActual: 34200,
      male: 15266,
      female: 14164
    },
    {
      program: "National Health Insurance Scheme",
      allocation: 135572.40,
      actualReceipt: 135572.40,
      beneficiariesTarget: 8531,
      beneficiariesActual: 4249,
      male: 17418,
      female: 25079
    },
    {
      program: "Livelihood Empowerment Against Poverty (LEAP)",
      allocation: 3240924.00,
      actualReceipt: 3240924.00,
      beneficiariesTarget: 4137,
      beneficiariesActual: 4137,
      male: 1792,
      female: 2345
    },
    {
      program: "National Youth Employment Programme**",
      allocation: 0.00,
      actualReceipt: 0.00,
      beneficiariesTarget: 200,
      beneficiariesActual: 191,
      male: 105,
      female: 86
    },
    {
      program: "One District One Factory Programme***",
      allocation: "N/A",
      actualReceipt: "N/A",
      beneficiariesTarget: "N/A",
      beneficiariesActual: "N/A",
      male: "N/A",
      female: "N/A"
    },
    {
      program: "One Village-One Factory Programme***",
      allocation: "N/A",
      actualReceipt: "N/A",
      beneficiariesTarget: "N/A",
      beneficiariesActual: "N/A",
      male: "N/A",
      female: "N/A"
    },
    {
      program: "Planting for Food and Jobs (PFJ) Programme****",
      allocation: "N/A",
      actualReceipt: "N/A",
      beneficiariesTarget: "N/A",
      beneficiariesActual: "N/A",
      male: "N/A",
      female: "N/A"
    },
    {
      program: "Free Senior High School Programme*****",
      allocation: "N/A",
      actualReceipt: "N/A",
      beneficiariesTarget: 4200,
      beneficiariesActual: 3735,
      male: 1920,
      female: 1815
    }
  ];

  const formatNumber = (value) => {
    if (value === "N/A") return "N/A";
    return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="col-12">
      <h3>Table 17: Updates on Critical Development and Poverty Issues in the Year, 2024</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                     tableCommentedId={`table17-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Critical Development and Poverty Issues</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Allocation (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual Receipt (GHS)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No. of Beneficiaries</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Sex Disagg.</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.program}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.allocation)}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.actualReceipt)}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <div>Targets: {formatNumber(row.beneficiariesTarget)}</div>
                      <div>Actual: {formatNumber(row.beneficiariesActual)}</div>
                    </td>
                    <td style={{ border: '1px solid #000' }}>
                      <div>Male: {formatNumber(row.male)}</div>
                      <div>Female: {formatNumber(row.female)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            
              *No allocation given by the national secretariat<br />
              **Factory is yet to be operationalized<br />
              ***Not applicable to the District under review<br />
              ****Not implemented during the year under review<br />
              *****Allocation and receipt not available as at the time of reporting<br />
              Source: Departmental Progress Reports, 2024
           
          </p>
           <APRComment
                      data={tableData}
                      year={year}
                      districtId={district}
                      tableCommentedId={`table17-${year}`}
                     
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

export default Table_17;