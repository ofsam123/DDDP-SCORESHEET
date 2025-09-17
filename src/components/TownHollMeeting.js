import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";
import { each } from "chart.js/helpers";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const TownHollMeeting = forwardRef(({ meetings, year, columns, districtId, hideComment }, ref) => {

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "CI4",
      area: "Transparency, Accountability & Participation",
      meetings
    }),
  }));

  return (
    <Comment
      data={meetings?.data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c4.0-4.4-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 4.0 General Assembly Meetings and Approvals - 4.4 Organization of Town Hall Meetings & MMDCEs Engagement with Communities </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>

          <Content>
            From the DCD, receive reports on Town Hall Meetings and MMDCEs engagements with communities. <strong>{year}</strong>:<br /><br />
            <ol>
              <li type="i">
                If the Assembly organized at least two (2) Town Hall Meetings on the
                implementation of Annual Budget and Work Plans (in the first quarter)
                and preparation of the Annual Budget and Work Plans (in the third quarter) respectively,
                using PFM templates; and.</li>

              <li type="i">
                If the MMDCE held Community Durbars in at least 20% of communities in District Assemblies,
                30% in Municipal Assemblies, and 50% in Metropolitan Assemblies, addressing grievances of
                the communities.
              </li>
            </ol>

            <i>Then the CI is fulfilled</i>
          </Content>

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: meetings?.fulfillment === "Fulfilled" ? "green" : "red" }}>{meetings?.fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>
            Town Hall Meeting Evidence with Reports
          </Title>

          {meetings?.data && <Table columns={columns} dataSource={meetings?.data} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default TownHollMeeting;