import Navbar from "../layout/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useReactToPrint } from 'react-to-print';
import SideBarWrapper from "../components/SideBarWrapper";
import { FilePdfOutlined } from "@ant-design/icons";
import Select from "react-select";
import Table_3 from "./APR_ReportTablesComponents/Table_3";
import Table_8 from "./APR_ReportTablesComponents/Table_8";
import Table_9 from "./APR_ReportTablesComponents/Table_9";
import Table2_7 from "../components/APR_ReportTablesComponents/Table_2.7";
import Apendix_2 from "../components/APR_ReportTablesComponents/Apendix2"
import Appendix1 from "./APR_ReportTablesComponents/Apendix1";
import { Button, Row, Col,Modal, message } from "antd";
import Table_13 from "./APR_ReportTablesComponents/Table_13";
import Table_14 from "./APR_ReportTablesComponents/Table_14";
import Table_15 from "./APR_ReportTablesComponents/Table_15";
import Table_16 from "./APR_ReportTablesComponents/Table_16";
import Table_17 from "./APR_ReportTablesComponents/Table_17";
import Table_18 from "./APR_ReportTablesComponents/Table_18";
import Table_19 from "./APR_ReportTablesComponents/Table_19";
import Table_20 from "./APR_ReportTablesComponents/Table_20";
import Table_21 from "./APR_ReportTablesComponents/Table_21";
import Table_22 from "./APR_ReportTablesComponents/Table_22";
import Table_4 from "./APR_ReportTablesComponents/Table_4";
import Table_5 from "./APR_ReportTablesComponents/Table_5";
import Table_6 from "./APR_ReportTablesComponents/Table_6";
import Table_1 from "./APR_ReportTablesComponents/Table_1";
import Table_2 from "./APR_ReportTablesComponents/Table_2";
import Table_7 from "./APR_ReportTablesComponents/Table_7";
import Table_10 from "./APR_ReportTablesComponents/Table_10";
import Table_11 from "./APR_ReportTablesComponents/Table_11";
import Table_12 from "./APR_ReportTablesComponents/Table_12";
import { filterTrackedEntitiesByCreatedAt } from "../utils/utils";
import ReportCover from "./APR_ReportTablesComponents/ReportCover";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";
import ExeAPR from "./APR_ReportTablesComponents/APRComment.js/ExecutiveSummary";
import Introduction from "./APR_ReportTablesComponents/Chapter3.js/Introduction";
import Key_Issues_Addressed from "./APR_ReportTablesComponents/Chapter3.js/Key_Issues_Addressed";
import Key_Issues_yet_to_be_Addressed from "./APR_ReportTablesComponents/Chapter3.js/Key_Issues_yet_to_be_Addressed";
import Recommendations from "./APR_ReportTablesComponents/Chapter3.js/Recommendations";
import Conclusion from "./APR_ReportTablesComponents/Chapter3.js/Conclusion";
import GeneralIntroduction from "./APR_ReportTablesComponents/Chapter1/GeneralIntroduction";



// List of Tables options
const tableOptions = [
  { value: "all_tables", label: "All Tables" },
  { value: "table_1", label: "Table 1 – Proportion of the AAP Implemented by Development Dimensions" },
   { value: "table_2", label: "Table 2 – Proportion of the DMTDP Implemented" },
  { value: "table_3", label: "Table 3 – Project Register as of the end of the year" },
  { value: "table_4", label: "Table 4 –  Total number of active projects"},
  { value: "table_5", label: "Table 5 –   Distribution of Physical projects among departments of the Assembly"},
  { value: "table_6", label: "Table 6 – Project Age Analysis" },
  { value: "table_7", label: "Table 7 –  Repair and maintenance of Existing Infrastructure" },
  { value: "table_8", label: "Table 8 – Programme Register as of the end of the Year, 2024" },
  { value: "table_9", label: "Table 9 – Update on Revenue Sources as of the end of the Year (2021 – 2024) " },
  { value: "table_10", label: "Table 10 – Update on Expenditure as of the Year (2021 – 2024)" },
  { value: "table_11", label: "Table 11 –  CAPEX Budget Performance Analysis, 2024" },
  { value: "table_12", label: "Table 12 – CAPEX Budget Allocation and Implementation of active projects" },

  { value: "table_13", label: "Table 13 – Cumulative CAPEX throw forward and MTBF Envelope, 2025-2027" },
  { value: "table_14", label: "Table 14 – AMOUNT OF CAPITAL ENVELOPE SPENT ON ACTIVE PROJECTS" },
  { value: "table_15", label: "Table 15 – ESTIMATED  COST AND  COST OVERRUNS OF  ACTIVE  PROJECTS" },
  { value: "table_16", label: "Table 16 – PERFORMANCE OF  CORE  INDICATORS OF THE END OF THE  YEAR" },
  { value: "table_18", label: "Table 18 – STAFF  STRENGTHS" },
  { value: "table_19", label: "Table 19 – CAPACITY  DEVELOPMENT" },
  { value: "table_20", label: "Table 20 – LOGISTICS  ANALYSIS" },
  { value: "table_21", label: "Table 21 – UPDATE ON EVALUATIONS CONDUCTED" },
  { value: "table_22", label: "Table 22 – UPDATE ON  PARTICIPATORY  MONITORING AND  EVALUATION  (PM&E) TOOLS USED" },
  { value: "apendix_2", label: "Apendix2  –Composit Annual Action for the Year" },
];

