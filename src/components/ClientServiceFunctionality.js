import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row, Spin, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { getFileLinkIfExist,getAttributeValue } from "../utils/utils";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";

const { Content } = Layout;
const { Title, Text } = Typography;

const ClientServiceFunctionality = forwardRef(({ data, columns, reportColumns, year, districtId, hideComment }, ref) => {
  const { user } = useAuth();
  const [clientService, setClientService] = useState(null);
  const [endpointData, setEndpointData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clientServiceColumn = columns || [
    { title: "Date of Establishment", dataIndex: "date", key: "date" },
    { title: "Office Available (Yes/No)", dataIndex: "officeAvailability", key: "officeAvailability" },
    { title: "Complaint Book Available (Yes/No)", dataIndex: "bookAvailability", key: "bookAvailability" },
    { title: "Work Plan Available (Yes/No)", dataIndex: "planAvailability", key: "planAvailability" },
    { title: "Schedule Officer Name", dataIndex: "officerName", key: "officerName" },
    { title: "Dedicated Telephone Number", dataIndex: "phone", key: "phone" },
  ];

  const clientServiceReportColumn = reportColumns || [
    { title: "Title of Report on Activities", dataIndex: "report", key: "report" },
    { title: "Date of Report", dataIndex: "date", key: "date" },
    { title: "Attachments", dataIndex: "attachments", key: "attachments" },
  ];

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE"
  )?.name || "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";

  useImperativeHandle(ref, () => ({
    getData: () => ({
      clientService: endpointData || clientService || data,
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
        if (relevantComment && relevantComment.dddpData?.tables?.clientServiceFunctionality?.clientService) {
          setEndpointData(relevantComment.dddpData.tables.clientServiceFunctionality.clientService);
          setError(null);
        } else {
          setEndpointData(null);
          setError("No Client Service Unit data found in assessment_start_DAPT comment");
        }

        // Fetch comments
        const filteredComments = commentResponse.data.filter(
          (comment) =>
            comment.tableCommented === `c4.0-4.1-${year}` &&
            comment.districtId === districtId &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        setComments(filteredComments);

        // Existing tracker API fetch
        const trackerResponse = await axios.get(`/tracker/trackedEntities?orgUnit=${districtId}&program=GciA0HJcRzN`);
        if (trackerResponse.data.instances.length > 0) {
          const eventResponse = await axios.get(`/tracker/events?program=GciA0HJcRzN&orgUnit=${districtId}`);
          setClientServiceDataDisplay(trackerResponse.data.instances, eventResponse.data.instances);
        } else {
          setClientService(null);
        }
      } catch (error) {
        setError(`Failed to fetch Client Service Unit data: ${error.message}`);
        setEndpointData(null);
        setClientService(null);
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

  const getAttributeValue = (key, val) => {
    const attr = val?.attributes.find((attr) => attr.displayName === key);
    return attr ? attr.value : "N/A";
  };

  const setClientServiceDataDisplay = (data, reports) => {
    const clientServiceTemp = [];
    const clientServiceReport = [];

    let fulfillment = "Not Fulfilled";

    if (data?.length > 0) {
      data.forEach((val, idx) => {
        const complaintLink = getFileLinkIfExist(reports, "fHGCEnkTRnW", val.trackedEntity);
        const workPlanLink = getFileLinkIfExist(reports, "RnjmtOxz2V5", val.trackedEntity);
        const reportLink = getFileLinkIfExist(reports, "TH0o7vTWcAy", val.trackedEntity);

        clientServiceTemp.push({
          key: idx,
          date: getAttributeValue("Established Date", val),
          officeAvailability: getAttributeValue("Office Available (Yes/No)", val) === "true" ? "YES" : "NO",
          officerName: getAttributeValue("Schedule Officer Name", val),
          phone: getAttributeValue("Dedicated Mobile Number", val),
          bookAvailability: complaintLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${complaintLink}&dataElementUid=fHGCEnkTRnW`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Complaint Book
            </a>
          ) : (
            "Not Uploaded"
          ),
          planAvailability: workPlanLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${workPlanLink}&dataElementUid=RnjmtOxz2V5`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Work Plan
            </a>
          ) : (
            "Not Uploaded"
          ),
        });

        const currentReport = reports.find((rep) => rep.trackedEntity === val.trackedEntity);

        if (currentReport) {
          const dataReportSet = {
            report: "",
            date: "",
            attachments: reportLink ? (
              <a
                className="px-2 text-primary fw-bold text-decoration-underline"
                href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=TH0o7vTWcAy`}
                target="_blank"
                rel="noopener noreferrer"
                title="Click here to see the uploaded document"
              >
                View Report
              </a>
            ) : (
              "Not Uploaded"
            ),
          };

          currentReport.dataValues.forEach((rep) => {
            if (rep.dataElement === "EXpYmoD23TM") {
              dataReportSet.report = rep.value;
            } else if (rep.dataElement === "ISuGmawTpiF") {
              dataReportSet.date = rep.value;
            }
          });

          clientServiceReport.push(dataReportSet);
        }
      });
    }

    if (clientServiceTemp.length > 0 && clientServiceReport.length > 0) {
      fulfillment = "Fulfilled";
    }

    setClientService({ data: clientServiceTemp, fulfillment, report: clientServiceReport });
  };

  const transformData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray)) return [];
    return dataArray.map((item) => ({
      ...item,
      bookAvailability: typeof item.bookAvailability === "object" && item.bookAvailability?.props?.href ? (
        <a
          href={item.bookAvailability.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.bookAvailability.props.children || "View Complaint Book"}
        </a>
      ) : (
        item.bookAvailability || "Not Uploaded"
      ),
      planAvailability: typeof item.planAvailability === "object" && item.planAvailability?.props?.href ? (
        <a
          href={item.planAvailability.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.planAvailability.props.children || "View Work Plan"}
        </a>
      ) : (
        item.planAvailability || "Not Uploaded"
      ),
      attachments: typeof item.attachments === "object" && item.attachments?.props?.href ? (
        <a
          href={item.attachments.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.attachments.props.children || "View Report"}
        </a>
      ) : (
        item.attachments || "Not Uploaded"
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

  const dataSource = transformData(endpointData?.data?.length >= 0 ? endpointData.data : clientService?.data?.length >= 0 ? clientService.data : data?.data || []);
  const reportDataSource = transformData(endpointData?.report?.length >= 0 ? endpointData.report : clientService?.report?.length >= 0 ? clientService.report : data?.report || []);

  return (
    <Spin spinning={loading} tip="Loading Client Service Unit data...">
      <Comment
        data={endpointData || clientService || data}
        year={year}
        districtId={districtId}
        tableCommentedId={`c4.0-4.1-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput, renderCommentList }) => (
          <>
            <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.1 Functionality of Client Service Unit (CSU)</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
            <Content>
              From the DCD receive information on the Client Service Unit:
              <br />
              <br />
              <ol>
                <li type="i">
                  If the Client Service Unit has been established with a schedule officer, dedicated telephone number, and is functional; and
                </li>
                <li type="i" className="py-1">
                  If there is a report on activities of the Client Service Unit.
                </li>
              </ol>
              <i>Then the CI is fulfilled</i>
            </Content>

            <Row align="middle">
              <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                CI Result:{" "}
                <strong style={{ color: (endpointData?.fulfillment || clientService?.fulfillment || data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                  {endpointData?.fulfillment || clientService?.fulfillment || data?.fulfillment || "N/A"}
                </strong>
              </Title>
              {!hideComment && renderCommentInput()}
            </Row>

            {error && <Text type="danger">{error}</Text>}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Establishment of Client Service Unit</Title>
            {endpointData?.data?.length > 0 ? (
              <Table
                columns={clientServiceColumn}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            ) : clientService?.data?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Client Service Data from Tracker API
                </Title>
                <Table
                  columns={clientServiceColumn}
                  dataSource={transformData(clientService.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : data?.data?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Client Service Data from Prop
                </Title>
                <Table
                  columns={clientServiceColumn}
                  dataSource={transformData(data.data)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : (
              <Table
                columns={clientServiceColumn}
                dataSource={[]}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
                locale={{ emptyText: "No Client Service Unit data available" }}
              />
            )}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Client Service Unit Report</Title>
            {endpointData?.report?.length > 0 ? (
              <Table
                columns={clientServiceReportColumn}
                dataSource={transformData(endpointData.report)}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
              />
            ) : clientService?.report?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Report Data from Tracker API
                </Title>
                <Table
                  columns={clientServiceReportColumn}
                  dataSource={transformData(clientService.report)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : data?.report?.length > 0 ? (
              <>
                <Title level={5} style={{ marginTop: "20px" }}>
                  Report Data from Prop
                </Title>
                <Table
                  columns={clientServiceReportColumn}
                  dataSource={transformData(data.report)}
                  pagination={false}
                  bordered
                  rowKey={(record, index) => `${record.key || index}`}
                />
              </>
            ) : (
              <Table
                columns={clientServiceReportColumn}
                dataSource={[]}
                pagination={false}
                bordered
                rowKey={(record, index) => `${record.key || index}`}
                locale={{ emptyText: "No Client Service Unit report data available" }}
              />
            )}

            {renderCommentList()}
          </>
        )}
      </Comment>
    </Spin>
  );
});

export default ClientServiceFunctionality;