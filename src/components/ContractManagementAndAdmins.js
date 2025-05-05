import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage } from "../utils/utils";

const indicators = [
    {
        indicator: 'No. of Projects awarded on contract',
        id: 'qZSULWbMR2R',
        value: 0
    },
    {
        indicator: 'No. of Projects completed',
        id: 'Hf5p1kc2JeR',
        value: 0
    },
    {
        indicator: 'No. of Projects completed and in use',
        id: 'yQEv4PwpL3t',
        value: 0
    },
    {
        indicator: 'No. of completed projects with Completion Reports',
        id: 's6gfdfWo5Nq',
        value: 0
    }
];

const contingencyIndicators = [
    {
        indicator: 'No. of projects with contingency provision',
        id: 'emhjn8smNMD',
        value: 0
    },
    {
        indicator: 'No. of projects with contingency used',
        id: 'hsnSY36kN8H',
        value: 0
    },
    {
        indicator: 'No. of projects with contingency used with written justification',
        id: 'faTS25Cv9RI',
        value: 0
    },
    {
        indicator: 'No. of projects with contingency duly approved and used',
        id: 'E24X37zoXD8',
        value: 0
    }
];

function ContractManagementAndAdmins({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;
    const [projects, setProjects] = useState([]);
    const [contingency, setContingengy] = useState([]);
    const [scoreI, setScoreI] = useState(0);
    const [scoreII, setScoreII] = useState(0);

    useEffect(() => {
        getIndicatorsData();
        getContingencyIndicatorsData();
    }, [year, district]);

    const contractManagementAndAdminsColumns = [
        { title: "No. of Projects awarded on contract (a)", dataIndex: "awardedProjects", key: "awardedProjects" },
        { title: "No. of Projects completed (b)", dataIndex: "completedProject", key: "completedProject" },
        { title: "No. of completed projects with Completion Reports (c)", dataIndex: "completedProjectReport", key: "completedProjectReport" },
        { title: "No. of Projects completed and in use (d)", dataIndex: "completedProjectInUse", key: "completedProjectInUse" },
        { title: "% completed projects in use", dataIndex: "percentageInUse", key: "percentageInUse" },
        { title: "% completed projects with reports", dataIndex: "percenageCompletedProjectReport", key: "percenageCompletedProjectReport" }
    ];

    const contingencyColumns = [
        { title: "No. of projects with contingency provision ", dataIndex: "contingencyProvision", key: "contingencyProvision" },
        { title: "No. of projects with contingency used", dataIndex: "contingencyUse", key: "contingencyUse" },
        { title: "No. of projects with contingency used with written justification", dataIndex: "contingencyJustification", key: "contingencyJustification" },
        { title: "d. No. of projects with contingency duly approved and used", dataIndex: "contingencyApproved", key: "contingencyApproved" }
    ];

    const getIndicatorsData = () => {
        axios.get(
            `/analytics.json?dimension=dx:qZSULWbMR2R;Hf5p1kc2JeR;yQEv4PwpL3t;s6gfdfWo5Nq&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {
                const data = res.data?.rows;

                if (data?.length > 0) {
                    
                    const updatedIndicators = indicators.map(ind => {
                        const match = data.find(r => r[0] === ind.id);
                        return {
                            ...ind,
                            value: match ? parseFloat(match[2]) : 0
                        };
                    });
                    
                    // Map from indicator name to table field
                    const indicatorToFieldMap = {
                        'No. of Projects awarded on contract': 'awardedProjects',
                        'No. of Projects completed': 'completedProject',
                        'No. of completed projects with Completion Reports': 'completedProjectReport',
                        'No. of Projects completed and in use': 'completedProjectInUse'
                    };

                    // Build the row object
                    const row = {};

                    updatedIndicators.forEach(ind => {
                        const key = indicatorToFieldMap[ind.indicator];
                        if (key) {
                            row[key] = ind.value;
                        }
                    });


                    // Calculate derived fields
                    const completed = row.completedProject || 0;
                    const inUse = row.completedProjectInUse || 0;
                    const withReports = row.completedProjectReport || 0;

                    row.percentageInUse = completed > 0 ? calculatePercentage(inUse, completed) : 0;
                    row.percenageCompletedProjectReport = completed > 0 ? calculatePercentage(withReports, completed) : 0;

                    setProjects([row]);                    
                    if(row.percentageInUse == 100 && row.percenageCompletedProjectReport == 100){
                        setScoreI(3)
                    }

                }


            }).catch(err => console.log(err));
    }

    const getContingencyIndicatorsData = () => {
        axios.get(
            `/analytics.json?dimension=dx:emhjn8smNMD;hsnSY36kN8H;faTS25Cv9RI;E24X37zoXD8&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
            .then(res => {
                const data = res.data?.rows;

                if (data?.length > 0) {
                    // const percentage = calculatePercentage(data[1][2], data[0][2]);
                    // Update indicator values based on result
                    const updatedContingencyIndicators = contingencyIndicators.map(ind => {
                        const match = data.find(r => r[0] === ind.id);
                        return {
                            ...ind,
                            value: match ? parseFloat(match[2]) : 0
                        };
                    });

                    console.log(updatedContingencyIndicators);

                    // Map from indicator name to table field
                    const indicatorToFieldMap = {
                        'No. of projects with contingency provision': 'contingencyProvision',
                        'No. of projects with contingency used': 'contingencyUse',
                        'No. of projects with contingency used with written justification': 'contingencyJustification',
                        'No. of projects with contingency duly approved and used': 'contingencyApproved'
                    };

                    // Build the row object
                    const row = {};

                    updatedContingencyIndicators.forEach(ind => {
                        const key = indicatorToFieldMap[ind.indicator];
                        if (key) {
                            row[key] = ind.value;
                        }
                    });

                    setContingengy([row])

                    
                    if(row.contingencyProvision > 0 && row.contingencyUse > 0){
                        setScoreII(1)
                    }

                }


            }).catch(err => console.log(err));
    }

    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 1.0 - 1.3 Records on Contract Management and Administration</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain information on contract management and administration:<br /><br />
                <ol>
                    <li type="i">
                        If final completion reports on all completed projects are available
                        and all completed projects are in use, score 3; else score 0.
                    </li>
                    <li type="i">
                        If contingency has been provided for works and used with written justification and duly
                        approved, score 1; or if contingency has not been used, score 1; else score 0.
                    </li>
                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>4</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.3i Actual Score: <strong>{scoreI}</strong>
            </Title>
            <Title level={5} style={{ marginTop: "20px" }}>
                PI 1.0-1.3ii Actual Score: <strong>{scoreII}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of project completion and use
            </Title>
            {<Table
                columns={contractManagementAndAdminsColumns}
                dataSource={projects || []}
                pagination={false} bordered />}

            <Title level={5} style={{ marginTop: "20px" }}>
                Evidence of use of contingency
            </Title>
            {<Table
                columns={contingencyColumns}
                dataSource={contingency || []}
                pagination={false} bordered />}

        </>
    );
}

export default ContractManagementAndAdmins;
