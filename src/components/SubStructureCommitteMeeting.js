import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";
import { getAttributeValue } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SubStructureCommiteeMeeting = forwardRef (({ data, year, columns, memberColumns, districtId, meetingColumns, hideComment }, ref )=> {
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState(null);
  const [endpointData, setEndpointData] = useState(null);
  const [endpointDepartments, setEndpointDepartments] = useState(null);
  const [endpointMembers, setEndpointMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useImperativeHandle(ref , ()=> ({
    getData: () => ({
       data
    })
  }))

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

  // Fetch prop-based departments and members from /tracker/trackedEntities
  function getMemebers() {
    instance
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=NdogHaFyDuI`)
      .then((result) => {
        const data = result.data.instances;
        const temp = [];

        data.forEach((item, index) => {
          const dataState = {
            no: index + 1,
            name: getAttributeValue("Name", item),
            type: getAttributeValue("Assembly Member Type", item),
            department: getAttributeValue("Sub Statutory Committee Department", item),
          };
          temp.push(dataState);
        });

        const departmentCounts = Object.values(
          temp.reduce((acc, { department }) => {
            if (!acc[department]) {
              acc[department] = { department, count: 0 };
            }
            acc[department].count++;
            return acc;
          }, {})
        ).map((dept, index) => ({
          key: index + 1,
          ...dept,
        }));

        setDepartments(departmentCounts);
        setMembers(temp);
        console.log("Prop departments:", departmentCounts);
        console.log("Prop members:", temp);
      })
      .catch((err) => {
        // console.error("Failed to fetch members:", err);
        // setError(`Failed to fetch members data: ${err.message}`);
      });
  }

  // Fetch endpoint data from /DPAT
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
          setEndpointDepartments(null);
          setEndpointMembers(null);
        } else if (!relevantComment.dddpData?.tables?.subStatutoryData) {
          setError("No subStatutoryData found in assessment_start_DAPT comment");
          setEndpointData(null);
          setEndpointDepartments(relevantComment.dddpData?.tables?.subCommitteeDepartments || null);
          setEndpointMembers(relevantComment.dddpData?.tables?.subCommitteeMembers || null);
        } else {
          setEndpointData(relevantComment.dddpData.tables.subStatutoryData);
          setEndpointDepartments(relevantComment.dddpData?.tables?.subCommitteeDepartments || null);
          setEndpointMembers(relevantComment.dddpData?.tables?.subCommitteeMembers || null);
          setError(null);
          console.log("Fetched subStatutoryData:", relevantComment.dddpData.tables.subStatutoryData);
          console.log("Fetched subCommitteeDepartments:", relevantComment.dddpData?.tables?.subCommitteeDepartments);
          console.log("Fetched subCommitteeMembers:", relevantComment.dddpData?.tables?.subCommitteeMembers);
        }
      } catch (error) {
        console.error("Failed to fetch endpoint data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        const errorMsg = error.response?.status === 404
          ? `Endpoint not found: comments/tables/${districtId}/${year}/DPAT. Please verify the endpoint or check server availability.`
          : `Failed to fetch Sub-Committee Meeting data: ${error.message}`;
        setError(errorMsg);
        setEndpointData(null);
        setEndpointDepartments(null);
        setEndpointMembers(null);
      } finally {
        setLoading(false);
      }
    };

    getMemebers();
    fetchEndpointData();
  }, [districtId, year]);

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.2-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.2 Meetings of the Sub-Committees of the Assembly</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD receive and confirm the composition, attendance,
            and minutes of the meetings of the five Statutory Sub-Committees in <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                If each of the 5 Statutory Sub-committees held at least one meeting prior to each of the three meetings of the EC/A in {year} and minutes
                are recorded and signed by both the secretary and the chairperson of sub-committees
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

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Sub-Committee Meetings Held Prior to EC/A Meetings</Title>
          
          {endpointData?.data && endpointData.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Endpoint Sub-Committee Meetings (subStatutoryData)
              </Title>
              <Table
                columns={meetingColumns}
                dataSource={transformData(endpointData.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `endpoint-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No endpoint sub-committee meeting data available</Text>
          )}

          {data?.data && data.data.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Prop Sub-Committee Meetings
              </Title>
              <Table
                columns={meetingColumns}
                dataSource={transformData(data.data)}
                pagination={false}
                bordered
                rowKey={(record, index) => `prop-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No prop sub-committee meeting data available</Text>
          )}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Composition of Sub-Committees – Summary</Title>
          
          {endpointDepartments && endpointDepartments.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Endpoint Department Summary (subCommitteeDepartments)
              </Title>
              <Table
                columns={columns}
                dataSource={endpointDepartments}
                pagination={false}
                bordered
                rowKey={(record, index) => `endpoint-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No endpoint department summary data available</Text>
          )}

          {departments && departments.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Prop Department Summary
              </Title>
              <Table
                columns={columns}
                dataSource={departments}
                pagination={false}
                bordered
                rowKey={(record, index) => `prop-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No prop department summary data available</Text>
          )}

          <Title level={4} style={{ marginTop: "20px" }}>Membership of Statutory Sub-Committees</Title>
          
          {endpointMembers && endpointMembers.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Endpoint Membership (subCommitteeMembers)
              </Title>
              <Table
                columns={memberColumns}
                dataSource={endpointMembers}
                pagination={false}
                bordered
                rowKey={(record, index) => `endpoint-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No endpoint membership data available</Text>
          )}

          {members && members.length > 0 ? (
            <>
              <Title level={5} style={{ marginTop: "20px" }}>
                Prop Membership
              </Title>
              <Table
                columns={memberColumns}
                dataSource={members}
                pagination={false}
                bordered
                rowKey={(record, index) => `prop-${record.key || index}`}
              />
            </>
          ) : (
            <Text>No prop membership data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );

}
);

export default SubStructureCommiteeMeeting;