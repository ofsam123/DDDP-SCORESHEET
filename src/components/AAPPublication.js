import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, Spin, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { formatDataGeneral, getAttributeValue, getFileLinkIfExist } from "../utils/utils";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";

const { Content } = Layout;
const { Title, Text } = Typography;

const AAPPublication = forwardRef(({ data, columns, year, districtId, hideComment }, ref) => {
  const { user } = useAuth();
  const [publication, setPublication] = useState(null);
  const [endpointData, setEndpointData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const publicationColumn = columns || [
    { title: "Date of Publication on Website", dataIndex: "date", key: "date" },
    { title: "Address of Website", dataIndex: "address", key: "address" },
    { title: "Evidence Attached", dataIndex: "evidence", key: "evidence" },
  ];

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE"
  )?.name || "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";

  useImperativeHandle(ref, () => ({
    getData: () => ({
      publication: endpointData || publication || data,
    }),
  }));

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
        if (relevantComment && relevantComment.dddpData?.tables?.aapPublication?.publication) {
          setEndpointData(relevantComment.dddpData.tables.aapPublication.publication);
          setError(null);
        } else {
          setEndpointData(null);
          // setError("No AAP Publication data found in assessment_start_DAPT comment");
        }

        // Fetch comments
        const filteredComments = commentResponse.data.filter(
          (comment) =>
            comment.tableCommented === `c4.0-4.2-${year}` &&
            comment.districtId === districtId &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        setComments(filteredComments);

        // Existing tracker API fetch
        const trackerResponse = await axios.get(`/tracker/trackedEntities?orgUnit=${districtId}&program=X5kGqVpbGoN`);
        if (trackerResponse.data.instances.length > 0) {
          const eventResponse = await axios.get(`/tracker/events?program=X5kGqVpbGoN&orgUnit=${districtId}`);
          const data = formatDataGeneral(trackerResponse.data.instances, "Document Published", "Annual Budget & Workplan") || [];
          setDataDisplay(data, eventResponse.data.instances);
        } else {
          setPublication(null);
        }
      } catch (error) {
        setError(`Failed to fetch AAP Publication data: ${error.message}`);
        setEndpointData(null);
        setPublication(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [districtId, year]);

  const handleDeleteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.username !== currentUsername) {
      message.error("You can only delete your own comments.");
      return;
    }
    try {
      await axios.delete(`comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      message.success("Comment deleted successfully");
    } catch (error) {
      message.error("Failed to delete comment");
    }
  };

  const setDataDisplay = (data, reports) => {
    const temp = [];
    let fulfillment = "Fulfilled";

    if (data?.length > 0) {
      data.forEach((val, idx) => {
        const supportLink = getFileLinkIfExist(reports, "xjRCTFFiMA3", val.trackedEntity);
        temp.push({
          key: idx,
          date: getAttributeValue("Published Date", val),
          address: getAttributeValue("Website", val),
          evidence: supportLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${supportLink}&dataElementUid=xjRCTFFiMA3`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Evidence
            </a>
          ) : (
            "Not Uploaded"
          ),
        });

        if (!supportLink) {
          fulfillment = "Not Fulfilled";
        }
      });
    }

    if (reports.length === 0 || temp.length === 0) {
      fulfillment = "Not Fulfilled";
    }

    setPublication({ data: temp, fulfillment, report: [] });
  };

  const transformData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    return dataArray.map((item) => ({
      ...item,
      evidence: typeof item.evidence === "object" && item.evidence?.props?.href ? (
        <a
          href={item.evidence.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.evidence.props.children || "View Evidence"}
        </a>
      ) : (
        item.evidence || "Not Uploaded"
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

  const dataSource = transformData(endpointData?.data?.length >= 0 ? endpointData.data : publication?.data?.length >= 0 ? publication.data : data?.data || []);

  return (
    <Spin spinning={loading} tip="Loading AAP Publication data...">
      <Comment
        data={endpointData || publication || data}
        year={year}
        districtId={districtId}
        tableCommentedId={`c4.0-4.2-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput, renderCommentList }) => (
          <>
            <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.2 Availability of Approved Annual Action Plan and Composite Budget</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD receive copies of the approved {year} Annual Action Plan and Composite Budget:
              <br />
              <br />
              <ol>
                <li type="i">
                  If the approved Annual Action Plan and Composite Budget were published on the Assembly’s website and
                </li>
                <li type="i" className="py-1">
                  If the approved Annual Action Plan and Composite Budget were distributed to members of the DPCU, Assembly Members, and Sub-Structures
                </li>
              </ol>
              <i>Then the CI is fulfilled</i>
            </Content>

            <Row align="middle">
              <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                CI Result:{" "}
                <strong style={{ color: (endpointData?.fulfillment || publication?.fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                  {endpointData?.fulfillment || publication?.fulfillment || data?.fulfillment || "N/A"}
                </strong>
              </Title>
              {!hideComment && renderCommentInput()}
            </Row>

            {error && <Text type="danger">{error}</Text>}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Publication of Annual Budget & Workplan</Title>
            {endpointData?.data?.length > 0 ? (
              <Table
                columns={publicationColumn}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            ) : publication?.data?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Publication Data from Tracker API
                </Title>
                <Table
                  columns={publicationColumn}
                  dataSource={transformData(publication.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : data?.data?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Publication Data from Prop
                </Title>
                <Table
                  columns={publicationColumn}
                  dataSource={transformData(data.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : (
              <Table
                columns={publicationColumn}
                dataSource={[]}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
                locale={{ emptyText: "No AAP Publication data available" }}
              />
            )}

            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default AAPPublication;