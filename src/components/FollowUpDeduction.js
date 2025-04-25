import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function FollowUpDeduction({ year, followUp }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const followUpColumns = [
        { title: "No. of Contracts/Services with source deduction payments", dataIndex: "paymentDeduction", key: "paymentDeduction" },
        { title: "Copies of all contracts with source deductions available (Yes/No)", dataIndex: "contractDeduction", key: "contractDeduction" },
        { title: "No. of contracts implemented with reports available", dataIndex: "contractImplemented", key: "contractImplemented" },
        { title: "Any adverse findings on central government deductions (Yes/No)", dataIndex: "governmentDeduction", key: "governmentDeduction" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.4 Record on follow-up of deduction at source</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive a copy of the list of Contracts/Services related to Deductions at Source.
                <ol>
                    <li type="i">
                        If a copy of the contract(s) is/are available, score 1
                    </li>
                    <li type="i">
                        If there is evidence of implementation (contract implementation reports), score 1
                    </li>
                    <li type="i">
                        If there is no adverse findings on Central Government Deductions, score 1; else score 0.
                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>3</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.4i Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.4ii Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.4iii Actual Score: <strong>Score</strong>
            </Title>

            {<Table
                columns={followUpColumns}
                dataSource={followUp || []}
                pagination={false} bordered />}

        </>
    );
}

export default FollowUpDeduction;
