import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table16 Component
const Table_16 = ({ year, district }) => {
  const tableData = [
    {
      indicator: "Maize (milled)",
      baseline2021: 5.518,
      actual2022: 6.064,
      actual2023: 3.185,
      target2024: 35.700,
      actual2024: 9.248,
      keyProgrammes: "Sensitization on PFJ 2.0 and its benefits",
      challenges: "Severe drought (yield)",
      recommendations: "Drought resistant varieties & timely cultivation"
    },
    {
      indicator: "Rice (milled)",
      baseline2021: 5.313,
      actual2022: 5.760,
      actual2023: 1.822,
      target2024: 35.700,
      actual2024: 9.248,
      keyProgrammes: "Sensitization on PFJ 2.0 and its benefits",
      challenges: "Severe drought (yield)",
      recommendations: "Drought resistant varieties & timely cultivation"
    },
    {
      indicator: "Millet",
      baseline2021: "N/A",
      actual2022: "N/A",
      actual2023: "N/A",
      target2024: "N/A",
      actual2024: "N/A",
      keyProgrammes: "Farmer registration and farm mapping",
      challenges: "Pest & disease management IPM",
      recommendations: "Implementation of IPM"
    },
    {
      indicator: "Sorghum",
      baseline2021: 480,
      actual2022: 476,
      actual2023: 478.8,
      target2024: 800,
      actual2024: 174,
      keyProgrammes: "Farmer registration and farm mapping",
      challenges: "Pest & disease management IPM",
      recommendations: "Implementation of IPM"
    },
    {
      indicator: "Cassava",
      baseline2021: 580.576,
      actual2022: 638.63,
      actual2023: 638.52,
      target2024: 800,
      actual2024: 824.340,
      keyProgrammes: "Enhanced Extension delivery by Veterinary A&E Regular during home visits and training",
      challenges: "Farmer - Cattle herder conflicts",
      recommendations: "Strategies to reduce the farmer-cattle herder conflicts"
    },
    {
      indicator: "Yam",
      baseline2021: 199.280,
      actual2022: 220.20,
      actual2023: 246.25,
      target2024: 300,
      actual2024: 169.01,
      keyProgrammes: "Enhanced Extension delivery by Veterinary A&E Regular during home visits and training",
      challenges: "Farmer - Cattle herder conflicts",
      recommendations: "Strategies to reduce the farmer-cattle herder conflicts"
    },
    {
      indicator: "Cocoyam",
      baseline2021: 638,
      actual2022: 732,
      actual2023: 1830,
      target2024: 2500,
      actual2024: 1.359,
      keyProgrammes: "Extension delivery by A&E Regular during home visits and training",
      challenges: "High cost of poultry feed",
      recommendations: "Established communal grazing"
    },
    {
      indicator: "Plantain",
      baseline2021: 2400,
      actual2022: 2688,
      actual2023: 2931,
      target2024: 3500,
      actual2024: 1584.0,
      keyProgrammes: "Extension delivery by A&E Regular during home visits and training",
      challenges: "Bush fires",
      recommendations: "Facilitate land acquisition for poultry"
    },
    {
      indicator: "Groundnut",
      baseline2021: 5.125,
      actual2022: 5.700,
      actual2023: 6.277,
      target2024: 8.400,
      actual2024: 2.06640,
      keyProgrammes: "Extension delivery by A&E Regular during home visits and training",
      challenges: "Cassava rot",
      recommendations: "Facilitate land acquisition for poultry"
    },
    {
      indicator: "Cowpea",
      baseline2021: 1.390,
      actual2022: 1.501,
      actual2023: 1.543,
      target2024: 2.700,
      actual2024: 782,
      keyProgrammes: "Extension delivery by A&E Regular during home visits and training",
      challenges: "Unavailability of tractor",
      recommendations: "Facilitate land acquisition for poultry"
    },
    {
      indicator: "Soybean",
      baseline2021: 1.54,
      actual2022: 1.717,
      actual2023: 3.69,
      target2024: 5.000,
      actual2024: 231,
      keyProgrammes: "Establishment of demonstration plots",
      challenges: "Unavailability of imported feed mill, reduce on tax",
      recommendations: "Establish feed mill, reduce tax on imported feed stocks"
    },
    {
      indicator: "Cocoa",
      baseline2021: 3.982,
      actual2022: 4.500,
      actual2023: 4.800,
      target2024: 4.900,
      actual2024: 4.845,
      keyProgrammes: "Establishment of demonstration plots",
      challenges: "Unavailability of Credit",
      recommendations: "Establish feed mill, reduce tax on imported feed stocks"
    },
    {
      indicator: "Shea nut",
      baseline2021: "N/A",
      actual2022: "N/A",
      actual2023: "N/A",
      target2024: "N/A",
      actual2024: "N/A",
      keyProgrammes: "Sensitization on GAPs on Best & Management practices (BMPs)",
      challenges: "High cost of inputs",
      recommendations: "By laws to control bush fire"
    },
    {
      indicator: "Oil palm",
      baseline2021: 7.634,
      actual2022: 8.500,
      actual2023: 8.600,
      target2024: 8.800,
      actual2024: 7.904,
      keyProgrammes: "Sensitization on GAPs on Best & Management practices (BMPs)",
      challenges: "High cost of inputs",
      recommendations: "By laws to control bush fire"
    },
    {
      indicator: "Cashew nut",
      baseline2021: 17.195,
      actual2022: 17.600,
      actual2023: 17.850,
      target2024: 18.000,
      actual2024: 18.80,
      keyProgrammes: "Sensitization on GAPs on Best & Management practices (BMPs)",
      challenges: "High cost of inputs",
      recommendations: "By laws to control bush fire"
    },
    {
      indicator: "Cotton",
      baseline2021: "N/A",
      actual2022: "N/A",
      actual2023: "N/A",
      target2024: "N/A",
      actual2024: "N/A",
      keyProgrammes: "Training on Oil palm tree crops",
      challenges: "Theft",
      recommendations: "Establishment of NTSEC of AMSECs"
    },
    {
      indicator: "Cattle",
      baseline2021: 4408,
      actual2022: 4892,
      actual2023: 5510,
      target2024: 5600,
      actual2024: 5.604,
      keyProgrammes: "Training on Oil palm tree crops",
      challenges: "Theft",
      recommendations: "Establishment of NTSEC of AMSECs"
    },
    {
      indicator: "Sheep",
      baseline2021: 7.885,
      actual2022: 8.552,
      actual2023: 8.850,
      target2024: 9.000,
      actual2024: 8.80,
      keyProgrammes: "Training on Oil palm tree crops",
      challenges: "High cost of credit",
      recommendations: "Establishment of NTSEC of AMSECs"
    },
    {
      indicator: "Goats",
      baseline2021: "N/A",
      actual2022: "N/A",
      actual2023: "N/A",
      target2024: "N/A",
      actual2024: "N/A",
      keyProgrammes: "Training on Oil palm tree crops",
      challenges: "High cost of credit",
      recommendations: "Establishment of NTSEC of AMSECs"
    }
  ];

  const formatNumber = (value) => {
    if (value === "N/A") return "N/A";
    return Number(value).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  };

  return (
    <div className="col-12">
      <h3>Table 16: Performance of Core Indicators of the End of the Year, 2024</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                     tableCommentedId={`table16-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>S/N</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Indicator (Categorized by Development Agenda for Jobs)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Baseline (2021)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual (2022)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual (2023)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Target (2024)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual (2024)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Key programmes undertaken</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Challenges encountered</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Departmental Policy recommendations</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.baseline2021)}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.actual2022)}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.actual2023)}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.target2024)}</td>
                    <td style={{ border: '1px solid #000' }}>{formatNumber(row.actual2024)}</td>
                    <td style={{ border: '1px solid #000' }}><p>{row.keyProgrammes}</p></td>
                    <td style={{ border: '1px solid #000' }}><p>{row.challenges}</p></td>
                    <td style={{ border: '1px solid #000' }}><p>{row.recommendations}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year} Progress Reports</small>
          </p>
           <APRComment
                      data={tableData}
                      year={year}
                      districtId={district}
                      tableCommentedId={`table16-${year}`}
                     
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

export default Table_16;