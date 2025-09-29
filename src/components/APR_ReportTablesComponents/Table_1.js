import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, getAttributeValue, getPlanExecutionStats } from "../../utils/utils";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Table_1 = ({ year, district, period,  hideTableDis }) => {
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    getAnnualActionPlan();
  }, [year, district, period]);

  async function getAnnualActionPlan() {
    try {
      // Determine current year and previous two years for charts (2023, 2024, 2025)
      const currentYear = new Date().getFullYear(); // 2025
      const years = [currentYear - 2, currentYear - 1, currentYear]; // [2023, 2024, 2025]
      const tempAllData = [];

      for (const yr of years) {
        const result = await axios.get(
          `/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${yr}-01-01&endDate=${yr}-12-31&pageSize=5000`
        );
        const resp = await axios.get(
          `/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${yr}-01-01&endDate=${yr}-12-31&pageSize=5000`
        );

        if (result.data.instances.length > 0) {
          const aap = filterTrackedEntitiesByCreatedAt(result.data.instances, yr, period);
          const reports = resp.data.instances;
          const formattedPlans = [];

          aap.forEach((plan, idx) => {
            const dataSetTemp = {
              index: idx,
              dd: getAttributeValue("Development Dimension", plan),
              date: plan.createdAt,
              trackedEntity: plan.trackedEntity,
            };
            formattedPlans.push(dataSetTemp);
          });

          const counts = getPlanExecutionStats(formattedPlans, reports).map((item, index) => ({
            ...item,
            no: item.dimension === "Total" ? 7 : index + 1, // Assign S/N, 7 for Total
            year: yr,
            percentage: item.planned > 0 ? ((item.executed / item.planned) * 100).toFixed(1) : 0,
          }));

          tempAllData.push(...counts);
        }
      }

      // Filter data for the selected year for the table (as per old code)
      const selectedYearData = tempAllData.filter((row) => row.year === parseInt(year));
      setTableData(selectedYearData);
      setAllData(tempAllData);

      // Prepare bar chart data (reusing old logic)
      const dimensions = tempAllData
        .filter((row) => row.dimension !== "Total")
        .map((row) => row.dimension)
        .filter((value, index, self) => self.indexOf(value) === index); // Unique dimensions

      const barChartDataConfig = {
        labels: dimensions.map((dim) => dim.substring(0, 20) + (dim.length > 20 ? "..." : "")),
        datasets: years.map((yr, index) => ({
          label: `${yr} (%)`,
          data: dimensions.map((dim) => {
            const row = tempAllData.find((d) => d.dimension === dim && d.year === yr);
            return row ? parseFloat(row.percentage) : 0;
          }),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)", // First year (2023)
            "rgba(255, 99, 132, 0.6)", // Second year (2024)
            "rgba(75, 192, 192, 0.6)", // Current year (2025)
          ][index],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
          ][index],
          borderWidth: 1,
        })),
      };
      setChartData(barChartDataConfig);

      // Prepare pie chart data for the selected year (reusing old logic)
      const totalRow = selectedYearData.find((row) => row.dimension === "Total");
      const implemented = totalRow ? totalRow.executed : 0;
      const nonImplemented = totalRow ? totalRow.planned - totalRow.executed : 0;

      const pieChartDataConfig = {
        labels: ["Implemented", "Non-Implemented"],
        datasets: [
          {
            data: [implemented, nonImplemented],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      };
      setPieChartData(pieChartDataConfig);
    } catch (err) {
      console.error("Error in getAnnualActionPlan:", err);
      setTableData([]);
      setAllData([]);
      setChartData({});
      setPieChartData({});
    }
  }

  // Bar chart options (reusing old logic)
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Performance Comparison by Development Dimension (${new Date().getFullYear() - 2}-${new Date().getFullYear()})`,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage Executed (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Development Dimensions",
        },
      },
    },
  };

  // Pie chart options (reusing old logic)
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Projects Implemented vs Non-Implemented (${year})`,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} projects`,
        },
      },
    },
  };

  // Dynamic paragraph based on tableData (reusing old logic)
  const dynamicParagraph = () => {
    if (tableData.length === 0) return null;

    const dimensionsData = tableData.filter((row) => row.dimension !== "Total");
    const totalRow = tableData.find((row) => row.dimension === "Total");
    const totalPlanned = totalRow ? totalRow.planned : 0;
    const totalExecuted = totalRow ? totalRow.executed : 0;

    // Group data by dimension and sum planned/executed
    const dimensionStats = dimensionsData.reduce((acc, row)=> {
      if (!acc[row.dimension]) {
        acc[row.dimension] = { planned: 0, executed: 0 };
      }
      acc[row.dimension].planned += row.planned;
      acc[row.dimension].executed += row.executed;
      return acc;
    }, {});

    // Sort by planned activities to find the dimension with the highest planned
    const highestPlanned = Object.entries(dimensionStats).reduce((max, current) =>
      current[1].planned > max[1].planned ? current : max, ["", { planned: 0 }])[0];

    return (
      <p className="mt-3">
        From the above table, it can be noted that the Municipality placed premium on all the six development dimensions under the Agenda for Jobs II policy framework. It earmarked and implemented various interventions for a holistic development towards the achievement of the set goal. Development therefore was widely spread across the various sectors, and none skewed.
        <br />
        {Object.entries(dimensionStats).map(([dimension, stats]) => (
          <span key={dimension}>
            Out of the {stats.planned} planned activities under {dimension}, {stats.executed} were executed.
            {dimension === Object.keys(dimensionStats).pop() ? "" : <br />}
          </span>
        ))}
        This puts the total number of activities implemented at {totalExecuted} out of {totalPlanned} planned.
      </p>
    );
  };

  return (
    <div className="col-12">
      <h3>Table 1 – Proportion of the AAP Implemented by Development Dimensions</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          Table 1 presents the breakdown of activities implemented under the various
          development dimensions. Comparatively, it can be realized that there are more projects
          and programmes in the {year} Annual Action Plan as compared to the base year mainly
          due to the rolled over projects from previous years and the inclusion of integrated social
          services related activities in the Plan.
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table1-${year}`}
             hideTableDis={hideTableDis}
          />
          <div className="table-responsive">
            <table className="table table-bordered" style={{
              border: '1px solid #000',
              borderCollapse: 'collapse',
              width: '100%',
              marginTop: "20px"
            }}>
              <thead>
                <tr style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>S/N</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimension</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold', textAlign: 'center' }} colSpan="2">2022</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold', textAlign: 'center' }} colSpan="2">2023</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold', textAlign: 'center' }} colSpan="2">2024</th>
                </tr>
                <tr style={{ fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Planned</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Executed</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Planned</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Executed</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Planned</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Executed</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => {
                    // Fetch corresponding data for 2022, 2023, 2024 from allData
                    const row2022 = allData.find((d) => d.dimension === row.dimension && d.year === 2022);
                    const row2023 = allData.find((d) => d.dimension === row.dimension && d.year === 2023);
                    const row2024 = allData.find((d) => d.dimension === row.dimension && d.year === 2024);
                    return (
                      <tr key={index} style={
                        row.dimension === "Total"
                          ? { fontWeight: 'bold' }
                          : {}
                      }>
                        <td style={{ border: '1px solid #000', fontWeight: 'bold' }}>{row.no}</td>
                        <td style={{ border: '1px solid #000' }}>{row.dimension}</td>
                        <td style={{ border: '1px solid #000' }}>{row2022 ? row2022.planned : 0}</td>
                        <td style={{ border: '1px solid #000' }}>{row2022 ? row2022.executed : 0}</td>
                        <td style={{ border: '1px solid #000' }}>{row2023 ? row2023.planned : 0}</td>
                        <td style={{ border: '1px solid #000' }}>{row2023 ? row2023.executed : 0}</td>
                        <td style={{ border: '1px solid #000' }}>{row2024 ? row2024.planned : 0}</td>
                        <td style={{ border: '1px solid #000' }}>{row2024 ? row2024.executed : 0}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No data available for {year}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          {dynamicParagraph()}
          <hr />
          <h5>Performance Comparison by Development Dimension ({new Date().getFullYear() - 2}-{new Date().getFullYear()})</h5>
          {/* <div className="mt-10" style={{ height: "700px", margin: "0 auto" }}> */}
            {Object.keys(chartData).length > 0 ? (
              <Bar data={chartData} options={barChartOptions} />
            ) : (
              <p>Loading bar chart data...</p>
            )}
          {/* </div> */}
          <hr />
          <h5>Projects Implemented vs Non-Implemented ({year})</h5>
          <div
            className="flex justify-center items-center"
            style={{ height: "60vh", marginLeft: 250 }}
          >
            {Object.keys(pieChartData).length > 0 ? (
              <Pie data={pieChartData} options={pieChartOptions} />
            ) : (
              <p>Loading pie chart data...</p>
            )}
          </div>

          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table1-${year}`}
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

export default Table_1;