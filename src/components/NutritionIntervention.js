import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

const NutritionIntervention = forwardRef(({
  year,
  districtId,
  data,
  hideComment
}, ref) => {
  const [scorei, setScorei] = useState(0);
  const [maxScore, setMaxScore] = useState(2);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {

    if ((data?.vendors?.length > 0 && data?.publications?.length > 0)) {
      setScorei(2);
    }
  }, [year, districtId, data]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI4",
      area: "Social Protection, Gender and Nutrition",
      maxScore,
      data,
      scorei
    }),
  }));

  const aapColumn = [
    { title: "No. of Activities in the AAP of the Assembly", dataIndex: "aapTotal", key: "aapTotal" },
    { title: "No. of Nutrition-oriented interventions", dataIndex: "aapNutrition", key: "aapNutrition" },
    {
      title: "Nutrition-oriented interventions published on Assembly website or notice board (Yes/No)",
      dataIndex: "publication",
      key: "publication"
    }
  ];

  const nutritionColumn = [
    { title: "Vendors", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "TIN", dataIndex: "tin", key: "tin" },
    { title: "Vendor Nutrition Orientation", dataIndex: "orientation", key: "orientation" }
  ];

  const permitRequestColumn = [
    { title: "Client Service Charter Availability (YES/NO)", dataIndex: "availability", key: "availability" },
    { title: "Document Reference", dataIndex: "docReference", key: "docReference" },
    { title: "Web site", dataIndex: "webSiteLink", key: "webSiteLink" },
    { title: "Channel", dataIndex: "channel", key: "channel" },
    { title: "Document", dataIndex: "document", key: "document" }
  ];

  return (
    <Comment
      data={data?.aap}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi4.0-4.6-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 4.0 - 4.6 Nutrition Services</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on Nutrition activities in the District:<br /><br />
            <ol>
              <li type="i">
                If the Assembly has oriented food vendors and school feeding programme contractors on nutrition, score 2
              </li>

            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 4.0-4.6 Actual Score: <strong>{scorei}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Nutrition-Oriented Activities in the Assembly</Title>
          <Table
            columns={aapColumn}
            dataSource={data?.aap || []}
            pagination={false} bordered />

          <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of Nutrition Orientations</Title>
          <Table
            columns={nutritionColumn}
            dataSource={data?.vendors || []}
            pagination={false} bordered />

          <Title level={4} style={{ marginTop: "20px" }}>III- Evidence of Nutrition Service Publication</Title>
          <Table
            columns={permitRequestColumn}
            dataSource={data?.publications || []}
            pagination={false} bordered />



          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default NutritionIntervention;