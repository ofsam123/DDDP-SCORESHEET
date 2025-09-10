import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Comment from "../components/Comments";

const SanitationServices = forwardRef(({
  year,
  sanitationProvidersData,
  districtId,
  hideComment
}, ref) => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(3);
  const [percentage, setPercentage] = useState(
    sanitationProvidersData.length > 0 ? sanitationProvidersData[0].percentage : 0
  );

  useEffect(() => {
    if (sanitationProvidersData.length > 0) {
      if (sanitationProvidersData[0].percentage >= 20) {
        setScore(3);
      }
    }
  }, [sanitationProvidersData, year]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI2",
      area: "Basic/ Social Services",
      maxScore,
      sanitationProvidersData,
      score,
      percentage
    }),
  }));

  const serviceProvidersColumn = [
    { title: `Total IGF collected for the ${year} (A)`, dataIndex: "ifgCollected", key: "ifgCollected" },
    { title: "Total IGF spent on sanitation improvement services (B)", dataIndex: "igfSpentOnSanitation", key: "igfSpentOnSanitation" },
    { title: "% of IGF spent on sanitation improvementservices (C)", dataIndex: "percentage", key: "percentage" }
  ];

  return (
    <Comment
      data={sanitationProvidersData}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi2.0-2.3-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.3 Sanitation Services</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive information on the utilisation of the IGF collected for the year:<br /><br />
            <ol>
              <li type="i">If at least 20% of the IGF was spent on sanitation improvement services in the District and there is evidence of implementation, score 3;</li>
            </ol>

            <b><u>Eligible Expenditures are below:</u></b>
            <ul>
              <li>Activities and programmes on Solid Waste Management – Collection, Haulage or Transportation, Disposal or Treatment or Reuse</li>
              <li>Activities and programmes on Liquid Waste Management and Drain Cleansing – Containment, Collection, Transportation/Conveyance, Disposal or Treatment or Reuse</li>
              <li>Activities on Food Hygiene and Safety</li>
              <li>Sanitation Legislation and Enforcement Management</li>
              <li>Evidence of Monthly Sanitation Day Exercises</li>
            </ul>
          </Content>

          <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
          {/* {JSON.stringify(sanitationProvidersData)} */}

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
              SDI 2.0-2.2i Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of IGF expenditure on sanitation improvement services</Title>
          {sanitationProvidersData && <Table
            columns={serviceProvidersColumn}
            dataSource={sanitationProvidersData}
            pagination={false} bordered />}

          <Content>
            Calculated as: % of IGF i=on Sanitation = (B/A) x 100
          </Content>
          <Title level={5} style={{ marginTop: "10px" }}>Conclusion:</Title>
          <Content>
            Percentage of total expenditure on sanitation services on total IGF collected
            is  {percentage} %. And there is evidence of implementation
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default SanitationServices;