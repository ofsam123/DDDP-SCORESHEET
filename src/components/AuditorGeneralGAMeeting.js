import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, Spin, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Comment from "../components/Comments";
import instance from "../api/cmsapi"; // Use same axios instance as GAMeeting
import useAuth from "../hooks/useAuth";

const { Content } = Layout;
const { Title, Text } = Typography;

const columns = [
  { title: "Minute Ref.", dataIndex: "meeting", key: "meeting" },
  { title: "Meeting Type", dataIndex: "meetingType", key: "meetingType" },
  { title: "Minutes Link", dataIndex: "minutes", key: "minutes" },
];

const AuditorGeneralGAMeeting = forwardRef(({ data, gaMeetings, ecaMeeting, year, districtId, hideComment }, ref) => {
  const { user } = useAuth();
  const [fulfillment, setFulfillment] = useState("Not Fulfilled");
  const [tableData, setTableData] = useState(null);
  const [endpointData, setEndpointData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE"
  )?.name || "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!districtId || !year) {
        setError("District ID or year is missing");
        return;
      }

      setLoading(true);
      try {
        // Fetch from comments/tables endpoint
        const commentResponse = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        const relevantComment = commentResponse.data.find(
          (comment) => comment.tableCommented === "assessment_start_DAPT"
        );
        if (relevantComment && relevantComment.dddpData?.tables?.auditorGeneralGAMeeting) {
          setEndpointData(relevantComment.dddpData.tables.auditorGeneralGAMeeting);
          setError(null);
        } else {
          setEndpointData(null);
          setError("No Auditor General GA Meeting data found in assessment_start_DAPT comment");
        }

        // Fetch comments
        const filteredComments = commentResponse.data.filter(
          (comment) =>
            comment.tableCommented === `c1.0-1.1-${year}` &&
            comment.districtId === districtId &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        setComments(filteredComments);
      } catch (error) {
        setError(`Failed to fetch Auditor General GA Meeting data: ${error.message}`);
        setEndpointData(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [districtId, year]);

  useEffect(() => {
    const temp = [];
    let fulfilled = "Fulfilled";

    if (gaMeetings?.meetings) {
      gaMeetings.meetings.forEach((val) => {
        const tempDataSet = {
          meeting: val.signatoriesMinutes,
          meetingType: "GA Meeting",
          minutes: val.docs,
        };

        if (val.docs === "Not Uploaded") {
          fulfilled = "Not Fulfilled";
        }

        temp.push(tempDataSet);
      });
    }

    if (ecaMeeting?.data) {
      ecaMeeting.data.forEach((val) => {
        const tempDataSet = {
          meeting: val.minutes,
          meetingType: "EC Meeting",
          minutes: val.docs,
        };

        if (val.docs === "Not Uploaded") {
          fulfilled = "Not Fulfilled";
        }

        temp.push(tempDataSet);
      });
    }

    setFulfillment(fulfilled);
    setTableData(temp);
  }, [gaMeetings, ecaMeeting]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      data: endpointData || tableData || data || { data: [], fulfillment: "Not Fulfilled" },
      fulfillment: endpointData?.fulfillment || fulfillment || data?.fulfillment || "Not Fulfilled",
    }),
  }));

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
      message.error("Failed to delete comment");
    }
  };

  const transformData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    return dataArray.map((item) => ({
      ...item,
      minutes: typeof item.minutes === "object" && item.minutes?.props?.href ? (
        <a
          href={item.minutes.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.minutes.props.children || "View Minutes"}
        </a>
      ) : (
        item.minutes || "Not Uploaded"
      ),
    }));
  };

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

  const dataSource = transformData(endpointData?.data?.length >= 0 ? endpointData.data : tableData?.length >= 0 ? tableData : data?.data || []);

  return (
    <Spin spinning={loading} tip="Loading Auditor General GA Meeting data...">
      <Comment
        data={endpointData || { data: tableData || data?.data || [], fulfillment: endpointData?.fulfillment || fulfillment || data?.fulfillment || "Not Fulfilled" }}
        year={year}
        districtId={districtId}
        tableCommentedId={`c1.0-1.1-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput, renderCommentList }) => (
          <>
            <Title level={3}>CI 4.0 General Assembly Meetings and Approvals - 4.3 Presentation of Auditor General’s Report to the General Assembly</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD, receive Minutes of Meeting of the General Assembly. <strong>{year}</strong>:
              <br />
              <br />
              <ol>
                <li type="i">
                  If the {year} Auditor General’s report was discussed by the Finance and Administration Subcommittee and the Executive Committee, and subsequently presented to the General Assembly for discussion.
                </li>
              </ol>
              <i>Then the CI is fulfilled</i>
            </Content>

            <Row align="middle">
              <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                CI Result:{" "}
                <strong style={{ color: (endpointData?.fulfillment || fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                  {endpointData?.fulfillment || fulfillment || data?.fulfillment || "Not Fulfilled"}
                </strong>
              </Title>
              {!hideComment && renderCommentInput()}
            </Row>

            {error && <Text type="danger">{error}</Text>}

            <Title level={4} style={{ marginTop: "20px" }}>Auditor General Report to the General Assembly</Title>
            {endpointData?.data?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Meeting Data from API
                </Title>
                <Table
                  columns={columns}
                  dataSource={transformData(endpointData.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.meeting || index}`}
                />
              </>
            ) : tableData?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Meeting Data from Props (gaMeetings/ecaMeeting)
                </Title>
                <Table
                  columns={columns}
                  dataSource={transformData(tableData)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.meeting || index}`}
                />
              </>
            ) : data?.data?.length > 0 ? (
              <>
                <Title level={5} style={ { marginTop: "20px" }}>
                  Meeting Data from Data Prop
                </Title>
                <Table
                  columns={columns}
                  dataSource={transformData(data.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.meeting || index}`}
                />
              </>
            ) : (
              <Table
                columns={columns}
                dataSource={[]}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.meeting || index}`}
                locale={{ emptyText: "No Auditor General GA Meeting data available" }}
              />
            )}

            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default AuditorGeneralGAMeeting;