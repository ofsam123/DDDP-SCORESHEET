import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function GAMeeting({ data, year, columns, decisions, decisionColumns }) {

    // useEffect(()=>{
    // console.log("decision passed: ",decisions);
    //     console.log("meeting passed: ",data);
    // },[])
    return (
        <>
            <Title level={3}>CI 1.0 General Assembly Meetings - 1.1 Meetings of the General Assembly </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the District Coordinating Director (DCD) receive information on the General Assembly Meetings held in <strong>{year}</strong>:<br /><br />
                <ol>
                    <li type="i">
                        If the Assembly held at least three ordinary Meetings in <strong>{year}</strong> with Minutes of Meetings duly recorded and signed by both PM and DCD;
                    </li>
                    <li type="i" className="py-1">
                        If the ordinary meeting was convened through a notice of meeting issued within two weeks before the meeting date and duly signed by the Presiding Member/Convener; and
                    </li>
                    <li type="i">
                        If there is evidence of decisions (e.g. Resolutions; if applicable) made by the General Assembly during the convened meetings. </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "10px" }}>Number of Decisions: <strong>{data?.numberOfDecision}</strong> </Title>
            <Title level={4} style={{ marginTop: "20px" }}>Illustration of Meetings held in the table bellow:</Title>
            {data?.meetings && <Table columns={columns} dataSource={data?.meetings} pagination={false} bordered />}

            <Title level={4} style={{ marginTop: "10px" }}>Illustration of Decision taken in the table bellow:</Title>
            {decisions && <Table columns={decisionColumns} dataSource={decisions} pagination={false} bordered />}
        </>
    );
}

export default GAMeeting;