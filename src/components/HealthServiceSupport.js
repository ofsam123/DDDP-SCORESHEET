import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage } from "../utils/utils";

const indicators = [
    {
        indicator: 'No. of public health facilities in the district',
        id: 'yBAZbm4MmfC',
        value: 0
    },
    {
        indicator: 'No. of public health facilities supported by  the district Assembly',
        id: 'AgoA6c5wqcV',
        value: 0
    }
];

function HealthServiceSupport({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [healthFacilities, setHealthFacilities] = useState([]);
    const [score, setScore] = useState(0);
    
        useEffect(()=>{
          getIndicators();
        }, []);

    const healthSupportColumns = [
        { title: "No. of Health Centres (A)", dataIndex: "noOfHealthCenter", key: "noOfHealthCenter" },
        { title: "No. of Health Centres supported by DA (B)", dataIndex: "noOfHealthCenterSupported", key: "noOfHealthCenterSupported" },
        { title: "% of health centres supported B/A * 100", dataIndex: "percentage", key: "percentage" },
        { title: "Nature of support", dataIndex: "support", key: "support" }
    ];

    const getIndicators = () => {
                axios.get(
                    `/analytics.json?dimension=dx:yBAZbm4MmfC;AgoA6c5wqcV&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
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
                                'No. of public health facilities in the district': 'noOfHealthCenter',
                                'No. of public health facilities supported by  the district Assembly': 'noOfHealthCenterSupported'
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
                            const percentage = calculatePercentage(row.noOfHealthCenterSupported, row.noOfHealthCenter);
        
                            setHealthFacilities([{
                                noOfHealthCenter: row.noOfHealthCenter,
                                noOfHealthCenterSupported: row.noOfHealthCenterSupported,
                                percentage: percentage,
                                support: "Supports"
                            }]);
        
                            
                            if(percentage >= 15){
                                setScore(2)
                            }
        
                        }
        
        
                    }).catch(err => console.log(err));
            }


    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.2 Support to Health Services</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD and District Director of Health receive information on the list of public 
            health facilities in the District and challenges faced by the centres:<br /><br />
                <ol>
                    <li type="i">
                    If the sum total of Cash irregularities is less than 1% of the total
                     expenditure of the Assembly for <strong>{year}</strong>, score 1;
                    </li>
                    <li type="i">
                    If the Assembly has supported at least 15% of the public health centres to address their challenges, score 2
                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 5.0-5.2 Actual Score: <strong>{score}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
            Assembly Support to Public Health Facilities
            </Title>
            {<Table
                columns={healthSupportColumns}
                dataSource={healthFacilities || []}
                pagination={false} bordered />}

        </>
    );
}

export default HealthServiceSupport;
