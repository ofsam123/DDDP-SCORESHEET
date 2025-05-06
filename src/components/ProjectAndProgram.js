import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SideBarWrapper from "../components/SideBarWrapper";
import GeneralChart from "../components/GeneralChart";
import Select from "react-select";
import { Table } from "antd";

const projectColumns = [
    { title: "#", dataIndex: "no", key: "no" },
    { title: "Project", dataIndex: "project", key: "project" },
    { title: "Contractor", dataIndex: "contractor", key: "contractor" },
    { title: "Contract Sum", dataIndex: "sum", key: "sum" },
    { title: "Expected Start Date", dataIndex: "sDate", key: "sDate" },
    { title: "Expected Completion Date", dataIndex: "cDate", key: "cDate" },
    { title: "Development Dimenssion", dataIndex: "dd", key: "dd" }
];

const programmeColumns = [
    { title: "#", dataIndex: "no", key: "no" },
    { title: "Programme", dataIndex: "programme", key: "programme" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Contract Sum", dataIndex: "sum", key: "sum" },
    { title: "Start Date", dataIndex: "sDate", key: "sDate" },
    { title: "Completion", dataIndex: "cDate", key: "cDate" },
    { title: "Development Dimenssion", dataIndex: "dd", key: "dd" }
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
    "Transports"
];

const targetDD = [
    "Social Development (SD)",
    "Economic Development (ED)",
    "Governance, Corruption And Public Accountability(GCPA)",
    "Environment, infrastructure and human settlement",
    "Emergency Planning And Covid-19 Response",
    "Emergency Planning And Covid-19 Response",
    "Implementation, Coordination, Monitoring And Evaluation"
];

const targetFocus = [
    "Projects with Contract",
    "Projects Without Contract"
];

function ProjectAndProgram() {
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

    // Home component state
    const [instances, setInstances] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
    const [selectedDistrict, setSelectedDistrict] = useState({ value: "EipJ1KBgsce", label: "AO District 1" });
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSatus, setIsLoadingSatus] = useState(true);

    const [data, setData] = useState([]);
    const [programsData, setProgramsData] = useState([]);
    const [aapFocusData, setAapFocusData] = useState([]);
    const [meetingChartError, setMeetingChartError] = useState(null);
    const [aapStatusData, setAapStatusData] = useState([]);
    const [minuteInvitationError, setMinuteInvitationError] = useState(null);

    const [sectorCount, setSectorCount] = useState([]);
    const [projectDD, setProjectDD] = useState([]);
    const [programmeDD, setProgrammeDD] = useState([]);
    const [actionPlanReportLoading, setActionPlanReportLoading] = useState(true);
    const [actionPlanDDLoading, setActionPlanDDLoading] = useState(true);

    // Year options for dropdown
    const yearOptions = Array.from({ length: 6 }, (_, i) => {
        const year = 2020 + i;
        return { value: year.toString(), label: year.toString() };
    });

    useEffect(() => {
        // Check if districts exist in localStorage
        const storedDistricts = localStorage.getItem("districts");

        if (storedDistricts) {
            setDistricts(JSON.parse(storedDistricts));
        }
    }, []);

    useEffect(() => {
        getData(selectedDistrict?.value, selectedYear?.value);
    }, [selectedYear, selectedDistrict]);


    const getAttributeValue = (key, val) => {
        const attr = val?.attributes.find(attr => attr.displayName === key);
        return attr ? attr.value : "N/A";
    };


    // RegionalReport data fetching


    function getPAndPData(districtId, year) {

        axios.get(
            `/tracker/trackedEntities?orgUnit=${districtId}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&paging=false&fields=trackedEntity,attributes[displayName,value]`
        ).then(resp => {
            const pp = resp.data?.instances;


            if (pp.length > 0) {
                formatPAndPData(pp)
                axios.get(
                    `/tracker/events?program=g3wMUKEMmH3&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31&paging=false`
                ).then(result => {
                    // console.log("AAP report: ", result.data)
                }).catch(error => console.log("error fetching AAP ", error));
            }

        }).catch(error => console.log("error fetching AAP ", error));

    }

    function formatGeneralData(meetings, meetingType) {
        return meetings.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "Project & Programme Type" && attr.value === meetingType
            )
        );
    }

    const formatPAndPData = (ppData) => {
        const prjects = formatGeneralData(ppData, "Project");
        const programmes = formatGeneralData(ppData, "Programme");

        const temp = [];
        const programTemp = [];

        prjects.forEach((project, index) => {

            const projectDataSet = {
                no: index + 1,
                project: getAttributeValue("Name", project),
                contractor: getAttributeValue("Contractor", project),
                sum: getAttributeValue("Contract Sum", project),
                sDate: getAttributeValue("Expected Start Date", project),
                cDate: getAttributeValue("Expected Completion Date", project),
                dd: getAttributeValue("Development Dimension", project)
            }

            temp.push(projectDataSet);
        });

        programmes.forEach((programme, index) => {

            const programmeDataSet = {
                no: index + 1,
                programme: getAttributeValue("Name", programme),
                description: getAttributeValue("Description", programme),
                sum: getAttributeValue("Contract Sum", programme),
                sDate: getAttributeValue("Expected Start Date", programme),
                cDate: getAttributeValue("Expected Completion Date", programme),
                dd: getAttributeValue("Development Dimension", programme)
            }

            programTemp.push(programmeDataSet);
        });

        console.log("programmes formated data: ", programTemp);

        //Count by Activity State
        const projectCounter = temp.length;
        const programmeCounter = programTemp.length;

        //Count by Activity Source
        const projectWithContractCounter = temp.filter(item => item.contractor !== "N/A").length;
        const projectWithoutContractCounter = temp.filter(item => item.contractor === "N/A").length;

        //Count by Activity Focus

        // const focusCount = targetFocus.reduce((acc, focus) => {
        //   acc[focus] = aapData.filter(item => item.activityFocus === focus).length;
        //   return acc;
        // }, {});


        // //Sector Count

        // const sectorCounter = targetSectors.reduce((acc, sector) => {
        //   acc[sector] = aapData.filter(item => item.sector === sector).length;
        //   return acc;
        // }, {});

        // //Development Dimention Count

        const ddProjectCounts = targetDD.reduce((acc, dd) => {
            acc[dd] = temp.filter(item => item.dd === dd).length;
            return acc;
        }, {});

        const ddProgrammeCounts = targetDD.reduce((acc, dd) => {
            acc[dd] = programTemp.filter(item => item.dd === dd).length;
            return acc;
        }, {});

        // console.log("============================Data Calculation===========================");
        // console.log("sector: ", sectorCounter);
        // console.log("D D: ", ddCounts);
        // console.log("Focus: ", focusCount);


        setData(temp);
        setProgramsData(programTemp);
        // setSectorCount(sectorCounter);
        setProjectDD(ddProjectCounts)
        setProgrammeDD(ddProgrammeCounts)
        setAapFocusData([projectWithContractCounter, projectWithoutContractCounter]);
        setAapStatusData([projectCounter, programmeCounter])

        setActionPlanReportLoading(false);
        setActionPlanDDLoading(false);
        setIsLoading(false);
        setIsLoadingSatus(false)


    }



    function getData(districtId, year) {
        setData(null);
        setProgramsData(null);
        getPAndPData(districtId, year)
    }

    function formatData(meetings, reports) {
        const generalAssemblyMeetings = meetings.filter((item) =>
            item.attributes.some(
                (attr) => attr.displayName === "DPAT | Meeting Type" && attr.value === "GA"
            )
        );
        setInstances(generalAssemblyMeetings);
    }

    const aapStatusLabels = ["Projects", "Programmes"];

    return (
        <div className="page-wrapper">
            <SideBarWrapper />
            <div className="page-content">
                <Navbar />
                <div className="page-header">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Projects and Programmes Analytics</li>
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
                                onChange={setSelectedDistrict}
                                options={districts}
                                value={selectedDistrict}
                                isSearchable
                                placeholder="Select District"
                            />
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    </div>

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                        </div>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        List of Projects in <strong>{selectedYear?.value}</strong> in <strong>{selectedDistrict?.label}</strong>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    {data && <Table columns={projectColumns} dataSource={data} pagination={true} bordered />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        List of  Programmes in <strong>{selectedYear?.value}</strong> in <strong>{selectedDistrict?.label}</strong>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    {programsData && <Table columns={programmeColumns} dataSource={programsData} pagination={true} bordered />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        Projects and Programmes in {selectedDistrict?.label} in {selectedYear?.value} by Development Dimension
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
                                                    name: "Projects",
                                                    data: targetDD.map(dd => projectDD[dd] || 0),
                                                },
                                                {
                                                    name: "Programmes",
                                                    data: targetDD.map(dd => programmeDD[dd] || 0),
                                                },
                                            ]}
                                            options={{
                                                chart: {
                                                    stacked: false,
                                                    toolbar: { show: false },
                                                },
                                                colors: ["#1E90FF", "#FF8C00"], // blue and orange
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
                                title="Proportion of Plans by Focus Area"
                                data={aapFocusData.length > 0 ? aapFocusData : [0, 0]}
                                labels={targetFocus}
                                type="pie"
                                width={450}
                                height={450}
                                isLoading={isLoading}
                                error={meetingChartError}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                            <GeneralChart
                                title="Proportion of Plans by Activity Status"
                                data={aapStatusData.length > 0 ? aapStatusData : [0, 0]}
                                labels={aapStatusLabels}
                                type="donut"
                                width={450}
                                height={450}
                                isLoading={isLoadingSatus}
                                error={minuteInvitationError}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectAndProgram;