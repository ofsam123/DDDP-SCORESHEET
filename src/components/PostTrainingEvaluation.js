import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function PostTrainingEvaluation({ year, trainingEvaluation }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const postTrainingEvaluationColumns = [
        { title: "Training Topic", dataIndex: "topic", key: "topic" },
        { title: "Date of Training", dataIndex: "date", key: "date" },
        { title: "Reports Submission", dataIndex: "report", key: "report" },
        { title: "Date of Post-Training Impact Assessment", dataIndex: "assessmentDate", key: "assessmentDate" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 2.0 - 2.2 Post-training Evaluation</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive a copy of the 2021 implementation of Capacity Building/training reports:<br /><br />
                <ol>
                    <li type="i">
                        If there is evidence of post-training evaluation conducted by the Human Resource Management
                        Department (HRMD) at least three (3) months after the training was conducted, score 2
                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 2.0-2.2 Actual Score: <strong>Score</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of post-training impact assessment

            </Title>
            {<Table
                columns={postTrainingEvaluationColumns}
                dataSource={trainingEvaluation || []}
                pagination={false} bordered />}

        </>
    );
}

export default PostTrainingEvaluation;
