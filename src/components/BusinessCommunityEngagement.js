import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { formatDataGeneral, getAttributeValue } from "../utils/utils";
import Comment from "../components/Comments";

function BusinessCommunityEngagement({
    year, district,hideComment
}) {

    const [data, setData] = useState([]);
    const [report, setReport] = useState([]);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        getData();
    }, [year, district]);

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=yiLy1Tiyjng&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=yiLy1Tiyjng&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const events = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];
                            const reportTemp = [];

                            const forums = formatDataGeneral(events, "Meeting Type", "Business Forum") || [];

                            forums.forEach((forum, idx) => {
                                const tempDataSet = {
                                    date: getAttributeValue("Date", forum),
                                    venue: getAttributeValue("Meeting Venue", forum),
                                    issues: getAttributeValue("Description", forum),
                                    female: getAttributeValue("DPAT |  No. of direct beneficiaries (female)", forum),
                                    male: getAttributeValue("DPAT |  No. of direct beneficiaries (male)", forum)
                                };

                                temp.push(tempDataSet);

                                const currentReport = reports.find(rep => rep.trackedEntity === forum.trackedEntity);
                                let actions = "";

                                if (currentReport) {

                                    currentReport.dataValues.forEach(rep => {

                                        if (rep.dataElement === "fRf6Lla04gE") {
                                            actions = rep.value;
                                        }
                                    });

                                    const reportDataSet = {
                                        no: idx + 1,
                                        decision: getAttributeValue("Decision", forum),
                                        actions
                                    };
                                    reportTemp.push(reportDataSet);
                                }

                            });

                            setData(temp);
                            setReport(reportTemp)

                            if (temp.length >= 2) {
                                setScorei(1);
                            }

                            if (reportTemp.length > 0) {
                                setScoreii(1);
                            }

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    const dataColumn = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Venue",
            dataIndex: "venue",
            key: "venue"
        },
        {
            title: "Issues discussed",
            dataIndex: "issues",
            key: "issues"
        },
        {
            title: "No. of Female Participants",
            dataIndex: "female",
            key: "female"
        },
        {
            title: "No. of Male Participants",
            dataIndex: "male",
            key: "male"
        }
    ];

    const reportColumn = [
        {
            title: "No.",
            dataIndex: "no",
            key: "no"
        },
        {
            title: "Decisions made",
            dataIndex: "decision",
            key: "decision"
        },
        {
            title: "Follow-up Action on Decisions made",
            dataIndex: "actions",
            key: "actions"
        },

    ];

    return (
        <Comment
            data={data}
            year={year}
            districtId={district}
            tableCommentedId={`sdi6.0-6.4-${year}`}
             hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "30px" }}>SDI 6.0 - 6.4 Engagement with the Business Community</Title>
                    <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive information on LED activities:<br /><br />
                        <ol>
                            <li type="i">
                                If the District has organized at least 2 business forums/platform meetings with the business community
                                in the District, score 1;
                            </li>
                            <li type="i" className="p-1">
                                If there is evidence of follow-up action on agreed actions from all the engagements in (i) above, score 1.
                            </li>
                        </ol>
                    </Content>

                    <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
                    <Title level={5} style={{ marginTop: "20px" }}>
                        SDI 6.0-6.4 Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            SDI 6.0-6.4 Actual Score: <strong>{scoreii}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>
                        I- Evidence of business forums/platform meetings held
                    </Title>
                    <Table
                        columns={dataColumn}
                        dataSource={data}
                        pagination={false} bordered
                    />

                    <Title level={4} style={{ marginTop: "20px" }}>
                        II- Evidence of follow-up actions
                    </Title>
                    <Table
                        columns={reportColumn}
                        dataSource={report}
                        pagination={false} bordered
                    />

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
}

export default BusinessCommunityEngagement;