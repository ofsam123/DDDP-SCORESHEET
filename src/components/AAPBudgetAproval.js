import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, message } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AAPBudgetAproval = forwardRef(({ data, year, columns, districtId, hideComment }, ref) =>{
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
        // Extract meetingDataGroup from dddpData.tables
        if (relevantComment && relevantComment.dddpData?.tables?.meetingDataGroup) {
          setEndpointData(relevantComment.dddpData.tables.meetingDataGroup);
          setError(null);
          console.log("Fetched meetingDataGroup:", relevantComment.dddpData.tables.meetingDataGroup); // For debugging
        } else {
          setEndpointData(null);
          setError("No meetingDataGroup found in assessment_start_DAPT comment");
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(`Failed to fetch AAP Budget Approval data: ${error.message}`);
        setEndpointData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

  // Transform data for table to handle complex fields (e.g., documents as links or strings)
  const transformData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map((item) => ({
      ...item,
      documents: item.documents && typeof item.documents === "object" && item.documents?.props?.href ? (
        <a
          href={item.documents.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.documents.props.children || "View Document"}
        </a>
      ) : typeof item.documents === "string" ? (
        item.documents
      ) : (
        "N/A"
      ),
    }));
  };

  // Transform aapApprovalLink to handle React element objects
  const transformLink = (link) => {
    if (link && typeof link === "object" && link?.props?.href) {
      return (
        <a
          href={link.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {link.props.children || "View Document"}
        </a>
      );
    }
    return typeof link === "string" ? link : "N/A";
  };

   useImperativeHandle(ref, () => ({
      getData: () => ({
        data
      }),
    }));

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c1.0-1.2-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 1.0 General Assembly Meetings and Approvals - 1.2 Approval of Annual Action Plan and Budget </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD obtain Minutes of Meeting of the General Assembly approving the <strong>{parseInt(year) + 1}</strong> Composite Budget and the Annual Action Plan: <br /><br />
            <ol>
              <li type="i">
                If the Annual Action Plan was duly approved by the General Assembly by 31st October, <strong>{year}</strong> and
              </li>
              <li type="i" className="py-1">
                If the budget was presented by the Executive Committee to the General Assembly and approved latest by 31st October <strong>{year}</strong>
              </li>
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

          <div>
            <strong>{transformLink(endpointData?.aapApprovalLink || data?.aapApprovalLink)}</strong>
          </div>
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Approval of Annual Action Plan and Budget:</Title>

          {loading && <Text>Loading data from endpoint...</Text>}
          {error && <Text type="danger">{error}</Text>}

          {/* Conditionally render endpoint data table if available, otherwise prop data table */}
          {endpointData?.data && endpointData.data.length > 0 ? (
            <>
              {/* <Title level={5} style={{ marginTop: "20px" }}>
                Data from (meetingDataGroup)
              </Title> */}
              <Table
                columns={columns}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey="key"
              />
            </>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Data from Prop Data
              </Title>
              <Table
                columns={columns}
                dataSource={transformData(data.data)}
                pagination={false}
                bordered
                rowKey="key"
              />
            </>
          ) : (
            <Text>No data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})
export default AAPBudgetAproval;