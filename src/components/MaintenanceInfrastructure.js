import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function MaintenanceInfrastructure({
    year, buildingInspectorateData,

}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const buildingInspectorateColumn = [
        { title: "Date Established", dataIndex: "date", key: "date" },
        { title: "Supervisor", dataIndex: "supervisor", key: "supervisor" },
        { title: "address", dataIndex: "address", key: "address" },
        { title: "Category of staff", dataIndex: "category", key: "category" },
        { title: "Function performed by Works Department", dataIndex: "department", key: "department" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>2.4 Maintenance of Infrastructure of Public Interest</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive information on the Operations & Maintenance Plan and its implementation:<br /><br />
                <ol>
                    <li type="i">If the plan includes public places of interest such as Markets, Community Centres, Lorry Parks, U-Drains, Schools, Hospitals or Clinics, CHPS Compounds, etc, score 1;</li>
                    <li type="i" className="py-1">If the budget allocation for O&M is at least 10% of Capital expenditure budget, score 1; and</li>
                    <li type="i">If there is evidence of expenditure for O&M Budget proportional to 10% of the Capital Expenditure and there is evidence of implementation of the O&M Plan, score 1</li>
                </ol>

                <br /><br /><i>Local Governance Act, 2016 (Act 936) Section 12 (Sub section 3)</i>
            </Content>

            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>3</Content>

            <Title level={4} style={{ marginTop: "30px" }}>Findings / Observations & Conclusion</Title>
            <Content>
                <p>We received and reviewed information on the operations and maintenance plan from the MCD and notes as follows:</p>
                <p>2021 O&M plan does exist with 7 items included on public places of interest.</p>
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of O&M Plan in existence</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {buildingInspectorateData && <Table
                    columns={buildingInspectorateColumn}
                    dataSource={buildingInspectorateData}
                    pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>II. O&M Budget to Capital Budget</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {buildingInspectorateData && <Table
                    columns={buildingInspectorateColumn}
                    dataSource={buildingInspectorateData}
                    pagination={false} bordered />}
            <p>% O&M Budget to Capital Budget = (B/A) x100 = 22.5%</p>

            <Title level={5} style={{ marginTop: "30px" }}>III. Evidence of implementation of O&M Plan</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {buildingInspectorateData && <Table
                    columns={buildingInspectorateColumn}
                    dataSource={buildingInspectorateData}
                    pagination={false} bordered />}
            <p>Percentage of O&M Expenditure to Capital Expenditure = 40.4 %</p>

            <Content>
                Calculated as: % of IGF i=on Sanitation = (B/A) x 100
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                <ul>
                    <li>O&M Plan includes public places of interest</li>
                    <li>The percentage for O&M Budget is at least 10% (22.5%) as against the Capital Budget</li>
                    <li>The percentage for O&M Expenditure is at least 10% (40.4%) as against the Capital Expenditure</li>
                </ul>
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Source:</Title>
            <Content>
                <ol>
                    <li>Operations and maintenance plan
                    EMA/OMP/V.1</li>
                    <li>Annual Progress report – {year}</li>
                    <li>Payment vouchers for O&M Activities</li>
                    <li>Ejisu Municipal Assembly- Programme based budget estimates for {year}, File name: Composite budget (No.: EMA/CB/VOL.2)</li>
                    <li>Ejisu Municipal Assembly – December {year} Financial statement (Transmittal letter dated 13/01/2022 ref.: EMA/CAG/VOL.1/12)
                    File name: Financial Statement (No.: EMA/CAG/VOL.1)</li>
                    <li>Annual Audit report on the accounts of Sekyere East District Assembly, Effiduase/Ashanti for the financial year ended 31st Dec., {year} dated 3rd March, {year}</li>
                </ol>
            </Content>
        </>
    );
}

export default MaintenanceInfrastructure;
