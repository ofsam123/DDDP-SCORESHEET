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
import Apendix_2 from "../components/APR_ReportTablesComponents/Apendix2"
import Appendix1 from "./APR_ReportTablesComponents/Apendix1";
import { Button } from "antd";



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
  { value: "apendix_2", label: "Apendix2  –Composit Annual Action for the Year" },
];

const periodOption = [
  { value: "Q1", label: "First Quater - Q1" },
  { value: "Q2", label: "Second Quater - Q2" },
  { value: "Q3", label: "Third Quater - Q3" },
  { value: "Q4", label: "Fourth Quater - Q4" },
  { value: "yearly", label: "Yearly" }
];

function AprReport() {

  const [dataElements, setDataElements] = useState(null);
  const [economicDataElements, setEconomicDataElements] = useState(null);
  const [socialDataElements, setSocialDataElements] = useState(null);
  const [categories, setCategories] = useState(null);
  const [districtWideConstant, setDistrictWideConstant] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ value: "2025", label: "2025" });
  const [selectedPeriod, setSelectedPeriod] = useState({ value: "yearly", label: "Yearly" });
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
      getDistrictWideConstant(selectedDistrict.value, selectedYear.value)
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
        // console.log("district wide constant: ", result.data.dataValues);
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
    // console.log("Selected Table:", selectedOption);
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
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
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
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
              <Select
                onChange={setSelectedPeriod}
                options={periodOption}
                value={selectedPeriod}
                placeholder="Select Report Period"
              />
            </div>
          </div>
          <div className="row gutters">
            {selectedTable && selectedTable.value === "all_tables" && (
              <em ref={contentToPrint}>
                <div className="row gutters px-2">
                       {selectedDistrict && selectedYear && <h3 className="text-center" 
                       style={{ background: "#07d9c8ff", color: "#fff", textAlign: "center", padding: "10px", height: 'auto', width: '100%' }}>
                          {selectedYear?.value} ANNUAL PROGRESS REPORT OF {selectedDistrict?.label} FROM {selectedDistrict?.value?.region}
                        </h3>}
                </div>
                <Table1_1 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table1_2 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} />
                <Table2_1 
              year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table2_2 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table2_3 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} />
                <Table2_4 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>

                {(dataElements && categories && districtWideConstant) && <Table2_5
                  year={selectedYear?.value}
                  district={selectedDistrict?.value}
                  categories={categories}
                  dataElements={dataElements}
                  districtWideConstant={districtWideConstant}
                  economicDataElements={economicDataElements}
                  socialDataElements={socialDataElements}
                  period={selectedPeriod?.value}
                />}

                <Table2_6 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} />
                <Table2_7 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table2_8 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table2_9 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Table2_10 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}/>
                <Appendix1 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} />
                <Apendix_2 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} />

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
            {selectedTable && !["all_tables", "table_1.1", "table_1.2", "table_2.1", "table_2.2", "table_2.3", "table_2.4", "table_2.5", "table_2.6", "table_2.7", "table_2.8", "table_2.9", "table_2.10"].includes(selectedTable.value) && (
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
