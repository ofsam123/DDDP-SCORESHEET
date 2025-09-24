import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table_9 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(null);
  const currentYear = new Date().getFullYear(); // 2025
  const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear]; // [2021, 2022, 2023, 2024]

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
      const estimates = {};
      const performance = {};
      years.forEach(year => {
        const baselineItem = attributes.find(item =>
          item?.displayName?.toLowerCase() === `${revName.toLowerCase()} baseline ${year}`
        );
        const targetItem = attributes.find(item =>
          item?.displayName?.toLowerCase() === `${revName.toLowerCase()} target ${year}`
        );
        estimates[year] = baselineItem ? Number(baselineItem.value) : 0;
        performance[year] = targetItem ? Number(targetItem.value) : 0;
      });

      return {
        name: revName,
        estimates: estimates,
        performance: performance,
        actual: {}
      };
    });

    result.forEach(el => {
      for (let r of reports?.dataValues || []) {
        if (el.name === 'IGF' && r.dataElement === "Wp7KcuZgrJa") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'DACF' && r.dataElement === "rtZ2oyIrEZE") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'MPs CF' && r.dataElement === "sPtuvxHoqBI") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'PWDs CF' && r.dataElement === "iPJma6G8Pen") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'DACF-RFG' && r.dataElement === "PnPth1bxPDM") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'Decentralized Dept' && r.dataElement === "PO8QzvjK8VM") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'GOG Salaries' && r.dataElement === "nHtXhtCsha8") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'MDF' && r.dataElement === "IujXTMPpFux") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'Stool Lands' && r.dataElement === "J8qgTRwB7wj") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        } else if (el.name === 'CIDA' && r.dataElement === "WlVIx0WUbgt") {
          const yearMatch = r.eventDate ? new Date(r.eventDate).getFullYear() : null;
          if (yearMatch && years.includes(yearMatch)) el.actual[yearMatch] = Number(r.value) || 0;
        }
      }
    });

    return result;
  };

  function getProjects() {
    const startDate = `${years[0]}-01-01`;
    const endDate = `${years[3]}-12-31`;

    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=SY8TpfPgzr9&startDate=${startDate}&endDate=${endDate}`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=SY8TpfPgzr9&orgUnit=${district}&startDate=${startDate}&endDate=${endDate}`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const revenues = formatDataGeneral(result.data.instances, "Years", `${years[3]}`) || [];
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const revenuMapped = mapRevenueData(revenues, reports);

              const cleanNumber = (val) => parseFloat((val || "0").toString().replace(/,/g, ''));

              const totalRow = {
                name: 'Total',
                estimates: years.reduce((acc, y) => ({ ...acc, [y]: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.estimates[y]), 0) }), {}),
                performance: years.reduce((acc, y) => ({ ...acc, [y]: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.performance[y]), 0) }), {}),
                actual: years.reduce((acc, y) => ({ ...acc, [y]: revenuMapped.reduce((sum, el) => sum + cleanNumber(el.actual[y] || 0), 0) }), {}),
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
        label: `Baseline ${years[0]} (GH¢)`,
        data: tableData.map(item => item.estimates[years[0]]),
        backgroundColor: "#1e8fff8e",
        borderColor: "#1e8fff8e",
        borderWidth: 1,
      },
      {
        label: `Actual ${years[3]} (GH¢)`,
        data: tableData.map(item => item.actual[years[3]] || 0),
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
        text: `${years[0]} Baseline and ${years[3]} Actual Revenue Receipts`,
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
      <h3>Table 9: Update on Revenue Sources as of the end of the Year (current year and last 3 previous years)</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table9-${year}`}
          />
          <div className="table-responsive">
            <h6>The funding sources of the Assembly, over the years have been the Central Government 
transfers to MMDAs (GOG Grants), the District Assembly Common Fund (DACF), the 
District Assembly Common Fund-Responsive Factor Grant (DACF-RFG), the Minerals 
Development Fund, Donor Grants and the Assembly’s own Internally Generated Funds 
(IGF). Others are the Member of Parliament’s Common Fund (MP’sCF).</h6>
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
                  <th style={{ border: '1px solid #000' }} rowSpan="2">Revenue Source</th>
                  <th style={{ border: '1px solid #000' }} colSpan="4">Estimates</th>
                  <th style={{ border: '1px solid #000' }} colSpan="4">Performance</th>
                </tr>
                <tr>
                  {years.map(year => (
                    <th key={year} style={{ border: '1px solid #000' }}>{year}</th>
                  ))}
                  {years.map(year => (
                    <th key={year} style={{ border: '1px solid #000' }}>{year}</th>
                  ))}
                </tr>
              </thead>
              {tableData && (
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #000' }}>{row.name}</td>
                      {years.map(year => (
                        <td key={year} style={{ border: '1px solid #000' }}>{row.estimates[year]?.toLocaleString() || 0}</td>
                      ))}
                      {years.map(year => (
                        <td key={year} style={{ border: '1px solid #000' }}>{row.performance[year]?.toLocaleString() || 0}</td>
                      ))}
                    </tr>
                  ))}
                  {total && (
                    <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      <td style={{ border: '1px solid #000' }}>{total.name}</td>
                      {years.map(year => (
                        <td key={year} style={{ border: '1px solid #000' }}>{total.estimates[year]?.toLocaleString() || 0}</td>
                      ))}
                      {years.map(year => (
                        <td key={year} style={{ border: '1px solid #000' }}>{total.performance[year]?.toLocaleString() || 0}</td>
                      ))}
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>

          <h6>
            Figure 2.1 further shows the revenue trends of {years[0]} baseline and actual receipts for {years[3]}. It can be realized that the major source of funding for implementation of projects during the period remained the IGF which includes receipts from mineral revenue.
          </h6>
        
            <Bar data={chartData} options={chartOptions} />
       
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>

          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table9-${year}`}
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

export default Table_9;