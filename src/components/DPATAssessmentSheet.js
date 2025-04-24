import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import GAMeeting from "./GAMeeting";
import AAPBudgetAproval from "./AAPBudgetAproval";
import SubStructureMeeting from "./SubStructureMeeting";
import ExecutiveCommitteeMember from "./ExecutiveCommitteeMember";
import SubStructureCommiteeMeeting from "./SubStructureCommitteMeeting";
import ManagementMeeting from "./ManagementMeeting";
import PRCCMeeting from "./PRCCMeeting";
import EntityTenderCommitteeMeeting from "./EntityTenderCommiteeMeeting";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// Table Data & Columns
const generalAssemblyColumns = [
    { title: "Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Interval (Days)", dataIndex: "interval", key: "interval" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Signatory of Invitation Letter", dataIndex: "signatoryInvitationLetter", key: "signatoryInvitationLetter" },
    { title: "Signatories to minutes of meeting", dataIndex: "signatoriesMinutes", key: "signatoriesMinutes" },

];

const ECAMeetingColumns = [
    { title: "Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "General Assembly Meeting Date", dataIndex: "gaMeetingDate", key: "gaMeetingDate" },
    { title: "EC/A Meeting Date", dataIndex: "ecaMeetingDate", key: "ecaMeetingDate" },
    { title: "Availability of Duly Signed Minutes of Meeting", dataIndex: "signatoriesMinutesStatus", key: "signatoriesMinutesStatus" },
];

const PRCCMeetingColumns = [
    { title: "PRCC Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Availability of Minutes of Meeting", dataIndex: "signatoriesMinutesStatus", key: "signatoriesMinutesStatus" }
];

const PRCCRecommendationColumns = [
    { title: "PRCC Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "No. of complaints received", dataIndex: "complaintsNo", key: "complaintsNo" },
    { title: "No. of complaints processed and recommendations made", dataIndex: "complaintsProcessedNo", key: "complaintsProcessedNo" },
    { title: "No. of recommendations acted on", dataIndex: "recommendationActedNo", key: "recommendationActedNo" }
];

const ETCMeetingColumns = [
    { title: "Quarterly ETC Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Availability of Minutes of Meeting", dataIndex: "signatoriesMinutesStatus", key: "signatoriesMinutesStatus" }
];

const managementMeetingColumns = [
    { title: "Quarter", dataIndex: "meeting", key: "meeting" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "departmeNumber of Departments in MMDA", dataIndex: "departments", key: "departments" },
    { title: "HODs in Attendance", dataIndex: "hodAttendance", key: "hodAttendance" },
    { title: "Number in Attendance", dataIndex: "attendance", key: "attendance" }
];

const generalAssemblyDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    { title: "Decisions/Resolutions", dataIndex: "decision", key: "decision" }
];


const budgetColumns = [
    { title: "Meeting (Statutory Organ)", dataIndex: "meeting", key: "meeting" },
    { title: "Date(s) Held", dataIndex: "date", key: "date" },
    { title: "Key Documents Discussed", dataIndex: "documents", key: "documents" },
    { title: "Key Decisions Approval", dataIndex: "approvals", key: "approvals" },
    { title: "Date (Decision/Approval)", dataIndex: "decisions", key: "decisions" },
];

const subStructureEstablishmentColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "meeting" },
    { title: "Date of establishment", dataIndex: "date", key: "date" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "No.", dataIndex: "no", key: "no" },
];

const membersColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Member", dataIndex: "member", key: "member" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Elected/Appointed ", dataIndex: "appointment", key: "appointment" }
];

const budgetData = [
    { key: "1", organ: "DPCU", date: "12-Feb-2023", documents: "Annual Plan", approvals: "Approved" },
    { key: "2", organ: "Budget Committee", date: "18-Mar-2023", documents: "Financial Statement", approvals: "Pending" },
];

const subStructureColumns = [
    { title: " ", dataIndex: "meeting", key: "meeting" },
    { title: "1st Meeting Date", dataIndex: "firstMeeting", key: "firstMeeting" },
    { title: "2nd Meeting Date", dataIndex: "secondMeeting", key: "secondMeeting" },
    { title: "3rd Meeting Date", dataIndex: "thirdMeeting", key: "thirdMeeting" },
];

// const subStructuresData = [
//     { key: "1", subStructure: "Executive Committee", firstMeeting: "12-Jan", secondMeeting: "15-Apr", thirdMeeting: "20-Jul" },
//     { key: "2", subStructure: "Finance Committee", firstMeeting: "10-Feb", secondMeeting: "14-May", thirdMeeting: "22-Aug" },
// ];

const revenueSharingColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "name" },
    { title: "Amount collected (GHS)", dataIndex: "collected", key: "collected" },
    { title: "Amount Ceded by MMDA (GHS)", dataIndex: "ceded", key: "ceded" },
    { title: "% Ceded", dataIndex: "percentage", key: "percentage" },
];

const revenueSharingData = [
    { key: "1", subStructure: "Local Market", collected: 50000, ceded: 15000, percentage: "30%" },
    { key: "2", subStructure: "Transport Union", collected: 70000, ceded: 21000, percentage: "30%" },
];

const ecaCompositionColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name of Members", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Sub-Committee Represented", dataIndex: "sub", key: "sub" }
];

const subCommitteeCompositionColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name of Sub- Committee", dataIndex: "name", key: "name" },
    { title: "No. of members determined by MA", dataIndex: "number", key: "number" }
];


// =====================================SDI Columns================================
const serviceDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    { title: "Total No. of decisions taken", dataIndex: "total", key: "total" },
    { title: "No. of decisions on service delivery", dataIndex: "serviceDecision", key: "serviceDecision" },
    { title: "% of decisions on service delivery ", dataIndex: "percentage", key: "percentage" }
];

const serviceDeliveryDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    { title: "Service Delivery Decisions", dataIndex: "service", key: "service" }
];

