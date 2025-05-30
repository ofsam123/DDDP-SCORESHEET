import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function SocialProtectionServices({
    year, services, district

}) {

    const [scorei, setScorei] = useState(0);
    const [scoreii, setScoreii] = useState(0);
    const [scoreiii, setScoreiii] = useState(0);
    const [percentage, setPercentage] = useState(0);
    

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    useEffect(() => {
        if (services?.aap?.length > 0) {
            setPercentage(services.aap[0].percentage)
            
            if(services.aap[0].percentage >= 60){
                setScoreii(1);
                setScoreiii(1);
            }
           
        }

        if(services?.publication?.length > 0){
            setScorei(1);
        }
        
    }, [year, district, services]);

    const aapColumn = [
        { title: "a. Number of activities in AAP", dataIndex: "aapTotal", key: "aapTotal" },
        { title: "b. Number of Social Protection activities in AAP", dataIndex: "aapSocialProtection", key: "aapSocialProtection" },
        { title: "c. Number of Social Protection activities in AAP implemented", dataIndex: "aapSocialProtectionImp", key: "aapSocialProtectionImp" },
        { title: "d. Percentage of Social Protection activities implemented (c/b x 100", dataIndex: "percentage", key: "percentage" }
    ];

    const publicationColumn = [
        { title: "List of Social Services Available (Yes/No)", dataIndex: "list", key: "list" },
        { title: "List of Social Services published on Notice Boards or Website (Yes/No)", dataIndex: "publication", key: "publication" },
        { title: "Summary", dataIndex: "summary", key: "summary" }
    ];


    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 4.0 - 4.1 Social Protection Services available in the District</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD and Head of Department of Social Welfare and Community Development, receive information on 
            the operations of the Department of Social Welfare & Community Development:<br /><br />
                <ol>
                    <li type="i"> If the list of Social Services is available to the citizens, score 1;
                    </li>
                    <li type="i" className="py-1"> If the District has implemented at least 60% of 
                        its action plans on social protection from their AAP, score 1;
                    </li>
                    <li type="i"> If there is a report on services rendered, including referrals and 
                        collaborations with other stakeholders in Social Protection, score 1.
                    </li>
                </ol>

            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.1i Actual Score: <strong>{scorei}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.1ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 4.0-4.1iii Actual Score: <strong>{scoreiii}</strong>
            </Title>
            {/* {JSON.stringify(transportations)} */}
            <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Dissemination of Social Services to Citizens</Title>
            <Table
                columns={publicationColumn}
                dataSource={services?.publication || []}
                pagination={false} bordered />

            <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of implementation of action plans on social protection</Title>

            {<Table
                columns={aapColumn}
                dataSource={services?.aap}
                pagination={false} bordered />}


            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                {percentage}% of Road Safety interventions in the Annual Action Plan were implemented
            </Content>

        </>
    );
}

export default SocialProtectionServices;
