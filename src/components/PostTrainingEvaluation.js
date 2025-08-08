import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { getAttributeValue } from "../utils/utils";
import moment from "moment/moment";

function PostTrainingEvaluation({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [data, setData] = useState([]);
    const [scorei, setScorei] = useState(0);

    const postTrainingEvaluationColumns = [
        { title: "Training Topic", dataIndex: "topic", key: "topic" },
        { title: "Date of Training", dataIndex: "date", key: "date" },
        { title: "Reports Submission", dataIndex: "report", key: "report" },
        { title: "Date of Post-Training Impact Assessment", dataIndex: "assessmentDate", key: "assessmentDate" }
    ];

    useEffect(() => {
        getData();
    }, [year, district, ]);

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
                                let assessmentDate = "";
                                

                                if (currentReport) {

                                    currentReport.dataValues.forEach(rep => {
                                        if (rep.dataElement === "sWGQt9b00Hz" && rep.value === "true") {


                                        }else if (rep.dataElement === "Lh9kST26wbb") {
                                            assessmentDate = rep.value;
                                        }
                                    })
                                }

                                const tempDataSet = {
                                    topic: getAttributeValue("Topic", training),
                                    date: getAttributeValue("End Date", training),
                                    report: moment(currentReport.createdAt).format("YYYY-DD-MM"),
                                    assessmentDate
                                };

                                temp.push(tempDataSet);
                            });

                            let score = temp.length > 0 ? 2 : 0;

                            temp.forEach(el=>{
                                if(el.assessmentDate == ""){
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
                PI 2.0-2.2 Actual Score: <strong>{scorei}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of post-training impact assessment

            </Title>
            {<Table
                columns={postTrainingEvaluationColumns}
                dataSource={data}
                pagination={false} bordered />}

        </>
    );
}

export default PostTrainingEvaluation;
