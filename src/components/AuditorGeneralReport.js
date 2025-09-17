import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";
import axios from "../api/axios";
import { getAttributeValue } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function AuditorGeneralReport({ year, district }) {

    const [publication, setPublication] = useState(null);

    const publicationColumn = [
        { title: "Date of Publication on website", dataIndex: "date", key: "date" },
        { title: "Address of website", dataIndex: "address", key: "address" }
    ];

    const clienServiceReportColumn = [
        { title: "Title of Report on activities", dataIndex: "report", key: "report" },
        { title: "Date of Report", dataIndex: "date", key: "date" },
        { title: "Key Issues in the Reports", dataIndex: "issues", key: "issues" }

    ];

    useEffect(() => {
        getData();
    },[year, district]);

    const setDataDisplay = (data, reports) => {
        
        const temp = [];
        const reporttemp = [];

        let fulfillment = "Not Fulfilled";

        if (data?.length > 0) {

            data.forEach((val, idx)=>{
                temp.push({
                    key: idx,
                    date: getAttributeValue("Published Date", val),
                    address: getAttributeValue("Website", val)
                });
            })
           
        }

        if(reports.length > 0 && temp.length > 0){
            fulfillment = "Fulfilled";
        }

        // if(clientServiceTemp.length > 0 && clientServiceReport.length > 0){
        //     fulfillment = "Fulfilled"
        // }

        setPublication({ data: temp, fulfillment, report: [] })

    }

    function getData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=X5kGqVpbGoN`)
            .then(result => {
                // console.log("Client Service tracker", result.data.instances)
                // setClientServiceDataDisplay(result.data.instances);
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=X5kGqVpbGoN&orgUnit=${district}`)
                        .then(resp => {
                            // console.log("Client Service report", resp.data.instances)
                            // setMeetingDecision({ decisions: result.data.instances, reports: resp.data.instances })
                            setDataDisplay(result.data.instances, resp.data.instances);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("decisions error ", err))
    }

    return (
        <>
            <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.3 Presentation of Auditor General’s Report to the General Assembly </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD, receive Minutes of Meeting of the General Assembly.:<br /><br />
                <ol>
                    <li type="i">
                    If the 2020 Auditor General’s report was discussed by the Finance and Administration subcommittee 
                    and the Executive Committee and subsequently presented to the General Assembly for discussion
                    </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: publication?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {publication?.fulfillment}</strong>
            </Title>

            {/* {JSON.stringify(clientService)} */}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of publication of Annual Budget & Workplan</Title>
            {publication && <Table columns={publicationColumn} dataSource={publication?.data} pagination={false} bordered />}
        <br/>
            {/* <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title> */}
            {/* {clientService && <Table columns={clienServiceReportColumn} dataSource={clientService?.report} pagination={false} bordered />} */}


        </>
    );
}

export default AuditorGeneralReport;