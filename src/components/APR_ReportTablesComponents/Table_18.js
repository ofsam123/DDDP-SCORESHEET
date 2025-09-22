import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table18 Component
const Table_18 = ({ year, district }) => {
  const tableData = [
    {
      department: "Agriculture",
      staffStrength: 24,
      male: 14,
      female: 10,
      vacantPosts: 4
    },
    {
      department: "Central Administration",
      staffStrength: 37,
      male: 19,
      female: 18,
      vacantPosts: 3
    },
    {
      department: "Education, Youth and Sports",
      staffStrength: 614,
      male: 312,
      female: 302,
      vacantPosts: 48
    },
    {
      department: "Environmental Health",
      staffStrength: 19,
      male: 14,
      female: 5,
      vacantPosts: 2
    },
    {
      department: "Finance",
      staffStrength: 12,
      male: 6,
      female: 6,
      vacantPosts: 1
    },
    {
      department: "Health",
      staffStrength: 102,
      male: 38,
      female: 64,
      vacantPosts: 10
    },
    {
      department: "Human Resource",
      staffStrength: 5,
      male: 2,
      female: 3,
      vacantPosts: 0
    },
    {
      department: "Physical Planning",
      staffStrength: 7,
      male: 4,
      female: 3,
      vacantPosts: 1
    },
    {
      department: "Social Welfare and Community Development",
      staffStrength: 13,
      male: 5,
      female: 8,
      vacantPosts: 2
    },
    {
      department: "Works",
      staffStrength: 16,
      male: 12,
      female: 4,
      vacantPosts: 2
    },
    {
      department: "Total",
      staffStrength: 849,
      male: 426,
      female: 423,
      vacantPosts: 73
    }
  ];

  return (
    <div className="col-12">
      <h3>Table 18: Staff Strengths</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
             <APRmemo
                    year={year}
                    districtId = {district}
                    tableCommentedId={`table18-${year}`}
                   
                  />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Department</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Staff Strength</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Male</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Female</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Vacant Posts</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.department}</td>
                    <td style={{ border: '1px solid #000' }}>{row.staffStrength}</td>
                    <td style={{ border: '1px solid #000' }}>{row.male}</td>
                    <td style={{ border: '1px solid #000' }}>{row.female}</td>
                    <td style={{ border: '1px solid #000' }}>{row.vacantPosts}</td>
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