import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
// import CardBox from "../components/CardBox";
// import GenderReport from "../components/GenderReport";
// import AgeCategoryReport from "../components/AgeCategoryReport";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Select from "react-select";
// import useAuth from "../hooks/useAuth";
// import Helper from "../utils/utils";
import SideBarWrapper from "../components/SideBarWrapper";
import DPATScoreSheet from "../components/DPATScoreSheet";
import DPATAssessmentSheet from "../components/DPATAssessmentSheet";
import { Button } from "antd";

const years = [
    { label: 2015, value: 2015 },
    { label: 2016, value: 2016 },
    { label: 2017, value: 2017 },
    { label: 2018, value: 2018 },
    { label: 2019, value: 2019 },
    { label: 2020, value: 2020 },
    { label: 2021, value: 2021 },
    { label: 2022, value: 2022 },
    { label: 2023, value: 2023 },
    { label: 2024, value: 2024 },
    { label: 2025, value: 2025 },
];

function DPATAssessment() {
    const [districts, setDistricts] = useState(null);
    const [gaMeeting, setGaMeeting] = useState(null);
    const [meetingDecision, setMeetingDecision] = useState([]);
    const [districtDepartments, setDistrictDepartments] = useState([]);
    const [districtMembers, setDistrictMembers] = useState([]);
    const [districtGeneral, setDistrictGeneral] = useState([]);
    const [audit, setAudit] = useState([]);
    const [schools, setSchools] = useState([]);
    const [foodVendors, setFoodVendors] = useState([]);
    const [transportors, setTransportors] = useState([]);
    const [inspectorateUnit, setInspectorateUnit] = useState([]);
    const [igf, setIGF] = useState([]);
    const [publications, setPublications] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [inspectorates, setInspectorates] = useState([]);
    const [permiRequest, setPermiRequest] = useState([]);
    const [streetNaming, setStreetNaming] = useState([]);
    const [annualActionPlan, setAnnualActionPlan] = useState([]);
    const [subStructures, setSubStructures] = useState([]);
    const [subStructuresActivity, setSubStructuresActivity] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null)

    useEffect(() => {
        // Check if districts exist in localStorage
        const storedDistricts = localStorage.getItem("districts");

        if (storedDistricts) {
            setDistricts(JSON.parse(storedDistricts));

        }
    }, []);

    useEffect(() => {
        // console.log("Reload data Sow");
    }, [selectedYear, selectedDistrict]);

    function pullTrackerInstance(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=Ch38jUWJpUR&filter=Ub0V9Z06aBc:GE:${startDate}:LE:${endDate}&pageSize=500`)
            .then(result => {
                axios
                    .get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}&pageSize=500`)
                    .then(resp => {
                        // const meetingsData = result.data.instances
                        setGaMeeting({ meetings: result.data.instances, reports: resp.data.instances });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    function pullDecisionTrackerInstance(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=n8WIhwDrAO7&`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=n8WIhwDrAO7&orgUnit=${districtId}`)
                        .then(resp => {
                            // console.log("Sow decisions", result.data.instances)
                            setMeetingDecision({ decisions: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("decisions error ", err))
    }

    function pullSubStructureEstablishment(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=vkJZ5R2mSJ3`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=vkJZ5R2mSJ3&orgUnit=${districtId}`)
                        .then(resp => {
                            setSubStructures({ sub: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getSubStructuresActivity(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=p1vYbSWkgyD&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {
                    console.log("activities: ", result.data.instances);
                    axios
                        .get(`/tracker/events?program=p1vYbSWkgyD&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setSubStructuresActivity({ activities: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getDistrictAssemblyDepartment(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=mAEretIhuqM&filter=Ub0V9Z06aBc:GE:${startDate}:LE:${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=mAEretIhuqM&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setDistrictDepartments({ dep: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getMembersByDistrict(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=AJDfCnHCQ2j`)
            .then(result => {
                if (result.data.instances.length > 0) {
                    // console.log("members: ",result.data.instances)

                    axios
                        .get(`/tracker/events?program=AJDfCnHCQ2j&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setDistrictMembers({ members: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getServiceProviderList(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=nGFVo65uUE4`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=nGFVo65uUE4&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setServiceProviders({ providers: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getInspectorateList(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=p1ccS2ROn0Q`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=p1ccS2ROn0Q&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setInspectorates({ inspectorates: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getPermitRequest(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=w2au8V5taU8&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=w2au8V5taU8&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setPermiRequest({ permits: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getStreetNaming(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=joUkaNeiZ0O&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=joUkaNeiZ0O&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setStreetNaming({ streets: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getAnnualActionPlan(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=ArLnAxhykoz&startDate=${startDate}&endDate=${endDate}&pageSize=500`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}&pageSize=1000`)
                        .then(resp => {
                            setAnnualActionPlan({ aap: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getDistrictGeneral(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=RwWtjFaorvN`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=RwWtjFaorvN&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setDistrictGeneral({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }


    function getAudits(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=Z3qMezPtpEb&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=Z3qMezPtpEb&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setAudit({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getSchoolRegistered(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=g27TeeehRQC`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=g27TeeehRQC&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setSchools({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }



    function getFoodVendors(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=abiQOocP8YA`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=abiQOocP8YA&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setFoodVendors({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getTransportors(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=R5MX47LvztN`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=R5MX47LvztN&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setTransportors({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getInspectorateUnits(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=pYvmkB4s6Nq`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=pYvmkB4s6Nq&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setInspectorateUnit({ data: result.data.instances, reports: resp.data.instances })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getIGFDetails(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=dYNmYGtArrK&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                setIGF({ data: result.data.instances, reports: [] })
            })
            .catch(err => console.log(err))
    }

    function getDocumentHub(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=SERtHvYVHRT&startDate=${startDate}&endDate=${endDate}`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=SERtHvYVHRT&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                        .then(resp => {
                            setDocuments({ data: result.data.instances, reports: resp.data.instances });
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    function getPublications(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=X5kGqVpbGoN`)
            .then(result => {

                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=X5kGqVpbGoN&orgUnit=${districtId}`)
                        .then(resp => {
                            setPublications({ data: result.data.instances, reports: resp.data.instances });
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("decisions error ", err))
    }


    return (
        <>

            {/* Page wrapper start */}
            <div className="page-wrapper">

                {/* Sidebar wrapper start */}
                <SideBarWrapper />
                {/* Sidebar wrapper end */}

                {/* Page content start  */}
                <div className="page-content">
                    {/* Header start */}
                    <Navbar />
                    {/* Header end */}
                    {/* Page header start */}
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item active">DPAT Assessment Sheet Report </li>
                        </ol>

                    </div>
                    {/* Page header end */}
                    {/* Main container start */}
                    <div className="main-container">
                        <div className="row gutters mb-3">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <Select
                                    onChange={setSelectedYear}
                                    options={years}
                                    isSearchable
                                    placeholder='Select Year'
                                />
                            </div>
                            {districts && <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Select
                                    onChange={(val) => {
                                        // setSelectedYear(null)
                                        setSelectedDistrict({ value: val.value.id, label: val.label });
                                        setSelectedRegion(val.value.region);

                                        const startDate = `${selectedYear.value}-01-01`;
                                        const endDate = `${selectedYear.value}-12-31`;

                                        pullTrackerInstance(startDate, endDate, val.value.id);

                                        pullDecisionTrackerInstance(startDate, endDate, val.value.id);

                                        pullSubStructureEstablishment(startDate, endDate, val.value.id);

                                        getDistrictAssemblyDepartment(startDate, endDate, val.value.id);

                                        getMembersByDistrict(startDate, endDate, val.value.id);
                                        getSubStructuresActivity(startDate, endDate, val.value.id);
                                        getServiceProviderList(startDate, endDate, val.value.id);
                                        getInspectorateList(startDate, endDate, val.value.id);
                                        getPermitRequest(startDate, endDate, val.value.id);
                                        getStreetNaming(startDate, endDate, val.value.id);
                                        getAnnualActionPlan(startDate, endDate, val.value.id);
                                        getDistrictGeneral(startDate, endDate, val.value.id);
                                        getFoodVendors(startDate, endDate, val.value.id);
                                        getSchoolRegistered(startDate, endDate, val.value.id);
                                        getAudits(startDate, endDate, val.value.id);
                                        getTransportors(startDate, endDate, val.value.id);
                                        getInspectorateUnits(startDate, endDate, val.value.id);
                                        getIGFDetails(startDate, endDate, val.value.id);
                                        getDocumentHub(startDate, endDate, val.value.id);
                                        getPublications(startDate, endDate, val.value.id);
                                    }}
                                    options={districts}
                                    isSearchable
                                    placeholder='Select District'
                                />
                            </div>}

                            
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                            <Button
                                type="primary"
                                onClick={() => {
                                 window.location.reload();  
                                }}
                                style={{
                                    backgroundColor: "#1890ff",
                                    borderColor: "#1890ff",
                                
                                }}
                            >
                                <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                                    Refresh
                                </span>
                            </Button>
                        </div>

                        </div>
                       
                        {gaMeeting && selectedYear && selectedDistrict && (
                            <DPATAssessmentSheet
                                key={`${selectedDistrict.value}-${selectedYear.value}`} // forces re-render on change
                                props={{
                                    meetings: gaMeeting,
                                    decisions: meetingDecision,
                                    subStructures: subStructures,
                                    departments: districtDepartments,
                                    year: selectedYear?.value,
                                    district: selectedDistrict,
                                    region: selectedRegion,
                                    members: districtMembers,
                                    subActivity: subStructuresActivity,
                                    serviceProviders: serviceProviders,
                                    inspectorates: inspectorates,
                                    permitRequest: permiRequest,
                                    streets: streetNaming,
                                    plans: annualActionPlan,
                                    districtGeneral: districtGeneral,
                                    foodVendors: foodVendors,
                                    schools: schools,
                                    audits: audit,
                                    transportors: transportors,
                                    inspectorateUnits: inspectorateUnit,
                                    ifg: igf,
                                    documents: documents,
                                    publications: publications,
                                }}
                            />
                        )}


                    </div>
                    {/* Main container end */}
                </div>
                {/* Page content end */}

            </div>
            {/* Page wrapper end */}

        </>
    );
}
export default DPATAssessment;