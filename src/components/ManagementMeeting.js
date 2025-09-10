import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ManagementMeeting = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {
  const [endpointData, setEndpointData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => ({
      getData: () => ({
        indicator: "CI2",
        area: "Other Statutory Meetings / Requirements",
        data
      }),
    }));

  // Fetch data from the endpoint
  useEffect(() => {
    const fetchEndpointData = async () => {
      if (!districtId || !year) {
        setError("District ID or year is missing");
        return;
      }
      setLoading(true);
      try {
        const response = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        console.log("Endpoint response:", response.data);
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        if (!relevantComment) {
       
          setEndpointData(null);
        } else if (!relevantComment.dddpData?.tables?.managementMeetingsData) {
        
          setEndpointData(null);
        } else {
          setEndpointData(relevantComment.dddpData.tables.managementMeetingsData);
          setError(null);
          console.log("Fetched managementMeetingsData:", relevantComment.dddpData.tables.managementMeetingsData);
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        const errorMsg = error.response?.status === 404
          ? `Endpoint not found: comments/tables/${districtId}/${year}/DPAT. Please verify the endpoint or check server availability.`
          : `Failed to fetch Management Meetings data: ${error.message}`;
        setError(errorMsg);
        setEndpointData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

  // Transform data to handle React element objects (e.g., docs, attendance)
  const transformMeetings = (meetings) => {
    if (!meetings) return [];
    return meetings.map((meeting) => ({
      ...meeting,
      docs: meeting.docs && typeof meeting.docs === "object" && meeting.docs?.props?.href ? (
        <a
          href={meeting.docs.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {meeting.docs.props.children || "View Document"}
        </a>
      ) : typeof meeting.docs === "string" ? (
        meeting.docs
      ) : (
        "N/A"
      ),
      attendance: meeting.attendance && typeof meeting.attendance === "object" && meeting.attendance?.props?.href ? (
        <a
          href={meeting.attendance.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {meeting.attendance.props.children || "View Document"}
        </a>
      ) : typeof meeting.attendance === "string" ? (
        meeting.attendance
      ) : (
        "N/A"
      ),
    }));
  };

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.3-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.3 Management Meetings</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, obtain minutes of Management meetings for <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                If Management Meetings were held, at least quarterly, and duly attended by at least 8 out of 11 for District Assemblies; 
                10 out of 13 for Municipal Assemblies; and 13 out of 16 for Metropolitan Assemblies of HoDs in <strong>{year}</strong>.
              </li>
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: (endpointData?.fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                {endpointData?.fulfillment || data?.fulfillment || "N/A"}
              </strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          {loading && <Text>Loading data from endpoint...</Text>}
          {error && <Text type="danger">{error}</Text>}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Management Meetings</Title>
          
          {endpointData?.data && endpointData.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Endpoint Management Meetings (managementMeetingsData)
              </Title>
              <Table
                columns={columns}
                dataSource={transformMeetings(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `endpoint-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No endpoint management meetings data available</Text>
          )}

          {data?.data && data.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Prop Management Meetings
              </Title>
              <Table
                columns={columns}
                dataSource={transformMeetings(data.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `prop-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No prop management meetings data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default ManagementMeeting;