import React, { useEffect, useState } from 'react';
import './ReportCover.css';
import axios from '../../api/axios';
import { getAttributeValue } from '../../utils/utils';

const ReportCover = ({ district, year }) => {
    const [profile, setProfile] = useState("");

    useEffect(() => {
        if (district?.value) {
            getData();
        }
    }, [district]);

    async function getData() {
        try {
            const result = await axios.get(
                `/tracker/trackedEntities?orgUnit=${district.value}&program=RwWtjFaorvN`
            );

            const data = result.data.instances;
            if (data.length > 0) {
                const pictureAttr = getAttributeValue("District Logo", data[0]);

                if (pictureAttr) {
                    const imageResp = await axios.get(
                        `/trackedEntityInstances/${data[0].trackedEntity}/pPOoDG2bvmo/image`,
                        { responseType: "blob" }
                    );

                    const imgUrl = URL.createObjectURL(imageResp.data);
                    setProfile(imgUrl);
                }
            }
        } catch (err) {
            console.log("Error loading profile image", err);
        }
    }

    return (
        <div className="report-cover">
            <h1 className="title-top">{district.label}</h1>
            {profile && (
                <img
                    src={profile}
                    alt={`${district.label} Logo`}
                    className="logo"
                />
            )}
            <h1 className="title-bottom">{year} ANNUAL PROGRESS REPORT</h1>
        </div>
    );
};

export default ReportCover;
