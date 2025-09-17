import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";
import { calculatePercentage } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const GeneralAssemblyDecision = forwardRef(({
  data, year, columns, decisionDeliveryData, serviceDeliveryDecisionColumns, districtId, hideComment
}, ref) => {
  const [gaDecisionScore, setGaDecisionScore] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(1);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI1",
      area: "Management Coordination – Implementation of Service Delivery Decisions",
      maxScore,
      data, decisionDeliveryData, 
      gaDecisionScore,
      score
    }),
  }));

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi1.0-1.1-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>SDI 1.0 - 1.1 General Assembly Decisions</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive signed Minutes of Meetings of the three mandatory Meetings of the General Assembly:<br /><br />
            <ol>
              <li type="i">
                If The General Assembly took at least 70% decisions on improving service delivery in any
                sector of the District, score 1;
              </li>
            </ol>

            <i>Examples of services: Water, Electric power, Health, Education,
              Transportation, Roads, Sanitation, Recreational services and Security.
            </i>
          </Content>
          <Title level={5} style={{ marginTop: "20px" }}>
            Maximum Score <strong>{maxScore}</strong>
          </Title>

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 1.0-1.1 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Management Meetings</Title>

          {data && <Table columns={columns} dataSource={data} pagination={false} bordered
            summary={pageData => {
              let totalDecision = 0, totalDelivered = 0, totalPercent = 0;

              pageData.forEach(({ total, serviceDecision }) => {
                totalDecision += Number(total);
                totalDecision = parseFloat(totalDecision.toFixed(2));
                totalDelivered += Number(serviceDecision);
                totalDelivered = parseFloat(totalDelivered.toFixed(2));
              });

              const percentage = calculatePercentage(totalDelivered, totalDecision);

              setGaDecisionScore(parseFloat(percentage.toFixed(2)));

              if(gaDecisionScore > 70){
                setScore(1);
              }

              return (<>
                <Table.Summary.Row style={{ fontWeight: 'bold' }}>
                  <Table.Summary.Cell>Total Decisions</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text>{totalDecision}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text>{totalDelivered}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Text>{parseFloat(percentage.toFixed(2))}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>)
            }}
          />}
          <Title level={5} style={{ marginTop: "20px" }}>Service Delivery Decisions</Title>
          {decisionDeliveryData && <Table columns={serviceDeliveryDecisionColumns} dataSource={decisionDeliveryData} pagination={false} bordered />}

          <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
          <Content>
            The decisions that were on improving service delivery was {`${gaDecisionScore}%`} of the total no. of decisions made at GA Meetings in {year}.
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default GeneralAssemblyDecision;