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

function DPATSheet() {
    const [districts, setDistricts] = useState(null);
    const [gaMeeting, setGaMeeting] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    useEffect(() => {
        // Check if districts exist in localStorage
        const storedDistricts = localStorage.getItem("districts");

        if (storedDistricts) {
            setDistricts(JSON.parse(storedDistricts));

        }
    }, [])

    function pullTrackerInstance(url, districtId) {
        axios
            .get(url)
            .then(result => {
                axios
                    .get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}`)
                    .then(resp => {

                        formatData(result.data.instances, resp.data.instances)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    function formatData(meetings, reports) {
        const generalAssemblyMeetings = meetings.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Type" && attr.value === "GA"
            )
        );

        console.log("GA Meeting: ", generalAssemblyMeetings)
        setGaMeeting(generalAssemblyMeetings);
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
                            <li className="breadcrumb-item active">DPAT Score Sheet Report </li>
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
                                
                                        pullTrackerInstance(
                                            `/tracker/trackedEntities?orgUnit=${val.value}&program=Ch38jUWJpUR`, val.value
                                        );
                                    }}
                                    options={districts}
                                    isSearchable
                                    placeholder='Select District'
                                />
                            </div>}

                        </div>

                        {gaMeeting && <DPATScoreSheet props={{ GA: gaMeeting, year: selectedYear?.value }} />}

                    </div>
                    {/* Main container end */}
                </div>
                {/* Page content end */}

            </div>
            {/* Page wrapper end */}

        </>
    );
}
export default DPATSheet;