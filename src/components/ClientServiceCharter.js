import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comments";

function ClientServiceCharter({
  year,
  ClientServiceCharter,
  districtId
}) {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (ClientServiceCharter.length > 0) {
      const cl = ClientServiceCharter[0];
      if (cl.availability === "YES" && cl.approvalDate && cl.docReference) {
        setScore(1);
      }
    }
  }, [ClientServiceCharter]);

  const permitRequestColumn = [
    { title: "Client Service Charter Availability (YES/NO)", dataIndex: "availability", key: "availability" },
    { title: "Date Approved", dataIndex: "approvalDate", key: "approvalDate" },
    { title: "Evidence of Approval (Minutes of Meeting / Resolution)", dataIndex: "docReference", key: "docReference" }
  ];

  return (
    <Comment
      data={ClientServiceCharter}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi2.0-2.5-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.5 Availability of Client Service Charter</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive a copy of the Client Service Charter of the Assembly:<br /><br />
            <ol>
              <li type="i">If the Assembly has a Client Service Charter evidenced by a resolution of the General Assembly approving the Charter, have been displayed on the Assembly premises or website; score 1;</li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>1</strong></Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 2.0-2.5 Actual Score: <strong>{score}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
          <Content>
            <p>We received and reviewed information on the Client Service Charter from the MCD and notes as follows:</p>
            <p>The minutes of the GA meeting for the approval of the Client Service Charter, signed by the PM and MCD, was reviewed as follows:</p>
          </Content>

          {<Table
            columns={permitRequestColumn}
            dataSource={ClientServiceCharter || []}
            pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default ClientServiceCharter;