import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const indicators = [
    {
        indicator: 'Number of Agric Extension and Support Officers',
        id: 'byiRzpSNt8Q',
        value: 0
    },
    {
        indicator: 'No. of public health facilities supported by  the district Assembly',
        id: 'AgoA6c5wqcV',
        value: 0
    }
];

function AgricultureSupport({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [agricultureSupport, setAgricultureSupport] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getIndicators();
    }, []);

    const agricultureSupportColumns = [
        { title: "No. of AEAs", dataIndex: "noOfAEAs", key: "noOfAEAs" },
        { title: "No of Operational Areas", dataIndex: "noOfoperational", key: "noOfoperational" },
        { title: "Data on mapping of AEAs to operational areas", dataIndex: "mapping", key: "mapping" }
    ];

    const getIndicators = () => {
        axios.get(
            `/analytics.json?dimension=dx:byiRzpSNt8Q&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {
                const data = res.data?.rows;
                // console.log("Health: ",data)

                if (data?.length > 0) {

                    // Update indicator values based on result
                    const updatedIndicators = indicators.map(ind => {
                        const match = data.find(r => r[0] === ind.id);
                        return {
                            ...ind,
                            value: match ? parseFloat(match[2]) : 0
                        };
                    });

                    // console.log("Health: ",updatedIndicators);

                    // Map from indicator name to table field
                    const indicatorToFieldMap = {
                        'Number of Agric Extension and Support Officers': 'noOfAEAs'
                    };

                    // Build the row object
                    const row = {};

                    updatedIndicators.forEach(ind => {
                        const key = indicatorToFieldMap[ind.indicator];
                        if (key) {
                            row[key] = ind.value;
                        }
                    });

                    // console.log("Health row ", row);

                    setAgricultureSupport([{
                        noOfAEAs: row.noOfAEAs,
                        noOfoperational: 0,
                        mapping: '?:?'
                    }]);


                    if (row.noOfAEAs > 0) {
                        setScore(1)
                    }

                }


            }).catch(err => console.log(err));
    }





    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.3 Support to Agriculture</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on Agricultural services:<br /><br />
                <ol>
                    <li type="i">
                        If the District has a list of Agricultural Extension Agents (AEAs) and information on their mapping
                        to Operational Areas for delivery of support services to farmers, etc., score 1
                    </li>


                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>1</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 5.0-5.3 Actual Score: <strong>{score}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of AEAs and operational areas
            </Title>
            {<Table
                columns={agricultureSupportColumns}
                dataSource={agricultureSupport || []}
                pagination={false} bordered />}

        </>
    );
}

export default AgricultureSupport;
