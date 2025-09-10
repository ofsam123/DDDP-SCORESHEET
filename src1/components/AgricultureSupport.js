import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

const AgricultureSupport = forwardRef(({ year, districtId, hideComment }, ref) => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  const [agricultureSupport, setAgricultureSupport] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "PI5",
      area: "Access to Social Services",
      maxScore,
      agricultureSupport,
      score
    }),
  }));

  const agricultureSupportColumns = [
    { title: "No. of AEAs", dataIndex: "noOfAEAs", key: "noOfAEAs" },
    { title: "No of Operational Areas", dataIndex: "noOfoperational", key: "noOfoperational" },
    { title: "Data on mapping of AEAs to operational areas", dataIndex: "mapping", key: "mapping" }
  ];

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=zordSafiO6O&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=zordSafiO6O&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const agricultures = result.data.instances;
              setAgricultureSupport([{
                noOfAEAs: agricultures.length,
                noOfoperational: agricultures.length,
                mapping: "1:1"
              }]);

              if (agricultures.length > 0) {
                setScore(1)
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Comment
      data={agricultureSupport}
      year={year}
      districtId={districtId}
      tableCommentedId={`pi5.0-5.3-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.3 Support to Agriculture</Title>
          <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on Agricultural services:<br /><br />
            <ol>
              <li type="i">
                If the District has a list of Agricultural Extension Agents (AEAs) and information on their mapping
                to Operational Areas for delivery of support services to farmers, etc., score 1
              </li>
            </ol>
          </Content>

          <Title level={5} style={{ marginTop: "20px" }}>
            Maximum Score <strong>{maxScore}</strong>
          </Title>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              PI 5.0-5.3 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={5} style={{ marginTop: "20px" }}>
            Evidence of AEAs and operational areas
          </Title>
          <Table
            columns={agricultureSupportColumns}
            dataSource={agricultureSupport || []}
            pagination={false} bordered />

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default AgricultureSupport;