import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage, formatDataGeneral, getAttributeValue, getFileLinkIfExist } from "../utils/utils";
import Comment from "../components/Comments";

function MonitoringProjectAndActivity({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [data, setData] = useState([]);
    const [monitoring, setMonitoring] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const activityColumns = [
        {
            title: "Total Budgetary Allocation for planned M&E activities",
            dataIndex: "aapApproved",
            key: "aapApproved"
        },
        {
            title: "Amount released for planned M&E activities",
            dataIndex: "aapImplented",
            key: "aapImplented"
        },
        {
            title: "% Budgetary Allocation released for planned M&E activities",
            dataIndex: "percentage",
            key: "percentage"
        },
        {
            title: "Report",
            dataIndex: "report",
            key: "report"
        }
    ];

    const monitoringColumns = [
        {
            title: "Date of Monitoring",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Projects monitored",
            dataIndex: "monitored",
            key: "monitored"
        },
        {
            title: "Stakeholders involved",
            dataIndex: "involved",
            key: "involved"
        },
        {
            title: "Report Available (YES/NO)",
            dataIndex: "reportAvailability",
            key: "reportAvailability"
        }
    ];

    useEffect(() => {
        getData();
        getInspectorateMonitoring();
    }, [year, district]);

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=YHVtzXj8iIC&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=YHVtzXj8iIC&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const budgets = result.data.instances;
                            const reports = resp.data.instances;
                            let amountReleased = 0;
                            let allocatedAmount = 0;

                            const monitoringBudgets = formatDataGeneral(budgets, "Budget Category", "M&E Activities") || [];
                            let report = "Not Uploaded";


                            monitoringBudgets.forEach((budget) => {
                                const currentReport = reports.find(rep => rep.trackedEntity === budget.trackedEntity);
                                const reportLink = getFileLinkIfExist(reports, "hM6AUNKRbKB", budget.trackedEntity);

                                if(reportLink){
                                    report = (
                                    <a
                                        className="px-2 text-primary fw-bold text-decoration-underline"
                                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=hM6AUNKRbKB`} target="_blank"
                                        rel="noopener noreferrer"
                                        title="Click here to see the uploaded document"
                                    >
                                        View Report
                                    </a>
                                )
                                }
                                allocatedAmount = getAttributeValue("Allocated Budget", budget);
                                if (currentReport) {
                                    currentReport.dataValues.forEach(rep => {

                                        if (rep.dataElement === "MPLHBtSdEyn") {
                                            amountReleased = rep.value;
                                        }
                                    });
                                }

                            });

                            const percentage = calculatePercentage(amountReleased, allocatedAmount);
                            setPercentage(percentage.toFixed(2));

                            const temp = {
                                aapApproved: allocatedAmount,
                                aapImplented: amountReleased,
                                percentage,
                                report
                            }

                            setData([temp]);
                            if (percentage >= 100) {
                                setScorei(1);
                            }

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    function getInspectorateMonitoring() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=p1ccS2ROn0Q&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=p1ccS2ROn0Q&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const monitorings = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];

                            monitorings.forEach((project) => {
                                const currentReport = reports.find(rep => rep.trackedEntity === project.trackedEntity);
                                let reportAvailability = "NO";
                                if (currentReport) {
                                    if (currentReport.dataValues.length > 0) {
                                        reportAvailability = "YES";
                                    }
                                }

                                const tempDataSet = {
                                    date: getAttributeValue("Date", project),
                                    monitored: getAttributeValue("Inspection Details", project),
                                    involved: getAttributeValue("DPAT | Stakeholders Involved", project),
                                    reportAvailability
                                };

                                temp.push(tempDataSet);

                            });

                            setMonitoring(temp);

                            if (temp.length > 1) {
                                setScoreii(2);
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
            tableCommentedId={`pi1.0-1.2-${year}`}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.2 Monitoring of District Projects and Activities</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From DCD, receive monitoring reports on all district programmes and projects:<br /><br />
                        <ol>
                            <li type="i">
                                If a clear budgetary provision has been made for M&E and 100% of Budgetary allocation released for the
                                implementation of planned monitoring activities, score 1, else score 0
                            </li>
                            <li type="i">
                                If there is evidence of multi-stakeholder participation in monitoring activities, score 2
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>3</strong>
                    </Title>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 1.0-1.2i Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            PI 1.0-1.2ii Actual Score: <strong>{scoreii}</strong>
                        </Title>
                        {renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>
                        I- Evidence of clear budgetary release for M&E activities
                    </Title>
                    <Table
                        columns={activityColumns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    <Title level={4} style={{ marginTop: "20px" }}>
                        II- Evidence of multi-stakeholder participation in monitoring
                    </Title>
                    <Table
                        columns={monitoringColumns}
                        dataSource={monitoring}
                        pagination={false}
                        bordered
                    />

                    <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
                    <Content>
                        {percentage} % of Budgetary allocation released for the implementation of
                        planned monitoring activities. {monitoring.length > 0 ? <>
                            And Quarterly reports exist for participation by multi stakeholders in
                            Monitoring and Evaluation activities in {year}
                        </> : <span>There is no Quarterly report available</span>}
                    </Content>

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
}

export default MonitoringProjectAndActivity;