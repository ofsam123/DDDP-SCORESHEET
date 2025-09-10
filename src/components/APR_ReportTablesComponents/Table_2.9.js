import React, { useEffect, useState } from "react";
import { formatDataGeneral, getAttributeValue } from "../../utils/utils";
import axios from "../../api/axios";

import APRComment from "../APR_ReportTablesComponents/APRComments";

const Table2_9 = ({ year, district , period}) => {
  
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getData();
  }, [year, district]);

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=UfMl96n7nnX&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        if (result.data.instances.length > 0) {
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          axios
            .get(`/tracker/events?program=UfMl96n7nnX&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
            .then(resp => {
              const data = formatDataGeneral(result.data.instances, "Evaluation Type", "Evaluation") || [];

              const temps = [];

              data.forEach((item, idx) => {
                const findings = `${getAttributeValue("RELEVANCE", item)}
                                 ${getAttributeValue("EFFICIENCY", item)}
                                 ${getAttributeValue("EFFECTIVENESS", item)}
                                 ${getAttributeValue("IMPACT", item)}
                                 ${getAttributeValue("SUSTAINABILITY", item)}`;

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
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="col-12">
      <h3>Table 2.9 – Update on Evaluations Conducted</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Name of the Evaluation</th>
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
          {/* Integrate APRComment component */}
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId="Table2_9"
            hideComment={false}
          >
            {({ renderCommentInput, renderCommentList }) => (
              <div className="mt-4">
                {renderCommentInput()}
                {renderCommentList()}
              </div>
            )}
          </APRComment>
        </div>
      </div>
    </div>
  );
};

export default Table2_9;