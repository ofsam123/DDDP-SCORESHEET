import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function SanitationServices({
    year, sanitationProvidersData,

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
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.3 Sanitation Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive information on the utilisation of the IGF collected for the year:<br /><br />
                <ol>
                    <li type="i">If at least 20% of the IGF was spent on sanitation improvement services in the District and there is evidence of implementation, score 2;</li>
                </ol>

                <b><u>Eligible Expenditures are below:</u></b>
                <ul>
                    <li>Activities and programmes on Solid Waste Management – Collection, Haulage or Transportation, Disposal or Treatment or Reuse</li>
                    <li>Activities and programmes on Liquid Waste Management and Drain Cleansing – Containment, Collection, Transportation/Conveyance, Disposal or Treatment or Reuse</li>
                    <li>Activities on Food Hygiene and Safety</li>
                    <li>Sanitation Legislation and Enforcement Management</li>
                    <li>Evidence of Monthly Sanitation Day Exercises</li>
                </ul>

            
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.2i Actual Score: <strong></strong>
            </Title>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of IGF expenditure on sanitation improvement services</Title>
            {sanitationProvidersData && <Table
                columns={serviceProvidersColumn}
                dataSource={sanitationProvidersData}
                pagination={false} bordered />}

            <Content>
                Calculated as: % of IGF i=on Sanitation = (B/A) x 100
            </Content>

            
        </>
    );
}

export default SanitationServices;
