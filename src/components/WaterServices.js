import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function WaterServices({
    year, waterProvidersData,

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
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.1 Water Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on Collaboration between the Assembly and Ghana Water Company Limited (GWCL) on Service Delivery in the District:<br /><br />
                <ol>
                    <li>If there is evidence of collaboration/ facilitation between the Assembly and GWCL/CWSA/Small Water System/ and the provision of water in the District, score 1;</li>
                    <li className="py-1">If at least 80% of applications for service has been processed score 1;</li>
                    <li>If at least 70% of the applications processed for service has been provided to applicant/ communities as a result of the collaboration/ facilitation, score additional 1;</li>
                </ol>
                <br /><br /><i>Local Governance Act, 2016 ( Act 936) Section 12 (Sub Sections 4 b, d & e, Sub-Section 5, Sub-Section 7); Goal 6 of the Sustainable Development Goals, the 2030 Agenda)</i>
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
            

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.1i Actual Score: <strong>{waterProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.1ii Actual Score: <strong>{waterProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.1iii Actual Score: <strong>{waterProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of existing collaboration/facilitation water service providers</Title>
            {waterProvidersData && <Table
                columns={serviceProvidersColumn}
                dataSource={waterProvidersData}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>II. Evidence of increased access to water due to collaboration/facilitation</Title>
            {waterProvidersData && <Table
                columns={serviceProvidersColumn}
                dataSource={waterProvidersData}
                pagination={false} bordered />}

            
        </>
    );
}

export default WaterServices;
