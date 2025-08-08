
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { formatDataGeneral, getFileLinkIfExist } from "../../utils/utils";

const Appendix1 = ({ year, district }) => {
    const [tableData, setTableData] = useState("");

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
                            const reports = resp.data.instances

                            let participantList = "";

                            data.forEach((item, idx) => {
                                participantList = getFileLinkIfExist(reports, "J04b2RiJ4Eh", item.trackedEntity);

                            });

                            setTableData(participantList);


                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err))
    }

    const cellStyle = {
        border: "2px solid black",
        verticalAlign: "middle",
    };

    return (
        <div>
            <h3 className="mb-3 text-start">
                APPENDIX ONE (1): LIST OF SOME PARTICIPANTS OF THE MONITORING AND EVALUATION
            </h3>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-header"></div>
                <div className="card-body">
                    {tableData && <div>
                        <a
                            className="px-2 text-primary fw-bold text-decoration-underline"
                            href={`https://dddp.gov.gh/api/events/files?eventUid=${tableData}&dataElementUid=J04b2RiJ4Eh`} target="_blank"
                            rel="noopener noreferrer"
                            title="Click here to see the Approval minutes"
                        >
                            VIEW LIST OF PARTICIPANTS OF THE MONITORING AND EVALUATION
                        </a>
                    </div>}
                    <p className="mt-2">
                        <small>Source: MPCU</small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Appendix1;