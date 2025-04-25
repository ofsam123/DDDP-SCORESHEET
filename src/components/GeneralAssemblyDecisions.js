import { Layout, Space, Table, Typography } from "antd";
import React, { useState } from "react";

function GeneralAssemblyDecisions({ 
    year, 
    decisionServiceData,
    decisionDeliveryData
}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const serviceDecisionColumns = [
        { title: "GAM", dataIndex: "gam", key: "gam" },
        { title: "Total No. of decisions taken", dataIndex: "total", key: "total" },
        { title: "No. of decisions on service delivery", dataIndex: "serviceDecision", key: "serviceDecision" },
        { title: "% of decisions on service delivery ", dataIndex: "percentage", key: "percentage" }
    ];

    const serviceDeliveryDecisionColumns = [
        { title: "GAM", dataIndex: "gam", key: "gam" },
        { title: "Service Delivery Decisions", dataIndex: "service", key: "service" }
    ];

    const [gaDecisionScore, setGaDecisionScore] = useState(0);

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 1.0 - 1.1 General Assembly Decisions</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive signed Minutes of Meetings of the three mandatory Meetings of the General Assembly:<br /><br />
                <ol>
                    <li type="i">If The General Assembly took at least 50% decisions on improving service delivery in any sector of the District, score 1;</li>
                </ol>
                Examples of services: Water, Electric power, Health, Education, Transportation, Roads, Sanitation, Recreational services and Security.
                <br /><br /><i>(Local Governance Act, 2016 (Act 936) Section 18)3</i>
            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>1</Content>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>

            <Title level={5} style={{ marginTop: "30px" }}>Service Delivery Decisions</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{gaDecisionScore > 50 ? '1' : '0'}</Text></Space>
            {decisionServiceData && <Table columns={serviceDecisionColumns} dataSource={decisionServiceData} pagination={false} bordered
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

            <Title level={5} style={{ marginTop: "30px" }}>Service Delivery Decisions</Title>
            {decisionDeliveryData && <Table columns={serviceDeliveryDecisionColumns} dataSource={decisionDeliveryData} pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                The decisions that were on improving service delivery was {`${gaDecisionScore}%`} of the total no. of decisions made at GA Meetings in {year}.
            </Content>
        </>
    )
}

export default GeneralAssemblyDecisions
