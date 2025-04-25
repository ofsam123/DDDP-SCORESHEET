import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AssemblySupportToSBS({ data, year, columns, decisionDeliveryData, serviceDeliveryDecisionColumns }) {

    const [gaDecisionScore, setGaDecisionScore] = useState(0);

    return (
        <>
            <Title level={3}>SDI 1.0 - 1.3 Assembly Support to Substructures</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive reports on the activities of all established substructures
                of the Assembly and Assembly’s DACF allocation to Sub-structures.<br /><br />
                <ol>
                    <li type="i">
                        If all the sub-structures utilized at least 30% of their ceded Revenue to
                        support activities that benefit the Community, score 1, else score 0

                    </li>
                    <li type="i">
                        If the Assembly has spent at least 90% of the up-to 2% DACF release to its
                        Sub-Structures to support the sub-structures, score 1, else score 0

                    </li>

                </ol>

                <i>
                    (Local Government (Urban,
                    Zonal and Town Councils
                    and Unit Committees)
                    Establishment Instrument of
                    2010, LI 1961)
                    Guidelines for the
                    Disbursement and
                    Management of the District
                    Assembly Common Fund
                    Allocation.
                </i>
            </Content>
            <Title level={5} style={{ marginTop: "20px" }}>Maximum Score <strong>1</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>SDI 1.0-1.1 Actual Score: <strong>{gaDecisionScore > 50 ? '1' : '0'}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Management Meetings</Title>
            {/* {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />} */}
            {data && <Table columns={columns} dataSource={data} pagination={false} bordered
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

export default AssemblySupportToSBS;