import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Row, message } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function GAMeeting({ data, year, columns, districtId, hideComment }) {
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
        // Find the comment with tableCommented = "assessment_start_DAPT"
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        // Extract gaMeetingData from dddpData.tables
        if (relevantComment && relevantComment.dddpData?.tables?.gaMeetingData) {
          setEndpointData(relevantComment.dddpData.tables.gaMeetingData);
          setError(null);
          console.log("Fetched gaMeetingData:", relevantComment.dddpData.tables.gaMeetingData); // For debugging
        } else {
          setEndpointData(null);
          setError("No gaMeetingData found in assessment_start_DAPT comment");
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(`Failed to fetch General Assembly Meetings data: ${error.message}`);
        setEndpointData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

  // Transform endpoint data to handle complex fields (e.g., docs, invitation as links)
  const transformMeetings = (meetings) => {
    if (!meetings) return [];
    return meetings.map((meeting) => ({
      ...meeting,
      docs: typeof meeting.docs === "object" && meeting.docs?.props?.href ? (
        <a
          href={meeting.docs.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {meeting.docs.props.children}
        </a>
      ) : (
        meeting.docs || "N/A"
      ),
      invitation: typeof meeting.invitation === "object" && meeting.invitation?.props?.href ? (
        <a
          href={meeting.invitation.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {meeting.invitation.props.children}
        </a>
      ) : (
        meeting.invitation || "N/A"
      ),
    }));
  };

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c1.0-1.1-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 1.0 General Assembly Meetings and Approvals - 1.1 Meetings of the General Assembly </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>

          <Content>
            From the District Coordinating Director (DCD) receive information on the General Assembly Meetings held in <strong>{year}</strong>:<br /><br />
            <ol>
              <li type="i">
                If the Assembly held at least three ordinary Meetings in <strong>{year}</strong> with Minutes of Meetings duly recorded and signed by both PM and DCD;
              </li>
              <li type="i" className="py-1">
                If the ordinary meeting was convened through a notice of meeting issued within two weeks before the meeting date and duly signed by the Presiding Member/Convener; and
              </li>
              <li type="i">
                If there is evidence of decisions (e.g. Resolutions; if applicable) made by the General Assembly during the convened meetings. </li>
            </ol>

            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: endpointData?.fulfillment === "Fulfilled" ? "green" : "red" }}>
                {endpointData?.fulfillment || data?.fulfillment || "N/A"}
              </strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={5} style={{ marginTop: "10px" }}>
            Number of Decisions: <strong>{endpointData?.numberOfDecision ?? data?.numberOfDecision ?? "N/A"}</strong>
          </Title>
          <Title level={4} style={{ marginTop: "20px" }}>
            Evidence of General Assembly Meetings of the Assembly
          </Title>

          {loading && <Text>Loading data from endpoint...</Text>}

          {error && <Text type="danger">{error}</Text>}

          {/* Conditionally render endpoint data table if available, otherwise prop data table */}
          {endpointData?.meetings && endpointData.meetings.length > 0 ? (
            <>
              {/* <Title level={5} style={{ marginTop: "20px" }}>
                Meetings from Endpoint (gaMeetingData)
              </Title> */}
              <Table
                columns={columns}
                dataSource={transformMeetings(endpointData.meetings)}
                pagination={false}
                bordered
                rowKey="key"
              />
            </>
          ) : data?.meetings && data.meetings.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Meetings from Prop Data
              </Title>
              <Table
                columns={columns}
                dataSource={transformMeetings(data.meetings)}
                pagination={false}
                bordered
                rowKey="key"
              />
            </>
          ) : (
            <Text>No meetings data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default GAMeeting;