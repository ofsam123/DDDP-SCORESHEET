import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, Spin, message, Avatar, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";
import useAuth from "../hooks/useAuth";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AAPBudgetAproval = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {
  const { user } = useAuth();
  const [endpointData, setEndpointData] = useState(null);
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
      data,
    }),
  }));

  // Fetch CMS data and comments
  useEffect(() => {
    const fetchEndpointData = async () => {
      if (!districtId || !year) {
        setError("District ID or year is missing");
        return;
      }

      setLoading(true);
      try {
        const response = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        // Find aapBudgetApproval data
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        if (relevantComment && relevantComment.dddpData?.tables?.aapBudgetApproval) {
          setEndpointData(relevantComment.dddpData.tables.aapBudgetApproval);
          setError(null);
          console.log("Fetched aapBudgetApproval:", relevantComment.dddpData.tables.aapBudgetApproval);
        } else {
          setEndpointData(null);
          // setError("No aapBudgetApproval data found in assessment_start_DAPT comment");
        }

        // Find comments and gaps for this indicator
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === `c1.0-1.2-${year}` &&
            comment.districtId === districtId &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(`Failed to fetch AAP Budget Approval data: ${error.message}`);
        setEndpointData(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEndpointData();
  }, [districtId, year]);

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
                                {comment.commentDate.join("/")}
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
                                {comment.updateDate.join("/")}
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

  return (
    <Spin spinning={loading} tip="Loading AAP Budget Approval data...">
      <Comment
        data={endpointData || data} // Use CMS data if available, else DHIS2 data
        year={year}
        districtId={districtId}
        tableCommentedId={`c1.0-1.2-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput }) => (
          <>
            <Title level={3}>
              CI 1.0 General Assembly Meetings and Approvals - 1.2 Approval of Annual Action Plan and Budget
            </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD obtain Minutes of Meeting of the General Assembly approving the{" "}
              <strong>{parseInt(year) + 1}</strong> Composite Budget and the Annual Action Plan: <br /><br />
              <ol>
                <li type="i">
                  If the Annual Action Plan was duly approved by the General Assembly by 31st October,{" "}
                  <strong>{year}</strong> and
                </li>
                <li type="i" className="py-1">
                  If the budget was presented by the Executive Committee to the General Assembly and approved latest by
                  31st October <strong>{year}</strong>
                </li>
              </ol>
              <i>Then the CI is fulfilled</i>
            </Content>

            <Row align="middle">
              <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                CI Result:{" "}
                <strong
                  style={{
                    color: (endpointData?.fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red",
                  }}
                >
                  {endpointData?.fulfillment || data?.fulfillment || "N/A"}
                </strong>
              </Title>
              {!hideComment && renderCommentInput()}
            </Row>

            <div>
              <strong>{transformLink(endpointData?.aapApprovalLink || data?.aapApprovalLink)}</strong>
            </div>
            <Title level={4} style={{ marginTop: "20px" }}>
              Evidence of Approval of Annual Action Plan and Budget:
            </Title>

            {error && <Text type="danger">{error}</Text>}

            {/* Conditionally render endpoint data table if available, otherwise prop data table */}
            {endpointData?.data && endpointData.data.length > 0 ? (
              <Table
                columns={columns}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey="key"
              />
            ) : data?.data && data.data.length > 0 ? (
              <Table
                columns={columns}
                dataSource={transformData(data.data)}
                pagination={false}
                bordered
                rowKey="key"
              />
            ) : (
              <Text>No data available</Text>
            )}

            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default AAPBudgetAproval;