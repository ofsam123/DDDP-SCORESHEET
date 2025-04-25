import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function ContractManagementAndAdmins({ year, contracts, contingencies }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const contractManagementAndAdminsColumns = [
        { title: "No. of Projects awarded on contract (a)", dataIndex: "awardedProjects", key: "awardedProjects" },
        { title: "No. of Projects completed (b)", dataIndex: "completedProject", key: "completedProject" },
        { title: "No. of completed projects with Completion Reports (c)", dataIndex: "completedProjectReport", key: "completedProjectReport" },
        { title: "No. of Projects completed and in use (d)", dataIndex: "completedProjectInUse", key: "completedProjectInUse" },
        { title: "% completed projects in use (2/2 X 100)", dataIndex: "percentageInUse", key: "percentageInUse" },
        { title: "% completed projects with reports (2/2 X 100)", dataIndex: "percenageCompletedProjectReport", key: "percenageCompletedProjectReport" }
    ];

    const contingencyColumns = [
        { title: "No. of projects with contingency provision ", dataIndex: "contingencyProvision", key: "contingencyProvision" },
        { title: "No. of projects with contingency used", dataIndex: "contingencyUse", key: "contingencyUse" },
        { title: "No. of projects with contingency used with written justification", dataIndex: "contingencyJustification", key: "contingencyJustification" },
        { title: "d. No. of projects with contingency duly approved and used", dataIndex: "contingencyApproved", key: "contingencyApproved" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.3 Records on Contract Management and Administration</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain information on contract management and administration:<br /><br />
                <ol>
                    <li type="i">
                        If final completion reports on all completed projects are available
                        and all completed projects are in use, score 3; else score 0.
                    </li>
                    <li type="i">
                        If contingency has been provided for works and used with written justification and duly
                        approved, score 1; or if contingency has not been used, score 1; else score 0.
                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>4</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.3 Actual Score: <strong>Score</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of project completion and use
            </Title>
            {<Table
                columns={contractManagementAndAdminsColumns}
                dataSource={contracts || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of use of contingency
            </Title>
            {<Table
                columns={contingencyColumns}
                dataSource={contingencies || []}
                pagination={false} bordered />}






        </>
    );
}

export default ContractManagementAndAdmins;
