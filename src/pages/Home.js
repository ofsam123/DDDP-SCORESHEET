import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SideBarWrapper from "../components/SideBarWrapper";
import CardBox from "../components/CardBox";
import RegionalReport from "../components/RegionalReport";
import MeetingRegionalReport from "../components/MeetingsReport";
import GeneralChart from "../components/GeneralChart";
import MintueNinvitaionChart from "../components/minutesNinvitationLetterCart";
import Select from "react-select";
import { EyeOutlined, ProjectOutlined, AppstoreOutlined, TeamOutlined, ApartmentOutlined } from "@ant-design/icons";

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
  name: "General Meetings",
  color: "#f40b51", // Blue
};

const projects = {
  name: "Projects",
  data: [44, 55, 41, 67, 22, 43, 21, 33, 49, 15, 26],
  color: "rgb(34,93,228)",
};

const program = {
  name: "Program",
  data: [13, 23, 20, 8, 13, 27, 36, 22, 54, 28, 31],
  color: "rgb(136,136,136)",
};

function Home() {
  const [instances, setInstances] = useState("");
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
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

  useEffect(() => {
    getData("/organisationUnits?level=3&paging=false");
    fetchTotals();
    fetchMeetingChartData();
    fetchMinuteInvitationData();
  }, []);

  async function fetchMeetingChartData() {
    try {
      const response = await axios.get(
        "/analytics.json?dimension=dx:aeKyGvo5OIp;BEUJdCeTGIE;M86dDnKObvx;cz086QtLaoW;wGeWq6JhDQA&dimension=ou:LEVEL-2;sQ7uY7OfGh9&filter=pe:2024-01-01;2024-12-30"
      );
      console.log("Meeting Chart Analytics Response:", response.data);
      const rows = response.data.rows || [];

      const counts = {
        aeKyGvo5OIp: 0, // Meetings (total)
        BEUJdCeTGIE: 0, // General Meetings
        M86dDnKObvx: 0, // Executive Meetings
        cz086QtLaoW: 0, // Statutory Meetings
        wGeWq6JhDQA: 0, // Sub Structure Meetings
      };

      rows.forEach(([dataElement, orgUnit, value]) => {
        if (counts.hasOwnProperty(dataElement)) {
          counts[dataElement] += parseFloat(value) || 0;
        } else {
          console.warn(`Unknown data element: ${dataElement}`);
        }
      });

      const totalMeetings = counts.aeKyGvo5OIp || 1; // Avoid division by zero
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
      const response = await axios.get(
        "/analytics.json?dimension=dx:yhzMdqZp0Qh;RsgxfezgTyr&dimension=ou:LEVEL-2;sQ7uY7OfGh9&filter=pe:2024-01-01;2024-12-30"
      );
      console.log("Minute Invitation Chart Analytics Response:", response.data);
      const rows = response.data.rows || [];

      const counts = {
        yhzMdqZp0Qh: 0, // Invitations
        RsgxfezgTyr: 0, // Minutes
      };

      rows.forEach(([dataElement, orgUnit, value]) => {
        if (counts.hasOwnProperty(dataElement)) {
          counts[dataElement] += parseFloat(value) || 0;
        } else {
          console.warn(`Unknown data element: ${dataElement}`);
        }
      });

      const total = counts.yhzMdqZp0Qh + counts.RsgxfezgTyr || 1; // Avoid division by zero
      const percentages = [
        (counts.yhzMdqZp0Qh / total) * 100, // Invitations
        (counts.RsgxfezgTyr / total) * 100, // Minutes
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
      const aapResp = await axios.get(
        `/analytics.json?dimension=dx:L2oTOp0EA1A&orgUnit=${orgUnit}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("AAP Analytics Response:", aapResp.data);
      const aapRows = aapResp.data.rows || [];
      const aapCount = aapRows.length > 0 ? parseFloat(aapRows[0][1]) || 0 : 0;
      setAapTotal(aapCount);

      const projectsResp = await axios.get(
        `/analytics.json?dimension=dx:cHp5d6g8Z1K&orgUnit=${orgUnit}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("Projects Analytics Response:", projectsResp.data);
      const projectsRows = projectsResp.data.rows || [];
      const projectsCount = projectsRows.length > 0 ? parseFloat(projectsRows[0][1]) || 0 : 0;
      setProjectsTotal(projectsCount);

      const programsResp = await axios.get(
        `/analytics.json?dimension=dx:WR0IO6mvdmw&orgUnit=${orgUnit}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("Programs Analytics Response:", programsResp.data);
      const programsRows = programsResp.data.rows || [];
      const programsCount = programsRows.length > 0 ? parseFloat(programsRows[0][1]) || 0 : 0;
      setProgramsTotal(programsCount);

      const meetingsResp = await axios.get(
        `/analytics.json?dimension=dx:aeKyGvo5OIp&orgUnit=${orgUnit}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("Meetings Analytics Response:", meetingsResp.data);
      const meetingsRows = meetingsResp.data.rows || [];
      const meetingsCount = meetingsRows.length > 0 ? parseFloat(meetingsRows[0][1]) || 0 : 0;
      setMeetingsTotal(meetingsCount);

      const departmentsResp = await axios.get(
        `/analytics.json?dimension=dx:wGeWq6JhDQA&orgUnit=${orgUnit}&filter=pe:2024-01-01;2024-12-31`
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

  async function pullTrackerInstance(url, districtId) {
    try {
      const aapResult = await axios.get(
        `/analytics.json?dimension=dx:L2oTOp0EA1A&orgUnit=${districtId}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("District AAP Response:", aapResult.data);
      const aapRows = aapResult.data.rows || [];
      const aapCount = aapRows.length > 0 ? parseFloat(aapRows[0][1]) || 0 : 0;
      setAapTotal(aapCount);

      const projectsResult = await axios.get(
        `/analytics.json?dimension=dx:cHp5d6g8Z1K&orgUnit=${districtId}&filter=pe:2024-01-01;2024-12-31`
      );
      // console.log("District Projects Response:", projectsResult.data);
      const projectsRows = projectsResult.data.rows || [];
      const projectsCount = projectsRows.length > 0 ? parseFloat(projectsRows[0][1]) || 0 : 0;
      setProjectsTotal(projectsCount);

      const programsResult = await axios.get(
        `/analytics.json?dimension=dx:WR0IO6mvdmw&orgUnit=${districtId}&filter=pe:2024-01-01;2024-12-31`
      );
      // console.log("District Programs Response:", programsResult.data);
      const programsRows = programsResult.data.rows || [];
      const programsCount = programsRows.length > 0 ? parseFloat(programsRows[0][1]) || 0 : 0;
      setProgramsTotal(programsCount);

      const meetingsResult = await axios.get(
        `/analytics.json?dimension=dx:aeKyGvo5OIp&orgUnit=${districtId}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("District Meetings Response:", meetingsResult.data);
      const meetingsRows = meetingsResult.data.rows || [];
      const meetingsCount = meetingsRows.length > 0 ? parseFloat(meetingsRows[0][1]) || 0 : 0;
      setMeetingsTotal(meetingsCount);

      const departmentsResult = await axios.get(
        `/analytics.json?dimension=dx:wGeWq6JhDQA&orgUnit=${districtId}&filter=pe:2024-01-01;2024-12-31`
      );
      console.log("District Departments Response:", departmentsResult.data);
      const departmentsRows = departmentsResult.data.rows || [];
      const departmentsCount = departmentsRows.length > 0 ? parseFloat(departmentsRows[0][1]) || 0 : 0;
      setDepartmentsTotal(departmentsCount);

      const result = await axios.get(url);
      const resp = await axios.get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}`);
      formatData(result.data.instances, resp.data.instances);
    } catch (err) {
      console.error("Error in pullTrackerInstance:", err);
    }
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
    <>
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
              {districts && (
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  <Select
                    onChange={(val) => {
                      setSelectedDistrict(val);
                      pullTrackerInstance(
                        `/tracker/trackedEntities?orgUnit=${val.value}&program=Ch38jUWJpUR&startDate=2024-01-01&endDate=2024-12-31&paging=false`,
                        val.value
                      );
                    }}
                    options={districts}
                    isSearchable
                    placeholder="Select District"
                  />
                </div>
              )}
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"></div>
            </div>
            <div className="row gutters">
			<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
                <CardBox
                  name="AAP Total"
                  counter={isLoading ? "Loading..." : aapTotal}
                  icon="icon-insert_comment"
                />
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
                <CardBox
                  name="Projects"
                  counter={isLoading ? "Loading..." : projectsTotal}
                  icon="icon-phone-incoming"
                />
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
                <CardBox
                  name="Programs"
                  counter={isLoading ? "Loading..." : programsTotal}
                  icon="icon-tablet"
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <CardBox
                  name="Meetings"
                  counter={isLoading ? "Loading..." : meetingsTotal}
                  icon="icon-accessibility"
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <CardBox
                  name="Departments"
                  counter={isLoading ? "Loading..." : departmentsTotal}
                  icon="icon-wc"
                />
              </div>
            </div>

			<div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <MeetingRegionalReport
                  title="Yearly Meeting Report"
                  meetingsData={meetingsData}
                  generalmeetingsData={generalmeetingsData}
                />
              </div>
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <RegionalReport
                  title="Annual Action Plan Yearly Report"
                  plans={plans}
                  completed={completed}
                />
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
    </>
  );
}

export default Home;