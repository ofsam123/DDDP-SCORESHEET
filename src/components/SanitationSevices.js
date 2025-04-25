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
            <Title level={3} style={{ marginTop: "30px" }}>2.3 Sanitation Services</Title>
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

                <br /><br /><i>Local Governance Act, 2016 (Act 936) Section 12 (Sub sections 4 b, c & d)
                    Goal 6 of the Sustainable Development Goals, the 2030 Agenda</i>
            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>2</Content>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                We received and reviewed information on the expenditure of IGF on sanitation improvement services from the MCD and notes as follows:
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of IGF expenditure on sanitation improvement services</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {sanitationProvidersData && <Table
                columns={serviceProvidersColumn}
                dataSource={sanitationProvidersData}
                pagination={false} bordered />}

            <Content>
                Calculated as: % of IGF i=on Sanitation = (B/A) x 100
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                <p>Percentage of total expenditure on sanitation services on total IGF collected is more than 20%. And there is evidence of implementation</p>

            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Source:</Title>
            <Content>
                <ol>
                    <li>Total IGF collected</li>
                    <li>Sanitation expenditure from IGF
                        EMA/RGP/V.2/34</li>
                    <li>Payment vouchers for IGF expenditure on sanitation<br />
                        EZC/IGF/AUG/21/08/KA<br />
                        EZC/IGF/JUN/21/06/KA<br />
                        EZC/IGF/SEPT/21/09/KA<br />
                        EZC/IGF/JUL/21/07/KA<br />
                        EZC/IGF/OCT/21/10/KA<br />
                        EMA/IGF/DEC/21/12/KA<br />
                        EZC/IGF/MAR/21/03/KA<br />
                        EZC/IGF/MAY/21/05/KA<br />
                        EZC/IGF/SEPT/21/09/KA<br />
                        EZC/IGF/OCT/21/10/KA<br />
                        EZC/IGF/MAR/21/03/KA<br />
                        EZC/IGF/FEB/21/02/KA<br />
                        EZC/IGF/AUG/21/08/KA<br />
                        EZC/IGF/JAN/21/01/KA<br />
                        EZC/IGF/JUL/21/07/KA<br />
                        EZC/IGF/FEB/21/02/KA<br />
                        BMC/IGF/OCTOBER/03/2021/KA<br />
                        BMCIGF/FEBRUARY/02/2021/KA</li>
                </ol>
            </Content>
        </>
    );
}

export default SanitationServices;
