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

// Main Component
const DPATAssessmentSheet = ({ props }) => {

    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [meetingDataGroup, setMeetingDataGroup] = useState(null);
    const [meetings, setMeetings] = useState(props?.meetings.meetings);
    const [members, setMembers] = useState(props?.members.members);
    const [memberFinanceData, setMemberFinanceData] = useState(null);
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

    }, [props]);


    function formatData(meetings, meetingType) {
        return meetings.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === "DPAT | Meeting Type" && attr.value === meetingType
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

        formatData(meetings, "GA").forEach((meeting, index) => {
            const meetingDataState = {
                key: index + 1, // Static key (can be dynamic)
                meeting: getMeetingRank(index, "GA"), // Meeting type
                invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
                meetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // Meeting Date
                interval: 0, // Interval (Days)
                invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
                signatoryInvitationLetter: getAttributeValue("Who Signed the Invitation letter", meeting) === "PM" ?
                    "Presiding Member" : "Convener", // Signatory of Invitation Letter
                signatoriesMinutes: getAttributeValue("Minute File Number", meeting), // Placeholder for Signatories to minutes of meeting 
            };

            meetingDataState.interval = getDaysBetween(meetingDataState.invitationDate, meetingDataState.meetingDate);
            decisionNo += parseInt(getAttributeValue("DPAT | Number of Decisions", meeting));
            temp.push(meetingDataState);
        })


        setGaMeetingData({meetings: temp, fulfillment: checkGaMeetingFulfillment(temp), numberOfDecision: decisionNo});
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

        setMeetingDataGroup({data:temp, fulfillment: fulfillment});
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

        subReports?.filter(rep=>rep.dataValues.length > 0)
                  .forEach((report, index)=>{
                    const instance = subStructures.find(sub=> sub.trackedEntity === report.trackedEntity);
                    reportsTemp.push({
                            key: index + 1,
                            name: getAttributeValue("DPAT | Name of Sub Structure", instance),
                            collected: report.dataValues[0].value,
                            ceded: report.dataValues[1].value,
                            percentage: report.dataValues[2].value
                        });
                    
                  });

        if(reportsTemp.length > 0){
            setSubReportData(reportsTemp);
        }
    };

    const setMemberData = () => {
        const temp = [];
        members
            ?.forEach((member, index) => {
                const memberDataState = {
                    key: index + 1,
                    no: index+1,
                    member: `${getAttributeValue("First Name", member)} ${getAttributeValue("Last Name", member)}`,
                    department: getAttributeValue("Staff Department", member),
                    appointment: getAttributeValue("Assembly Member Type", member),
                };

                temp.push( memberDataState);
            });

        setMemberFinanceData(temp);
    };


    const getMeetingRank = (index, type) => {
        
        if(type === 'GA'){
            switch (index) {
                case 0: return "1st Ordinary Meeting";
                case 1: return "2nd Ordinary Meeting";
                case 2: return "3rd Ordinary Meeting";
                default: return "Bonus Ordinary Meeting";
            }
        }else if(type === 'EC'){
            switch (index) {
                case 0: return "1st";
                case 1: return "2nd";
                case 2: return "3rd";
                default: return "Other";
            }
        }else if(type === 'Management Meetings'){
            switch (index) {
                case 0: return "1st";
                case 1: return "2nd";
                case 2: return "3rd";
                case 3: return "4th";
                default: return "Other";
            }
        }else if(type === 'Entity Tender Committee (ETC)'){
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
<h6 style={{ marginBottom: "20px", color: "grey" }}>
  At least three {gaMeetingData.meetings.length} ordinary meetings and minutes were held and duly recorded 
  and signed by both the PM and MCD. The table below illustrates
</h6>

<Row style={{ marginBottom: "20px" }}>
  <h4>
    Number of Decisions: {gaMeetingData ? gaMeetingData.numberOfDecision : "Loading..."}
  </h4>
</Row>

<Row>
<h5>

</h5>

{gaMeetingData && (
  <>
    <Table
      columns={generalAssemblyColumns}
      dataSource={gaMeetingData.meetings}
      pagination={false}
      bordered
    />
    <div
      style={{
        marginTop: "100px",
        marginLeft: "50px",
        fontWeight: "bold",
        fontSize: "20px",
        padding: "10px",
        borderRadius: "4px",
        color: gaMeetingData.fulfillment === "Not Fulfilled" ? "red" : "green",
      }}
    >
      {gaMeetingData.fulfillment}
    </div>
  </>
)}

</Row>
                {/* <Title level={3}>General Assembly Meetings</Title>
                {JSON.stringify(gaMeetingData)}
                {gaMeetingData &&
                    <Table columns={generalAssemblyColumns} dataSource={gaMeetingData.meetings} pagination={false} bordered />} */}

                <Title level={3} style={{ marginTop: "30px" }}>General Assembly Meetings Decision</Title>
                {/* {JSON.stringify(gaMeetingData)} */}
                {decisionsData &&
                    <Table columns={generalAssemblyDecisionColumns} dataSource={decisionsData} pagination={false} bordered />}

                {/* Approval of Budget */}
                <Title level={3} style={{ marginTop: "30px" }}>Approval of Annual Action Plan & Budget</Title>
                {meetingDataGroup && <Table columns={budgetColumns} dataSource={meetingDataGroup.data} pagination={false} bordered />}

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

               {/* Members section */}
               <Title level={3} style={{ marginTop: "30px" }}>Membership of Statutory Sub-Committees</Title>
               {memberFinanceData && <Table columns={membersColumns} dataSource={memberFinanceData} pagination={false} bordered />}

                {/* Management Meeting */}
                <Title level={3} style={{ marginTop: "30px" }}>Evidence of quarterly Management Meetings</Title>
               {managementMeetingsData && <Table columns={managementMeetingColumns} dataSource={managementMeetingsData} pagination={false} bordered />}

               {/* PRCC Meeting */}
               <Title level={3} style={{ marginTop: "30px" }}>Evidence of Meetings of PRCC</Title>
               {prccMeetingData && <Table columns={PRCCMeetingColumns} dataSource={prccMeetingData} pagination={false} bordered />}

               {/* Entity Tender Committee (ETC) Meeting */}
               <Title level={3} style={{ marginTop: "30px" }}>Evidence of Entity Tender Committee (ETC) meeting</Title>
               {etcMeetingData && <Table columns={ETCMeetingColumns} dataSource={etcMeetingData} pagination={false} bordered />}


                {/* Print Button */}
                <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} style={{ marginTop: "20px" }}>
                    Print Report
                </Button>
            </Content>
        </Layout>
    );
};

export default DPATAssessmentSheet;
