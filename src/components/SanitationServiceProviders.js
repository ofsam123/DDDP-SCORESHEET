import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function SanitationServiceProviders({
    year, district

}) {

    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [data, setData] = useState([]);
    const [monitoring, setMonitoring] = useState([{
        availability: "NO",
        frequency: "None",
        reportAvailability: "NO"
    }]);


    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        getServiceProviders();
    }, [year, district, ]);


    function formatDataGeneral(data, property, value) {
        return data?.filter(item =>
            item.attributes.some(attr =>
                attr.displayName === property && attr.value === value
            )
        );

    }

    const getAttributeValue = (key, val) => {
        const attr = val?.attributes.find(attr => attr.displayName === key);
        return attr ? attr.value : "N/A";
    };

    function getServiceProviders() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=nGFVo65uUE4`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=nGFVo65uUE4&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            //    setServiceProviders({ providers: result.data.instances, reports: resp.data.instances })
                            const providers = result.data.instances;
                            const reports = resp.data.instances;
                            const temp = [];
                            const sanitationProviders = formatDataGeneral(providers, "DPAT | Service Provider", "Sanitation Service Provider") || [];

                            sanitationProviders.forEach(p => {
                                const tempDataSet = {
                                    provider: getAttributeValue("Name of Business", p),
                                    period: getAttributeValue("DPAT | Period of Contract", p),
                                    date: getAttributeValue("Start Date", p),
                                    phone: getAttributeValue("Phone", p)
                                };

                                temp.push(tempDataSet);
                            });

                            if (sanitationProviders?.length <= reports?.length) {
                                setScoreii(1);
                                setMonitoring([{
                                    availability: "YES",
                                    frequency: "Daily",
                                    reportAvailability: "YES"
                                }])
                            }

                            if (sanitationProviders?.length > 0) {
                                setScorei(1);
                            }

                            setData(temp)
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }


    const serviceProvidersColumn = [
        { title: "Service Provider", dataIndex: "provider", key: "provider" },
        { title: "Contract Period", dataIndex: "period", key: "period" },
        { title: "Start Date", dataIndex: "date", key: "date" },
        { title: "Phone", dataIndex: "phone", key: "phone" }
    ];

    const serviceProvidersReportColumn = [
        { title: "Availability of sanitation M&E plan (Yes/No)", dataIndex: "availability", key: "availability" },
        { title: "Frequency of monitoring", dataIndex: "frequency", key: "frequency" },
        { title: "Availability of Monitoring Reports (Yes/No)", dataIndex: "reportAvailability", key: "reportAvailability" }
    ];


    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 5.0 - 5.1 Availability of Sanitation Service Providers</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on sanitation management.<br /><br />
                <ol>
                    <li type="i">
                        If the District has an approved list of sanitation service provider(s)
                        or if the Assembly provides the services itself, score 1;


                    </li>
                    <li type="i" className="py-1">
                        If there is evidence of monitoring and evaluation of the services
                        of the service provider(s), score 1;
                    </li>
                    

                </ol>

            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 5.0-5.1i Actual Score: <strong>{scorei}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 5.0-5.1ii Actual Score: <strong>{scoreii}</strong>
            </Title>


            <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Availability of Sanitation Service Providers</Title>
            <Table
                columns={serviceProvidersColumn}
                dataSource={data || []}
                pagination={false} bordered />

            <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of Monitoring and Evaluation of Service Providers</Title>
            <Table
                columns={serviceProvidersReportColumn}
                dataSource={monitoring}
                pagination={false} bordered />


        </>
    );
}

export default SanitationServiceProviders;
