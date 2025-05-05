import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function SPCEntityTenderCommittee({ data, year, columns }) {

    return (
        <>
            <Title level={3}>CI 3.0 Public Financial Management and Auditing -
            3.1 Meetings of the Entity Tender Committee (ETC) and Procurement Plans Approval </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD, receive information on the preparation and approval of the <strong>{parseInt(year) +1}</strong> Procurement 
            Plan by 30th November <strong>{year}</strong>, and obtain quarterly updated Procurement Plans from the Procurement Plan for <strong>{year}</strong>.<br /><br />
                <ol>
                    <li type="i">
                    Confirm whether the Entity Tender Committee met as required by law (at least once every quarter) and whether 
                    duly recorded and signed minutes of the meetings are available.
                    </li>
                    <li type="i">
                    Confirm whether the <strong>{parseInt(year) +1}</strong> Annual Procurement Plan is linked to the 
                    <strong>{parseInt(year) +1}</strong> Composite Budget and 
                    Annual Action Plan (AAP), and whether it was approved by the Entity Tender Committee by 30th 
                    November <strong>{year}</strong>, as evidenced by meeting minutes and in accordance with PPA guidelines  
                   </li>
                   <li type="i">
                   Confirm whether all the 2021 quarterly updated Procurement Plans were duly prepared by the Procurement Unit and 
                   approved during the quarterly meetings of the Entity Tender Committee
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Entity Tender Committee Meetings</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

        </>
    );
}

export default SPCEntityTenderCommittee;