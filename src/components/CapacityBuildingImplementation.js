import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage, formatDataGeneral, getDataRank, getQuarterDate } from "../utils/utils";
import moment from "moment/moment";
import Comment from "../components/Comments";

function CapacityBuildingImplementation({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [data, setData] = useState([]);
    const [report, setReport] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const CapacityBuildingImplementationColumns = [
        { title: "Availability of TNA & Capacity Building Plan", dataIndex: "tnaAvaillability", key: "tnaAvaillability" },
        { title: "Number of Activities in the Capacity Building Plan", dataIndex: "numberOfActivity", key: "numberOfActivity" },
        { title: "Number of Activities in the Capacity Building Plan implemented", dataIndex: "numberOfActivityImpl", key: "numberOfActivityImpl" }
    ];

    const timeLineSubmissionColumns = [
        { title: "Report", dataIndex: "report", key: "report" },
        { title: "Deadline for submission", dataIndex: "deadline", key: "deadline" },
        { title: "Submission Dates to OHLGS", dataIndex: "date", key: "date" },
        { title: "Total of Female Participants", dataIndex: "totalF", key: "totalF" },
        { title: "Total of Male Participants", dataIndex: "totalM", key: "totalM" }
    ];

    useEffect(()=>{
        getData();
        getCapacityBuilding();
    },[year, district])

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const aap = result.data.instances;
                            const reports = resp.data.instances;
                            const capacityBuildingPlans = formatDataGeneral(aap, "Activity Type", "Training & Capacity Building") || [];
                            let capacityBuildingPlanImplemented = 0;

                            capacityBuildingPlans.forEach(plan => {
                                const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

                                if (currentReport) {

                                    currentReport.dataValues.forEach(rep => {
                                        if (rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed") {
                                            capacityBuildingPlanImplemented++;
                                        }
                                    })
                                }
                            });

                            const temp = {
                                numberOfActivity: capacityBuildingPlans.length,
                                numberOfActivityImpl: capacityBuildingPlanImplemented,
                                tnaAvaillability: capacityBuildingPlans.length > 0 ? "YES" : "NO"
                            }

                            setData([temp]);

                            const percentage = calculatePercentage(capacityBuildingPlanImplemented, capacityBuildingPlans.length);
                            setPercentage(percentage);

                            if (percentage >= 80) {
                                setScorei(1);
                            }

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    function getCapacityBuilding() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=rpqTh4RQMSq&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=rpqTh4RQMSq&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const capacityBuildings = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];

                            capacityBuildings.forEach((cap, idx) => {
                                const currentReport = reports.find(rep => rep.trackedEntity === cap.trackedEntity);

                                let femaleParticipant = 0;
                                let maleParticipant = 0;
                                if (currentReport) {
                                    
                                    currentReport.dataValues.forEach(rep => {
                                        if (rep.dataElement === "cZPy5ukNcow") {
                                            femaleParticipant = rep.value;
                                        }else if(rep.dataElement === "web76YpF4uK") {
                                           maleParticipant = rep.value; 
                                        }
                                    });
                                }

                                const tempDataSet = {
                                    report: `${getDataRank(idx)} Quarter`,
                                    deadline: getQuarterDate(idx, year),
                                    date: moment(currentReport?.completedAt).format("YYYY-DD-MM"),
                                    totalF: femaleParticipant,
                                    totalM: maleParticipant
                                }

                                temp.push(tempDataSet);
                            });

                            if (temp.length >= 4) {
                                setScoreii(1);
                            }

                            setReport(temp);

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
            tableCommentedId={`pi2.0-2.1-${year}`}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 2.0 - 2.1 Implementation of Capacity Building Plan</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD and OHLGS, receive a copy of the TNA and Capacity Building Plan and Reports:<br /><br />
                        <ol>
                            <li type="i">
                                If all quarterly reports on capacity building activities from the capacity building plan and DPAT recommendations
                                were received with sex-disaggregated data within 15 days after the end of the quarter, score 1; else score 0.
                            </li>
                            <li type="i">
                                If the Assembly has implemented 80% of its capacity building plan, score 1.
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>2</strong>
                    </Title>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        PI 2.0-2.1i Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            PI 2.0-2.1ii Actual Score: <strong>{scoreii}</strong>
                        </Title>
                        {renderCommentInput()}
                    </Row>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Evidence of Availability & implementation of Capacity Building Plan
                    </Title>
                    <Table
                        columns={CapacityBuildingImplementationColumns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Evidence of timely submission of Capacity Building Reports
                    </Title>
                    <Table
                        columns={timeLineSubmissionColumns}
                        dataSource={report}
                        pagination={false}
                        bordered
                    />

                    <Title level={5} style={{ marginTop: "10px" }}>Conclusion:</Title>
                    <Content>
                        {percentage.toFixed(2)} % of programmes in the Training Plan have been implemented and {report.length} quarterly reports were submitted to OHLGS within 15 days after the end of the quarter.
                    </Content>

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
}

export default CapacityBuildingImplementation;