import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const indicators = [
    {
        indicator: 'No. of established revenue points',
        id: 'K7SItYmXLAA',
        value: 0
    },
    {
        indicator: 'No. of payment points sited outside the Assembly premises',
        id: 'xFPgaqPufQk',
        value: 0
    },
    {
        indicator: 'No. of payment points sited within the Assembly premises',
        id: 'XYxkkP1pF3r',
        value: 0
    }
];

function PaymentPoints({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [payments, setPayments] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getIndicatorsData();
    }, [year, district]);

    const paymentPointsColumns = [
        { title: "Number of established revenue points", dataIndex: "revenuReport", key: "revenuReport" },
        { title: "Number of payment points sited outside the Assembly premises", dataIndex: "outsidePayment", key: "outsidePayment" },
        { title: "Number of payment points sited within the Assembly premises", dataIndex: "withinPayment", key: "withinPayment" }
    ];

    const getIndicatorsData = () => {
        axios.get(
            `/analytics.json?dimension=dx:K7SItYmXLAA;xFPgaqPufQk;XYxkkP1pF3r&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {
                const data = res.data?.rows;

                if (data?.length > 0) {

                    const updatedIndicators = indicators.map(ind => {
                        const match = data.find(r => r[0] === ind.id);
                        return {
                            ...ind,
                            value: match ? parseFloat(match[2]) : 0
                        };
                    });

                    // Map from indicator name to table field
                    const indicatorToFieldMap = {
                        'No. of established revenue points': 'revenuReport',
                        'No. of payment points sited outside the Assembly premises': 'outsidePayment',
                        'No. of payment points sited within the Assembly premises': 'withinPayment'
                    };

                    // Build the row object
                    const row = {};

                    updatedIndicators.forEach(ind => {
                        const key = indicatorToFieldMap[ind.indicator];
                        if (key) {
                            row[key] = ind.value;
                        }
                    });


                    setPayments([row]);

                    // console.log("payments point: ",updatedIndicators)
                    // score to be implemented here                   
                    const revenuReport = parseInt(row.revenuReport, 10);
                    const outsidePayment = parseInt(row.outsidePayment, 10);
                    const withinPayment = parseInt(row.withinPayment, 10);

                    if (revenuReport > 0 && outsidePayment > 0 && withinPayment > 0) {
                        setScore(3);
                    }

                }


            }).catch(err => console.log(err));
    }

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 3.0 - 3.1 Payment Points</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain detailed information on all established payment points and options available to citizens in the District:<br /><br />
                <ol>
                    <li type="i">
                        If the Assembly established at least 5 payment points for Metros, 3 or more for Municipals,
                        2 for Districts (including payment points sited within the Assembly premises), score 3; else score 0
                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>3</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3-1 Actual Score: <strong>{score}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of establishment of revenue payment points

            </Title>
            {<Table
                columns={paymentPointsColumns}
                dataSource={payments || []}
                pagination={false} bordered />}

        </>
    );
}

export default PaymentPoints;
