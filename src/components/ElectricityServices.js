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
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.2 Electricity Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on collaboration between the Assembly and Electricity Company of Ghana (ECG)/ VRA/ NEDCO on Service Delivery in the District;<br /><br />
                <ol>
                    <li type="i">If there is evidence of collaboration/ facilitation between the Assembly and ECG/ VRA/ NEDCO in the District, score 1;</li>
                    <li type="i" className="py-1">If at least 80% of applications for Service has been processed score 1;</li>
                    <li type="i">If at least 70%of the application processed for service has been provided to applicants/ Communities as a result of the collaboration/ facilitation score additional 1;</li>
                </ol>

                <br />
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.2i Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.2ii Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.2iii Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of existing collaboration/facilitation electricity service providers</Title>
            {electricityProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={electricityProvidersData}
                    pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>II. Evidence of increased access to electricity due to collaboration/facilitation</Title>
            {electricityProvidersData && <Table
                    columns={serviceProvidersColumn}
                    dataSource={electricityProvidersData}
                    pagination={false} bordered />}

           
        </>
    );
}

export default ElectricityServices;
