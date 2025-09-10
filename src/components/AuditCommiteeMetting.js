import { Layout, Typography, Table,Col } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Comment from "../components/Comments";

const { Content } = Layout;
const { Title } = Typography;


const AuditCommiteeMeeting = forwardRef(({ meetings, meetingColumns, district, year, hideComment }, ref) => {

    useImperativeHandle(ref, () => ({
        getData: () => ({
            indicator: "CI3",
            area: "Public Financial Management and Auditing",
            meetings
        }),
    }));

    return (
         <Comment
        data={meetings} // Use CMS data if available, else DHIS2 data
        year={year}
        districtId={district}
        tableCommentedId={`c3.0-3.3-${year}`}
        hideComment={hideComment}
      >
        {({ renderCommentInput, renderCommentList }) => (
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

            <Col align="start">
          

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: meetings?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {meetings?.fulfillment}</strong>
            </Title>
             {!hideComment && renderCommentInput()}
               </Col>

            <Title level={4} style={{ marginTop: "20px" }}>Evidence of Audit Committee Meetings</Title>
            {meetings && <Table columns={meetingColumns} dataSource={meetings?.data} pagination={false} bordered />}

              {renderCommentList()}

        </>
        )}
        </Comment>
    );
})

export default AuditCommiteeMeeting;