const periodOption = [
  { value: "Q1", label: "First Quater - Q1" },
  { value: "Q2", label: "Second Quater - Q2" },
  { value: "Q3", label: "Third Quater - Q3" },
  { value: "Q4", label: "Fourth Quater - Q4" },
  { value: "yearly", label: "Yearly" }
];
const Abbreviation = [
  { value: "1D1F", label: "1D1F - One District One Factory" },
  { value: "AAP", label: "AAP - Annual Action Plan" },
  { value: "AIDS", label: "AIDS - Acquired Immune Deficiency Syndrome" },
  { value: "AMSEC", label: "AMSEC - Agricultural Mechanisation Services" },
  { value: "APR", label: "APR - Annual Progress Report" },
  { value: "ART", label: "ART - Anti-Retroviral Treatment" },
  { value: "BECE", label: "BECE - Basic Education Certificate Examination" },
  { value: "CAPEX", label: "CAPEX - Capital Expenditure" },
  { value: "CLTS", label: "CLTS - Community Led Total Sanitation" },
  { value: "CHPS", label: "CHPS - Community-Based Health Planning and Services" },
  { value: "COVID", label: "COVID - Corona Virus Disease" },
  { value: "CSOs", label: "CSOs - Civil Society Organisations" },
  { value: "DACF", label: "DACF - District Assemblies’ Common Fund" },
  { value: "DACF-RFG", label: "DACF-RFG - District Assemblies’ Common Fund Responsiveness Factor Grant" },
  { value: "EXECO", label: "EXECO - Executive Committee" },
  { value: "GHS", label: "GHS - Ghana Cedis" },
  { value: "GoG", label: "GoG - Government of Ghana" },
  { value: "HIV", label: "HIV - Human Immunodeficiency Virus" },
  { value: "HoDs", label: "HoDs - Head of Departments" },
  { value: "IGF", label: "IGF - Internally Generated Fund" },
  { value: "ISSOP", label: "ISSOP - Integrated Social Services Operating Procedure" },
  { value: "JHS", label: "JHS - Junior High School" },
  { value: "LEAP", label: "LEAP - Livelihood Empowerment Against Poverty" },
  { value: "LLINs", label: "LLINs - Long-Lasting Insecticidal Nets" },
  { value: "MAC", label: "MAC - Municipal AIDS Committee" },
  { value: "MAG", label: "MAG - Modernising Agriculture in Ghana" },
  { value: "MCD", label: "MCD - Municipal Co-ordinating Director" },
  { value: "MCE", label: "MCE - Municipal Chief Executive" },
  { value: "M&E", label: "M&E - Monitoring and Evaluation" },
  { value: "MMTDP", label: "MMTDP - Municipal Medium-Term Development Plan" },
  { value: "MP’s CF", label: "MP’s CF - Member of Parliament’s Common Fund" },
  { value: "MPCU", label: "MPCU - Municipal Planning Coordinating Unit" },
  { value: "MSEs", label: "MSEs - Micro and Small Enterprises" },
  { value: "MTDP", label: "MTDP - Medium-Term Development Plan" },
  { value: "MUSEC", label: "MUSEC - Municipal Security Council" },
  { value: "NDPC", label: "NDPC - National Development Planning Commission" },
  { value: "NGOs", label: "NGOs - Non-Governmental Organizations" },
  { value: "NHIS", label: "NHIS - National Health Insurance Scheme" },
  { value: "NSMA", label: "NSMA - Nkwanta South Municipal Assembly" },
  { value: "ORCC", label: "ORCC - Oti Regional Coordinating Council" },
  { value: "PERD", label: "PERD - Planting for Export and Rural Development" },
  { value: "PM&E", label: "PM&E - Participatory Monitoring and Evaluation" },
  { value: "PMTCT", label: "PMTCT - Prevention of Mother to Child Transmission" },
  { value: "PWDs", label: "PWDs- Persons With Disabilities" },
  { value: "SHS", label: "SHS - Senior High School" },
  { value: "SOCO", label: "SOCO - Gulf of Guinea Northern Regions Social Cohesion Project" },
  { value: "SPSS", label: "SPSS - Scientific Package for Social Scientist" },
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
  const [selectedABB, setSelectedABB] = useState({ value: "Abbreviation", label: "Abbreviation" });
  const [selectedTocSection, setSelectedTocSection] = useState(null);
  const contentToPrint = useRef(null);
  const [progressLoad, setProgressLoad] = useState(false); // New state for loading

      const [assessmentStatus, setAssessmentStatus] = useState(null); // New state for assessment status
  const { user } = useAuth();
   const currentUserRole = user?.user?.userRoles?.find(
        (role) => role.name === "APR USER" || role.name === "APR RCC" || role.name === "NDPC USER"
    )?.name || "";
    const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
    const currentUsername = user?.user?.username || "";
    const currentFullName = user?.user?.fullName || "";
  // Set "All Tables" as the default selected table
  const [selectedTable, setSelectedTable] = useState({ value: "all_tables", label: "All Tables" });

  // Year options for dropdown
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });
 useEffect(() => {
        
        const fetchAssessmentStatus = async () => {
            try {
                const response = await instance.get(
                //  'assessments/dpat/EmVZbr0kApz/2021/APR'
                    `assessments/dpat/${selectedDistrict?.value}/${selectedYear?.value}/APR`
                );
                setAssessmentStatus(response.data);
            } catch (error) {
                console.error("Failed to fetch assessment status:", error);
                setAssessmentStatus(null); // Set to null if API call fails
            }
        };

        if (selectedDistrict?.value && selectedYear?.value) {
            fetchAssessmentStatus();
         
        }
    }, [selectedDistrict?.value?.id, selectedYear?.value]);

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

