import { Layout, Table, Typography, Col } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";

const DumpingSite = forwardRef(({
  year,
  districtId, hideComment
}, ref) => {
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);
  const [data, setData] = useState([]);
  const [siteList, setSiteList] = useState([]);
  const [maxScore, setMaxScore] = useState(3);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "SDI5",
      area: "Environmental Health, Sanitation and Climate Action",
      maxScore,
      data,
      siteList,
      scorei,
      scoreii
    }),
  }));

  useEffect(() => {
    getDumpingSite();
  }, [year, districtId]);

  const getAttributeValue = (key, val) => {
    const attr = val?.attributes.find(attr => attr.displayName === key);
    return attr ? attr.value : "N/A";
  };

  function getDumpingSite() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=Txcfc03kUCi`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=Txcfc03kUCi&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const sites = result.data.instances;
              const reports = resp.data.instances;
              const tempSites = [];
              const tempSiteList = [];

              sites.forEach((site, index) => {
                const currentReport = reports.find(rep => rep.trackedEntity === site.trackedEntity);
                let isFunctional = "NO";

                if (currentReport) {
                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "mmPYFeO5XD5" && rep.value === "true") {
                      isFunctional = "YES";
                    }
                  })
                }
                const location = getAttributeValue("Address Location", site);
                const tempDataSet = {
                  siteAvailability: getAttributeValue("DPAT | Is the site Engineered or Well-maintained dumping site?", site) === "true" ? "YES" : "NO",
                  isFunctional,
                  documentAvailable: "",
                  location,
                  ownership: getAttributeValue("Is there a co-ownership for the site", site) === "true" ? "Co-Ownership" : "No Co-Ownership"
                };

                const tempSiteDataSet = {
                  no: index + 1,
                  name: getAttributeValue("Name", site),
                  location,
                  type: getAttributeValue("Dumping Site - Waste Type", site)
                };

                tempSiteList.push(tempSiteDataSet);
                tempSites.push(tempDataSet);
              });

              setData(tempSites);
              setSiteList(tempSiteList);

              if (tempSites.length > 0) {
                setScorei(1);
              }

              if (tempSiteList.length > 0) {
                setScoreii(2);
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const dumpingSiteColumn = [
    { title: "Well-maintained dumping site or Engineered Landfills available (Yes/No)", dataIndex: "siteAvailability", key: "siteAvailability" },
    { title: "Functional final disposal site available (Yes/No)", dataIndex: "isFunctional", key: "isFunctional" },
    { title: "Documents of ownership of disposal sites available", dataIndex: "documentAvailable", key: "documentAvailable" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Evidence of Ownership / Collaboration Structure", dataIndex: "ownership", key: "ownership" }
  ];

  const dumpingSiteListColumn = [
    { title: "No.", dataIndex: "no", key: "no" },
    { title: "Name of Site", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Solid / Liquid waste", dataIndex: "type", key: "type" }
  ];

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi5.0-5.2-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 5.0 - 5.2 Availability of Well-Maintained
            Dumping Site or Engineered Landfills</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on disposal of refuse and dumping sites<br /><br />
            <ol>
              <li type="i">
                If there is availability of a well-maintained dumping site or
                Engineered Landfills according to Environmental Health Standards, score 1.
              </li>
              <li type="i" className="py-1">
                If the District has a functional final disposal site or co-ownership for Solid/liquid waste with documentary evidence, score 2.
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>{maxScore}</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 5.0-5.2i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "0px", marginLeft: "0px" }}>
              SDI 5.0-5.2ii Actual Score: <strong>{scoreii}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>I- Evidence of Disposal of Refuse</Title>
          <Table
            columns={dumpingSiteColumn}
            dataSource={data || []}
            pagination={false} bordered />

          <Title level={4} style={{ marginTop: "20px" }}>II- List of dumping /final disposal site</Title>
          <Table
            columns={dumpingSiteListColumn}
            dataSource={siteList}
            pagination={false} bordered />

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default DumpingSite;