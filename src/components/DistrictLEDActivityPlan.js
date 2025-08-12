import { Layout, Table, Typography, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

function DistrictLEDActivityPlan({
  year,
  districtId
}) {
  const [data, setData] = useState([]);
  const [scorei, setScorei] = useState(0);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    getAnnualActionPlan();
  }, [year, districtId]);

  function getAnnualActionPlan() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const aap = result.data.instances;
              const reports = resp.data.instances;
              const aapLedPlans = formatDataGeneral(aap, "Activity Type", "LED Activity") || [];
              const aapTotal = aap.length;
              const aapLED = aapLedPlans.length;
              let aapLEDImplemented = 0

              aapLedPlans.forEach(plan => {
                const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed") {
                      aapLEDImplemented++;
                    }
                  })
                }
              });

              const percentage = calculatePercentage(aapLED, aapLEDImplemented);

              const temp = {
                aapTotal,
                aapLED,
                aapLEDImplemented,
                percentage
              }

              setData([temp]);

              if (percentage >= 90 && aapLED > 0) {
                setScorei(2);
              }

          
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

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

  const dataColumn = [
    {
      title: "No. of Activities in AAP",
      dataIndex: "aapTotal",
      key: "aapTotal"
    },
    {
      title: "No. of LED activities in AAP",
      dataIndex: "aapLED",
      key: "aapLED"
    },
    {
      title: "No. of LED activities in AAP implemented",
      dataIndex: "aapLEDImplemented",
      key: "aapLEDImplemented"
    },
    {
      title: "% Implementation of LED activities",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi6.0-6.1-${year}`}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 6.0 - 6.1 Availability of District LED Activities in the AAP</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on LED activities:<br /><br />
            <ol>
              
              <li type="i" className="py-1">
                If the District has implemented at least 60% of the LED activities
                in the Annual Action Plan (AAP), score 2.
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>2</strong></Title>
          
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 6.0-6.1 Actual Score: <strong>{scorei}</strong>
            </Title>
            {renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Implementation of LED activities</Title>
          <Table
            columns={dataColumn}
            dataSource={data}
            pagination={false} bordered />

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default DistrictLEDActivityPlan;