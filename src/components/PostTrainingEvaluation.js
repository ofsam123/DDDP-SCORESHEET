import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import { getAttributeValue, getFileLinkIfExist } from "../utils/utils";
import moment from "moment/moment";
import Comment from "../components/Comments";

const PostTrainingEvaluation = forwardRef(({ year, district, hideComment }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [data, setData] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [maxScore, setMaxScore] = useState(2);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "PI2",
            area: "Capacity Building",
            maxScore,
            data,
            scorei
        }),
    }));

    const postTrainingEvaluationColumns = [
        { title: "Training Topic", dataIndex: "topic", key: "topic" },
        { title: "Date of Training", dataIndex: "date", key: "date" },
        { title: "Date of Post-Training Impact Assessment", dataIndex: "assessmentDate", key: "assessmentDate" },
        { title: "Report", dataIndex: "report", key: "report" }
    ];

    useEffect(() => {
        getData();
    }, [year, district]);

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=Sqzqe1y30hF&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=Sqzqe1y30hF&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const trainings = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];

                            trainings.forEach(training => {
                                const currentReport = reports.find(rep => rep.trackedEntity === training.trackedEntity);
                                const reportLink = getFileLinkIfExist(reports, "hM6AUNKRbKB", training.trackedEntity);
                                let assessmentDate = "";


                                if (currentReport) {

                                    currentReport.dataValues.forEach(rep => {
                                        if (rep.dataElement === "sWGQt9b00Hz" && rep.value === "true") {

                                        } else if (rep.dataElement === "Lh9kST26wbb") {
                                            assessmentDate = rep.value;
                                        }
                                    })
                                }

                                const tempDataSet = {
                                    topic: getAttributeValue("Topic", training),
                                    date: getAttributeValue("End Date", training),
                                    report: moment(currentReport.createdAt).format("YYYY-DD-MM"),
                                    assessmentDate,
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
                                };

                                temp.push(tempDataSet);
                            });

                            let score = temp.length > 0 ? 2 : 0;

                            temp.forEach(el => {
                                if (el.assessmentDate == "" || el.report === "Not Uploaded") {
                                    score = 0;
                                }
                            });

                            setData(temp);
                            setScorei(score)

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <Comment
            data={data}
            year={year}
            districtId={district}
            tableCommentedId={`pi2.0-2.2-${year}`}
            hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 2.0 - 2.2 Post-training Evaluation</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive a copy of the {year} implementation of Capacity Building/training reports:<br /><br />
                        <ol>
                            <li type="i">
                                If there is evidence of post-training evaluation conducted by the Human Resource Management
                                Department (HRMD) at least three (3) months after the training was conducted, score 2
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>{maxScore}</strong>
                    </Title>


                    <Col align="start">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
                            PI 2.0-2.2 Actual Score: <strong>{scorei}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Col>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Evidence of post-training impact assessment
                    </Title>
                    <Table
                        columns={postTrainingEvaluationColumns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default PostTrainingEvaluation;