import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { formatDataGeneral, getAttributeValue } from "../utils/utils";

function RateableRevenu({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [software, setSoftware] = useState([]);
    const [issuance, setIssuance] = useState([]);
    const [followup, setFollowup] = useState([]);
    const [scoreI, setScoreI] = useState(0);
    const [scoreII, setScoreII] = useState(0);
    const [scoreIII, setScoreIII] = useState(0);

    useEffect(() => {
        getBillingDetails();
        getBillingData()
    }, [year, district, ]);

    const getBillingDetails = () => {

        axios
            .get(`/tracker/events?program=RwWtjFaorvN&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
                const bills = resp.data.instances;

                bills.forEach(b => {
                    b.dataValues.forEach(sub => {
                        if (sub.dataElement === "Tf7TRBG6uCZ") {
                            setSoftware([{ billing: "YES", name: sub.value, functional: "YES" }]);
                            setScoreI(1)
                        }
                    })
                })


            })
            .catch(err => console.log(err))
    }

    function getBillingData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=qSwpPQwR6Ku&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(result => {
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=qSwpPQwR6Ku&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(resp => {
                            const billings = result.data.instances;
                            const reports = resp.data.instances;

                            const propertyBillings = formatDataGeneral(billings, "DPAT | Billing Type", "Property Rate") || [];
                            const businessBillings = formatDataGeneral(billings, "DPAT | Billing Type", "Business Operating Permit") || [];

                            const propertyBill = propertyBillings.length;
                            let propertyBillIssued = 0;
                            const businessBill = businessBillings.length;
                            let businessBillIssued = 0;


                            propertyBillings.forEach(bill => {

                                const isIssued = getAttributeValue("Has it been issued?", bill);
                                const isDistributed = getAttributeValue("Bill Status", bill);

                                if (isIssued === "true" && isDistributed === "true") {
                                    propertyBillIssued++;
                                }
                            });

                            businessBillings.forEach(bill => {
                                const isIssued = getAttributeValue("Has it been issued?", bill);
                                const isDistributed = getAttributeValue("Bill Status", bill);

                                if (isIssued === "true" && isDistributed === "true") {
                                    businessBillIssued++;
                                }
                            });

                            const reportTemp = [];
                            reports.forEach((report, idx) => {
                                let actionType = "";
                                let actionDate = "";
                                let paymentDate = "";
                                const no = idx + 1;
                                report.dataValues.forEach(val => {
                                    if (val.dataElement === "bGzwdd1VsfI") {
                                        actionType = val.value;
                                    } else if (val.dataElement === "MmojpWRb4vB") {
                                        actionDate = val.value;
                                    } else if (val.dataElement === "lQ1VluGCriP") {
                                        paymentDate = val.value;
                                    }
                                });

                                if (report.dataValues.length > 0) {
                                    reportTemp.push({ actionType, actionDate, paymentDate, no });
                                }



                            });

                            const temp = [
                                {
                                    propertyBill,
                                    propertyBillIssued,
                                    businessBill,
                                    businessBillIssued,
                                    propertyBillDateSubmission: propertyBillings.length > 0 ? getAttributeValue("Date", propertyBillings[0]) : "",
                                    businessBillDateSubmission: businessBillings.length > 0 ? getAttributeValue("Date", businessBillings[0]) : ""
                                }
                            ];




                            if ((propertyBill === propertyBillIssued) && (businessBill === businessBillIssued) && (propertyBill !== 0) && (businessBill !== 0)) {
                                setScoreII(2);
                            }

                            if (reportTemp.length > 0) {
                                setScoreIII(2);
                            }

                            setIssuance(temp);
                            setFollowup(reportTemp);

                        })
                        .catch(err => console.log(err))
                }


            })
            .catch(err => console.log(err))
    }

    const computerizedBillingSystemColumns = [
        {
            title: "Availability of Computerized Billing System (YES/NO)",
            dataIndex: "billing",
            key: "billing"
        },
        {
            title: "Name of Software/System",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Functional (YES/NO)",
            dataIndex: "functional",
            key: "functional"
        }
    ];

    const billingIssuanceColumns = [
        {
            title: "Number of Properties on Roll",
            dataIndex: "propertyBill",
            key: "propertyBill"
        },
        {
            title: "Number of Bills Issued",
            dataIndex: "propertyBillIssued",
            key: "propertyBillIssued"
        },
        {
            title: "Date Submitted to Property Owner",
            dataIndex: "propertyBillDateSubmission",
            key: "propertyBillDateSubmission"
        },
        {
            title: "Number of Businesses on Roll",
            dataIndex: "businessBill",
            key: "businessBill"
        },
        {
            title: "Number of Bills Issued",
            dataIndex: "businessBillIssued",
            key: "businessBillIssued"
        },
        {
            title: "Date Submitted to Business Owner",
            dataIndex: "businessBillDateSubmission",
            key: "businessBillDateSubmission"
        }
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
                PI 3.0-3.2i Actual Score: <strong>{scoreI}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3.2ii Actual Score: <strong>{scoreII}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 3.0-3.2iii Actual Score: <strong>{scoreIII}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                I- Evidence of Computerized Billing System & Utilisation
            </Title>
            {<Table
                columns={computerizedBillingSystemColumns}
                dataSource={software}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                II- Evidence of Issuance of Bills
            </Title>
            {<Table
                columns={billingIssuanceColumns}
                dataSource={issuance}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                III- Evidence of follow-up action by Assembly on defaulters/ nonpayers
            </Title>
            {<Table
                columns={followUpColumns}
                dataSource={followup}
                pagination={false} bordered />}

        </>
    );
}

export default RateableRevenu;
