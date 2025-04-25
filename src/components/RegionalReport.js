import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../api/axios";

function RegionalReport({ title, plans, completed }) {
  const [regions, setRegions] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ plans: [], completed: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch regions
        const regionsResponse = await axios.get("/organisationUnits?level=2&paging=false");
        console.log("Regions Response:", regionsResponse.data);
        const regionList = regionsResponse.data.organisationUnits.map((unit) => ({
          id: unit.id,
          name: unit.displayName,
        }));

        // Fetch analytics data
        const analyticsResponse = await axios.get(
          "/analytics.json?dimension=dx:L2oTOp0EA1A;csukj9I0QMB&dimension=ou:LEVEL-2&filter=pe:2024-01-01;2024-12-31"
        );
        console.log("Analytics Response:", analyticsResponse.data);
        const rows = analyticsResponse.data.rows || [];

        // Initialize arrays for plans and completed counts
        const plansData = new Array(regionList.length).fill(0);
        const completedData = new Array(regionList.length).fill(0);

        // Map analytics data to regions
        rows.forEach(([dataElement, orgUnit, value]) => {
          const regionIndex = regionList.findIndex((region) => region.id === orgUnit);
          if (regionIndex !== -1) {
            const count = parseFloat(value) || 0;
            if (dataElement === "L2oTOp0EA1A") {
              plansData[regionIndex] = count;
            } else if (dataElement === "csukj9I0QMB") {
              completedData[regionIndex] = count;
            }
          } else {
            console.warn(`No region found for orgUnit: ${orgUnit}`);
          }
        });

        console.log("Processed Plans Data:", plansData);
        console.log("Processed Completed Data:", completedData);

        setRegions(regionList.map((region) => region.name));
        setAnalyticsData({
          plans: plansData,
          completed: completedData,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
      </div>
      <div className="card-body pt-0">
        {isLoading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <Chart
            type="bar"
            width="100%"
            height={400}
            series={[
              { ...plans, data: analyticsData.plans, name: "Plans" },
              { ...completed, data: analyticsData.completed, name: "Completed" },
            ]}
            options={{
              chart: {
                stacked: true,
                toolbar: { show: false },
              },
              colors: [plans.color, completed.color],
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "45%",
                },
              },
              dataLabels: {
                enabled: true,
                formatter: (val) => (val > 0 ? val : ""),
              },
              xaxis: {
                categories: regions.length > 0 ? regions : ["No regions available"],
                labels: {
                  rotate: -45,
                  style: {
                    fontSize: "12px",
                  },
                },
              },
              yaxis: {
                title: {
                  text: "Count",
                },
              },
              legend: {
                position: "top",
              },
              tooltip: {
                y: {
                  formatter: (val) => `${val} ${val === 1 ? "item" : "items"}`,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default RegionalReport;


