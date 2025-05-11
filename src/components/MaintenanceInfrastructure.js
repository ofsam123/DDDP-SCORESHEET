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
            <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.4 Maintenance of Infrastructure of Public Interest</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive information on the Operations & Maintenance Plan and its implementation:<br /><br />
                <ol>
                    <li type="i">If the plan includes public places of interest such as Markets, Community Centres, Lorry Parks, U-Drains, Schools, Hospitals or Clinics, CHPS Compounds, etc, score 1;</li>
                    <li type="i" className="py-1">If the budget allocation for O&M is at least 10% of Capital expenditure budget, score 1; and</li>
                    <li type="i">If there is evidence of expenditure for O&M Budget proportional to 10% of the Capital Expenditure and there is evidence of implementation of the O&M Plan, score 1</li>
                </ol>

                <br />
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>


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

            <Title level={5} style={{ marginTop: "30px" }}>III. Evidence of implementation of O&M Plan</Title>
            <Space><Text strong>Actual Score: </Text> <Text>{!true ? '1' : '0'}</Text></Space>
            {buildingInspectorateData && <Table
                    columns={buildingInspectorateColumn}
                    dataSource={buildingInspectorateData}
                    pagination={false} bordered />}

            <Content>
                Calculated as: % of IGF i=on Sanitation = (B/A) x 100
            </Content>

        </>
    );
}

export default MaintenanceInfrastructure;
