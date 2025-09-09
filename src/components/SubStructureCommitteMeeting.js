import { Layout, Typography, Table, Row } from "antd";
import Comment from "../components/Comments";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { getAttributeValue } from "../utils/utils";

const { Header, Content } = Layout;
const { Title } = Typography;

function SubStructureCommiteeMeeting({ data, year, columns, memberColumns, districtId, meetingColumns,hideComment }) {

  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    getMemebers();
  }, [year, districtId])

  function getMemebers() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${districtId}&program=NdogHaFyDuI`)
      .then(result => {

        const data = result.data.instances;
        const temp = [];

        data.forEach((item, index) => {
          const dataState = {
            no: index + 1,
            name: getAttributeValue("Name", item),
            type: getAttributeValue("Assembly Member Type", item),
            department: getAttributeValue("Sub Statutory Committee Department", item),
          };

          temp.push(dataState);
        });

        // const tempMembers = temp.reduce((acc, { department, key, name, type }) => {
        //   // look for existing department in array
        //   let dept = acc.find(d => d.department === department);

        //   if (!dept) {
        //     // create new department entry
        //     dept = { department, count: 0, staff: [] };
        //     acc.push(dept);
        //   }

        //   // add member to this department
        //   dept.staff.push({ key, name, type });
        //   dept.count++;

        //   return acc;
        // }, []);

        const departmentCounts = Object.values(
          temp.reduce((acc, { department }) => {
            if (!acc[department]) {
              acc[department] = { department, count: 0 };
            }
            acc[department].count++;
            return acc;
          }, {})
        ).map((dept, index) => ({
          key: index + 1, // unique key number
          ...dept
        }));


        // console.log("Djiba statutory formatted members: ", temp);

        setDepartments(departmentCounts);
        setMembers(temp);


      })
      .catch(err => console.log(err))
  }
  return (
    <Comment
      data={data}
      year={year}
      districtId={districtId}
      tableCommentedId={`c2.0-2.2-${year}`}
       hideComment={hideComment}
    >
      {({ renderCommentInput, renderCommentList }) => (
        <>
          <Title level={3}>CI 2.0 Functionality of Statutory & Mandatory Organs of the Assembly - 2.2 Meetings of the Sub-Committees of the Assembly</Title>
          <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/Requirement</Title>
          <Content>
            From the DCD receive and confirm the composition, attendance,
            and minutes of the meetings of the five Statutory Sub-Committees in <strong>{year}</strong>.<br /><br />
            <ol>

              <li type="i">
                If each of the 5 Statutory Sub-committees held at least one meeting prior to each of the three meetings of the EC/A in 2024 and minutes
                are recorded and signed by both the secretary and the chairperson of sub-committees
              </li>
            </ol>
            <i>Then the CI is fulfilled</i>
          </Content>

          <Row align="middle">
            <Title level={5} style={{ marginTop: "20px", marginRight: "20px", marginLeft: "10px" }}>
              CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red" }}>{data?.fulfillment}</strong>
            </Title>
            {!hideComment && renderCommentInput()}
          </Row>

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of Sub-Committee meetings held prior to EC/A meetings</Title>
          {data && <Table columns={meetingColumns} dataSource={data?.data} pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Evidence of composition of sub-committees – Summary</Title>
          {departments && <Table columns={columns} dataSource={departments} pagination={false} bordered />}

          <Title level={4} style={{ marginTop: "20px" }}>Membership of  Statutory Sub-Committees</Title>
          {members && <Table columns={memberColumns} dataSource={members} pagination={false} bordered />}

          {renderCommentList()}
        </>
      )}
    </Comment>
  );
}

export default SubStructureCommiteeMeeting;