import { Layout, Typography, Table,Col } from "antd";
import axios from "../api/axios";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getAttributeValue, getFileLinkIfExist } from "../utils/utils";
import Comment from "../components/Comments";
import instance from "../api/cmsapi";
import useAuth from "../hooks/useAuth";

const { Content } = Layout;
const { Title } = Typography;

const columnsReport = [
    { title: "Quarter", dataIndex: "quarter", key: "quarter" },
    { title: "Report Link", dataIndex: "reports", key: "reports" }
];

const InternalAuditUnitFunctionality = forwardRef(({ data, year, columns, district, hideComment }, ref) => {

    const [report, setReport] = useState([]);
    const [fulfillment, seFulfillment] = useState(data?.fulfillment);

    useEffect(() => {
        getAuditCommitteeReport();
    }, [district, year]);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "CI3",
            area: "Public Financial Management and Auditing",
            data, report, fulfillment
        }),
    }));

    const getAuditCommitteeReport = () => {
        axios.get(`/tracker/trackedEntities?orgUnit=${district}&program=Z3qMezPtpEb&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(res => {
                let currentYearData = [];

                res.data?.instances?.forEach(item => {

                    const currentData = getAttributeValue("Years", item)

                    if (currentData?.length > 0 && currentData == year) {
                        currentYearData.push(item);
                    }
                });

                if (currentYearData.length > 0) {
                    axios.get(`/tracker/events?program=Z3qMezPtpEb&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
                        .then(res => {
                            const report = res.data?.instances;

                            if (currentYearData.length > 0) {
                                const currentReportData = report.filter(r => r.trackedEntity === currentYearData[0].trackedEntity);

                                const temp = [];

                                if (currentReportData.length > 0) {
                                    currentReportData.forEach((currentReport, idx) => {
                                        currentReport.dataValues.forEach((val, index) => {
                                            // console.log("yearly: ", val);
                                            const minuteLink = getFileLinkIfExist(report, "hM6AUNKRbKB", currentYearData[0].trackedEntity);

                                            if (val.dataElement == "hM6AUNKRbKB") {
                                                temp.push({
                                                    quarter: `Quarter ${idx + 1}`,
                                                    reports: minuteLink ? (
                                                        <a
                                                            className="px-2 text-primary fw-bold text-decoration-underline"
                                                            href={`https://dddp.gov.gh/api/events/files?eventUid=${minuteLink}&dataElementUid=hM6AUNKRbKB`} target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="Click here to see the uploaded report"
                                                        >
                                                            View Report
                                                        </a>
                                                    ) : (
                                                        "Not Uploaded"
                                                    )
                                                });
                                            }
                                        })
                                    })
                                }

                                setReport(temp);

                                if (temp.length < 4) {
                                    seFulfillment("Not Fulfilled");
                                }

                                temp.forEach(rep => {
                                    if (rep.reports == "Not Uploaded") {
                                        seFulfillment("Not Fulfilled")
                                    }
                                })


                            }


                        })
                        .catch(err => console.error(err));
                }

            })
            .catch(err => console.error(err));


    }

    return (
       <Comment
        data={data} // Use CMS data if available, else DHIS2 data
        year={year}
        districtId={district}
        tableCommentedId={`c3.0-3.2-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput, renderCommentList }) => (
        <>
            <Title level={3}>CI 3.0 Public Financial Management and Auditing -
                3.2 Functionality of the Internal Audit Unit </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD, obtain information on the Internal Audit Unit of the Assembly.<br /><br />
                <ol>
                    <li type="i">
                        If the Internal Audit Unit has submitted the Annual Audit Work Plan to the DCD
                        and Audit Committee within 30 days after the beginning of the financial year; and
                    </li>
                    <li type="i">
                        If all quarterly Internal Audits have been conducted and reports submitted to the DCD and the Chair of the Audit
                        Committee of the Assembly within thirty (30) days after the end of each quarter,
                    </li>
                    <li type="i">
                        If the District Assembly has submitted the Annual Audit Workplan
                        to the Internal Audit Agency by 31st January of the financial year.
                    </li>

                    <li type="i">
                        If the District Assembly has submitted all quarterly Internal Audit Reports to the
                         Internal Audit Agency by the end of the month after the end of each Quarter.
                    </li>

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
                CI Result: <strong style={{ color: (data?.fulfillment) === "Fulfilled" ? "green" : "red" }}>
                  { data?.fulfillment || "N/A"}
                </strong>
              </Title>
              {!hideComment && renderCommentInput()}


            </Col>

             
            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Internal Audit Committee Records</Title>
            {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}


            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Quarterly Report</Title>
            <Table columns={columnsReport} dataSource={report} pagination={false} bordered />

              {renderCommentList()}

        </>
        )}
        </Comment>
    );
})

export default InternalAuditUnitFunctionality;