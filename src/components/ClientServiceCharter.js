import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function ClientServiceCharter({
    year, permitRequestData,

}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const permitRequestColumn = [
        { title: "No. of Building Permit Requests Received (A)", dataIndex: "permitReceived", key: "permitReceived" },
        { title: "No. of Building Permit Requests Processed & Issued (B)", dataIndex: "permitProcessed", key: "permitProcessed" },
        { title: "No. of approved permits traced to Local Plans (C)", dataIndex: "permitTraced", key: "permitTraced" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.5 Availability of Client Service Charter</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive a copy of the Client Service Charter of the Assembly:<br /><br />
                <ol>
                    <li type="i">If the Assembly has a Client Service Charter evidenced by a resolution of the General Assembly approving the Charter, have been displayed on the Assembly premises or website; score 1;</li>
                </ol>

            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>1</strong></Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 2.0-2.5 Actual Score: <strong>{!true ? '1' : '0'}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                <p>We received and reviewed information on the Client Service Charter from the MCD and notes as follows:</p>
                <p>The minutes of the GA meeting for the approval of the Client Service Charter, signed by the PM and MCD, was reviewed as follows:</p>
            </Content>

            {/* <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of O&M Plan in existence</Title> */}
            {/* <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space> */}
            {<Table
                    columns={permitRequestColumn}
                    dataSource={permitRequestData || []}
                    pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
            The GA approved the Client Service Charter by a resolution at its meeting held on 30/06/2020 and displayed on the Assembly premises and website.
            </Content>


        </>
    );
}

export default ClientServiceCharter;
