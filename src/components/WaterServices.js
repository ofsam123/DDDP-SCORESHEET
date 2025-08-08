import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage, countApplicationsForEachDomain, formatDataGeneral, getAttributeValue } from "../utils/utils";

function WaterServices({
    year, district

}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [scorei, setScoreI] = useState(0);
    const [scoreii, setScoreII] = useState(0);
    const [waterProvidersData, setWaterProvidersData] = useState([]);
    const [waterImprovement, setWaterImpovement] = useState([]);
    const [firstPercentage, setFirstPercentage] = useState(0.00)

    const serviceProvidersColumn = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Service Provider", dataIndex: "provider", key: "provider" },
        { title: "Contract Duration", dataIndex: "contract", key: "contract" },
        { title: "Start Date", dataIndex: "date", key: "date" }
    ];

    const serviceProvidersImprovementColumn = [
        { title: "Total no. of Applications for water service (A)", dataIndex: "application", key: "application" },
        { title: "Total no. of applications processed (B)", dataIndex: "processed", key: "processed" },
        { title: "Total No. of Applications provided water service (C)", dataIndex: "provided", key: "provided" }
    ];

    useEffect(() => {
        getServiceProviders();
    }, [year, district]);


    function getServiceProviders() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=nGFVo65uUE4`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=nGFVo65uUE4&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const serviceProviders = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];

                            const waterProviders = formatDataGeneral(serviceProviders, "DPAT | Service Provider", "Water Service Provider") || [];

                            waterProviders.forEach((service, index) => {
                                const tempDataSet = {
                                    key: index + 1,
                                    no: index + 1,
                                    provider: getAttributeValue("Name of Business", service),
                                    trackedEntity: service.trackedEntity,
                                    contract: getAttributeValue("DPAT | Period of Contract", service),
                                    date: getAttributeValue("Start Date", service),
                                };

                                temp.push(tempDataSet);

                            });


                            const waterCounters = countApplicationsForEachDomain(temp, reports);

                            setWaterProvidersData(temp);
                            setWaterImpovement([{
                                application: waterCounters[0],
                                processed: waterCounters[1],
                                provided: waterCounters[2],
                            }]);

                            const percentageII = calculatePercentage(waterCounters[1], waterCounters[0]);

                            setFirstPercentage(percentageII.toFixed(2));

                            if (temp.length > 0) {
                                setScoreI(1);
                            }

                            if (percentageII >= 80) {
                                setScoreII(2);
                            }

                           
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.1 Water Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on Collaboration between the Assembly and Ghana Water Company Limited (GWCL) on Service Delivery in the District:<br /><br />
                <ol>
                    <li type="i">If there is evidence of collaboration/ facilitation between the Assembly and GWCL/CWSA/Small Water System/ and the provision of water in the District, score 1;</li>
                    <li className="py-1" type="i">If at least 80% of applications for service has been processed score 2;</li>
                </ol>
                <br /><br /><i>Local Governance Act, 2016 ( Act 936) Section 12 (Sub Sections 4 b, d & e, Sub-Section 5, Sub-Section 7); Goal 6 of the Sustainable Development Goals, the 2030 Agenda)</i>
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.1i Actual Score: <strong>{scorei}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-2.1ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of existing collaboration/facilitation water service providers</Title>
            {waterProvidersData && <Table
                columns={serviceProvidersColumn}
                dataSource={waterProvidersData}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>II. Evidence of increased access to water due to collaboration/facilitation</Title>
            {waterImprovement && <Table
                columns={serviceProvidersImprovementColumn}
                dataSource={waterImprovement}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion:</Title>
            <Content>
            <ol>
                    <li type="i">Evidence of collaboration/ facilitation between the Assembly and
                    CWSA in the district {waterProvidersData.length > 0 ? 'exist' : 'does not exist'} </li>
                    <li className="py-1" type="i">{firstPercentage} % of applications for Water Services in 2021 have been
                    processed as a result of the collaboration and facilitation.</li>
                   
            </ol>
            </Content>


        </>
    );
}

export default WaterServices;
