import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import Comment from "../components/Comments";

const StreetNaming = forwardRef(({
  year,
  streets,
  districtId,
  columns,
  counterColumns,
  hideComment
}, ref) => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useImperativeHandle(ref, () => ({
      getData: () => ({
        streets
      }),
    }));

  return (
    <Comment
      data={streets?.data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi3.0-3.3-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 3.0 - 3.3 Street Naming Database and Property Addressing</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD obtain detailed information on street naming and property addressing database.
            <ol>
              <li type="i">If the Assembly has a functional street naming and property addressing database, score 1</li>
             
              <li type="i">If the Assembly has installed at least 70% of its named streets, score 2; if less than 70%, score 0</li>
            </ol>

            <br />
          </Content>

          <Title level={5} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>

          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 3.0-3.3i Actual Score:{" "}
            <strong>
              {streets?.data?.length > 0 && streets.data[0].street === "YES" ? 1 : 0}
            </strong>
          </Title>

          
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 3.0-3.3ii Actual Score:{" "}
              <strong>{streets?.percentage >= 70 ? 2 : 0}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={5} style={{ marginTop: "20px" }}>Evidence of Street Naming Database</Title>
          <Table
            columns={columns}
            dataSource={streets?.data}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "30px" }}>Evidence of Installation of named streets</Title>
          <Table
            columns={counterColumns}
            dataSource={streets?.counter}
            pagination={false} bordered />

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default StreetNaming;