const managementServiceDeliveryActionColumns = [
    { title: "No. of decisions on service delivery improvement", dataIndex: "no", key: "no" },
    { title: "No. of actions taken on social service improvement decisions", dataIndex: "service", key: "service" },
    { title: "% of service delivery improvement decisions implemented ", dataIndex: "percentage", key: "percentage" }
];

const cededAmountUtilizationColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "name" },
    { title: "Amount of Ceded Revenue Received (GHS) - A", dataIndex: "collected", key: "collected" },
    { title: "Amount of Ceded Revenue utilized for Community Activities (GHS)", dataIndex: "ceded", key: "ceded" },
    { title: "% of Amount utilized for Community Activities ", dataIndex: "percentage", key: "percentage" }
];

const subStructureActivityColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Activities ", dataIndex: "activities", key: "collected" },
    { title: "Substructure", dataIndex: "name", key: "name" },
    { title: "Amount Utilized", dataIndex: "amount", key: "amount" }
];

const serviceProvidersColumn = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Service Provider", dataIndex: "provider", key: "provider" },
    { title: "Contract Duration", dataIndex: "contract", key: "contract" },
    { title: "Start Date", dataIndex: "date", key: "date" }
];

const buildingInspectorateColumn = [
    { title: "Date Established", dataIndex: "date", key: "date" },
    { title: "Supervisor", dataIndex: "supervisor", key: "supervisor" },
    { title: "address", dataIndex: "address", key: "address" },
    { title: "Category of staff", dataIndex: "category", key: "category" },
    { title: "Function performed by Works Department", dataIndex: "department", key: "department" }
];

const permitRequestColumn = [
    { title: "No. of Building Permit Requests Received (A)", dataIndex: "permitReceived", key: "permitReceived" },
    { title: "No. of Building Permit Requests Processed & Issued (B)", dataIndex: "permitProcessed", key: "permitProcessed" },
    { title: "No. of approved permits traced to Local Plans (C)", dataIndex: "permitTraced", key: "permitTraced" }
];

const streetNamingColumn = [
    { title: "Street Naming and Property Addressing Data base (NOT Excel) available (Yes/No)", dataIndex: "street", key: "street" },
    { title: "Street Addressing Map of district displayed at Assembly Premises (Yes/No)", dataIndex: "displayed", key: "displayed" },
    { title: "Street Addressing Map of district displayed at Substructures (Yes/No)", dataIndex: "map", key: "map" }
];

const streetNamingInstallationColumn = [
    { title: "No. of streets available on database (a)", dataIndex: "street", key: "street" },
    { title: "Number of streets named (b)", dataIndex: "displayed", key: "displayed" },
    { title: "Number of street signage’s installed (c)", dataIndex: "map", key: "map" }
];

const socialServiceDisseminationColumn = [
    { title: "List of Social Services Available (Yes/No)", dataIndex: "street", key: "street" },
    { title: "List of Social Services published on Notice boards or website (Yes/No)", dataIndex: "displayed", key: "displayed" },
    { title: "Date and Location of dissemination of social services to citizens", dataIndex: "map", key: "map" }
];

const socialServicePlansColumn = [
    { title: "a. Number of activities in AAP", dataIndex: "aap", key: "aap" },
    { title: "b. Number of Social Protection activities in AAP", dataIndex: "socialProtection", key: "socialProtection" },
    { title: "c. Number of Social Protection activities in AAP implemented", dataIndex: "implemented", key: "implemented" },
    { title: "d. Percentage of Social Protection activities implemented (c/b x 100) ", dataIndex: "percentage", key: "percentage" }
];

const districtHotlineNumberColumn = [
    { title: "Dedicated hotline exist (Yes/No)", dataIndex: "hotline", key: "hotline" },
    { title: "Hotline Number", dataIndex: "number", key: "number" },
    { title: "Hotline Number publicized on DA notice boards & at sub-structures (Yes/No)", dataIndex: "publication", key: "publication" }
];

