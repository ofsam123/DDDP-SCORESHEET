import Navbar from "../layout/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SideBarWrapper from "../components/SideBarWrapper";
import Select from "react-select";
import Table1_1 from "../components/APR_ReportTablesComponents/Table_1.1"; 
import Table1_2 from "../components/APR_ReportTablesComponents/Table_1.2"; 
import Table2_1 from "../components/APR_ReportTablesComponents/Table_2.1";
import Table2_2 from "../components/APR_ReportTablesComponents/Table_2.2";
import Table2_3 from "../components/APR_ReportTablesComponents/Table_2.3";
import Table2_4 from "../components/APR_ReportTablesComponents/Table_2.4";
import Table2_5 from "../components/APR_ReportTablesComponents/Table_2.5";
import Table2_6 from "../components/APR_ReportTablesComponents/Table_2.6";
import Table2_7 from "../components/APR_ReportTablesComponents/Table_2.7";
import Table2_8 from "../components/APR_ReportTablesComponents/Table_2.8";
import Table2_9 from "../components/APR_ReportTablesComponents/Table_2.9";
import Table2_10 from "../components/APR_ReportTablesComponents/Table_2.10";

function AprReport() {
  // Component state
  const [instances, setInstances] = useState("");
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
  const [selectedTocSection, setSelectedTocSection] = useState(null);
  // Set "All Tables" as the default selected table
  const [selectedTable, setSelectedTable] = useState({ value: "all_tables", label: "All Tables" });

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
    { value: "all_tables", label: "All Tables" },
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

  // Table data (only for unimplemented tables)
  const tableData = {
    "table_2.3": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.4": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.5": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.6": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.7": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.8": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.9": [{ indicator: "Placeholder", details: "Details to be added" }],
    "table_2.10": [{ indicator: "Placeholder", details: "Details to be added" }],
  };

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
    } catch (err) {
      console.error("Error in pullTrackerInstance:", err);
    }
  }

  function getData() {
    const storedDistricts = localStorage.getItem("districts");
    if (storedDistricts) {
      // console.log("Loading districts from localStorage...");
      const parsedDistricts = JSON.parse(storedDistricts);
      setDistricts(parsedDistricts);
      if (parsedDistricts.length > 0 && !selectedDistrict) {
        // console.log("parse data: ", parsedDistricts)
        setSelectedDistrict(parsedDistricts[0]);
        pullTrackerInstance(parsedDistricts[0].value.id);
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
          // console.log("districts: ", temp);
          setSelectedDistrict(temp[0]);
          pullTrackerInstance(temp[0].value.id);
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
    if (correspondingTocValue) {
      setSelectedTocSection(tocOptions.find((option) => option.value === correspondingTocValue));
    } else {
      setSelectedTocSection(null); // Clear TOC for "All Tables"
    }
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
            <li className="breadcrumb-item active">Annual Progress Report (APR)</li>
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
                    // setSelectedDistrict(val);
                    setSelectedDistrict({ value: val.value.id, label: val.label });
                    pullTrackerInstance(val.value.id);
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
            {selectedTable && selectedTable.value === "all_tables" && (
              <>
                <Table1_1 />
                <Table1_2 year={selectedYear?.value} district={selectedDistrict?.value}/>
                <Table2_1 year={selectedYear?.value} district={selectedDistrict?.value} />
                <Table2_2 year={selectedYear?.value} district={selectedDistrict?.value}/>
                <Table2_3 year={selectedYear?.value} district={selectedDistrict?.value} />
                <Table2_4 year={selectedYear?.value} district={selectedDistrict?.value}/>
                <Table2_5 />
                <Table2_6 />
                <Table2_7 />
                <Table2_8 />
                <Table2_9 />
                <Table2_10 />
              </>
            )}
            {selectedTable && selectedTable.value === "table_1.1" && <Table1_1 />}
            {selectedTable && selectedTable.value === "table_1.2" && <Table1_2 />}
            {selectedTable && selectedTable.value === "table_2.1" && <Table2_1 />}
            {selectedTable && selectedTable.value === "table_2.2" && <Table2_2 />}
            {selectedTable && selectedTable.value === "table_2.3" && <Table2_3 />}
            {selectedTable && selectedTable.value === "table_2.4" && <Table2_4 />}
            {selectedTable && selectedTable.value === "table_2.5" && <Table2_5 />}
            {selectedTable && selectedTable.value === "table_2.6" && <Table2_6 />}
            {selectedTable && selectedTable.value === "table_2.7" && <Table2_7 />}
            {selectedTable && selectedTable.value === "table_2.8" && <Table2_8 />}
            {selectedTable && selectedTable.value === "table_2.9" && <Table2_9 />}
            {selectedTable && selectedTable.value === "table_2.10" && <Table2_10 />}
            {selectedTable && !["all_tables", "table_1.1", "table_1.2", "table_2.1", "table_2.2", "table_2.3", "table_2.4", "table_2.5", "table_2.6","table_2.7", "table_2.8", "table_2.9", "table_2.10"].includes(selectedTable.value) && (
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
                <p>Content for this section is not yet implemented. Select a table or provide additional data. APR</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AprReport;
