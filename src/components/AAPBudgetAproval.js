import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AAPBudgetAproval({ data, year, columns }) {

    // useEffect(()=>{
    //     console.log("budget: ",data);
    // },[])

    return (
        <>
            <Title level={3}>CI 1.0 General Assembly Meetings - 1.2 Approval of Annual Action Plan and Budget </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD obtain Minutes of Meeting of the General Assembly approving the <strong>{parseInt(year) + 1}</strong> Composite Budget and the Annual Action Plan: <br /><br />
                <ol>
                    <li type="i">
                        If the Annual Action Plan was duly approved by the General Assembly by 31st October, <strong>{year}</strong> and
                    </li>
                    <li type="i" className="py-1">
                        If the budget was presented by the Executive Committee to the General Assembly and approved latest by 31st October <strong>{year}</strong>
                    </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Approval of Annual Action Plan and Budget:</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />}

        </>
    );
}

export default AAPBudgetAproval;