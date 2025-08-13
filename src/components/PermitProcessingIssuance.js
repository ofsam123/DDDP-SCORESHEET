import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

function PermitProcessingIssuance({
  year,
  districtId
}) {
  const [data, setData] = useState([]);
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    getIndicatorsData();
  }, [year, districtId]);

  const dataColumn = [
    { title: `No. of Building Permit Requests Received in ${year} (A)`, dataIndex: "permitRequest", key: "permitRequest" },
    { title: `No. of Building Permit Requests Processed & Issued in ${year} (B)`, dataIndex: "permitIssued", key: "permitIssued" },
    { title: "No. of approved permits traced to Local Plans (C)", dataIndex: "permitTraced", key: "permitTraced" }
  ];

  const getIndicatorsData = () => {
    axios.get(`/analytics.json?dimension=dx:I4F0ubwWfun;IXslJdAFMYW;m8yHdlshnwa&dimension=ou:LEVEL-3;${districtId}&filter=pe:${year}-01-01;${year}-12-31`)
      .then(res => {
        const data = res.data?.rows;
        const length = data?.length;

        if (length > 0) {
          const temp = {
            permitRequest: data[0][2],
            permitIssued: length > 1 ? data[1][2] : 0,
            permitTraced: length > 2 ? data[2][2] : 0
          }

          setData([temp]);

          if (length > 1) {
            if (data[0][2] == data[1][2]) {
              setScorei(2)
            }
          }

          if (length > 2) {
            if (data[1][2] == data[2][2]) {
              setScoreii(1);
            }
          }
        }
      }).catch(err => console.log(err));
  }

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi3.0-3.2-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 3.0 - 3.2 Planning and Development Permit Processing & Issuance</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD obtain information on the number of Planning Permit and Development Permit applications and
            Spatial Planning Committee decision on Applications for <strong>year</strong>:<br /><br />
            <ol>
              <li type="i">
                If all the planning and development permit applications received were processed,
                approved/deferred/refused, issued and communicated to applicants within 30 working days
                of receipt of applications, by the Spatial Planning Committee, score 2 and
              </li>
              <li type="i" className="py-1">
                If all the planning and development permits received, approved and issued to applicants
                in {year} are traceable to the approved Local Plans, score 1, else score 0
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 3.0-3.2i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 3.0-3.2ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Processing & Issuance of Building Permit
            Requests</Title>
          {<Table
            columns={dataColumn}
            dataSource={data || []}
            pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default PermitProcessingIssuance;