const assessmentStartDate = new Date().toISOString().split("T")[0].split("-").map(Number);

const fetchAssessmentStatus = async () => {
  if (!selectedDistrict?.value || !selectedYear?.value) {
    console.error("District or year not selected");
    return;
  }

  try {
    const assessmentStatusResponse = await instance.get(
      `assessments/dpat/${selectedDistrict.value}/${selectedYear.value}/APR`
    );
    const fetchedStatus = assessmentStatusResponse.data?.status || "Not Started";
    setAssessmentStatus(assessmentStatusResponse.data);
    console.log("Current assessment status:", fetchedStatus);
    return fetchedStatus;
  } catch (error) {
    console.error("Failed to fetch assessment status:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    // message.error(`Failed to fetch status: ${error.response?.data?.message || error.message}`);
    return null;
  }
};

 const handleStartAPR = async () => {
  setProgressLoad(true);

  // Step 1: Check current assessment status
  const currentStatus = await fetchAssessmentStatus();
  if (currentStatus && currentStatus !== "Not Started") {
    message.warning(`An assessment for ${selectedYear?.label} in ${selectedDistrict?.label} is already in progress (Status: ${currentStatus}).`);
    setProgressLoad(false);
    return;
  }

  const payload = {
    id: 0,
    username: user?.user?.username || "",
    fullName: user?.user?.fullName || "",
    userRole: normalizedUserRole || "",
    type: "APR",
    districtId: selectedDistrict?.value || "",
    year: selectedYear?.value || "",
    status: "Start",
    assessmentStartDate: new Date().toISOString().split("T")[0],
    assessmentEndDate: null,
    reviewStartDate: null,
    reviewEndDate: null,
    closedDate: null,
  };

  const aprData = {};

  console.log("apr payload:", payload);

  try {
    // Step 2: Post to assessments endpoint
    const assessmentResponse = await instance.post(`assessments`, payload);
    setAssessmentStatus(assessmentResponse.data);
    message.success({
      content: (
        <div>
          <p>Assessment started successfully (Status: 201)</p>
        </div>
      ),
      duration: 3,
    });

    // Step 3: Fetch updated assessment status
    const assessmentStatusResponse = await instance.get(
      `assessments/dpat/${selectedDistrict?.value}/${selectedYear?.value}/APR`
    );
    const fetchedStatus = assessmentStatusResponse.data?.status || "Start";
    setAssessmentStatus(assessmentStatusResponse.data);

    // Step 4: Post to comments endpoint
    const commentDate = new Date().toISOString().split("T")[0];
    const commentPayload = {
      id: 0,
      username: user?.user?.username || "",
      fullName: user?.user?.fullName || "",
      userRole: normalizedUserRole || "",
      type: "APR",
      districtId: selectedDistrict?.value || "",
      year: selectedYear?.value || "",
      tableCommented: "Progress_start",
      comments: `Progress Report started automatically with status: ${fetchedStatus}`,
      gaps: "",
      commentDate: commentDate,
      updateDate: commentDate,
      dddpDataDate: commentDate,
      dddpData: {
        indicator: "progress_report_start",
        tables: aprData,
      },
    };

    await instance.post(`comments`, commentPayload);

    message.success({
      content: (
        <div>
          <p>Comment added successfully</p>
        </div>
      ),
      duration: 3,
    });
  } catch (error) {
    console.error("Failed to process report or comment:", {
      // message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    // message.error(`Failed to process: ${error.response?.data?.message || error.message}`);
  } finally {
    setProgressLoad(false);
  }
};

     const handlePendingAPR = async () => {
        setProgressLoad(true);
         const assessmentEndDate = new Date().toISOString().split("T")[0];
        const assessmentStartDate = assessmentStatus?.assessmentStartDate || new Date().toISOString().split("T")[0]; // Use existing start date or fallback to today

        const payload = {
             id: assessmentStatus.id,
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: normalizedUserRole,
            // userRole: "DDDP_USER",
            type: "APR",
            districtId: selectedDistrict?.value,
            year: selectedYear?.value,
            status: "Pending",
           assessmentStartDate: assessmentStartDate,
            assessmentEndDate: assessmentEndDate,
            reviewStartDate: assessmentEndDate,
            reviewEndDate: null,
            closedDate: null,
        };

        const aprData = {
           
        };

        console.log("apr: ", aprData);

        try {
            // Step 1: Update assessment with PUT request
            const response = await instance.put(`assessments/${payload.id}`, payload);
            setAssessmentStatus(response.data);
            message.success({
                content: (
                    <div>
                        <p>Assessment completed successfully (Status: 200)</p>
                    </div>
                ),
                duration: 3,
            });

            // Step 2: Fetch assessment status from the provided endpoint
            const assessmentStatusResponse = await instance.get(
                `assessments/dpat/${selectedDistrict?.value}/${selectedYear?.value}/APR`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); // Update state with the fetched assessment data




        } catch (error) {
            console.error("Failed to Submit Report:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to Submit Report: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };


       const handleCompleteAPR = async () => {
        setProgressLoad(true);
         const reviewEndDate = new Date().toISOString().split("T")[0];
         const assessmentEndDate = new Date().toISOString().split("T")[0];
        const assessmentStartDate = assessmentStatus?.assessmentStartDate || new Date().toISOString().split("T")[0]; // Use existing start date or fallback to today

        const payload = {
             id: assessmentStatus.id,
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: normalizedUserRole,
            // userRole: "DDDP_USER",
            type: "APR",
            districtId: selectedDistrict?.value,
            year: selectedYear?.value,
            status: "Completed",
              assessmentStartDate: assessmentStartDate,
            assessmentEndDate: assessmentEndDate,
            reviewStartDate: assessmentStatus?.reviewStartDate || assessmentEndDate, // Use existing review start date or fallback to assessmentEndDate
            reviewEndDate: reviewEndDate,
            closedDate: null,
        };

        const aprData = {
           
        };

        console.log("apr: ", aprData);

        try {
            // Step 1: Update assessment with PUT request
            const response = await instance.put(`assessments/${payload.id}`, payload);
            setAssessmentStatus(response.data);
            message.success({
                content: (
                    <div>
                        <p>Assessment completed successfully (Status: 200)</p>
                    </div>
                ),
                duration: 3,
            });

            // Step 2: Fetch assessment status from the provided endpoint
            const assessmentStatusResponse = await instance.get(
                `assessments/dpat/${selectedDistrict?.value}/${selectedYear?.value}/APR`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); // Update state with the fetched assessment data




        } catch (error) {
            console.error("Failed to Submit Report:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to Submit Report: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };
  // Handler for Table selection
  const handleTableSelection = (selectedOption) => {
    setSelectedTable(selectedOption);
    // console.log("Selected Table:", selectedOption);
  };
 const showConfirm = () => {
    Modal.confirm({
      title: 'Start Report',
      content: `Do you want to start the Progress Report for this district?`,
      okText: 'Yes',
      cancelText: 'No',
      
      onOk() {
        handleStartAPR(); // Trigger the original endpoint call
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  const showPending = () => {
      Modal.confirm({
        title: 'SUBMIT APR TO RCC',
        content: `Do you want to submit progress report to RCC for this district?`,
        okText: 'Yes',
        cancelText: 'No',
        
        onOk() {
          handlePendingAPR(); // Trigger the original endpoint call
        },
        onCancel() {
          // Do nothing on cancel
        },
      });
    };
  
    const showCompleted = () => {
      Modal.confirm({
        title: 'SUBMIT APR TO NDPC',
        content: `Do you want to submit your final progress report to NDPC for this district?`,
        okText: 'Yes',
        cancelText: 'No',
        
        onOk() {
          handleCompleteAPR(); // Trigger the original endpoint call
        },
        onCancel() {
          // Do nothing on cancel
        },
      });
    };

     const hideTableDis = !assessmentStatus || assessmentStatus?.status === "Pending" || assessmentStatus?.status === "Completed" || assessmentStatus?.status === "Closed";


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
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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

            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
              <Select
                onChange={setSelectedABB}
                options={Abbreviation}
                value={selectedABB}
                placeholder="Select Report Period"
              />
            </div>
          </div>
          <div className="row gutters mb-3">

                 <Col span={10} className="gutter-row">
                  {(!assessmentStatus || ![null, "Start", "Pending", "Completed", "Closed"].includes(assessmentStatus?.status)) &&
                    normalizedUserRole !== "APR_RCC" &&
                    normalizedUserRole !== "NDPC_USER" && (
                      <Button
                        type="primary"
                        onClick={showConfirm} // Use the confirmation popup instead of directly calling handleStartAssessmentSubmit
                        style={{
                          backgroundColor: "#1890ff",
                          borderColor: "#1890ff",
                        }}
                        loading={progressLoad}
                      >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                          CLICK TO START PROGRESS REPORT FOR {selectedYear?.value}
                        </span>
                      </Button>
                    )}
                </Col>
            {selectedTable && selectedTable.value === "all_tables" && (
              <em ref={contentToPrint}>
              
                <div className="row gutters">
                 
                  {selectedDistrict && selectedYear &&
                    <ReportCover district={selectedDistrict} year={selectedYear?.value}/>}
                </div>

                 {(
                    <>
                     <h2 style={{ textAlign: "center" }}>EXECUTIVE SUMMARY</h2>
                    <ExeAPR
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                   </>
                      )}
                      

                      <h2 style={{ textAlign: "center" }}>CHAPTER ONE (1)</h2>    
                       {(
                    <>
                     <h2 style={{ textAlign: "center" }}>GENERAL INFORMATION</h2>
                    <GeneralIntroduction
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                   </>
                      )}
                   <Table_1
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}   hideTableDis={hideTableDis}/>
                <Table_2
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis}/> 

                 <h2 style={{ textAlign: "center" }}>CHAPTER TWO (2)</h2>           
                <Table_3 
              year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis}/>
                 <Table_4 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_5 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}  hideTableDis={hideTableDis}/>
                <Table_6 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_7 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_8 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_9 
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                 {/* <Table_10
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />                */}
                 <Table_11
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                  <Table_12
                year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                 <Table_13 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_14 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_15 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                   {(dataElements && categories && districtWideConstant) && <Table_16
                  year={selectedYear?.value}
                  district={selectedDistrict?.value}
                  categories={categories}
                  dataElements={dataElements}
                  districtWideConstant={districtWideConstant}
                  economicDataElements={economicDataElements}
                  socialDataElements={socialDataElements}
                  period={selectedPeriod?.value}
                  hideTableDis={hideTableDis}
                />}
                <Table_17 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_18 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_19 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Table_20 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}hideTableDis={hideTableDis} />
                <Table_21 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value}hideTableDis={hideTableDis} />
                <Table_22 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis}/>
                
               
                {/* <Appendix1 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} hideTableDis={hideTableDis} />
                <Apendix_2 year={selectedYear?.value} district={selectedDistrict?.value} period={selectedPeriod?.value} /> */}

                      <>
                <h2 style={{ textAlign: "center" }}>CHAPTER THREE (3)</h2>


                    <Introduction
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                     assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                   <Key_Issues_Addressed
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                   <Key_Issues_yet_to_be_Addressed
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                   <Recommendations
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                  <Conclusion
                    year={selectedYear?.value}
                   district={selectedDistrict?.value}
                     hideTableDis={hideTableDis}
                      assessmentStatus = {assessmentStatus?.status !== "Completed" }
                  />
                  </>
                    


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

             <Col span={10} className="gutter-row">
                  {assessmentStatus?.status === "Start" &&
                    normalizedUserRole !== "APR_RCC" &&
                    normalizedUserRole !== "NDPC_USER" && (
                      <Button
                        type="primary"
                        onClick={showPending} // Use the confirmation popup instead of directly calling handleStartAssessmentSubmit
                        style={{
                          backgroundColor: "#1890ff",
                          borderColor: "#1890ff",
                           marginTop: "10px",
                        }}
                        loading={progressLoad}
                      >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                           SUBMIT REPORT TO RCC {selectedYear?.value}
                        </span>
                      </Button>
                    )}
                </Col>

                 <Col span={10} className="gutter-row">
                  {assessmentStatus?.status === "Pending" &&
                    normalizedUserRole !== "APR_RCC" &&
                    normalizedUserRole !== "NDPC_USER" && (
                      <Button
                        type="primary"
                        onClick={showCompleted} // Use the confirmation popup instead of directly calling handleStartAssessmentSubmit
                        style={{
                          backgroundColor: "#048311ff",
                          borderColor: "#048311ff",
                           marginTop: "10px",
                        }}
                        loading={progressLoad}
                      >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                         SUBMIT REPORT TO NDPC {selectedYear?.value}
                        </span>
                      </Button>
                    )}
                </Col>

            
            {selectedTable && selectedTable.value === "table_1" && <Table_1 />}
            {selectedTable && selectedTable.value === "table_2" && <Table_2 />}
            {selectedTable && selectedTable.value === "table_3" && <Table_3 />}
            {selectedTable && selectedTable.value === "table_4" && <Table_4 />}
            {selectedTable && selectedTable.value === "table_5" && <Table_5 />}
            {selectedTable && selectedTable.value === "table_6" && <Table_6 />}
            {selectedTable && selectedTable.value === "table_7" && <Table_7 />}
            {selectedTable && selectedTable.value === "table_8" && <Table_8 />}
            {selectedTable && selectedTable.value === "table_9" && <Table_9 />}
            {selectedTable && selectedTable.value === "table_10" && <Table_10 />}
            {selectedTable && selectedTable.value === "table_11" && <Table_11 />}
            {selectedTable && selectedTable.value === "table_12" && <Table_12 />}

        
            {selectedTable && selectedTable.value === "table_13" && <Table_13 />}
            {selectedTable && selectedTable.value === "table_14" && <Table_14 />}
            {selectedTable && selectedTable.value === "table_15" && <Table_15 />}
            {selectedTable && selectedTable.value === "table_16" && <Table_16 />}
            {selectedTable && selectedTable.value === "table_17" && <Table_17 />}
            {selectedTable && selectedTable.value === "table_18" && <Table_18 />}
            {selectedTable && selectedTable.value === "table_19" && <Table_19 />}
            {selectedTable && selectedTable.value === "table_20" && <Table_20 />}
            {selectedTable && selectedTable.value === "table_21" && <Table_21 />}
            {selectedTable && selectedTable.value === "table_22" && <Table_22 />}


             {/* {selectedTable && selectedTable.value === "table_2.4" && <Table2_4 />} */}
            {/* {selectedTable && selectedTable.value === "table_2.5" && <Table2_5 />} */}
            {/* {selectedTable && selectedTable.value === "table_2.6" && <Table2_6 />} */}
            {selectedTable && selectedTable.value === "table_2.7" && <Table2_7 />}
            {/* {selectedTable && selectedTable.value === "table_2.8" && <Table2_8 />} */}
            {/* {selectedTable && selectedTable.value === "table_2.9" && <Table2_9 />}
            {selectedTable && selectedTable.value === "table_2.10" && <Table2_10 />} */}

            {selectedTable && !["all_tables",   "table_1", "table_2", "table_3", "table_4", "table_5", "table_6", "table_7", "table_8", "table_9", 
              "table_10","table_11","table_13","table_14","table_15","table_16","table_17","table_18","table_19","table_20","table_21","table_22"
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