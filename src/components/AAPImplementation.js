import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage } from "../utils/utils";
import Comment from "../components/Comments";

const AAPImplementation = forwardRef(({ year, district, data, hideComment }, ref) => {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [aapImplementation, setAapImplementation] = useState([]);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(2);
    const [document, setDocument] = useState(data);
    const [percentages, setPercentages] = useState(0);

    useEffect(() => {
        getIndicatorsData();
    }, [year, district]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "PI1",
            area: "Annual Action Plan Implementation",
            maxScore,
            document,
            aapImplementation,
            score
        }),
    }));

    const aapImplementationColumns = [
        { title: `No. of activities in approved ${year} Annual Action Plan`, dataIndex: "aapApproved", key: "aapApproved" },
        { title: "No. of activities in approved Annual Action Plan implemented", dataIndex: "aapImplented", key: "aapImplented" },
        { title: "% of implementation of activities in approved Annual Action Plan", dataIndex: "percentage", key: "percentage" }
    ];

    const aapDocumentColumns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Document", dataIndex: "link", key: "link" }
    ];

    const getIndicatorsData = () => {
        axios.get(`/analytics.json?dimension=dx:fqixUP5VIxv;rwB5o0L1eUM&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {
                // console.log("AAP Implemented Diallo: ",res.data?.rows);
                const data = res.data?.rows;

                if (data?.length > 0) {
                    const percentage = calculatePercentage(data[1][2], data[0][2]);

                    setAapImplementation([{
                        aapApproved: parseInt(data[0][2]) || 0,
                        aapImplented: parseInt(data[1][2]) || 0,
                        percentage: percentage
                    }]);

                    setPercentages(percentage);
                    if (percentage >= 90) {
                        setScore(2);
                    }

                }


            }).catch(err => console.log(err));
    }

    return (
        <Comment
            data={aapImplementation}
            year={year}
            districtId={district}
            tableCommentedId={`pi1.0-1.1-${year}`}
            hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.1 Implementation of Annual Action Plan (AAP)</Title>
                    <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From DCD, receive reports on the implementation of projects and programmes in the Annual Action Plan:<br /><br />
                        <ol>
                            <li type="i">
                                If there is evidence that at least 90% of activities implemented in {year} are from the approved Annual Action Plan, score 2; else 0
                            </li>
                        </ol>
                    </Content>

                    <Title level={5} style={{ marginTop: "20px" }}>
                        Maximum Score <strong>{maxScore}</strong>
                    </Title>


                    <Col align="start">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
                            PI 1.0-1.1 Actual Score: <strong>{score}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Col>

                    <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Annual Action Plan Implemented </Title>
                    <Table
                        columns={aapImplementationColumns}
                        dataSource={aapImplementation || []}
                        pagination={false}
                        bordered
                    />

                    <Title level={4} style={{ marginTop: "20px" }}>II- Evidence Attached Documents </Title>
                    <Table
                        columns={aapDocumentColumns}
                        dataSource={document || []}
                        pagination={false}
                        bordered
                    />

                    <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
                    <Content>
                        The district has implemented {percentages}% of Planned Projects and Programmes in the {year} AAP
                    </Content>

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default AAPImplementation;