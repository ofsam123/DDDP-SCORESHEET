import React, { useEffect, useRef, useState } from "react";
import { Layout, Typography, Button, Row, Col, message, Spin,Modal } from "antd";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
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
import RateableRevenu from "./RateableRevenu";
import AuditCommitteeResponsiveness from "./AuditCommitteeResponsiveness";
import AuditInfractions from "./AuditInfractions";
import HealthServiceSupport from "./HealthServiceSupport";
import AgricultureSupport from "./AgricultureSupport";
import QualityAssuranceEditor from "./QualityAssuranceEditor";
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
import BusinessAndJobPromotion from "./BusinessAndJobPromotion";
import AgroProcessingFacilitySupport from "./AgroProcessingFacilitySupport";
import BusinessCommunityEngagement from "./BusinessCommunityEngagement";
import { checkECANDGAMeetingFulfillment, formatSubStatutoryMeetings, formatSubStructureMeetings, getFileLinkIfExist, getMeetingRank } from "../utils/utils";
import AuditCommiteeMeeting from "./AuditCommiteeMetting";
import AuditorGeneralGAMeeting from "./AuditorGeneralGAMeeting";
import TownHollMeeting from "./TownHollMeeting";
import { budgetApprovalColumns, ECAMeetingColumns, ETCMeetingColumns, gaMeetingColumns, internalAuditColumns, internalAuditMeetingColumns, managementMeetingColumns, membersColumns, PRCCMeetingColumns, revenueSharingColumns, serviceDecisionColumns, serviceDeliveryDecisionColumns, spcMeetingColumns, subCommitteeCompositionColumns, subStatutoryMeetingsColumns, subStructureColumns, subStructureEstablishmentColumns, townHallMeetingColumns } from "../utils/tableColums";
import DeepeningGenderMainstreaming from "./DeepeningGenderMainstreaming";
import instance from "../api/cmsapi";
import ScoreSheetSummary from "./ScoreSheetSummary";
<<<<<<< HEAD
import Petition from "./Petition";
=======
import CommentAndGabsSummary from "./CommentAndGabsSummary";
import PetitionCommittee from "./PetitionCommittee";
>>>>>>> origin/main

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const streetNamingColumn = [
    { title: "Street Naming and Property Addressing Database (NOT Excel) available (Yes/No)", dataIndex: "street", key: "street" },
    { title: "Street Addressing Map of district displayed at Assembly Premises (Yes/No)", dataIndex: "displayed", key: "displayed" },
    { title: "Street Addressing Map of district displayed at Substructures (Yes/No)", dataIndex: "map", key: "map" }
];

const streetNamingInstallationColumn = [
    { title: "No. of streets available on database (a)", dataIndex: "street", key: "street" },
    { title: "Number of streets named (b)", dataIndex: "streetNamedNo", key: "streetNamedNo" },
    { title: "Number of street signage’s installed (c)", dataIndex: "streetNamedInstalled", key: "streetNamedInstalled" }
];





