import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Comment from "../components/Comments";
import { formatDataGeneral, getAttributeValue, getFirstFileLinkIfExist } from "../utils/utils";

const EnvironmentalAndSocialSafeGuard = forwardRef(({ year, data, districtId, hideComment }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [projectList, setProjectList] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [scoreiii, setScoreiii] = useState(0);
    const [maxScore, setMaxScore] = useState(4);

    useEffect(() => {
        getData();
    }, [year, districtId, data]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "PI1",
            area: "Annual Action Plan Implementation",
            maxScore,
            projectList,
            scorei,
            scoreii,
            scoreiii
        }),
    }));


    const projectColumns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Projects", dataIndex: "project", key: "project" },
        { title: "Screeming Froms", dataIndex: "screeming", key: "screeming" },
        { title: "EPA Permits", dataIndex: "permit", key: "permit" },
        { title: "Report", dataIndex: "report", key: "report" },
    ];

    function getData() {

        const projects = formatDataGeneral(data?.data, "Project & Programme Type", "Project") || [];
        const reports = data?.reports;

        const temp = [];

        projects.forEach((item, index) => {

            const reportLink = getFirstFileLinkIfExist(reports, "hM6AUNKRbKB", item.trackedEntity, "b5nVLLk5sPU");
            const screemingLink = getFirstFileLinkIfExist(reports, "wBJOB5CE6Du", item.trackedEntity, "b5nVLLk5sPU");
            const epaLink = getFirstFileLinkIfExist(reports, "POdgz2rYh8H", item.trackedEntity, "b5nVLLk5sPU");

            const tempDataSet = {
                no: index + 1,
                project: getAttributeValue("Name", item),
                screeming: screemingLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${screemingLink}&dataElementUid=wBJOB5CE6Du`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Screeming Form
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                report: reportLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=hM6AUNKRbKB`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                permit: epaLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${epaLink}&dataElementUid=POdgz2rYh8H`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Permit
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            };

            temp.push(tempDataSet);


        });

        let score1 = 1;
        let score2 = 2;
        let score3 = 1;

        for (let project of temp) {
            if (project.screeming === "Not Uploaded") {
                score1 = 0;
            }

            if (project.report === "Not Uploaded") {
                score3 = 0;
            }

            if (project.permit === "Not Uploaded") {
                score2 = 0;
            }
        }

        if (temp.length === 0) {
            score1 = 0;
            score2 = 0;
            score2 = 0;
        }

        setProjectList(temp)
        setScorei(score1);
        setScoreii(score2);
        setScoreiii(score3);

    }
    return (
        <Comment
            data={projectList}
            year={year}
            districtId={districtId}
            tableCommentedId={`pi1.0-1.5-${year}`}
            hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.5 Environmental & Social Safeguards</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive information on all ongoing physical projects (works):
                        <ol>
                            <li type="i">
                                If the MMDA has screening forms for all ongoing projects (physical works) on Project Files, score 1
                            </li>
                            <li type="i">
                                If the MMDA has acquired EPA permits for all ongoing projects (physical works), score 2
                            </li>
                            <li type="i">
                                If the works department’s report on adherence to occupational health and safety standards is available, score 1
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>{maxScore}</strong>
                    </Title>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 1.0-1.5i Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 1.0-1.5ii Actual Score: <strong>{scoreii}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            PI 1.0-1.5iii Actual Score: <strong>{scoreiii}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Row>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Evidence of environmental & social safeguards on projects
                    </Title>
                    <Table
                        columns={projectColumns}
                        dataSource={projectList}
                        pagination={false}
                        bordered
                    />

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default EnvironmentalAndSocialSafeGuard;