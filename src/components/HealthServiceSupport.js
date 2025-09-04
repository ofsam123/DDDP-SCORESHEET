import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import { calculatePercentage, formatDataGeneral, getAttributeValue, getFileLinkIfExist } from "../utils/utils";
import Comment from "../components/Comments";

const HealthServiceSupport = forwardRef(({ year, districtId,hideComment }, ref) => {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  const [healthFacilities, setHealthFacilities] = useState([]);
  const [healthFacilitySupport, setHealthFacilitySupport] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
      getData: () => ({
        healthFacilities,
        healthFacilitySupport,
        score,
        percentage
      }),
    }));

  const healthColumns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Facility Name',
      dataIndex: 'facility',
      key: 'facility',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
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
    {
      title: 'Support Evidence',
      dataIndex: 'report',
      key: 'report',
    }
  ];

  const healthSupportColumns = [
    {
      title: "No. of Health Centres (A)",
      dataIndex: "noOfHealthCenter",
      key: "noOfHealthCenter"
    },
    {
      title: "No. of Health Centres supported by DA (B)",
      dataIndex: "noOfHealthCenterSupported",
      key: "noOfHealthCenterSupported"
    },
    {
      title: "% of health centres supported B/A * 100",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=cKOJDISfpX2&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=cKOJDISfpX2&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const hospitals = result.data.instances;
              const reports = resp.data.instances;
              const temp = [];

              const publicHospitals = formatDataGeneral(hospitals, "Ownership Type", "Public") || [];

              publicHospitals.forEach((facility, idx) => {
                const currentReport = reports.find(rep => rep.trackedEntity === facility.trackedEntity);
                const reportLink = getFileLinkIfExist(reports, "E6mSis1p8NG", facility.trackedEntity);
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
                  facility: getAttributeValue("Name", facility),
                  location: getAttributeValue("Location", facility),
                  date: getAttributeValue("Construction End Date", facility),
                  support,
                  report: reportLink ? (
                    <a
                        className="px-2 text-primary fw-bold text-decoration-underline"
                        href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=E6mSis1p8NG`} target="_blank"
                        rel="noopener noreferrer"
                        title="Click here to see the uploaded document"
                    >
                        View Evidence
                    </a>
                ) : (
                    "Not Uploaded"
                )
                };

                temp.push(tempDataSet);
              });

              setHealthFacilities(temp);

              let schoolSupported = 0;

              temp.forEach(facility => {
                if (facility.support !== "") {
                  schoolSupported++;
                }
              });

              const percentage = calculatePercentage(schoolSupported, temp.length);

              setPercentage(percentage.toFixed(2));

              if (percentage >= 15) {
                setScore(1);
              }

              setHealthFacilitySupport([{
                noOfHealthCenter: temp.length,
                noOfHealthCenterSupported: schoolSupported,
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
      data={healthFacilitySupport}
      year={year}
      districtId={districtId}
      tableCommentedId={`pi5.0-5.2-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.2 Support to Health Services</Title>
          <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD and District Director of Health receive information on the list of public
            health facilities in the District and challenges faced by the centres:<br /><br />
            <ol>
              
              <li type="i">
                If the Assembly has supported at least 15% of the public health centres to address their challenges, score 1
              </li>
            </ol>
          </Content>

          <Title level={5} style={{ marginTop: "20px" }}>
            Maximum Score <strong>1</strong>
          </Title>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              PI 5.0-5.2 Actual Score: <strong>{score}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={5} style={{ marginTop: "20px" }}>
            Assembly Support to Public Health Facilities
          </Title>
          <Table
            columns={healthColumns}
            dataSource={healthFacilities || []}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "20px" }}>
            List of Public Health Facilities
          </Title>
          <Table
            columns={healthSupportColumns}
            dataSource={healthFacilitySupport}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "30px" }}>Conclusion:</Title>
          <Content>
            The Assembly has supported {percentage}% of Public Health Facilities to address their challenges in {year}
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default HealthServiceSupport;