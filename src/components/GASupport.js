import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function GASupport({
    year,
    cededRevenueUtilisationData,
    subStructureActivityData,
    cededRevenueUtilisationScore
}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const cededAmountUtilizationColumns = [
        { title: "Name of substructure", dataIndex: "name", key: "name" },
        { title: "Amount of Ceded Revenue Received (GHS) - A", dataIndex: "collected", key: "collected" },
        { title: "Amount of Ceded Revenue utilized for Community Activities (GHS)", dataIndex: "ceded", key: "ceded" },
        { title: "% of Amount utilized for Community Activities ", dataIndex: "percentage", key: "percentage" }
    ];
    
    const subStructureActivityColumns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Activities ", dataIndex: "activities", key: "collected" },
        { title: "Substructure", dataIndex: "name", key: "name" },
        { title: "Amount Utilized", dataIndex: "amount", key: "amount" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>1.3 Assembly Support to Sub-structures</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                <div className="mb-3">From the DCD, receive reports on the activities of all established sub-structures of
                    the Assembly and Assembly’s DACF allocation to Sub-structures:</div>
                <ol>
                    <li type="i">If all the sub-structures utilized at least 30% of their ceded Revenue to support
                        activities that benefit the Community, score 1, else score 0 </li>
                    <li type="i" className="py-1">If the Assembly has spent at least 90% of the up-to 2% DACF release to its
                        Sub-Structures, to support the substructures, score 1, else score 0.</li>
                </ol>
                <div style={{ fontStyle: 'italic' }}>
                    (Local Government (Urban, Zonal and Town Councils and Unit Committees)
                    Establishment Instrument of 2010, LI 1961) Guidelines for the Disbursement
                    and Management of the District Assembly Common Fund Allocation
                </div>
            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>2</Content>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                We received and reviewed information on the activities of established sub-structures and noted the following:
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of utilization of ceded revenue</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{cededRevenueUtilisationScore >= 30 ? '1' : '0'}</Text></Space>
            {cededRevenueUtilisationData && <Table
                columns={cededAmountUtilizationColumns}
                dataSource={cededRevenueUtilisationData}
                pagination={false} bordered />}
            <Space><Text>% Utilized on community support = B/A*100</Text></Space>

            {/* 1.3 Assembly Support to Substructures Selected Activities that Benefit the Community 
                  Henry to at it and format it the way it is displayed on the sheet and give the score
                  */}
            <Title level={5} style={{ marginTop: "30px" }}>II. Selected Activities that Benefit the Community</Title>
            {subStructureActivityData && <Table
                columns={subStructureActivityColumns}
                dataSource={subStructureActivityData}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>III. Evidence of DACF expenditure on substructures</Title>
            {/* Sow to bring the table here */}
            <Space><Text>C = B/A*100</Text></Space>
            <Space><Text>C= 12,495.11/12830.09*100=97.38</Text></Space>

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                <ol>
                    <li>All substructures utilized 30% of the revenue ceded to them to support activities that benefit the community</li>
                    <li>The Assembly has spent at least 90% of the up to 2% of the DACF released to the Substructures</li>
                </ol>
            </Content>
            <Title level={5} style={{ marginTop: "30px" }}>Source:</Title>
            <Content>
                <ol>
                    <li>Akyemade EMA/EZC/VOL.1 EZC/NOV/01</li>
                    <li>Bonwire EMA/BBZC/VOL.1 BZC/2021/DEC/17</li>
                    <li>OKYEREKROM ROADSIDE EMA/KMZC/VOL.1 KMZC/2021/NOV/01</li>
                    <li>ACHINAKROM EMA/MZC/VOL.1 MZC/2021/NOV/12</li>
                    <li>EDWENASE EMA/OZC/VOL.1 OZC/NOV/02</li>
                </ol>
            </Content>
            <Title level={5} style={{ marginTop: "30px" }}>Observations:</Title>
            <Content>
                <ol>
                    <li>The Ejisu Municipal Assembly received DACF releases in the 3rd and 4th Quarters of the year {year}.</li>
                    <li>The Municipal Assembly therefore released the DACF 2% due the substructures thereafter. Consequently, the Zonal Councils made DACF service delivery expenditures in the last quarter of the year {year}.</li>
                    <li>The Service Delivery expenditures made by the Zonal Councils prior to the DACF release came primarily from the 50% ceded revenue from for the Assembly.</li>
                    <li>ACHINAKROM EMA/MZC/VOL.1 MZC/2021/NOV/12</li>
                    <li>EDWENASE EMA/OZC/VOL.1 OZC/NOV/02</li>
                </ol>
            </Content>
        </>
    );
}

export default GASupport;
