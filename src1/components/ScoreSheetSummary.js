import React, { useState, useEffect } from 'react';
import instance from '../api/cmsapi';

const ScoreSheetSummary = ({ districtId, year }) => {
    const [data, setData] = useState({
        complianceIndicators: [],
        serviceDeliveryIndicators: [],
        performanceIndicators: []
    });


    const getData = () => {
        instance.get(`comments/tables/${districtId}/${year}/DPAT`)
            .then(response => {

                const jsonData = response.data;
                if (!jsonData || !jsonData[0] || !jsonData[0].dddpData || !jsonData[0].dddpData.tables) {
                    return;
                }

                const tables = jsonData[0].dddpData.tables;

                const groups = {};
                for (let key in tables) {
                    const table = tables[key];
                    const ind = table.indicator.replace('.', ''); // Normalize to CI1, SDI1, etc.
                    if (!groups[ind]) {
                        groups[ind] = [];
                    }
                    groups[ind].push(table);
                }

                const getActualScore = (table) => {
                    if (!table) return 0;

                    // Prefer using the nested data if available, otherwise fallback to the table itself
                    const d = table.data || table;

                    // Top-level score takes priority
                    if (typeof d.score === "number") {
                        return d.score;
                    }

                    // Otherwise, accumulate level-based scores
                    let sum = 0;
                    if (typeof d.scorei === "number") sum += d.scorei;
                    if (typeof d.scoreii === "number") sum += d.scoreii;
                    if (typeof d.scoreiii === "number") sum += d.scoreiii;

                    return sum;
                };




                const getMaxScore = (table) => {
                    if (!table) return 0;

                    // If maxScore exists at the top level
                    if (typeof table.maxScore === "number") {
                        return table.maxScore;
                    }

                    let sum = 0;
                    // Loop through all keys to find nested maxScores
                    for (let key in table) {
                        const value = table[key];
                        if (Array.isArray(value)) {
                            sum += value.reduce((s, item) => s + getMaxScore(item), 0);
                        } else if (typeof value === "object" && value !== null) {
                            sum += getMaxScore(value);
                        }
                    }
                    return sum;
                };


                const getPerformanceActualScore = (table) => {
                    const d = table;
                    if ('score' in d) return d.score || 0;
                    if ('audits' in d) return d?.audits?.score || 0
                    let sum = 0;
                    if ('scorei' in d) sum += d.scorei || 0;
                    if ('scoreii' in d) sum += d.scoreii || 0;
                    if ('scoreiii' in d) sum += d.scoreiii || 0;
                    return sum;
                };

                const ciThematic = {
                    CI1: 'General Assembly Meetings and Approvals',
                    CI2: 'Other Statutory Meetings / Requirements',
                    CI3: 'Public Financial Management and Auditing',
                    CI4: 'Transparency, Accountability & Participation',
                };

                const sdiThematic = {
                    SDI1: 'Management Coordination - Implementation of Service Delivery Decisions',
                    SDI2: 'Basic/ Social Services',
                    SDI3: 'Physical and Spatial Planning Services',
                    SDI4: 'Social Protection, Gender and Nutrition',
                    SDI5: 'Environmental Health, Sanitation and Climate Action',
                    SDI6: 'Local Economic Development (LED)',
                };

                const piThematic = {
                    PI1: 'Annual Action Plan Implementation',
                    PI2: 'Capacity Building',
                    PI3: 'Revenue Generation',
                    PI4: 'Audit Performance',
                    PI5: 'Access to Social Services',
                };

                // Compliance Indicators
                const ciKeys = Object.keys(groups).filter(k => k.startsWith('CI')).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
                const complianceIndicators = ciKeys.map(k => ({
                    no: k.replace('CI', 'CI.'),
                    thematicArea: ciThematic[k] || '',
                    isFulfilled: groups[k].every(t => {

                        const fulfillment =
                            t?.clientService?.fulfillment
                            || t?.meetings?.fulfillment
                            || t?.publication?.fulfillment
                            || t?.fulfillment
                            || (t.data && t.data.fulfillment);

                        return fulfillment === 'Fulfilled';
                    })
                }));

                // Service Delivery Indicators
                const sdiKeys = Object.keys(groups).filter(k => k.startsWith('SDI')).sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3)));

                // console.log("SDI Keis: ", groups)

                const serviceDeliveryIndicators = sdiKeys.map(k => ({
                    no: k.replace('SDI', 'SDI '),
                    thematicArea: sdiThematic[k] || '',
                    maxScore: groups[k]?.reduce((sum, t) => sum + getMaxScore(t), 0),
                    actualScore: groups[k]?.reduce((sum, t) => sum + getActualScore(t), 0)
                }));

                // Add sub-total for SDIs
                const sdiSubTotal = {
                    no: 'Sub-total (SDIs)',
                    thematicArea: '',
                    maxScore: serviceDeliveryIndicators?.reduce((sum, item) => sum + item.maxScore, 0),
                    actualScore: serviceDeliveryIndicators?.reduce((sum, item) => sum + item.actualScore, 0)
                };
                serviceDeliveryIndicators.push(sdiSubTotal);

                // Performance Indicators

                const piKeys = Object.keys(groups).filter(k => k.startsWith('PI')).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
                const performanceIndicators = piKeys.map(k => {
                    const maxScore = groups[k].reduce((sum, t) => {
                        return sum + (Number(t.maxScore) || 0);
                    }, 0);

                    return {
                        no: k.replace('PI', 'PI '),
                        thematicArea: piThematic[k] || '',
                        maxScore,
                        actualScore: groups[k].reduce((sum, t) => sum + getPerformanceActualScore(t), 0)
                    };
                });

                const piSubTotal = {
                    no: 'Sub-total (PIs)',
                    thematicArea: '',
                    maxScore: performanceIndicators.reduce((sum, item) => sum + item.maxScore, 0),
                    actualScore: performanceIndicators.reduce((sum, item) => sum + item.actualScore, 0)
                };
                performanceIndicators.push(piSubTotal);

                // Add total for SDI + PIs
                const total = {
                    no: 'TOTAL (SDI + PIs)',
                    thematicArea: '',
                    maxScore: sdiSubTotal.maxScore + piSubTotal.maxScore,
                    actualScore: sdiSubTotal.actualScore + piSubTotal.actualScore
                    // maxScore: 0 + piSubTotal.maxScore,
                    // actualScore: 0 + piSubTotal.actualScore
                };
                performanceIndicators.push(total);

                setData({
                    complianceIndicators,
                    serviceDeliveryIndicators,
                    performanceIndicators
                });

            })
            .catch(error => {
                console.log("Error during fetching: ", error);
            })
    }

    useEffect(() => {
        getData();
    }, [districtId, year]);

    return (
        <div>

            <div className="table-responsive">
                <table className="table table-bordered" style={{
                    border: '1px solid #000',
                    borderCollapse: 'collapse',
                    width: '100%',
                    marginTop: "20px"
                }}>
                    <thead>
                        <tr style={{ fontWeight: 'bold', border: '1px solid #000' }}>
                            <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No.</th>
                            <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Thematic Area</th>
                            <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Outcomes</th>

                        </tr>

                    </thead>
                    <tbody>
                        <tr style={{ border: '1px solid #000', backgroundColor: '#ccccc9f2' }}>
                            <td style={{ border: 'none' }}></td>


                            <td style={{ border: 'none', fontWeight: 'bold' }}>
                                SECTION A: COMPLIANCE INDICATORS (CI)
                            </td>

                            <td style={{ border: 'none' }}></td>
                        </tr>
                        {data.complianceIndicators.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000' }}><strong>{item.no}</strong></td>
                                <td style={{ border: '1px solid #000' }}>{item.thematicArea}</td>
                                <td style={{ border: '1px solid #000' }}>
                                    {item.isFulfilled ? <span style={{ color: 'green', fontWeight: 'bold' }}> Fulfilled</span>
                                        : <span style={{ color: 'red', fontWeight: 'bold' }}> Not Fulfilled</span>}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                    <tbody>
                        <tr style={{ border: '1px solid #000', backgroundColor: '#ccccc9f2' }}>
                            <td style={{ borderRight: 'none' }}></td>
                            <td style={{ borderLeft: 'none', fontWeight: 'bold' }}>
                                SECTION B: SERVICE DELIVERY INDICATORS (SDIs)
                            </td>

                            <td style={{ fontWeight: 'bold' }}>Max Score</td>
                            <td style={{ fontWeight: 'bold' }}>Actual Score</td>
                        </tr>
                        {data.serviceDeliveryIndicators.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000' }}><strong>{item.no}</strong></td>
                                <td style={{ border: '1px solid #000' }}>{item.thematicArea}</td>
                                <td style={{ border: '1px solid #000' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.maxScore} </span>
                                </td>
                                <td style={{ border: '1px solid #000' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.actualScore} </span>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                    <tbody>
                        <tr style={{ border: '1px solid #000', backgroundColor: '#ccccc9f2' }}>
                            <td style={{ borderRight: 'none' }}></td>
                            <td style={{ borderLeft: 'none', fontWeight: 'bold' }}>
                                SECTION C: PERFORMANCE INDICATORS (PIs)
                            </td>

                            <td style={{ fontWeight: 'bold' }}>Max Score</td>
                            <td style={{ fontWeight: 'bold' }}>Actual Score</td>
                        </tr>
                        {data.performanceIndicators.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000' }}><strong>{item.no}</strong></td>
                                <td style={{ border: '1px solid #000' }}>{item.thematicArea}</td>
                                <td style={{ border: '1px solid #000' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.maxScore} </span>
                                </td>
                                <td style={{ border: '1px solid #000' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.actualScore} </span>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ScoreSheetSummary;