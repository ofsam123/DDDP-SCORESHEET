import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function SubStructureCommiteeMeeting({ data, columns, year, members, memberColumns }) {

    // useEffect(() => {
    //     console.log("budget: ", data);
    //     console.log("establishment : ", establishment);
    // }, [])

    return (
        <>
            <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.2 Meetings of the Sub Committees of the Assembly </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive and confirm the composition, attendance and minutes of
                the meetings of the 5 Statutory Sub-Committees in <strong>{year}</strong><br /><br />
                <ol>
                    <li type="i">
                        If each of the 5 Statutory Subcommittees held at least one meeting prior to each of the three meetings of the
                        EC/A in <strong>{year}</strong> and minutes are recorded and signed by both the secretary and the chairperson of subcommittees
                    </li>
                    
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of composition of sub-committees – Summary</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

            <Title level={4} style={{ marginTop: "20px" }}>Membership of Statutory Sub-Committees</Title>
            {members && <Table columns={memberColumns} dataSource={members} pagination={false} bordered />}

            
        </>
    );
}

export default SubStructureCommiteeMeeting;