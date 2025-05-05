import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Color } from "antd/es/color-picker";

const dataElementsCashIrregularities = [
    { id: 'lJr4s9aSYqF', name: 'DACF - Under Cash Irregularities' },
    { id: 'qgi5fG0sEws', name: 'DACF-RFG (DDF) - Under Cash Irregularities' },
    { id: 'I4awAW0XgZq', name: 'IGF - Under Cash Irregularities' },
];

const dataElementsContractMgntIrregularities = [
    { id: 'oqCOLV3vGl8', name: 'DACF - Under Contract Mgt' },
    { id: 'xDlsllqvOHf', name: 'DACF-RFG(DDF) - Under Contract Mgt' },
    { id: 'jZZ128qubhV', name: 'IGF - Under Contract Mgt' },
];

const dataElementsProcurementIrregularities = [
    { id: 'XRd8Sug4xJd', name: 'DACF - Under Procurement & Stores' },
    { id: 'oskeWAVWAeq', name: 'DACF-RFG (DDF) - Under Procurement & Stores' },
    { id: 'eElDNWrVib7', name: 'IGF - Under Procurement & Stores' },
];

const dataElementsAuditReport = [
    { id: 'zfKS4ps2CkO', name: 'Auditor - Total Expenditure' },
    { id: 'LRTumwNAO2X', name: 'Auditor - Percentage of other irregularities' },
    { id: 'eElDNWrVib7', name: 'IGF - Under Procurement & Stores' },
];

function AuditInfractions({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [irregularities, setIrregularities] = useState([]);
    const [scoreI, setScoreI] = useState(0);
    const [scoreII, setScoreII] = useState(0);

    useEffect(() => {
        getAuditCommitteeReport();
    }, [year, district])

    const irregularityColumns = [
        {
            title: 'Description',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
            align: 'right',
            render: (val) =>
                typeof val === 'number' ? val.toLocaleString(undefined, { minimumFractionDigits: 2 }) : val,
        },
    ];

    const getAuditCommitteeReport = () => {
        axios.get(
            `/tracker/events?program=Z3qMezPtpEb&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(res => {
                const data = res.data?.instances[0]?.dataValues;

                // Helper to map element list to values
                const mapIrregularities = (elements) => {
                    return elements.map(item => {
                        const match = data.find(d => d.dataElement === item.id);
                        return {
                            ...item,
                            value: match ? parseFloat(match.value || 0) : 0
                        };
                    });
                };

                const auditReport = dataElementsAuditReport.map(item => {
                    const match = data.find(d => d.dataElement === item.id);
                    return {
                        ...item,
                        value: match ? match.value : null
                    };
                });

                const cashIrregularities = mapIrregularities(dataElementsCashIrregularities);
                const contractMgntIrregularities = mapIrregularities(dataElementsContractMgntIrregularities);
                const procurementIrregularities = mapIrregularities(dataElementsProcurementIrregularities);

                const totalCash = cashIrregularities.reduce((sum, item) => sum + item.value, 0);
                const totalContract = contractMgntIrregularities.reduce((sum, item) => sum + item.value, 0);
                const totalProcurement = procurementIrregularities.reduce((sum, item) => sum + item.value, 0);
                const totalOther = totalContract + totalProcurement;
                const totalExpenditure = auditReport[0]?.value;

                const cashIrreguarityPercentage = ((totalCash / totalExpenditure) * 100).toFixed(2);
                const otherIrreguaritiesPercentage = ((totalOther / totalExpenditure) * 100).toFixed(2);
                const onePercentTotalExpendature = (0.01 * totalExpenditure).toFixed(2);
                const threePercentTotalExpendature = (0.03 * totalExpenditure).toFixed(2);


                if (cashIrreguarityPercentage < onePercentTotalExpendature) {
                    setScoreI(2);
                }

                if (otherIrreguaritiesPercentage < threePercentTotalExpendature) {
                    setScoreII(2);
                }

                const dataSource = [
                    { key: 'header1', name: <strong>Cash Irregularities</strong>, value: '', isHeader: true },
                    ...cashIrregularities.map((item, index) => ({
                        key: `cash-${index}`,
                        name: item.name,
                        value: item.value
                    })),
                    {
                        key: 'total-cash',
                        name: <strong>Total Cash Irregularities (A)</strong>,
                        value: totalCash,
                    },
                    { key: 'header2', name: <strong>Other irregularities</strong>, value: '', isHeader: true },
                    { key: 'contract-header', name: 'Contract Mgt Irregularities', value: '' },
                    ...contractMgntIrregularities.map((item, index) => ({
                        key: `contract-${index}`,
                        name: item.name,
                        value: item.value
                    })),
                    {
                        key: 'contract-total',
                        name: <strong>Total Contract Management irregularities (x)</strong>,
                        value: totalContract,
                    },
                    { key: 'procurement-header', name: 'Procurement & Stores Irregularities', value: '' },
                    ...procurementIrregularities.map((item, index) => ({
                        key: `proc-${index}`,
                        name: item.name,
                        value: item.value
                    })),
                    {
                        key: 'proc-total',
                        name: <strong>Total Procurement & Stores irregularities (y)</strong>,
                        value: totalProcurement,
                    },
                    {
                        key: 'other-total',
                        name: <strong>Total Other Irregularities (B = x + y)</strong>,
                        value: totalOther,
                    },
                    {
                        key: 'total-expenditure',
                        name: <strong>TOTAL EXPENDITURE (C)</strong>,
                        value: totalExpenditure,
                    },
                ];


                setIrregularities({ dataSource, cashIrreguarityPercentage, otherIrreguaritiesPercentage, onePercentTotalExpendature, threePercentTotalExpendature });



            }).catch(err => console.log(err));
    }


    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 4.0 - 4.2 Audit Infractions</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive a copy of the Auditor General’s Annual Audit Report for 2021
                on financial irregularities reported on embezzlement and/or misappropriation;:<br /><br />
                <ol>
                    <li type="i">
                        If the sum total of Cash irregularities is less than 1% of the total
                        expenditure of the Assembly for <strong>{year}</strong>, score 1;
                    </li>
                    <li type="i">
                        If the sum total of all other financial irregularities is less than 3% of
                        the consolidated expenditure of the Assembly for <strong>{year}</strong>, score 2, else score 0;
                    </li>

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>4</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 4.0-4.2i Actual Score: <strong>{scoreI}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 4.0-4.2ii Actual Score:  <strong>{scoreII}</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of financial irregularities
            </Title>
            {<Table
                columns={irregularityColumns}
                dataSource={irregularities?.dataSource || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "30px" }}>Observations:</Title>
            <Content>
                <ol>
                    <li>Percentage of cash irregularity is <strong>{irregularities?.cashIrreguarityPercentage} %</strong></li>
                    <li>Percentage of other irregularities is <strong>{irregularities?.otherIrreguaritiesPercentage} %</strong></li>
                    <li>One Percentage (1%) of total expendature is <strong>{irregularities?.onePercentTotalExpendature} %</strong></li>
                    <li>Three Percentage (3%) of total expendature is <strong>{irregularities?.threePercentTotalExpendature} %</strong></li>


                </ol>
            </Content>

        </>
    );
}

export default AuditInfractions;
