import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { formatDataGeneral, getAttributeValue } from "../utils/utils";
import Comment from "../components/Comments";

function AgroProcessingFacilitySupport({
    year, district
}) {

    const [data, setData] = useState([]);
    const [scorei, setScorei] = useState(0);
    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        getData();
    }, [year, district]);

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

                                const currentReport = reports.find(rep => rep.trackedEntity === business.trackedEntity);

                                if (currentReport) {
                                    let support = "NO";
                                    let acquisition = "NO";
                                    let evidence = "";
                                    currentReport.dataValues.forEach(rep => {

                                        if (rep.dataElement === "ZsVGR44uSJs" && rep.value === "true") {
                                            support = "YES";
                                        } else if (rep.dataElement === "CuiQEA6mkjk" && rep.value === "true") {
                                            acquisition = "YES";
                                        } else if (rep.dataElement === "TsTYaz7dtAn") {
                                            evidence = rep.value;
                                        }
                                    })

                                    const tempDataSet = {
                                        business: getAttributeValue("District investment Details", business),
                                        support,
                                        acquisition,
                                        evidence
                                    };

                                    temp.push(tempDataSet);
                                }

                            });

                            setData(temp);

                            if (temp.length > 0) {
                                setScorei(2);
                            }

                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    const dataColumn = [
        {
            title: "Business",
            dataIndex: "business",
            key: "business"
        },
        {
            title: "Has the District supported or provided storage facilities?",
            dataIndex: "support",
            key: "suppor"
        },
        {
            title: "Has the District facilitated the acquisition of machinery or equipment resulting in the processing of local agricultural products?",
            dataIndex: "acquisition",
            key: "acquisition"
        },
        {
            title: "Evidence Provided",
            dataIndex: "evidence",
            key: "evidence"
        }
    ];

    return (
        <Comment
            data={data}
            year={year}
            districtId={district}
            tableCommentedId={`sdi6.0-6.3-${year}`}
        >
            {({ renderCommentInput, renderCommentList }) => (
                <>
                    <Title level={3} style={{ marginTop: "30px" }}>SDI 6.0 - 6.3 Facilitate and support small-scale
                        agro-processing and manufacturing industries</Title>
                    <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
                    <Content>
                        From the DCD, receive information and determine:<br /><br />
                        <ol>
                            <li type="i">
                                If the District has supported or provided storage facilities to reduce post-harvest losses, score 1
                            </li>
                            <li type="i" className="p-1">
                                If the District has facilitated the acquisition of machinery/equipment that has resulted in the
                                processing of local agricultural products (e.g., fruit juice, meat, and cassava processing,
                                packaging, and branding), score 1
                            </li>
                        </ol>
                    </Content>

                    <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
                    <Title level={5} style={{ marginTop: "20px" }}>
                        SDI 6.0-6.3 Actual Score: <strong>{scorei}</strong>
                    </Title>
                    <Row align="middle">
                        <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                            SDI 6.0-6.3 Actual Score: <strong>{scorei}</strong>
                        </Title>
                        {renderCommentInput()}
                    </Row>

                    <Title level={4} style={{ marginTop: "20px" }}>Evidence of Assembly’s support to small-scale agro-processing and
                        manufacturing industries</Title>
                    <Table
                        columns={dataColumn}
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

export default AgroProcessingFacilitySupport;