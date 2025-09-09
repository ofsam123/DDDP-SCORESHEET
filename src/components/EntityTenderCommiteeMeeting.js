import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, Spin, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";
import useAuth from "../hooks/useAuth";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const EntityTenderCommitteeMeeting = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {
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
      data: endpointData || data,
    }),
  }));

  // Fetch CMS data and comments
  useEffect(() => {
    const fetchEndpointData = async () => {
      if (!districtId || !year) {
        setError("District ID or year is missing");
        console.warn("Missing districtId or year:", { districtId, year });
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching data from:", `comments/tables/${districtId}/${year}/DPAT`);
        const response = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        console.log("Full API response:", response.data);
        const relevantComment = response.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        console.log("Relevant comment:", relevantComment);
        if (!relevantComment) {
          setError("No comment found with tableCommented = 'assessment_start_DAPT'");
          setEndpointData(null);
        } else if (!relevantComment.dddpData?.tables?.entityTenderCommitteeMeeting?.data) {
          setError("No entityTenderCommitteeMeeting data found in assessment_start_DAPT comment");
          setEndpointData(null);
        } else {
          const tenderData = relevantComment.dddpData.tables.entityTenderCommitteeMeeting.data;
          console.log("Fetched entityTenderCommitteeMeeting data:", tenderData);
          setEndpointData({
            data: Array.isArray(tenderData.data) ? tenderData.data : [],
            fulfillment: tenderData.fulfillment || "Not Fulfilled",
          });
          setError(null);
        }

        // Find comments and gaps for this indicator
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === `c2.0-2.5-${year}` &&
            comment.districtId === districtId &&
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
          ? `Endpoint not found: comments/tables/${districtId}/${year}/DPAT. Please verify the endpoint or check server availability.`
          : `Failed to fetch Entity Tender Committee Meetings data: ${error.message}`;
        setError(errorMsg);
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

  // Transform meetings data to handle complex fields
  const transformMeetings = (meetings) => {
    if (!meetings) {
      console.warn("Meetings data is missing");
      return [];
    }
    if (!Array.isArray(meetings)) {
      console.error("Meetings data is not an array:", meetings);
      return [];
    }
    console.log("Transforming meetings data:", meetings);
    return meetings.map((meeting) => {
      if (!meeting) {
        console.warn("Meeting item is null or undefined:", meeting);
        return {};
      }
      return {
        ...meeting,
        docs: typeof meeting.docs === "object" && meeting.docs?.props?.href ? (
          <a
            href={meeting.docs.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {meeting.docs.props.children || "View Document"}
          </a>
        ) : (
          meeting.docs || "N/A"
        ),
        attendance: typeof meeting.attendance === "object" && meeting.attendance?.props?.href ? (
          <a
            href={meeting.attendance.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {meeting.attendance.props.children || "View Document"}
          </a>
        ) : (
          meeting.attendance || "N/A"
        ),
        recommendation: typeof meeting.recommendation === "object" && meeting.recommendation?.props?.href ? (
          <a
            href={meeting.recommendation.props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-primary fw-bold text-decoration-underline"
          >
            {meeting.recommendation.props.children || "View Document"}
          </a>
        ) : (
          meeting.recommendation || "N/A"
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

 
  return (
    <Spin spinning={loading} tip="Loading Entity Tender Committee Meetings data...">
      <Comment
        data={endpointData || data} // Use CMS data if available, else prop data
        year={year}
        districtId={districtId}
        tableCommentedId={`c2.0-2.5-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput }) => (
          <>
            <Title level={3}>
              CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.5 Meetings of the Technical SubCommittee and Spatial Planning Committee (SPC)
            </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD obtain information on the membership of the Technical SubCommittee and Spatial Planning Committee,
              invitation letters to meetings and minutes of monthly meetings for <strong>{year}</strong>.
              <br /><br />
              <ol>
                <li type="i">
                  If the technical sub-committee and spatial planning committee is duly constituted and have Minutes of
                  Meeting of all monthly Meetings recorded and duly signed by secretary and chairperson; and.
                </li>
                <li type="i">
                  If there is evidence in the form of Minutes of Meetings approving the preparation/revision of local plans.
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

            {error && <Text type="danger">{error}</Text>}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Spatial Planning Committee (SPC) Meeting</Title>
            {endpointData?.data && endpointData.data.length > 0 ? (
              <>
                <Table
                  columns={columns}
                  dataSource={transformMeetings(endpointData.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : data?.data && data.data.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Meetings from Prop Data
                </Title>
                <Table
                  columns={columns}
                  dataSource={transformMeetings(data.data)}
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
                locale={{ emptyText: "No Entity Tender Committee Meetings data available" }}
              />
            )}

            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default EntityTenderCommitteeMeeting;