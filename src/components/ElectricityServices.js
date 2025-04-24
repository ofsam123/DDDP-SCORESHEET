import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function ElectricityServices({
    year, electricityProvidersData,

}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const serviceProvidersColumn = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Service Provider", dataIndex: "provider", key: "provider" },
        { title: "Contract Duration", dataIndex: "contract", key: "contract" },
        { title: "Start Date", dataIndex: "date", key: "date" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>2.2 Electricity Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on collaboration between the Assembly and Electricity Company of Ghana (ECG)/ VRA/ NEDCO on Service Delivery in the District;<br /><br />
                <ol>
                    <li>If there is evidence of collaboration/ facilitation between the Assembly and ECG/ VRA/ NEDCO in the District, score 1;</li>
                    <li>If at least 80% of applications for Service has been processed score 1;</li>
                    <li>If at least 70%of the application processed for service has been provided to applicants/ Communities as a result of the collaboration/ facilitation score additional 1;</li>
                </ol>

                <br /><br /><i>Local Governance Act, 2016 (Act 936) Section 12 (Sub Sections 4 b, d & e, Sub-Section 5, Sub-Section 7)
                    Goal 6 of the Sustainable Development Goals, the 2030 Agenda</i>
            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>3</Content>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                We received and reviewed information on the collaboration/ facilitation between the Assembly and ECG and notes as follows:
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of existing collaboration/facilitation electricity service providers</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {electricityProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={electricityProvidersData}
                    pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>II. Evidence of increased access to electricity due to collaboration/facilitation</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {electricityProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={electricityProvidersData}
                    pagination={false} bordered />}

            <Content>
                Percentage of Electricity requests processed in 2021 is 100%<br />
                Percentage of electricity requests processed and services provided in 2021 is 100 %
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                <ol>
                    <li>Evidence of collaboration/ facilitation between the Assembly and CWSA in the district exist</li>
                    <li>100 % of applications for Water Services in 2021 have been processed as a result of the collaboration and facilitation.</li>
                    <li>94.1 % of the processed applications for Water Services in 2021 have been provided with the service</li>
                </ol>
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Source:</Title>
            <Content>
                <ol>
                    <li>File name: Community Water and Sanitation Agency
                        No.: EMA/CWSA/V.1
                        MOU between the MA and CWSA
                        Water service applications</li>
                </ol>
            </Content>
        </>
    );
}

export default ElectricityServices;
