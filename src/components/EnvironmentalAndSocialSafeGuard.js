import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function EnvironmentalAndSocialSafeGuard({ year, guards }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const safeGuardsColumns = [
        { title: "No. of ongoing projects (completed)", dataIndex: "noGoingProject", key: "noGoingProject" },
        { title: "No. of ongoing projects with screening forms on file", dataIndex: "projectFile", key: "projectFile" },
        { title: "No. of ongoing projects with EPA permits", dataIndex: "epaPermit", key: "epaPermit" },
        { title: "Report on adherence to occupational health and safety standards available (Yes/No)", dataIndex: "healthSafety", key: "healthSafety" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.5 Environmental & Social Safeguards</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD, receive information on all ongoing physical projects (works):                <ol>
                    <li type="i">
                    If the MMDA has screening forms for all ongoing projects (physical works) on Project Files, score 1                    </li>
                    <li type="i">
                    If the MMDA has acquired EPA permits for all ongoing projects (physical works), score 2.                    </li>
                    <li type="i">
                    If the works department’s report on adherence to occupational health and safety standards is available, score 1                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>4</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.5i Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.5ii Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.5iii Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
            Evidence of environmental & social safeguards on projects            </Title>
            {<Table
                columns={safeGuardsColumns}
                dataSource={guards || []}
                pagination={false} bordered />}

        </>
    );
}

export default EnvironmentalAndSocialSafeGuard;
