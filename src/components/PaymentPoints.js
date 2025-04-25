import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function PaymentPoints({ year, payments }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const paymentPointsColumns = [
        { title: "Number of established revenue points", dataIndex: "revenuReport", key: "revenuReport" },
        { title: "Number of payment points sited outside the Assembly premises", dataIndex: "outsidePayment", key: "outsidePayment" },
        { title: "Number of payment points sited within the Assembly premises", dataIndex: "withinPayment", key: "withinPayment" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 3.0 - 3.1 Payment Points</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain detailed information on all established payment points and options available to citizens in the District:<br /><br />
                <ol>
                    <li type="i">
                        If the Assembly established at least 5 payment points for Metros, 3 or more for Municipals,
                        2 for Districts (including payment points sited within the Assembly premises), score 3; else score 0
                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>3</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3-1 Actual Score: <strong>Score</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of establishment of revenue payment points

            </Title>
            {<Table
                columns={paymentPointsColumns}
                dataSource={payments || []}
                pagination={false} bordered />}

        </>
    );
}

export default PaymentPoints;
