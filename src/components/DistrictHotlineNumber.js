import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function DistrictHotlineNumber({ data, year, columns }) {

    const [gaDecisionScore, setGaDecisionScore] = useState(0);

    return (
        <>
            <div>
                <Text strong>THEMATIC AREA: </Text> <Text>
                    SOCIAL PROTECTION, GENDER & NUTRITION (14)
                </Text>
            </div>
            <Title level={3}>SDI 4.0 - 4.3 Availability of Dedicated Hotline for the Vulnerable</Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD and Head of Department of Social Welfare and Community Development receive information on the
                operations of the Department of Social Welfare and Community Development:<br /><br />
                <ol>
                    <li type="i">
                        If the District has a dedicated functional hotline for vulnerable groups, score 1, else score 0;

                    </li>

                </ol>

            </Content>
            <Title level={5} style={{ marginTop: "20px" }}>Maximum Score <strong>1</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>SDI 1.0-1.1 Actual Score: <strong>{data?.score}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Dedicated Functional Hotline for Vulnerable Groups</Title>
            {/* {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />} */}
            {data &&
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    pagination={false} bordered />}
            
            <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
            <Content>
                {data?.score === 1 ? 'There is a dedicated hot line in the District for vulnerable groups' :
                 'There is no dedicated hot line in the District for vulnerable groups'}            
            </Content>

        </>
    );
}

export default DistrictHotlineNumber;