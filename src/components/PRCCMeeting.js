import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const PRCCMeeting = forwardRef(({ data, year, columns, districtId, hideComment }, ref) =>{
  const [endpointData, setEndpointData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          setError("No comment found with tableCommented = 'assessment_start_DAPT'");
          setEndpointData(null);
        } else if (!relevantComment.dddpData?.tables?.prccMeetingData) {
          setError("No prccMeetingData found in assessment_start_DAPT comment");
          setEndpointData(null);
        } else {
          setEndpointData(relevantComment.dddpData.tables.prccMeetingData);
          setError(null);
          console.log("Fetched prccMeetingData:", relevantComment.dddpData.tables.prccMeetingData);
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        const errorMsg = error.response?.status === 404
          ? `Endpoint not found: comments/tables/${districtId}/${year}/DPAT. Please verify the endpoint or check server availability.`
          : `Failed to fetch PRCC Meetings data: ${error.message}`;
        setError(errorMsg);
        setEndpointData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

  // Transform data to handle React element objects (e.g., docs, recommendation)
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
      recommendation: meeting.recommendation && typeof meeting.recommendation === "object" && meeting.recommendation?.props?.href ? (
        <a
          href={meeting.recommendation.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {meeting.recommendation.props.children || "View Document"}
        </a>
      ) : typeof meeting.recommendation === "string" ? (
        meeting.recommendation
      ) : (
        "N/A"
      ),
    }));
  };

  useImperativeHandle(ref, () => ({
      getData: () => ({
        indicator: "CI2",
        area: "Other Statutory Meetings / Requirements",
        data
      }),
    }));

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.4-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.4 PRCC Meetings</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, obtain minutes of Public Relations and Complaints Committee (PRCC) meetings for <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                If PRCC is functional and Minutes of Meetings and recommendations from the meetings are available.
              </li>
              <li type="i" className="py-1">
                If all complaints reported have been duly processed and recommendations made, and 
              </li>
              <li type="i">
                If action has been taken on all the recommendations, in (ii)
              </li>
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: (endpointData?.fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                {endpointData?.fulfillment || data?.fulfillment || "N/A"}
              </strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          {loading && <Text>Loading data from endpoint...</Text>}
          {error && <Text type="danger">{error}</Text>}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of PRCC Meetings</Title>
          
          {endpointData?.data && endpointData.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Endpoint PRCC Meetings (prccMeetingData)
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
            <Text>No endpoint PRCC meetings data available</Text>
          )}

          {data?.data && data.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Prop PRCC Meetings
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
            <Text>No prop PRCC meetings data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default PRCCMeeting;