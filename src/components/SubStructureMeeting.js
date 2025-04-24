import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function SubStructureMeeting({ data, columns, establishment, establishmentColumns, revenueSharing, revenuSharingColumns}) {

    // useEffect(() => {
    //     console.log("budget: ", data);
    //     console.log("establishment : ", establishment);
    // }, [])

    return (
        <>
            <Title level={3}>CI 1.0 General Assembly Meetings - 1.3 Meetings of the Substructures </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the District Coordinating Director, receive information on the activities orOperations of
                the established substructures (SubMetros/ Urban/ Town/ Area/ Zonal Councils) of the Assembly:<br /><br />
                <ol>
                    <li type="i">
                        If each of the substructures established by the Assembly held at least one (1) Meeting
                        prior to each of the three mandatory Ordinary Meetings of the General Assembly; and
                    </li>
                    <li type="i" className="py-1">
                        If records exist on their establishment, staffing and ceding of 50% of revenue collected, for
                        all the established   substructures.
                    </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of meetings of sub-structures prior to General Annual Meeting</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={true} bordered />}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title>
            {establishment && <Table columns={establishmentColumns} dataSource={establishment} pagination={true} bordered />}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of revenue sharing</Title>
            {revenueSharing && <Table columns={revenuSharingColumns} dataSource={revenueSharing} pagination={true} bordered />}

        </>
    );
}

export default SubStructureMeeting;