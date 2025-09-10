import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ExecutiveCommitteeMember = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {
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
        // Log the full response for debugging
        console.log("Endpoint response:", response.data);
        // Find the comment with tableCommented = "assessment_start_DAPT"
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        if (!relevantComment) {
      
          setEndpointData(null);
        } else if (!relevantComment.dddpData?.tables?.ecaMeetingData) {
         
          setEndpointData(null);
        } else {
          setEndpointData(relevantComment.dddpData.tables.ecaMeetingData);
          setError(null);
          console.log("Fetched ecaMeetingData:", relevantComment.dddpData.tables.ecaMeetingData);
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(`Failed to fetch Executive Committee meeting data: ${error.message}`);
        setEndpointData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

  // Transform data to handle React element objects (e.g., docs, attendance, recommendation)
  const transformData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map((item) => ({
      ...item,
      docs: item.docs && typeof item.docs === "object" && item.docs?.props?.href ? (
        <a
          href={item.docs.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.docs.props.children || "View Document"}
        </a>
      ) : typeof item.docs === "string" ? (
        item.docs
      ) : (
        "N/A"
      ),
      attendance: item.attendance && typeof item.attendance === "object" && item.attendance?.props?.href ? (
        <a
          href={item.attendance.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.attendance.props.children || "View Document"}
        </a>
      ) : typeof item.attendance === "string" ? (
        item.attendance
      ) : (
        "N/A"
      ),
      recommendation: item.recommendation && typeof item.recommendation === "object" && item.recommendation?.props?.href ? (
        <a
          href={item.recommendation.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.recommendation.props.children || "View Document"}
        </a>
      ) : typeof item.recommendation === "string" ? (
        item.recommendation
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
      tableCommentedId={`c2.0-2.1-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.1 Executive Committee Meetings</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, obtain information on the membership of the Executive Committee for <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                If at least a meeting of the EC/MA was held prior to each of the three mandated General Assembly meetings in {year},
                and minutes duly recorded and signed by both DCD and DCE
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

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Executive Committee Meeting</Title>
          {loading && <Text>Loading data from endpoint...</Text>}
          {error && <Text type="danger">{error}</Text>}

          {endpointData?.data && endpointData.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                {/* Data from Endpoint (ecaMeetingData) */}
              </Title>
              <Table
                columns={columns}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            </>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                {/* Data from Prop Data */}
              </Title>
              <Table
                columns={columns}
                dataSource={transformData(data.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            </>
          ) : (
            <Text>No Executive Committee meeting data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default ExecutiveCommitteeMember;