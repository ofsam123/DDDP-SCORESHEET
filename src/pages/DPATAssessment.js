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
    const [serviceProviders, setServiceProviders] = useState([]);
    const [inspectorates, setInspectorates] = useState([]);
    const [subStructures, setSubStructures] = useState([]);
    const [subStructuresActivity, setSubStructuresActivity] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        // Check if districts exist in localStorage
        const storedDistricts = localStorage.getItem("districts");

        if (storedDistricts) {
            setDistricts(JSON.parse(storedDistricts));

        }
    }, []);

    useEffect(() => {
        
    }, [selectedYear, selectedDistrict]);

    function pullTrackerInstance(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=Ch38jUWJpUR&filter=Ub0V9Z06aBc:GE:${startDate}:LE:${endDate}`)
            .then(result => {
                axios
                    .get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        // const meetingsData = result.data.instances
                        setGaMeeting({meetings : result.data.instances, reports: resp.data.instances});
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    function pullDecisionTrackerInstance(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=n8WIhwDrAO7&filter=Ub0V9Z06aBc:GE:${startDate}:LE:${endDate}`)
            .then(result => {
                if(result.data.instances.length > 0){

                    axios
                    .get(`/tracker/events?program=n8WIhwDrAO7&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setMeetingDecision({decisions: result.data.instances, reports:resp.data.instances})
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("decisions error ",err))
    }

    function pullSubStructureEstablishment(startDate, endDate, districtId) {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=vkJZ5R2mSJ3`)
            .then(result => {
                if(result.data.instances.length > 0){

                    axios
                    .get(`/tracker/events?program=vkJZ5R2mSJ3&orgUnit=${districtId}`)
                    .then(resp => {
                        setSubStructures({sub:result.data.instances, reports: resp.data.instances})
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
                if(result.data.instances.length > 0){
                    console.log("activities: ",result.data.instances);
                    axios
                    .get(`/tracker/events?program=p1vYbSWkgyD&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setSubStructuresActivity({activities:result.data.instances, reports: resp.data.instances})
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
                if(result.data.instances.length > 0){

                    axios
                    .get(`/tracker/events?program=mAEretIhuqM&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setDistrictDepartments({dep: result.data.instances, reports: resp.data.instances})
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
                if(result.data.instances.length > 0){
                    // console.log("members: ",result.data.instances)

                    axios
                    .get(`/tracker/events?program=AJDfCnHCQ2j&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setDistrictMembers({members: result.data.instances, reports: resp.data.instances})
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
                if(result.data.instances.length > 0){
                    // console.log("members: ",result.data.instances)

                    axios
                    .get(`/tracker/events?program=nGFVo65uUE4&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setServiceProviders({providers: result.data.instances, reports: resp.data.instances})
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
                if(result.data.instances.length > 0){
                    console.log("inspectorates: ",result.data.instances)

                    axios
                    .get(`/tracker/events?program=p1ccS2ROn0Q&orgUnit=${districtId}&startDate=${startDate}&endDate=${endDate}`)
                    .then(resp => {
                        setInspectorates({inspectorates: result.data.instances, reports: resp.data.instances})
                    })
                    .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
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
                            {districts && <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                <Select
                                    onChange={(val) => {
                                        setSelectedDistrict(val);

                                        const startDate = `${selectedYear.value}-01-01` ;
                                        const endDate = `${selectedYear.value}-12-31`;

                                        pullTrackerInstance(startDate, endDate, val.value);

                                        pullDecisionTrackerInstance(startDate, endDate, val.value);

                                        pullSubStructureEstablishment(startDate, endDate, val.value);

                                        getDistrictAssemblyDepartment(startDate, endDate, val.value);

                                        getMembersByDistrict(startDate, endDate, val.value);
                                        
                                        getSubStructuresActivity(startDate, endDate, val.value);
                                        getServiceProviderList(startDate, endDate, val.value);

                                        getInspectorateList(startDate, endDate, val.value);
                                    }}
                                    options={districts}
                                    isSearchable
                                    placeholder='Select District'
                                />
                            </div>}

                        </div>

                        {gaMeeting && <DPATAssessmentSheet key={selectedDistrict}
                                        props={{
                                             meetings: gaMeeting, 
                                             decisions: meetingDecision, 
                                             subStructures: subStructures,
                                             departments: districtDepartments,
                                             year: selectedYear?.value,
                                             district: selectedDistrict,
                                             members: districtMembers,
                                             subActivity: subStructuresActivity,
                                             serviceProviders: serviceProviders,
                                             inspectorates : inspectorates
                                             }}
                                        />}

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