import React, { useEffect, useRef, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";
import moment from 'moment';
import { FilePdfOutlined } from "@ant-design/icons";
import { useReactToPrint } from 'react-to-print';
import GAMeeting from "./GAMeeting";
import AAPBudgetAproval from "./AAPBudgetAproval";
import SubStructureMeeting from "./SubStructureMeeting";
import ExecutiveCommitteeMember from "./ExecutiveCommitteeMember";
import SubStructureCommiteeMeeting from "./SubStructureCommitteMeeting";
import ManagementMeeting from "./ManagementMeeting";
import PRCCMeeting from "./PRCCMeeting";
import EntityTenderCommitteeMeeting from "./EntityTenderCommiteeMeeting";
import GeneralAssemblyManagementActions from "./GeneralAssemblyManagmentActions";
import GASupport from "./GASupport";
import WaterServices from "./WaterServices";
import ElectricityServices from "./ElectricityServices";
import SanitationServices from "./SanitationSevices";
import MaintenanceInfrastructure from "./MaintenanceInfrastructure";
import ClientServiceCharter from "./ClientServiceCharter";
import GeneralAssemblyDecision from "./GeneralAssemblyDecision";
import DistrictHotlineNumber from "./DistrictHotlineNumber";
import AAPImplementation from "./AAPImplementation";
import MonitoringProjectAndActivity from "./MonitoringProjectAndActivity";
import ContractManagementAndAdmins from "./ContractManagementAndAdmins";
import FollowUpDeduction from "./FollowUpDeduction";
import EnvironmentalAndSocialSafeGuard from "./EnvironmentalAndSocialSafeGuard";
import CapacityBuildingImplementation from "./CapacityBuildingImplementation";
import PostTrainingEvaluation from "./PostTrainingEvaluation";
import PaymentPoints from "./PaymentPoints";
import RateableRevenu from "./RateableRevenu";
import AuditCommitteeResponsiveness from "./AuditCommitteeResponsiveness";
import AuditInfractions from "./AuditInfractions";
import HealthServiceSupport from "./HealthServiceSupport";
import AgricultureSupport from "./AgricultureSupport";
import EducationServiceSupport from "./EducationServiceSupport";
import SPCEntityTenderCommittee from "./SCPEntityTenderCommittee";
import InternalAuditUnitFunctionality from "./InternalAuditUnitFunctionality";
import ClientServiceFunctionality from "./ClientServiceFunctionality";
import AAPPublication from "./AAPPublication";
import axios from "../api/axios";
import TransportationNetworkService from "./TransportationNetworkService";
import BuildingInspectorateUnit from "./BuildingInspectorateUnit";
import PermitProcessingIssuance from "./PermitProcessingIssuance";
import StreetNaming from "./StreetNaming";
import SocialProtectionServices from "./SocialProtectionServices";
import ShelterTransactionalHousing from "./ShelterTransactionalHousing";
import PWDService from "./PWDService";
import NutritionIntervention from "./NutritionIntervention";
import SanitationServiceProviders from "./SanitationServiceProviders";
import DumpingSite from "./DumpingSite";
import FoodVendors from "./FoodVendors";
import PublicSchoolFacility from "./PublicSchoolFacility";
import ClimateChangeIntervention from "./ClimateChangeIntervention";
import DistrictLEDActivityPlan from "./DistrictLEDActivityPlan";

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

const spcMeetingColumns = [
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Availability of Minutes of Meeting", dataIndex: "signatoriesMinutesStatus", key: "signatoriesMinutesStatus" }
];

const ETCMeetingColumns = [
    { title: "Quarterly ETC Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Availability of Minutes of Meeting", dataIndex: "signatoriesMinutesStatus", key: "signatoriesMinutesStatus" }
];

const internalAuditColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Audit", dataIndex: "audit", key: "audit" },
    { title: "Recommendation", dataIndex: "recommendation", key: "recommendation" }
];

const internalAuditMeetingColumns = [
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterRef", key: "invitationLetterRef" },
    { title: "Munites Reference", dataIndex: "muniteRef", key: "muniteRef" }
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


const subStructureColumns = [
    { title: " ", dataIndex: "meeting", key: "meeting" },
    { title: "1st Meeting Date", dataIndex: "firstMeeting", key: "firstMeeting" },
    { title: "2nd Meeting Date", dataIndex: "secondMeeting", key: "secondMeeting" },
    { title: "3rd Meeting Date", dataIndex: "thirdMeeting", key: "thirdMeeting" },
];


const revenueSharingColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "name" },
    { title: "Amount collected (GHS)", dataIndex: "collected", key: "collected" },
    { title: "Amount Ceded by MMDA (GHS)", dataIndex: "ceded", key: "ceded" },
    { title: "% Ceded", dataIndex: "percentage", key: "percentage" },
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

const renderWithLineBreaks = (str) => {
    return str.split(/<br\s*\/?>/i).map((line, index) => (
        <div key={index}>{line}</div>
    ));
};

const serviceDeliveryDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    {
        title: "Service Delivery Decisions", dataIndex: "service", key: "service",
        render: (cell, row) => renderWithLineBreaks(cell)
    }
];


