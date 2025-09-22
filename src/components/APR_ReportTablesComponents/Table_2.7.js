
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { filterTrackedEntitiesByCreatedAt, formatDataGeneral, getAttributeValue } from "../../utils/utils";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

const Table2_7 = ({ year, district, period }) => {
  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getData();
  }, [year, district, period]);

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=g27TeeehRQC&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        if (result.data.instances.length > 0) {
         

          axios
            .get(`/tracker/events?program=g27TeeehRQC&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
            .then(resp => {

              // const resultConverted = filterTrackedEntitiesByCreatedAt(resp.data.instances, startDate, endDate);

              const data = formatDataGeneral(result.data.instances, "Type", "Public") || [];
              const reports = filterTrackedEntitiesByCreatedAt(resp.data.instances, year, period);
              const enrolmentReports = reports.filter(rep => rep.programStage === "aZJXKk3l5Jv");

              const temps = [];

              data.forEach((item, idx) => {

                const currentReport = enrolmentReports.find(rep => rep.trackedEntity === item.trackedEntity);
                let boysEnrolment = 0;
                let girlsEnrolment = 0;
                let caterer = "";

                if (currentReport) {

                  currentReport.dataValues.forEach(rep => {
                    if (rep.dataElement === "jMGqg7AZ4FP") {
                      boysEnrolment = parseFloat(rep.value);
                    } else if (rep.dataElement === "CL5bvBCWxa5") {
                      girlsEnrolment = parseFloat(rep.value);
                    } else if (rep.dataElement === "D2lKlScVJJG") {
                      caterer = rep.value;
                    }
                  });

                }

                const dataSetTemp = {
                  no: idx + 1,
                  school: getAttributeValue("Name of School", item),
                  caterer,
                  boysEnrolment,
                  girlsEnrolment
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
      <h3>Table 2.7 – Details of beneficiary schools and corresponding enrolment figures</h3>
      <div className="card">

        <div className="card-header"></div>

        <div className="card-body">
          <h5> Ghana School Feeding Programme</h5>
          The School Feeding programme is also operating effectively in the Municipality. Thirtyfour (34) schools in the municipality are benefiting from the programme. The total
          enrolment for the programme currently stands at 12,401 made up of 6,318 boys and
          6,005 girls. The programme has improved retention rate hence contributing to the SDG4.
          It however has the challenge of delay payment of caterers which in effect has resulted in
          non-cooking of meals. Table 2.7 shows details of beneficiary schools and corresponding
          enrolment figures.

          <APRmemo
                    year={year}
                    districtId = {district}
                        tableCommentedId={`table2_7-${year}`}
                   
                  />
          <div className="table-responsive" style={{ marginTop: '20px' }}>
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No.</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>School</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Name of Caterer</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Enrolment Boys</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Enrolment Girls</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Total Enrolment Figure</th>
                </tr>
              </thead>
              {tableData && <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.no}</td>
                    <td style={{ border: '1px solid #000' }}>{row.school}</td>
                    <td style={{ border: '1px solid #000' }}>{row.caterer}</td>
                    <td style={{ border: '1px solid #000' }}>{row.boysEnrolment}</td>
                    <td style={{ border: '1px solid #000' }}>{row.girlsEnrolment}</td>
                    <td style={{ border: '1px solid #000' }}>{parseInt(row.boysEnrolment) + parseInt(row.girlsEnrolment)}</td>
                  </tr>
                ))}
              </tbody>}
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
              <APRComment
               data={tableData}
               year={year}
               districtId={district}
              tableCommentedId={`table2_7-${year}`}
                     
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

export default Table2_7;
