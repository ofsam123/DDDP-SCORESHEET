import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import Comment from "../components/Comments";

function BuildingInspectorateUnit({
  year,
  units,
  districtId
}) {
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    if (units?.data.length > 0) {
      setScorei(1);
    }

    if (units?.report.length > 0) {
      setScoreii(2);
    }
  }, [year, districtId, units]);

  const buildingInspectorateUnitColumn = [
    { title: "Date Established", dataIndex: "date", key: "date" },
    { title: "Office Available (Yes/No)", dataIndex: "officeAvailability", key: "officeAvailability" },
    { title: "Category of Staff", dataIndex: "staffCategory", key: "staffCategory" },
    { title: "Function performed by Works Department", dataIndex: "department", key: "department" }
  ];

  const buildingInspectorateUnitReportColumn = [
    { title: "Report Title", dataIndex: "title", key: "title" },
    { title: "Date of Report", dataIndex: "date", key: "date" },
    { title: "Issues Reported on", dataIndex: "issues", key: "issues" }
  ];

  return (
    <Comment
      data={units?.data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi3.0-3.1-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 3.0 - 3.1 Establishment of Planning and Building Inspectorate Unit</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive information on the Planning and Building 
            Inspectorate Unit of the Assembly:<br /><br />
            <ol>
              <li type="i"> If the Building Inspectorate Unit has been established with 
                Office and Staff or if the function has been 
                performed by the Assembly’s Physical Planning and Works Department, score 1, and
              </li>
              <li type="i" className="py-1"> If there is a detailed report on the activities of the Unit 
                with actions taken on all recommendations, score 2 else score 0
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 3.0-3.1i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 3.0-3.1ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            {renderCommentInput()}
          </Row>
          
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of Planning & Building Inspectorate Unit</Title>
          {<Table
            columns={buildingInspectorateUnitColumn}
            dataSource={units?.data || []}
            pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Reports on activities of the Unit</Title>
          {<Table
            columns={buildingInspectorateUnitReportColumn}
            dataSource={units?.report || []}
            pagination={false} bordered />}

          {renderCommentList()}

          {/* <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
          <Content>
            The GA approved the Client Service Charter by a resolution at its meeting held on 30/06/2020 and displayed on the Assembly premises and website.
          </Content> */}
        </>
      )}
    </Comment>
  );
}

export default BuildingInspectorateUnit;