import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import { each } from "chart.js/helpers";

const { Header, Content } = Layout;
const { Title, Text } = Typography;


const columns = [
  { "title": "Minute Ref.", "dataIndex": "meeting", "key": "meeting" },
  { "title": "Meeting Type", "dataIndex": "meetingType", "key": "meetingType" },
  { "title": "Minutes Link", "dataIndex": "minutes", "key": "minutes" }
]

function AuditorGeneralGAMeeting({ gaMeetings, ecaMeeting, year, districtId }) {

  const [fulfillment, seFulfillment] = useState("Not Fulfilled");
  const [data, setData] = useState(null);


  useEffect(() => {
    // console.log("djiba cherie data: ", { gaMeetings, ecaMeeting })
    const temp = [];
    let fulfilled = "Fulfilled";

    if (gaMeetings?.meetings) {
      gaMeetings.meetings.forEach(val => {
        const tempDataSet = {
          meeting: val.signatoriesMinutes,
          meetingType: "GA Meeting",
          minutes: val.docs
        };

        if(val.docs === "Not Uploaded"){
            fulfilled = "Not Fulfilled";
        }

        temp.push(tempDataSet);
      });
    }

     if (ecaMeeting?.data) {
      ecaMeeting.data.forEach(val => {
        const tempDataSet = {
          meeting: val.minutes,
          meetingType: "EC Meeting",
          minutes: val.docs
        };

        if(val.docs === "Not Uploaded"){
            fulfilled = "Not Fulfilled";
        }

        temp.push(tempDataSet);
      });
    }

    
      seFulfillment(fulfilled);
      setData(temp)
  
  }, [districtId, year, fulfillment])

  return (
    <Comment
      data={gaMeetings}
      year={year}
      districtId={districtId}
      tableCommentedId={`c1.0-1.1-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 4.0 General Assembly Meetings and Approvals - 4.3 Presentation of
            Auditor General’s Report to the General Assembly </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>

          <Content>
            From the DCD, receive Minutes of Meeting of the General Assembly. <strong>{year}</strong>:<br /><br />
            <ol>
              <li type="i">
                If the {year} Auditor General’s report was discussed by the Finance and Administration
                Subcommittee and the Executive Committee, and subsequently presented to the
                General Assembly for discussion.</li>
            </ol>

            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: fulfillment === "Fulfilled" ? "green" : "red" }}>{fulfillment}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>
            Auditor General Report to the General Assembly
          </Title>

          {data && <Table columns={columns} dataSource={data} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default AuditorGeneralGAMeeting;