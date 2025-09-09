import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { formatDataGeneral, getAttributeValue, getFirstFileLinkIfExist } from "../utils/utils";
import Comment from "../components/Comments";

const FollowUpDeduction = forwardRef(({ year, district, data, hideComment }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [projectList, setProjectList] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [scoreiii, setScoreiii] = useState(0);

    useEffect(() => {
        getData();
    }, [year, district, data]);

     useImperativeHandle(ref, () => ({
        getData: () => ({
          projectList,
          scorei,
          scoreii,
          scoreiii
        }),
      }));


    const projectColumns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Projects", dataIndex: "project", key: "project" },
        { title: "Is there any Adverse Findings on Central Government Deductions?", dataIndex: "status", key: "status" },
        { title: "TOR", dataIndex: "tor", key: "tor" },
        { title: "Report", dataIndex: "report", key: "report" },
        { title: "Contract", dataIndex: "contract", key: "contract" }
    ];

    function getData() {

        const projects = formatDataGeneral(data?.data, "Project & Programme Type", "Project") || [];
        const reports = data?.reports;

        const temp = [];

        projects.forEach((item, index) => {

            const reportLink = getFirstFileLinkIfExist(reports, "i1171kI9OBD", item.trackedEntity, "TrdgYOz3XUL");
            const torLink = getFirstFileLinkIfExist(reports, "X3uzSfGg9Wo", item.trackedEntity, "TrdgYOz3XUL");
            const contractLink = getFirstFileLinkIfExist(reports, "TKC9UdFpqB6", item.trackedEntity, "rRWa5ghYO35");
            const status = getFirstFileLinkIfExist(reports, "YDgvR2PKQTT", item.trackedEntity, "rRWa5ghYO35", "status");

            const tempDataSet = {
                no: index + 1,
                project: getAttributeValue("Name", item),
                status: status ? status === "true" ? "YES" : "NO" : "Not Provided",
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
                        View Report
                    </a>
                ) : (
                    "Not Uploaded"
                ),
                contract: contractLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${contractLink}&dataElementUid=TKC9UdFpqB6`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Contract
                    </a>
                ) : (
                    "Not Uploaded"
                ),
            };

            temp.push(tempDataSet);


        });

        let score1 = 1;
        let score2 = 1;
        let score3 = 1;

        for (let project of temp) {
            if (project.contract === "Not Uplaoded") {
                score1 = 0;
            }

            if (project.report === "Not Uplaoded") {
                score2 = 0;
            }

             if (project.status === "YES") {
                score3 = 0;
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
            districtId={district}
            tableCommentedId={`pi1.0-1.4-${year}`}
             hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.4 Record on follow-up of deduction at source</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive a copy of the list of Contracts/Services related to Deductions at Source.
                        <ol>
                            <li type="i">
                                If a copy of the contract(s) is/are available, score 1
                            </li>
                            <li type="i">
                                If there is evidence of implementation (contract implementation reports), score 1
                            </li>
                            <li type="i">
                                If there is no adverse findings on Central Government Deductions, score 1; else score 0.
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>3</strong>
                    </Title>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 1.0-1.4i Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 1.0-1.4ii Actual Score: <strong>{scoreii}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            PI 1.0-1.4iii Actual Score: <strong>{scoreiii}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>
                        Evidence of contract deductions at source
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

export default FollowUpDeduction;