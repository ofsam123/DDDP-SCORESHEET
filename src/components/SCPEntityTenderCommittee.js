import React, { forwardRef, useImperativeHandle } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title } = Typography;

const SPCEntityTenderCommittee = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "CI3",
      area: "Public Financial Management and Auditing",
      data
    }),
  }));

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c3.0-3.1-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 3.0 Public Financial Management and Auditing - 3.1 Meetings of the Entity Tender Committee (ETC) and Procurement Plans Approval</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD, receive information on the preparation and approval of the <strong>{parseInt(year) + 1}</strong> Procurement
            Plan by 30th November <strong>{year}</strong>, and obtain quarterly updated Procurement Plans from the Procurement Plan for <strong>{year}</strong>.<br /><br />
            <ol>
              <li type="i">
                If the Entity Tender Committee met as required by law (at least once in every quarter)
                and have duly recorded and signed Minutes of Meeting
              </li>
              <li type="i">
                If the {year + 1} Annual Procurement Plan is linked to the {year + 1} Composite Budget
                and Annual Action Plan (AAP) and approved by 30th November {year - 1} by the Entity
                Tender Committee, as evidenced by minutes of meeting and follows the PPA guidelines; and.
              </li>
              <li type="i">
                If all the {year + 1} quarterly updated Procurement Plans were duly prepared by the Procurement Unit
                and were approved at the quarterly meetings of the Entity Tender Committee.
              </li>
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red" }}>{data?.fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Entity Tender Committee Meetings</Title>
          {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default SPCEntityTenderCommittee;