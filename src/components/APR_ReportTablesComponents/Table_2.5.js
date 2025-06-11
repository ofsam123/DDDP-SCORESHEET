
import React from "react";

const Table2_5 = () => {
  // Indicator data as provided
  const indicatorData = [
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - i. Maize",
      baseline2021: "5,600MT",
      target2022: "8,000MT",
      actual2022: "5,400MT",
      target2023: "7,000MT",
      reasons: "- Good quality seeds\n- No subsidy on inputs (fertilizer and seeds)\n- Reduction in extension services delivery due to closure of NABCO\n- Illegal mining activities degraded arable lands",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - ii. Rice (milled)",
      baseline2021: "8,950MT",
      target2022: "15,000MT",
      actual2022: "5,700MT",
      target2023: "7,000MT",
      reasons: "",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - iii. Cassava",
      baseline2021: "68,245MT",
      target2022: "80,000MT",
      actual2022: "71,000MT",
      target2023: "72,000MT",
      reasons: "- Good planting material\n- Timely planting and timely harvesting\n- Extension Services Delivery, Plantain paring, Split corm and Sucker multiplication",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - iv. Yam",
      baseline2021: "1,460MT",
      target2022: "1,500MT",
      actual2022: "1,300MT",
      target2023: "1,500MT",
      reasons: "",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - v. Cocoyam",
      baseline2021: "4,000MT",
      target2022: "5,000MT",
      actual2022: "5,100MT",
      target2023: "5,500MT",
      reasons: "",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - vi. Plantain",
      baseline2021: "18,480MT",
      target2022: "20,000MT",
      actual2022: "18,900MT",
      target2023: "20,000MT",
      reasons: "",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - vii. Cocoa",
      baseline2021: "620,000MT",
      target2022: "800,000MT",
      actual2022: "650,000MT",
      target2023: "800,000MT",
      reasons: "Subsidized fertilizers, supply of agro-pesticides and cocoa seedlings through PERD",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - viii. Oil palm",
      baseline2021: "40,000MT",
      target2022: "50,000 MT",
      actual2022: "45,000MT",
      target2023: "55,000MT",
      reasons: "Planting for Export and Rural Development (PERD), Good quality seedlings, Best Management Practices, and supply of seedlings",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - ix. Cattle",
      baseline2021: "4,850",
      target2022: "6,000",
      actual2022: "5,000",
      target2023: "6,000",
      reasons: "High demand for beef",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - x. Sheep",
      baseline2021: "28,000",
      target2022: "30,000",
      actual2022: "28,500",
      target2023: "32,000",
      reasons: "Rearing for food and jobs programme",
    },
    {
      no: "1",
      indicator: "Total output in agricultural production (In metric tons) - xi. Goat",
      baseline2021: "46,650",
      target2022: "50,000",
      actual2022: "47,200",
      target2023: "60,000",
      reasons: "Rearing for food and jobs",
    },
  ];

  return (
    <div className="col-12">
      <h3>Table 2.5 – Core Indicators and Municipal Specific Indicators</h3>
      <div className="card">
        <div className="card-header">Table 2.5 – Core Indicators and Municipal Specific Indicators</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#000000", color: "white" }}>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "left" }}>Indicators (categorized by development dimension of Agenda for Jobs)</th>
                  <th style={{ textAlign: "center" }}>Baseline 2021</th>
                  <th style={{ textAlign: "center" }}>Target 2022</th>
                  <th style={{ textAlign: "center" }}>Actual 2022</th>
                  <th style={{ textAlign: "center" }}>Target 2023</th>
                  <th style={{ textAlign: "left" }}>Reasons for the year’s performance</th>
                </tr>
              </thead>
              <tbody>
                {indicatorData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{row.no}</td>
                    <td style={{ textAlign: "left" }}>{row.indicator}</td>
                    <td style={{ textAlign: "center" }}>{row.baseline2021}</td>
                    <td style={{ textAlign: "center" }}>{row.target2022}</td>
                    <td style={{ textAlign: "center" }}>{row.actual2022}</td>
                    <td style={{ textAlign: "center" }}>{row.target2023}</td>
                    <td style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>{row.reasons}</td>
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

export default Table2_5;
