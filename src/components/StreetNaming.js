import { Layout, Space, Table, Typography } from "antd";
import React from "react";


function StreetNaming({
    year, streets, district, columns, counterColumns

}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>SDI 3.0 - 3.3 Street Naming Database and Property Addressing</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD obtain detailed information on street naming and property addressing database.
                <ol>
                    <li type="i">If the database has been mapped out, printed and displayed at
                        the Assembly premises and sub-structures, score 1.</li>
                    <li type="i" className="py-1">If the database has been mapped out, printed and displayed
                        at the Assembly premises and sub-structures, score 1</li>
                    <li type="i">If the Assembly has installed at least 60% of its named streets and property
                        address plates, score 1; if less than 60%, score 0</li>
                </ol>

                <br />
            </Content>

            <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 3.0-3.3i Actual Score:{" "}
                <strong>
                    {streets?.data?.length > 0 && streets.data[0].street === "YES" ? 1 : 0}
                </strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 3.0-3.3ii Actual Score:{" "}
                <strong>
                    {streets?.data?.length > 0 &&
                        streets.data[0].displayed === "YES" &&
                        streets.data[0].map === "YES"
                        ? 1
                        : 0}
                </strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                SDI 3.0-3.3iii Actual Score:{" "}
                <strong>{streets?.percentage >= 60 ? 1 : 0}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>Evidence of Street Naming Database</Title>
            <Table
                columns={columns}
                dataSource={streets?.data}
                pagination={false} bordered />

            <Title level={5} style={{ marginTop: "30px" }}>Evidence of Installation of named streets</Title>
            <Table
                columns={counterColumns}
                dataSource={streets?.counter}
                pagination={false} bordered />


        </>
    );
}

export default StreetNaming;
