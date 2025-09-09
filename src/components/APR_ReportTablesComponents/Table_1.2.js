import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, getAttributeValue, getPlanExecutionStats } from "../../utils/utils";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import APRComment from "../APR_ReportTablesComponents/APRComments"; // Import the APRComment component

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Table1_2 = ({ year, district }) => {
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    getAnnualActionPlan();
  }, [year, district]);

  async function getAnnualActionPlan() {
    try {
      // Determine current year and previous two years
      const currentYear = new Date().getFullYear();
      const years = [currentYear - 2, currentYear - 1, currentYear];
      const tempAllData = [];

      for (const yr of years) {
        const result = await axios.get(
          `/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${yr}-01-01&endDate=${yr}-12-31`
        );
        const resp = await axios.get(
          `/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${yr}-01-01&endDate=${yr}-12-31`
        );

        if (result.data.instances.length > 0) {
          const startDate = `${yr}-01-01`;
          const endDate = `${yr}-12-31`;
          const aap = filterTrackedEntitiesByCreatedAt(result.data.instances, startDate, endDate);
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
            no: item.dimension === "Total" ? 7 : index + 1,
            year: yr,
            percentage: item.planned > 0 ? ((item.executed / item.planned) * 100).toFixed(1) : 0,
          }));

          tempAllData.push(...counts);
        }
      }

      // Filter data for the selected year for the table
      const selectedYearData = tempAllData.filter((row) => row.year === parseInt(year));
      setTableData(selectedYearData);
      setAllData(tempAllData);

      // Prepare bar chart data
      const dimensions = tempAllData
        .filter((row) => row.dimension !== "Total")
        .map((row) => row.dimension)
        .filter((value, index, self) => self.indexOf(value) === index);

      const barChartDataConfig = {
        labels: dimensions.map((dim) => dim.substring(0, 20) + (dim.length > 20 ? "..." : "")),
        datasets: years.map((yr, index) => ({
          label: `${yr} (%)`,
          data: dimensions.map((dim) => {
            const row = tempAllData.find((d) => d.dimension === dim && d.year === yr);
            return row ? parseFloat(row.percentage) : 0;
          }),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
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

      // Prepare pie chart data for the selected year
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

  // Bar chart options
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

  // Pie chart options
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

  // Dynamic paragraph based on tableData
  const dynamicParagraph = () => {
    if (tableData.length === 0) return null;

    const dimensionsData = tableData.filter((row) => row.dimension !== "Total");
    const totalRow = tableData.find((row) => row.dimension === "Total");
    const totalPlanned = totalRow ? totalRow.planned : 0;
    const totalExecuted = totalRow ? totalRow.executed : 0;

    const dimensionStats = dimensionsData.reduce((acc, row) => {
      if (!acc[row.dimension]) {
        acc[row.dimension] = { planned: 0, executed: 0 };
      }
      acc[row.dimension].planned += row.planned;
      acc[row.dimension].executed += row.executed;
      return acc;
    }, {});

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
      <h3>Table 1.2 – Details on Annual Action Plan Implemented under the Development Dimensions</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          Table 1.2 presents the breakdown of activities implemented under the various
          development dimensions. Comparatively, it can be realized that there are more projects
          and programmes in the {year} Annual Action Plan as compared to the base year mainly
          ONGOING 6-UNIT CLASSROOM BLOCK AT BOGREKROM ONGOING COMMUNITY CENTRE AT CYANIDE ONGOING CLASSROOM BLOCK AT MAHAMO
          6 | P a g e
          due to the rolled over projects from previous years and the inclusion of integrated social
          services related activities in the Plan

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
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Development Dimensions</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold', textAlign: 'center' }} colSpan="2">{year}</th>
                </tr>
                <tr style={{ fontWeight: 'bold', border: '1px solid #000' }}>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Planned</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Executed</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <tr key={index} style={
                      row.dimension === "Total"
                        ? { fontWeight: 'bold' }
                        : {}
                    }>
                      <td style={{ border: '1px solid #000', fontWeight: 'bold' }}>{row.no}</td>
                      <td style={{ border: '1px solid #000' }}>{row.dimension}</td>
                      <td style={{ border: '1px solid #000' }}>{row.planned}</td>
                      <td style={{ border: '1px solid #000' }}>{row.executed}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
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
          <div className="mt-10" style={{ height: "700px", margin: "0 auto" }}>
            {Object.keys(chartData).length > 0 ? (
              <Bar data={chartData} options={barChartOptions} />
            ) : (
              <p>Loading bar chart data...</p>
            )}
          </div>
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
          {/* Integrate APRComment component */}
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId="Table1_2" // Unique identifier for this table
            hideComment={false}
          >
            {({ renderCommentInput, renderCommentList }) => (
              <div className="mt-4">
                {renderCommentInput()}
                {renderCommentList()}
              </div>
            )}
          </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table1_2;