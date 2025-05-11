import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function StreetNaming({
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
            <Title level={3} style={{ marginTop: "30px" }}>SDI 3.0 - 3.3 Street Naming Database and Property Addressing</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD obtain detailed information on street naming and property addressing database. 
             <ol>
                    <li type="i">If the database has been mapped out, printed and displayed at 
                        the Assembly premises and sub-structures, score 1.</li>
                    <li type="i" className="py-1">If the database has been mapped out, printed and displayed 
                        at the Assembly premises and sub-structures, score 1</li>
                    <li type="i">If the Assembly has installed at least 60% of its named streets and property 
                    address plates, score 1; if less than 60%, score 0</li>
                </ol>

                <br />
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 3.0-3.3i Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
            SDI 3.0-3.3ii Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
            SDI 3.0-3.3iii Actual Score: <strong>{electricityProvidersData?.length > 0 ? '1' : '0'}</strong>
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

export default StreetNaming;
