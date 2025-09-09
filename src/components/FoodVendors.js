import { Layout, Table, Typography, Row } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "../api/axios";
import Comment from "../components/Comments";
import { getAttributeValue, getFileLinkIfExist } from "../utils/utils";

const FoodVendors = forwardRef(({
  year,
  districtId,
  hideComment
}, ref) => {
  const [scorei, setScorei] = useState(0);
  const [scoreii, setScoreii] = useState(0);
  const [scoreiii, setScoreiii] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [data, setData] = useState([]);
  const [foodVendors, setFoodVendors] = useState([]);

  const { Header, Content } = Layout;
  const { Title, Text } = Typography;

  useImperativeHandle(ref, () => ({
      getData: () => ({
        data,
        foodVendors,
        scorei,
        scoreii,
        scoreiii,
        percentage
      }),
    }));

  useEffect(() => {
    getFoodVendors();
  }, [year, districtId]);


  const calculatePercentage = (total, value) => {
    const totalNum = parseFloat(total);
    const valueNum = parseFloat(value);

    if (isNaN(totalNum) || isNaN(valueNum) || totalNum === 0) {
      return 0;
    }

    return ((valueNum / totalNum) * 100).toFixed(2);
  };

  function getFoodVendors() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=abiQOocP8YA`)
      .then(result => {
        if (result.data.instances.length > 0) {
          axios
            .get(`/tracker/events?program=abiQOocP8YA&orgUnit=${districtId}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const vendors = result.data.instances;
              const reports = resp.data.instances;
              let vendorTotal = vendors?.length;
              let screenedTotal = 0;
              let certificateTotal = 0;
              let reportAvailability = "NO";
              const foodTemp = [];

              vendors.forEach(vendor => {
                const currentReport = reports.find(rep => rep.trackedEntity === vendor.trackedEntity);
                const isScreened = getAttributeValue("DPAT | Is Food and beverage vendors screened?", vendor);
                const isCertified = getAttributeValue("DPAT | Is there a Health Certificate?", vendor);

                const reportLink = getFileLinkIfExist(reports, "TxE2hVHyNuG", vendor.trackedEntity);
                const certificateLink = getFileLinkIfExist(reports, "POdgz2rYh8H", vendor.trackedEntity);

                const tempDataSet = {
                  name: getAttributeValue("DCACT | Food Vendors - Name of vendor / Business", vendor),
                  phone: getAttributeValue("Phone", vendor),
                  tin: getAttributeValue("TIN", vendor),
                  card: getAttributeValue("Ghana Card Number", vendor),
                  location: getAttributeValue("Ghana Card Number", vendor),
                  report: reportLink ? (
                    <a
                      className="px-2 text-primary fw-bold text-decoration-underline"
                      href={`https://dddp.gov.gh/api/events/files?eventUid=${reportLink}&dataElementUid=TxE2hVHyNuG`} target="_blank"
                      rel="noopener noreferrer"
                      title="Click here to see the uploaded document"
                    >
                      View Report
                    </a>
                  ) : (
                    "Not Uploaded"
                  ),
                  certificate: certificateLink ? (
                    <a
                      className="px-2 text-primary fw-bold text-decoration-underline"
                      href={`https://dddp.gov.gh/api/events/files?eventUid=${certificateLink}&dataElementUid=POdgz2rYh8H`} target="_blank"
                      rel="noopener noreferrer"
                      title="Click here to see the uploaded document"
                    >
                      View Certificate
                    </a>
                  ) : (
                    "Not Uploaded"
                  ),
                };

                foodTemp.push(tempDataSet);

                if (isScreened === "true") {
                  screenedTotal++;
                }

                if (isCertified === "true") {
                  certificateTotal++;
                }

                if (currentReport) {
                  reportAvailability = "YES";
                }
              });

              const temp = {
                availabilty: vendorTotal > 0 ? "YES" : "NO",
                vendorTotal,
                screenedTotal,
                certificateTotal,
                reportAvailability
              }

              const percentage = calculatePercentage(screenedTotal, certificateTotal);

              setFoodVendors(foodTemp);

              setData([temp]);

              if (vendorTotal > 0) {
                setScorei(1);
              }

              setPercentage(percentage);
              if (percentage >= 80) {
                setScoreii(1)
              }

              if (reportAvailability === "YES") {
                setScoreiii(1);
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const foodVendorsColumn = [
    { title: "Register of Food and Beverage Vendors available", dataIndex: "availabilty", key: "availabilty" },
    { title: "Number of Food and Beverage Vendors registered", dataIndex: "vendorTotal", key: "vendorTotal" },
    {
      title: `Number of Food and Beverage Vendors screened for the ${year}`, dataIndex: "screenedTotal", key: "screenedTotal"
    },
    {
      title: `Number of screened vendors issued with certificates for ${year}`, dataIndex: "certificateTotal", key: "certificateTotal"
    },
    { title: "Availability of Monitoring Reports (Yes/No)", dataIndex: "reportAvailability", key: "reportAvailability" }
  ];

  const vendorsColumn = [
    { title: "Vendors", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "TIN", dataIndex: "tin", key: "tin" },
    { title: "Ghana Card", dataIndex: "card", key: "card" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Certificate", dataIndex: "certificate", key: "certificate" },
    { title: "Report", dataIndex: "report", key: "report" }
  ];

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`sdi5.0-5.3-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3} style={{ marginTop: "30px" }}>SDI 5.0 - 5.3 Monitoring and Issuance of Certificates
            to Food and Beverage Vendors</Title>
          <Title level={4} style={{ marginTop: "30px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the DCD, receive information on the operations of food and beverage vendors.<br /><br />
            <ol>
              <li type="i">
                If the District has a register of food and beverage vendors, score 1;
              </li>
              <li type="i" className="py-1">
                If the District has conducted screening (medical tests with reports provided) for food vendors and
                at least 80% of the screened food vendors were issued with certificates for the year {year}, score 1;
              </li>
              <li type="i" className="py-1">
                If there is evidence of monitoring and follow-up actions on food hygiene, etc., score 1.
              </li>
            </ol>
          </Content>

          <Title level={4} style={{ marginTop: "30px" }}>Maximum Score <strong>3</strong></Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 5.0-5.3i Actual Score: <strong>{scorei}</strong>
          </Title>
          <Title level={5} style={{ marginTop: "20px" }}>
            SDI 5.0-5.3ii Actual Score: <strong>{scoreii}</strong>
          </Title>
          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              SDI 5.0-5.3iii Actual Score: <strong>{scoreiii}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Registration & Screening of Food Vendors</Title>
          <Table
            columns={foodVendorsColumn}
            dataSource={data || []}
            pagination={false} bordered />

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Registration of Food Vendors</Title>
          <Table
            columns={vendorsColumn}
            dataSource={foodVendors}
            pagination={false} bordered />

          <Title level={5} style={{ marginTop: "20px" }}>Conclusion</Title>
          <p>
            {percentage}% of the screened food vendors were issued with certificates in {year}
          </p>

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default FoodVendors;