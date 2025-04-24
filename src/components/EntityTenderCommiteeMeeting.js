import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function EntityTenderCommitteeMeeting({ data, year, columns }) {

    return (
        <>
            <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly -
            2.5 Meetings of the Technical SubCommittee and Spatial Planning Committee (SPC) </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD obtain information on the membership of the Technical SubCommittee and Spatial Planning Committee, 
            invitation letters to meetings and minutes of monthly meetings for <strong>{year}</strong>.<br /><br />
                <ol>
                    <li type="i">
                    If the technical sub-committee and spatial planning committee is duly constituted and have Minutes of 
                    Meeting of all monthly Meetings recorded and duly signed by secretary and chairperson; and.
                    </li>
                    <li type="i">
                    If there is evidence in the form of Minutes of Meetings approving the preparation/revision of local plans.
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Spatial Planning Committee (SPC) duly constituted</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />}

        </>
    );
}

export default EntityTenderCommitteeMeeting;