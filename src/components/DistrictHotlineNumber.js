import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import axios from "../api/axios";
import { getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function DistrictHotlineNumber({ year,districtId }) {
  const [dataSet, setDataSet] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [score, setScore] = useState(0);
  

  useEffect(() => {
    getData();
  }, [year, districtId]);

  const districtHotlineNumberColumn = [
    { title: "Dedicated hotline exist (Yes/No)", dataIndex: "hotline", key: "hotline" },
    { title: "Hotline Number", dataIndex: "number", key: "number" },
    { title: "Reports", dataIndex: "report", key: "report" }
];


   function getData() {
      axios
        .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=ng9HEemUaIM`)
        .then(result => {
  
          if (result.data.instances.length > 0) {
            axios
              .get(`/tracker/events?program=ng9HEemUaIM&orgUnit=${districtId}`)
              .then(resp => {
  
                const data = result.data.instances;
                const reports = resp.data.instances;
                const temp = [];
                let tempScore = 1;
  
                data.forEach((document, index) => {
  
                  const reportLink = getFileLinkIfExist(reports, "hM6AUNKRbKB", document.trackedEntity);
  
                  const tempDataSet = {
                    hotline: reportLink ? "YES" : "NO",
                    number: getAttributeValue("Hotline Number", document),
                    report: reportLink ? (
                      <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=hM6AUNKRbKB`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                      >
                        View Report
                      </a>
                    ) : (
                      "Not Uploaded"
                    ),
                  };
  
                  temp.push(tempDataSet);
  
                  if(!reportLink){
                    tempScore = 0;
                  }
                });
  
                if(temp.length === 0){
                  tempScore = 0;
                }
  
                setScore(tempScore);
  
                setDataTable(temp);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log("decisions error ", err));
    }

  return (
    <Comment
      data={dataTable}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi4.0-4.3-${year}`}
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
            {renderCommentInput()}
          </Row>
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Dedicated Functional Hotline for Vulnerable Groups</Title>
          {/* {data && <Table columns={columns} dataSource={data?.data} pagination={false} bordered />} */}
          
            <Table
              columns={districtHotlineNumberColumn}
              dataSource={dataTable}
              pagination={false} bordered />
          
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

export default DistrictHotlineNumber;