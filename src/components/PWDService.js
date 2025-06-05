import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function PWDService({
    year, district

}) {

    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [scoreiii, setScoreiii] = useState(0);
    const [pwdData, setPwdData] = useState({ pwd: [], iga: [], cb: [] });


    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        getPWDs();
    }, [year, district]);


    const calculatePercentage = (total, value) => {
        const totalNum = parseFloat(total);
        const valueNum = parseFloat(value);

        if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
            return 0;
        }

        return ((valueNum / totalNum) * 100).toFixed(2);
    };

    function getPWDs() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=OiDekszWx2p`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=OiDekszWx2p&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            
                            const pwds = result.data.instances;
                            const reports = resp.data.instances;
                            const pwdTotal = pwds.length;
                            let nhisTotal = 0;
                            let igaTotal = 0;
                            let cbTotal = 0;

                            pwds.forEach(pwd => {
                                const currentReport = reports.find(rep => rep.trackedEntity === pwd.trackedEntity);

                                if (currentReport) {
                                    currentReport.dataValues.forEach(r => {
                                        if ((r.dataElement === "UfmLydzXyEP") && (r.value === "true")) {
                                                nhisTotal ++;
                                        }else if ((r.dataElement === "eWAPdFz4S8r") && (r.value === "true")) {
                                            igaTotal ++;
                                        }else if ((r.dataElement === "Cj03jpBNbpB") && (r.value === "true")) {
                                            
                                                cbTotal ++;
                                                
                                            
                                        }
                                    });


                                }
                            });

                            const pwdPercentage = calculatePercentage(pwdTotal, nhisTotal);
                            const igaPercentage = calculatePercentage(pwdTotal, igaTotal);
                            const cbPercentage = calculatePercentage(pwdTotal, cbTotal);

                            if(pwdPercentage >= 90){
                                setScorei(1);
                            }

                            if(igaPercentage >= 50){
                                setScoreii(1);
                            }

                            if(cbPercentage >= 30){
                                setScoreiii(1);
                            }


                            const pwdTemp = {
                                pwdTotal,
                                nhisTotal,
                                percentage: pwdPercentage
                            };

                            const igaTemp = {
                                pwdTotal,
                                igaTotal,
                                percentage: igaPercentage
                            };

                            const capacityBuldingTemp = {
                                pwdTotal,
                                cbTotal,
                                percentage: cbPercentage
                            };

                           setPwdData({ pwd: [pwdTemp], iga: [igaTemp], cb: [capacityBuldingTemp] })
                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }


    const pwdNHISColumn = [
        { title: "a. Number of PWDs registered with the District", dataIndex: "pwdTotal", key: "pwdTotal" },
        { title: "b. Number of PWDs enrolled with NHIS", dataIndex: "nhisTotal", key: "nhisTotal" },
        { title: "c. % of PWDs enrolled with NHIS (b/a X 100)", dataIndex: "percentage", key: "percentage" }
    ];

    const pwdIGAColumn = [
        { title: "a. Number of PWDs registered with the District", dataIndex: "pwdTotal", key: "pwdTotal" },
        { title: "b. Number of PWDs supported to engage in IGA", dataIndex: "igaTotal", key: "igaTotal" },
        { title: "c. % of PWDs engaged in IGA (b/a X 100)", dataIndex: "percentage", key: "percentage" }
    ];

    const pwdCBColumn = [
        { title: "a. Number of PWDs registered with the District", dataIndex: "pwdTotal", key: "pwdTotal" },
        { title: "b. Number of PWDs whose capacities have been built", dataIndex: "cbTotal", key: "cbTotal" },
        { title: "c. % of PWDs whose capacity has been built (b/a X 100) ", dataIndex: "percentage", key: "percentage" }
    ];


    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 4.0 - 4.4 Service to People Living with Disabilities (PWDs)</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD and Head of Department of Social Welfare and Community Development,
                receive information on the management of People Living with Disabilities (PWD):<br /><br />
                <ol>
                    <li type="i">
                        If the District has enrolled at least 90% of PWDs registered with the
                        District on the National Health Insurance Scheme, score 1;
                    </li>
                    <li type="i" className="py-1">
                        If the District has provided resources and engaged at least 50% of the registered
                        PWDs in Productive Inclusive / Income Generating Activities (IGAs), score 1; and
                    </li>
                    <li type="i">
                        If the District has built the capacity of at least 30% of the registered
                        PWDs in a vocation or skill, score 1.
                    </li>

                </ol>

            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.4i Actual Score: <strong>{scorei}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.4ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.4iii Actual Score: <strong>{scoreiii}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Registration of PWDs with NHIS</Title>
            <Table
                columns={pwdNHISColumn}
                dataSource={pwdData.pwd || []}
                pagination={false} bordered />

            <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of PWDs engaged in Inclusive IGA</Title>
            <Table
                columns={pwdIGAColumn}
                dataSource={pwdData.iga }
                pagination={false} bordered />

            <Title level={4} style={{ marginTop: "20px" }}>III- Evidence of capacity building for PWDs in a Vocation/skill</Title>
            <Table
                columns={pwdCBColumn}
                dataSource={pwdData.cb}
                pagination={false} bordered />


        </>
    );
}

export default PWDService;
