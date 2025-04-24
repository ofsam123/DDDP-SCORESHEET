import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function ExecutiveCommitteeMember({ data, year, columns }) {

    return (
        <>
            <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.1 Executive Committee Meetings </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive and review the composition, attendance and minutes of meetings of the
                Executive Committee/Metropolitan Authority (EC/MA):<br /><br />
                <ol>
                    <li type="i">
                        If at least a meeting of the EC/A was held prior to each of the three mandated General Assembly meetings
                        in <strong>{year}</strong>, and minutes duly recorded and signed by both DCD and DCE
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Executive Committee meetings held in <strong>{year}</strong> are as follows</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />}

        </>
    );
}

export default ExecutiveCommitteeMember;