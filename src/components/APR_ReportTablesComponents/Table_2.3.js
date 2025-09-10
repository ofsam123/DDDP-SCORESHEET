import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table2_3 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

  const mapRevenueData = (data, report) => {
    const revenueNames = [
      "IGF", "DACF", "MPs CF", "PWDs CF", "DACF-RFG",
      "Decentralized Dept", "GOG Salaries", "MDF", "Stool Lands", "CIDA"
    ];

    const attributes = data[0]?.attributes;
    const reports = report.find(rep => rep.trackedEntity === data[0]?.trackedEntity);

    const result = revenueNames.map(revName => {
      const baselineItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${revName.toLowerCase()} baseline`
      );
      const targetItem = attributes.find(item =>
        item?.displayName?.toLowerCase() === `${revName.toLowerCase()} target`
      );

      return {
        name: revName,
        baseline: baselineItem ? Number(baselineItem.value) : 0,
        target: targetItem ? Number(targetItem.value) : 0,
        actual: 0
      };
    });

    result.forEach(el => {
      for (let r of reports.dataValues) {
        if (el.name === 'IGF' && r.dataElement === "Wp7KcuZgrJa") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'DACF' && r.dataElement === "rtZ2oyIrEZE") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'MPs CF' && r.dataElement === "sPtuvxHoqBI") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'PWDs CF' && r.dataElement === "iPJma6G8Pen") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'DACF-RFG' && r.dataElement === "PnPth1bxPDM") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'Decentralized Dept' && r.dataElement === "PO8QzvjK8VM") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'GOG Salaries' && r.dataElement === "nHtXhtCsha8") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'MDF' && r.dataElement === "IujXTMPpFux") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'Stool Lands' && r.dataElement === "J8qgTRwB7wj") {
          el.actual = Number(r.value);
          break;
        } else if (el.name === 'CIDA' && r.dataElement === "WlVIx0WUbgt") {
          el.actual = Number(r.value);
          break;
        }
      }
    });

    return result;
  };

  function getProjects() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=SY8TpfPgzr9&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=SY8TpfPgzr9&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const revenues = formatDataGeneral(result.data.instances, "Years", "2025") || [];
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const revenuMapped = mapRevenueData(revenues, reports);

              const cleanNumber = (val) => parseFloat((val || "0").toString().replace(/,/g, ''));

              const totalRow = {
                name: 'Total',
                baseline: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.baseline), 0),
                target: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.target), 0),
                actual: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.actual), 0),
              };

              setTotal(totalRow);
              setTableData(revenuMapped);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  const chartData = {
    labels: tableData.map(item => item.name),
    datasets: [
      {
        label: `Baseline ${year - 1} (GH¢)`,
        data: tableData.map(item => item.baseline),
        backgroundColor: "#1e8fff8e",
        borderColor: "#1e8fff8e",
        borderWidth: 1,
      },
      {
        label: `Actual ${year} (GH¢)`,
        data: tableData.map(item => item.actual),
        backgroundColor: "#f4080886",
        borderColor: "#ff000086",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${year - 1} Baseline and ${year} Actual Revenue Receipts`,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Revenue (GH¢)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-12">
      <h3>Table 2.3 – Revenue Updates</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          
          <div className="table-responsive">

            <h6>The funding sources of the Assembly, over the years have been the Central Government 
transfers to MMDAs (GOG Grants), the District Assembly Common Fund (DACF), the 
District Assembly Common Fund-Responsive Factor Grant (DACF-RFG), the Minerals 
Development Fund, Donor Grants and the Assembly’s own Internally Generated Funds 
(IGF). Others are the Member of Parliament’s Common Fund (MP’sCF). </h6>
<h7>
During the year under review, funds received included the Internally Generated Funds;
District Assembly’s Common Fund; Persons with Disability Common Fund; Member of 
Parliament’s Common Fund and the District Assemblies Common Fund-Responsive Factor 
Grant. Table 2.3 shows the updates from the various sources and their targets.</h7>


           <table
  className="table table-bordered"
  style={{
    marginTop: 20,
    border: '1px solid #000',
    borderCollapse: 'collapse',
    width: '100%',
  }}
>
  <thead
    style={{
      backgroundColor: '#d4edda',
      fontWeight: 'bold',
    }}
  >
    <tr>
      <th style={{ border: '1px solid #000' }}>Revenue Item</th>
      <th style={{ border: '1px solid #000' }}>Baseline (GH¢)</th>
      <th style={{ border: '1px solid #000' }}>Target (GH¢)</th>
      <th style={{ border: '1px solid #000' }}>Actual (GH¢)</th>
    </tr>
  </thead>
  {tableData && (
    <tbody>
      {tableData.map((row, index) => (
        <tr key={index}>
          <td style={{ border: '1px solid #000' }}>{row.name}</td>
          <td style={{ border: '1px solid #000' }}>{row.baseline.toLocaleString()}</td>
          <td style={{ border: '1px solid #000' }}>{row.target.toLocaleString()}</td>
          <td style={{ border: '1px solid #000' }}>{row.actual.toLocaleString()}</td>
        </tr>
      ))}
      {total && (
        <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
          <td style={{ border: '1px solid #000' }}>{total.name}</td>
          <td style={{ border: '1px solid #000' }}>{total.baseline.toLocaleString()}</td>
          <td style={{ border: '1px solid #000' }}>{total.target.toLocaleString()}</td>
          <td style={{ border: '1px solid #000' }}>{total.actual.toLocaleString()}</td>
        </tr>
      )}
    </tbody>
  )}
</table>

          </div>

          <h6>
            Figure 2.1 further shows the revenue trends of {year - 1} baseline and actual receipts for {year}. It can be realized that the major source of funding for implementation of projects during the period remained the IGF which includes receipts from mineral revenue.
          </h6>
          <div className="mt-10" style={{ height: "700px",}}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Table2_3;