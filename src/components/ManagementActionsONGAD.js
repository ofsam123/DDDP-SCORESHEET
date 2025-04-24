import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function ManagementActionsONGAD({ data, year, columns, decisionDeliveryData, serviceDeliveryDecisionColumns }) {

    const [gaDecisionScore, setGaDecisionScore] = useState(0);

    return (
        <>
            
            <Title level={3}>SDI 1.0 - 1.2 Management Actions taken on Assembly decisions</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive signed minutes of meetings of the Management of the Assembly:<br /><br />
                <ol>
                    <li type="i">
                    If Management has implemented at least 50% of the service delivery improvement decisions (1.1i) 
                    of The General Assembly, evidenced by reports and relevant supporting documents, score 2
                    </li>

                </ol>

                <i>Examples of services: Water, Electric power, Health, Education,
                    Transportation, Roads, Sanitation, Recreational services and Security.
                </i>
            </Content>
            <Title level={5} style={{ marginTop: "20px" }}>Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>SDI 1.0-1.2 Actual Score: <strong>{gaDecisionScore > 50 ? '1' : '0'}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Management Meetings</Title>
            {/* {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />} */}
            {data && <Table columns={columns} dataSource={data} pagination={true} bordered
                summary={pageData => {
                    let totalDecision = 0, totalDelivered = 0, totalPercent = 0;

                    pageData.forEach(({ total, serviceDecision, percentage }) => {
                        totalDecision += Number(total);
                        totalDelivered += Number(serviceDecision);
                        totalPercent += Number(percentage);
                    });

                    setGaDecisionScore(totalPercent);

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
                                <Text>{totalPercent}</Text>
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

        </>
    );
}

export default ManagementActionsONGAD;