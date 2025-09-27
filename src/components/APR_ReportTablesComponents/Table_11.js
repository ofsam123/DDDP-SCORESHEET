import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import axios from "../../api/axios";
import { formatDataGeneral } from "../../utils/utils";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_11 = ({year, district, period}) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  
    useEffect(() => {
      getData();
    }, [year, district, period]);
  
     const mapData = (data, report) => {

      const reports = report.find(rep => rep.trackedEntity === data[0]?.trackedEntity);
      const temp = [];

      if(reports){
          const gogDataSet = {
            name: "GOG",
            constrained: 0,
            unconstrained: 0,
            released: 0,
            expenditure: 0,
            unc_const: 0,
            const_rel: 0,
            rel_exp: 0
          };

          const igfDataSet = {
            name: "IGF",
            constrained: 0,
            unconstrained: 0,
            released: 0,
            expenditure: 0,
            unc_const: 0,
            const_rel: 0,
            rel_exp: 0
          };

          const donorDataSet = {
            name: "Donor",
            constrained: 0,
            unconstrained: 0,
            released: 0,
            expenditure: 0,
            unc_const: 0,
            const_rel: 0,
            rel_exp: 0
          };

        for (let r of reports?.dataValues) {
          
          // =====GOG details================
          if (r.dataElement === "TRxVdnSbc3T") {
            gogDataSet.constrained = Number(r.value);
            
          } else if (r.dataElement === "H1B1tDtqNzT") {
            gogDataSet.unconstrained = Number(r.value);
            
          } else if (r.dataElement === "t4EVw4yCrQx") {
            gogDataSet.expenditure = Number(r.value);
           
          }else if (r.dataElement === "lLUIrkMKxuB") {
            gogDataSet.released = Number(r.value);
            
          }

            // =====IGF details================
          if (r.dataElement === "YDaRbbOoID1") {
            igfDataSet.constrained = Number(r.value);
           
          } else if (r.dataElement === "rXbeGbHiFTH") {
            igfDataSet.unconstrained = Number(r.value);
            
          } else if (r.dataElement === "bYOo4cA1AI5") {
           igfDataSet.expenditure = Number(r.value);
            
          }else if (r.dataElement === "ZLUExo9LVUu") {
            igfDataSet.released = Number(r.value);
            
          }

            // =====donor details================
          if (r.dataElement === "TYvaR9lZWhN") {
            donorDataSet.constrained = Number(r.value);
           
          } else if (r.dataElement === "i23XBxNQNJA") {
            donorDataSet.unconstrained = Number(r.value);
           
          } else if (r.dataElement === "sVhc1ZgtsPK") {
            donorDataSet.expenditure = Number(r.value);
            
          }else if (r.dataElement === "RZpv96bxm2F") {
            donorDataSet.released = Number(r.value);
            
          }

        }

        gogDataSet.unc_const = gogDataSet.unconstrained - gogDataSet.constrained;
        gogDataSet.const_rel = gogDataSet.constrained - gogDataSet.released;
        gogDataSet.rel_exp = gogDataSet.released - gogDataSet.expenditure;

        igfDataSet.unc_const = igfDataSet.unconstrained - igfDataSet.constrained;
        igfDataSet.const_rel = igfDataSet.constrained - igfDataSet.released;
        igfDataSet.rel_exp = igfDataSet.released - igfDataSet.expenditure;

        donorDataSet.unc_const = donorDataSet.unconstrained - donorDataSet.constrained;
        donorDataSet.const_rel = donorDataSet.constrained - donorDataSet.released;
        donorDataSet.rel_exp = donorDataSet.released - donorDataSet.expenditure;

        temp.push(gogDataSet);
        temp.push(igfDataSet);
        temp.push(donorDataSet);

      }      
  
      return temp;
    };
  
  
  
  
    function getData() {
      axios
        .get(`/tracker/trackedEntities?orgUnit=${district}&program=WHILilRZRhT&startDate=${year}-01-01&endDate=${year}-12-31`)
        .then(result => {
          if (result.data.instances.length > 0) {
            const startDate = `${year}-01-01`;
            const endDate = `${year}-12-31`;
  
            axios
              .get(`/tracker/events?program=WHILilRZRhT&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
              .then(resp => {
                
                
                const expenditures = formatDataGeneral(result.data.instances, "Years", `${year}`) || [];
                
                const reports = resp.data.instances;
  
                const reportFiltered = reports.filter(rep=> rep.programStage === "BRJ5cnjnoaq")
                
                const expenditureMapped = mapData(expenditures, reportFiltered);

                console.log("Djiba expenses data: ", expenditureMapped);
                
               
                setTableData(expenditureMapped);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }

  const chartData = {
    labels: tableData.map(item => item.item),
    datasets: [
      {
        label: "Unconstrained Estimate (GH¢)",
        data: tableData.map(item => item.unconstrained),
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "Constrained Estimate (GH¢)",
        data: tableData.map(item => item.constrained),
        backgroundColor: "#28a745",
        borderColor: "#1e7e34",
        borderWidth: 1,
      },
      {
        label: "Released (GH¢)",
        data: tableData.map(item => item.released),
        backgroundColor: "#ffc107",
        borderColor: "#d39e00",
        borderWidth: 1,
      },
      {
        label: "Expenditure (GH¢)",
        data: tableData.map(item => item.expenditure),
        backgroundColor: "#dc3545",
        borderColor: "#bd2130",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "CAPEX Budget Performance Analysis, 2024",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (GH¢)",
        },
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 11: CAPEX Budget Performance Analysis, 2024</h3>
      <div className="card">
        <div className="card-body">
           <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table11-${year}`}
          />
          <div className="table-responsive">
            <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead style={{ backgroundColor: "#d4edda", fontWeight: "bold" }}>
                <tr>
                  <th style={{ border: "1px solid #000" }}>Item</th>
                  <th style={{ border: "1px solid #000" }} colSpan="2">Estimate</th>
                  <th style={{ border: "1px solid #000" }} >Released</th>
                  <th style={{ border: "1px solid #000" }}>Expenditure</th>
                  <th style={{ border: "1px solid #000" }} colSpan="3">Variation</th>
                </tr>
                <tr>
                  <th style={{ border: "1px solid #000" }}></th>
                  <th style={{ border: "1px solid #000" }}>Unconstrained (A)</th>
                  <th style={{ border: "1px solid #000" }}>Constrained (B)</th>
                  <th style={{ border: "1px solid #000" }}>(C)</th>
                  <th style={{ border: "1px solid #000" }}>(D)</th>
                  <th style={{ border: "1px solid #000" }}>(A-B)</th>
                  <th style={{ border: "1px solid #000" }}>(B-C)</th>
                  <th style={{ border: "1px solid #000" }}>(C-D)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000" }}>{row.name}</td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.unconstrained.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.constrained.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.released.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.expenditure.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.unc_const?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.const_rel?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ border: "1px solid #000" }}>
                      {row.rel_exp?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: CAPEX Budget Report, 2024</small>
          </p>

          {/* Bar Chart */}
          <h4>Figure 11: CAPEX Budget Performance, 2024</h4>
        
            <Bar data={chartData} options={chartOptions} />
            <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table11-${year}`}
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

export default Table_11;