import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Layout, Typography, Table, Col } from "antd";
import Comment from "../components/Comments";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SubStructureMeeting = forwardRef(({ data, columns, establishment, establishmentColumns, revenueSharing, revenuSharingColumns, districtId, year, hideComment }, ref) => {
  const [fulfillment, setFulfillment] = useState(data?.fulfillment);

  // Transform link fields (firstLink, secondLink, thirdLink) into JSX elements
  const transformLinks = (item) => {
    if (!item) return item;
    return {
      ...item,
      firstLink: item.firstLink && typeof item.firstLink === "object" && item.firstLink?.props?.href ? (
        <a
          href={item.firstLink.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.firstLink.props.children || "View Document"}
        </a>
      ) : typeof item.firstLink === "string" ? (
        item.firstLink
      ) : (
        "N/A"
      ),
      secondLink: item.secondLink && typeof item.secondLink === "object" && item.secondLink?.props?.href ? (
        <a
          href={item.secondLink.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.secondLink.props.children || "View Document"}
        </a>
      ) : typeof item.secondLink === "string" ? (
        item.secondLink
      ) : (
        "N/A"
      ),
      thirdLink: item.thirdLink && typeof item.thirdLink === "object" && item.thirdLink?.props?.href ? (
        <a
          href={item.thirdLink.props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 text-primary fw-bold text-decoration-underline"
        >
          {item.thirdLink.props.children || "View Document"}
        </a>
      ) : typeof item.thirdLink === "string" ? (
        item.thirdLink
      ) : (
        "N/A"
      ),
    };
  };

  // Transform data for substructure meetings (data.data and subMeeting)
  const transformSubStructureData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map(transformLinks);
  };

  // Transform establishment data (handle any React element objects)
  const transformEstablishmentData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map((item) => ({
      ...item,
      // Add transformations for any establishment fields if needed
    }));
  };

  // Transform revenue sharing data (handle name, collected, ceded, percentage)
  const transformRevenueSharingData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map((item) => ({
      ...item,
      name: item.name && typeof item.name === "object" && item.name?.props?.children ? (
        item.name.props.children
      ) : typeof item.name === "string" ? (
        item.name
      ) : (
        "N/A"
      ),
      collected: item.collected && typeof item.collected === "object" && item.collected?.props?.children ? (
        item.collected.props.children
      ) : typeof item.collected === "string" || typeof item.collected === "number" ? (
        item.collected
      ) : (
        "N/A"
      ),
      ceded: item.ceded && typeof item.ceded === "object" && item.ceded?.props?.children ? (
        item.ceded.props.children
      ) : typeof item.ceded === "string" || typeof item.ceded === "number" ? (
        item.ceded
      ) : (
        "N/A"
      ),
      percentage: item.percentage && typeof item.percentage === "object" && item.percentage?.props?.children ? (
        item.percentage.props.children
      ) : typeof item.percentage === "string" || typeof item.percentage === "number" ? (
        item.percentage
      ) : (
        "N/A"
      ),
    }));
  };

  // Compute fulfillment based on data, establishment, and revenueSharing
  useEffect(() => {
    if (!data) {
      setFulfillment("Not Fulfilled");
      return;
    }

    let computedFulfillment = data.fulfillment || "Not Fulfilled";
    if (data.fulfillment === "Fulfilled" && data.subMeeting?.length !== establishment?.length) {
      computedFulfillment = "Not Fulfilled";
    }
    if (revenueSharing?.fulfillment === "Not Fulfilled") {
      computedFulfillment = "Not Fulfilled";
    }
    setFulfillment(computedFulfillment);
  }, [data, establishment, revenueSharing]);

   useImperativeHandle(ref, () => ({
      getData: () => ({
        indicator: "CI1",
        area: "General Assembly Meetings and Approvals",
        data,
        establishment,
        revenueSharing,
        fulfillment
      }),
    }));

  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c1.0-1.3-${year}`}
      hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 1.0 General Assembly Meetings and Approvals - 1.3 Meetings of the Substructures</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>
          <Content>
            From the District Coordinating Director, receive information on the activities or operations of
            the established substructures (SubMetros/ Urban/ Town/ Area/ Zonal Councils) of the Assembly:<br /><br />
            <ol>
              <li type="i">
                If each of the substructures established by the Assembly held at least one (1) Meeting
                prior to each of the three mandatory Ordinary Meetings of the General Assembly; and
              </li>
              <li type="i" className="py-1">
                If records exist on their establishment, staffing and ceding of 50% of revenue collected, for
                all the established substructures.
              </li>
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Col align="start">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: fulfillment === "Fulfilled" ? "green" : "red" }}>{fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Col>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of meetings of sub-structures prior to General Annual Meeting</Title>
          {data?.data ? (
            <Table
              columns={columns}
              dataSource={transformSubStructureData(data.data.concat(data.subMeeting || []))}
              pagination={false}
              bordered
              rowKey={(record, index) => `${record.key || index}`}
            />
          ) : (
            <Text>No substructure meeting data available</Text>
          )}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of establishment of sub-structures</Title>
          {establishment ? (
            <Table
              columns={establishmentColumns}
              dataSource={transformEstablishmentData(establishment)}
              pagination={false}
              bordered
              rowKey={(record, index) => `${record.key || index}`}
            />
          ) : (
            <Text>No establishment data available</Text>
          )}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of revenue sharing</Title>
          {revenueSharing?.data ? (
            <Table
              columns={revenuSharingColumns}
              dataSource={transformRevenueSharingData(revenueSharing.data)}
              pagination={false}
              bordered
              rowKey={(record, index) => `${index}`}
            />
          ) : (
            <Text>No revenue sharing data available</Text>
          )}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
})

export default SubStructureMeeting;