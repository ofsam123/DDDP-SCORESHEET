import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function MonitoringProjectAndActivity({ year, actityAndProject }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const activityColumns = [
        { title: "Total Budgetary Allocation for planned M&E activities", dataIndex: "aapApproved", key: "aapApproved" },
        { title: "Amount released for planned M&E activities", dataIndex: "aapImplented", key: "aapImplented" },
        { title: "% Budgetary Allocation released for planned M&E activities", dataIndex: "percentage", key: "percentage" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.2 Monitoring of District Projects and Activities</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From DCD, receive monitoring reports on all district programmes and projects:<br /><br />
                <ol>
                    <li type="i">
                        If a clear budgetary provision has been made for M&E and 80% of the budgetary allocation is released for
                        the implementation of planned monitoring activities, score 1; else score 0.
                    </li>
                    <li type="i">
                        If there is evidence of multistakeholder participation in monitoring activities, score 1.
                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.2i Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.2ii Actual Score: <strong>Score</strong>
            </Title>

            {<Table
                columns={activityColumns}
                dataSource={actityAndProject || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                The district has implemented 100% of Planned Projects and Programmes in the {year} AAP
            </Content>

        </>
    );
}

export default MonitoringProjectAndActivity;
