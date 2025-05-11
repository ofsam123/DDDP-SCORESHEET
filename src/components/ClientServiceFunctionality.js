import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Row, Space, Col } from "antd";
import axios from "../api/axios";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function ClientServiceFunctionality({ year, district }) {

    const [clientService, setClientService] = useState(null);

    const clienServiceColumn = [
        { title: "Date of Establishment", dataIndex: "date", key: "date" },
        { title: "Office Available (Yes/No)", dataIndex: "officeAvailability", key: "officeAvailability" },
        { title: "Complaint’s Book available (Yes/No)", dataIndex: "bookAvailability", key: "bookAvailability" },
        { title: "Work plan available (Yes/No) ", dataIndex: "planAvailability", key: "planAvailability" },
        { title: "Schedule Officer Name", dataIndex: "officerName", key: "officerName" },
        { title: "Dedicated telephone number", dataIndex: "phone", key: "phone" }
    ];

    const clienServiceReportColumn = [
        { title: "Title of Report on activities", dataIndex: "report", key: "report" },
        { title: "Date of Report", dataIndex: "date", key: "date" },
        { title: "Key Issues in the Reports", dataIndex: "issues", key: "issues" }

    ];

    useEffect(() => {
        getClientServiceData();
        console.log("Jallo: ");
    },[year, district]);

    const getAttributeValue = (key, val) => {
        const attr = val?.attributes.find(attr => attr.displayName === key);
        return attr ? attr.value : "N/A";
    };

    const setClientServiceDataDisplay = (data, reports) => {
        
        const clientServiceTemp = [];
        const clientServiceReport = [];

        let fulfillment = "Not Fulfilled";

        console.log("services: ", reports);

        if (data?.length > 0) {

            data.forEach((val, idx)=>{
                clientServiceTemp.push({
                    key: idx, 
                    date: getAttributeValue("Established Date", val),
                    officeAvailability: getAttributeValue("Office Available (Yes/No)", val) === "true" ? "YES" : "NO",
                    bookAvailability: getAttributeValue("Complaint’s Book available (Yes/No)", val) === "true" ? "YES" : "NO",
                    planAvailability: getAttributeValue("Work plan available (Yes/No)", val) === "true" ? "YES" : "NO",
                    officerName: getAttributeValue("Schedule Officer Name", val),
                    phone: getAttributeValue("Dedicated Mobile Number", val)
                });
            })
           
        }

        if(reports.length > 0){

            reports.forEach(rep=>{
                clientServiceReport.push({
                    report: rep.dataValues[2]?.value,
                    date: rep?.dataValues[3]?.value,
                    issues:rep?.dataValues[1]?.value
                });
            })
        }

        if(clientServiceTemp.length > 0 && clientServiceReport.length > 0){
            fulfillment = "Fulfilled"
        }

        setClientService({ data: clientServiceTemp, fulfillment, report: clientServiceReport })

    }

    function getClientServiceData() {
        axios
            .get(`/tracker/trackedEntities?orgUnit=${district}&program=GciA0HJcRzN`)
            .then(result => {
                // console.log("Client Service tracker", result.data.instances)
                // setClientServiceDataDisplay(result.data.instances);
                if (result.data.instances.length > 0) {

                    axios
                        .get(`/tracker/events?program=GciA0HJcRzN&orgUnit=${district}`)
                        .then(resp => {
                            // console.log("Client Service report", resp.data.instances)
                            // setMeetingDecision({ decisions: result.data.instances, reports: resp.data.instances })
                            setClientServiceDataDisplay(result.data.instances, resp.data.instances);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log("decisions error ", err))
    }

    return (
        <>
            <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.1 Functionality of Client Service Unit (CSU) </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the DCD receive information on the Client Service Unit:<br /><br />
                <ol>
                    <li type="i">
                        If the Client Service Unit has been established with a schedule officer,
                        dedicated telephone number, and is functional; and
                    </li>
                    <li type="i" className="py-1">
                        If there is a report on activities of the Client Service Unit.
                    </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: clientService?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {clientService?.fulfillment}</strong>
            </Title>

            {/* {JSON.stringify(clientService)} */}

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Establishment of Client Service Unit</Title>
            {clientService && <Table columns={clienServiceColumn} dataSource={clientService?.data} pagination={false} bordered />}
        <br/>
            {/* <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title> */}
            {clientService && <Table columns={clienServiceReportColumn} dataSource={clientService?.report} pagination={false} bordered />}


        </>
    );
}

export default ClientServiceFunctionality;