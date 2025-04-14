import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button } from "antd";
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


const budgetColumns = [
  { title: "Statutory Organ", dataIndex: "organ", key: "organ" },
  { title: "Date Held", dataIndex: "date", key: "date" },
  { title: "Documents Discussed", dataIndex: "documents", key: "documents" },
  { title: "Key Approvals", dataIndex: "approvals", key: "approvals" },
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

const subStructureData = [
  { key: "1", subStructure: "Executive Committee", firstMeeting: "12-Jan", secondMeeting: "15-Apr", thirdMeeting: "20-Jul" },
  { key: "2", subStructure: "Finance Committee", firstMeeting: "10-Feb", secondMeeting: "14-May", thirdMeeting: "22-Aug" },
];

const revenueSharingColumns = [
  { title: "Sub-Structure", dataIndex: "subStructure", key: "subStructure" },
  { title: "Amount Collected (GHS)", dataIndex: "collected", key: "collected" },
  { title: "Amount Ceded (GHS)", dataIndex: "ceded", key: "ceded" },
  { title: "% Ceded", dataIndex: "percentage", key: "percentage" },
];

const revenueSharingData = [
  { key: "1", subStructure: "Local Market", collected: 50000, ceded: 15000, percentage: "30%" },
  { key: "2", subStructure: "Transport Union", collected: 70000, ceded: 21000, percentage: "30%" },
];

// Main Component
const DPATScoreSheet = ({ props }) => {

    const [gaMeetingData, setGaMeetingData] = useState(null);
    const [meetings, setMeetings] = useState(props?.GA);
    const [year, setYear] = useState(props?.year);

  const handlePrint = () => {
    window.print();
  };

  useEffect(()=>{
    console.log("props: ",props);
    setMeetingData();
  },[props]);

  
  
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
    let temp = [];
    meetings.forEach((meeting, index)=>{
        const meetingDataState = {
            key: index+1, // Static key (can be dynamic)
            meeting: getMeetingRank(index) , // Meeting type
            invitationDate: getAttributeValue("Invitation letter Date", meeting), // Invitation Date
            meetingDate: getAttributeValue("DPAT | Meeting Date", meeting), // Meeting Date
            interval: 0, // Interval (Days)
            invitationLetterReference: getAttributeValue("Invitation letter Ref. Number", meeting), // Invitation Letter Ref
            signatoryInvitationLetter: getAttributeValue("Who Signed the Invitation letter", meeting), // Signatory of Invitation Letter
            signatoriesMinutes: getAttributeValue("Minute File Number", meeting), // Placeholder for Signatories to minutes of meeting 
          };

        meetingDataState.interval = getDaysBetween(meetingDataState.invitationDate, meetingDataState.meetingDate);
        temp.push(meetingDataState);
    })
   
  
    setGaMeetingData(temp);
  };

  const getMeetingRank = (index)=>{

    switch(index){
        case 0 : return "1st Ordinary Meeting";
        case 1 : return "2nd Ordinary Meeting";
        case 2 : return "3rd Ordinary Meeting";
        default : return "Bonus Ordinary Meeting"; 
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
        {/* {JSON.stringify(gaMeetingData)} */}
        {gaMeetingData && 
            <Table columns={generalAssemblyColumns} dataSource={gaMeetingData} pagination={false} bordered />}

        {/* Approval of Budget */}
        <Title level={3} style={{ marginTop: "30px" }}>Approval of Annual Budget & Action Plan</Title>
        <Table columns={budgetColumns} dataSource={budgetData} pagination={false} bordered />

        {/* Sub-Structures Meetings */}
        <Title level={3} style={{ marginTop: "30px" }}>Meetings of the Sub-Structures</Title>
        <Table columns={subStructureColumns} dataSource={subStructureData} pagination={false} bordered />

        {/* Revenue Sharing */}
        <Title level={3} style={{ marginTop: "30px" }}>Revenue Sharing</Title>
        <Table columns={revenueSharingColumns} dataSource={revenueSharingData} pagination={false} bordered />

        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} style={{ marginTop: "20px" }}>
          Print Report
        </Button>
      </Content>
    </Layout>
  );
};

export default DPATScoreSheet;
