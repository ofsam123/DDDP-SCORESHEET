import React from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title } = Typography;

function InternalAuditUnitFunctionality({ data, year, columns, meetings, meetingColumns, districtId }) {
  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c3.0-3.2-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 3.0 Public Financial Management and Auditing - 3.2 Functionality of the Internal Audit Unit</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, obtain information on the Internal Audit Unit of the Assembly.<br /><br />
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
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red" }}>{data?.fulfillment}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Internal Audit Committee Records</Title>
          {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Audit Committee Meetings</Title>
          {meetings && <Table columns={meetingColumns} dataSource={meetings} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default InternalAuditUnitFunctionality;