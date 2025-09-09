import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Spin,  } from "antd";
import instance from "../api/cmsapi"; // Use same axios instance as GAMeeting and AuditorGeneralGAMeeting

const { Content } = Layout;
const { Title } = Typography;

const AuditCommiteeMeeting = forwardRef(({ meetings, meetingColumns, district, year }, ref) => {
  const [endpointData, setEndpointData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(""); // Temporary debug state

  const defaultMeetingColumns = meetingColumns || [
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Agenda", dataIndex: "agenda", key: "agenda" },
    { title: "Minute Reference", dataIndex: "muniteRef", key: "muniteRef" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterRef", key: "invitationLetterRef" },
    {
      title: "Documents",
      dataIndex: "docs",
      key: "docs",
      render: (text) =>
        typeof text === "object" && text?.props?.href ? (
          <a
            href={text.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {text.props.children || "View Documents"}
          </a>
        ) : (
          text || "Not Uploaded"
        ),
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      render: (text) =>
        typeof text === "object" && text?.props?.href ? (
          <a
            href={text.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {text.props.children || "View Attendance"}
          </a>
        ) : (
          text || "Not Uploaded"
        ),
    },
    {
      title: "Recommendation",
      dataIndex: "recommendation",
      key: "recommendation",
      render: (text) =>
        typeof text === "object" && text?.props?.href ? (
          <a
            href={text.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {text.props.children || "View Recommendation"}
          </a>
        ) : (
          text || "Not Uploaded"
        ),
    },
  ];

  useImperativeHandle(ref, () => ({
    getData: () => ({
      meetings: endpointData || meetings || { data: [], fulfillment: "Not Fulfilled" },
    }),
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!district || !year) {
        setError("District or year is missing");
        setDebugInfo("Missing district or year");
        return;
      }

      setLoading(true);
      try {
        const response = await instance.get(`comments/tables/${district}/${year}/DPAT`);
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        if (relevantComment && relevantComment.dddpData?.tables?.auditCommitteeMeeting?.meetings) {
          setEndpointData(relevantComment.dddpData.tables.auditCommitteeMeeting.meetings);
          setError(null);
          setDebugInfo("Successfully fetched auditCommitteeMeeting from comments/tables");
        } else {
          setEndpointData(null);
          setError("No Audit Committee Meeting data found in assessment_start_DAPT comment");
          setDebugInfo("No auditCommitteeMeeting data in comments/tables response");
        }
      } catch (error) {
        setError(`Failed to fetch Audit Committee Meeting data: ${error.message}`);
        setEndpointData(null);
        setDebugInfo(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [district, year]);

  const transformData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    return dataArray.map((item, index) => ({
      ...item,
      key: item.key || index,
      meetingDate: item.meetingDate || "N/A",
      agenda: item.agenda || "N/A",
      muniteRef: item.muniteRef || "N/A",
      invitationDate: item.invitationDate || "N/A",
      invitationLetterRef: item.invitationLetterRef || "N/A",
      docs: typeof item.docs === "object" && item.docs?.props?.href ? (
        <a
          href={item.docs.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.docs.props.children || "View Documents"}
        </a>
      ) : (
        item.docs || "Not Uploaded"
      ),
      attendance: typeof item.attendance === "object" && item.attendance?.props?.href ? (
        <a
          href={item.attendance.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.attendance.props.children || "View Attendance"}
        </a>
      ) : (
        item.attendance || "Not Uploaded"
      ),
      recommendation: typeof item.recommendation === "object" && item.recommendation?.props?.href ? (
        <a
          href={item.recommendation.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.recommendation.props.children || "View Recommendation"}
        </a>
      ) : (
        item.recommendation || "Not Uploaded"
      ),
    }));
  };

  const dataSource = transformData(endpointData?.data?.length >= 0 ? endpointData.data : meetings?.data?.length >= 0 ? meetings.data : []);

  return (
    <Spin spinning={loading} tip="Loading Audit Committee Meeting data...">
      <Title level={3}>CI 3.0 Public Financial Management and Auditing - 3.3 Functionality of the Audit Committee</Title>
      <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
      <Content>
        From the District Coordinating Director (DCD), receive information on the Audit Committee of the Assembly.
        <br />
        <br />
        <ol>
          <li type="i">
            If the Audit Committee is duly constituted and met at least four times during 2024, with Minutes of Meeting duly signed by the Secretary and Chairperson; and
          </li>
          <li type="i">
            If Management has submitted responses to both Internal Audit reports and Management Letter within 10 days and 30 days respectively as stipulated by law, and has taken action on all audit recommendations
          </li>
        </ol>
        <i>Then the CI is fulfilled</i>
      </Content>

      <Title level={5} style={{ marginTop: "20px" }}>
        CI Result:{" "}
        <strong style={{ color: (endpointData?.fulfillment || meetings?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
          {endpointData?.fulfillment || meetings?.fulfillment || "Not Fulfilled"}
        </strong>
      </Title>

      {/* {error && <Text type="danger">{error}</Text>}
      {debugInfo && <Text type="secondary">{debugInfo}</Text>} */}

      <Title level={4} style={{ marginTop: "20px" }}>Evidence of Audit Committee Meetings</Title>
      {endpointData?.data?.length > 0 ? (
        <>
          <Title level={5} style={{ marginTop: "20px" }}>Audit Committee Data from API</Title>
          <Table
            columns={defaultMeetingColumns}
            dataSource={transformData(endpointData.data)}
            pagination={false}
            bordered
            rowKey={(record, index) => `${record.key || index}`}
          />
        </>
      ) : meetings?.data?.length > 0 ? (
        <>
          <Title level={5} style={{ marginTop: "20px" }}>Audit Committee Data from Prop</Title>
          <Table
            columns={defaultMeetingColumns}
            dataSource={transformData(meetings.data)}
            pagination={false}
            bordered
            rowKey={(record, index) => `${record.key || index}`}
          />
        </>
      ) : (
        <Table
          columns={defaultMeetingColumns}
          dataSource={[]}
          pagination={false}
          bordered
          rowKey={(record, index) => `${record.key || index}`}
          locale={{ emptyText: "No Audit Committee Meeting data available" }}
        />
      )}
    </Spin>
  );
});

export default AuditCommiteeMeeting;