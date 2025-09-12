import React, { useState, useEffect } from 'react';
import instance from '../api/cmsapi';
import { Col, Row, Layout, Typography } from 'antd';
import moment from 'moment';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const CommentAndGabsSummary = ({ district, year, region }) => {
    const [data, setData] = useState({
        comments: [],
        gaps: []
    });

    useEffect(() => {
        getData();
    }, [district, year]);

    const getData = () => {
        instance.get(`comments/tables/${district?.value}/${year}/DPAT`)
            .then(response => {

                const tables = response.data.filter(item => item.tableCommented !== 'assessment_start_DAPT');


                const comments = [];
                const gaps = [];

                tables?.filter(item => item.comments !== "").forEach((comment, idx) => {

                    const setComment = {
                        no: idx + 1,
                        indicator: comment.tableCommented.replace(/-\d{4}$/, "").toUpperCase(),
                        comment: comment.comments,

                    };

                    comments.push(setComment);
                });

                tables?.filter(item => item.gaps !== "").forEach((comment, idx) => {

                    const setGaps = {
                        no: idx + 1,
                        indicator: comment.tableCommented.replace(/-\d{4}$/, "").toUpperCase(),
                        gaps: comment.gaps
                    };
                    gaps.push(setGaps);
                });


                console.log("gaps: ", gaps)

                setData({
                    comments: sortByIndicator(comments),
                    gaps: sortByIndicator(gaps)
                });


            })
            .catch(error => {
                console.log("Error during fetching: ", error);
            })
    }



    function sortByIndicator(arr) {
        return arr.sort((a, b) => {
            // extract prefix (letters) and number (first number before dash)
            let regex = /^([A-Z]+)(\d+(\.\d+)?)/;

            let matchA = a.indicator.match(regex);
            let matchB = b.indicator.match(regex);

            if (!matchA || !matchB) return 0;

            let [, prefixA, numA] = matchA;
            let [, prefixB, numB] = matchB;

            // first sort by prefix alphabetically
            if (prefixA !== prefixB) {
                return prefixA.localeCompare(prefixB);
            }

            // then sort by number (as float)
            return parseFloat(numA) - parseFloat(numB);
        });
    }

    return (
        <div>

            <Row className="py-2">
                <Col span={8} className="gutter-row">
                    <Text strong>Name of MMDA: </Text> <Text className="ms-3">{district?.label}</Text>
                </Col>
                <Col span={6} className="gutter-row">
                    <Text strong>Region: </Text> <Text>{region}</Text>
                </Col>
                <Col span={8} className="gutter-row">
                    <Text strong>Date of Assessment: </Text> <Text>{moment().format('MMMM Do YYYY, h:mm:ss A')}</Text>
                </Col>


            </Row>


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
                            <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Indicator</th>
                            <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Outcomes</th>

                        </tr>

                    </thead>
                    <tbody>
                        <tr style={{ border: '1px solid #000', backgroundColor: '#ccccc9f2' }}>
                            <td style={{ border: 'none' }}></td>


                            <td style={{ border: 'none', fontWeight: 'bold' }}>
                                SECTION A: COMMENTS ON INDICATORS
                            </td>

                            <td style={{ border: 'none' }}></td>
                        </tr>
                        {data.comments.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000' }}><strong>{item.no}</strong></td>
                                <td style={{ border: '1px solid #000' }}><strong>{item.indicator}</strong></td>
                                <td style={{ border: '1px solid #000' }}>{item.comment}</td>


                            </tr>
                        ))}

                    </tbody>
                    <tbody>
                        <tr style={{ border: '1px solid #000', backgroundColor: '#ccccc9f2' }}>
                            <td style={{ border: 'none' }}></td>
                            <td style={{ borderLeft: 'none', fontWeight: 'bold' }}>
                                SECTION B: CAPACITY GAPS ON INDICATORS (SDIs)
                            </td>
                            <td style={{ border: 'none' }}></td>


                        </tr>
                        {data.gaps.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000' }}><strong>{item.no}</strong></td>
                                <td style={{ border: '1px solid #000' }}><strong>{item.indicator}</strong></td>
                                <td style={{ border: '1px solid #000' }}>{item.gaps}</td>
                            </tr>
                        ))}


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default CommentAndGabsSummary;