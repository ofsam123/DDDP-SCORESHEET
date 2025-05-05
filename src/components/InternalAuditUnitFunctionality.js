import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function InternalAuditUnitFunctionality({ data, year, columns, meetings, meetingColumns}) {

    return (
        <>
            <Title level={3}>CI 3.0 Public Financial Management and Auditing -
            3.2 Functionality of the Internal Audit Unit </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD, obtain information on the Internal Audit Unit of the Assembly.<br /><br />
                <ol>
                    <li type="i">
                    If the Internal Audit Unit has submitted the Annual Audit Work Plan to the DCD
                     and Audit Committee within 30 days after the beginning of the financial year; and
                    </li>
                    <li type="i">
                    If all quarterly Internal Audits have been conducted and reports submitted to the DCD and the Chair of the Audit 
                    Committee of the Assembly within thirty (30) days after the end of each quarter,
                    </li>
                   <li type="i">
                   If the District Assembly has submitted the Annual Audit Workplan 
                   to the Internal Audit Agency by 31st January of the financial year.
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Internal Audit Committee Records</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Audit Committee Meetings</Title>
            {meetings && <Table columns={meetingColumns} dataSource={meetings} pagination={false} bordered />}

        </>
    );
}

export default InternalAuditUnitFunctionality;