const dumpingSiteColumn = [
    { title: "No.", dataIndex: "no", key: "no" },
    { title: "Name of Site", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Solid / Liquid waste", dataIndex: "type", key: "type" },
];

const foodVendorsColumn = [
    { title: "Register of Food and Beverage Vendors available(Yes/No)", dataIndex: "registration", key: "registration" },
    { title: "No. of Food and Beverage Vendors registered", dataIndex: "numberBVRegistered", key: "numberBVRegistered" },
    { title: "No. of Food and beverage vendors screened", dataIndex: "numberBVScreened", key: "numberBVScreened" },
    { title: "No. of screened vendors issued with certificates", dataIndex: "numberSVIssued", key: "numberSVIssued" },
    { title: "Availability of Monitoring Reports (Yes/No)", dataIndex: "availability", key: "availability" }
];

// Main Component
const DPATAssessmentSheet = ({ props }) => {

    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [meetingDataGroup, setMeetingDataGroup] = useState();
    const [meetings, setMeetings] = useState(props?.meetings.meetings);
    const [members, setMembers] = useState(props?.members.members);
    const [subStructureActivity, setSubStructureActivity] = useState(props?.subActivity.activities);
    const [serviceProviders, setServiceProviders] = useState(props?.serviceProviders.providers);
    const [subStructuresMeetingData, setSubStructuresMeetingData] = useState([]);
    const [permitRequest, setPermitRequest] = useState(props?.permitRequest.permits);
    const [serviceProvidersReport, setServiceProvidersReport] = useState(props?.serviceProviders.report);
    const [buildingInspectorate, setBuildingInspectorate] = useState(props?.inspectorates.inspectorates);
    const [buildingInspectorateReport, setBuildingInspectorateReport] = useState(props?.inspectorates.reports);
    const [permitRequestData, setPermitRequestData] = useState(null);
    const [permitRequestReport, setPermitRequestReport] = useState(props?.permitRequest.reports);
    const [streetNaming, setStreetNaming] = useState(props?.streets.streetNaming);
    const [districtGeneral, setDistrictGeneral] = useState(props?.districtGeneral.data);
    const [districtGeneralData, setDistrictGeneralData] = useState(null);
    const [pwd, setPwd] = useState(props?.pwd.data);
    const [dumpingSite, setDumpingSite] = useState(props?.dumpingSite.data);
    const [dumpingSiteData, setDumpingSiteData] = useState([]);
    const [foodVendors, setFoodVendors] = useState(props?.foodVendors.data);
    const [foodVendorsData, setFoodVendorsData] = useState([]);
    const [pwdData, setPwdData] = useState(null);
    const [streetNamingData, setStreetNamingData] = useState([]);
    const [streetNamingCountingData, setStreetNamingCountingData] = useState([]);
    const [buildingInspectorateData, setBuildingInspectorateData] = useState(null);
    const [waterProvidersData, setWaterProvidersData] = useState(null);
    const [electricityProvidersData, setElectricityProvidersData] = useState(null);
    const [sanitationProvidersData, setSanitationProvidersData] = useState(null);
    const [memberFinanceData, setMemberFinanceData] = useState(null);
    const [subStructureActivityData, setSubStructureActivityData] = useState(null);
    const [ecaCompositionData, setEcaCompositionData] = useState(null);
    const [subCommitteCompositionData, setSubCommitteCompositionData] = useState(null);
    const [decisionServiceData, setDecisionServiceData] = useState(null);
    const [decisionDeliveryData, setDecisionDeliveryData] = useState(null);
    const [managementActionServiceDeliveryData, setManagementActionServiceDeliveryData] = useState(null);
    const [memberSocialData, setMemberSocialData] = useState(null);
    const [memberPlanningData, setMemberPlanningData] = useState(null);
    const [memberWorksData, setMemberWorksData] = useState(null);
    const [memberJusticeData, setMemberJusticeData] = useState(null);
    const [membersReport, setMembersReport] = useState(props?.members.report);
    const [ecaMeetingData, setEcaMeetingData] = useState(null);
    const [prccMeetingData, setPrccMeetingData] = useState(null);
    const [prccRecommendationData, setPrccRecommendationData] = useState(null);
    const [etcMeetingData, setEtcMeetingData] = useState(null);
    const [managementMeetingsData, setManagementMeetingsData] = useState(null);
    const [meetingDecisions, setMeetingDecisions] = useState(props?.decisions.decisions);
    const [subStructures, setSubStructures] = useState(props?.subStructures.sub);
    const [subReports, setSubReports] = useState(props?.subStructures.reports);
    const [departments, setDepartments] = useState(props?.departments.dep);
    const [departmentReport, setDepartmentReport] = useState(props?.departments.reports);
    const [subStructureData, setSubStructureData] = useState(null);
    const [subReportData, setSubReportData] = useState(null);
    const [cededRevenueUtilisationData, setCededRevenueUtilisationData] = useState(null);
    const [decisionsData, setDecisionsData] = useState(null);
    const [year, setYear] = useState(props?.year);
    const [district, setDistrict] = useState(props.district);
    const [gaDecisionScore, setGaDecisionScore] = useState(0);

    const handlePrint = () => {
        window.print();
    };



    useEffect(() => {
        setMeetingData();
        setDecisionData();
        setMeetingBudgetData();
        setSubtructureEstablishmentsData();
        setSubStructureMeetingDataDisplay();
        setECAMeetingData();
        setManagementMeetingData();
        setPRCCMeetingData();
        setETCMeetingData();
        setMemberData();
        setMemberEcaCompositionData();
        setSubCommitteesCompositionData();
        setSubtructureActivities();
        setServiceProvidersData();
        setBuildingInspectoratesData();
        setPermitRequestDataDisplay();
        setStreetNamingDataDisplay();
        setDistrictGeneralDataDisplay();
        setPwdDataDisplay();
        setDumpingSiteDataDisplay();
        setFoodVendorsDiplay();

    }, [props]);


    function formatData(meetings, meetingType) {
        return meetings.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Type" && attr.value === meetingType
            )
        );

    }

    function formatDataGeneral(data, property, value) {
        return data?.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === property && attr.value === value
            )
        );

    }

    function formatDataGroup(meetings, meetingTypes) {
        return meetings.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Type" && meetingTypes.includes(attr.value)
            )
        );
    }

    const getDaysBetween = (start, end) => {
        if (!start || !end) return "N/A";

        const startDate = new Date(start);
        const endDate = new Date(end);

        const diffTime = endDate - startDate; // Difference in milliseconds
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
    };


    const getAttributeValue = (key, val) => {
        const attr = val?.attributes.find(attr => attr.displayName === key);
        return attr ? attr.value : "N/A";
    };


    const setMeetingData = () => {
        const temp = [];
        let decisionNo = 0;
        let decisionOnServiceDeliveryNo = 0;
        const tempDecisions = [];
        const tempDecisionList = [];

        formatData(meetings, "GA").forEach((meeting, index) => {
            const minuteFileNumber = getAttributeValue("Minute File Number", meeting);
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "GA"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // Meeting Date
                interval: 0, // Interval (Days)
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoryInvitationLetter: getAttributeValue("Who Signed the Invitation letter", meeting) === "PM" ?
                    "Presiding Member" : "Convener", // Signatory of Invitation Letter
                signatoriesMinutes: minuteFileNumber, // Placeholder for Signatories to minutes of meeting 
            };

            meetingDataState.interval = getDaysBetween(meetingDataState.invitationDate, meetingDataState.meetingDate);
            const decNo = getAttributeValue("DPAT | Number of Decisions", meeting);
            decisionNo += parseInt(decNo);
            temp.push(meetingDataState);

            const serviceDeliveryDecion = getDecisionsByMeeting(meetingDecisions, minuteFileNumber);
            const serviceDeliveryNo = serviceDeliveryDecion ? serviceDeliveryDecion.length : 0;
            const decisionList = serviceDeliveryDecion
                ?.map((val, index) => `${index + 1}. ${getAttributeValue("Decision", val)}`)
                .join('\n');

            const gam = `${getMeetingRank(index, "EC")}  General Assembly Meeting`;


            const decisionServiceDelivery = {
                key: index + 1, // Static key (can be dynamic)
                gam: gam, // Meeting type
                total: decNo, // Total Decision 
                serviceDecision: serviceDeliveryNo, // Meeting Date
                percentage: calculatePercentage(decNo, serviceDeliveryNo), // Interval (Days)
            };

            decisionOnServiceDeliveryNo += parseInt(serviceDeliveryNo);

            tempDecisions.push(decisionServiceDelivery);
            tempDecisionList.push({ gam: gam, service: decisionList })

        });


        setGaMeetingData({ meetings: temp, fulfillment: checkGaMeetingFulfillment(temp), numberOfDecision: decisionNo });
        setDecisionServiceData(tempDecisions);
        setDecisionDeliveryData(tempDecisionList);
        setManagementActionServiceDeliveryData([{ no: decisionOnServiceDeliveryNo, service: 0, percentage: 0 }])

    };

    const calculatePercentage = (total, value) => {
        const totalNum = parseFloat(total);
        const valueNum = parseFloat(value);

        if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
            return 0;
        }

        return (valueNum / totalNum) * 100;
    };


    const getDecisionsByMeeting = (decisions, meetingReference) => {
        return decisions?.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Reference" && attr.value === meetingReference
            )
        );
    }

    const setServiceProvidersData = () => {

        const serviceProviderTypes = {
            "Water Service Provider": [],
            "Sanitation Service Provider": [],
            "Electricity Service Provider": [],
        };

        const populateServiceProviderData = (type) => {
            const providers = formatDataGeneral(serviceProviders, "DPAT | Service Provider", type) || [];
            providers.forEach((service, index) => {
                serviceProviderTypes[type].push({
                    key: index + 1,
                    no: index + 1,
                    provider: getAttributeValue("Name of Business", service),
                    contract: getAttributeValue("DPAT | Period of Contract", service),
                    date: getAttributeValue("Start Date", service),
                });
            });
        };

        Object.keys(serviceProviderTypes).forEach(populateServiceProviderData);

        const tempWater = serviceProviderTypes["Water Service Provider"];
        const tempSanitation = serviceProviderTypes["Sanitation Service Provider"];
        const tempElectricity = serviceProviderTypes["Electricity Service Provider"];

        setWaterProvidersData(tempWater);
        setSanitationProvidersData(tempSanitation);
        setElectricityProvidersData(tempElectricity);


    }

    const setBuildingInspectoratesData = () => {
        const temp = [];

        formatDataGeneral(buildingInspectorate, "DPAT | Inspectorate Type", "Planning and Building")
            ?.forEach((building, index) => {

                const buildingInspectorateDateSet = {
                    key: index + 1,
                    date: getAttributeValue("Name of Business", building),
                    supervisor: getAttributeValue("Supervisor", building),
                    address: getAttributeValue("Address Location", building),
                    category: getAttributeValue("DPAT | Stakeholders Involved", building),
                    department: "None"
                };

                temp.push(buildingInspectorateDateSet);
            });

        console.log("Building ", temp)

        setBuildingInspectorateData(temp);

    }

    const setSubStructureMeetingDataDisplay = () => {
        const temp = [];
      
        const generalAssemblyMeeting = formatData(meetings, "GA") || [];
        const executiveCommitteeMeeting = formatData(meetings, "EC") || [];
        const subStructureMeeting = formatData(meetings, "Sub Structure Committee") || [];
      
        const createMeetingData = (label, data) => ({
          key: label,
          meeting: `${label}`,
          firstMeeting: getAttributeValue("DPAT | Meeting Date", data[0]),
          secondMeeting: getAttributeValue("DPAT | Meeting Date", data[1]),
          thirdMeeting: getAttributeValue("DPAT | Meeting Date", data[2]),
        });
      
        temp.push(createMeetingData("General Assembly Meeting", generalAssemblyMeeting));
        temp.push(createMeetingData("Executive Committee Meeting", executiveCommitteeMeeting));
        temp.push(createMeetingData("Sub Structure Meeting", subStructureMeeting));
      
        setSubStructuresMeetingData({data: temp, fulfillment: "Not Fulfiled"});
      };
      

    const setPermitRequestDataDisplay = () => {
        const temp = [];
        console.log("permits: ", props.permitRequest);
        /* 
        Henry to do the counting based on the requirement from the score sheet table
        Name from Sheet: 3.2 Planning and Development Permit Processing & Issuance
        The variables to use:
         permitRequest and permitRequestReport / props.permitRequest

         state for the result:permitRequestData
        */

    }

    const setStreetNamingDataDisplay = () => {
        const temp = [];
        console.log("street: ", props.streets);
        /* 
        Henry to do the counting based on the requirement from the score sheet table
        Name from Sheet: 3.3 Street Naming Database and Property Addressing
        The variables to use:
         streetNaming / props.permitRequest

         state for the result:
            streetNamingData
            streetNamingCountingData
        */

    }

    const setDistrictGeneralDataDisplay = () => {
        const temp = [];
        console.log("street: ", props.districtGeneral);
        /* 
        Sow to do the counting based on the requirement from the score sheet table
        Name from Sheet:4.3 Availability of Dedicated Hotline for the Vulnerable
        The variables to use:
         districtGeneral / props.districtGeneral

         state for the result:
            districtGeneralData
            
        */

    }

    const setPwdDataDisplay = () => {
        const temp = [];
        console.log("street: ", props.pwd);
        /* 
        Sow to do the counting based on the requirement from the score sheet table
        Name from Sheet:4.3 Availability of Dedicated Hotline for the Vulnerable
        The variables to use:
         pwd / props.pwd

         state for the result:
            pwdData
            
        */

    }

    const setFoodVendorsDiplay = () => {
        const temp = [];
        console.log("food vendors: ", props.foodVendors);
        /* 
        Sow to do the counting based on the requirement from the score sheet table
        Name from Sheet:4.3 Availability of Dedicated Hotline for the Vulnerable
        The variables to use:
         pwd / props.pwd

         state for the result:
            pwdData
            
        */

    }

    const setDumpingSiteDataDisplay = () => {
        const temp = [];
        console.log("street: ", props.dumpingSite);
        /* 
        Sow to do the counting based on the requirement from the score sheet table
        Name from Sheet:4.3 Availability of Dedicated Hotline for the Vulnerable
        The variables to use:
         pwd / props.pwd

         state for the result:
            pwdData
            
        */

    }


    function checkGaMeetingFulfillment(gaMeetings) {
        if (gaMeetings.length < 3) {
            return 'Not Fulfilled';
        }

        for (const mt of gaMeetings) {
            const isIntervalTooShort = mt.interval < 14;
            const missingFields =
                !mt.invitationLetterReference ||
                !mt.signatoriesMinutes ||
                !mt.signatoryInvitationLetter;

            if (isIntervalTooShort || missingFields) {
                return 'Not Fulfilled';
            }
        }

        return 'Fulfilled';
    }

    function checkECANDGAMeetingFulfillment(meetings) {

        for (const mt of meetings) {

            const ecDate = new Date(mt.ecaMeetingDate);
            const gaDate = new Date(mt.gaMeetingDate);

            const missingFields =
                !mt.invitationLetterReference

            if (ecDate > gaDate) {
                return 'Not Fulfilled';
            }
        }

        return 'Fulfilled';
    }


    const setManagementMeetingData = () => {
        const temp = [];
        formatData(meetings, "Management Meetings").forEach((meeting, index) => {
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "Management Meetings"), // Meeting type
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // Meeting Date
                departments: 0, // Invitation Letter Ref
                hodAttendance: 0, // ecaMeeting Date
                attendance: 0, // Signatory of Invitation Letter
            };

            temp.push(meetingDataState);
        })

        const fulfillment = "Not Fulfilled";
        setManagementMeetingsData({data: temp, fulfillment: fulfillment});
    };

    const setECAMeetingData = () => {
        const temp = [];
        const gaMeeting = formatData(meetings, "GA"); // GA Meeting data
        const ecaMeeting = formatData(meetings, "EC"); // EC Meeting data
    
        // Preprocess GA meeting dates
        const gaMeetingDates = gaMeeting.map((meeting, index) => ({
            key: index + 1,
            date: getAttributeValue("DPAT | Meeting Date", meeting),
        }));
    
        ecaMeeting.forEach((meeting, index) => {
            const meetingDataState = {
                key: index + 1,
                meeting: getMeetingRank(index, "EC"),
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting),
                gaMeetingDate: gaMeetingDates[index]?.date || "", // Fallback to empty string if GA date is not available
                ecaMeetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                signatoriesMinutesStatus: getAttributeValue("Minute File Number", meeting) ? "YES" : "NO",
            };
    
            temp.push(meetingDataState);
        });
    
        const fulfillment = checkECANDGAMeetingFulfillment(temp);
        setEcaMeetingData({ data: temp, fulfillment });
    };
    

    const setPRCCMeetingData = () => {
        const temp = [];
        formatData(meetings, "PRCC").forEach((meeting, index) => {

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "GA"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoriesMinutesStatus: getAttributeValue("Minute File Number", meeting) ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            temp.push(meetingDataState);
        })

        const fulfillment = "Not Fulfilled";

        setPrccMeetingData({data: temp, fulfillment:fulfillment});
    };

    const setPRCCRecommendationMeetingData = () => {
        const temp = [];
        formatData(meetings, "PRCC").forEach((meeting, index) => {

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "GA"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoriesMinutesStatus: getAttributeValue("Minute File Number", meeting) ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            temp.push(meetingDataState);
        })

        setPrccMeetingData(temp);
    };

    const setETCMeetingData = () => {
        const temp = [];
        formatData(meetings, "Entity Tender Committee (ETC)").forEach((meeting, index) => {

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "Entity Tender Committee (ETC)"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoriesMinutesStatus: getAttributeValue("Minute File Number", meeting) ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            temp.push(meetingDataState);
        });

        const fulfillment= "Not Fulfilled";

        setEtcMeetingData({data: temp, fulfillment:fulfillment});
    };

    const setMeetingBudgetData = () => {
        const temp = [];
        const meetingTypes = ["GA", "Budget Committee", "EC", "DMPCU"];
        let fulfillment = 'Not Fulfilled';

        meetingTypes?.forEach((type, index) => {
            // Get the first meeting that matches the current meeting type
            const matchingMeeting = formatDataGroup(meetings, [type])[0];

            if (matchingMeeting) { // Ensure there's a match before adding
                // const date = getAttributeValue("DPAT | Meeting Date", matchingMeeting);
                const meetingDataState = {
                    key: index + 1,
                    meeting: type,
                    date: getAttributeValue("DPAT | Meeting Date", matchingMeeting),
                    documents: getAttributeValue("DPAT | Meeting Agenda", matchingMeeting),
                    decisions: getAttributeValue("AAP Approval Date", matchingMeeting)
                };

                const meetingDate = new Date(meetingDataState.decisions);
                const cutoffDate = new Date('2025-10-31');

                if ((meetingDate <= cutoffDate) && getAttributeValue("AAP Approval Date")) {
                    fulfillment = 'Fulfilled';
                }

                temp.push(meetingDataState);
            }
        });

        setMeetingDataGroup({ data: temp, fulfillment: fulfillment });
    };


    const setDecisionData = () => {
        let temp = [];
        meetingDecisions?.filter(d =>
            d.attributes?.some(at => at.displayName === "DPAT | Meeting Decision Type" && at.value === "GA")
        )
            .forEach((decision, index) => {
                const decisionDataState = {
                    key: index + 1,
                    gam: getDecisionRank(index),
                    decision: decision.attributes?.find(attr => attr.displayName === "Decision")?.value || "N/A"
                };

                temp.push(decisionDataState);
            });

        setDecisionsData(temp.slice(0, 3));
    };

    const setSubtructureEstablishmentsData = () => {
        const temp = [];
        subStructures
            ?.forEach((sub, index) => {
                const subStructureDataState = {
                    key: index + 1,
                    name: getAttributeValue("DPAT | Name of Sub Structure", sub),
                    date: getAttributeValue("Established Date", sub),
                    category: getAttributeValue("DPAT | Sub Structure Committee", sub),
                };

                temp.push(subStructureDataState);
            });

        setSubStructureData(temp);

        const reportsTemp = [];

        subReports?.filter(rep => rep.dataValues.length > 0)
            .forEach((report, index) => {
                const instance = subStructures.find(sub => sub.trackedEntity === report.trackedEntity);
                reportsTemp.push({
                    key: index + 1,
                    name: getAttributeValue("DPAT | Name of Sub Structure", instance),
                    collected: report.dataValues[0].value,
                    ceded: report.dataValues[1].value,
                    percentage: report.dataValues[2].value
                });

            });


        setSubReportData(reportsTemp);

        let collectedTotal = 0;
        let cededTotal = 0;
        let percentageTotal = 0;

        const finalRevenueDetails = [];

        reportsTemp.forEach(val => {
            finalRevenueDetails.push({
                name: val.name,
                collected: val.collected,
                ceded: val.ceded,
                percentage: val.percentage
            });

            collectedTotal += parseFloat(val.collected);
            cededTotal += parseFloat(val.ceded);
            percentageTotal += parseFloat(val.percentage);
        });

        finalRevenueDetails.push({
            name: <strong>Total</strong>,
            collected: <strong>{collectedTotal}</strong>,
            ceded: <strong>{cededTotal}</strong>,
            percentage: <strong>{calculatePercentage(collectedTotal, cededTotal)}</strong>
        });

        setCededRevenueUtilisationData(finalRevenueDetails);
    };

    const setSubtructureActivities = () => {
        const temp = [];
        subStructureActivity
            ?.forEach((sub, index) => {
                const subStructureActivityDataState = {
                    key: index + 1,
                    no: index + 1,
                    activity: getAttributeValue("Activity Description", sub),
                    name: getAttributeValue("DPAT | Name of Sub Structure", sub),
                    amount: getAttributeValue("Amount", sub)
                };

                temp.push(subStructureActivityDataState);
            });

        setSubStructureActivityData(temp);

    };

    const setMemberData = () => {
        const temp = [];
        members
            ?.forEach((member, index) => {
                const memberDataState = {
                    key: index + 1,
                    no: index + 1,
                    member: `${getAttributeValue("First Name", member)} ${getAttributeValue("Last Name", member)}`,
                    department: getAttributeValue("Staff Department", member),
                    appointment: getAttributeValue("DPAT |  Membership Status", member),
                };

                temp.push(memberDataState);
            });

        setMemberFinanceData(temp);
    };

    const setMemberEcaCompositionData = () => {
        const temp = [];

        formatDataGeneral(members, "DPAT | MMDA Unit", "Assembly Member")
            ?.forEach((member, index) => {
                const memberDataState = {
                    key: index + 1,
                    no: index + 1,
                    name: `${getAttributeValue("First Name", member)} ${getAttributeValue("Last Name", member)}`,
                    position: getAttributeValue("DPAT | Sub Structure Committee - Position", member),
                    sub: getAttributeValue("DPAT |  Statutory Sub Committee", member),
                };

                temp.push(memberDataState);
            });

        setEcaCompositionData(temp);
    };

    const setSubCommitteesCompositionData = () => {
        const temp = [], trialTemp = {};

        formatDataGeneral(members, "DPAT | MMDA Unit", "Assembly Member")
            ?.forEach((member, index) => {

                if (trialTemp?.[`${getAttributeValue("DPAT |  Statutory Sub Committee", member)}`]) {
                    trialTemp[`${getAttributeValue("DPAT |  Statutory Sub Committee", member)}`] =
                        trialTemp[`${getAttributeValue("DPAT |  Statutory Sub Committee", member)}`] + 1;
                } else {
                    trialTemp[`${getAttributeValue("DPAT |  Statutory Sub Committee", member)}`] = 1;
                }
            });

        Object.keys(trialTemp).map((tempKey, index) => {

            const memberDataState = {
                key: index + 1,
                no: index + 1,
                name: tempKey,
                number: trialTemp[tempKey]
            };

            temp.push(memberDataState);
        });
        const fulfillment = "Not Fulffiled";

        setSubCommitteCompositionData({data: temp, fulfillment:fulfillment});
    };


    const getMeetingRank = (index, type) => {

        if (type === 'GA') {
            switch (index) {
                case 0: return "1st Ordinary Meeting";
                case 1: return "2nd Ordinary Meeting";
                case 2: return "3rd Ordinary Meeting";
                default: return "Bonus Ordinary Meeting";
            }
        }
        else if (type === 'EC') {
            switch (index) {
                case 0: return "1st";
                case 1: return "2nd";
                case 2: return "3rd";
                default: return "Other";
            }
        } else if (type === 'Management Meetings') {
            switch (index) {
                case 0: return "1st";
                case 1: return "2nd";
                case 2: return "3rd";
                case 3: return "4th";
                default: return "Other";
            }
        } else if (type === 'Entity Tender Committee (ETC)') {
            switch (index) {
                case 0: return "1st Quarter";
                case 1: return "2nd Quarter";
                case 2: return "3rd Quarter";
                case 3: return "4th Quarter";
                default: return "Other";
            }
        }

    }

    const getDecisionRank = (index) => {

        switch (index) {
            case 0: return "1st";
            case 1: return "2nd";
            case 2: return "3rd";
            default: return "Other";
        }
    }


    return (
        <Layout style={{ padding: "20px", background: "#fff" }}>
            {/* Header */}
            <Header style={{ background: "#1890ff", color: "#fff", textAlign: "center", padding: "10px" }}>
                <Title level={2} style={{ color: "#fff", margin: 0 }}>
                    DISTRICT ASSEMBLY PERFORMANCE ASSESSMENT REPORT {year && <span style={{ color: "#fff", fontSize: "30px" }}>{year}</span>}
                </Title>
            </Header>

            <Content style={{ padding: "20px" }}>
                <Row className="py-2">
                    <Col span={8} className="gutter-row">
                        <Text strong>Name of MMDA: </Text> <Text className="ms-3">{district?.label}</Text>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Text strong>Zone: </Text> <Text>Six (6)</Text>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Text strong>Date of Assessment: </Text> <Text>5th & 8th August, {year}</Text>
                    </Col>
                </Row>
                <h3 style={{ textAlign: "center", padding: "10px" }}>
                    Annex 1: SECTION A - COMPLIANCE INDICATORS
                </h3>
                {/* General Assembly Meetings and Decision Start */}
                {gaMeetingData && <GAMeeting 
                    data={gaMeetingData} 
                    year={year} 
                    columns={generalAssemblyColumns}
                    decisions={decisionsData}
                    decisionColumns={generalAssemblyDecisionColumns}
                    />}
                 {/* General Assembly Meetings and Decision End */}
                 <hr/>

                {/* Approval of Annual Action Plan Budget Start */}
                {/* {JSON.stringify(meetingDataGroup)} */}
                {meetingDataGroup && <AAPBudgetAproval
                    data={meetingDataGroup} 
                    year={year} 
                    columns={budgetColumns}
                    />}
                {/* Approval of Annual Action Plan Budget End */}
                <hr />

                {/* Sub-Structures Meetings Start */}
                {/* {JSON.stringify(subReportData)} */}
                
                {subStructuresMeetingData && <SubStructureMeeting
                    data={subStructuresMeetingData} 
                    year={year} 
                    columns={subStructureColumns}
                    establishment={subStructureData}
                    establishmentColumns={subStructureEstablishmentColumns}
                    revenueSharing={subReportData}
                    revenuSharingColumns={revenueSharingColumns}
                    />}
                {/* Sub-Structures Meetings End */}
               <hr/>

                {/* ECA Meeting Start */}
                {/* {JSON.stringify(ecaMeetingData)} */}
                {ecaMeetingData && <ExecutiveCommitteeMember
                    data={ecaMeetingData} 
                    year={year} 
                    columns={ECAMeetingColumns}
                    />}
                {/* ECA Meeting End */}
                <hr/>

                {/* Sub Committe Meeting and Members section Start*/}
                {/* {JSON.stringify(memberFinanceData)} */}
                 {/* Evidence of Sub Committee Composition --Henry sum them and count by sub commity name*/}
                {/* Also desagrate the members and display list of members by sub-committee
                    (See the sample sheet as guide:Membership of Statutory Sub-Committees) */}
                {memberFinanceData && <SubStructureCommiteeMeeting
                    data={subCommitteCompositionData} 
                    year={year} 
                    columns={subCommitteeCompositionColumns}
                    members={memberFinanceData}
                    memberColumns = {membersColumns}
                    />}
                {/* <Title level={3} style={{ marginTop: "30px" }}>Membership of Statutory Sub-Committees</Title>
                {memberFinanceData && <Table columns={membersColumns} dataSource={memberFinanceData} pagination={true} bordered />} */}

                {/* Sub Committe Meeting and Members section End*/}
               <hr/>
                
                {/* Management Meeting Start */}
                 {/* {JSON.stringify(managementMeetingsData)} */}
                 {managementMeetingsData && <ManagementMeeting
                    data={managementMeetingsData} 
                    year={year} 
                    columns={managementMeetingColumns}
                    />}

                 {/* Management Meeting End */}
                {/* PRCC Meeting */}
                 {/* {JSON.stringify(prccMeetingData)} */}
                 {prccMeetingData && <PRCCMeeting
                    data={prccMeetingData} 
                    year={year} 
                    columns={PRCCMeetingColumns}
                    />}

                <hr/>
                
                {/* Entity Tender Committee (ETC) Meeting Start* Sow to review the fulfillement/}
                 {/* {JSON.stringify(etcMeetingData)} */}
                 {etcMeetingData && <EntityTenderCommitteeMeeting
                    data={etcMeetingData} 
                    year={year} 
                    columns={ETCMeetingColumns}
                    />}

                {/* Entity Tender Committee (ETC) Meeting End*/}

                <hr />
                <h3 style={{ textAlign: "center", padding: "10px" }}>
                    Annex 2: SECTION B – SERVICE DELIVERY INDICATORS
                </h3>

                {/* Henry and Samu to give the score and of bellow tables */}


                <div>
                    <Text strong>THEMATIC AREA: </Text> <Text>
                        MANAGEMENT & COORDINATION – IMPLEMENTATION OF SERVICE DELIVERY DECISIONS (5)
                    </Text>
                </div>

                {/* Entity Tender Committee (ETC) Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>SDI 10 - 1.1 General Assembly Decisions</Title>

                <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
                <Content>
                    From the DCD, receive signed Minutes of Meetings of the three mandatory Meetings of the General Assembly:<br /><br />
                    <ol>
                        <li>If The General Assembly took at least 50% decisions on improving service delivery in any sector of the District, score 1;</li>
                    </ol>
                    Examples of services: Water, Electric power, Health, Education, Transportation, Roads, Sanitation, Recreational services and Security.
                    <br /><br /><i>(Local Governance Act, 2016 (Act 936) Section 18)3</i>
                </Content>

                <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
                <Content>1</Content>

                {/* <Title level={4} style={{ marginTop: "30px" }}>Minimum Score</Title>
                    <Content>{gaDecisionScore > 50 ? '1' : '0'}</Content> */}

                <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>


                <Title level={5} style={{ marginTop: "30px" }}>Service Delivery Decisions</Title>
                <Space><Text strong>Actual Score: </Text> <Text>{gaDecisionScore > 50 ? '1' : '0'}</Text></Space>
                {decisionServiceData && <Table columns={serviceDecisionColumns} dataSource={decisionServiceData} pagination={false} bordered
                    summary={pageData => {
                        let totalDecision = 0, totalDelivered = 0, totalPercent = 0;

                        pageData.forEach(({ total, serviceDecision, percentage }) => {
                            totalDecision += Number(total);
                            totalDelivered += Number(serviceDecision);
                            totalPercent += Number(percentage);
                        });

                        setGaDecisionScore(totalPercent);

                        return (<>
                            <Table.Summary.Row style={{ fontWeight: 'bold' }}>
                                <Table.Summary.Cell>Total Decisions</Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text>{totalDecision}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text>{totalDelivered}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text>{totalPercent}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>)
                    }}
                />}

                <Title level={5} style={{ marginTop: "30px" }}>Service Delivery Decisions</Title>
                {decisionDeliveryData && <Table columns={serviceDeliveryDecisionColumns} dataSource={decisionDeliveryData} pagination={false} bordered />}

                <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
                <Content>
                    The decisions that were on improving service delivery was {`${gaDecisionScore}%`} of the total no. of decisions made at GA Meetings in {year}.
                </Content>

                <Title level={3} style={{ marginTop: "30px" }}>Evidence of management actions on service delivery decisions</Title>
                {managementActionServiceDeliveryData && <Table
                    columns={managementServiceDeliveryActionColumns}
                    dataSource={managementActionServiceDeliveryData}
                    pagination={true} bordered />}

                {/* 1.3 Assembly Support to Substructures Evidence of utilization of ceded revenue
                 */}
                <Title level={3} style={{ marginTop: "30px" }}>1.3 Assembly Support to Sub-structures</Title>
                <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
                <Content>
                    <div className="mb-3">From the DCD, receive reports on the activities of all established sub-structures of
                        the Assembly and Assembly’s DACF allocation to Sub-structures:</div>
                    <ol>
                        <li>If all the sub-structures utilized at least 30% of their ceded Revenue to support
                            activities that benefit the Community, score 1, else score 0 </li>
                        <li>If the Assembly has spent at least 90% of the up-to 2% DACF release to its
                            Sub-Structures, to support the substructures, score 1, else score 0.</li>
                    </ol>
                    <div style={{ fontStyle: 'italic' }}>
                        (Local Government (Urban, Zonal and Town Councils and Unit Committees)
                        Establishment Instrument of 2010, LI 1961) Guidelines for the Disbursement
                        and Management of the District Assembly Common Fund Allocation
                    </div>
                </Content>

                <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
                <Content>2</Content>

                <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
                <Content>
                    We received and reviewed information on the activities of established sub-structures and noted the following:
                </Content>

                <Title level={5} style={{ marginTop: "30px" }}>Evidence of utilization of ceded revenue</Title>
                {cededRevenueUtilisationData && <Table
                    columns={cededAmountUtilizationColumns}
                    dataSource={cededRevenueUtilisationData}
                    pagination={true} bordered />}





                {/* 1.3 Assembly Support to Substructures Selected Activities that Benefit the Community 
                  Henry to at it and format it the way it is displayed on the sheet and give the score
                  */}
                <Title level={5} style={{ marginTop: "30px" }}>Selected Activities that Benefit the Community</Title>

                {subStructureActivityData && <Table
                    columns={subStructureActivityColumns}
                    dataSource={subStructureActivityData}
                    pagination={true} bordered />}

                {/* Water Service Provider List 
                  Henry to consume the data from the report and get second table(Data is already pulled here)
                  */}
                <Title level={3} style={{ marginTop: "30px" }}>Water Service Provider List</Title>
                {waterProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={waterProvidersData}
                    pagination={true} bordered />}

                {/* Electricity Service Provider List  
                   Henry to consume the data from the report and get second table(Data is already pulled here)
                  */}
                <Title level={3} style={{ marginTop: "30px" }}>Electricity Service Provider List</Title>
                {electricityProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={electricityProvidersData}
                    pagination={true} bordered />}

                {/* Sanitation Service Provider List
                   Henry to consume the data from the report and get second table(Data is already pulled here)
                  */}
                <Title level={3} style={{ marginTop: "30px" }}>Sanitation Service Provider List</Title>
                {sanitationProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={sanitationProvidersData}
                    pagination={true} bordered />}


                {/* Evidence of establishment of Planning & Building Inspectorate Unit
                   Henry to consume the data from the report and get second table(Data is already pulled here)
                  */}
                {/* {JSON.stringify(buildingInspectorate)} */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of establishment of Planning & Building Inspectorate Unit</Title>
                {buildingInspectorateData && <Table
                    columns={buildingInspectorateColumn}
                    dataSource={buildingInspectorateData}
                    pagination={true} bordered />}

                {/* Henry to follow the instruction in the function to get the data */}

                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Processing & Issuance of Building Permit Requests</Title>
                {permitRequestData && <Table
                    columns={permitRequestColumn}
                    dataSource={permitRequestData}
                    pagination={true} bordered />}

                {/* Henry to follow the instruction in the function to get the data */}

                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Street Naming Database</Title>
                {streetNamingData && <Table
                    columns={streetNamingColumn}
                    dataSource={streetNamingData}
                    pagination={true} bordered />}

                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Installation of named streets</Title>
                {streetNamingCountingData && <Table
                    columns={streetNamingInstallationColumn}
                    dataSource={streetNamingCountingData}
                    pagination={true} bordered />}


                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Dedicated Functional Hotline for Vulnerable Groups</Title>
                {districtGeneralData && <Table
                    columns={districtHotlineNumberColumn}
                    dataSource={districtGeneralData}
                    pagination={true} bordered />}



                {/* Evidence of Nutrition-Oriented Activities in the Assembly
                    Sow to use AAP data to fill this
                */}

                {/* 5.1 Availability of Sanitation Service Providers
                    Sow to use service provider data and diplay table and then score
                */}

                <Title level={3} style={{ marginTop: "30px" }}>List of dumping /final disposal site</Title>
                {dumpingSiteData && <Table
                    columns={dumpingSiteColumn}
                    dataSource={dumpingSiteData}
                    pagination={true} bordered />}

                <Title level={3} style={{ marginTop: "30px" }}>Evidance of Beverage Vendors</Title>
                {foodVendorsData && <Table
                    columns={foodVendorsColumn}
                    dataSource={foodVendorsData}
                    pagination={true} bordered />}


                {/* Print Button */}
                <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} style={{ marginTop: "20px" }}>
                    Print Report
                </Button>
            </Content>
        </Layout>
    );
};

export default DPATAssessmentSheet;
