import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function ManagementMeeting({ data, year, columns }) {

    return (
        <>
            <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.3 Management Meetings </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive copies of duly recorded and signed Minutes of Meetings of Management in 2021:<br /><br />
                <ol>
                    <li type="i">
                        If Management Meetings were held, at least quarterly, and duly attended by at least 8 out of 11 for District Assemblies;
                        10 out of 13 for Municipal Assemblies and 13 out of 16 for Metropolitan
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Management Meetings</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />}

        </>
    );
}

export default ManagementMeeting;