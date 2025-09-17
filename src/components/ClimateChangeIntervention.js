import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { formatDataGeneral } from "../utils/utils";

const ClimateChangeIntervention = forwardRef(({
  year,
  districtId,
  hideComment
}, ref) => {
  const [climateChangePlan, setClimateChangePlan] = useState([]);
  const [treePlan, setTreePlan] = useState([]);
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);
  const [maxScore, setMaxScore] = useState(2);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    getAnnualActionPlan();
  }, [year, districtId]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI5",
      area: "Environmental Health, Sanitation and Climate Action",
      maxScore,
      climateChangePlan,
      treePlan,
      scorei,
      scoreii
    }),
  }));

  function getAnnualActionPlan() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=ArLnAxhykoz&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=1000`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=ArLnAxhykoz&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=10000`)
            .then(resp => {
              
              const aap = formatDataGeneral(result.data.instances, "Year", `${year}`) || [];
              const reports = resp.data.instances;
              const climateChangePlans = formatDataGeneral(aap, "Activity Type", "Climate Adaptation") || [];
              const treePlantingPlans = formatDataGeneral(aap, "Activity Type", "Tree planting/Afforestation") || [];
              const aapTree = treePlantingPlans.length;
              const aapTotal = aap.length;
              const aapClimate = climateChangePlans.length;
              let aapClimateImplemented = 0
              let aapTreeImplemented = 0;

              climateChangePlans.forEach(plan => {
                const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed") {
                      aapClimateImplemented++;
                    }
                  })
                }
              });

              treePlantingPlans.forEach(plan => {
                const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed") {
                      aapTreeImplemented++;
                    }
                  })
                }
              });

              const percentage = calculatePercentage(aapClimate, aapClimateImplemented);

              const temp = {
                aapTotal,
                aapClimate,
                aapClimateImplemented,
                percentage
              }

              const tempTree = {
                aapTree,
                aapTreeImplemented,
                reportAvailability: aapTreeImplemented > 0 ? "YES" : "NO"
              }

              setClimateChangePlan([temp]);
              setTreePlan([tempTree]);

              if (percentage >= 90) {
                setScorei(1);
              }

              if (aapTreeImplemented > 0) {
                setScoreii(1);
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


  const aapColumn = [
    {
      title: `No. of Activities in AAP ${year}`,
      dataIndex: "aapTotal",
      key: "aapTotal"
    },
    {
      title: "No. of Climate Adaptation activities in AAP",
      dataIndex: "aapClimate",
      key: "aapClimate"
    },
    {
      title: `No. of Climate Adaptation activities in AAP implemented in ${year}`,
      dataIndex: "aapClimateImplemented",
      key: "aapClimateImplemented"
    },
    {
      title: "% Implementation of Climate Adaptation activities in the AAP implemented",
      dataIndex: "percentage",
      key: "percentage"
    }
  ];

  const aapTreePlantingColumn = [
    {
      title: "No. of Tree planting activities in the AAP",
      dataIndex: "aapTree",
      key: "aapTree"
    },
    {
      title: `No. of Tree planting activities implemented in ${year}`,
      dataIndex: "aapTreeImplemented",
      key: "aapTreeImplemented"
    },
    {
      title: "Reports on Tree planting activities available (Yes/No)",
      dataIndex: "reportAvailability",
      key: "reportAvailability"
    }
  ];

  return (
    <Comment
      data={climateChangePlan}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi5.0-5.5-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 5.0 - 5.5 Climate Change Interventions</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on Climate Change interventions activity implementation;<br /><br />
            <ol>
              <li type="i">
                If the District has delivered or implemented at least 90% of climate
                adaptation activities from their Annual Action Plan (AAP), score 1.
              </li>
              <li type="i" className="py-1">
                If the District has a programme on tree planting/afforestation and
                there is evidence of implementation, score 1
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 5.0-5.5i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
              SDI 5.0-5.5ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of implementation of climate adaptation activities</Title>
          <Table
            columns={aapColumn}
            dataSource={climateChangePlan}
            pagination={false} bordered />

          <Title level={4} style={{ marginTop: "20px" }}>II- Evidence of Tree planting/Afforestation activities implemented</Title>
          <Table
            columns={aapTreePlantingColumn}
            dataSource={treePlan}
            pagination={false} bordered />

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default ClimateChangeIntervention;