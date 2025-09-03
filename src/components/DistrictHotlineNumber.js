import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const DistrictHotlineNumber = forwardRef(({ data, year, columns, districtId, hideComment }, ref) => {
  const [dataSet, setDataSet] = useState([]);
  const [score, setScore] = useState(0);

  useImperativeHandle(ref , ()=> ({
    getData: () => ({
      score, dataSet
    })
  }))

  useEffect(() => {
    initiateData();
  }, [year, data]);

  const initiateData = () => {
    setDataSet(data?.data);
    setScore(data?.score);
  };

  return (
    <Comment
      data={dataSet}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi4.0-4.3-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <div>
            <Text strong>THEMATIC AREA: </Text>
            <Text>SOCIAL PROTECTION, GENDER & NUTRITION (14)</Text>
          </div>
          <Title level={3}>SDI 4.0 - 4.3 Availability of Dedicated Hotline for the Vulnerable</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD and Head of Department of Social Welfare and Community Development receive information on the
            operations of the Department of Social Welfare and Community Development:<br /><br />
            <ol>
              <li type="i">
                If the District has a dedicated functional hotline for vulnerable groups, score 1, else score 0;
              </li>
            </ol>
          </Content>
          <Title level={5} style={{ marginTop: "20px" }}>Maximum Score <strong>1</strong></Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 4.0-4.3 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Dedicated Functional Hotline for Vulnerable Groups</Title>
          {/* {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />} */}
          {dataSet &&
            <Table
              columns={columns}
              dataSource={dataSet}
              pagination={false} bordered />}
          
          <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
          <Content>
            {score === 1 ? 'There is a dedicated hot line in the District for vulnerable groups' :
              'There is no dedicated hot line in the District for vulnerable groups'}            
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );

}
);

export default DistrictHotlineNumber;