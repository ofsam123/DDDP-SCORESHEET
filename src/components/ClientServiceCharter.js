import { Layout, Table, Typography, Row,Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Comment from "../components/Comments";
import axios from "../api/axios";
import { formatDataGeneral, getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const ClientServiceCharter = forwardRef(({
  year,
  districtId,
  hideComment

}, ref) => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [clientServiceCharter, setClientServiceCharter] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(1);

  useEffect(() => {
    getData();
  }, [year, districtId]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI2",
      area: "Basic/ Social Services",
      maxScore,
      clientServiceCharter, score
    }),
  }));

  const permitRequestColumn = [
    { title: "Client Service Charter Availability (YES/NO)", dataIndex: "availability", key: "availability" },
    { title: "Date Approved", dataIndex: "approvalDate", key: "approvalDate" },
    { title: "Document Reference", dataIndex: "docReference", key: "docReference" },
    { title: "Web site", dataIndex: "webSiteLink", key: "webSiteLink" },
    { title: "Channel", dataIndex: "channel", key: "channel" },
    { title: "Document", dataIndex: "document", key: "document" }
  ];

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=X5kGqVpbGoN`)
      .then(result => {

        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=X5kGqVpbGoN&orgUnit=${districtId}`)
            .then(resp => {

              const data = formatDataGeneral(result.data.instances, "Document Published", "Client Service Charter") || [];
              const reports = resp.data.instances;
              const temp = [];
              let tempScore = 1;

              data.forEach((document, index) => {

                const reportLink = getFileLinkIfExist(reports, "xjRCTFFiMA3", document.trackedEntity);

                const tempDataSet = {
                  availability: reportLink ? "YES" : "NO",
                  approvalDate: getAttributeValue("Document Approval Date", document),
                  docReference: getAttributeValue("Document Reference ", document),
                  channel: getAttributeValue("Publication Channel", document),
                  webSiteLink: getAttributeValue("Website", document),
                  document: reportLink ? (
                    <a
                      className="px-2 text-primary fw-bold text-decoration-underline"
                      href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=xjRCTFFiMA3`} target="_blank"
                      rel="noopener noreferrer"
                      title="Click here to see the uploaded document"
                    >
                      View Evidence
                    </a>
                  ) : (
                    "Not Uploaded"
                  ),
                };

                temp.push(tempDataSet);

                if (!reportLink) {
                  tempScore = 0;
                }
              });

              if (temp.length === 0) {
                tempScore = 0;
              }

              setScore(tempScore);

              setClientServiceCharter(temp);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("decisions error ", err));
  }

  return (
    <Comment
      data={clientServiceCharter}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi2.0-2.5-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.5 Availability of Client Service Charter</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive a copy of the Client Service Charter of the Assembly:<br /><br />
            <ol>
              <li type="i">If the Assembly has a Client Service Charter evidenced by a resolution of the General Assembly
                approving the Charter, have been displayed on the Assembly premises and website; score 1;</li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
              SDI 2.0-2.5 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
          <Content>
            <p>We received and reviewed information on the Client Service Charter from the MCD and notes as follows:</p>
            <p>The minutes of the GA meeting for the approval of the Client Service Charter, signed by the PM and MCD, was reviewed as follows:</p>
          </Content>

          {<Table
            columns={permitRequestColumn}
            dataSource={clientServiceCharter}
            pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default ClientServiceCharter;