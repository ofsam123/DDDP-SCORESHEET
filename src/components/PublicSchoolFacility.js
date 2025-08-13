import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

function PublicSchoolFacility({
  year,
  districtId
}) {
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);
  const [percentageData, setPercentageData] = useState(0);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    getSchools();
  }, [year, districtId]);

  const calculatePercentage = (total, value) => {
    const totalNum = parseFloat(total);
    const valueNum = parseFloat(value);

    if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
      return 0;
    }

    return ((valueNum / totalNum) * 100).toFixed(2);
  };

  function formatDataGeneral(data, property, value) {
    return data?.filter(item =>
      item.attributes.some(attr =>
        attr.displayName === property && attr.value === value
      )
    );
  }

  function getSchools() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=g27TeeehRQC`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=g27TeeehRQC&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const schools = formatDataGeneral(result.data.instances, "Type", "Public") || [];
              const reports = resp.data.instances;
              let schoolTotal = schools?.length;
              let totalFacility = 0;

              schools.forEach(school => {
                const currentReport = reports.find(rep => rep.trackedEntity === school.trackedEntity);

                if (currentReport) {
                  let facility1 = false;
                  let facility2 = false;
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "NLFmA25boNu") {
                      facility1 = true;
                    }

                    if (rep.dataElement === "JrAtSHckaq4") {
                      facility2 = true;
                    }
                  });

                  if (facility1 && facility2) {
                    totalFacility++;
                  }
                }
              });

              const percentage = calculatePercentage(schoolTotal, totalFacility);

              const temp = {
                schoolTotal,
                totalFacility,
                percentage
              }

              setPercentageData(percentage);
              setData([temp]);

              if (percentage >= 90) {
                setScore(2);
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const schoolColumn = [
    {
      title: "No. of public schools in the District",
      dataIndex: "schoolTotal",
      key: "schoolTotal"
    },
    {
      title: "No. of public schools with functional institutional Toilet and water facilities",
      dataIndex: "totalFacility",
      key: "totalFacility"
    },
    {
      title: "% of public schools with institutional Toilet and water facilities",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi5.0-5.4-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 5.0 - 5.4 Availability of Institutional Toilet
            Facilities and Water in Public Schools</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD and Director, GES, receive information on public schools in the District:<br /><br />
            <ol>
              <li type="i">
                If at least 90% of public schools in the District have functional institutional
                toilet facilities and water facilities as at {year}, score 2.
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 5.0-5.4 Actual Score: <strong>{score}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of functional toilet and water facilities in public schools</Title>
          <Table
            columns={schoolColumn}
            dataSource={data || []}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
          <Content>
            The Assembly has {percentageData}% of Public Schools with functional institutional toilet
            facilities and Water facilities in {year}
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default PublicSchoolFacility;