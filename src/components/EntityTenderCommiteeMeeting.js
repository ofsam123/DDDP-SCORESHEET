import React from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title } = Typography;

function EntityTenderCommitteeMeeting({ data, year, columns, districtId }) {
  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.5-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.5 Meetings of the Technical SubCommittee and Spatial Planning Committee (SPC)</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD obtain information on the membership of the Technical SubCommittee and Spatial Planning Committee, 
            invitation letters to meetings and minutes of monthly meetings for <strong>{year}</strong>.<br /><br />
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
              CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red" }}>{data?.fulfillment}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Spatial Planning Committee (SPC) Meeting</Title>
          {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default EntityTenderCommitteeMeeting;