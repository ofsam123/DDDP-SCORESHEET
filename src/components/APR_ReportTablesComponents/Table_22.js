import React from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";

// Table22 Component
const Table_22 = ({ year, district }) => {
  const tableData = [
    {
      tool: "Community Scorecard",
      policyProgramme: "Evaluation of the Construction and Functionality of a School Block at Kromase Block",
      consultants: "MPCU",
      methodology: "• Site inspection and assessment of school infrastructure\n• Interviews with teachers, students, and community members\n• Development of the input tracking scorecard\n• Service provider self-evaluation scorecard",
      findings: "• The school block is structurally sound and in good condition\n• Adequate furniture is available for students, but some desks are in need of repair\n• There is no staff common room or office space for teachers\n• The school lacks a reliable water supply facility",
      recommendations: "• Repair or replace damaged desks and furniture\n• Provide a staff common room and office space for teachers\n• Supply additional teaching and learning materials to enhance education delivery\n• Install a reliable water supply system"
    },
    {
      tool: "Community Scorecard",
      policyProgramme: "Evaluation of Construction and Functionality of a School Block at Tutukpene, Bunga and Nawor Communities",
      consultants: "MPCU",
      methodology: "• Site inspection and assessment of school infrastructure\n• Interviews with teachers, students, and community members\n• Development of the input tracking scorecard\n• Service provider self-evaluation scorecard",
      findings: "• The school lacks a water supply facility",
      recommendations: "• Extend the use of community scorecards to monitor educational infrastructure delivery and improvements"
    },
    {
      tool: "Transect Walk",
      policyProgramme: "Community Led Total Sanitation in Tutukpene, Alokpatsa, Bunga and Portipor Communities",
      consultants: "Environmental Health Unit",
      methodology: "• Transect walk – Community Mapping\n• Conduct of an interface meeting between community and the Assembly",
      findings: "• A number of sites were discovered in each of the three communities where human excreta, rubbish and other forms of filth were deposited",
      recommendations: "• A number of sites were discovered in each of the three communities where human excreta, rubbish and other forms of filth were deposited"
    }
  ];

  return (
    <div className="col-12">
      <h3>Table 22: Update on Participatory Monitoring and Evaluation (PM&E) tools used</h3>
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
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Name of PM&E Tool</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Policy/Programme/Project Involved</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Consultants or Resources Involved</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Methodology</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Findings</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.tool}</td>
                    <td style={{ border: '1px solid #000' }}>{row.policyProgramme}</td>
                    <td style={{ border: '1px solid #000' }}>{row.consultants}</td>
                    <td style={{ border: '1px solid #000' }}><p>{row.methodology}</p></td>
                    <td style={{ border: '1px solid #000' }}><p>{row.findings}</p></td>
                    <td style={{ border: '1px solid #000' }}><p>{row.recommendations}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: {year} Progress Reports</small>
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