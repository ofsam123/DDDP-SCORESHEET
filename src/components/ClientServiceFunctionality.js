import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Row } from "antd";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { getFileLinkIfExist } from "../utils/utils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ClientServiceFunctionality = forwardRef(({ year, districtId,hideComment }, ref) => {
  const [clientService, setClientService] = useState(null);

  const clienServiceColumn = [
    { title: "Date of Establishment", dataIndex: "date", key: "date" },
    { title: "Office Available (Yes/No)", dataIndex: "officeAvailability", key: "officeAvailability" },
    { title: "Complaint’s Book available (Yes/No)", dataIndex: "bookAvailability", key: "bookAvailability" },
    { title: "Work plan available (Yes/No) ", dataIndex: "planAvailability", key: "planAvailability" },
    { title: "Schedule Officer Name", dataIndex: "officerName", key: "officerName" },
    { title: "Dedicated telephone number", dataIndex: "phone", key: "phone" }
  ];

  const clienServiceReportColumn = [
    { title: "Title of Report on activities", dataIndex: "report", key: "report" },
    { title: "Date of Report", dataIndex: "date", key: "date" },
    { title: "Attachments", dataIndex: "attachments", key: "attachments" }
  ];

  useEffect(() => {
    getClientServiceData();
  }, [year, districtId]);

  useImperativeHandle(ref, () => ({
      getData: () => ({
        clientService
      }),
  }));

  const getAttributeValue = (key, val) => {
    const attr = val?.attributes.find(attr => attr.displayName === key);
    return attr ? attr.value : "N/A";
  };

  const setClientServiceDataDisplay = (data, reports) => {
    const clientServiceTemp = [];
    const clientServiceReport = [];

    let fulfillment = "Not Fulfilled";

    if (data?.length > 0) {
      data.forEach((val, idx) => {

        const complaintLink = getFileLinkIfExist(reports, "fHGCEnkTRnW", val.trackedEntity);
        const workPlanLink = getFileLinkIfExist(reports, "RnjmtOxz2V5", val.trackedEntity);
        const reportLink = getFileLinkIfExist(reports, "TH0o7vTWcAy", val.trackedEntity);

        clientServiceTemp.push({
          key: idx,
          date: getAttributeValue("Established Date", val),
          officeAvailability: getAttributeValue("Office Available (Yes/No)", val) === "true" ? "YES" : "NO",
          officerName: getAttributeValue("Schedule Officer Name", val),
          phone: getAttributeValue("Dedicated Mobile Number", val),
          bookAvailability: complaintLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${complaintLink}&dataElementUid=fHGCEnkTRnW`} target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Commplaint Book
            </a>
          ) : (
            "Not Uploaded"
          ),

          planAvailability: workPlanLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${workPlanLink}&dataElementUid=RnjmtOxz2V5`} target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Work Plan
            </a>
          ) : (
            "Not Uploaded"
          )
        });

        const currentReport = reports.find(rep => rep.trackedEntity === val.trackedEntity);

        if (currentReport) {
          const dataReportSet = {
            report: "",
            date: "",
            attachments: reportLink ? (
            <a
              className="px-2 text-primary fw-bold text-decoration-underline"
              href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=TH0o7vTWcAy`} target="_blank"
              rel="noopener noreferrer"
              title="Click here to see the uploaded document"
            >
              View Report
            </a>
          ) : (
            "Not Uploaded"
          )
          }

          currentReport.dataValues.forEach(rep => {

            if (rep.dataElement === "EXpYmoD23TM") {
              dataReportSet.report = rep.value;
            }else if (rep.dataElement === "ISuGmawTpiF") {
              dataReportSet.date = rep.value;
            }
          });

          clientServiceReport.push(dataReportSet);
        }

      });
    }

    if (clientServiceTemp.length > 0 && clientServiceReport.length > 0) {
      fulfillment = "Fulfilled";
    }

    setClientService({ data: clientServiceTemp, fulfillment, report: clientServiceReport });
  };

  function getClientServiceData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=GciA0HJcRzN`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=GciA0HJcRzN&orgUnit=${districtId}`)
            .then(resp => {
              setClientServiceDataDisplay(result.data.instances, resp.data.instances);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("decisions error ", err));
  }

  return (
    <Comment
      data={clientService}
      year={year}
      districtId={districtId}
      tableCommentedId={`c4.0-4.1-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 4.0 Transparency, Accountability & Participation - 4.1 Functionality of Client Service Unit (CSU) </Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD receive information on the Client Service Unit:<br /><br />
            <ol>
              <li type="i">
                If the Client Service Unit has been established with a schedule officer,
                dedicated telephone number, and is functional; and
              </li>
              <li type="i" className="py-1">
                If there is a report on activities of the Client Service Unit.
              </li>
            </ol>

            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: clientService?.fulfillment === "Fulfilled" ? "green" : "red" }}>{clientService?.fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          {/* {JSON.stringify(clientService)} */}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Establishment of Client Service Unit</Title>
          {clientService && <Table columns={clienServiceColumn} dataSource={clientService?.data} pagination={false} bordered />}
          <br />
          {/* <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title> */}
          {clientService && <Table columns={clienServiceReportColumn} dataSource={clientService?.report} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default ClientServiceFunctionality;