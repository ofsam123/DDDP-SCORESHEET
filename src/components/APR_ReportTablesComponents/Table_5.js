
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import moment from "moment";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

const departments = [
  "Central Administration",
  "Education, Youth and Sports",
  "Health", "Human Resources",
  "Urban Roads",
  "Works",
  "N/A"
];

const Table_5 = ({ year, district, period,   hideTableDis }) => {

  const [tableData, setTableData] = useState([]);
  const [tableDataDummy, setTableDataDummy] = useState([]);

  useEffect(() => {
    getProjects();
  }, [year, district, period]);

  function getProjects() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g3wMUKEMmH3&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=g3wMUKEMmH3&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {
              const data = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);
              const projects = formatDataGeneral(data, "Project & Programme Type", "Project") || [];
              const reports = resp.data.instances;
              const currentDate = moment().format('MMMM Do YYYY');
              const temp = [];

              projects.forEach((project, idx) => {

                const currentReport = reports.filter(rep => rep.trackedEntity === project.trackedEntity);
                let projectStatus = "";

                if (currentReport) {

                  currentReport.forEach(curReport => {
                    curReport.dataValues.forEach(rep => {
                      if (rep.dataElement === "tE3QKB203nh") {
                        projectStatus = rep.value;
                      }

                    });
                  })

                }

                const dataSetTemp = {
                  no: idx + 1,
                  expectedStart: getAttributeValue("Expected Start Date", project),
                  expectedCompletion: getAttributeValue("Expected Completion Date", project),
                  department: getAttributeValue("Department", project),
                  collaboratingDepartments: getAttributeValue("Collaborating Department", project),
                  projectStatus
                };

                temp.push(dataSetTemp);
              });

              setTableDataDummy(temp);

             const dataGrouped =  groupDataByDepartments(temp);

              setTableData(dataGrouped);


            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  };

  const groupDataByDepartments = (projects) => {

    const grouped = {};
    const temp = [];

    departments.forEach(dep => {
      const departmentProjects = projects.filter(
        project => project.department && project.department.includes(dep)
      );

      let rolloverCounter = 0;
      let newCounter = 0;
      let collaboratingDep = "";

      departmentProjects.forEach(p=>{
        if(p.expectedStart.includes(year)){
          newCounter += 1;
          collaboratingDep += p.collaboratingDepartments !== 'N/A' ? `${p.collaboratingDepartments}, ` : ""
        }

        if(!p.expectedStart.includes(year)){
          const projectYear = new Date(p.expectedCompletion).getFullYear();
          if((projectYear < year) && !p.projectStatus.includes("Completed")){
            rolloverCounter += 1;
            collaboratingDep += p.collaboratingDepartments !== 'N/A' ? `${p.collaboratingDepartments}, ` : ""
          }
        }

        
      });

      grouped[dep] = departmentProjects;
      const tempDataSet = {
        department: dep,
        rollover: rolloverCounter,
        new: newCounter,
        totalProjects: parseInt(rolloverCounter) + parseInt(newCounter),
        collaboratingDepartment: collaboratingDep
      };

      temp.push(tempDataSet);

    });

    let newTotal = 0;
    let rolloverTotal = 0;

    temp.forEach(tp=>{
      newTotal += tp.new;
      rolloverTotal += tp.rollover
    });

    const total = {
       department: <strong>Total</strong> ,
        rollover: <strong>{rolloverTotal}</strong>,
        new: <strong>{newTotal}</strong> ,
        totalProjects: <strong>{parseInt(rolloverTotal) + parseInt(newTotal)}</strong>,
        collaboratingDepartment:""
    };

    temp.push(total);

    return temp;
  }

  return (
    <div className="col-12">
      <h3>Table 5 – Distribution of Physical projects among departments of the Assembly</h3>
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
          {/* {JSON.stringify(tableDataDummy)} */}

          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table5-${year}`}
              hideTableDis={hideTableDis}

          />

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Departments</th>
                  <th colSpan="2" style={{ border: '1px solid #000', fontWeight: 'bold' }}>No. of projects</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Collaborating Department</th>
                </tr>
                <tr>
                  {/* <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th> */}
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Rollover</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>New</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.rollover}</td>
                    <td style={{ border: '1px solid #000' }}>{row.new}</td>
                    <td style={{ border: '1px solid #000' }}>{row.totalProjects}</td>
                    <td style={{ border: '1px solid #000' }}>{row.collaboratingDepartment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>

          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table5-${year}`}

          >
            {({ renderCommentInput, renderCommentList }) => (
              <>
                {renderCommentInput()}
                {renderCommentList()}
              </>
            )}
          </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table_5;
