import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function GASupport({
    year,
    cededRevenueUtilisationData,
    subStructureActivityData,
    cededRevenueUtilisationScore,
    substructureExpendature
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

    const subExpendatureColumns = [
        { title: "DACF Releases", dataIndex: "quarter", key: "quarter" },
        { title: "Amount Released", dataIndex: "amountReleased", key: "amountReleased" },
        { title: "2% of Amount Released", dataIndex: "twoPercentReleased", key: "twoPercentReleased" },
        { title: "Total Amount spent on substructures", dataIndex: "spentOnSubstructure", key: "spentOnSubstructure" },
        { title: "% spent on substructures", dataIndex: "percentageSpentSubstructure", key: "percentageSpentSubstructure" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 1.0 - 1.3 Assembly Support to Sub-structures</Title>
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
                
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-1.3i Actual Score: <strong>{cededRevenueUtilisationScore >= 30 ? '1' : '0'}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 1.0-1.3ii Actual Score: 
                <strong>{substructureExpendature?.score}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                We received and reviewed information on the activities of established sub-structures and noted the following:
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of utilization of ceded revenue</Title>
            {cededRevenueUtilisationData && <Table
                columns={cededAmountUtilizationColumns}
                dataSource={cededRevenueUtilisationData}
                pagination={false} bordered />}
            {/* <Space><Text>% Utilized on community support = B/A*100</Text></Space> */}

            {/* 1.3 Assembly Support to Substructures Selected Activities that Benefit the Community 
                  Henry to at it and format it the way it is displayed on the sheet and give the score
                  */}
            <Title level={5} style={{ marginTop: "30px" }}>II. Selected Activities that Benefit the Community</Title>
            {subStructureActivityData && <Table
                columns={subStructureActivityColumns}
                dataSource={subStructureActivityData}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>III. Evidence of DACF expenditure on substructures</Title>
            {substructureExpendature && <Table
                columns={subExpendatureColumns}
                dataSource={substructureExpendature?.data}
                pagination={false} bordered />}
            
        </>
    );
}

export default GASupport;
