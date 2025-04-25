import { Layout, Space, Table, Typography } from "antd";
import React from "react";

function RateableRevenu({ year, billing, issuance, followup }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const computerizedBillingSystemColumns = [
        { title: "Availability of Computerized Billing System (YES/NO)", dataIndex: "billing", key: "billing" },
        { title: "Name of Software/System", dataIndex: "name", key: "name" },
        { title: "Functional (YES/NO)", dataIndex: "functional", key: "functional" }
    ];

    const billingIssuanceColumns = [
        { title: "Number of Properties on Roll", dataIndex: "property", key: "property" },
        { title: "Number of Bills Issued", dataIndex: "billNumber", key: "billNumber" },
        { title: "Date Submitted to Property Owner", dataIndex: "date", key: "date" },
        { title: "Number of Businesses on Roll", dataIndex: "noOfBussness", key: "noOfBussness" },
        { title: "Number of Bills Issued", dataIndex: "billIssued", key: "billIssued" },
        { title: "Date Submitted to Business Owner", dataIndex: "submissionDate", key: "submissionDate" }
    ];

    const followUpColumns = [
        { title: "No.", dataIndex: "no", key: "no" },
        { title: "Type of defaulter", dataIndex: "defaulter", key: "defaulter" },
        { title: "Type of action", dataIndex: "actionType", key: "actionType" },
        { title: "Date of Action", dataIndex: "actionDate", key: "actionDate" },
        { title: "Date of Payment", dataIndex: "paymentDate", key: "paymentDate" }
    ];

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 3.0 - 3.2 Revenue from Rateable Properties and Businesses</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain information on rateable properties and businesses database:<br /><br />
                <ol>
                    <li type="i">
                        If there is an established computerized billing system, linked to property rate
                        roll and business inventory, score 1;
                    </li>
                    <li type="i">
                        If property rates and business operating permit bills have been generated and delivered to all property
                        and business owners before 31st December 2021, score 2;
                    </li>
                    <li type="i">
                        If there is evidence of follow-up actions by the MMDA on defaulters/non-payers of 2020 bills by 31st March 2021, score 2

                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>5</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3.2i Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3.2ii Actual Score: <strong>Score</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3.2iii Actual Score: <strong>Score</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of Computerized Billing System & Utilisation
            </Title>
            {<Table
                columns={computerizedBillingSystemColumns}
                dataSource={billing || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of Issuance of Bills
            </Title>
            {<Table
                columns={billingIssuanceColumns}
                dataSource={issuance || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of follow-up action by Assembly on defaulters/ nonpayers
            </Title>
            {<Table
                columns={followUpColumns}
                dataSource={followup || []}
                pagination={false} bordered />}

        </>
    );
}

export default RateableRevenu;
