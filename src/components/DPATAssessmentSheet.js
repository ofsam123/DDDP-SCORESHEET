import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

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
    { title: "Sub-Structure", dataIndex: "subStructure", key: "subStructure" },
    { title: "1st Meeting Date", dataIndex: "firstMeeting", key: "firstMeeting" },
    { title: "2nd Meeting Date", dataIndex: "secondMeeting", key: "secondMeeting" },
    { title: "3rd Meeting Date", dataIndex: "thirdMeeting", key: "thirdMeeting" },
];

const subStructuresData = [
    { key: "1", subStructure: "Executive Committee", firstMeeting: "12-Jan", secondMeeting: "15-Apr", thirdMeeting: "20-Jul" },
    { key: "2", subStructure: "Finance Committee", firstMeeting: "10-Feb", secondMeeting: "14-May", thirdMeeting: "22-Aug" },
];

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

// Main Component
const DPATAssessmentSheet = ({ props }) => {

    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [meetingDataGroup, setMeetingDataGroup] = useState(null);
    const [meetings, setMeetings] = useState(props?.meetings.meetings);
    const [members, setMembers] = useState(props?.members.members);
    const [subStructureActivity, setSubStructureActivity] = useState(props?.subActivity.activities);
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

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        setMeetingData();
        setDecisionData();
        setMeetingBudgetData();
        setSubtructureEstablishmentsData();
        setECAMeetingData();
        setManagementMeetingData();
        setPRCCMeetingData();
        setETCMeetingData();
        setMemberData();
        setMemberEcaCompositionData();
        setSubCommitteesCompositionData();
        setSubtructureActivities();

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

            // console.log("Munites decision: ",meetingDecisions)

            const serviceDeliveryDecion = getDecisionsByMeeting(meetingDecisions, minuteFileNumber);
            // console.log("dec: ", serviceDeliveryDecion)
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

        setManagementMeetingsData(temp);
    };

    const setECAMeetingData = () => {
        const temp = [];
        formatData(meetings, "EC").forEach((meeting, index) => {
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "EC"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                gaMeetingDate: 'date', // gaMeeting Date
                ecaMeetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // ecaMeeting Date
                signatoriesMinutesStatus: getAttributeValue("Minute File Number", meeting) ?
                    "YES" : "NO", // Signatory of Invitation Letter
            };

            temp.push(meetingDataState);
        })

        setEcaMeetingData(temp);
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

        setPrccMeetingData(temp);
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
        })

        setEtcMeetingData(temp);
    };

    const setMeetingBudgetData = () => {
        const temp = [];
        const meetingTypes = ["GA", "Budget Committee", "EC", "DMPCU"];
        let fulfillment = 'Not Fulfilled';

        meetingTypes?.forEach((type, index) => {
            // Get the first meeting that matches the current meeting type
            const matchingMeeting = formatDataGroup(meetings, [type])[0];

            if (matchingMeeting) { // Ensure there's a match before adding
                const date = getAttributeValue("DPAT | Meeting Date", matchingMeeting);
                const meetingDataState = {
                    key: index + 1,
                    meeting: type,
                    date: getAttributeValue("DPAT | Meeting Date", matchingMeeting),
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
        const temp = [];

        formatDataGeneral(members, "DPAT | MMDA Unit", "Assembly Member")
            ?.forEach((member, index) => {
                const memberDataState = {
                    key: index + 1,
                    no: index + 1,
                    name: getAttributeValue("DPAT |  Statutory Sub Committee", member),
                    number: 0
                };

                temp.push(memberDataState);
            });

        setSubCommitteCompositionData(temp);
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
                    DISTRICT ASSEMBLY PERFORMANCE ASSESSMENT REPORT {year && <span>{year}</span>}
                </Title>
            </Header>

            <Content style={{ padding: "20px" }}>
                {/* General Assembly Meetings */}
                <Title level={3}>General Assembly Meetings</Title>
                {gaMeetingData && (
                    <h6 style={{ marginBottom: "20px", color: "grey" }}>
                        At least three {gaMeetingData.meetings.length} ordinary meetings and minutes were held and duly recorded
                        and signed by both the PM and MCD. The table below illustrates
                    </h6>
                )}

                
                <Row style={{ marginBottom: "20px" }}>
                    {gaMeetingData && <h4>Number of Decisions: {gaMeetingData?.numberOfDecision}</h4>}
                </Row>
                <Row style={{ display: "flex", alignItems: "flex-start" }}>
                    {gaMeetingData && (
                        <>
                            <div style={{ width: "90%", paddingRight: "10px" }}>
                                <Table
                                    columns={generalAssemblyColumns}
                                    dataSource={gaMeetingData.meetings}
                                    pagination={false}
                                    bordered
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div
                                style={{
                                    width: "10%",
                                    marginTop: "100px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    color: gaMeetingData.fulfillment === "Not Fulfilled" ? "red" : "green",
                                    textAlign: "center",
                                }}
                            >
                                {gaMeetingData.fulfillment}
                            </div>
                        </>
                    )}
                </Row>

                {/* General Assembly Meetings Decision */}
                <Title level={3} style={{ marginTop: "30px" }}>General Assembly Meetings Decision</Title>
                <Row style={{ display: "flex", alignItems: "flex-start" }}>
                    {decisionsData && (
                        <>
                            <div style={{ width: "90%", paddingRight: "10px" }}>
                                <Table
                                    columns={generalAssemblyDecisionColumns}
                                    dataSource={decisionsData}
                                    pagination={false}
                                    bordered
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div
                                style={{
                                    width: "10%",
                                    marginTop: "100px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    color: gaMeetingData?.fulfillment === "Not Fulfilled" ? "red" : "green",
                                    textAlign: "center",
                                }}
                            >
                                {gaMeetingData?.fulfillment || "Loading..."}
                            </div>
                        </>
                    )}
                </Row>

                {/* Approval of Budget */}
                <Title level={3} style={{ marginTop: "30px" }}>Approval of Annual Action Plan & Budget</Title>
                <Row style={{ display: "flex", alignItems: "flex-start" }}>
                    {meetingDataGroup && (
                        <>
                            <div style={{ width: "90%", paddingRight: "10px" }}>
                                <Table
                                    columns={budgetColumns}
                                    dataSource={meetingDataGroup.data}
                                    pagination={false}
                                    bordered
                                    style={{ width: "100%" }}
                                /> 
                            </div>
                            <div
                                style={{
                                    width: "10%",
                                    marginTop: "100px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    color: meetingDataGroup.fulfillment === "Not Fulfilled" ? "red" : "green",
                                    textAlign: "center",
                                }}
                            >
                                {meetingDataGroup.fulfillment}
                            </div>
                        </>
                    )}
                </Row>

                {/* Sub-Structures Meetings */}
                <Title level={3} style={{ marginTop: "30px" }}>Meetings of the Sub-Structures</Title>
                <Table columns={subStructureColumns} dataSource={subStructuresData} pagination={false} bordered />

                {/* II.	Evidence of establishment of sub-structures */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of establishment of sub-structures</Title>
                {subStructureData && <Table columns={subStructureEstablishmentColumns} dataSource={subStructureData} pagination={false} bordered />}

                {/* Revenue Sharing */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Revenue Sharing</Title>
                {subReportData && <Table columns={revenueSharingColumns} dataSource={subReportData} pagination={false} bordered />}

                {/* ECA Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of EC/A meetings prior to GAM</Title>
                {ecaMeetingData && <Table columns={ECAMeetingColumns} dataSource={ecaMeetingData} pagination={false} bordered />}

                {/* ECA Composition */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Composition of EC/A</Title>
                {ecaCompositionData && <Table columns={ecaCompositionColumns} dataSource={ecaCompositionData} pagination={false} bordered />}

                {/* Members section */}
                <Title level={3} style={{ marginTop: "30px" }}>Membership of Statutory Sub-Committees</Title>
                {memberFinanceData && <Table columns={membersColumns} dataSource={memberFinanceData} pagination={false} bordered />}

                {/* Evidence of Sub Committee Composition --Henry sum them and count by sub commity name*/}
                {/* Also desagrate the members and display list of members by sub-committee
                    (See the sample sheet as guide:Membership of Statutory Sub-Committees) */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of composition of sub-committees – Summary</Title>
                {subCommitteCompositionData && <Table columns={subCommitteeCompositionColumns} dataSource={subCommitteCompositionData} pagination={false} bordered />}

                {/* Management Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of quarterly Management Meetings</Title>
                {managementMeetingsData && <Table columns={managementMeetingColumns} dataSource={managementMeetingsData} pagination={false} bordered />}

                {/* PRCC Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Meetings of PRCC</Title>
                {prccMeetingData && <Table columns={PRCCMeetingColumns} dataSource={prccMeetingData} pagination={false} bordered />}

                {/* Entity Tender Committee (ETC) Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of Entity Tender Committee (ETC) meeting</Title>
                {etcMeetingData && <Table columns={ETCMeetingColumns} dataSource={etcMeetingData} pagination={false} bordered />}

                <hr />
                <h5>
                    Annex 2: SECTION B – SERVICE DELIVERY INDICATORS
                </h5>

                {/* Henry and Samu to give the score and of bellow tables */}

                {/* Entity Tender Committee (ETC) Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>SDI 10 - 1.1 General Assembly Decisions</Title>
                {decisionServiceData && <Table columns={serviceDecisionColumns} dataSource={decisionServiceData} pagination={false} bordered />}

                <Title level={3} style={{ marginTop: "30px" }}>Service Delivery Decisions</Title>
                {decisionDeliveryData && <Table columns={serviceDeliveryDecisionColumns} dataSource={decisionDeliveryData} pagination={false} bordered />}

                <Title level={3} style={{ marginTop: "30px" }}>Evidence of management actions on service delivery decisions</Title>
                {managementActionServiceDeliveryData && <Table
                    columns={managementServiceDeliveryActionColumns}
                    dataSource={managementActionServiceDeliveryData}
                    pagination={false} bordered />}

                {/* 1.3 Assembly Support to Substructures Evidence of utilization of ceded revenue
                 */}
                <Title level={3} style={{ marginTop: "30px" }}>1.3 Assembly Support to Substructures Evidence of utilization of ceded revenue</Title>
                {cededRevenueUtilisationData && <Table
                    columns={cededAmountUtilizationColumns}
                    dataSource={cededRevenueUtilisationData}
                    pagination={false} bordered />}


                
                  {/* 1.3 Assembly Support to Substructures Selected Activities that Benefit the Community 
                  Henry to at it and format it the way it is displayed on the sheet and give the score
                  */}
                  <Title level={3} style={{ marginTop: "30px" }}>Selected Activities that Benefit the Community</Title>
                {subStructureActivityData && <Table
                    columns={subStructureActivityColumns}
                    dataSource={subStructureActivityData}
                    pagination={false} bordered />}


                {/* Print Button */}
                <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} style={{ marginTop: "20px" }}>
                    Print Report
                </Button>
            </Content>
        </Layout>
    );
};

export default DPATAssessmentSheet;
