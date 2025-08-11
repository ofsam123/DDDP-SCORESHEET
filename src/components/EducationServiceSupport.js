import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage, formatDataGeneral, getAttributeValue } from "../utils/utils";
import Comment from "../components/Comments";

function EducationServiceSupport({ year, districtId }) {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  const [schools, setSchools] = useState([]);
  const [educationSupport, setEducationSupport] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const schoolsColumns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'School Name',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Community',
      dataIndex: 'community',
      key: 'community',
    },
    {
      title: 'Establishment Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Support(s)',
      dataIndex: 'support',
      key: 'support',
    },
  ];

  const schoolsSupportColumns = [
    {
      title: 'No of Schools',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'No of Schools Supported',
      dataIndex: 'shoolSupported',
      key: 'shoolSupported',
    },
    {
      title: 'Percentage of Schools Supported',
      dataIndex: 'percentage',
      key: 'Percentage of Public Schools Supported',
    }
  ]

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=g27TeeehRQC&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=g27TeeehRQC&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const schools = result.data.instances;
              const reports = resp.data.instances;
              const temp = [];

              const publicSchools = formatDataGeneral(schools, "Type", "Public") || [];

              publicSchools.forEach((school, idx) => {
                const currentReport = reports.find(rep => rep.trackedEntity === school.trackedEntity);
                let support = "";

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "xAySRtnwzQa") {
                      support = rep.value;
                    }
                  });
                }

                const tempDataSet = {
                  no: idx + 1,
                  school: getAttributeValue("Name of School", school),
                  community: getAttributeValue("Community", school),
                  date: getAttributeValue("Established Date", school),
                  support
                };

                temp.push(tempDataSet);
              });

              setSchools(temp);

              let schoolSupported = 0;

              temp.forEach(school => {
                if (school.support !== "") {
                  schoolSupported++;
                }
              });

              const percentage = calculatePercentage(schoolSupported, temp.length);

              setPercentage(percentage.toFixed(2));

              setEducationSupport([{
                no: temp.length,
                shoolSupported: schoolSupported,
                percentage: percentage.toFixed(2)
              }]);
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Comment
      data={educationSupport}
      year={year}
      districtId={districtId}
      tableCommentedId={`pi5.0-5.1-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.1 Support to Education Services</Title>
          <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD and District Director of Education receive information on
            the list of public schools in the District and challenges faced by the schools:<br /><br />
            <ol>
              <li type="i">
                If the Assembly has supported at least 15% of the Public Schools within the district to address
                their challenges (furniture, teaching and learning materials (TLMs), etc.), score 2
              </li>
            </ol>
          </Content>

          <Title level={5} style={{ marginTop: "20px" }}>
            Maximum Score <strong>2</strong>
          </Title>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              PI 5.0-5.1 Actual Score: <strong>Score</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={5} style={{ marginTop: "20px" }}>
            Evidence of DA support to Public Schools
          </Title>
          <Table
            columns={schoolsSupportColumns}
            dataSource={educationSupport}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "20px" }}>
            List of Public Schools
          </Title>
          <Table
            columns={schoolsColumns}
            dataSource={schools}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "30px" }}>Conclusion:</Title>
          <Content>
            The Assembly has supported {percentage}% of Public schools to address their challenges in {year}
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default EducationServiceSupport;