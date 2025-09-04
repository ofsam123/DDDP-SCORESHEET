import { Layout, Typography, Table } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const { Content } = Layout;
const { Title } = Typography;


const AuditCommiteeMeeting = forwardRef(({ meetings, meetingColumns, district, year }, ref) => {

     useImperativeHandle(ref, () => ({
        getData: () => ({
          meetings
        }),
      }));
   
    return (
        <>
            <Title level={3}>CI 3.0 Public Financial Management and Auditing -
                3.3 Functionality of the Audit Committee </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
            <Content>
                From the District Coordinating Director (DCD), receive information on the Audit Committee of the Assembly.<br /><br />
                <ol>
                    <li type="i">
                        If the Audit Committee is duly constituted and met at least four times during 2024,
                         with Minutes of Meeting duly signed by the Secretary and Chairperson; and
                    </li>
                    <li type="i">
                        If Management has submitted responses to both Internal Audit reports and Management Letter within 10 
                        days and 30 days respectively as stipulated by law, and has taken action on all audit recommendations
                    </li>
                   

                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: meetings?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {meetings?.fulfillment}</strong>
            </Title>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Audit Committee Meetings</Title>
            {meetings && <Table columns={meetingColumns} dataSource={meetings?.data} pagination={false} bordered />}

        </>
    );
})

export default AuditCommiteeMeeting;