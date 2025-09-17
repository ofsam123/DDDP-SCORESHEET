import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Comment from "../components/Comments";

const AuditCommitteeResponsiveness = forwardRef(({ 
    year, audits, actions, managementLetters, hideComment, districtId }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [maxScore, setMaxScore] = useState(3);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "PI3",
            area: "Audit Performance",
            score: audits?.score || 0, 
            maxScore,
            maxScore,
            audits,
        }),
    }));

    const auditReportColumns = [
        { title: "Qtr", dataIndex: "meeting", key: "meeting" },
        { title: "Date of Audit Committee Meeting", dataIndex: "meetingDate", key: "meetingDate" },
        { title: "No. of recommendations in audit reports", dataIndex: "recommendationsNo", key: "recommendationsNo" },
        { title: "No. of actions taken by Management", dataIndex: "actions", key: "actions" },
        { title: "No. of Audit Committee Comments", dataIndex: "comments", key: "comments" }
    ];

    const recommendationActionColumns = [
        { title: "Quarters", dataIndex: "quarter", key: "quarter" },
        { title: "Recommendations in audit reports", dataIndex: "recommendations", key: "recommendations" },
        { title: "AC’s Comments /Recommendation", dataIndex: "comments", key: "comments" }
    ];

    const managementLettersColumns = [
        { title: "Date & ref. No. of Date Mgt. Letter(s)", dataIndex: "date", key: "date" },
        { title: "Date of Audit Committee Meeting", dataIndex: "meetingDate", key: "meetingDate" },
        { title: "No. of recommendations in audit reports", dataIndex: "noRecommendation", key: "noRecommendation" },
        { title: "No. of actions taken by Management", dataIndex: "noactionTaken", key: "noactionTaken" },
        { title: "No. of Audit Committee Comments", dataIndex: "auditComments", key: "auditComments" }
    ];

    return (
        <Comment
            data={audits?.data}
            year={year}
            districtId={districtId}
            tableCommentedId={`pi3.0-3.1-${year}`}
            hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 3.0 - 3.1 Responsiveness of Audit Committee</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the District Coordinating Director (DCD) receive information on the Audit Committee of the Assembly:<br /><br />
                        <ol>
                            <li type="i">
                                If the Audit Committee has received and reviewed responses to all Audit Observations
                                in Quarterly Internal Audit Reports and the Management Letter for {year}, score 3 or else 0;
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>{maxScore}</strong>
                    </Title>


                    <Col align="start">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
                            PI 3.0-3.1 Actual Score: <strong>{audits?.score || 0}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Col>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Audit Observations in Quarterly Internal Audit Reports
                    </Title>
                    <Table
                        columns={auditReportColumns}
                        dataSource={audits?.data || []}
                        pagination={false}
                        bordered
                    />

                    {/* Data not available in DDDP at the moment */}

                    {/* <Title level={5} style={{ marginTop: "20px" }}>
                        Recommendations and Actions Taken
                    </Title>
                    <Table
                        columns={recommendationActionColumns}
                        dataSource={actions || []}
                        pagination={false}
                        bordered
                    />

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Management Letters on the external audit
                    </Title>
                    <Table
                        columns={managementLettersColumns}
                        dataSource={managementLetters || []}
                        pagination={false}
                        bordered
                    /> */}

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default AuditCommitteeResponsiveness;