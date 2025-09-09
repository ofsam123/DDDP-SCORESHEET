import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { formatDataGeneral, getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AAPPublication = forwardRef(({ year, districtId, hideComment }, ref) => {
  const [publication, setPublication] = useState(null);

  const publicationColumn = [
    { title: "Date of Publication on website", dataIndex: "date", key: "date" },
    { title: "Address of website", dataIndex: "address", key: "address" },
    { title: "Evidence Attached", dataIndex: "evidence", key: "evidence" }
  ];


  useEffect(() => {
    getData();
  }, [year, districtId]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "CI4",
      area: "Transparency, Accountability & Participation",
      publication
    }),
  }));


  const setDataDisplay = (data, reports) => {
    const temp = [];

    let fulfillment = "Fulfilled";

    if (data?.length > 0) {
      data.forEach((val, idx) => {
        const supportLink = getFileLinkIfExist(reports, "xjRCTFFiMA3", val.trackedEntity);
        temp.push({
          key: idx,
          date: getAttributeValue("Published Date", val),
          address: getAttributeValue("Website", val),
          evidence: supportLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${supportLink}&dataElementUid=xjRCTFFiMA3`} target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Evidence
            </a>
          ) : (
            "Not Uploaded"
          )
        });

        if (!supportLink) {
          fulfillment = "Not Fulfilled";
        }

      });
    }

    if (reports.length === 0 || temp.length == 0) {
      fulfillment = "Not Fulfilled";
    }

    setPublication({ data: temp, fulfillment, report: [] });
  };

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=X5kGqVpbGoN`)
      .then(result => {

        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=X5kGqVpbGoN&orgUnit=${districtId}`)
            .then(resp => {

              const data = formatDataGeneral(result.data.instances, "Document Published", "Annual Budget & Workplan") || [];
              const reports = resp.data.instances;

              setDataDisplay(data, reports);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("decisions error ", err));
  }

  return (
    <Comment
      data={publication}
      year={year}
      districtId={districtId}
      tableCommentedId={`c4.0-4.2-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.2 Availability of Approved Annual Action Plan and Composite Budget </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive copies of the approved {year} Annual Action Plan and Composite Budget:<br /><br />
            <ol>
              <li type="i">
                If the approved Annual Action Plan and Composite Budget were
                published on the Assembly’s website and
              </li>
              <li type="i" className="py-1">
                If the approved Annual Action Plan and Composite Budget were distributed
                to members of the DPCU, Assembly Members, and Sub-Structures
              </li>
            </ol>

            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: publication?.fulfillment === "Fulfilled" ? "green" : "red" }}>{publication?.fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          {/* {JSON.stringify(clientService)} */}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of publication of Annual Budget & Workplan</Title>
          {publication && <Table columns={publicationColumn} dataSource={publication?.data} pagination={false} bordered />}
          <br />
          {/* <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title> */}
          {/* {clientService && <Table columns={clienServiceReportColumn} dataSource={clientService?.report} pagination={false} bordered />} */}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default AAPPublication;