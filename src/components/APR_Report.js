import Navbar from "../layout/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useReactToPrint } from 'react-to-print';
import SideBarWrapper from "../components/SideBarWrapper";
import { FilePdfOutlined } from "@ant-design/icons";
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
import Apendix_2 from "../components/APR_ReportTablesComponents/Apendix2";
import Appendix1 from "./APR_ReportTablesComponents/Apendix1";
import { Button } from "antd";

// List of Tables options updated to match new table structure
const tableOptions = [
  { value: "all_tables", label: "All Tables" },
  { value: "table_1", label: "Table 1 – Proportion of the AAP Implemented by Development Dimensions" },
  { value: "table_2", label: "Table 2 – Proportion of the DMTDP Implemented" },
  { value: "table_3", label: "Table 3 – Project Register as of the End of the Year, 2024" },
  { value: "table_4", label: "Table 4 – Total Number of Active Projects" },
  { value: "table_5", label: "Table 5 – Distribution of Physical Projects Among Departments of the Assembly" },
  { value: "table_6", label: "Table 6 – Project Age Analysis" },
  { value: "table_7", label: "Table 7 – Repair and Maintenance of Existing Infrastructure" },
  { value: "table_8", label: "Table 8 – Programme Register as of the End of the Year, 2024" },
  { value: "table_9", label: "Table 9 – Update on Revenue Sources as of the End of the Year (2021 – 2024)" },
  { value: "table_10", label: "Table 10 – Update on Expenditure as of the Year (2021 – 2024)" },
  { value: "table_11", label: "Table 11 – Capex Budget Performance Analysis, 2024" },
  { value: "table_12", label: "Table 12 – Capex Budget Allocation and Implementation of Active Projects" },
  { value: "table_13", label: "Table 13 – Cumulative Capex Throw Forward and MTBF Envelope, 2025-2027" },
  { value: "table_14", label: "Table 14 – Amount of Capital Envelope Spent on Active Projects" },
  { value: "table_15", label: "Table 15 – Estimated Cost and Cost Overruns of Active Projects" },
  { value: "table_16", label: "Table 16 – Performance of Core Indicators of the End of the Year, 2024" },
  { value: "table_17", label: "Table 17 – Updates on Critical Development and Poverty Issues in the Year, 2024" },
  { value: "table_18", label: "Table 18 – Staff Strengths" },
  { value: "table_19", label: "Table 19 – Capacity Development" },
  { value: "table_20", label: "Table 20 – Logistics Analysis" },
  { value: "table_21", label: "Table 21 – Update on Evaluations Conducted" },
  { value: "table_22", label: "Table 22 – Update on Participatory Monitoring and Evaluation (PM&E) Tools Used" },
];

