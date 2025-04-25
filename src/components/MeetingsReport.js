import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../api/axios";

function MeetingRegionalReport({ title, meetingsData, generalmeetingsData, selectedYear }) {
  const [regions, setRegions] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ meetings: [], generalMeetings: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Use selectedYear or default to "2024"
        const year = selectedYear || "2024";

        // Fetch regions
        const regionsResponse = await axios.get("/organisationUnits?level=2&paging=false");
        console.log("Regions Response:", regionsResponse.data);
        const regionList = regionsResponse.data.organisationUnits.map((unit) => ({
          id: unit.id,
          name: unit.displayName,
        }));

        // Fetch analytics data for Meetings and General Meetings
        const analyticsResponse = await axios.get(
          `/analytics.json?dimension=dx:aeKyGvo5OIp;BEUJdCeTGIE&dimension=ou:LEVEL-2&filter=pe:${year}-01-01;${year}-12-31`
        );
        console.log("Meetings Analytics Response:", analyticsResponse.data);
        const rows = analyticsResponse.data.rows || [];

        // Initialize arrays for meetings and general meetings
        const meetings = new Array(regionList.length).fill(0);
        const generalMeetings = new Array(regionList.length).fill(0);

        // Map analytics data to regions
        rows.forEach(([dataElement, orgUnit, value]) => {
          const regionIndex = regionList.findIndex((region) => region.id === orgUnit);
          if (regionIndex !== -1) {
            const count = parseFloat(value) || 0;
            if (dataElement === "aeKyGvo5OIp") {
              meetings[regionIndex] = count;
            } else if (dataElement === "BEUJdCeTGIE") {
              generalMeetings[regionIndex] = count;
            }
          } else {
            console.warn(`No region found for orgUnit: ${orgUnit}`);
          }
        });

        console.log("Processed Meetings Data:", meetings);
        console.log("Processed General Meetings Data:", generalMeetings);

        setRegions(regionList.map((region) => region.name));
        setAnalyticsData({
          meetings,
          generalMeetings,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedYear]); // Depend on selectedYear

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
              { ...meetingsData, data: analyticsData.meetings },
              { ...generalmeetingsData, data: analyticsData.generalMeetings },
            ]}
            options={{
              chart: {
                stacked: true,
                toolbar: { show: false },
              },
              colors: [meetingsData.color, generalmeetingsData.color],
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
                  formatter: (val) => `${val} ${val === 1 ? "meeting" : "meetings"}`,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MeetingRegionalReport;