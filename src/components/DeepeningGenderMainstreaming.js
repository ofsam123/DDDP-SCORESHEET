import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";
import axios from "../api/axios";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { calculatePercentage, getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const { Header, Content } = Layout;
const { Title } = Typography;

const DeepeningGenderMainstreaming = forwardRef(({ data, year, districtId }, ref) => {

    const [members, setMembers] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [maxScore, setMaxScore] = useState(3);

    useEffect(() => {
        getMemebers();
    }, [year, districtId]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "SDI4",
            area: "Social Protection, Gender and Nutrition",
            maxScore,
            data,
            members,
            scorei,
            scoreii,
            percentage
        }),
    }));

    const membersColumns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Member", dataIndex: "name", key: "name" },
        { title: "Elected/Appointed ", dataIndex: "type", key: "type" },
        { title: "Department", dataIndex: "department", key: "department" },
        { title: "Appointment", dataIndex: "document", key: "document" }
    ];

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Document", dataIndex: "link", key: "link" }
    ];

    function getMemebers() {

        axios
            .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=NdogHaFyDuI`)
            .then(result => {

                const data = result.data.instances;

                if (data.length > 0) {
                    axios
                        .get(`/tracker/events?program=NdogHaFyDuI&orgUnit=${districtId}`)
                        .then(resp => {

                            const reports = resp.data.instances;
                            const temp = [];

                            let femaleCount = 0;

                            data.forEach((item, index) => {

                                const reportLink = getFileLinkIfExist(reports, "cIM3xSMA44J", item.trackedEntity);
                                const gender = getAttributeValue("Sex", item);

                                if (gender === "Female") {
                                    femaleCount++;
                                }

                                const dataState = {
                                    no: index + 1,
                                    name: getAttributeValue("Name", item),
                                    name: gender,
                                    type: getAttributeValue("Assembly Member Type", item),
                                    department: getAttributeValue("Sub Statutory Committee Department", item),
                                    document: reportLink ? (
                                        <a
                                            className="px-2 text-primary fw-bold text-decoration-underline"
                                            href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=xjRCTFFiMA3`} target="_blank"
                                            rel="noopener noreferrer"
                                            title="Click here to see the uploaded appointment Letter"
                                        >
                                            View Letter
                                        </a>
                                    ) : (
                                        "Not Uploaded"
                                    ),
                                };

                                temp.push(dataState);

                            });



                            // setScore(tempScore);

                            const percentageState = calculatePercentage(femaleCount, temp.length);

                            if (percentageState >= 20) {
                                setScorei(2);
                            }

                            setScoreii(1);

                            setPercentage(percentageState.toFixed(2))
                            setMembers(temp);
                        })
                        .catch(err => console.log(err));
                }


            })
            .catch(err => console.log(err))
    }
    return (
        <Comment
            data={data}
            year={year}
            districtId={districtId}
            tableCommentedId={`sdi4.0-4.4-${year}`}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3}>SDI 4.0 - 4.4 Deepening Gender Mainstreaming</Title>
                    <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
                    <Content>
                        From the DCD, receive information on the Gender mainstreaming activities for <strong>{year}</strong>.<br /><br />
                        <ol>

                            <li type="i">
                                If at least 20% of Members (including co-opted Members) on each of the Statutory
                                Subcommittees are Women, score 2
                            </li>

                            <li type="i" className="py-1">
                                If the District Assembly supports 80% of Gender activities to promote
                                equality and non-discrimination against women and girls in the District, score 1
                            </li>
                        </ol>
                    </Content>

                    <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
                    <Title level={5} style={{ marginTop: "20px" }}>
                        SDI 4.0-4.4i Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Col align="start">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
                            SDI 4.0-4.4ii Actual Score: <strong>{scoreii}</strong>
                        </Title>
                        {renderCommentInput()}
                    </Col>

                    <Title level={4} style={{ marginTop: "20px" }}>I- Membership of  Statutory Sub-Committees</Title>
                    {members && <Table columns={membersColumns} dataSource={members} pagination={false} bordered />}

                    <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of Uploaded Documets</Title>
                    {data && <Table columns={columns} dataSource={data} pagination={false} bordered />}

                    <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
                    <Content>
                        {`${percentage}% of the statutory members are Female`}
                        And the district supported 82% of gender activities
                    </Content>

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default DeepeningGenderMainstreaming;