function AprReport() {
  const [dataElements, setDataElements] = useState(null);
  const [economicDataElements, setEconomicDataElements] = useState(null);
  const [socialDataElements, setSocialDataElements] = useState(null);
  const [categories, setCategories] = useState(null);
  const [districtWideConstant, setDistrictWideConstant] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ value: "2024", label: "2024" });
  const [selectedTocSection, setSelectedTocSection] = useState(null);
  const contentToPrint = useRef(null);

  // Set "All Tables" as the default selected table
  const [selectedTable, setSelectedTable] = useState({ value: "all_tables", label: "All Tables" });

  // Year options for dropdown
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });

  useEffect(() => {
    getData();
    pullConstantData();
  }, []);

  useEffect(() => {
    if (selectedDistrict && selectedYear) {
      getDistrictWideConstant(selectedDistrict.value, selectedYear.value);
    }
  }, [selectedDistrict, selectedYear]);

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: `${selectedDistrict?.label}_APR_Report_${selectedYear.value}`,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  function pullConstantData() {
    axios.get('/dataSets/saljkJMizBZ?fields=dataSetElements[dataElement[id,name]]&paging=false')
      .then(response => {
        setDataElements(response.data.dataSetElements);
      }).catch(err => {
        console.error("Error pulling Data Elements: ", err);
      });

    axios.get('/dataSets/Xj0f6QZwYeO?fields=dataSetElements[dataElement[id,name]]&paging=false')
      .then(response => {
        setEconomicDataElements(response.data.dataSetElements);
      }).catch(err => {
        console.error("Error pulling Data Elements: ", err);
      });

    axios.get('/dataSets/cfMIscR3rdL?fields=dataSetElements[dataElement[id,name]]&paging=false')
      .then(response => {
        setSocialDataElements(response.data.dataSetElements);
      }).catch(err => {
        console.error("Error pulling Data Elements: ", err);
      });

    axios.get('/categoryOptionCombos.json?fields=id,name&paging=false')
      .then(response => {
        setCategories(response.data.categoryOptionCombos);
      }).catch(err => {
        console.error("Error pulling Category Combination:", err);
      });
  }

  function getDistrictWideConstant(district, year) {
    axios
      .get(`/dataValueSets?dataSet=saljkJMizBZ&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        setDistrictWideConstant(result.data.dataValues);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getData() {
    const storedDistricts = localStorage.getItem("districts");
    if (storedDistricts) {
      const parsedDistricts = JSON.parse(storedDistricts);
      setDistricts(parsedDistricts);
      if (parsedDistricts.length > 0 && !selectedDistrict) {
        setSelectedDistrict(parsedDistricts[0]);
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
        }
      })
      .catch((err) => console.log(err));
  }

  // Handler for Table selection
  const handleTableSelection = (selectedOption) => {
    setSelectedTable(selectedOption);
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
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <Select
                onChange={(val) => setSelectedYear(val)}
                options={yearOptions}
                value={selectedYear}
                placeholder="Select Year"
              />
            </div>
            {districts && (
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <Select
                  onChange={(val) => {
                    setSelectedDistrict({ value: val.value.id, label: val.label });
                  }}
                  options={districts}
                  value={selectedDistrict}
                  isSearchable
                  placeholder="Select District"
                />
              </div>
            )}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
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
              <em ref={contentToPrint}>
                <Table1_1 /> {/* Table 1 */}
                <Table1_2 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 2 */}
                <Table2_1 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 3 */}
                <Table2_2 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 4 */}
                <Table2_3 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 5 */}
                <Table2_4 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 6 */}
                <Table2_5
                  year={selectedYear?.value}
                  district={selectedDistrict?.value}
                  categories={categories}
                  dataElements={dataElements}
                  districtWideConstant={districtWideConstant}
                  economicDataElements={economicDataElements}
                  socialDataElements={socialDataElements}
                /> {/* Table 7 */}
                <Table2_6 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 8 */}
                <Table2_7 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 9 */}
                <Table2_8 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 10 */}
                <Table2_9 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 11 */}
                <Table2_10 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 12 */}
                <Appendix1 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 13 */}
                <Apendix_2 year={selectedYear?.value} district={selectedDistrict?.value} /> {/* Table 14 */}
                {/* Placeholder for Tables 15-22 */}
                {["Table 15", "Table 16", "Table 17", "Table 18", "Table 19", "Table 20", "Table 21", "Table 22"].map((table, index) => (
                  <div key={index} className="col-12">
                    <div className="card">
                      <div className="card-header">{tableOptions[index + 14].label}</div>
                      <div className="card-body">
                        <p>Content for this table is not yet implemented. Please provide data to display.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </em>
            )}
            <div style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<FilePdfOutlined style={{ fontSize: "20px", color: "white", fontWeight: "bold" }} />}
                onClick={() => {
                  if (contentToPrint.current) {
                    handlePrint();
                  } else {
                    console.log("Content is not available for printing.");
                  }
                }}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  height: "35px",
                  padding: "0 15px",
                }}
              >
                <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>Download Report</span>
              </Button>
            </div>
            {selectedTable && selectedTable.value === "table_1" && <Table1_1 />}
            {selectedTable && selectedTable.value === "table_2" && <Table1_2 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_3" && <Table2_1 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_4" && <Table2_2 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_5" && <Table2_3 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_6" && <Table2_4 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_7" && (
              <Table2_5
                year={selectedYear?.value}
                district={selectedDistrict?.value}
                categories={categories}
                dataElements={dataElements}
                districtWideConstant={districtWideConstant}
                economicDataElements={economicDataElements}
                socialDataElements={socialDataElements}
              />
            )}
            {selectedTable && selectedTable.value === "table_8" && <Table2_6 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_9" && <Table2_7 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_10" && <Table2_8 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_11" && <Table2_9 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_12" && <Table2_10 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_13" && <Appendix1 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && selectedTable.value === "table_14" && <Apendix_2 year={selectedYear?.value} district={selectedDistrict?.value} />}
            {selectedTable && [
              "table_15", "table_16", "table_17", "table_18", "table_19", "table_20", "table_21", "table_22"
            ].includes(selectedTable.value) && (
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