const streetNamingColumn = [
    { title: "Street Naming and Property Addressing Data base (NOT Excel) available (Yes/No)", dataIndex: "street", key: "street" },
    { title: "Street Addressing Map of district displayed at Assembly Premises (Yes/No)", dataIndex: "displayed", key: "displayed" },
    { title: "Street Addressing Map of district displayed at Substructures (Yes/No)", dataIndex: "map", key: "map" }
];

const streetNamingInstallationColumn = [
    { title: "No. of streets available on database (a)", dataIndex: "street", key: "street" },
    { title: "Number of streets named (b)", dataIndex: "streetNamedNo", key: "streetNamedNo" },
    { title: "Number of street signage’s installed (c)", dataIndex: "streetNamedInstalled", key: "streetNamedInstalled" }
];


const districtHotlineNumberColumn = [
    { title: "Dedicated hotline exist (Yes/No)", dataIndex: "hotline", key: "hotline" },
    { title: "Hotline Number", dataIndex: "number", key: "number" },
    { title: "Hotline Number publicized on DA notice boards & at sub-structures (Yes/No)", dataIndex: "publication", key: "publication" }
];


// Main Component
const DPATAssessmentSheet = ({ props }) => {

    const contentToPrint = useRef(null);
    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [meetingDataGroup, setMeetingDataGroup] = useState();
    const [meetings, setMeetings] = useState(props?.meetings.meetings);
    const [members, setMembers] = useState(props?.members.members);
    const [subStructureActivity, setSubStructureActivity] = useState(props?.subActivity.activities);
    const [serviceProviders, setServiceProviders] = useState(props?.serviceProviders.providers);
    const [subStructuresMeetingData, setSubStructuresMeetingData] = useState([]);
    const [buildingInspectorate, setBuildingInspectorate] = useState(props?.inspectorates.inspectorates);
    const [clientServiceChaterData, setClientServiceChaterData] = useState([]);
    const [actityAndProject, setActityAndProject] = useState(null);
    const [districtGeneral, setDistrictGeneral] = useState(props?.districtGeneral.data);
    const [substructureExpendatureData, setSubstructureExpendatureData] = useState(null);
    const [districtHotlineNumberData, setDistrictHotlineNumberData] = useState([]);
    const [streetNamingData, setStreetNamingData] = useState([]);
    const [socialServicesData, setSocialServicesData] = useState([]);
    const [buildingInspectorateData, setBuildingInspectorateData] = useState(null);
    const [sanitationProvidersData, setSanitationProvidersData] = useState([]);
    const [memberFinanceData, setMemberFinanceData] = useState(null);
    const [followUps, setFollowUps] = useState(null);
    const [guards, setGuards] = useState(null);
    const [transportorsData, setTransportorsData] = useState([]);
    const [nutritionServcieData, setNutritionServcieData] = useState([]);
    const [inspectorateUnitData, setInspectorateUnitData] = useState(null);
    const [capacityBuilding, setCapacityBuilding] = useState(null);
    const [timeLineSubmission, setTimeLineSubmission] = useState(null);
    const [trainingEvaluation, setTrainingEvaluation] = useState(null);
    const [billing, setBilling] = useState(null);
    const [issuance, setIssuance] = useState(null);
    const [billingFollowup, setBillingFollowup] = useState(null);
    const [subStructureActivityData, setSubStructureActivityData] = useState(null);
    const [ecaCompositionData, setEcaCompositionData] = useState(null);
    const [subCommitteCompositionData, setSubCommitteCompositionData] = useState(null);
    const [decisionServiceData, setDecisionServiceData] = useState(null);
    const [decisionDeliveryData, setDecisionDeliveryData] = useState(null);
    const [decisionDeliveryListData, setDecisionDeliveryListData] = useState(null);
    const [managementActionServiceDeliveryData, setManagementActionServiceDeliveryData] = useState(null);
    const [ecaMeetingData, setEcaMeetingData] = useState(null);
    const [prccMeetingData, setPrccMeetingData] = useState(null);
    const [auditCommitteeMeetingData, setAuditCommitteeMeetingData] = useState(null);
    const [internalAuditData, setInternalAuditData] = useState(null);
    const [internalAuditMeetingData, setInternalAuditMeetingData] = useState([]);
    const [etcMeetingData, setEtcMeetingData] = useState(null);
    const [spcMeetingData, setSpcMeetingData] = useState(null);
    const [managementMeetingsData, setManagementMeetingsData] = useState(null);
    const [meetingDecisions, setMeetingDecisions] = useState(props?.decisions.decisions);
    const [subStructures, setSubStructures] = useState(props?.subStructures.sub);
    const [subReports, setSubReports] = useState(props?.subStructures.reports);
    const [subStructureData, setSubStructureData] = useState(null);
    const [subReportData, setSubReportData] = useState(null);
    const [cededRevenueUtilisationData, setCededRevenueUtilisationData] = useState(null);
    const [decisionsData, setDecisionsData] = useState(null);
    const [year, setYear] = useState(props?.year);
    const [district, setDistrict] = useState(props.district);
    const [cededRevenueUtilisationScore, setCededRevenueUtilisationScore] = useState(0);


    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        documentTitle: `${district?.label}_DPAT_Score_Sheet_${year}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });





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
        setBuildingInspectoratesData();
        setPermitRequestDataDisplay();
        setStreetNamingDataDisplay();
        setDistrictGeneralDataDisplay();
        setAllDataFromDistrictGeneral();
        setAllFromSchools();
        setAuditCommitteeDataDisplay();
        setSPCMeetingData();
        setInternalAuditCommitteeDataDisplay();
        subStructureExpenduture();
        setTransportorsDataDisplay();
        setInspectorateUnitDataDisplay();
        setSanitationServiceDataDisplay();
        setClientServiceChaterDataDisplay();
        setSocialServiceDataDisplay();
        setNutritionServiceDataDisplay();
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
        const serviceDeliveries = [];

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
            // console.log("Gando: ",serviceDeliveryDecion);
            serviceDeliveryDecion?.forEach(s => {
                serviceDeliveries.push({
                    decision: getAttributeValue("Decision", s),
                    action: getActionTakentByDecision(s.trackedEntity)
                });
            });

            const serviceDeliveryNo = serviceDeliveryDecion ? serviceDeliveryDecion.length : 0;
            const decisionList = serviceDeliveryDecion
                ?.map((val, index) => `${index + 1}. ${getAttributeValue("Decision", val)}`)
                .join('<br/>');

            const gam = `${getMeetingRank(index, "EC")}  General Assembly Meeting`;


            const decisionServiceDelivery = {
                key: index + 1, // Static key (can be dynamic)
                gam: gam, // Meeting type
                total: decNo, // Total Decision 
                serviceDecision: serviceDeliveryNo, // Meeting Date
                percentage: calculatePercentage(decNo, serviceDeliveryNo)
            };

            decisionOnServiceDeliveryNo += parseInt(serviceDeliveryNo);

            tempDecisions.push(decisionServiceDelivery);
            tempDecisionList.push({ gam: gam, service: decisionList })

        });



        setGaMeetingData({ meetings: temp, fulfillment: checkGaMeetingFulfillment(temp), numberOfDecision: decisionNo });
        setDecisionServiceData(tempDecisions);
        setDecisionDeliveryData(tempDecisionList);
        setDecisionDeliveryListData(serviceDeliveries);
        getIndicatorsData(decisionOnServiceDeliveryNo);


    };
    const getIndicatorsData = (decisionOnServiceDeliveryNo) => {
        axios.get(`/analytics.json?dimension=dx:y6pHogjYlez&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {

                const data = res.data?.rows;

                if (data?.length > 0) {
                    const percentage = calculatePercentage(decisionOnServiceDeliveryNo, data[0][2]);
                    const p = percentage;
                    setManagementActionServiceDeliveryData([{ no: decisionOnServiceDeliveryNo, service: data[0][2], percentage: p }])
                } else {
                    setManagementActionServiceDeliveryData([{ no: decisionOnServiceDeliveryNo, service: 0, percentage: 0 }])
                }

            }).catch(err => console.log(err));
    }

    const getActionTakentByDecision = (trackedEntity) => {
        const decisionReports = props.decisions.reports;

        let actions = '';

        decisionReports?.forEach(d => {
            if (trackedEntity === d.trackedEntity) {
                actions += d.dataValues[2]?.value || '';
            }
        });

        return actions.trim().length <= 1 ? '' : actions;
    };

    const calculatePercentage = (total, value) => {
        const totalNum = parseFloat(total);
        const valueNum = parseFloat(value);

        if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
            return 0;
        }

        return ((valueNum / totalNum) * 100).toFixed(2);
    };


    const getDecisionsByMeeting = (decisions, meetingReference) => {
        return decisions?.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Reference" && attr.value === meetingReference
            )
        );
    }


    const setSanitationServiceDataDisplay = () => {
        const aap = props?.plans?.aap;
        const ifg = props?.ifg?.data;
        const sanitationPlans = formatDataGeneral(aap, "Sector", "Sanitation") || [];
        const temp = [];
        let totalBudget = 0;
        let totalIGF = 0;

        sanitationPlans?.forEach(plan => {
            const currentBudget = getAttributeValue("Budget Allocated", plan);
            const tempDataSet = {
                plan: getAttributeValue("Activity Name", plan),
                budget: currentBudget
            };

            temp.push(tempDataSet);

            totalBudget += parseFloat(currentBudget);
        });

        ifg?.forEach(ig => {
            const currentIGFBudget = getAttributeValue("Amt Collected", ig);
            totalIGF += parseFloat(currentIGFBudget);
        });

        const percentage = calculatePercentage(totalIGF, totalBudget);
        const sanitationData = {
            ifgCollected: totalIGF,
            igfSpentOnSanitation: totalBudget,
            percentage
        }

        setSanitationProvidersData([sanitationData]);

    }

    const setSocialServiceDataDisplay = () => {
        const aap = props.plans?.aap;
        const reports = props.plans?.reports;
        const publications = props.publications?.data;
        const socialServicePlans = formatDataGeneral(aap, "Activity Type", "Social Service") || [];
        const publicationOfSS = formatDataGeneral(publications, "Evidence of Distribution Category", "Social Services") || [];
        const totalAap = aap?.length || 0;
        const totalSocialServicePlan = socialServicePlans.length;
        let totalSocialProtectionCompleted = 0;

        socialServicePlans?.forEach(plan => {
            const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

            if (currentReport) {

                currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed") {
                        totalSocialProtectionCompleted++;
                    }
                })
            }

        });


        const percentage = calculatePercentage(totalSocialServicePlan, totalSocialProtectionCompleted);
        const planData = {
            aapTotal: totalAap,
            aapSocialProtection: totalSocialServicePlan,
            aapSocialProtectionImp: totalSocialProtectionCompleted,
            percentage
        }

        const tempPublication = [];

        if (publicationOfSS?.length > 0) {
            const date = getAttributeValue("Published Date", publicationOfSS[0]);
            const tempData = {
                list: "YES",
                publication: "YES",
                summary: `The list of the social services was published on the ${date}`
            };

            tempPublication.push(tempData);
        }


        setSocialServicesData({ aap: [planData], publication: tempPublication });

    }

    const setClientServiceChaterDataDisplay = () => {
        const docs = props?.documents;
        const documents = formatDataGeneral(docs?.data, "DPAT | M&E Tool Type", "Client Service Unit Report") || [];
        const temp = [];

        documents.forEach(document => {

            const tempDataSet = {
                availability: "NO",
                approvalDate: getAttributeValue("Document Approval Date", document),
                docReference: getAttributeValue("DPAR | Reference Number", document),
                trackedEntity: document.trackedEntity
            };

            temp.push(tempDataSet);

        });

        temp.forEach(document => {
            const currentReport = docs.reports.find(rep => rep.trackedEntity === document.trackedEntity);

            if (currentReport) {
                temp[0].availability = "YES";
            }
        });


        setClientServiceChaterData(temp);

    }


    const countApplicationsForEachDomain = (data) => {
        const reports = props?.serviceProviders.reports;
        let noOfApplications = 0;
        let noOfApplicationsProcessed = 0;
        let noOfApplicationsProvided = 0;

        reports?.forEach(rep => {
            const currentReport = data.find(ser => ser.trackedEntity === rep.trackedEntity);

            if (currentReport) {
                const reps = rep.dataValues;
                reps.forEach(curRep => {
                    if (curRep.dataElement === "vue6siD7aka") {
                        noOfApplications += parseInt(curRep.value);
                    }

                    if (curRep.dataElement === "rn9j4w7pW9D") {
                        noOfApplicationsProcessed += parseInt(curRep.value);
                    }

                    if (curRep.dataElement === "N0YnoMAm445") {
                        noOfApplicationsProvided += parseInt(curRep.value);
                    }
                })

            }
        });

        return [noOfApplications, noOfApplicationsProcessed, noOfApplicationsProvided];
    }

    const setAllDataFromDistrictGeneral = () => {

        const hotline = [];
        let score = 0;

        if (districtGeneral?.length > 0) {
            const hotlineNumber = getAttributeValue("Public Hotline", districtGeneral[0]);
            hotline.push({
                hotline: hotlineNumber != "N/A" ? "YES" : "NO",
                number: hotlineNumber,
                publication: "YES"
            });

            if (hotlineNumber != "N/A") {
                score = 1;
            }
        }


        setDistrictHotlineNumberData({ data: hotline, score: score })

    }

    const setAllFromSchools = () => {
        console.log("hotline number: ", props?.schools);
        // Henry to count and populate the data here
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

        setBuildingInspectorateData(temp);

    }

    const setTransportorsDataDisplay = () => {
        const temp = [];
        const trans = props?.transportors.data;
        trans?.forEach((tr, index) => {

            const transportDateSet = {
                key: index + 1,
                business: getAttributeValue("Name of Business", tr),
                type: getAttributeValue("Transport Type", tr),
                typeVehicle: getAttributeValue("Type Vehicle", tr),
                vehicleQuantity: getAttributeValue("Quantity of Vehicles Owned", tr),
                noOfEmployee: getAttributeValue("Number of employees", tr)
            };

            temp.push(transportDateSet);
        });

        const transportationPlans = formatDataGeneral(props.plans?.aap, "Sector", "Roads") || [];

        const transp = {
            mtdp: transportationPlans.length > 0 ? "YES" : "NO",
            aapRoadsActivities: transportationPlans.length,
            aapRoadsActivitiesImp: 0,
            availability: temp.length > 0 ? "YES" : "NO"
        }
        setTransportorsData({ data: transp, transportors: temp });

    }

    //set data for nutrition service and food vendors
    const setNutritionServiceDataDisplay = () => {
        const aap = props.plans?.aap;
        const publications = props.publications?.data;
        const publicationOfNS = formatDataGeneral(publications, "Evidence of Distribution Category", "Nutrition Services") || [];

        const nutritionOrientedIntervention = formatDataGeneral(aap, "Activity Source", "Nutrition-Oriented Intervention Activity") || [];
        const foodVendors = props.foodVendors?.data;
        const foodVendorsReport = props.foodVendors?.reports;
        const foodTemp = [];

        foodVendors?.forEach(vendor => {
            const tempDataSet = {
                name: getAttributeValue("DCACT | Food Vendors - Name of vendor / Business", vendor),
                phone: getAttributeValue("Phone", vendor),
                tin: getAttributeValue("TIN", vendor),
                orientation: "YES"
            };

            foodTemp.push(tempDataSet);
        });

        // console.log("djiba: ", publicationOfNS)

        const temp = {
            aapTotal: aap?.length,
            aapNutrition: nutritionOrientedIntervention?.length,
            publication: publicationOfNS?.length > 0 ? "YES" : "NO"
        };

        setNutritionServcieData({ aap: [temp], vendors: foodTemp });
    }


    const setInspectorateUnitDataDisplay = () => {
        const temp = [];
        const tempReports = [];
        const units = props?.inspectorateUnits.data;
        const reports = props?.inspectorateUnits?.reports;

        units?.forEach((unit, index) => {

            const unitDataSet = {
                key: index + 1,
                date: getAttributeValue("Established Date", unit),
                officeAvailability: getAttributeValue("Has the office been made available for the unit", unit) ? "YES" : "NO",
                staffCategory: getAttributeValue("Category of Staff", unit),
                department: "No"
            };

            temp.push(unitDataSet);
        });

        reports?.forEach((rep, index) => {

            const reportDataSet = {
                key: index + 1,
                title: rep.dataValues[2]?.value,
                date: moment(rep.createdAt).format("YYYY-MM-DD"),
                issues: rep.dataValues[1]?.value
            };

            tempReports.push(reportDataSet);
        });

        setInspectorateUnitData({ data: temp, report: tempReports });

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

        setSubStructuresMeetingData({ data: temp, fulfillment: "Not Fulfiled" });
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

        const streets = props.streets.streets;
        const streetReport = props.streets.reports;
        let streetNo = streets?.length;
        let streetMapDisplayedAssemblyNo = 0;
        let streetMapDisplayedSubsNo = 0;
        let streetNamedNo = 0;
        let streetSignalInstalledNo = 0;

        if (streetNo > 0) {
            streetReport?.forEach(r => {
                r.dataValues.forEach(rep => {
                    if (rep.dataElement === "G67iyCp7yOr" && rep.value) {
                        streetNamedNo++;
                    } else if (rep.dataElement === "CWgnbQIpLnz" && rep.value) {
                        streetMapDisplayedAssemblyNo++;
                    } else if (rep.dataElement === "fSE6vasCbLa" && rep.value) {
                        streetMapDisplayedSubsNo++;
                    } else if (rep.dataElement === "DYW8oIgu2ld" && rep.value) {
                        streetSignalInstalledNo++;
                    }
                });
            });

        }

        const tempStreet = {
            street: streetNo > 0 ? "YES" : "NO",
            displayed: streetMapDisplayedAssemblyNo > 0 ? "YES" : "NO",
            map: streetMapDisplayedSubsNo > 0 ? "YES" : "NO"
        };

        const tempStreetCounter = {
            street: streetNo,
            streetNamedNo: streetNamedNo,
            streetNamedInstalled: streetSignalInstalledNo
        };

        const percentage = calculatePercentage(streetNamedNo, streetSignalInstalledNo);

        setStreetNamingData({ data: [tempStreet], counter: [tempStreetCounter], percentage });


    }

    const setDistrictGeneralDataDisplay = () => {
        const temp = [];
        // console.log("street: ", props.districtGeneral);
        /* 
        Sow to do the counting based on the requirement from the score sheet table
        Name from Sheet:4.3 Availability of Dedicated Hotline for the Vulnerable
        The variables to use:
         districtGeneral / props.districtGeneral

         state for the result:
            districtGeneralData
            
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

        if (meetings.length === 0) {
            return 'Not Fulfilled';
        }

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
        let fulfillment = 'Fulfilled';
        formatData(meetings, "Management Meetings").forEach((meeting, index) => {

            const hodFemaleAttendance = getAttributeValue("DPAT | Number of Participant - HoDs - Female", meeting) || 0;
            const hodMaleAttendance = getAttributeValue("DPAT | Number of Participant - HoDs - Male", meeting) || 0;
            const femaleAttendance = getAttributeValue("DPAT | Number of Attendance - Female", meeting) || 0;
            const maleAttendance = getAttributeValue("DPAT | Number of Attendance - Male", meeting) || 0;
            const hodAttendence = parseInt(hodFemaleAttendance) + parseInt(hodMaleAttendance);

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "Management Meetings"), // Meeting type
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // Meeting Date
                departments: 13, // Department Members
                hodAttendance: hodAttendence,
                attendance: parseInt(femaleAttendance) + parseInt(maleAttendance), // Signatory of Invitation Letter
            };

            if (hodAttendence < 10) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        })

        setManagementMeetingsData({ data: temp, fulfillment: fulfillment });
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
        let fulfillment = "Fulfilled";
        formatData(meetings, "PRCC").forEach((meeting, index) => {
            const invitationLetterRef = getAttributeValue("Invitation letter Ref. Number", meeting);
            const minuteFilesRef = getAttributeValue("Minute File Number", meeting);
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "GA"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterReference: invitationLetterRef, // Invitation Letter Ref
                signatoriesMinutesStatus: minuteFilesRef ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            if (!invitationLetterRef && !minuteFilesRef) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);

        });

        if (temp.length == 0) {
            fulfillment = "Not Fulfilled";
        }


        setPrccMeetingData({ data: temp, fulfillment: fulfillment });
    };

    const setInternalAuditCommitteeDataDisplay = () => {
        const temp = [];
        let fulfillment = "Fulfilled";
        formatData(meetings, "Audit Committee")?.forEach((meeting, index) => {

            const munitesRef = getAttributeValue("Minute File Number", meeting);
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterRef: getAttributeValue("Invitation letter Ref. Number", meeting),
                muniteRef: munitesRef
            };

            if (!munitesRef) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        })


        const audits = formatDataGeneral(props?.audits.data, "Audit Category", "Internal Audit") || [];

        if (temp.length == 0 || audits.length == 0) {
            fulfillment = "Not Fulfilled";
        }

        const auditTemp = [];

        audits.forEach((audit, index) => {
            auditTemp.push({
                key: index,
                no: index + 1,
                audit: getAttributeValue("Name", audit),
                recommendion: getAttributeValue("Audit Recommendation", audit)
            });
        })


        setInternalAuditMeetingData(temp);
        setInternalAuditData({ data: auditTemp, fulfillment });
    };

    const setAuditCommitteeDataDisplay = () => {
        const temp = [];
        let score = 0;
        formatData(meetings, "Audit Committee").forEach((meeting, index) => {

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "Audit Committee"), // Meeting type
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                recommendationsNo: getAttributeValue("DPAT | Number of Decisions", meeting)
            };

            temp.push(meetingDataState);
        })

        if (temp.length > 1) {
            score = 1;
        }

        setAuditCommitteeMeetingData({ data: temp, score: score });
    };


    const setETCMeetingData = () => {
        const temp = [];
        let fulfillment = "Fulfilled";
        formatData(meetings, "Technical Sub-Committee").forEach((meeting, index) => {

            const munitesFileRef = getAttributeValue("Minute File Number", meeting);

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                invitationLetterReference: munitesFileRef, // Invitation Letter Ref
                signatoriesMinutesStatus: munitesFileRef ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            if (!munitesFileRef) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });

        formatData(meetings, "Spatial Planning Committee (SPC)").forEach((meeting, index) => {

            const munitesFileRef = getAttributeValue("Minute File Number", meeting);

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                invitationLetterReference: munitesFileRef, // Invitation Letter Ref
                signatoriesMinutesStatus: munitesFileRef ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };


            if (!munitesFileRef) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });


        // if(temp.length < 12){
        //     fulfillment = "Not Fulfilled";
        // }


        setEtcMeetingData({ data: temp, fulfillment: fulfillment });
    };

    const setSPCMeetingData = () => {
        const temp = [];
        let fulfillment = "Fulfilled";
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

            const munitesFileRef = getAttributeValue("Minute File Number", meeting);

            if (!munitesFileRef) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });

        if (temp.length < 4) {
            fulfillment = "Not Fulfilled";
        }



        setSpcMeetingData({ data: temp, fulfillment: fulfillment });
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
                    decision: decision.attributes?.find(attr => attr.displayName === "Decision")?.value || "N/A",
                    reference: getAttributeValue("DPAT | Meeting Reference", decision)
                };

                temp.push(decisionDataState);
            });

        const finalTemp = [];

        meetings.forEach(mt => {
            const meetDecisions = temp.find(t => t.reference = getAttributeValue("Minute File Number", mt));

            finalTemp.push(meetDecisions);
        });


        setDecisionsData(finalTemp);
    };

    const subStructureExpenduture = () => {
        // console.log("Diaraye: ", props?.districtGeneral.reports)
        const reports = props?.districtGeneral.reports;
        const temp = [];
        reports?.forEach(re => {
            if (re.programStage === 'B0knjAzOqD4') {
                // console.log("Sow: ", re?.dataValues)
                temp.push({
                    quarter: "",
                    amountReleased: re?.dataValues[0]?.value,
                    twoPercentReleased: re?.dataValues[3]?.value,
                    spentOnSubstructure: re?.dataValues[1]?.value,
                    percentageSpentSubstructure: re?.dataValues[2]?.value,
                });
            }
        });

        let score = 1;

        temp.forEach((t, idx) => {
            t.quarter = `Quarter  ${idx + 1}`

            if (t.percentageSpentSubstructure < 90) {
                score = 0;
            }
        });

        setSubstructureExpendatureData({ data: temp, score });

    }

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
        setCededRevenueUtilisationScore(calculatePercentage(collectedTotal, cededTotal));
    };



    const setSubtructureActivities = () => {
        const temp = [];

        subStructureActivity?.forEach((sub, index) => {

            const subStructureActivityDataState = {
                key: index + 1,
                no: index + 1,
                activities: getAttributeValue("Activity Description", sub),
                name: getAttributeValue("DPAT | Name of Sub Structure", sub),
                source: getAttributeValue("Activity Funding Source", sub),
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

        setSubCommitteCompositionData({ data: temp, fulfillment: fulfillment });
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
        } else if ((type === 'Entity Tender Committee (ETC)') || (type === 'Audit Committee')) {
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
        <Layout style={{ padding: "20px", background: "#fff" }} >
            <div ref={contentToPrint} className="p-2">
                {/* Header */}
                <Header style={{ background: "#1890ff", color: "#fff", textAlign: "center", padding: "10px", height: 'auto' }}>
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
                    {/* Sow
                {JSON.stringify(props?.decisions?.decisions)} */}
                    {gaMeetingData && <GAMeeting
                        data={gaMeetingData}
                        year={year}
                        columns={generalAssemblyColumns}
                        decisions={decisionsData}
                        decisionColumns={generalAssemblyDecisionColumns}
                    />}
                    {/* General Assembly Meetings and Decision End */}
                    <hr />

                    {/* Approval of Annual Action Plan Budget Start */}

                    {meetingDataGroup && <AAPBudgetAproval
                        data={meetingDataGroup}
                        year={year}
                        columns={budgetColumns}
                    />}
                    {/* Approval of Annual Action Plan Budget End */}
                    <hr />

                    {/* Sub-Structures Meetings Start */}

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
                    <hr />

                    {/* ECA Meeting Start */}
                    {/* {JSON.stringify(ecaMeetingData)} */}
                    {ecaMeetingData && <ExecutiveCommitteeMember
                        data={ecaMeetingData}
                        year={year}
                        columns={ECAMeetingColumns}
                    />}
                    {/* ECA Meeting End */}
                    <hr />

                    {/* Sub Committe Meeting and Members section Start*/}

                    {memberFinanceData && <SubStructureCommiteeMeeting
                        data={subCommitteCompositionData}
                        year={year}
                        columns={subCommitteeCompositionColumns}
                        members={memberFinanceData}
                        memberColumns={membersColumns}
                    />}
                    {/* Sub Committe Meeting and Members section End*/}
                    <hr />


                    {managementMeetingsData && <ManagementMeeting
                        data={managementMeetingsData}
                        year={year}
                        columns={managementMeetingColumns}
                    />}
                    <hr />


                    {prccMeetingData && <PRCCMeeting
                        data={prccMeetingData}
                        year={year}
                        columns={PRCCMeetingColumns}
                    />}

                    <hr />

                    {/* Special Committee Meeting (SPC) Meeting Start */}
                    {etcMeetingData && <EntityTenderCommitteeMeeting
                        data={etcMeetingData}
                        year={year}
                        columns={spcMeetingColumns}
                    />}
                    {/* Special Committee Meeting (SPC) Meeting End*/}
                    <hr />

                    {/* Entity Tender Committee (ETC) Meeting Start*/}
                    {/* Sow to make sure there's one meeting each quater */}

                    {spcMeetingData && <SPCEntityTenderCommittee
                        data={spcMeetingData}
                        year={year}
                        columns={ETCMeetingColumns}
                    />}

                    <hr />

                    {internalAuditData && <InternalAuditUnitFunctionality
                        data={internalAuditData}
                        year={year}
                        columns={internalAuditColumns}
                        meetings={internalAuditMeetingData}
                        meetingColumns={internalAuditMeetingColumns}
                    />}

                    <hr />

                    <ClientServiceFunctionality
                        year={year}
                        district={district?.value}
                    />

                    <hr />

                    <AAPPublication
                        year={year}
                        district={district?.value}
                    />

                    <hr />


                    {/* Entity Tender Committee (ETC) Meeting End*/}

                    {/* <hr /> */}
                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        Annex 2: SECTION B – SERVICE DELIVERY INDICATORS
                    </h3>
                    {/* SDI- General Assembly Decisions Start*/}
                    {decisionServiceData && <GeneralAssemblyDecision
                        data={decisionServiceData}
                        year={year}
                        columns={serviceDecisionColumns}
                        decisionDeliveryData={decisionDeliveryData}
                        serviceDeliveryDecisionColumns={serviceDeliveryDecisionColumns}
                    />}
                    {/* SDI- General Assembly Decisions End */}

                    <hr />


                    <GeneralAssemblyManagementActions
                        year={year}
                        decisions={decisionDeliveryListData}
                        managementActionServiceDeliveryData={managementActionServiceDeliveryData}
                        district={district?.value}
                    />
                    <hr />

                    {/* 1.3 Assembly Support to Substructures Evidence of utilization of ceded revenue */}
                    <GASupport year={year}
                        cededRevenueUtilisationData={cededRevenueUtilisationData}
                        subStructureActivityData={subStructureActivityData}
                        cededRevenueUtilisationScore={cededRevenueUtilisationScore}
                        substructureExpendature={substructureExpendatureData}
                    />

                    <hr />

                    {/* Water Services */}
                    <WaterServices 
                        year={year}
                        district={district?.value}
                        />
                    <hr />

                    {/* Electricity Services */}
                    <ElectricityServices 
                        year={year}
                        district={district?.value} />
                    <hr />
                    
                    {/* Sanitation Service Provider List
                  */}
                    <SanitationServices year={year}
                        sanitationProvidersData={sanitationProvidersData} />
                    <hr />

                    {/* Evidence of establishment of Planning & Building Inspectorate Unit
                  */}
                    {/* {JSON.stringify(buildingInspectorate)} */}
                    <MaintenanceInfrastructure year={year}
                        buildingInspectorateData={buildingInspectorateData} />
                    <hr />

                    <ClientServiceCharter year={year}
                        ClientServiceCharter={clientServiceChaterData} />
                    <hr />

                    {/* 2.6 Services on the Transportation network */}
                    <TransportationNetworkService
                        year={year}
                        transportors={transportorsData}
                        district={district?.value} />
                    <hr />

                    {/* 3.1 Establishment of Planning and Building Inspectorate Unit */}
                    <BuildingInspectorateUnit
                        year={year}
                        units={inspectorateUnitData}
                        district={district?.value} />
                    <hr />

                    {/* 3.2 Planning and Development Permit Processing & Issuance */}
                    <PermitProcessingIssuance
                        year={year}
                        district={district?.value} />
                    <hr />
                    {/* 3.3 Street Naming Database and Property Addressing */}

                    <StreetNaming
                        year={year}
                        district={district?.value}
                        counterColumns={streetNamingInstallationColumn}
                        streets={streetNamingData}
                        columns={streetNamingColumn}
                    />
                    <hr />

                    {/* 4.1 Social Protection Services available in the District */}

                    <SocialProtectionServices
                        year={year}
                        district={district?.value}
                        services={socialServicesData}
                    />
                    <hr />

                    {/* 4.2 Availability of Shelters (Transitional Housing) in the District */}

                    <ShelterTransactionalHousing
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/* Dedicated Hotline Number for the District Start */}
                    {districtHotlineNumberData && <DistrictHotlineNumber
                        data={districtHotlineNumberData}
                        year={year}
                        columns={districtHotlineNumberColumn} />}
                    <hr />

                    {/* Service to People Living with Disabilities (PWDs) */}
                    <PWDService
                        year={year}
                        district={district?.value}
                    />
                    <hr />
                    {/*  Nutrition Services */}
                    <NutritionIntervention
                        year={year}
                        district={district?.value}
                        data={nutritionServcieData}
                    />
                    <hr />

                    {/*  Availability of Sanitation Service Providers */}
                    <SanitationServiceProviders
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/*  Availability of Well-Maintained Dumping Site or Engineered Landfills */}
                    <DumpingSite
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/*  Monitoring and Issuance of Certificates to Food and Beverage Vendors */}
                    <FoodVendors
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/*  Availability of Institutional Toilet Facilities and Water in Public Schools */}
                    <PublicSchoolFacility
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/*  Climate Change Interventions */}
                    <ClimateChangeIntervention
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    {/*  Availability of District LED Activities in the AAP */}
                    <DistrictLEDActivityPlan
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        Annex 3: SECTION C – PERFORMANCE INDICATORS
                    </h3>

                    <AAPImplementation
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <MonitoringProjectAndActivity year={year}
                        actityAndProject={actityAndProject} />
                    <hr />

                    <ContractManagementAndAdmins
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <FollowUpDeduction
                        year={year}
                        followUp={followUps}
                    />
                    <hr />

                    <EnvironmentalAndSocialSafeGuard
                        year={year}
                        guards={guards}
                    />
                    <hr />

                    <CapacityBuildingImplementation
                        year={year}
                        capacityBuilding={capacityBuilding}
                        timeLineSubmission={timeLineSubmission}
                    />
                    <hr />

                    <PostTrainingEvaluation
                        year={year}
                        trainingEvaluation={trainingEvaluation}
                    />
                    <hr />

                    <PaymentPoints
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <RateableRevenu
                        year={year}
                        district={district?.value}
                        billing={billing}
                        issuance={issuance}
                        followup={billingFollowup}
                    />
                    <hr />

                    {/* The rest of the tables need to be clarified by Fosu */}
                    <AuditCommitteeResponsiveness
                        year={year}
                        audits={auditCommitteeMeetingData}
                    />
                    <hr />

                    <AuditInfractions
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <EducationServiceSupport
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <HealthServiceSupport
                        year={year}
                        district={district?.value}
                    />
                    <hr />

                    <AgricultureSupport
                        year={year}
                        district={district?.value}
                    />
                    <hr />



                    {/* Print Button */}


                </Content>
            </div>
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

        </Layout>
    );
};

export default DPATAssessmentSheet;
