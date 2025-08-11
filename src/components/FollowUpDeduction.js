import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import { formatDataGeneral } from "../utils/utils";
import axios from "../api/axios";
import Comment from "../components/Comments";

function FollowUpDeduction({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [data, setData] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [scoreiii, setScoreiii] = useState(0);

    const followUpColumns = [
        { title: "No. of Contracts/Services with source deduction payments", dataIndex: "paymentDeduction", key: "paymentDeduction" },
        { title: "Copies of all contracts with source deductions available (Yes/No)", dataIndex: "contractDeduction", key: "contractDeduction" },
        { title: "No. of contracts implemented with reports available", dataIndex: "contractImplemented", key: "contractImplemented" },
        { title: "Any adverse findings on central government deductions (Yes/No)", dataIndex: "governmentDeduction", key: "governmentDeduction" }
    ];

    useEffect(() => {
        getData();
    }, [year, district])

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const projectsAndProgrammes = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];
                            const reportTemp = [];

                            const projects = formatDataGeneral(projectsAndProgrammes, "Project & Programme Type", "Project") || [];
                            let paymentDeduction = 0;
                            let contractDeduction = 0;
                            let contractImplemented = 0;
                            let governmentDeduction = "NO";

                            projects.forEach((project, idx) => {

                                const currentReport = reports.find(rep => rep.trackedEntity === project.trackedEntity);

                                if (currentReport) {

                                    currentReport.dataValues.forEach(rep => {

                                        if (rep.dataElement === "TKC9UdFpqB6") {
                                            paymentDeduction++;
                                        } else if (rep.dataElement === "l9FIYnhUH7z" && rep.value === "true") {
                                            contractDeduction++;
                                        } else if (rep.dataElement === "tE3QKB203nh" && rep.value === "Completed") {
                                            contractImplemented++;
                                        } else if (rep.dataElement === "YDgvR2PKQTT" && rep.value === "true") {
                                            governmentDeduction = "YES";
                                        }
                                    });

                                }

                            });

                            temp.push({
                                paymentDeduction,
                                contractDeduction,
                                contractImplemented,
                                governmentDeduction
                            })

                            setData(temp);

                            if (paymentDeduction > 0) {
                                setScorei(1);
                            }

                            if (contractDeduction > 0) {
                                setScoreii(1);
                            }

                            if (contractImplemented > 0 && governmentDeduction !== "YES") {
                                setScoreiii(1);
                            }

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
            tableCommentedId={`pi1.0-1.4-${year}`}
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
                        {renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>
                        Evidence of contract deductions at source
                    </Title>

                    <Table
                        columns={followUpColumns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
}

export default FollowUpDeduction;