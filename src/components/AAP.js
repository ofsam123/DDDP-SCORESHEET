import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SideBarWrapper from "../components/SideBarWrapper";
import CardBox from "../components/CardBox";
import GeneralChart from "../components/GeneralChart";
import MintueNinvitaionChart from "../components/minutesNinvitationLetterCart";
import Select from "react-select";
import { Table } from "antd";

const aapColumns = [
  { title: "#", dataIndex: "no", key: "no" },
  { title: "Activity", dataIndex: "activity", key: "activity" },
  { title: "Description", dataIndex: "description", key: "description" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Sector", dataIndex: "sector", key: "sector" },
  { title: "Development Dimension", dataIndex: "dd", key: "dd" },
];

const targetSectors = [
  "Health",
  "Education",
  "Water",
  "Sanitation",
  "Agriculture",
  "Communication",
  "Governance/Administration",
  "Security",
  "Tourism",
  "Transports",
];

const targetDD = [
  "Social Development (SD)",
  "Economic Development (ED)",
  "Governance, Corruption And Public Accountability(GCPA)",
  "Environment, infrastructure and human settlement",
  "Emergency Planning And Covid-19 Response",
  "Implementation, Coordination, Monitoring And Evaluation",
];

const targetFocus = [
  "Gender Focus Activity",
  "Nutrition-Oriented Intervention Activity",
  "Climate Focus Activity",
  "Road Safety Interventions",
];

function AAP() {
  // Data objects for charts
  const plans = {
    name: "Plans",
    color: "rgb(29, 106, 136)",
  };

  const completed = {
    name: "Completed",
    color: "rgb(255, 149, 0)",
  };

  const meetingsData = {
    name: "Meetings",
    color: "rgb(3, 61, 27)", // Dark Green
  };

  const generalmeetingsData = {
    name: "Decisions",
    color: "#f40b51", // Blue
  };

  // Component state
  const [instances, setInstances] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [aapData, setAapData] = useState([]);
  const [aapFocusData, setAapFocusData] = useState([]);
  const [meetingChartError, setMeetingChartError] = useState(null);
  const [aapStatusData, setAapStatusData] = useState([]);
  const [minuteInvitationError, setMinuteInvitationError] = useState(null);
  const [sectorCount, setSectorCount] = useState([]);
  const [aapActivityDD, setAapActivityDD] = useState([]);
  const [actionPlanReportLoading, setActionPlanReportLoading] = useState(true);
  const [actionPlanDDLoading, setActionPlanDDLoading] = useState(true);

  // Year options for dropdown
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      getData(selectedRegion.value, selectedYear.value);
    }
  }, [selectedYear, selectedRegion]);

  const getRegions = () => {
    const storedRegions = localStorage.getItem("regions");
    if (storedRegions) {
      console.log("Loading regions from localStorage...");
      const parsedRegions = JSON.parse(storedRegions);
      setRegions(parsedRegions);
      if (parsedRegions.length > 0 && !selectedRegion) {
        setSelectedRegion(parsedRegions[0]);
      }
      return;
    }

    axios
      .get("https://dddp.gov.gh/api/organisationUnits?level=2&paging=false")
      .then((result) => {
        console.log(result.data);
        let temp = [];
        result.data.organisationUnits.forEach((region) => {
          const currentRegion = { value: region.id, label: region.displayName };
          temp.push(currentRegion);
        });

        localStorage.setItem("regions", JSON.stringify(temp));
        setRegions(temp);
        if (temp.length > 0 && !selectedRegion) {
          setSelectedRegion(temp[0]);
        }
      })
      .catch((err) => console.log("Error fetching regions:", err));
  };

  const getAttributeValue = (key, val) => {
    const attr = val?.attributes.find((attr) => attr.displayName === key);
    return attr ? attr.value : "N/A";
  };

  function getAAPData(regionId, year) {
    axios
      .get(
        `/tracker/trackedEntities?orgUnit=${regionId}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31&paging=false&fields=trackedEntity,attributes[displayName,value]`
      )
      .then((resp) => {
        const plans = resp.data?.instances || [];
        console.log("AAP fetched: ", plans);

        if (plans.length > 0) {
          formatAAPData(plans);
          axios
            .get(
              `/tracker/events?program=ArLnAxhykoz&orgUnit=${regionId}&startDate=${year}-01-01&endDate=${year}-12-31&paging=false`
            )
            .then((result) => {
              // console.log("AAP report: ", result.data);
            })
            .catch((error) => console.log("Error fetching AAP events:", error));
        } else {
          setAapData([]);
          setSectorCount({});
          setAapActivityDD({});
          setAapFocusData([0, 0, 0, 0]);
          setAapStatusData([0, 0]);
          setActionPlanReportLoading(false);
          setActionPlanDDLoading(false);
          setIsLoading(false);
          setIsLoadingStatus(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching AAP:", error);
        setMeetingChartError("Failed to load AAP data");
        setIsLoading(false);
        setIsLoadingStatus(false);
      });
  }

  const formatAAPData = (data) => {
    const temp = [];
    data.forEach((aap, index) => {
      const aapDataSet = {
        no: index + 1,
        activity: getAttributeValue("Name", aap),
        description: getAttributeValue("Activity Description", aap),
        type: getAttributeValue("Activity Type", aap),
        sector: getAttributeValue("Sector", aap),
        dd: getAttributeValue("Development Dimension", aap),
        activityState: getAttributeValue("Activity State", aap),
        activityFocus: getAttributeValue("Activity Focus", aap),
        activitySource: getAttributeValue("Activity Source", aap),
      };
      temp.push(aapDataSet);
    });

    console.log("AAP formatted data: ", temp);

    // Count by Activity State
    const newCount = temp.filter((item) => item.activityState === "New").length;
    const ongoingCount = temp.filter((item) => item.activityState === "On-going").length;
    const totalStatus = newCount + ongoingCount || 1;
    const statusPercentages = [
      (newCount / totalStatus) * 100,
      (ongoingCount / totalStatus) * 100,
    ].map((val) => Number(val.toFixed(2)));

    // Count by Activity Source
    const internalCount = temp.filter((item) => item.activitySource === "Internal").length;
    const externalCount = temp.filter((item) => item.activitySource === "External/Imported").length;

    // Count by Activity Focus
    const focusCounts = targetFocus.reduce((acc, focus) => {
      acc[focus] = temp.filter((item) => item.activityFocus === focus).length;
      return acc;
    }, {});
    const totalFocus = Object.values(focusCounts).reduce((sum, count) => sum + count, 0) || 1;
    const focusPercentages = targetFocus.map((focus) =>
      Number(((focusCounts[focus] / totalFocus) * 100).toFixed(2))
    );

    // Sector Count
    const sectorCounter = targetSectors.reduce((acc, sector) => {
      acc[sector] = temp.filter((item) => item.sector === sector).length;
      return acc;
    }, {});

    // Development Dimension Count
    const ddCounts = targetDD.reduce((acc, dd) => {
      acc[dd] = temp.filter((item) => item.dd === dd).length;
      return acc;
    }, {});

    console.log("============================Data Calculation===========================");
    console.log("Sector: ", sectorCounter);
    console.log("Development Dimension: ", ddCounts);
    console.log("Focus Counts: ", focusCounts);
    console.log("Focus Percentages: ", focusPercentages);
    console.log("Status Percentages: ", statusPercentages);

    setAapData(temp);
    setSectorCount(sectorCounter);
    setAapActivityDD(ddCounts);
    setAapFocusData(focusPercentages);
    setAapStatusData(statusPercentages);
    setActionPlanReportLoading(false);
    setActionPlanDDLoading(false);
    setIsLoading(false);
    setIsLoadingStatus(false);
  };

  function getData(regionId, year) {
    setAapData([]);
    getAAPData(regionId, year);
  }

  function formatData(meetings, reports) {
    const generalAssemblyMeetings = meetings.filter((item) =>
      item.attributes.some((attr) => attr.displayName === "DPAT | Meeting Type" && attr.value === "GA")
    );
    setInstances(generalAssemblyMeetings);
  }

  const aapStatusLabels = ["New", "On-Going"];

  return (
    <div className="page-wrapper">
      <SideBarWrapper />
      <div className="page-content">
        <Navbar />
        <div className="page-header">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">Annual Action Plan Analytics</li>
          </ol>
        </div>
        <div className="main-container">
          <div className="row gutters mb-3">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <Select
                onChange={setSelectedYear}
                options={yearOptions}
                value={selectedYear}
                placeholder="Select Year"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <Select
                onChange={setSelectedRegion}
                options={regions}
                value={selectedRegion}
                isSearchable
                placeholder="Select Region"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    List of Activities Planned in <strong>{selectedYear?.value}</strong> in{" "}
                    <strong>{selectedRegion?.label}</strong>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {aapData.length > 0 ? (
                    <Table columns={aapColumns} dataSource={aapData} pagination={true} bordered />
                  ) : (
                    <div>No data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    Action Plans in {selectedRegion?.label} in {selectedYear?.value} by Sector
                  </div>
                </div>
                <div className="card-body pt-0">
                  {actionPlanReportLoading ? (
                    <div>Loading data...</div>
                  ) : (
                    <Chart
                      type="bar"
                      width="100%"
                      height={400}
                      series={[
                        {
                          name: "Activities",
                          data: targetSectors.map((sector) => sectorCount[sector] || 0),
                        },
                      ]}
                      options={{
                        chart: {
                          stacked: false,
                          toolbar: { show: false },
                        },
                        colors: ["#1E90FF"],
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            columnWidth: "40%",
                          },
                        },
                        dataLabels: {
                          enabled: true,
                          formatter: (val) => (val > 0 ? val : ""),
                        },
                        xaxis: {
                          categories: targetSectors,
                          labels: {
                            rotate: -45,
                            style: {
                              fontSize: "12px",
                            },
                          },
                        },
                        yaxis: {
                          title: {
                            text: "Activity Count",
                          },
                        },
                        legend: {
                          show: false,
                        },
                        tooltip: {
                          y: {
                            formatter: (val) => `${val} ${val === 1 ? "activity" : "activities"}`,
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
                  <div className="card-title">
                    Action Plans in {selectedRegion?.label} in {selectedYear?.value} by Development Dimension
                  </div>
                </div>
                <div className="card-body pt-0">
                  {actionPlanDDLoading ? (
                    <div>Loading data...</div>
                  ) : (
                    <Chart
                      type="bar"
                      width="100%"
                      height={400}
                      series={[
                        {
                          name: "Activities",
                          data: targetDD.map((dd) => aapActivityDD[dd] || 0),
                        },
                      ]}
                      options={{
                        chart: {
                          stacked: false,
                          toolbar: { show: false },
                        },
                        colors: ["#1E90FF"],
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            columnWidth: "40%",
                          },
                        },
                        dataLabels: {
                          enabled: true,
                          formatter: (val) => (val > 0 ? val : ""),
                        },
                        xaxis: {
                          categories: targetDD,
                          labels: {
                            rotate: -45,
                            style: {
                              fontSize: "12px",
                            },
                          },
                        },
                        yaxis: {
                          title: {
                            text: "Activity Count",
                          },
                        },
                        legend: {
                          show: false,
                        },
                        tooltip: {
                          y: {
                            formatter: (val) => `${val} ${val === 1 ? "activity" : "activities"}`,
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
                title="Proportion of Plans by Focus Area"
                data={aapFocusData.length > 0 ? aapFocusData : [0, 0, 0, 0]}
                labels={targetFocus}
                type="pie"
                width={450}
                height={450}
                isLoading={isLoading}
                error={meetingChartError}
              />
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
              <MintueNinvitaionChart
                title="Proportion of Plans by Activity Status"
                data={aapStatusData.length > 0 ? aapStatusData : [0, 0]}
                labels={aapStatusLabels}
                type="donut"
                width={450}
                height={450}
                isLoading={isLoadingStatus}
                error={minuteInvitationError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AAP;