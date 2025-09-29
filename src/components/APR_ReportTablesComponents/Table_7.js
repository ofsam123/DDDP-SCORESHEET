
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue, getDataByTypes } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";


const Table_7 = ({ year, district, period,hideTableDis }) => {

  const [tableData, setTableData] = useState([]);

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
              const maintenance = [
                "Rehabilitation", "Extension", "Spot", "Improvement", "Spot Improvement"
              ]
              const maintenanceProjects = getDataByTypes(data, "Project Focus", maintenance) || [];

              const reports = resp.data.instances;
              const temp = [];

              projects.forEach((project, idx) => {

                const currentReport = reports.filter(rep => rep.trackedEntity === project.trackedEntity);
                let observation = "";
                let expenditure = 0;

                if (currentReport) {

                  currentReport.forEach(curReport => {
                    curReport.dataValues.forEach(rep => {
                      if (rep.dataElement === "tprVkQQg1wm") {
                        observation = rep.value;
                      }

                      if (rep.dataElement === "jr8gk707kAw") {
                        expenditure = rep.value;
                      }

                    });
                  })

                }

                const estimatedCost = getAttributeValue("Estimated Cost", project);
                const actualReleased = getAttributeValue("Actual Released", project);

                const dataSetTemp = {
                  no: idx + 1,
                  description: getAttributeValue("Description", project),
                  location: getAttributeValue("Location", project),
                  maintenance: getAttributeValue("Project Focus", project),
                  estimatedCost: getAttributeValue("Estimated Cost", project),
                  actualReleased: getAttributeValue("Actual Released", project),
                  gap: parseFloat(estimatedCost) - parseFloat(actualReleased),
                  expenditure,
                  observation
                };

                temp.push(dataSetTemp);
              });

              setTableData(temp);

            })
            .catch(err => console.log(err))
        }


      })
      .catch(err => console.log(err))
  };


  return (
    <div className="col-12">
      <h3>Table 7 - Repair and maintenance of Existing Infrastructure</h3>
      <div className="card">
        <div className="card-header">

        </div>
        <div className="card-body">
             <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table6-${year}`}
              hideTableDis={hideTableDis}

          />

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>S/N</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Asset/Infrastructure</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Location</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Type of Maintenance</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Estimated Cost</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}> Actual Release</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Gap </th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Expenditure </th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Recommendation </th>
                </tr>
                
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                   
                    <td style={{ border: '1px solid #000' }}>{row.no}</td>
                    <td style={{ border: '1px solid #000' }}>{row.description}</td>
                    <td style={{ border: '1px solid #000' }}>{row.location}</td>
                    <td style={{ border: '1px solid #000' }}>{row.maintenance}</td>
                    <td style={{ border: '1px solid #000' }}>{row.estimatedCost}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualReleased}</td>
                    <td style={{ border: '1px solid #000' }}>{row.gap}</td>
                    <td style={{ border: '1px solid #000' }}>{row.expenditure}</td>
                    <td style={{ border: '1px solid #000' }}>{row.observation}</td>
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
                      tableCommentedId={`table7-${year}`}
          
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

export default Table_7;
