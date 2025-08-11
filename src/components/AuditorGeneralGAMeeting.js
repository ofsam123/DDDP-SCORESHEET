import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import { each } from "chart.js/helpers";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AuditorGeneralGAMeeting({ gaMeetings, ecaMeeting, year, columns, districtId, ecaColumns }) {

     const [fulfillment, seFulfillment] = useState("Not Fulfilled");
     

    useEffect(()=>{
        console.log("djiba data: ",{gaMeetings, ecaMeeting})
        console.log("colums: ", {columns, ecaColumns})

        if(ecaMeeting.fulfillment === "Fulfillment" && gaMeetings.fulfillment === "Fulfillment"){
            seFulfillment("Fulfilled");
        }
    
    },[districtId, year])

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

          {gaMeetings &&  <Table columns={columns} dataSource={gaMeetings} pagination={false} bordered />}
          {ecaMeeting && <Table columns={ecaColumns} dataSource={ecaMeeting} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default AuditorGeneralGAMeeting;