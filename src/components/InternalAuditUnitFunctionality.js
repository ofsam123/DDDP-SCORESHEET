import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Spin, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Comment from "../components/Comments";
import axios from "../api/axios";
import instance from "../api/cmsapi";
import useAuth from "../hooks/useAuth";
import { getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const { Content } = Layout;
const { Title, Text } = Typography;

const columnsReport = [
  { title: "Quarter", dataIndex: "quarter", key: "quarter" },
  { title: "Report Link", dataIndex: "reports", key: "reports" },
];

const InternalAuditUnitFunctionality = forwardRef(({ data, year, columns, district }, ref) => {
  const { user } = useAuth();
  const [endpointData, setEndpointData] = useState(null);
  const [report, setReport] = useState([]);
  const [fulfillment, setFulfillment] = useState(data?.fulfillment || "Not Fulfilled");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isReviewer = currentUserRole === "DPAT QUALITY ASSURANCE";

  // Expose getData method to parent via ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      data: endpointData || data,
      report,
      fulfillment,
    }),
  }));

  // Fetch CMS data and comments
  useEffect(() => {
    const fetchEndpointData = async () => {
      if (!district || !year) {
        setError("District ID or year is missing");
        console.warn("Missing district or year:", { district, year });
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching data from:", `comments/tables/${district}/${year}/DPAT`);
        const response = await instance.get(`comments/tables/${district}/${year}/DPAT`);
        console.log("Full API response:", response.data);
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        console.log("Relevant comment:", relevantComment);
        if (!relevantComment) {
          setError("No comment found with tableCommented = 'assessment_start_DAPT'");
          setEndpointData(null);
        } else if (!relevantComment.dddpData?.tables?.internalAuditUnitFunctionality?.data) {
          setError("No internalAuditUnitFunctionality data found in assessment_start_DAPT comment");
          setEndpointData(null);
        } else {
          const auditData = relevantComment.dddpData.tables.internalAuditUnitFunctionality.data;
          console.log("Fetched internalAuditUnitFunctionality data:", auditData);
          setEndpointData({
            data: Array.isArray(auditData.data) ? auditData.data : [],
            fulfillment: auditData.fulfillment || "Not Fulfilled",
          });
          setFulfillment(auditData.fulfillment || "Not Fulfilled");
          setError(null);
        }

        // Find comments and gaps for this indicator
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === `c3.0-3.2-${year}` &&
            comment.districtId === district &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        console.log("Filtered comments:", filteredComments);
        setComments(filteredComments);
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        const errorMsg = error.response?.status === 404
          ? `Endpoint not found: comments/tables/${district}/${year}/DPAT. Please verify the endpoint or check server availability.`
          : `Failed to fetch Internal Audit Unit Functionality data: ${error.message}`;
        setError(errorMsg);
        setEndpointData(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    const getAuditCommitteeReport = async () => {
      try {
        // console.log("Fetching tracked entities from:", `/tracker/trackedEntities?orgUnit=${district}&program=Z3qMezPtpEb&startDate=${year}-01-01&endDate=${year}-12-31`);
        const res = await axios.get(`/tracker/trackedEntities?orgUnit=${district}&program=Z3qMezPtpEb&startDate=${year}-01-01&endDate=${year}-12-31`);
        let currentYearData = [];

        res.data?.instances?.forEach((item) => {
          const currentData = getAttributeValue("Years", item);
          if (currentData?.length > 0 && currentData == year) {
            currentYearData.push(item);
          }
        });

        if (currentYearData.length > 0) {
          console.log("Fetching events from:", `/tracker/events?program=Z3qMezPtpEb&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`);
          const eventRes = await axios.get(`/tracker/events?program=Z3qMezPtpEb&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`);
          const reportData = eventRes.data?.instances;

          if (reportData && currentYearData.length > 0) {
            const currentReportData = reportData.filter((r) => r.trackedEntity === currentYearData[0].trackedEntity);
            const temp = [];

            if (currentReportData.length > 0) {
              currentReportData.forEach((currentReport, idx) => {
                currentReport.dataValues.forEach((val) => {
                  const minuteLink = getFileLinkIfExist(reportData, "hM6AUNKRbKB", currentYearData[0].trackedEntity);
                  if (val.dataElement === "hM6AUNKRbKB") {
                    temp.push({
                      quarter: `Quarter ${idx + 1}`,
                      reports: minuteLink ? (
                        <a
                          className="px-2 text-primary fw-bold text-decoration-underline"
                          href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=hM6AUNKRbKB`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Click here to see the uploaded report"
                        >
                          View Report
                        </a>
                      ) : (
                        "Not Uploaded"
                      ),
                    });
                  }
                });
              });
            }

            setReport(temp);
            console.log("Report data:", temp);

            if (temp.length < 4 || temp.some((rep) => rep.reports === "Not Uploaded")) {
              setFulfillment("Not Fulfilled");
            }
          }
        } else {
          setReport([]);
          setFulfillment("Not Fulfilled");
        }
      } catch (err) {
        console.error("Failed to fetch audit committee report:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setReport([]);
        setFulfillment("Not Fulfilled");
      }
    };

    fetchEndpointData();
    getAuditCommitteeReport();
  }, [district, year]);

  // Handle comment/gaps deletion
  const handleDeleteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.username !== currentUsername) {
      message.error("You can only delete your own comments.");
      return;
    }
    try {
      await instance.delete(`comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      message.success("Comment deleted successfully");
    } catch (error) {
      console.error("Failed to delete comment:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error("Failed to delete comment");
    }
  };

  // Transform data to handle complex fields
  const transformData = (data) => {
    if (!data) {
      console.warn("Data is missing");
      return [];
    }
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return [];
    }
    console.log("Transforming data:", data);
    return data.map((item) => {
      if (!item) {
        console.warn("Data item is null or undefined:", item);
        return {};
      }
      return {
        ...item,
        recommendion: typeof item.recommendion === "object" && item.recommendion?.props?.href ? (
          <a
            href={item.recommendion.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {item.recommendion.props.children || "View Recommendation"}
          </a>
        ) : (
          item.recommendion || "N/A"
        ),
      };
    });
  };

  // Render comments and gaps list
  const renderCommentList = () => (
    <div
      style={{
        borderTop: "1px solid #e8e8e8",
        padding: "8px",
        background: "#fff",
        maxWidth: "800px",
        width: "100%",
      }}
    >
      {comments.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingLeft: "12px",
            marginTop: "16px",
          }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "6px",
                maxWidth: "700px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Comment Section */}
                {comment.comments && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={
                          comment.userImage ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
                        }
                        style={{ marginRight: "10px", borderRadius: "50%" }}
                        size={32}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                          <h4 style={{ margin: 0, fontSize: "13px" }}>
                            {comment.fullName} (
                            {comment.userRole ? comment.userRole.replace("_", " ") : "Unknown Role"})
                          </h4>
                          {comment.username === currentUsername && (
                            <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                              <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                                {comment.commentDate?.join("/") || "N/A"}
                              </span>
                              <EditOutlined
                                style={{ cursor: "pointer", color: "#000000ff" }}
                                onClick={() => message.info("Edit functionality to be implemented")}
                              />
                              <DeleteOutlined
                                style={{ cursor: "pointer", color: "#ff0000" }}
                                onClick={() => handleDeleteComment(comment.id)}
                              />
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: "16px" }}>{comment.comments}</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Gaps Section */}
                {comment.gaps && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={
                          comment.userImage ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
                        }
                        style={{ marginRight: "10px", borderRadius: "50%" }}
                        size={32}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                          <h4 style={{ margin: 0, fontSize: "13px" }}>
                            {comment.fullName} (
                            {comment.userRole ? comment.userRole.replace("_", " ") : "Unknown Role"}
                            ) GAPS
                          </h4>
                          {comment.username === currentUsername && (
                            <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                              <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                                {comment.updateDate?.join("/") || "N/A"}
                              </span>
                              <EditOutlined
                                style={{ cursor: "pointer", color: "#000000ff" }}
                                onClick={() => message.info("Edit functionality to be implemented")}
                              />
                              <DeleteOutlined
                                style={{ cursor: "pointer", color: "#ff0000" }}
                                onClick={() => handleDeleteComment(comment.id)}
                              />
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: "16px" }}>{comment.gaps}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Log props and derived data for debugging
  console.log("Prop data:", data);
  console.log("Endpoint data:", endpointData);
  console.log("Report data:", report);
  console.log("Fulfillment:", fulfillment);
  console.log("Columns prop:", columns);
  console.log("Year:", year);
  console.log("District:", district);
  const dataSource = transformData(endpointData?.data?.length >= 0 ? endpointData.data : data?.data || []);
  console.log("Table dataSource:", dataSource);

  return (
    <Spin spinning={loading} tip="Loading Internal Audit Unit Functionality data...">
      <Comment
        data={endpointData || data} // Use CMS data if available, else prop data
        year={year}
        districtId={district}
        tableCommentedId={`c3.0-3.2-${year}`}
        hideComment={false}
      >
        {({ renderCommentInput }) => (
          <>
            <Title level={3}>CI 3.0 Public Financial Management and Auditing - 3.2 Functionality of the Internal Audit Unit</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD, obtain information on the Internal Audit Unit of the Assembly.
              <br /><br />
              <ol>
                <li type="i">
                  If the Internal Audit Unit has submitted the Annual Audit Work Plan to the DCD
                  and Audit Committee within 30 days after the beginning of the financial year; and
                </li>
                <li type="i">
                  If all quarterly Internal Audits have been conducted and reports submitted to the DCD and the Chair of the Audit
                  Committee of the Assembly within thirty (30) days after the end of each quarter,
                </li>
                <li type="i">
                  If the District Assembly has submitted the Annual Audit Workplan
                  to the Internal Audit Agency by 31st January of the financial year.
                </li>
                <li type="i">
                  If the District Assembly has submitted all quarterly Internal Audit Reports to
                  the Internal Audit Agency by the end of the month following each quarter.
                </li>
              </ol>
              <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
              CI Result:{" "}
              <strong style={{ color: fulfillment === "Fulfilled" ? "green" : "red" }}>
                {fulfillment || "N/A"}
              </strong>
            </Title>
            {renderCommentInput()}

            {error && <Text type="danger">{error}</Text>}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Internal Audit Committee Records</Title>
            {endpointData?.data && endpointData.data.length > 0 ? (
              <Table
                columns={columns}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            ) : data?.data && data.data.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Records from Prop Data
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
              <Table
                columns={columns}
                dataSource={[]}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
                locale={{ emptyText: "No Internal Audit Committee Records available" }}
              />
            )}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Report</Title>
            <Table
              columns={columnsReport}
              dataSource={report}
              pagination={false}
              bordered
              rowKey={(record, index) => `${record.quarter || index}`}
              locale={{ emptyText: "No Quarterly Reports available" }}
            />

            
            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default InternalAuditUnitFunctionality;