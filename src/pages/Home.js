import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SideBarWrapper from "../components/SideBarWrapper";
import CardBox from "../components/CardBox";
import GeneralChart from "../components/GeneralChart";
import MintueNinvitaionChart from "../components/minutesNinvitationLetterCart";
import Select from "react-select";
import { EyeOutlined, ProjectOutlined, AppstoreOutlined, TeamOutlined, ApartmentOutlined } from "@ant-design/icons";

function Home() {
  // Data objects for charts
  const plans = {
    name: "Plans",
    color: "rgb(29, 82, 136)",
  };

  const completed = {
    name: "Completed",
    color: "rgb(255,165,0)",
  };

  const meetingsData = {
    name: "Meetings",
    color: "rgb(29, 82, 136)", // Dark Green
  };

  const generalmeetingsData = {
    name: "Decicions",
    color: "#f40b51", // Blue
  };

  // Home component state
  const [instances, setInstances] = useState("");
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
  const [isLoading, setIsLoading] = useState(true);
  const [aapTotal, setAapTotal] = useState(0);
  const [projectsTotal, setProjectsTotal] = useState(0);
  const [programsTotal, setProgramsTotal] = useState(0);
  const [meetingsTotal, setMeetingsTotal] = useState(0);
  const [departmentsTotal, setDepartmentsTotal] = useState(0);
  const [meetingChartData, setMeetingChartData] = useState([]);
  const [meetingChartError, setMeetingChartError] = useState(null);
  const [minuteInvitationData, setMinuteInvitationData] = useState([]);
  const [minuteInvitationError, setMinuteInvitationError] = useState(null);

  // MeetingRegionalReport state
  const [meetingRegions, setMeetingRegions] = useState([]);
  const [meetingAnalyticsData, setMeetingAnalyticsData] = useState({ meetings: [], generalMeetings: [] });
  const [meetingReportLoading, setMeetingReportLoading] = useState(true);
  const [meetingReportError, setMeetingReportError] = useState(null);

  // RegionalReport state
  const [actionPlanRegions, setActionPlanRegions] = useState([]);
  const [actionPlanAnalyticsData, setActionPlanAnalyticsData] = useState({ plans: [], completed: [] });
  const [actionPlanReportLoading, setActionPlanReportLoading] = useState(true);
  const [actionPlanReportError, setActionPlanReportError] = useState(null);

  // Year options for dropdown
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });

  useEffect(() => {
    getData("/organisationUnits?level=3&paging=false");
    fetchTotals();
    fetchMeetingChartData();
    fetchMinuteInvitationData();
    fetchMeetingReportData();
    fetchActionPlanReportData(); // Fetch RegionalReport data
  }, [selectedYear]);

  // MeetingRegionalReport data fetching
  async function fetchMeetingReportData() {
    setMeetingReportLoading(true);
    try {
      const year = selectedYear.value;
      const regionsResponse = await axios.get("/organisationUnits?level=2&paging=false");
      console.log("Meeting Regions Response:", regionsResponse.data);
      const regionList = regionsResponse.data.organisationUnits.map((unit) => ({
        id: unit.id,
        name: unit.displayName,
      }));

      const analyticsResponse = await axios.get(
        // '/analytics.json?dimension=dx:aeKyGvo5OIp;kaxkMvOIXwW&dimension=ou:LEVEL-2&filter=pe:2024-01-01;2024-12-31'
         `/analytics.json?dimension=dx:aeKyGvo5OIp;kaxkMvOIXwW&dimension=ou:LEVEL-2&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Meetings Analytics Response:", analyticsResponse.data);
      const rows = analyticsResponse.data.rows || [];

      const meetings = new Array(regionList.length).fill(0);
      const generalMeetings = new Array(regionList.length).fill(0);

      rows.forEach(([dataElement, orgUnit, value]) => {
        const regionIndex = regionList.findIndex((region) => region.id === orgUnit);
        if (regionIndex !== -1) {
          const count = parseFloat(value) || 0;
          if (dataElement === "aeKyGvo5OIp") {
            meetings[regionIndex] = count;
          } else if (dataElement === "kaxkMvOIXwW") {
            generalMeetings[regionIndex] = count;
          }
        } else {
          console.warn(`No region found for orgUnit: ${orgUnit}`);
        }
      });

      console.log("Processed Meetings Data:", meetings);
      console.log("Processed General Meetings Data:", generalMeetings);

      setMeetingRegions(regionList.map((region) => region.name));
      setMeetingAnalyticsData({
        meetings,
        generalMeetings,
      });
      setMeetingReportLoading(false);
    } catch (err) {
      console.error("Error fetching meeting report data:", err);
      setMeetingReportError("Failed to load meeting report data");
      setMeetingReportLoading(false);
    }
  }

  // RegionalReport data fetching
  async function fetchActionPlanReportData() {
    setActionPlanReportLoading(true);
    try {
      const year = selectedYear.value;
      const regionsResponse = await axios.get("/organisationUnits?level=2&paging=false");
      console.log("Action Plan Regions Response:", regionsResponse.data);
      const regionList = regionsResponse.data.organisationUnits.map((unit) => ({
        id: unit.id,
        name: unit.displayName,
      }));

      const analyticsResponse = await axios.get(
        `/analytics.json?dimension=dx:L2oTOp0EA1A;csukj9I0QMB&dimension=ou:LEVEL-2&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Action Plan Analytics Response:", analyticsResponse.data);
      const rows = analyticsResponse.data.rows || [];

      const plansData = new Array(regionList.length).fill(0);
      const completedData = new Array(regionList.length).fill(0);

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

      setActionPlanRegions(regionList.map((region) => region.name));
      setActionPlanAnalyticsData({
        plans: plansData,
        completed: completedData,
      });
      setActionPlanReportLoading(false);
    } catch (err) {
      console.error("Error fetching action plan report data:", err);
      setActionPlanReportError("Failed to load action plan report data");
      setActionPlanReportLoading(false);
    }
  }

  async function fetchMeetingChartData() {
    try {
      const year = selectedYear.value;
      const response = await axios.get(
        `/analytics.json?dimension=dx:aeKyGvo5OIp;BEUJdCeTGIE;M86dDnKObvx;cz086QtLaoW;wGeWq6JhDQA&dimension=ou:LEVEL-2;sQ7uY7OfGh9&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Meeting Chart Analytics Response:", response.data);
      const rows = response.data.rows || [];

      const counts = {
        aeKyGvo5OIp: 0,
        BEUJdCeTGIE: 0,
        M86dDnKObvx: 0,
        cz086QtLaoW: 0,
        wGeWq6JhDQA: 0,
      };

      rows.forEach(([dataElement, orgUnit, value]) => {
        if (counts.hasOwnProperty(dataElement)) {
          counts[dataElement] += parseFloat(value) || 0;
        } else {
          console.warn(`Unknown data element: ${dataElement}`);
        }
      });

      const totalMeetings = counts.aeKyGvo5OIp || 1;
      const percentages = [
        (counts.BEUJdCeTGIE / totalMeetings) * 100,
        (counts.M86dDnKObvx / totalMeetings) * 100,
        (counts.cz086QtLaoW / totalMeetings) * 100,
        (counts.wGeWq6JhDQA / totalMeetings) * 100,
      ].map(val => Number(val.toFixed(2)));

      console.log("Total Meetings:", totalMeetings);
      console.log("Processed Meeting Chart Percentages:", percentages);
      setMeetingChartData(percentages);
    } catch (err) {
      console.error("Error fetching meeting chart data:", err);
      setMeetingChartError("Failed to load meeting chart data.");
    }
  }

  async function fetchMinuteInvitationData() {
    try {
      const year = selectedYear.value;
      const response = await axios.get(
        `/analytics.json?dimension=dx:yhzMdqZp0Qh;RsgxfezgTyr&dimension=ou:LEVEL-2;sQ7uY7OfGh9&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Minute Invitation Chart Analytics Response:", response.data);
      const rows = response.data.rows || [];

      const counts = {
        yhzMdqZp0Qh: 0,
        RsgxfezgTyr: 0,
      };

      rows.forEach(([dataElement, orgUnit, value]) => {
        if (counts.hasOwnProperty(dataElement)) {
          counts[dataElement] += parseFloat(value) || 0;
        } else {
          console.warn(`Unknown data element: ${dataElement}`);
        }
      });

      const total = counts.yhzMdqZp0Qh + counts.RsgxfezgTyr || 1;
      const percentages = [
        (counts.yhzMdqZp0Qh / total) * 100,
        (counts.RsgxfezgTyr / total) * 100,
      ].map(val => Number(val.toFixed(2)));

      console.log("Total Invitations + Minutes:", total);
      console.log("Processed Minute Invitation Percentages:", percentages);
      setMinuteInvitationData(percentages);
    } catch (err) {
      console.error("Error fetching minute invitation data:", err);
      setMinuteInvitationError("Failed to load invitation and minutes chart data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTotals(orgUnit = "rHkDRHKXIdP") {
    setIsLoading(true);
    try {
      const year = selectedYear.value;
      const aapResp = await axios.get(
        `/analytics.json?dimension=dx:L2oTOp0EA1A&orgUnit=${orgUnit}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("AAP Analytics Response:", aapResp.data);
      const aapRows = aapResp.data.rows || [];
      const aapCount = aapRows.length > 0 ? parseFloat(aapRows[0][1]) || 0 : 0;
      setAapTotal(aapCount);

      const projectsResp = await axios.get(
        `/analytics.json?dimension=dx:cHp5d6g8Z1K&orgUnit=${orgUnit}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Projects Analytics Response:", projectsResp.data);
      const projectsRows = projectsResp.data.rows || [];
      const projectsCount = projectsRows.length > 0 ? parseFloat(projectsRows[0][1]) || 0 : 0;
      setProjectsTotal(projectsCount);

      const programsResp = await axios.get(
        `/analytics.json?dimension=dx:WR0IO6mvdmw&orgUnit=${orgUnit}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Programs Analytics Response:", programsResp.data);
      const programsRows = programsResp.data.rows || [];
      const programsCount = programsRows.length > 0 ? parseFloat(programsRows[0][1]) || 0 : 0;
      setProgramsTotal(programsCount);

      const meetingsResp = await axios.get(
        `/analytics.json?dimension=dx:aeKyGvo5OIp&orgUnit=${orgUnit}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Meetings Analytics Response:", meetingsResp.data);
      const meetingsRows = meetingsResp.data.rows || [];
      const meetingsCount = meetingsRows.length > 0 ? parseFloat(meetingsRows[0][1]) || 0 : 0;
      setMeetingsTotal(meetingsCount);

      const departmentsResp = await axios.get(
        `/analytics.json?dimension=dx:wGeWq6JhDQA&orgUnit=${orgUnit}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("Departments Analytics Response:", departmentsResp.data);
      const departmentsRows = departmentsResp.data.rows || [];
      const departmentsCount = departmentsRows.length > 0 ? parseFloat(departmentsRows[0][1]) || 0 : 0;
      setDepartmentsTotal(departmentsCount);
    } catch (err) {
      console.error("Error fetching totals:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function pullTrackerInstance(url, districtId) {
    try {
      const year = selectedYear.value;
      const aapResult = await axios.get(
        `/analytics.json?dimension=dx:L2oTOp0EA1A&orgUnit=${districtId}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("District AAP Response:", aapResult.data);
      const aapRows = aapResult.data.rows || [];
      const aapCount = aapRows.length > 0 ? parseFloat(aapRows[0][1]) || 0 : 0;
      setAapTotal(aapCount);

      const projectsResult = await axios.get(
        `/analytics.json?dimension=dx:cHp5d6g8Z1K&orgUnit=${districtId}&filter=pe:${year}-01-01;${year}-12-31`
      );
      const projectsRows = projectsResult.data.rows || [];
      const projectsCount = projectsRows.length > 0 ? parseFloat(projectsRows[0][1]) || 0 : 0;
      setProjectsTotal(projectsCount);

      const programsResult = await axios.get(
        `/analytics.json?dimension=dx:WR0IO6mvdmw&orgUnit=${districtId}&filter=pe:${year}-01-01;${year}-12-31`
      );
      const programsRows = programsResult.data.rows || [];
      const programsCount = programsRows.length > 0 ? parseFloat(programsRows[0][1]) || 0 : 0;
      setProgramsTotal(programsCount);

      const meetingsResult = await axios.get(
        `/analytics.json?dimension=dx:aeKyGvo5OIp&orgUnit=${districtId}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("District Meetings Response:", meetingsResult.data);
      const meetingsRows = meetingsResult.data.rows || [];
      const meetingsCount = meetingsRows.length > 0 ? parseFloat(meetingsRows[0][1]) || 0 : 0;
      setMeetingsTotal(meetingsCount);

      const departmentsResult = await axios.get(
        `/analytics.json?dimension=dx:wGeWq6JhDQA&orgUnit=${districtId}&filter=pe:${year}-01-01;${year}-12-31`
      );
      console.log("District Departments Response:", departmentsResult.data);
      const departmentsRows = departmentsResult.data.rows || [];
      const departmentsCount = departmentsRows.length > 0 ? parseFloat(departmentsRows[0][1]) || 0 : 0;
      setDepartmentsTotal(departmentsCount);

      const result = await axios.get(
        `/tracker/trackedEntities?orgUnit=${districtId}&program=Ch38jUWJpUR&startDate=${year}-01-01&endDate=${year}-12-31&paging=false`
      );
      const resp = await axios.get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}`);
      formatData(result.data.instances, resp.data.instances);
    } catch (err) {
      console.error("Error in pullTrackerInstance:", err);
    }
  }

  function getData(url) {
    const storedDistricts = localStorage.getItem("districts");
    if (storedDistricts) {
      console.log("Loading districts from localStorage...");
      setDistricts(JSON.parse(storedDistricts));
      return;
    }

    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        let temp = [];
        result.data.organisationUnits.forEach((district) => {
          const currentDistrict = { value: district.id, label: district.displayName };
          temp.push(currentDistrict);
        });

        localStorage.setItem("districts", JSON.stringify(temp));
        setDistricts(temp);
      })
      .catch((err) => console.log(err));
  }

  function formatData(meetings, reports) {
    const generalAssemblyMeetings = meetings.filter((item) =>
      item.attributes.some(
        (attr) => attr.displayName === "DPAT | Meeting Type" && attr.value === "GA"
      )
    );
    setInstances(generalAssemblyMeetings);
  }

  const meetingChartLabels = [
    "General Meetings",
    "Executive Meetings",
    "Statutory Meetings",
    "Sub Structure Meetings",
  ];

  const minuteInvitationLabels = ["Invitations", "Minutes"];

  return (
    <div className="page-wrapper">
      <SideBarWrapper />
      <div className="page-content">
        <Navbar />
        <div className="page-header">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">Admin Dashboard</li>
          </ol>
        </div>
        <div className="main-container">
          <div className="row gutters mb-3">
            {/* {districts && (
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <Select
                  onChange={(val) => {
                    setSelectedDistrict(val);
                    pullTrackerInstance(
                      `/tracker/trackedEntities?orgUnit=${val.value}&program=Ch38jUWJpUR&startDate=${selectedYear.value}-01-01&endDate=${selectedYear.value}-12-31&paging=false`,
                      val.value
                    );
                  }}
                  options={districts}
                  isSearchable
                  placeholder="Select District"
                />
              </div>
            )} */}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <Select
                onChange={(val) => setSelectedYear(val)}
                options={yearOptions}
                value={selectedYear}
                placeholder="Select Year"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"></div>
          </div>
          <div className="row gutters">
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
              <CardBox
                name="AAP Total"
                counter={isLoading ? "Loading..." : aapTotal}
                icon="icon-zap-off"
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
              <CardBox
                name="Projects"
                counter={isLoading ? "Loading..." : projectsTotal}
                icon="icon-globe"
              />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
              <CardBox
                name="Programs"
                counter={isLoading ? "Loading..." : programsTotal}
                icon="icon-pocket"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <CardBox
                name="Meetings"
                counter={isLoading ? "Loading..." : meetingsTotal}
                icon="icon-people"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <CardBox
                name="Sub Statutory"
                counter={isLoading ? "Loading..." : departmentsTotal}
                icon="icon-server"
              />
            </div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Yearly Meeting Report</div>
                </div>
                <div className="card-body pt-0">
                  {meetingReportLoading ? (
                    <div>Loading data...</div>
                  ) : meetingReportError ? (
                    <div style={{ color: "red" }}>{meetingReportError}</div>
                  ) : (
                    <Chart
                      type="bar"
                      width="100%"
                      height={400}
                      series={[
                        { ...meetingsData, data: meetingAnalyticsData.meetings },
                        { ...generalmeetingsData, data: meetingAnalyticsData.generalMeetings },
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
                          categories: meetingRegions.length > 0 ? meetingRegions : ["No regions available"],
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
            </div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Annual Action Plan Yearly Report</div>
                </div>
                <div className="card-body pt-0">
                  {actionPlanReportLoading ? (
                    <div>Loading data...</div>
                  ) : actionPlanReportError ? (
                    <div style={{ color: "red" }}>{actionPlanReportError}</div>
                  ) : (
                    <Chart
                      type="bar"
                      width="100%"
                      height={400}
                      series={[
                        { ...plans, data: actionPlanAnalyticsData.plans, name: "Plans" },
                        { ...completed, data: actionPlanAnalyticsData.completed, name: "Completed" },
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
                          categories: actionPlanRegions.length > 0 ? actionPlanRegions : ["No regions available"],
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
            </div>
          </div>
          <div className="row gutters">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
              <GeneralChart
                title="Proportion of Meeting Types"
                data={meetingChartData.length > 0 ? meetingChartData : [0, 0, 0, 0]}
                labels={meetingChartLabels}
                type="pie"
                width={450}
                height={450}
                isLoading={isLoading}
                error={meetingChartError}
              />
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
              <MintueNinvitaionChart
                title="Proportion of Invitations and Minutes"
                data={minuteInvitationData.length > 0 ? minuteInvitationData : [0, 0]}
                labels={minuteInvitationLabels}
                type="donut"
                width={450}
                height={450}
                isLoading={isLoading}
                error={minuteInvitationError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;