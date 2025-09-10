import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { documentsColumn } from "../utils/tableColums";

const TransportationNetworkService = forwardRef(({
  year,
  transportors,
  districtId,
  hideComment
}, ref) => {
  const [transportations, setTransportations] = useState([]);
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);
  const [scoreiii, setScoreiii] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [maxScore, setMaxScore] = useState(3);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    if (transportors.transportors?.length > 0) {
      setScorei(1);
      setScoreiii(1);
    }
    getIndicatorsData();
  }, [year, districtId, transportors]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI2",
      area: "Basic/ Social Services",
      maxScore,
      transportations,
      transportations,
      scorei,
      scoreii,
      scoreiii

    }),
  }));

  const transportationNetworkColumn = [
    { title: "Evidence of Road Safety Issues/activities in the MTDP", dataIndex: "mtdp", key: "mtdp" },
    { title: "No. of Road Safety interventions / activities in the AAP", dataIndex: "aapRoadsActivities", key: "aapRoadsActivities" },
    { title: "No. of Road Safety interventions / activities in the AAP implemented", dataIndex: "aapRoadsActivitiesImp", key: "aapRoadsActivitiesImp" },
    { title: "Availability of register on public transport facilities", dataIndex: "availability", key: "availability" }
  ];


  const transportatorsColumn = [
    { title: "Business", dataIndex: "business", key: "business" },
    { title: "Transport Type", dataIndex: "type", key: "type" },
    { title: "Vehicle Type", dataIndex: "typeVehicle", key: "typeVehicle" },
    { title: "Quantity of Vehicles Owned", dataIndex: "vehicleQuantity", key: "vehicleQuantity" },
    { title: "Number of employees", dataIndex: "noOfEmployee", key: "noOfEmployee" }
  ];

  const calculatePercentage = (total, value) => {
    const totalNum = parseFloat(total);
    const valueNum = parseFloat(value);

    if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
      return 0;
    }

    return ((valueNum / totalNum) * 100).toFixed(2);
  };

  const getIndicatorsData = () => {
    axios.get(`/analytics.json?dimension=dx:E8M6EnQ2uKe&dimension=ou:LEVEL-3;${districtId}&filter=pe:${year}-01-01;${year}-12-31`)
      .then(res => {
        const data = res.data?.rows;

        if (data?.length > 0 && transportors) {
          const percentageValue = calculatePercentage(transportors.data?.aapRoadsActivities, data[0][2]);
          transportors.data.aapRoadsActivitiesImp = data[0][2];

          setPercentage(percentageValue);

          if (percentageValue >= 60) {
            setScoreii(1);
          }
        }

        setTransportations([transportors.data]);
      }).catch(err => console.log(err));
  };

  return (
    <Comment
      data={transportations}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi2.0-2.6-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 2.0 - 2.6 Services on the Transportation network</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on the Operations & Maintenance
            Plan and its implementation:<br /><br />
            <ol>
              <li type="i"> If the Assembly has included road safety interventions or activities in their
                Medium-Term Development Plan and Annual Action Plan, score 1
              </li>
              <li type="i" className="py-1"> If the Assembly has implemented at least 60%
                of the road safety interventions in their Annual Action Plan, score 1
              </li>
              <li type="i"> If the District has a register of public transport operators,
                vehicles, drivers and terminals, score 1
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 2.0-2.6i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 2.0-2.6ii Actual Score: <strong>{scoreii}</strong>
          </Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 2.0-2.6iii Actual Score: <strong>{scoreiii}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>
          {/* {JSON.stringify(transportations)} */}
          <Title level={4} style={{ marginTop: "20px" }}>Evidence of road safety activities in Plans of the Assembly</Title>
          {transportations && <Table
            columns={transportationNetworkColumn}
            dataSource={transportations || []}
            pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Transport Operators</Title>
          {<Table
            columns={transportatorsColumn}
            dataSource={transportors?.transportors}
            pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Attached Documents</Title>
          {<Table
            columns={documentsColumn}
            dataSource={transportors?.links}
            pagination={false} bordered />}

          <Title level={5} style={{ marginTop: "30px" }}>Conclusion</Title>
          <Content>
            {percentage} % of Road Safety interventions in the Annual Action Plan were implemented
          </Content>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default TransportationNetworkService;