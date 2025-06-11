
import React from "react";

const Table2_6 = () => {
  // Indicator data as provided
  const indicatorData = [
    {
      issue: "Ghana School Feeding Programme",
      allocation2022: "0",
      actualReceipt2022: "0",
      targetBeneficiaries: "12,842",
      actualBeneficiaries: "12,401",
    },
    {
      issue: "Capitation Grants",
      allocation2022: "373,450.00",
      actualReceipt2022: "0",
      targetBeneficiaries: "37,345",
      actualBeneficiaries: "37,345",
    },
    {
      issue: "National Health Insurance Scheme",
      allocation2022: "1,200,000.00",
      actualReceipt2022: "1,315,467.00",
      targetBeneficiaries: "120,000",
      actualBeneficiaries: "112,531",
    },
    {
      issue: "Livelihood Empowerment Against Poverty (LEAP) Programme",
      allocation2022: "218,112.56",
      actualReceipt2022: "122,328.22",
      targetBeneficiaries: "850",
      actualBeneficiaries: "800",
    },
    {
      issue: "One District- One Factory",
      allocation2022: "272,000",
      actualReceipt2022: "0",
      targetBeneficiaries: "500",
      actualBeneficiaries: "220",
    },
    {
      issue: "Planting For Food and Jobs",
      allocation2022: "287,935",
      actualReceipt2022: "287,935",
      targetBeneficiaries: "3,000",
      actualBeneficiaries: "2,670",
    },
    {
      issue: "Free SHS Programme",
      allocation2022: "1,664,444.18",
      actualReceipt2022: "1,664,444.18",
      targetBeneficiaries: "4,916",
      actualBeneficiaries: "4,916",
    },
    {
      issue: "One Million Dollar, One Constituency",
      allocation2022: "0",
      actualReceipt2022: "0",
      targetBeneficiaries: "619,000",
      actualBeneficiaries: "619,000",
    },
    {
      issue: "Implementation Of Infrastructural for Poverty Eradication Programme (IPEP)",
      allocation2022: "0",
      actualReceipt2022: "0",
      targetBeneficiaries: "1,500",
      actualBeneficiaries: "1,200",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.6 – Key Critical Poverty Issues, Allocations, Actual Receipt and the Number of Beneficiaries</h3>
      <div className="card">
        <div className="card-header">Table 2.6 – Key Critical Poverty Issues, Allocations, Actual Receipt and the Number of Beneficiaries</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{  }}>
                <tr>
                  <th style={{ textAlign: "left" }}>Critical Development and Poverty Issues</th>
                  <th style={{ textAlign: "center" }}>2022 Allocation GH₵</th>
                  <th style={{ textAlign: "center" }}>2022 Actual Receipt GH₵</th>
                  <th style={{ textAlign: "center" }}>Number of Beneficiaries 2022 Target</th>
                  <th style={{ textAlign: "center" }}>Number of Beneficiaries 2022 Actual</th>
                </tr>
              </thead>
              <tbody>
                {indicatorData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "left" }}>{row.issue}</td>
                    <td style={{ textAlign: "center" }}>{row.allocation2022}</td>
                    <td style={{ textAlign: "center" }}>{row.actualReceipt2022}</td>
                    <td style={{ textAlign: "center" }}>{row.targetBeneficiaries}</td>
                    <td style={{ textAlign: "center" }}>{row.actualBeneficiaries}</td>
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

export default Table2_6;
