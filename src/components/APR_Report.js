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

function AprReport() {
  // Home component state
  const [instances, setInstances] = useState("");
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
  const [selectedTocSection, setSelectedTocSection] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // Year options for dropdown
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });

  // Table of Contents options
  const tocOptions = [
    { value: "executive_summary", label: "Executive Summary" },
    { value: "chapter_1", label: "CHAPTER ONE: Introduction" },
    { value: "1.1", label: "1.1 Summary of Achievement of the DMTDP" },
    { value: "1.2", label: "1.2 Purpose of the M&E for 2022" },
    { value: "1.3", label: "1.3 Processes Involved and Difficulties Encountered" },
    { value: "1.3.1", label: "1.3.1 Processes Involved in Conducting M&E" },
    { value: "1.3.2", label: "1.3.2 Difficulties/Challenges Encountered" },
    { value: "chapter_2", label: "CHAPTER TWO: M&E Activities Report" },
    { value: "2.1", label: "2.1 Programme / Project Status for the Year" },
    { value: "2.2", label: "2.2 Update on Funding Sources and Disbursement" },
    { value: "2.2.1", label: "2.2.1 Update on Revenue Sources" },
    { value: "2.2.2", label: "2.2.2 Revenue Analysis" },
    { value: "2.2.3", label: "2.2.3 Update on Disbursements" },
    { value: "2.3", label: "2.3 Update on Indicators and Targets" },
    { value: "2.3.1", label: "2.3.1 Update on Core and Municipal Specific Indicators" },
    { value: "2.4", label: "2.4 Update on Critical Development and Poverty Issues" },
    { value: "2.4.1", label: "2.4.1 National Health Insurance Scheme" },
    { value: "2.4.2", label: "2.4.2 Ghana School Feeding Programme" },
    { value: "2.4.3", label: "2.4.3 Livelihood Empowerment against Poverty (LEAP)" },
    { value: "2.4.4", label: "2.4.4 One District One Factory" },
    { value: "2.4.5", label: "2.4.5 Planting for Food and Jobs" },
    { value: "2.4.6", label: "2.4.6 Incentive for Business Development" },
    { value: "2.4.7", label: "2.4.7 Nation Builders Corps" },
    { value: "2.4.8", label: "2.4.8 Free Senior High School" },
    { value: "2.4.9", label: "2.4.9 Inter Service and Sectoral Collaboration" },
    { value: "2.4.10", label: "2.4.10 Illegal Mining Activities" },
    { value: "2.4.11", label: "2.4.11 Resettlements and Livelihoods" },
    { value: "2.5", label: "2.5 Evaluations Conducted, Findings and Recommendations" },
    { value: "2.6", label: "2.6 Participatory Monitoring & Evaluation Undertaken" },
    { value: "chapter_3", label: "CHAPTER THREE: The Way Forward" },
    { value: "3.1", label: "3.1 Key Issues Addressed and Those Yet to be Addressed" },
    { value: "3.1.1", label: "3.1.1 Issues Addressed" },
    { value: "3.1.2", label: "3.1.2 Issues Yet to be Addressed" },
    { value: "3.2", label: "3.2 Conclusion" },
    { value: "3.3", label: "3.3 Recommendations" },
    { value: "appendix_1", label: "APPENDIX ONE: List of Participants of M&E" },
    { value: "appendix_2", label: "APPENDIX TWO: Composite Annual Action for 2022" },
  ];

  // List of Tables options
  const tableOptions = [
    { value: "table_1.1", label: "Table 1.1 – Proportion of the AAP and the MTDP Implemented" },
    { value: "table_1.2", label: "Table 1.2 – Details on Annual Action Plan Implemented under the Development Dimensions" },
    { value: "table_2.1", label: "Table 2.1 – Project Register" },
    { value: "table_2.2", label: "Table 2.2 – Programmes (Non-Physical Projects) Register" },
    { value: "table_2.3", label: "Table 2.3 – Revenue Updates" },
    { value: "table_2.4", label: "Table 2.4 – Update of Disbursement" },
    { value: "table_2.5", label: "Table 2.5 – Core Indicators and Municipal Specific Indicators" },
    { value: "table_2.6", label: "Table 2.6 – Key Critical Poverty Issues, Allocations, Actual Receipt and the Number of Beneficiaries" },
    { value: "table_2.7", label: "Table 2.7 – Details of beneficiary schools and corresponding enrolment figures" },
    { value: "table_2.8", label: "Table 2.8 – Details of all activities implemented by the BAC for the year 2022" },
    { value: "table_2.9", label: "Table 2.9 – Update on Evaluations Conducted" },
    { value: "table_2.10", label: "Table 2.10 – Update on PM&E Conducted" },
  ];

  // Table 1.1 data (placeholder values)
  const tableData = {
    "table_1.1": [
      {
        indicator: "Proportion of annual action plans implemented",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
      {
        indicator: "A. Percentage completed",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
      {
        indicator: "B. Percentage of on-going interventions",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
      {
        indicator: "C. Percentage of interventions abandoned",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
      {
        indicator: "D. Percentage of interventions yet to start",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
      {
        indicator: "Proportion of the overall medium-term development plan implemented",
        baseline2021: "",
        target2022: "",
        actual2022: "",
        target2023: "",
      },
    ],
    "table_1.2": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.1": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.2": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.3": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.4": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.5": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.6": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.7": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.8": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.9": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.10": [{ indicator: "Placeholder", details: "Details to be added" }],
  };

  // Placeholder data for pictorial evidence (replace with actual image URLs and captions)
  const pictorialEvidence = [
    {
      url: "https://via.placeholder.com/300x200?text=Project+1",
      caption: "Construction of Community Center - 2022",
    },
    {
      url: "https://via.placeholder.com/300x200?text=Project+2",
      caption: "Road Improvement Project - Phase 1",
    },
    {
      url: "https://via.placeholder.com/300x200?text=Project+3",
      caption: "School Renovation - Completed 2022",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  async function pullTrackerInstance(districtId) {
    try {
      const year = selectedYear.value;
      const result = await axios.get(
        `/tracker/trackedEntities?orgUnit=${districtId}&program=Ch38jUWJpUR&startDate=${year}-01-01&endDate=${year}-12-31&paging=false`
      );
      const resp = await axios.get(`/tracker/events?program=Ch38jUWJpUR&orgUnit=${districtId}`);
      formatData(result.data.instances, resp.data.instances);
      // Optionally fetch pictorial evidence
      // const imagesResponse = await axios.get(`/api/report/pictorial-evidence?orgUnit=${districtId}&year=${year}`);
      // setPictorialEvidence(imagesResponse.data);
    } catch (err) {
      console.error("Error in pullTrackerInstance:", err);
    }
  }

  function getData() {
    const storedDistricts = localStorage.getItem("districts");
    if (storedDistricts) {
      console.log("Loading districts from localStorage...");
      const parsedDistricts = JSON.parse(storedDistricts);
      setDistricts(parsedDistricts);
      if (parsedDistricts.length > 0 && !selectedDistrict) {
        setSelectedDistrict(parsedDistricts[0]);
        pullTrackerInstance(parsedDistricts[0].value);
      }
      return;
    }

    axios
      .get("https://dddp.gov.gh/api/organisationUnits?level=3&paging=false")
      .then((result) => {
        let temp = [];
        result.data.organisationUnits.forEach((district) => {
          const currentDistrict = { value: district.id, label: district.displayName };
          temp.push(currentDistrict);
        });

        localStorage.setItem("districts", JSON.stringify(temp));
        setDistricts(temp);
        if (temp.length > 0 && !selectedDistrict) {
          setSelectedDistrict(temp[0]);
          pullTrackerInstance(temp[0].value);
        }
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

  // Handler for TOC selection
  const handleTocSelection = (selectedOption) => {
    setSelectedTocSection(selectedOption);
    setSelectedTable(null);
    console.log("Selected TOC section:", selectedOption);
  };

  // Handler for Table selection
  const handleTableSelection = (selectedOption) => {
    setSelectedTable(selectedOption);
    const tableToTocMap = {
      "table_1.1": "1.1",
      "table_1.2": "1.2",
      "table_2.1": "2.1",
      "table_2.2": "2.1",
      "table_2.3": "2.2.1",
      "table_2.4": "2.2.3",
      "table_2.5": "2.3.1",
      "table_2.6": "2.4",
      "table_2.7": "2.4.2",
      "table_2.8": "2.4.6",
      "table_2.9": "2.5",
      "table_2.10": "2.6",
    };
    const correspondingTocValue = tableToTocMap[selectedOption.value];
    // if (corresponding neocValue) {
    //   setSelectedTocSection(tocOptions.find((option) => option.value === correspondingTocValue));
    // }
    console.log("Selected Table:", selectedOption);
  };

  return (
    <div className="page-wrapper">
      <SideBarWrapper />
      <div className="page-content">
        <Navbar />
        <div className="page-header">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active">APR Report</li>
          </ol>
        </div>
        <div className="main-container">
          <div className="row gutters mb-3">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <Select
                onChange={(val) => setSelectedYear(val)}
                options={yearOptions}
                value={selectedYear}
                placeholder="Select Year"
              />
            </div>
            {districts && (
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <Select
                  onChange={(val) => {
                    setSelectedDistrict(val);
                    pullTrackerInstance(val.value);
                  }}
                  options={districts}
                  value={selectedDistrict}
                  isSearchable
                  placeholder="Select District"
                />
              </div>
            )}
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <Select
                onChange={handleTocSelection}
                options={tocOptions}
                value={selectedTocSection}
                isSearchable
                placeholder="Select Table of Contents Section"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <Select
                onChange={handleTableSelection}
                options={tableOptions}
                value={selectedTable}
                isSearchable
                placeholder="Select Table"
              />
            </div>
          </div>
          <div className="row gutters">
            {selectedTable && selectedTable.value === "table_1.1" && (
              <div className="col-12">
                <h3>{selectedTable.label}</h3>
                <div className="card">
                  <div className="card-header">{selectedTable.label}</div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Indicators</th>
                          <th>Baseline 2021</th>
                          <th>Target 2022</th>
                          <th>Actual 2022</th>
                          <th>Target 2023</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData["table_1.1"].map((row, index) => (
                          <tr key={index}>
                            <td>{row.indicator}</td>
                            <td>{row.baseline2021 || "N/A"}</td>
                            <td>{row.target2022 || "N/A"}</td>
                            <td>{row.actual2022 || "N/A"}</td>
                            <td>{row.target2023 || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2"><small>Source: MPCU-TNMA</small></p>
                    <hr />
                    <h5>Pictorial Evidence of Projects under Implementation</h5>
                    {pictorialEvidence.length > 0 ? (
                      <div className="row">
                        {pictorialEvidence.map((image, index) => (
                          <div className="col-md-4 col-sm-6 mb-3" key={index}>
                            <div className="card">
                              <img
                                src={image.url}
                                className="card-img-top"
                                alt={image.caption}
                                style={{ height: "200px", objectFit: "cover" }}
                              />
                              <div className="card-body">
                                <p className="card-text">{image.caption}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No pictorial evidence available.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedTable && selectedTable.value !== "table_1.1" && (
              <div className="col-12">
                <h3>{selectedTable.label}</h3>
                <div className="card">
                  <div className="card-header">{selectedTable.label}</div>
                  <div className="card-body">
                    <p>Content for this table is not yet implemented. Please provide data to display.</p>
                  </div>
                </div>
              </div>
            )}
            {!selectedTable && selectedTocSection && (
              <div className="col-12">
                <h3>{selectedTocSection.label}</h3>
                <p>Content for this section is not yet implemented. Select a table or provide additional data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AprReport;