
import React from "react";

const Table1_1 = () => {
  // Table 1.1 data
  const tableData = [
    {
      indicator: "Proportion of annual action plans implemented",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
    {
      indicator: "A. Percentage completed",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
    {
      indicator: "B. Percentage of on-going interventions",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
    {
      indicator: "C. Percentage of interventions abandoned",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
    {
      indicator: "D. Percentage of interventions yet to start",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
    {
      indicator: "Proportion of the overall medium-term development plan implemented",
      baseline2021: "",
      target2022: "",
      actual2022: "",
      target2023: "",
    },
  ];

  // Pictorial evidence data
  const pictorialEvidence = [
    {
        url: "https://cdn1.img.sputniknews.africa/img/07e7/07/02/1060284138_451:0:3134:2012_1920x0_80_0_0_43d738a714a35edc0190c43cbaa47b86.jpg",
        caption: "Construction of Community Center - 2022",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegQFFElp18bejV_lABjBxFymQizmSFnbmBQ&s",
        caption: "Road Improvement Project - Phase 1",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ84AeJyjvmIiYJZaK5Nz3lTPHUFSJVKyuybw&s",
        caption: "School Renovation - Completed 2022",
      },
  
  ];

  return (
    <div className="col-12">
      <h3>Table 1.1 – Proportion of the AAP and the MTDP Implemented</h3>
      <div className="card">
        <div className="card-header">Table 1.1 – Proportion of the AAP and the MTDP Implemented</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Indicators</th>
                  <th>Baseline 2021</th>
                  <th>Target 2022</th>
                  <th>Actual 2022</th>
                  <th>Target 2023</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.indicator}</td>
                    <td>{row.baseline2021 || "N/A"}</td>
                    <td>{row.target2022 || "N/A"}</td>
                    <td>{row.actual2022 || "N/A"}</td>
                    <td>{row.target2023 || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU-TNMA</small>
          </p>
          <hr />
          <h5>Pictorial Evidence of Projects under Implementation</h5>
          {pictorialEvidence.length > 0 ? (
            <div className="row">
              {pictorialEvidence.map((image, index) => (
                <div className="col-md-4 col-sm-6 mb-3" key={index}>
                  <div className="card">
                    <img
                      src={image.url}
                      className="card-img-top"
                      alt={image.caption}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="card-text">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pictorial evidence available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table1_1;
