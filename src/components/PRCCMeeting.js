import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function PRCCMeeting({ data, year, columns }) {

    return (
        <>
            <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly -
                2.4 Meetings of the Public Relations and Complaints Committee of the Assembly </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain Minutes of Meeting of the Public Relations and Complaints Committee meetings.<br /><br />
                <ol>
                    <li type="i">
                        If PRCC is functional and Minutes of Meetings and recommendations from the meetings are available.
                    </li>
                    <li type="i">
                        If all complaints reported have been duly processed and recommendations made, and.
                    </li>
                    <li type="i">
                        If action has been taken on all the recommendations, in (ii)
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of actions taken on recommendations</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

        </>
    );
}

export default PRCCMeeting;