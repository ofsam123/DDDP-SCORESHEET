import Chart from "react-apexcharts";
import Navbar from "../layout/Navbar";
// import CardBox from "../components/CardBox";
// import GenderReport from "../components/GenderReport";
// import AgeCategoryReport from "../components/AgeCategoryReport";
import { useEffect, useState } from "react";
import axios from "../api/axios";
// import useAuth from "../hooks/useAuth";
// import Helper from "../utils/utils";
import SideBarWrapper from "../components/SideBarWrapper";
import CardBox from "../components/CardBox";
import RegionalReport from "../components/RegionalReport";
import GeneralChart from "../components/GeneralChart";
import Select from "react-select";
// import Loading from "../components/Loading";


const males = {
	name: 'Completed',
	data: [44, 55, 41, 67, 22, 43, 21, 33, 49, 15, 26],
	color: 'rgb(34,93,228)'
};

const females = {
	name: 'Pending',
	data: [13, 23, 20, 8, 13, 27, 36, 22, 54, 28, 31],
	color: 'rgb(136,136,136)'
};

const projects = {
	name: 'Projects',
	data: [44, 55, 41, 67, 22, 43, 21, 33, 49, 15, 26],
	color: 'rgb(34,93,228)'
};

const program = {
	name: 'Program',
	data: [13, 23, 20, 8, 13, 27, 36, 22, 54, 28, 31],
	color: 'rgb(136,136,136)'
};

var gender = [];

var maleData = [];
var femaleData = [];

var ageCategories = [];

var disabilityTypes = [];

var recommandations = [];

var educationLevel = [];

var reportType = [];
var heardFrom = [];
var heardFromLables = ['District Assembly/Assembly Member', 'Social Welfare/C'];


function Home() {
	const [instances, setInstances] = useState('');
	const [report, setReport] = useState('');
	const [districts, setDistricts] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		getData('/organisationUnits?level=3&paging=false');

	}, []);



	function getData(url) {
		 // Check if districts exist in localStorage
		 const storedDistricts = localStorage.getItem("districts");

		 if (storedDistricts) {
			 console.log("Loading districts from localStorage...");
			 setDistricts(JSON.parse(storedDistricts));
			 return; // Exit the function to prevent unnecessary API calls
		 }


		axios
			.get(url)
			.then(result => {
				console.log(result.data);
				let temp = [];
				result.data.organisationUnits.forEach(district => {
					const currentDistrict = { value: district.id, label: district.displayName };
					temp.push(currentDistrict);
				});

				localStorage.setItem("districts", JSON.stringify(temp));

				setDistricts(temp);

			})
			.catch(err => console.log(err))
	}

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
							<li className="breadcrumb-item active">Admin Dashboard</li>
						</ol>

					</div>
					{/* Page header end */}
					{/* Main container start */}
					<div className="main-container">
						<div className="row gutters mb-3">
							{districts && <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
								<Select
									onChange={(val) => {
										const startDate = "2024-01-01";
										const endDate = "2024-12-31"; 
										pullTrackerInstance(
											`/tracker/trackedEntities?orgUnit=${val.value}&program=Ch38jUWJpUR&startDate=${startDate}&endDate=${endDate}`, val.value
										);
									}}
									options={districts}
									isSearchable
									placeholder='Select District'
								/>
							</div>}
							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">

							</div>
						</div>
						{/* Row end */}
						{/* Row start */}
						<div className="row gutters">
							<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
								<CardBox name="AAP Total" counter='256' icon="icon-insert_comment" />
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
								<CardBox name="Projects" counter='200' icon="icon-phone-incoming" />
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
								<CardBox name="Programs" counter='150' icon="icon-tablet" />
							</div>
							<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
								<CardBox name="Meetings" counter='500' icon="icon-accessibility" />
							</div>
							<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
								<CardBox name="Departments" counter='25' icon="icon-wc" />
							</div>
						</div>
						{/* Row end */}
						{/* Row start */}
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<RegionalReport title="Annual Action Plan Yearly Report" males={males} females={females} />
							</div>
						</div>
						{/* Row end */}
						{/* Row start */}
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<RegionalReport title="Project & Program Yearly Report" males={projects} females={program} />
							</div>
						</div>
						{/* Row end */}
						{/* Row start */}
						<div className="row gutters">
							<div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
								<GeneralChart
									title="AAP Proportion of the DMTDP Implemented"
									data={[23, 30, 20, 27]}
									labels={['Completed', 'Ongoing', 'Abandoned', 'Yet to Start']}
									type="pie"
									width={450}
									height={450}
								/>

							</div>
							<div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
								<GeneralChart
									title="Proportion of health facilities that are functional"
									data={[23, 30, 20, 27, 25]}
									labels={['CHPS Compound', 'Clinic', 'Health Center', 'Polyclinic', 'Hospital']}
									type="donut"
									width={450}
									height={450}
								/>

							</div>

						</div>
						{/* Row end */}
					</div>
					{/* Main container end */}
				</div>
				{/* Page content end */}

			</div>
			{/* Page wrapper end */}

		</>
	);
}
export default Home;