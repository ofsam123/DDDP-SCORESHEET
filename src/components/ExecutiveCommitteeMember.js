import React from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title } = Typography;

function ExecutiveCommitteeMember({ data, year, columns, districtId }) {
  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.1-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.1 Executive Committee Membership</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, obtain information on the membership of the Executive Committee for <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                Confirm that the Executive Committee is duly constituted as per legal requirements.
              </li>
              <li type="i">
                Verify that membership records are complete and documented.
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

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Executive Committee Membership</Title>
          {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default ExecutiveCommitteeMember;