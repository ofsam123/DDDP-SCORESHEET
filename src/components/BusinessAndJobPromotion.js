import { Layout, Space, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import { formatDataGeneral, getAttributeValue } from "../utils/utils";
import Comment from "../components/Comments";

const BusinessAndJobPromotion = forwardRef(({
    year, district, hideComment
}, ref) => {

    const [data, setData] = useState([]);
    const [summary, setSummamry] = useState([]);
    const [scorei, setScorei] = useState(0);
    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        getData();
    }, [year, district]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
          data,
          summary,
          scorei
        }),
      }));

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=nBX5Jeo69up&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=nBX5Jeo69up&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const business = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];
                            const businessSupportedByDistrict = formatDataGeneral(business, "Has the district contributed to the creation of this business", "true") || [];
                            

                            businessSupportedByDistrict.forEach(business => {

                                const tempDataSet = {
                                    support: getAttributeValue("District investment Details", business),
                                    sector: getAttributeValue("Business Category", business),
                                    scale: getAttributeValue("DCACT | Scale of Operation", business),
                                    jobsCreated: getAttributeValue("Number of Jobs Created", business)
                                };
                                
                                temp.push(tempDataSet);
                                
                            });

                            setData(temp);
                            setSummamry([{
                                no:1,
                                noOfBusinessCreated: temp.length
                            }])

                            if (temp.length > 0) {
                                setScorei(1);
                            }

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    const dataColumn = [
        {
            title: "Activity / Type of support",
            dataIndex: "support",
            key: "support"
        },
        {
            title: "Scale of Business",
            dataIndex: "scale",
            key: "scale"
        },
        {
            title: "Sector",
            dataIndex: "sector",
            key: "sector"
        },
        {
            title: "No. of new Jobs Created",
            dataIndex: "jobsCreated",
            key: "jobsCreated"
        }
    ];

    const summaryColumn = [
        {
            title: "No",
            dataIndex: "no",
            key: "no"
        },
        {
            title: "Number of Business Created",
            dataIndex: "noOfBusinessCreated",
            key: "noOfBusinessCreated"
        }
    ];

    return (
        <Comment
            data={data}
            year={year}
            districtId={district}
            tableCommentedId={`sdi6.0-6.2-${year}`}
             hideComment={hideComment}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "30px" }}>SDI 6.0 - 6.2 Promotion of new businesses and of new jobs</Title>
                    <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive information on LED activities:<br /><br />
                        <ol>
                            <li type="i">
                                If the district has invested its own resources in direct productive sectors and can show
                                that it has resulted in new businesses creating new jobs at the local level: Score 1
                            </li>
                        </ol>
                    </Content>

                    <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>1</strong></Title>
                    
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            SDI 6.0-6.2 Actual Score: <strong>{scorei}</strong>
                        </Title>
                        {!hideComment && renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>Evidence of Business and Jobs Creation</Title>
                    <Table
                        columns={dataColumn}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    <Title level={4} style={{ marginTop: "20px" }}>Summary of Business Creation</Title>
                    <Table
                        columns={summaryColumn}
                        dataSource={summary}
                        pagination={false}
                        bordered
                    />

                    {renderCommentList()}
                </>
            )}
        </Comment>
    );
})

export default BusinessAndJobPromotion;