import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table19 Component
const Table_19 = ({ year, district }) => {
  const tableData = [
    {
      department: "Agriculture",
      trainingPrograms: 5,
      participants: 45,
      male: 25,
      female: 20,
      durationDays: 10
    },
    {
      department: "Central Administration",
      trainingPrograms: 3,
      participants: 30,
      male: 15,
      female: 15,
      durationDays: 7
    },
    {
      department: "Education, Youth and Sports",
      trainingPrograms: 8,
      participants: 120,
      male: 60,
      female: 60,
      durationDays: 14
    },
    {
      department: "Environmental Health",
      trainingPrograms: 2,
      participants: 18,
      male: 10,
      female: 8,
      durationDays: 5
    },
    {
      department: "Finance",
      trainingPrograms: 4,
      participants: 24,
      male: 12,
      female: 12,
      durationDays: 8
    },
    {
      department: "Health",
      trainingPrograms: 6,
      participants: 72,
      male: 30,
      female: 42,
      durationDays: 12
    },
    {
      department: "Human Resource",
      trainingPrograms: 2,
      participants: 10,
      male: 4,
      female: 6,
      durationDays: 4
    },
    {
      department: "Physical Planning",
      trainingPrograms: 3,
      participants: 15,
      male: 8,
      female: 7,
      durationDays: 6
    },
    {
      department: "Social Welfare and Community Development",
      trainingPrograms: 4,
      participants: 32,
      male: 12,
      female: 20,
      durationDays: 9
    },
    {
      department: "Works",
      trainingPrograms: 3,
      participants: 27,
      male: 15,
      female: 12,
      durationDays: 7
    },
    {
      department: "Total",
      trainingPrograms: 40,
      participants: 393,
      male: 191,
      female: 202,
      durationDays: 82
    }
  ];

  return (
    <div className="col-12">
      <h3>Table 19: Capacity Development</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                      tableCommentedId={`table19-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Department</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Training Programs</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Participants</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Male</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Female</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Duration (Days)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.trainingPrograms}</td>
                    <td style={{ border: '1px solid #000' }}>{row.participants}</td>
                    <td style={{ border: '1px solid #000' }}>{row.male}</td>
                    <td style={{ border: '1px solid #000' }}>{row.female}</td>
                    <td style={{ border: '1px solid #000' }}>{row.durationDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year} Training Reports</small>
          </p>
           <APRComment
                                data={tableData}
                                year={year}
                                districtId={district}
                                tableCommentedId={`table19-${year}`}
                               
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

export default Table_19