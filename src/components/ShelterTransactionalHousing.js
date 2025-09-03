import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

function ShelterTransactionalHousing({
  year,
  districtId,hideComment
}) {
  const [score, setScore] = useState(0);
  const [services, setServices] = useState([]);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    getResidentialHomeCentre()
  }, [year, districtId]);

  const getAttributeValue = (key, val) => {
    const attr = val?.attributes.find(attr => attr.displayName === key);
    return attr ? attr.value : "N/A";
  };

  function getResidentialHomeCentre() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=F7wJn9wdwcQ`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=F7wJn9wdwcQ&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const rhc = result.data.instances;
              const reports = resp.data.instances;
              const temp = [];
              rhc.forEach(res => {
                let totalStaff = 0;
                let reportAvailability = "NO";

                const currentReport = reports.find(rep => rep.trackedEntity === res.trackedEntity);

                if (currentReport) {
                  currentReport.dataValues.forEach(r => {
                    if (r.dataElement === "p0S0tiagSOZ" || r.dataElement === "A156A02EAVy") {
                      totalStaff += parseInt(r.value);
                    }

                    if (r.dataElement === "hM6AUNKRbKB") {
                      reportAvailability = "YES";
                      setScore(1);
                    }
                  });
                }

                const tempDataSet = {
                  name: getAttributeValue("Name", res),
                  address: getAttributeValue("Address Location", res),
                  staffNo: totalStaff,
                  reportAvailability: reportAvailability,
                  trackedEntity: res.trackedEntity
                };

                temp.push(tempDataSet);
              });

              setServices(temp);
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const rhcColumn = [
    { title: "Name of RH/C(s) in Municipality", dataIndex: "name", key: "name" },
    { title: "Location/Digital Address of RH/C", dataIndex: "address", key: "address" },
    { title: "No. of staff at each RH/C", dataIndex: "staffNo", key: "staffNo" },
    { title: "Report on operations available", dataIndex: "reportAvailability", key: "reportAvailability" }
  ];

  return (
    <Comment
      data={services}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi4.0-4.2-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 4.0 - 4.2 Availability of Shelters (Transitional Housing) in the District</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD and Head of Department of Social Welfare and Community Development, receive information on
            the operations of Residential Home Centres (RH/Cs) (Transitional Housing) in the District:<br /><br />
            <ol>
              <li type="i"> If the Department has at least one (1)
                Residential Home Centre and there is a report on the operations of the centre, score 1.
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>1</strong></Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 4.0-4.2 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          {/* {JSON.stringify(transportations)} */}
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Residential Home/Centre (RH/C) Operation</Title>
          <Table
            columns={rhcColumn}
            dataSource={services || []}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
          <Content>
            There are {services.length} Residential Home Centres in the Municipality and reports
            on their activities were available
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default ShelterTransactionalHousing;