// Main Component
const DPATAssessmentSheet = ({ props }) => {
    const contentToPrint = useRef(null);
    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [towHallMeetingData, setTowHallMeetingData] = useState([]);
    const [meetingDataGroup, setMeetingDataGroup] = useState();
    const [meetings, setMeetings] = useState(props?.meetings.meetings);
    const [members, setMembers] = useState(props?.members.members);
    const [ecMeetingTemp, setEcMeetingTemp] = useState("");
    const [subStructureActivity, setSubStructureActivity] = useState(props?.subActivity.activities);
    const [subStructuresMeetingData, setSubStructuresMeetingData] = useState([]);
    const [buildingInspectorate, setBuildingInspectorate] = useState(props?.inspectorates.inspectorates);
    const [districtGeneral, setDistrictGeneral] = useState(props?.districtGeneral.data);
    const [substructureExpendatureData, setSubstructureExpendatureData] = useState(null);
    const [districtHotlineNumberData, setDistrictHotlineNumberData] = useState([]);
    const [streetNamingData, setStreetNamingData] = useState([]);
    const [socialServicesData, setSocialServicesData] = useState([]);
    const [buildingInspectorateData, setBuildingInspectorateData] = useState(null);
    const [sanitationProvidersData, setSanitationProvidersData] = useState([]);
    const [memberFinanceData, setMemberFinanceData] = useState(null);
    const [guards, setGuards] = useState(null);
    const [transportorsData, setTransportorsData] = useState([]);
    const [nutritionServcieData, setNutritionServcieData] = useState([]);
    const [inspectorateUnitData, setInspectorateUnitData] = useState(null);
    const { user } = useAuth();
    const [subStructureActivityData, setSubStructureActivityData] = useState(null);
    const [ecaCompositionData, setEcaCompositionData] = useState(null);
    const [subStatutoryData, setSubStatutoryData] = useState(null);
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
    const [aapDocuments, setAapDocuments] = useState([]);
    const [year, setYear] = useState(props?.year);
    const [pAndP, setPAndP] = useState(props?.pAndP);
    const [deepGenderData, setDeepGenderData] = useState([]);
    const [sanitationServiceList, setSanitationServiceList] = useState([]);
    const [district, setDistrict] = useState(props.district);
    const [region, setRegion] = useState(props?.region);
    const [cededRevenueUtilisationScore, setCededRevenueUtilisationScore] = useState(0);
    const [assessmentStatus, setAssessmentStatus] = useState(null); // New state for assessment status
    const [progressLoad, setProgressLoad] = useState(false); // New state for loading

    const gaMeetingRef = useRef();
    const aapBudgetApprovalRef = useRef();
    const subStructureMeetingRef = useRef();
    const executiveCommitteeMemberRef = useRef();
    const subStructureCommitteeMeetingRef = useRef();
    const managementMeetingRef = useRef();
    const prccMeetingRef = useRef();
    const entityTenderCommitteeMeetingRef = useRef();
    const spcEntityTenderCommitteeRef = useRef();
    const internalAuditUnitFunctionalityRef = useRef();
    const auditCommitteeMeetingRef = useRef();
    const clientServiceFunctionalityRef = useRef();
    const aapPublicationRef = useRef();
    const auditorGeneralGAMeetingRef = useRef();
    const townHallMeetingRef = useRef();
    const generalAssemblyDecisionRef = useRef();
    const generalAssemblyManagementActionsRef = useRef();
    const gaSupportRef = useRef();
    const waterServicesRef = useRef();
    const electricityServicesRef = useRef();
    const sanitationServicesRef = useRef();
    const maintenanceInfrastructureRef = useRef();
    const clientServiceCharterRef = useRef();
    const transportationNetworkServiceRef = useRef();
    const buildingInspectorateUnitRef = useRef();
    const permitProcessingIssuanceRef = useRef();
    const streetNamingRef = useRef();
    const socialProtectionServicesRef = useRef();
    const shelterTransactionalHousingRef = useRef();
    const districtHotlineNumberRef = useRef();
    const pwdServiceRef = useRef();
    const deepeningGenderMainstreamingRef = useRef();
    const nutritionInterventionRef = useRef();
    const sanitationServiceProvidersRef = useRef();
    const dumpingSiteRef = useRef();
    const foodVendorsRef = useRef();
    const publicSchoolFacilityRef = useRef();
    const climateChangeInterventionRef = useRef();
    const districtLEDActivityPlanRef = useRef();
    const businessAndJobPromotionRef = useRef();
    const agroProcessingFacilitySupportRef = useRef();
    const businessCommunityEngagementRef = useRef();
    const aapImplementationRef = useRef();
    const monitoringProjectAndActivityRef = useRef();
    const contractManagementAndAdminsRef = useRef();
    const followUpDeductionRef = useRef();
    const environmentalAndSocialSafeGuardRef = useRef();
    const capacityBuildingImplementationRef = useRef();
    const postTrainingEvaluationRef = useRef();
    const rateableRevenueRef = useRef();
    const auditCommitteeResponsivenessRef = useRef();
    const auditInfractionsRef = useRef();
    const educationServiceSupportRef = useRef();
    const healthServiceSupportRef = useRef();
    const agricultureSupportRef = useRef();
const [showPetition, setShowPetition] = useState(true); 
    const currentUserRole = user?.user?.userRoles?.find(
        (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE" || role.name === "DPAT DISTRICT USERS"
    )?.name || "";
    const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
    const currentUsername = user?.user?.username || "";
    const currentFullName = user?.user?.fullName || "";

    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        documentTitle: `${district?.label}_DPAT_Score_Sheet_${year}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    // Fetch assessment status on component mount
    useEffect(() => {
        const fetchAssessmentStatus = async () => {
            try {
                const response = await instance.get(
                    `assessments/dpat/${district?.value}/${year}/DPAT`
                );
                setAssessmentStatus(response.data);
            } catch (error) {
                console.error("Failed to fetch assessment status:", error);
                setAssessmentStatus(null); // Set to null if API call fails
            }
        };

        if (district?.value && year) {
            fetchAssessmentStatus();
        }
    }, [district?.value, year]);

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
        setStreetNamingDataDisplay();
        setAllDataFromDistrictGeneral();
        setAuditCommitteeDataDisplay();
        setSPCMeetingData();
        setInternalAuditCommitteeDataDisplay();
        subStructureExpenduture();
        setTransportorsDataDisplay();
        setInspectorateUnitDataDisplay();
        setSanitationServiceDataDisplay();
        setSocialServiceDataDisplay();
        setNutritionServiceDataDisplay();
        sanitationServiceData();
        setTownHallMeeting();
        setDeepeningGender();
        // aapAndMTDPLinks();
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

    const setTownHallMeeting = () => {
        const reports = props.meetings.reports;
        const temp = [];

        setTowHallMeetingData(meetings);
        const townHallMeeting = formatData(meetings, "Town Hall Meetings") || [];
        let fulfillment = "Fulfilled";

        townHallMeeting.forEach((meeting, index) => {
            const minuteFileNumber = getAttributeValue("Minute File Number", meeting);
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "Vf1Fdd6ORkI", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);
            const meetingDataState = {
                key: index + 1,
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),

                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoryInvitationLetter: getAttributeValue("Who Signed the Invitation letter", meeting) === "PM" ?
                    "Presiding Member" : "Convener",
                minutes: minuteFileNumber,
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                invitation: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            temp.push(meetingDataState);

            if (!minuteLink) {
                fulfillment = "Not Fulfilled";
            }
        });

        if (temp.length < 2) {
            fulfillment = "Not Fulfilled";
        }

        setTowHallMeetingData({ data: temp, fulfillment });
    };

    const setMeetingData = () => {
        const temp = [];
        let decisionNo = 0;
        let decisionOnServiceDeliveryNo = 0;
        const tempDecisions = [];
        const tempDecisionList = [];
        const serviceDeliveries = [];
        const reports = props.meetings.reports;

        formatData(meetings, "GA").forEach((meeting, index) => {
            const minuteFileNumber = getAttributeValue("Minute File Number", meeting);
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "Vf1Fdd6ORkI", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meeting: getMeetingRank(index, "GA"),
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                agenda: getAttributeValue("DPAT | Meeting Agenda", meeting),
                interval: 0,
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting),
                signatoryInvitationLetter: getAttributeValue("Who Signed the Invitation letter", meeting) === "PM" ?
                    "Presiding Member" : "Convener",
                signatoriesMinutes: minuteFileNumber,
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                invitation: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Letter
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            meetingDataState.interval = getDaysBetween(meetingDataState.invitationDate, meetingDataState.meetingDate);
            const decNo = getAttributeValue("DPAT | Number of Decisions", meeting);
            decisionNo += parseInt(decNo);
            temp.push(meetingDataState);

            const serviceDeliveryDecion = getDecisionsByMeeting(meetingDecisions, minuteFileNumber);

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
                key: index + 1,
                gam: gam,
                total: decNo,
                serviceDecision: serviceDeliveryNo,
                percentage: calculatePercentage(decNo, serviceDeliveryNo)
            };

            decisionOnServiceDeliveryNo += parseInt(serviceDeliveryNo);

            tempDecisions.push(decisionServiceDelivery);
            tempDecisionList.push({ gam: gam, service: decisionList });
        });

        const finalTemp = temp.sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

        finalTemp.forEach((m, index) => {
            m.meeting = getMeetingRank(index, "GA");
        });

        setGaMeetingData({
            meetings: finalTemp,
            fulfillment: checkGaMeetingFulfillment(temp),
            numberOfDecision: decisionNo
        });

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
                    setManagementActionServiceDeliveryData([{ no: decisionOnServiceDeliveryNo, service: data[0][2], percentage: p }]);
                } else {
                    setManagementActionServiceDeliveryData([{ no: decisionOnServiceDeliveryNo, service: 0, percentage: 0 }]);
                }
            }).catch(err => console.log(err));
    };

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
                attr.displayName === "DPAT | Meeting Reference Number" && attr.value === meetingReference
            )
        );
    };

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
        };

        setSanitationProvidersData([sanitationData]);

    }

    const sanitationServiceData = () => {
        const temp = getAAPAndMTDPLinks("Sanitation");
        setSanitationServiceList(temp);
    }

    const getAAPAndMTDPLinks = (type = "default") => {
        const documents = props?.documents.data;
        const tempAAP = formatDataGeneral(documents, "DPAT | M&E Tool Type", "Annual Action Plan Progress Report") || [];
        const tempMTDP = formatDataGeneral(documents, "DPAT | M&E Tool Type", "Medium Term Development Plan (MTDP)") || [];

        const tempSaniationServiceProviders = formatDataGeneral(documents, "DPAT | M&E Tool Type", "Sanitation Service Provider") || [];
        const reports = props?.documents.reports;


        let aapLink = "";
        let mtdpLink = "";
        let sspLink = "";

        if (tempSaniationServiceProviders.length > 0) {
            sspLink = getFileLinkIfExist(reports, "MjPmcbueEdU", tempSaniationServiceProviders[0]?.trackedEntity);
        }

        if (type !== "default") {
            return [
                {
                    title: "Sanitation Service Provider Report",
                    link: sspLink ? (
                        <a
                            className="px-2 text-primary fw-bold text-decoration-underline"
                            href={`https://dddp.gov.gh/api/events/files?eventUid=${sspLink}&dataElementUid=MjPmcbueEdU`} target="_blank"
                            rel="noopener noreferrer"
                            title="Click here to see the uploaded document"
                        >
                            View Report
                        </a>
                    ) : (
                        "Not Uploaded"
                    ),
                }]
        }

        if (tempAAP.length > 0) {
            aapLink = getFileLinkIfExist(reports, "MjPmcbueEdU", tempAAP[0]?.trackedEntity);
        }

        if (tempMTDP.length > 0) {
            mtdpLink = getFileLinkIfExist(reports, "MjPmcbueEdU", tempMTDP[0]?.trackedEntity);
        }

        const links = [
            {
                title: "Annual Action Plan Progress Report",
                link: aapLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${aapLink}&dataElementUid=MjPmcbueEdU`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded Document"
                    >
                        View Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            },

            {
                title: "Meduim Term Development Plan Document",
                link: mtdpLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${mtdpLink}&dataElementUid=MjPmcbueEdU`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded documents"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            },
        ];

        setAapDocuments(links);

        return links;
    }

    const setDeepeningGender = () => {
        const documents = props?.documents.data;
        const tempAAP = formatDataGeneral(documents, "DPAT | M&E Tool Type", "Annual Action Plan Progress Report") || [];
        const socialWelfare = formatDataGeneral(documents, "DPAT | M&E Tool Type", "Social Welfare Progress Report") || [];
        const reports = props?.documents.reports;

        let aapLink = "";
        let swLink = "";

        if (tempAAP.length > 0) {
            aapLink = getFileLinkIfExist(reports, "MjPmcbueEdU", tempAAP[0]?.trackedEntity);
        }

        if (socialWelfare.length > 0) {
            swLink = getFileLinkIfExist(reports, "MjPmcbueEdU", socialWelfare[0]?.trackedEntity);
        }

        const links = [
            {
                title: "Annual Action Plan Progess Report",
                link: aapLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${aapLink}&dataElementUid=MjPmcbueEdU`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded Document"
                    >
                        View Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            },

            {
                title: "Social Welfare Progress Report",
                link: swLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${swLink}&dataElementUid=MjPmcbueEdU`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded documents"
                    >
                        View Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            },
        ];

        setDeepGenderData(links);

    }

    const setSocialServiceDataDisplay = () => {
        const aap = props.plans?.aap;
        const reports = props.plans?.reports;
        const publications = props.publications?.data;
        const socialServicePlans = formatDataGeneral(aap, "Activity Type", "Social Service") || [];
        const publicationOfSS = formatDataGeneral(publications, "Document Published", "Social Services") || [];
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
                });
            }
        });

        const percentage = calculatePercentage(totalSocialServicePlan, totalSocialProtectionCompleted);
        const planData = {
            aapTotal: totalAap,
            aapSocialProtection: totalSocialServicePlan,
            aapSocialProtectionImp: totalSocialProtectionCompleted,
            percentage
        };

        const tempPublication = [];

        if (publicationOfSS?.length > 0) {
            const date = getAttributeValue("Published Date", publicationOfSS[0]);
            const link = getAttributeValue("Website", publicationOfSS[0]);
            const tempData = {
                list: "YES",
                publication: link !== "N/A" ? "YES" : "NO",
                website: link,
                summary: `The list of the social services was published on the ${date}`
            };

            tempPublication.push(tempData);
        }

        const links = getAAPAndMTDPLinks();


        setSocialServicesData({ aap: [planData], publication: tempPublication, links });

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

        setDistrictHotlineNumberData({ data: hotline, score: score });
    };

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
    };

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
        };

        // sow-djiba

        //get uploaded documents if exist(AAP and MTDP)
        const links = getAAPAndMTDPLinks();

        setTransportorsData({ data: transp, transportors: temp, links });
    }

    const setNutritionServiceDataDisplay = () => {
        const aap = props.plans?.aap;
        const publications = props.publications?.data;
        const publicationReport = props.publications?.reports;
        const publicationOfNS = formatDataGeneral(publications, "Document Published", "Nutrition Services") || [];
        const nutritionOrientedIntervention = formatDataGeneral(aap, "Activity Source", "Nutrition-Oriented Intervention Activity") || [];
        const foodVendors = props.foodVendors?.data;
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

        const tempPublication = [];
        publicationOfNS.forEach((document, index) => {

            const reportLink = getFileLinkIfExist(publicationReport, "xjRCTFFiMA3", document.trackedEntity);

            const tempDataSet = {
                availability: reportLink ? "YES" : "NO",
                docReference: getAttributeValue("Document Reference ", document),
                channel: getAttributeValue("Publication Channel", document),
                webSiteLink: getAttributeValue("Website", document),
                document: reportLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=xjRCTFFiMA3`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Evidence
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            };

            tempPublication.push(tempDataSet);


        });

        const temp = {
            aapTotal: aap?.length,
            aapNutrition: nutritionOrientedIntervention?.length,
            publication: publicationOfNS?.length > 0 ? "YES" : "NO"
        };

        setNutritionServcieData({ aap: [temp], vendors: foodTemp, publications: tempPublication });
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
    };

    const setSubStructureMeetingDataDisplay = () => {
        const temp = [];
        const reports = props.meetings.reports;
        const generalAssemblyMeeting = formatData(meetings, "GA") || [];
        const executiveCommitteeMeeting = formatData(meetings, "EC") || [];
        const subStructureMeeting = formatData(meetings, "Sub Structure Committee") || [];
        const subTemp = [];

        subStructureMeeting.forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const dataSet = {
                key: index,
                meeting: getAttributeValue("Sub Structure Having the meeting", meeting),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            };

            subTemp.push(dataSet);
        });

        setEcMeetingTemp(subTemp);
        const formattedData = formatSubStructureMeetings(subTemp);

        const createMeetingData = (label, data) => ({
            key: label,
            meeting: `${label}`,
            firstMeeting: getAttributeValue("DPAT | Meeting Date", data[0]),
            secondMeeting: getAttributeValue("DPAT | Meeting Date", data[1]),
            thirdMeeting: getAttributeValue("DPAT | Meeting Date", data[2]),
        });

        temp.push(createMeetingData("General Assembly Meeting", generalAssemblyMeeting));
        temp.push(createMeetingData("Executive Committee Meeting", executiveCommitteeMeeting));

        temp.concat(formattedData);

        let fulfillment = "Fulfilled";

        formattedData.forEach(item => {
            if (
                item.firstLink === "Not Uploaded" ||
                item.firstLink === "Not Uploaded" ||
                item.firstLink === "Not Uploaded") {
                fulfillment = "Not Fulfilled";
            }
        });

        setSubStructuresMeetingData({ data: temp.concat(formattedData), fulfillment, subMeeting: formattedData });
    };

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
    };

    function checkGaMeetingFulfillment(gaMeetings) {
        if (gaMeetings.length < 3) {
            return 'Not Fulfilled';
        }

        for (const mt of gaMeetings) {
            const isIntervalTooShort = mt.interval < 14;
            const missingFields =
                !mt.invitationLetterReference ||
                !mt.signatoriesMinutes ||
                !mt.signatoryInvitationLetter ||
                mt.invitation === "Not Uploaded" ||
                mt.docs === "Not Uploaded";

            if (isIntervalTooShort || missingFields) {
                return 'Not Fulfilled';
            }
        }

        return 'Fulfilled';
    }

    const setManagementMeetingData = () => {
        const temp = [];
        let fulfillment = 'Fulfilled';
        const reports = props.meetings.reports;

        formatData(meetings, "Management Meetings").forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "Vf1Fdd6ORkI", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const hodFemaleAttendance = getAttributeValue("DPAT | Number of Participant - HoDs - Female", meeting) || 0;
            const hodMaleAttendance = getAttributeValue("DPAT | Number of Participant - HoDs - Male", meeting) || 0;
            const femaleAttendance = getAttributeValue("DPAT | Number of Attendance - Female", meeting) || 0;
            const maleAttendance = getAttributeValue("DPAT | Number of Attendance - Male", meeting) || 0;
            const hodAttendence = parseInt(hodFemaleAttendance) + parseInt(hodMaleAttendance);

            const meetingDataState = {
                key: index + 1,
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                departments: 13,
                hodAttendance: hodAttendence,
                attendance: parseInt(femaleAttendance) + parseInt(maleAttendance),
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                invitation: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            if ((hodAttendence < 10) || !recommendationLink || !minuteLink || !attendanceLink) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });

        const finalTemp = temp.sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

        finalTemp.forEach((m, index) => {
            m.meeting = getMeetingRank(index, "Management Meetings");
        });

        if(finalTemp.length === 0){
            fulfillment = "Not Fulfilled";
        }

        setManagementMeetingsData({ data: finalTemp, fulfillment });
    };

    const setECAMeetingData = () => {
        const temp = [];
        const gaMeeting = formatData(meetings, "GA");
        const ecaMeeting = formatData(meetings, "EC");
        const reports = props.meetings.reports;

        const gaMeetingDates = gaMeeting.map((meeting, index) => ({
            key: index + 1,
            date: getAttributeValue("DPAT | Meeting Date", meeting),
        }));

        ecaMeeting.forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meeting: getMeetingRank(index, "EC"),
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting),
                gaMeetingDate: gaMeetingDates[index]?.date || "",
                ecaMeetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            temp.push(meetingDataState);
        });

        const fulfillment = checkECANDGAMeetingFulfillment(temp);
        setEcaMeetingData({ data: temp, fulfillment });
    };

    const setPRCCMeetingData = () => {
        const temp = [];
        let fulfillment = "Fulfilled";
        const reports = props.meetings.reports;

        formatData(meetings, "PRCC").forEach((meeting, index) => {
            const invitationLetterRef = getAttributeValue("Invitation letter Ref. Number", meeting);
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: index + 1, // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                agenda: getAttributeValue("DPAT | Meeting Agenda", meeting),
                invitationLetterReference: invitationLetterRef,
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            if (!minuteLink || !recommendationLink || !attendanceLink) {
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
        const reports = props.meetings.reports;
        formatData(meetings, "Audit Committee")?.forEach((meeting, index) => {
            const munitesRef = getAttributeValue("Minute File Number", meeting);
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                agenda: getAttributeValue("DPAT | Meeting Agenda", meeting),
                invitationDate: getAttributeValue("DPAT | Meeting Date", meeting),
                invitationLetterRef: getAttributeValue("Invitation letter Ref. Number", meeting),
                muniteRef: munitesRef,
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded documented"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            if (!minuteLink || !attendanceLink) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });

        const audits = formatDataGeneral(props?.audits.data, "Audit Category", "Internal Audit") || [];

        if (temp.length === 0 || audits.length === 0) {
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
        });


        setInternalAuditMeetingData({ data: temp, fulfillment });
        setInternalAuditData({ data: auditTemp, fulfillment });
    };

    const setAuditCommitteeDataDisplay = () => {
        const temp = [];
        let score = 0;

        const reports = props.meetings.reports;

        formatData(meetings, "Audit Committee").forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meeting: getMeetingRank(index, "Audit Committee"),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                recommendationsNo: getAttributeValue("DPAT | Number of Decisions", meeting),
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            temp.push(meetingDataState);
        });

        if (temp.length > 1) {
            score = 3;
        }

        setAuditCommitteeMeetingData({ data: temp, score: score });
    };

    const setETCMeetingData = () => {
        const temp = [];
        let fulfillment = "Fulfilled";

        const reports = props.meetings.reports;

        formatData(meetings, "Spatial Planning Committee (SPC)").forEach((meeting, index) => {
            const munitesFileRef = getAttributeValue("Minute File Number", meeting);
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                agenda: getAttributeValue("DPAT | Meeting Agenda", meeting),
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                invitationLetterReference: munitesFileRef,
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded documents"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            if (index < 12) {
                if (!attendanceLink || !minuteLink || !recommendationLink) {
                    fulfillment = "Not Fulfilled";
                }
            }


            temp.push(meetingDataState);
        });

        if (temp.length < 12) {
            fulfillment = "Not Fulfilled";
        }

        const monthsWithMeetings = new Set(
            temp.map(m => new Date(m.meetingDate).getMonth())
        );

        const allMonths = Array.from({ length: 12 }, (_, i) => i);
        const missingMonths = allMonths.filter(m => !monthsWithMeetings.has(m));

        if (missingMonths.length !== 0) {
            fulfillment = "Not Fulfilled";
        }

        setEtcMeetingData({ data: temp, fulfillment: fulfillment });
    };

    const setSPCMeetingData = () => {
        const temp = [];
        let fulfillment = "Fulfilled";
        const reports = props.meetings.reports;

        formatData(meetings, "Entity Tender Committee (ETC)").forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const attendanceLink = getFileLinkIfExist(reports, "brh8c5XO30Q", meeting.trackedEntity);
            const recommendationLink = getFileLinkIfExist(reports, "LLgjgXRMB5x", meeting.trackedEntity);

            const meetingDataState = {
                key: index + 1,
                meeting: "",
                invitationDate: getAttributeValue("Invitation letter Date", meeting),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                agenda: getAttributeValue("DPAT | Meeting Agenda", meeting),
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting),
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                attendance: attendanceLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${attendanceLink}&dataElementUid=brh8c5XO30Q`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Attendance
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                recommendation: recommendationLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${recommendationLink}&dataElementUid=LLgjgXRMB5x`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Document
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            if (!minuteLink || !attendanceLink || !recommendationLink) {
                fulfillment = "Not Fulfilled";
            }

            temp.push(meetingDataState);
        });

        if (temp.length < 4) {
            fulfillment = "Not Fulfilled";
        }

        const finalTemp = temp.sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate));

        finalTemp.forEach((m, index) => {
            m.meeting = getMeetingRank(index, "Entity Tender Committee (ETC)");
        });

        setSpcMeetingData({ data: finalTemp, fulfillment: fulfillment });
    };

    const setMeetingBudgetData = () => {
        const temp = [];
        const meetingTypes = ["GA", "Budget Committee", "EC", "DMPCU"];
        let fulfillment = 'Not Fulfilled';

        meetingTypes?.forEach((type, index) => {
            const matchingMeeting = formatDataGroup(meetings, [type])[0];

            if (matchingMeeting) {
                const meetingDataState = {
                    key: index + 1,
                    meeting: type,
                    date: getAttributeValue("DPAT | Meeting Date", matchingMeeting),
                    documents: getAttributeValue("DPAT | Meeting Agenda", matchingMeeting),
                    decisions: getAttributeValue("AAP Approval Date", matchingMeeting),
                    trackedEntity: matchingMeeting.trackedEntity
                };

                const meetingDate = new Date(meetingDataState.decisions);
                const cutoffDate = new Date('2025-10-31');

                if ((meetingDate <= cutoffDate) && getAttributeValue("AAP Approval Date")) {
                    fulfillment = 'Fulfilled';
                }

                temp.push(meetingDataState);
            }
        });

        let approvalMinutesLink = "";

        temp.forEach(m => {
            if (m.meeting === "GA" && m.decisions) {
                const link = getFileLinkIfExist(props.meetings.reports, "LAe1t59jYNT", m.trackedEntity);

                if (link) {
                    approvalMinutesLink = link;
                }
            }
        });

        if (approvalMinutesLink) {
            fulfillment = 'Fulfilled';
        }

        const aapApprovalLink = approvalMinutesLink ? (
            <a
                className="px-2 text-primary fw-bold text-decoration-underline"
                href={`https://dddp.gov.gh/api/events/files?eventUid=${approvalMinutesLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                rel="noopener noreferrer"
                title="Click here to see the Approval minutes"
            >
                View Minutes of AAP approval
            </a>
        ) : (
            "There is no minutes uploaded for the Approval of AAP"
        );

        setMeetingDataGroup({ data: temp, fulfillment: fulfillment, aapApprovalLink });
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
        const reports = props?.districtGeneral.reports;
        const temp = [];
        reports?.forEach(re => {
            if (re.programStage === 'B0knjAzOqD4') {
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
            t.quarter = `Quarter  ${idx + 1}`;

            if (t.percentageSpentSubstructure < 90) {
                score = 0;
            }
        });

        setSubstructureExpendatureData({ data: temp, score });
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
        let fulfillment = "Fulfilled";

        subReports?.filter(rep => rep.dataValues.length > 0)
            .forEach((report, index) => {
                const instance = subStructures.find(sub => sub.trackedEntity === report.trackedEntity);
                let collected = 0;
                let ceded = 0;
                let percentage = 0;
                report.dataValues.forEach(rep => {
                    if (rep.dataElement === "eINk68pU9p3" && rep.value) {
                        collected = parseFloat(rep.value);
                    } else if (rep.dataElement === "VFPyDBUtEwI" && rep.value) {
                        ceded = parseFloat(rep.value);
                    } else if (rep.dataElement === "j75xIlW2yV9" && rep.value) {
                        percentage = parseFloat(rep.value);
                    }
                });

                if (percentage < 50) {
                    fulfillment = "Not Fulfilled";
                }

                const minuteLink = getFileLinkIfExist(subReports, "TxE2hVHyNuG", instance.trackedEntity);

                reportsTemp.push({
                    key: index + 1,
                    name: getAttributeValue("DPAT | Name of Sub Structure", instance),
                    collected,
                    ceded,
                    percentage,
                    docs: minuteLink ? (
                        <a
                            className="px-2 text-primary fw-bold text-decoration-underline"
                            href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=TxE2hVHyNuG`} target="_blank"
                            rel="noopener noreferrer"
                            title="Click here to see the uploaded evidence"
                        >
                            View Evidence
                        </a>
                    ) : (
                        "Not Uploaded"
                    ),
                });
            });

        setSubReportData({ data: reportsTemp, fulfillment });

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
        const statutoryMeetings = formatData(meetings, "Statutory Sub - Committee") || [];
        const tempMeeting = [];
        const reports = props.meetings.reports;

        statutoryMeetings.forEach((meeting, index) => {
            const minuteLink = getFileLinkIfExist(reports, "LAe1t59jYNT", meeting.trackedEntity);
            const meetingDataState = {
                key: index + 1,
                meeting: getAttributeValue("Sub Statutory Committee Department", meeting),
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting),
                minutes: getAttributeValue("Minute File Number", meeting),
                docs: minuteLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=LAe1t59jYNT`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded minutes"
                    >
                        View Minutes
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            };
            tempMeeting.push(meetingDataState);
        });

        let fulfillment = "Fulfilled";

        if (tempMeeting.length < 15) {
            fulfillment = "Not Fulfilled";
        }

        const formattedData = formatSubStatutoryMeetings(tempMeeting);

        for (let item of formattedData) {
            if (
                item.firstLink === "Not Uploaded" ||
                item.secondLink === "Not Uploaded" ||
                item.thirdLink === "Not Uploaded") {
                fulfillment = "Not Fulfilled";
                break;
            }
        }

        setSubStatutoryData({ data: formattedData, fulfillment: fulfillment });
    };


    const getDecisionRank = (index) => {
        switch (index) {
            case 0: return "1st";
            case 1: return "2nd";
            case 2: return "3rd";
            default: return "Other";
        }
    };

    const assessmentStartDate = new Date().toISOString().split("T")[0].split("-").map(Number);


    const handleStartAssessmentSubmit = async () => {
        setProgressLoad(true);
        const payload = {
            id: 0,
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: normalizedUserRole,
            // userRole: "DDDP_USER",
            type: "DPAT",
            districtId: district?.value,
            year: year,
            status: "Start",
            assessmentStartDate: assessmentStartDate,
            assessmentEndDate: null,
            reviewStartDate: null,
            reviewEndDate: null,
            closedDate: null,
        };

        const dddpData = {
            gaMeeting: gaMeetingRef.current?.getData(),
            aapBudgetApproval: aapBudgetApprovalRef.current?.getData(),
            subStructureMeeting: subStructureMeetingRef.current?.getData(),
            executiveCommitteeMember: executiveCommitteeMemberRef.current?.getData(),
            subStructureCommitteeMeeting: subStructureCommitteeMeetingRef.current?.getData(),
            managementMeeting: managementMeetingRef.current?.getData(),
            prccMeeting: prccMeetingRef.current?.getData(),
            entityTenderCommitteeMeeting: entityTenderCommitteeMeetingRef.current?.getData(),
            spcEntityTenderCommittee: spcEntityTenderCommitteeRef.current?.getData(),
            internalAuditUnitFunctionality: internalAuditUnitFunctionalityRef.current?.getData(),
            auditCommitteeMeeting: auditCommitteeMeetingRef.current?.getData(),
            clientServiceFunctionality: clientServiceFunctionalityRef.current?.getData(),
            aapPublication: aapPublicationRef.current?.getData(),
            auditorGeneralGAMeeting: auditorGeneralGAMeetingRef.current?.getData(),
            townHallMeeting: townHallMeetingRef.current?.getData(),
            generalAssemblyDecision: generalAssemblyDecisionRef.current?.getData(),
            generalAssemblyManagementActions: generalAssemblyManagementActionsRef.current?.getData(),
            gaSupport: gaSupportRef.current?.getData(),
            waterServices: waterServicesRef.current?.getData(),
            electricityServices: electricityServicesRef.current?.getData(),
            sanitationServices: sanitationServicesRef.current?.getData(),
            maintenanceInfrastructure: maintenanceInfrastructureRef.current?.getData(),
            clientServiceCharter: clientServiceCharterRef.current?.getData(),
            transportationNetworkService: transportationNetworkServiceRef.current?.getData(),
            buildingInspectorateUnit: buildingInspectorateUnitRef.current?.getData(),
            permitProcessingIssuance: permitProcessingIssuanceRef.current?.getData(),
            streetNaming: streetNamingRef.current?.getData(),
            socialProtectionServices: socialProtectionServicesRef.current?.getData(),
            shelterTransactionalHousing: shelterTransactionalHousingRef.current?.getData(),
            districtHotlineNumber: districtHotlineNumberRef.current?.getData(),
            pwdService: pwdServiceRef.current?.getData(),
            deepeningGenderMainstreaming: deepeningGenderMainstreamingRef.current?.getData(),
            nutritionIntervention: nutritionInterventionRef.current?.getData(),
            sanitationServiceProviders: sanitationServiceProvidersRef.current?.getData(),
            dumpingSite: dumpingSiteRef.current?.getData(),
            foodVendors: foodVendorsRef.current?.getData(),
            publicSchoolFacility: publicSchoolFacilityRef.current?.getData(),
            climateChangeIntervention: climateChangeInterventionRef.current?.getData(),
            districtLEDActivityPlan: districtLEDActivityPlanRef.current?.getData(),
            businessAndJobPromotion: businessAndJobPromotionRef.current?.getData(),
            agroProcessingFacilitySupport: agroProcessingFacilitySupportRef.current?.getData(),
            businessCommunityEngagement: businessCommunityEngagementRef.current?.getData(),
            aapImplementation: aapImplementationRef.current?.getData(),
            monitoringProjectAndActivity: monitoringProjectAndActivityRef.current?.getData(),
            contractManagementAndAdmins: contractManagementAndAdminsRef.current?.getData(),
            followUpDeduction: followUpDeductionRef.current?.getData(),
            environmentalAndSocialSafeGuard: environmentalAndSocialSafeGuardRef.current?.getData(),
            capacityBuildingImplementation: capacityBuildingImplementationRef.current?.getData(),
            postTrainingEvaluation: postTrainingEvaluationRef.current?.getData(),
            rateableRevenue: rateableRevenueRef.current?.getData(),
            auditCommitteeResponsiveness: auditCommitteeResponsivenessRef.current?.getData(),
            auditInfractions: auditInfractionsRef.current?.getData(),
            educationServiceSupport: educationServiceSupportRef.current?.getData(),
            healthServiceSupport: healthServiceSupportRef.current?.getData(),
            agricultureSupport: agricultureSupportRef.current?.getData(),
        };

        console.log("dddp: ", dddpData);

        try {
            // Step 1: Post to assessments endpoint
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

            // Step 2: Fetch assessment status from the provided endpoint
            
            const assessmentStatusResponse = await instance.get(
                `assessments/dpat/${district?.value}/${year}/DPAT`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); 
            // Update state with the fetched assessment data

            // Step 3: Post to comments endpoint
            const commentDate = new Date().toISOString().split("T")[0];
            const commentPayload = {
                id: 0,
                username: user?.user?.username,
                fullName: user?.user?.fullName,
                userRole: normalizedUserRole,
                // userRole: "DDDP_USER",
                type: "DPAT",
                districtId: district?.value,
                year: year,
                tableCommented: "assessment_start_DAPT", // Using a generic identifier; adjust as needed
                comments: `Assessment started automatically with status: ${fetchedStatus || "Start"}`,
                gaps: "",
                commentDate: commentDate,
                updateDate: commentDate,
                dddpDataDate: commentDate,
                dddpData: {
                    indicator: "assessment_start_DAPT",
                    tables: dddpData
                },
            };

            const commentResponse = await instance.post(`comments`, commentPayload);

            
            
            message.success({
                content: (
                    <div>
                        <p>Comment added successfully (Status: 201)</p>
                    </div>
                ),
                duration: 3,
                
            });
            
           
        } catch (error) {
            console.error("Failed to process assessment or comment:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to process: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };

    const handlePendingAssessmentSubmit = async () => {
        setProgressLoad(true);
        const assessmentEndDate = new Date().toISOString().split("T")[0];
        const assessmentStartDate = assessmentStatus?.assessmentStartDate || new Date().toISOString().split("T")[0]; // Use existing start date or fallback to today

        // Ensure assessmentStatus has an ID
        if (!assessmentStatus?.id) {
            message.error("No assessment ID found. Please start the assessment first.");
            setProgressLoad(false);
            return;
        }

        const payload = {
            id: assessmentStatus.id, // Use dynamic ID from assessmentStatus
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: normalizedUserRole,
            type: "DPAT",
            districtId: district?.value,
            year: year,
            status: "Pending",
            assessmentStartDate: assessmentStartDate,
            assessmentEndDate: assessmentEndDate,
            reviewStartDate: assessmentEndDate,
            reviewEndDate: null,
            closedDate: null,
        };

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
                `assessments/dpat/${district?.value}/${year}/DPAT`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); // Update state with the fetched assessment data




        } catch (error) {
            console.error("Failed to complete assessment or comment:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to complete assessment: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };

    const handleCompleteReviewSubmit = async () => {
        setProgressLoad(true);
        const reviewEndDate = new Date().toISOString().split("T")[0];
        const assessmentStartDate = assessmentStatus?.assessmentStartDate || new Date().toISOString().split("T")[0]; // Use existing start date or fallback to today
        const assessmentEndDate = assessmentStatus?.assessmentEndDate || new Date().toISOString().split("T")[0]; // Use existing end date or fallback to today

        // Ensure assessmentStatus has an ID
        if (!assessmentStatus?.id) {
            message.error("No assessment ID found. Please start the assessment first.");
            setProgressLoad(false);
            return;
        }

        const payload = {
            id: assessmentStatus.id, // Use dynamic ID from assessmentStatus
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: "DAQ",
            type: "DPAT",
            districtId: district?.value,
            year: year,
            status: "Completed",
            assessmentStartDate: assessmentStartDate,
            assessmentEndDate: assessmentEndDate,
            reviewStartDate: assessmentStatus?.reviewStartDate || assessmentEndDate, // Use existing review start date or fallback to assessmentEndDate
            reviewEndDate: reviewEndDate,
            closedDate: null,
        };

        try {
            // Step 1: Update assessment with PUT request
            const response = await instance.put(`assessments/${payload.id}`, payload);
            setAssessmentStatus(response.data);
            message.success({
                content: (
                    <div>
                        <p>Review completed successfully (Status: 200)</p>
                    </div>
                ),
                duration: 3,
            });

            // Step 2: Fetch assessment status from the provided endpoint
            const assessmentStatusResponse = await instance.get(
                `assessments/dpat/${district?.value}/${year}/DPAT`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); // Update state with the fetched assessment data




        } catch (error) {
            console.error("Failed to complete review or comment:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to complete review: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };

    const handleCloseReviewSubmit = async () => {
        setProgressLoad(true);
        const reviewEndDate = new Date().toISOString().split("T")[0];
        const assessmentStartDate = assessmentStatus?.assessmentStartDate || new Date().toISOString().split("T")[0]; // Use existing start date or fallback to today
        const assessmentEndDate = assessmentStatus?.assessmentEndDate || new Date().toISOString().split("T")[0]; // Use existing end date or fallback to today

        // Ensure assessmentStatus has an ID
        if (!assessmentStatus?.id) {
            message.error("No assessment ID found. Please start the assessment first.");
            setProgressLoad(false);
            return;
        }

        const payload = {
            id: assessmentStatus.id, // Use dynamic ID from assessmentStatus
            username: user?.user?.username,
            fullName: user?.user?.fullName,
            userRole: "DQA",
            type: "DPAT",
            districtId: district?.value,
            year: year,
            status: "Closed",
            assessmentStartDate: assessmentStartDate,
            assessmentEndDate: assessmentEndDate,
            reviewStartDate: assessmentStatus?.reviewStartDate || assessmentEndDate, // Use existing review start date or fallback to assessmentEndDate
            reviewEndDate: reviewEndDate,
            closedDate: null,
        };

        try {
            // Step 1: Update assessment with PUT request
            const response = await instance.put(`assessments/${payload.id}`, payload);
            setAssessmentStatus(response.data);
            message.success({
                content: (
                    <div>
                        <p>Review completed successfully (Status: 200)</p>
                    </div>
                ),
                duration: 3,
            });

            // Step 2: Fetch assessment status from the provided endpoint
            const assessmentStatusResponse = await instance.get(
                `assessments/dpat/${district?.value}/${year}/DPAT`
            );
            const fetchedStatus = assessmentStatusResponse.data?.status; // Adjust based on actual response structure
            setAssessmentStatus(assessmentStatusResponse.data); // Update state with the fetched assessment data


        } catch (error) {
            console.error("Failed to complete review or comment:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            message.error(`Failed to complete review: ${error.response?.data?.message || error.message}`);
        } finally {
            setProgressLoad(false);
        }
    };
    const hideComment = !assessmentStatus || assessmentStatus?.status === "Pending" || assessmentStatus?.status === "Completed" || assessmentStatus?.status === "Closed";
const shouldRenderQualityAssuranceEditor = assessmentStatus?.status && !["Completed", "Closed", "null", "Start", ].includes(assessmentStatus.status);
const shouldRenderQualityAssuranceEditor1 = !assessmentStatus || assessmentStatus?.status === "Start" || assessmentStatus?.status === "Pending";
  const showConfirm = () => {
    Modal.confirm({
      title: 'Start Assessment',
      content: `Do you want to start the assessment for this district?`,
      okText: 'Yes',
      cancelText: 'No',
      
      onOk() {
        handleStartAssessmentSubmit(); // Trigger the original endpoint call
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  const showPending = () => {
    Modal.confirm({
      title: 'Complete Assessment',
      content: `Do you want to Complete assessment for this district?`,
      okText: 'Yes',
      cancelText: 'No',
      
      onOk() {
        handlePendingAssessmentSubmit(); // Trigger the original endpoint call
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };


  
  const showComplete = () => {
    Modal.confirm({
      title: 'Complete Review',
      content: `Do you want to Complete Review for this district?`,
      okText: 'Yes',
      cancelText: 'No',
      
      onOk() {
        handleCompleteReviewSubmit(); // Trigger the original endpoint call
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };

  const showClose = () => {
    Modal.confirm({
      title: 'Close Review',
      content: `Do you want to Close Review for this district?`,
      okText: 'Yes',
      cancelText: 'No',
      
      onOk() {
        handleCloseReviewSubmit(); // Trigger the original endpoint call
      },
      onCancel() {
        // Do nothing on cancel
      },
    });
  };
// const shouldRenderSummaryScore = assessmentStatus?.status && !["Completed", "Closed", "null", "Start", ].includes(assessmentStatus.status);
    return (
        <Layout style={{ padding: "20px", background: "#fff" }}>
           
              <Col span={10} className="gutter-row">
      {(!assessmentStatus || ![null, "Start", "Pending", "Completed", "Closed"].includes(assessmentStatus?.status)) &&
        normalizedUserRole !== "DPAT_DISTRICT USERS" &&
        normalizedUserRole !== "DPAT_QUALITY ASSURANCE" && (
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
              CLICK TO START ASSESMENT FOR {year}
            </span>
          </Button>
        )}
    </Col>
            <div ref={contentToPrint} className="p-2">
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
                        <Col span={6} className="gutter-row">
                            <Text strong>Region: </Text> <Text>{region}</Text>
                        </Col>
                        <Col span={8} className="gutter-row">
                            <Text strong>Date of Assessment: </Text> <Text>{moment().format('MMMM Do YYYY, h:mm:ss A')}</Text>
                        </Col>

                      
                    </Row>
                     {(assessmentStatus?.status === "Closed" || 
        (assessmentStatus?.status === "Completed" && normalizedUserRole !== "DPAT_TECHNICAL TEAM")) && 
        showPetition && (

                      <h3 style={{ textAlign: "center", padding: "10px" }}>
                        MEMO SECTION
                    </h3>
                      )}

                     {(assessmentStatus?.status === "Closed" || 
        (assessmentStatus?.status === "Completed" && normalizedUserRole !== "DPAT_TECHNICAL TEAM")) && 
        showPetition && (
                    <QualityAssuranceEditor
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        assessmentStatus = {assessmentStatus?.status !== "Closed" }
                        district={district?.value}
                    />
                    )}


                     {(assessmentStatus?.status === "Closed" || 
        (assessmentStatus?.status === "Completed" && normalizedUserRole !== "DPAT_TECHNICAL TEAM")) && 
        showPetition && (

                     <>
                     <h3 style={{ textAlign: "center", padding: "10px" }}>
                        SUMMARY SCORING SHEET FOR DPAT INDICATORS
                    </h3>

                    
                    <ScoreSheetSummary
                        district={district}
                        region={region}
                         assessmentStatus = {assessmentStatus?.status !== "Closed" || assessmentStatus?.status !== "Completed"}
                        
                        year={year} />

                    <hr />
                    </>

)}

                    <Col align="end" style={{ marginBottom: "20px" }}>
        {normalizedUserRole === "DPAT_DISTRICT USERS" && assessmentStatus?.status === "Completed" && (
          
          <Button
            type="primary"
            onClick={() => setShowPetition(!showPetition)} // Toggle the state
            style={{
              backgroundColor: showPetition ? "#1890ff" : "#c80303ff", // Blue when true, red when false
              borderColor: showPetition ? "#1890ff" : "#c80303ff", // Match border to background
              marginLeft: "30px"
            }}
            loading={progressLoad}
          >
            <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
              {showPetition ? "COLLAPSE PETITION FORMS" : `RAISE A PETITION FOR ${district?.label}`}
            </span>
          </Button>
     )}
      </Col>
                

     

      {(assessmentStatus?.status === "Closed" || 
        (assessmentStatus?.status === "Completed" && normalizedUserRole !== "DPAT_TECHNICAL TEAM")) && 
        showPetition && (
        <Petition
          year={year}
          districtId={district?.value}
          hideComment={hideComment}
          assessmentStatus = {assessmentStatus?.status !== "Closed" }
          district={district?.value}
        />
      )}

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        Annex 1: SECTION A - COMPLIANCE INDICATORS
                    </h3>

                    {/* General Assembly Meetings and Decision Start */}
                    {gaMeetingData && <GAMeeting
                        ref={gaMeetingRef}
                        data={gaMeetingData}
                        year={year}
                        columns={gaMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* Approval of Annual Action Plan Budget Start */}
                    {meetingDataGroup && <AAPBudgetAproval
                        ref={aapBudgetApprovalRef}
                        data={meetingDataGroup}
                        year={year}
                        columns={budgetApprovalColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* Sub-Structures Meetings Start */}
                    {subStructuresMeetingData && subStructureData && subReportData && <SubStructureMeeting
                        ref={subStructureMeetingRef}
                        data={subStructuresMeetingData}
                        year={year}
                        columns={subStructureColumns}
                        establishment={subStructureData}
                        establishmentColumns={subStructureEstablishmentColumns}
                        revenueSharing={subReportData}
                        revenuSharingColumns={revenueSharingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* ECA Meeting Start */}
                    {ecaMeetingData && <ExecutiveCommitteeMember
                        ref={executiveCommitteeMemberRef}
                        data={ecaMeetingData}
                        year={year}
                        columns={ECAMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* Sub Statutory Committee Meeting and Members section Start */}
                    {subStatutoryData && <SubStructureCommiteeMeeting
                        ref={subStructureCommitteeMeetingRef}
                        data={subStatutoryData}
                        meetingColumns={subStatutoryMeetingsColumns}
                        columns={subCommitteeCompositionColumns}
                        memberColumns={membersColumns}
                        districtId={district?.value}
                        year={year}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {managementMeetingsData && <ManagementMeeting
                        ref={managementMeetingRef}
                        data={managementMeetingsData}
                        year={year}
                        columns={managementMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {prccMeetingData && <PRCCMeeting
                        ref={prccMeetingRef}
                        data={prccMeetingData}
                        year={year}
                        columns={PRCCMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* Special Committee Meeting (SPC) Meeting Start */}
                    {etcMeetingData && <EntityTenderCommitteeMeeting
                        ref={entityTenderCommitteeMeetingRef}
                        data={etcMeetingData}
                        year={year}
                        columns={spcMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {/* Entity Tender Committee (ETC) Meeting Start */}
                    {spcMeetingData && <SPCEntityTenderCommittee
                        ref={spcEntityTenderCommitteeRef}
                        data={spcMeetingData}
                        year={year}
                        columns={ETCMeetingColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {internalAuditData && <InternalAuditUnitFunctionality
                        ref={internalAuditUnitFunctionalityRef}
                        data={internalAuditData}
                        district={district?.value}
                        year={year}
                        columns={internalAuditColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {internalAuditMeetingData && <AuditCommiteeMeeting
                        ref={auditCommitteeMeetingRef}
                        meetings={internalAuditMeetingData}
                        meetingColumns={internalAuditMeetingColumns}
                        district={district?.value}
                        year={year}
                        hideComment={hideComment}
                    />}
                    <hr />

                    <ClientServiceFunctionality
                        ref={clientServiceFunctionalityRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <AAPPublication
                        ref={aapPublicationRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    {<AuditorGeneralGAMeeting
                        ref={auditorGeneralGAMeetingRef}
                        gaMeetings={gaMeetingData || []}
                        ecaMeeting={ecaMeetingData || []}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    {<TownHollMeeting
                        ref={townHallMeetingRef}
                        meetings={towHallMeetingData}
                        columns={townHallMeetingColumns}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        Annex 2: SECTION B – SERVICE DELIVERY INDICATORS
                    </h3>

                    {/* SDI- General Assembly Decisions Start */}
                    {decisionServiceData && <GeneralAssemblyDecision
                        ref={generalAssemblyDecisionRef}
                        data={decisionServiceData}
                        year={year}
                        columns={serviceDecisionColumns}
                        decisionDeliveryData={decisionDeliveryData}
                        serviceDeliveryDecisionColumns={serviceDeliveryDecisionColumns}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />}
                    <hr />

                    <GeneralAssemblyManagementActions
                        ref={generalAssemblyManagementActionsRef}
                        year={year}
                        decisions={decisionDeliveryListData}
                        managementActionServiceDeliveryData={managementActionServiceDeliveryData}
                        district={district?.value}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <GASupport
                        ref={gaSupportRef}
                        year={year}
                        cededRevenueUtilisationData={cededRevenueUtilisationData}
                        subStructureActivityData={subStructureActivityData}
                        cededRevenueUtilisationScore={cededRevenueUtilisationScore}
                        substructureExpendature={substructureExpendatureData}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <WaterServices
                        ref={waterServicesRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <ElectricityServices
                        ref={electricityServicesRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <SanitationServices
                        ref={sanitationServicesRef}
                        year={year}
                        sanitationProvidersData={sanitationProvidersData}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <MaintenanceInfrastructure
                        ref={maintenanceInfrastructureRef}
                        year={year}
                        buildingInspectorateData={buildingInspectorateData}
                        districtId={district?.value}
                        hideComment={hideComment}
                    />
                    <hr />

                    <ClientServiceCharter
                        ref={clientServiceCharterRef}
                        year={year}
                        districtId={district?.value}
                        publications={props.publications}
                    />
                    <hr />

                    <TransportationNetworkService
                        ref={transportationNetworkServiceRef}
                        year={year}
                        transportors={transportorsData}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <BuildingInspectorateUnit
                        ref={buildingInspectorateUnitRef}
                        year={year}
                        units={inspectorateUnitData}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <PermitProcessingIssuance
                        ref={permitProcessingIssuanceRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <StreetNaming
                        ref={streetNamingRef}
                        year={year}
                        district={district?.value}
                        counterColumns={streetNamingInstallationColumn}
                        streets={streetNamingData}
                        districtId={district?.value}
                        hideComment={hideComment}
                        columns={streetNamingColumn}
                    />
                    <hr />

                    <SocialProtectionServices
                        ref={socialProtectionServicesRef}
                        year={year}
                        district={district?.value}
                        districtId={district?.value}
                        hideComment={hideComment}
                        services={socialServicesData}
                    />
                    <hr />

                    <ShelterTransactionalHousing
                        ref={shelterTransactionalHousingRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <DistrictHotlineNumber
                        ref={districtHotlineNumberRef}
                        year={year}
                        districtId={district?.value}
                    />
                    <hr />

                    <PWDService
                        ref={pwdServiceRef}
                        year={year}
                        district={district?.value}
                        hideComment={hideComment}
                        districtId={district?.value}
                    />
                    <hr />

                    <DeepeningGenderMainstreaming
                        ref={deepeningGenderMainstreamingRef}
                        year={year}
                        districtId={district?.value}
                        data={deepGenderData}
                    />
                    <hr />

                    {nutritionServcieData && <NutritionIntervention
                        ref={nutritionInterventionRef}
                        year={year}
                        district={district?.value}
                        districtId={district?.value}
                        hideComment={hideComment}
                        data={nutritionServcieData}
                    />}
                    <hr />

                    <SanitationServiceProviders
                        ref={sanitationServiceProvidersRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                        document={sanitationServiceList}
                    />
                    <hr />

                    <DumpingSite
                        ref={dumpingSiteRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <FoodVendors
                        ref={foodVendorsRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <PublicSchoolFacility
                        ref={publicSchoolFacilityRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <ClimateChangeIntervention
                        ref={climateChangeInterventionRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <DistrictLEDActivityPlan
                        ref={districtLEDActivityPlanRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <BusinessAndJobPromotion
                        ref={businessAndJobPromotionRef}
                        year={year}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <AgroProcessingFacilitySupport
                        ref={agroProcessingFacilitySupportRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <BusinessCommunityEngagement
                        ref={businessCommunityEngagementRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        Annex 3: SECTION C – PERFORMANCE INDICATORS
                    </h3>

                    <AAPImplementation
                        ref={aapImplementationRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                        data={aapDocuments}
                    />
                    <hr />

                    <MonitoringProjectAndActivity
                        ref={monitoringProjectAndActivityRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <ContractManagementAndAdmins
                        ref={contractManagementAndAdminsRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                        data={pAndP}
                    />
                    <hr />

                    <FollowUpDeduction
                        ref={followUpDeductionRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                        data={pAndP}
                    />
                    <hr />

                    <EnvironmentalAndSocialSafeGuard
                        ref={environmentalAndSocialSafeGuardRef}
                        year={year}
                        districtId={district?.value}
                        guards={guards}
                    />
                    <hr />

                    <CapacityBuildingImplementation
                        ref={capacityBuildingImplementationRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <PostTrainingEvaluation
                        ref={postTrainingEvaluationRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <RateableRevenu
                        ref={rateableRevenueRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <AuditCommitteeResponsiveness
                        ref={auditCommitteeResponsivenessRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        audits={auditCommitteeMeetingData}
                    />
                    <hr />

                    <AuditInfractions
                        ref={auditInfractionsRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <EducationServiceSupport
                        ref={educationServiceSupportRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <HealthServiceSupport
                        ref={healthServiceSupportRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    <hr />

                    <AgricultureSupport
                        ref={agricultureSupportRef}
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        district={district?.value}
                    />
                    
                    <hr />
                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />

                  {shouldRenderQualityAssuranceEditor1&& (
                    <>
                     <h3 style={{ textAlign: "center", padding: "10px" }}>
                        SUMMARY SCORING SHEET FOR DPAT INDICATORS
                    </h3>

                    
                    <ScoreSheetSummary
                        district={district}
                        region={region}
                        
                        year={year} />

                    <hr />
                    </>
                     )}

                   

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        ANNEX 5 SUMMARY OF COMMENTS AND GAPS
                    </h3>
                    <CommentAndGabsSummary
                        district={district}
                        region={region}
                        year={year} />

                    <hr />

                    <div style={{ height: '4px', backgroundColor: '#000', width: '100%', margin: '20px 0' }} />


 {shouldRenderQualityAssuranceEditor&& (
 

                    <h3 style={{ textAlign: "center", padding: "10px" }}>
                        MEMO SECTION
                    </h3>
)}

                    {shouldRenderQualityAssuranceEditor && (
 

                    <QualityAssuranceEditor
                        year={year}
                        districtId={district?.value}
                        hideComment={hideComment}
                        assessmentStatus = {assessmentStatus?.status !== "Closed" }
                        district={district?.value}
                    />
                    )}

                    {/* Print Button */}


                </Content>
            </div>
            <div style={{ textAlign: "right" }}>
                {/* <Col span={10} className="gutter-row"> */}

                {/* </Col> */}
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
                {normalizedUserRole === "DPAT_TECHNICAL TEAM" && assessmentStatus?.status === "Start" && (
                    <Button
                        type="primary"
                        onClick={showPending}
                        style={{
                            backgroundColor: "#2e7f05ff",
                            borderColor: "#2e7f05ff",
                            marginLeft: "30px"
                        }}
                        loading={progressLoad}
                    >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                            COMPLETE ASSESSMENT
                        </span>
                    </Button>
                )}

                {normalizedUserRole === "DPAT_QUALITY ASSURANCE" && assessmentStatus?.status === "Pending" && (
                    <Button
                        type="primary"
                        onClick={showComplete}
                        style={{
                            backgroundColor: "#338e06ff",
                            borderColor: "#338e06ff",
                            marginLeft: "30px"
                        }}
                        loading={progressLoad}
                    >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                            COMPLETE REVIEW
                        </span>
                    </Button>
                )}

                {normalizedUserRole === "DPAT_QUALITY ASSURANCE" && assessmentStatus?.status === "Completed" && (
                    <Button
                        type="primary"
                        onClick={showClose}
                        style={{
                            backgroundColor: "#a00000ff",
                            borderColor: "#a00000ff",
                            marginLeft: "30px"
                        }}
                        loading={progressLoad}
                    >
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                            CLOSE REVIEW
                        </span>
                    </Button>
                )}




            </div>


            <hr />

        </Layout>
    );
};

export default DPATAssessmentSheet;
