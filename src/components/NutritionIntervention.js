import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function NutritionIntervention({
    year, district, data

}) {

    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {

        if(data?.aap?.lenght> 0){
            if(data.aap[0].publication === "YES"){
                setScorei(1);
            }
        }

       if(data?.vendors?.length > 0){
        setScoreii(1);
       }
    }, [year, district, ]);



    const aapColumn = [
        { title: "No. of Activities in the AAP of the Assembly", dataIndex: "aapTotal", key: "aapTotal" },
        { title: "No. of Nutrition-oriented interventions", dataIndex: "aapNutrition", key: "aapNutrition" },
        { title: "Nutrition-oriented interventions published on Assembly website or notice board (Yes/No)",
             dataIndex: "publication", key: "publication" }
    ];

    const nutritionColumn = [
        { title: "Vendors", dataIndex: "name", key: "name" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "TIN",dataIndex: "tin", key: "tin" },
        { title: "Vendor Nutrition Orientation",dataIndex: "orientation", key: "orientation" }
    ];


    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 4.0 - 4.6 Nutrition Services</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, receive information on Nutrition activities in the District:<br /><br />
                <ol>
                    <li type="i">
                        If the Assembly has published the list of nutrition-oriented interventions from
                        the Ghana Health Service (GHS) and available linkages, score 1;
                    </li>
                    <li type="i" className="py-1">
                        If the Assembly has oriented food vendors and school feeding programme
                        contractors on nutrition, score 1.

                    </li>

                </ol>

            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.6 Actual Score: <strong>{scorei}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.6 Actual Score: <strong>{scoreii}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Nutrition-Oriented Activities in the Assembly</Title>
            <Table
                columns={aapColumn}
                dataSource={data?.aap || []}
                pagination={false} bordered />

            <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of Nutrition Orientations</Title>
            <Table
                columns={nutritionColumn}
                dataSource={data?.vendors || []}
                pagination={false} bordered />


        </>
    );
}

export default NutritionIntervention;
