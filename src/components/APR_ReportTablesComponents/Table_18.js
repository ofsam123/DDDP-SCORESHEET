import React, { useEffect, useState } from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import axios from "../../api/axios";
import { getAttributeValue } from "../../utils/utils";

const staffStrengths = [
  { department: "Central Administration", minimum: 111, maximum: 156, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Human Resource", minimum: 3, maximum: 4, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Statistics", minimum: 3, maximum: 5, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Social Welfare and Community Development", minimum: 10, maximum: 13, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Works", minimum: 57, maximum: 84, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Finance", minimum: 28, maximum: 45, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Birth and Death", minimum: 2, maximum: 5, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Physical Planning", minimum: 17, maximum: 24, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Agriculture", minimum: 52, maximum: 78, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Trade and Industry", minimum: 12, maximum: 22, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Transport", minimum: 9, maximum: 11, actual: 0, percentCovered: 0, trainingRequired: "" },
  { department: "Total", minimum: 304, maximum: 447, actual: 0, percentCovered: 0, trainingRequired: "" }
];

// Table18 Component
const Table_18 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=AJDfCnHCQ2j&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        const data = result.data.instances;
        const members = [];

        data.forEach(m => {
          const fullName = `${getAttributeValue("First Name", m)} ${getAttributeValue("Last Name", m)}`
          members.push({
            name: fullName,
            department: getAttributeValue("Department", m),
            gender: getAttributeValue("Sex", m)
          })
        });

        // Step 1: count members per department
        const counts = members.reduce((acc, { department }) => {
          acc[department] = (acc[department] || 0) + 1;
          return acc;
        }, {});

        // Step 2: update staffStrengths with actual & percentCovered (skip Total for now)
        let updatedStaffStrengths = staffStrengths.map(item => {
          if (item.department === "Total") return item; // skip for now
          const actual = counts[item.department] || 0;
          const percentCovered = item.minimum > 0 ? (actual / item.minimum) * 100 : 0;
          return {
            ...item,
            actual,
            percentCovered: percentCovered.toFixed(2)
          };
        });

        // Step 3: calculate totals
        const totalActual = updatedStaffStrengths
          .filter(item => item.department !== "Total")
          .reduce((sum, item) => sum + item.actual, 0);

        updatedStaffStrengths = updatedStaffStrengths.map(item => {
          if (item.department === "Total") {
            const percentCovered = item.minimum > 0 ? (totalActual / item.minimum) * 100 : 0;
            return {
              ...item,
              actual: totalActual,
              percentCovered: percentCovered.toFixed(2)
            };
          }
          return item;
        });

        // const goupBySector = groupProjectsBySectorAmountWithoutBudget(projectDetails, sectors, year);

        setTableData(updatedStaffStrengths);


      })
      .catch(err => console.log(err))
  };

  return (
    <div className="col-12">
      <h3>Table 18: Staff Strengths</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table18-${year}`}

          />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Department</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Maximum Required</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Minimum Required</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual {year}</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>% Covered</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Training Required</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.maximum}</td>
                    <td style={{ border: '1px solid #000' }}>{row.minimum}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.percentCovered}</td>
                    <td style={{ border: '1px solid #000' }}>{row.trainingRequired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year} HRMIS Reports</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table18-${year}`}

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

export default Table_18;