import { Layout, Table, Typography } from "antd";
import React from "react";

function GeneralAssemblyManagementActions({
    year, decisions,
    managementActionServiceDeliveryData
}) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const managementServiceDeliveryActionColumns = [
        { title: "No. of decisions on service delivery improvement", dataIndex: "no", key: "no" },
        { title: "No. of actions taken on social service improvement decisions", dataIndex: "service", key: "service" },
        { title: "% of service delivery improvement decisions implemented ", dataIndex: "percentage", key: "percentage" }
    ];

    const decisionColumns = [
        { title: "Service delivery improvement issues", dataIndex: "gam", key: "gam" },
        { title: "Actions taken", dataIndex: "decision", key: "decision" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "30px" }}>1.2 Management Actions taken on Assembly decisions</Title>
            <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                <div className="mb-3">From the DCD, receive signed minutes of meetings of the Management of the Assembly:</div>
                <ol>
                    <li type="i">If Management has implemented at least 50% of the
                        service delivery improvement decisions (1.1i) of The General Assembly,
                        evidenced by reports and relevant supporting documents, score 2.
                    </li>
                </ol>
                <div style={{ fontStyle: 'italic' }}>
                    Local Governance Act, 2016 (Act 936) Section 18
                </div>
            </Content>
            <Title level={4} style={{ marginTop: "30px" }}>Maximum Score</Title>
            <Content>2</Content>

            <Title level={5} style={{ marginTop: "30px" }}>I. Evidence of management actions on service delivery decisions</Title>
            {managementActionServiceDeliveryData && <Table
                columns={managementServiceDeliveryActionColumns}
                dataSource={managementActionServiceDeliveryData}
                pagination={false} bordered />}
            <Title level={5} style={{ marginTop: "30px" }}>II. Examples of actions taken decisions</Title>
            {decisions && <Table columns={decisionColumns} dataSource={decisions} pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
            <Content>
                100% of the total no. of decisions on improving service delivery were implemented in {year}.
            </Content>
            <Title level={5} style={{ marginTop: "30px" }}>Source:</Title>
            <Content>
                <ol>
                    <li>EMA/MAM/VOL.5 (GENERAL ASSEMBLY MEETING)</li>
                    <li>Minutes of GAM (see folio 06: folio 07: folio 10)</li>
                </ol>
            </Content>
        </>
    );
}

export default GeneralAssemblyManagementActions;
