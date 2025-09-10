import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { formatDataGeneral, getAttributeValue, getFirstFileLinkIfExist } from "../utils/utils";
import Comment from "../components/Comments";



const ContractManagementAndAdmins = forwardRef(({ year, district, data, hideComment }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [projectList, setProjectList] = useState([]);
    const [scorei, setScoreI] = useState(0);
    const [maxScore, setMaxScore] = useState(3);


    useEffect(() => {
        getData();
    }, [year, district, data]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "PI1",
            area: "Annual Action Plan Implementation",
            maxScore,
            data, projectList, scorei
        }),
    }));


    const projectColumns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Projects", dataIndex: "project", key: "project" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "TOR", dataIndex: "tor", key: "tor" },
        { title: "Contingency", dataIndex: "contingency", key: "contingency" },
        { title: "Completion Report", dataIndex: "report", key: "report" }
    ];

    function getData() {

        const projects = formatDataGeneral(data?.data, "Project & Programme Type", "Project") || [];
        const reports = data?.reports;

        const temp = [];

        projects.forEach((item, index) => {

            const reportLink = getFirstFileLinkIfExist(reports, "i1171kI9OBD", item.trackedEntity, "TrdgYOz3XUL");
            const torLink = getFirstFileLinkIfExist(reports, "X3uzSfGg9Wo", item.trackedEntity, "TrdgYOz3XUL");
            const contingencyLink = getFirstFileLinkIfExist(reports, "Rb98cVPjatA", item.trackedEntity, "JqitfVltImd");
            const status = getFirstFileLinkIfExist(reports, "tE3QKB203nh", item.trackedEntity, "rRWa5ghYO35", "status");

            const tempDataSet = {
                no: index + 1,
                project: getAttributeValue("Name", item),
                status: status ? status : "Not Provided",
                tor: torLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${torLink}&dataElementUid=X3uzSfGg9Wo`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View TOR
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                report: reportLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=i1171kI9OBD`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Completion Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                contingency: contingencyLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${contingencyLink}&dataElementUid=Rb98cVPjatA`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Contingency
                    </a>
                ) : (
                    "Not Uploaded"
                )
            };

            temp.push(tempDataSet);


        });

        let score = 3;

        for (let project of temp) {
            if (project.report === "Not Uplaoded" || project.status !== "Completed and in-use") {
                score = 0;
            }
        }

        if (temp.length === 0) {
            score = 0;
        }

        setProjectList(temp)
        setScoreI(score);

    }


    return (
        <Comment
            data={projectList}
            year={year}
            districtId={district}
            tableCommentedId={`pi1.0-1.3-${year}`}
            hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.3  Management and Administration</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, obtain information on contract management and administration:<br /><br />
                        <ol>
                            <li type="i">
                                If final completion reports (signed off) on all completed projects are available
                                and all completed projects are in use, score 3, else score 0
                            </li>

                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>{maxScore}</strong>
                    </Title>


                    <Col align="start">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
                            PI 1.0-1.3 Actual Score: <strong>{scorei}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Col>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Evidence of project completion and use
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

export default ContractManagementAndAdmins;