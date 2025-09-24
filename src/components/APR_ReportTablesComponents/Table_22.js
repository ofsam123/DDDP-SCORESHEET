
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

const Table_22 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getData();
  }, [year, district, period]);

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=UfMl96n7nnX&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {

        if (result.data.instances.length > 0) {
          

          axios
            .get(`/tracker/events?program=UfMl96n7nnX&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {

              const dataProcessed = filterTrackedEntitiesByCreatedAt(result.data.instances, year, period);

              const data = formatDataGeneral(dataProcessed, "Evaluation Type", "Participatory Monitoring Evaluation") || [];
              const reports = resp.data.instances;


              const temps = [];

              data.forEach((item, idx) => {

                const findings = `${getAttributeValue("Findings PME", item)}`;

                const dataSetTemp = {
                  no: idx + 1,
                  name: getAttributeValue("Evaluation Name", item),
                  policy: getAttributeValue("Policy/Programme/ project involved", item),
                  consultant: getAttributeValue("Consultant or resource persons involved", item),
                  methodology: getAttributeValue("Methodology used", item),
                  findings,
                  recommendations: getAttributeValue("Recommendations", item)
                };

                temps.push(dataSetTemp);
              });

              setTableData(temps);


            })
            .catch(err => console.log(err))
        }

      })
      .catch(err => console.log(err))
  }


  return (
    <div className="col-12">
      <h3>Table 22 – UPDATE ON  PARTICIPATORY  MONITORING AND  EVALUATION  (PM&E) TOOLS USED</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
                    year={year}
                    districtId = {district}
                      tableCommentedId={`table22-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Name of the PM&E Tool</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Policy/Programme/Project Involved</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Consultant or Resource Persons Involved</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Methodology Used</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Findings</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.name}</td>
                    <td style={{ border: '1px solid #000' }}>{row.policy}</td>
                    <td style={{ border: '1px solid #000' }}>{row.consultant}</td>
                    <td style={{ border: '1px solid #000' }}>{row.methodology}</td>
                    <td style={{ border: '1px solid #000' }}><p>{row.findings}</p></td>
                    <td style={{ border: '1px solid #000' }}>{row.recommendations}</td>
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
                      tableCommentedId={`table22-${year}`}
                     
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

export default Table_22;
