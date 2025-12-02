import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import APRmemo from "./APRComment.js/APRmemo";
import APRComment from "./APRComment.js/AprComments";
import axios from "../../api/axios";
import { getAttributeValue } from "../../utils/utils";

const Table_13 = forwardRef(({ year, district, period, hideTableDis }, ref) => {  // Default year for source; can be passed as prop if needed
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [district, year, period]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      indicator: "Table_13",
      tableData
    }),
  }));

  function getData() {
    axios
      .get(`/tracker/trackedEntities?orgUnit=${district}&program=IhERRdqHsFi&startDate=${year}-01-01&endDate=${year}-12-31&pageSize=5000`)
      .then(result => {

        const data = result.data.instances;

        const temp = [];

        data.forEach(val => {
          const capex = getAttributeValue("CAPEX throw Forward", val);
          const mtbf = getAttributeValue("MTBF (Ceilings)", val);
          const variation = parseFloat(capex) - parseFloat(mtbf);

          temp.push({
            item: "CAPEX throw Forward",
            amount: capex
          });

          temp.push({
            item: "MTBF (Ceilings)",
            amount: mtbf
          });

          temp.push({
            item: "Variation",
            amount: variation
          });
        });

        setTableData(temp);


      })
      .catch(err => console.log(err))
  };


  return (
    <div className="col-12">
      <h3>Table 13: Cumulative CAPEX Throw Forward and MTBF Envelope, 2025-2027</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table13-${year}`}
            hideTableDis={hideTableDis}

          />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#d4edda', fontWeight: 'bold', border: '1px solid #000' }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Item</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000' }}>{row.item}</td>
                    <td style={{ border: '1px solid #000' }}>{row.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: Composite Budget, {year}</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table13-${year}`}

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
});

export default Table_13;