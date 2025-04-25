import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function CapacityBuildingImplementation({ year, capacityBuilding, timeLineSubmission }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const CapacityBuildingImplementationColumns = [
        { title: "Availability of TNA & Capacity Building Plan", dataIndex: "tnaAvaillability", key: "tnaAvaillability" },
        { title: "Number of Activities in the Capacity Building Plan", dataIndex: "numberOfActivity", key: "numberOfActivity" },
        { title: "Number of Activities in the Capacity Building Plan implemented", dataIndex: "numberOfActivityImpl", key: "numberOfActivityImpl" }
    ];

    const timeLineSubmissionColumns = [
        { title: "Report", dataIndex: "report", key: "report" },
        { title: "Deadline for submission", dataIndex: "deadline", key: "deadline" },
        { title: "Submission Dates to OHLGS", dataIndex: "date", key: "date" },
        { title: "Total Number of Participants", dataIndex: "total", key: "total" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 2.0 - 2.1 Implementation of Capacity Building Plan</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD and OHLGS, receive a copy of the TNA and Capacity Building Plan and Reports:<br /><br />
                <ol>
                    <li type="i">
                        If all quarterly reports on capacity building activities from the capacity building plan and DPAT recommendations
                        were received with sex-disaggregated data within 15 days after the end of the quarter, score 1; else score 0.
                    </li>
                    <li type="i">
                        If the Assembly has implemented 80% of its capacity building plan, score 1.
                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 2.0-2.1i Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 2.0-2.1ii Actual Score: <strong>Score</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of Availability & implementation of Capacity
                Building Plan
            </Title>
            {<Table
                columns={CapacityBuildingImplementationColumns}
                dataSource={capacityBuilding || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of timely submission of Capacity Building Reports
            </Title>
            {<Table
                columns={timeLineSubmissionColumns}
                dataSource={timeLineSubmission || []}
                pagination={false} bordered />}






        </>
    );
}

export default CapacityBuildingImplementation;
