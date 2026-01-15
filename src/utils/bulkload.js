// import { Descriptions } from "antd";

export const getBillingPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit, // from your existing variable
            trackedEntityType,
            attributes: [
                { attribute: "QUuxyqTen7u", value: row[4] === "-" ? "" : row[4] }, // serial number
                { attribute: "YfoGKu8N6An", value: row[6] === "-" ? "" : row[6] }, // date
                { attribute: "TBJZqGzKrLx", value: row[9] === "" ? "" : row[9] === "Yes" ? true : false }, // issued status 
                { attribute: "zud2JY8pPTV", value: row[10] === "-" ? "" : row[10] === "Yes" ? true : false },  // bill distribution status
                { attribute: "hQVox0xawJI", value: row[12] === "-" ? 0 : row[12] },  // bill amount

                { attribute: "spZ8K927Xvd", value: row[5] === "-" ? "" : row[5] },  // bill name
                { attribute: "LQLke1N578q", value: row[7] === "-" ? "" : row[7] },  // bill type
                { attribute: "Joaipq2dkMB", value: row[11] === "-" ? "" : row[11] },  // submission date
                { attribute: "FuOpGyKgvyG", value: row[13] === "-" ? "" : row[13] },  // purpose
                { attribute: "x4qBAYjalCD", value: row[14] === "-" ? "" : row[14] },  // remarks
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "QUuxyqTen7u", value: row[4] === "-" ? "" : row[4] }, // serial number
                        { attribute: "YfoGKu8N6An", value: row[6] === "-" ? "" : row[6] }, // date
                        { attribute: "TBJZqGzKrLx", value: row[9] === "-" ? "" : row[9] === "Yes" ? true : false }, // issued status 
                        { attribute: "zud2JY8pPTV", value: row[10] === "-" ? "" : row[10] === "Yes" ? true : false },  // bill distribution status
                        { attribute: "hQVox0xawJI", value: row[12] === "-" ? 0 : row[12] },  // bill amount

                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });


    return {
        "trackedEntities": payload
    }

}

export const getBudgetPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Ik7fouv4KOA", value: clean(row[4]) }, // year
                { attribute: "DVNScIHo9ik", value: clean(row[5]) }, // budget category
                { attribute: "t9GmH5N6fuW", value: row[6] === "-" ? 0 : row[6] },  // allocated budget

                { attribute: "w0WC2RVKn5L", value: clean(row[7]) },  // purpose of the budget
                { attribute: "fGfO0hrRRgq", value: clean(row[8]) },  // description
                { attribute: "k921oNWPSd4", value: clean(row[9]) }  // sector

            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "", // Enrollment Date
                    occurredAt: row[3] || "", // Incident Date
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Ik7fouv4KOA", value: clean(row[4]) }, // year
                        { attribute: "DVNScIHo9ik", value: clean(row[5]) }, // budget category
                        { attribute: "t9GmH5N6fuW", value: row[6] === "-" ? 0 : row[6] },  // allocated budget
                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });


    return {
        "trackedEntities": payload
    }

}

export const getAAPBaselineAndTargetPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit, // from your existing variable
            trackedEntityType,
            attributes: [
                { attribute: "Ik7fouv4KOA", value: clean(row[5]) }, // year

                { attribute: "fGfO0hrRRgq", value: clean(row[6]) }, // description
                { attribute: "venV3bANzNv", value: row[7] === "-" ? 0 : row[7] }, // Proportion of Completed AAP Baseline 
                { attribute: "q5eRJ48BKIR", value: row[8] === "-" ? 0 : row[8] },  // Proportion of Completed AAP Target
                { attribute: "BqDSaAXE5Wy", value: row[9] === "-" ? 0 : row[9] },  // Proportion of Abandoned AAP Intervention Baseline
                { attribute: "IyL1NC967ul", value: row[10] === "-" ? 0 : row[10] },  // Proportion of Abandoned AAP Intervention Target
                { attribute: "T7cdjc1ljvw", value: row[11] === "-" ? 0 : row[11] },  // Proportion of MTDP Implemented Actual
                { attribute: "Q3x1ejPH6by", value: row[12] === "-" ? 0 : row[12] },  // Proportion of MTDP Implemented Baseline
                { attribute: "DualVyRoqaS", value: row[13] === "-" ? 0 : row[13] },  // Proportion of MTDP Implemented Target
                { attribute: "YaUpC7Sm9Yh", value: row[14] === "-" ? 0 : row[14] },  // Proportion of On Going AAP Intervention Baseline
                { attribute: "t9UOacq47jG", value: row[15] === "-" ? 0 : row[15] },  // Proportion of On Going AAP Intervention Target
                { attribute: "KtBwVvQDKlw", value: row[16] === "-" ? 0 : row[16] },  // Proportion of Yet to Start AAP Int Baseline
                { attribute: "vrbrHPCFEd4", value: row[17] === "-" ? 0 : row[17] },  // Proportion of Yet to Start AAP Int Target
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "", // Enrollment Date
                    occurredAt: row[3] || "", // Incident Date
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Ik7fouv4KOA", value: row[5] === "-" ? "" : row[5] }, // year
                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });


    return {
        "trackedEntities": payload
    }

}

export const getAAPPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const attributes = [
            { attribute: "pWkYqcKukAY", value: row[4] === "-" ? "" : row[4] }, // Year
            { attribute: "IHP9xBgvYu7", value: row[5] === "-" ? "" : row[5] }, // Activity Name
            { attribute: "VjFxjvQk0cO", value: row[6] === "-" ? "" : row[6] }, // Activity Description
            { attribute: "Ni5mF1bxTcq", value: row[8] === "-" ? "" : row[8] }, // Activity State
            { attribute: "vYOjuRKymY8", value: row[14] === "-" ? "" : row[14] }, // Focus Activity
            { attribute: "JgjD9cTUbhm", value: row[19] === "-" ? "" : row[19] }, // Expected Start Date
            { attribute: "Go8eelOBPsP", value: row[22] === "-" ? "" : row[22] }, // Lead Implementing Agency
            { attribute: "IZZ2dtfaCC1", value: row[9] === "-" ? "" : row[9] }, // Activity Type
            { attribute: "XlP38Ti4IDm", value: row[16] === "-" ? "" : row[16] }, // Development Dimension
            { attribute: "mdO1ngv0Qt0", value: row[18] === "-" ? 0 : row[18] }, // Budget Allocated (numeric)
            { attribute: "czWTjDKqOBH", value: row[23] === "-" ? "" : row[23] }, // Collaborating Implementing Agency
            { attribute: "ny0RvLrYFx3", value: row[7] === "-" ? "" : row[7] }, // Plan Approval Status
            { attribute: "k921oNWPSd4", value: row[10] === "-" ? "" : row[10] }, // Activity Sector
            { attribute: "gSalp5yrAWB", value: row[11] === "-" ? "" : row[11] }, // Activity Source
            { attribute: "T7LiYCQ3LAm", value: row[20] === "-" ? "" : row[20] }, // Expected Completion Date
            { attribute: "x4qBAYjalCD", value: row[21] === "-" ? "" : row[21] }, // Remarks
        ];

        const tempDataSet = {
            orgUnit, // from your existing variable
            trackedEntityType,
            attributes,
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "", // Enrollment Date
                    occurredAt: row[3] || "", // Incident Date
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "pWkYqcKukAY", value: row[4] === "-" ? "" : row[4] }, // Year
                        { attribute: "IHP9xBgvYu7", value: row[5] === "-" ? "" : row[5] }, // Activity Name
                        { attribute: "VjFxjvQk0cO", value: row[6] === "-" ? "" : row[6] }, // Activity Description
                        { attribute: "Ni5mF1bxTcq", value: row[8] === "-" ? "" : row[8] }, // Activity State
                        { attribute: "vYOjuRKymY8", value: row[14] === "-" ? "" : row[14] }, // Focus Activity
                        { attribute: "JgjD9cTUbhm", value: row[19] === "-" ? "" : row[19] }, // Expected Start Date
                        { attribute: "Go8eelOBPsP", value: row[22] === "-" ? "" : row[22] }, // Lead Implementing Agency
                        { attribute: "IZZ2dtfaCC1", value: row[9] === "-" ? "" : row[9] }, // Activity Type
                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });


    return {
        "trackedEntities": payload
    }

}

export const getOperationalHealthFacilityPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[5] || "" }, // Name
                { attribute: "pF64ANEoPYx", value: row[6] || "" }, // Location
                { attribute: "KeSsfvs1awo", value: row[7] || "" }, // Owner/leader
                { attribute: "vIkEALDVio6", value: row[8] || "" }, // Ownersip Type

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, // Unique id
                { attribute: "Xpj7aFWa3ii", value: row[9] || "" }, // Health FacilityType
                { attribute: "SKeHl5XTZVG", value: row[10] || "" }, // Email Address
                { attribute: "vUVEUS3VXbF", value: row[11] || "" }, // Postal Address
                // { attribute: "cPGCeyMceZl", value: row[12] || "" }, // Site Coordinates
                { attribute: "YqP6CROSeSq", value: row[13] || "" }, // Digital Postal Address
                { attribute: "HgemfhhsXBc", value: row[14] || "" }, // Mobile Number
                { attribute: "yqvSryblNL4", value: row[15] || "" }, // Construction Start Date
                { attribute: "wSuCvQcwby6", value: row[16] || "" }, // Construction End Date
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "2025-01-01",
                    occurredAt: row[3] || "2025-01-01",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[5] || "" }, // Name
                        { attribute: "pF64ANEoPYx", value: row[6] || "" }, // Location
                        { attribute: "KeSsfvs1awo", value: row[7] || "" }, // Owner/leader
                        { attribute: "vIkEALDVio6", value: row[8] || "" }, // Ownersip Type
                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }

}

export const getSportFacilityPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [

                { attribute: "d4vGACWAj7R", value: row[4] || "" }, // Name of sport facility
                { attribute: "NU2g62mWHJQ", value: row[5] || "" }, // facility ownership type

                { attribute: "yqvSryblNL4", value: row[6] || "" }, // Construction Start Date
                { attribute: "wSuCvQcwby6", value: row[7] || "" }, // Construction End Date
                { attribute: "jBaDMK6rqCA", value: row[9] || "" }, // Number of direct beneficiary
                { attribute: "pF64ANEoPYx", value: row[8] || "" }, // Location
                { attribute: "fGfO0hrRRgq", value: row[10] || "" }, // Description
                { attribute: "EjkjhZFlslh", value: row[13] || "" }, // Purpose of sport facility
                { attribute: "EzZnJRWxDdN", value: row[14] || "" }, // Specify purpose of sport facility

            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "2025-01-01",
                    occurredAt: row[3] || "2025-01-01",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "d4vGACWAj7R", value: row[4] || "" }, // Name of sport facility
                        { attribute: "NU2g62mWHJQ", value: row[5] || "" }, // facility ownership type
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getServiceProvidersPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [

                { attribute: "Hq8it9qapWz", value: row[4] || "" }, // Service Provider
                { attribute: "ttyKWvSBAZH", value: row[6] || "" }, // Name of Business 
                { attribute: "XDjgAYmON2o", value: row[7] || "" }, // Address location
                { attribute: "tb0nGRwpQEw", value: row[12] || "" }, // Period of contract
                { attribute: "gkqU35LKO4t", value: row[13] || "" }, // Start date

                { attribute: "YqP6CROSeSq", value: row[8] || "" }, // Digital postal address
                { attribute: "pF64ANEoPYx", value: row[9] || "" }, // Location
                { attribute: "sGe7MGw4BVN", value: row[10] || "" }, // Phone
                { attribute: "SKeHl5XTZVG", value: row[11] || "" }, // Email address

            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "2025-01-01",
                    occurredAt: row[3] || "2025-01-01",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Hq8it9qapWz", value: row[4] || "" }, // Service Provider
                        { attribute: "ttyKWvSBAZH", value: row[6] || "" }, // Name of Business 
                        { attribute: "XDjgAYmON2o", value: row[7] || "" }, // Address location
                        { attribute: "tb0nGRwpQEw", value: row[12] || "" }, // Period of contract
                        { attribute: "gkqU35LKO4t", value: row[13] || "" }, // Start date 

                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getSchoolProfilePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const schoolId = generateProjectId();
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "UJBblniqPOI", value: row[10] || "" }, // Community
                { attribute: "RYU3GpNzokp", value: row[6] || "" }, // Type

                { attribute: "IztkGQj5EqM", value: schoolId }, // Unique id
                { attribute: "aNfKUv5kVo7", value: row[5] || "" }, // Name of School
                { attribute: "PX7m8i2KVgT", value: row[7] === "-" ? "" : row[7] === "Yes" ? true : false }, // Is school faith based
                { attribute: "anVTuGti6SK", value: row[8] === "Technical-Vocational (TVET)" ? "TVET" : (row[8] || "") }, // School level
                { attribute: "kThAAJFKIcE", value: row[9] || "" }, // Secondary school type
                { attribute: "AlVMRjjWuVo", value: row[11] || "" }, // Established date
                { attribute: "YqP6CROSeSq", value: row[12] || "" }, // Digital postal address
                { attribute: "cPGCeyMceZl", value: (row[13] && row[13] !== "-" && row[13].includes(",")) ? `[${row[13]}]` : "" }, // Site coordinates
                { attribute: "HkovKF0eqVg", value: row[14] === "-" ? "" : row[14] === "Yes" ? true : false }, // Does the school have a creche
                { attribute: "kz1eZdE9hm3", value: row[15] === "-" ? "" : row[15] === "Yes" ? true : false }, //KG
                { attribute: "kNHdPyj6ed3", value: row[16] === "-" ? "" : row[16] === "Yes" ? true : false }, //Primary
                { attribute: "ZljvuDqsPJJ", value: row[17] === "-" ? "" : row[17] === "Yes" ? true : false }, //JHS
                { attribute: "qORPfeTsPeX", value: row[18] === "-" ? "" : row[18] === "Yes" ? true : false }, //Secondary
                { attribute: "x0oK399l4RA", value: row[19] === "-" ? "" : row[19] === "Yes" ? true : false }, //Tertiary
                { attribute: "tsn8ekA92aR", value: row[20] === "-" ? "" : row[20] === "Yes" ? true : false }, //TVETs/Vocational
                { attribute: "wO2BqNRuILL", value: "" }, // Site photo
                { attribute: "YBC49GnEfdi", value: row[23] === "-" ? "" : row[23] === "Yes" ? true : false }, //Schools with changing rooms for girls

            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    // enrolledAt: row[2] || "2025-01-01",
                    // occurredAt: row[3] || "2025-01-01",
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",

                    status: "ACTIVE",
                    attributes: [
                        { attribute: "UJBblniqPOI", value: row[10] || "" }, // Community
                        { attribute: "RYU3GpNzokp", value: row[6] || "" }, // Type

                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getMeetingsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "eOsejnvfYiV", value: row[4] || "" }, // Invitation letter date
                { attribute: "Mm3f9fbAT8r", value: row[5] || "" }, // Invitation letter reference number 
                { attribute: "rSKzHSBlOyB", value: getSignerMapping(row[7]) }, // Who signed the invitation letter
                { attribute: "Ub0V9Z06aBc", value: row[8] || "" }, // Meeting date 
                { attribute: "kghpIZgHFsT", value: getMeetingTypeMapping(row[10]) }, // Meeting type
                { attribute: "b7uAJaX9obN", value: row[15] || "" }, // Meeting title
                { attribute: "HmdJqjjAZZ4", value: row[17] || "" }, // Meeting venue
                { attribute: "Br9IEOZyKPW", value: row[21] || "" }, // Number of desicions
                { attribute: "U2RjiIApoYu", value: row[24] || "" }, // Number of Attendance Male
                { attribute: "iHz18pXkmMd", value: row[25] || "" }, // Number of Attendance Female

                { attribute: "AiPyh2A2DZ8", value: row[6] || "" }, // Means of invitation letter distribution
                { attribute: "unVPW9dCS5B", value: row[9] || "" }, // Minute file number
                { attribute: "j0kNoCtC8pj", value: getAssemblyTypeMapping(row[11]) }, // General assembly meeting types
                { attribute: "hfCSE8B2L9p", value: row[12] || "" }, // Statutory committee types
                { attribute: "sI8Kj3pfa6k", value: row[13] || "" }, // Name of sub structure
                { attribute: "f1V1vDibPCS", value: row[14] || "" }, // Other (specify)
                { attribute: "mH8uydlfv03", value: row[16] || "" }, // Meeting agenda
                { attribute: "uRdPt6OIxvU", value: row[22] || "" }, // Number of cpmplaints
                { attribute: "DGDc7z1ESlb", value: row[23] || "" }, // Number of recommendations made
                { attribute: "SdtJSE3jJkV", value: (row[26] && row[26] !== "-" && !isNaN(row[26])) ? parseInt(row[26]) : 0 }, // Number of participant HoDs Male
                { attribute: "RFSUywjaDRi", value: row[27] || "" }, // Number of participant HoDs Female
                { attribute: "Fup3ibG5EJc", value: row[29] === "-" ? "" : row[29] === "Yes" ? true : false }, // Was the annual action plan approved
                { attribute: "xh6NIEHa8xg", value: row[30] || "" }, // AAP approval date
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "eOsejnvfYiV", value: row[4] || "" }, // Invitation letter date
                        { attribute: "Mm3f9fbAT8r", value: row[5] || "" }, // Invitation letter reference number
                        { attribute: "rSKzHSBlOyB", value: getSignerMapping(row[7]) }, // Who signed the invitation letter
                        { attribute: "Ub0V9Z06aBc", value: row[8] || "" }, // Meeting date
                        { attribute: "kghpIZgHFsT", value: getMeetingTypeMapping(row[10]) },  // Meeting type
                        { attribute: "b7uAJaX9obN", value: row[15] || "" }, // Meeting title
                        { attribute: "HmdJqjjAZZ4", value: row[17] || "" }, // Meeting venue
                        { attribute: "Br9IEOZyKPW", value: row[21] || "" }, // Number of desicions
                        { attribute: "U2RjiIApoYu", value: row[24] || "" }, // Number of Attendance Male
                        { attribute: "iHz18pXkmMd", value: row[25] || "" }, // Number of Attendance Female
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getPeopleWithDisabilityPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "yPvU4sPN9hh", value: row[4] || "" }, //First Name
                { attribute: "PtqWutejid0", value: row[5] || "" }, //Last Name
                { attribute: "j3CyzRTfdAk", value: row[6] || "" }, //Gender
                { attribute: "NA5Bek1ME81", value: row[7] || "" }, //Disability type
                { attribute: "yUDWmWXB08P", value: row[9] || "" }, //Does this PWD have a caretaker

                { attribute: "sGe7MGw4BVN", value: row[10] || "" }, //Phone
                { attribute: "IQv3CJDmDna", value: row[11] || "" }, //Ghanacardnumber
                { attribute: "XDjgAYmON2o", value: row[12] || "" }, //Addrees Location
                { attribute: "YqP6CROSeSq", value: row[13] || "" }, //DigitalPostalAddress
                { attribute: "SKeHl5XTZVG", value: row[14] || "" }, //Email Address
                { attribute: "Ax9xIaMCs52", value: "" }, //Picture
                { attribute: "dxbGTrab2xY", value: row[16] || "" }, //Caretaker Name
                { attribute: "eOMv6uYjj9q", value: row[17] || "" }, //Caretaker telephone no
                { attribute: "T1YQ9ekJBno", value: row[18] || "" }, //Caretaker Ghana card


            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "yPvU4sPN9hh", value: row[4] || "" }, //First Name
                        { attribute: "PtqWutejid0", value: row[5] || "" }, //Last Name
                        { attribute: "j3CyzRTfdAk", value: row[6] || "" }, //Gender
                        { attribute: "NA5Bek1ME81", value: row[7] || "" }, //Disability type
                        { attribute: "yUDWmWXB08P", value: row[9] || "" }, //Does this PWD have a caretaker
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getBoundaryDisputePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "mM7z6LuxndL", value: row[4] === "-" ? "" : row[4] === "Yes" ? true : false }, //Does the district have boundary issue

                { attribute: "pWkYqcKukAY", value: row[5] || "" }, //Year
                { attribute: "HD4q4W3QGco", value: row[6] || "" }, //MMDA 1
                { attribute: "ocZLeifIbuv", value: row[7] || "" }, //Location coordinate of MMDA 1
                { attribute: "Y30tp8GBeLJ", value: row[8] || "" }, //MMDA 2
                { attribute: "PPjSFYtywHl", value: row[9] || "" }, //Location coordinate of MMDA 2
                { attribute: "wkXwSdqiPzv", value: row[10] || "" }, //MMDA 3
                { attribute: "MJCxNfLfrIy", value: row[11] || "" }, //Dispute location coordinate 3
                { attribute: "vNtKem2HjAA", value: row[12] || "" }, //Detail
                { attribute: "x4qBAYjalCD", value: row[13] || "" }, //Remarks
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "mM7z6LuxndL", value: row[4] === "-" ? "" : row[4] === "Yes" ? true : false }, //Does the district have boundary issue
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getComputerizedBillingSystemPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                { attribute: "biAXx5doufe", value: row[6] || "" }, //Developed by
                { attribute: "J2GkQ7g6IFk", value: row[8] || "" }, //Purchased cost
                { attribute: "RP06q4eZ8Sp", value: row[9] || "" }, //Valid from

                { attribute: "MZWUSf9PCHv", value: row[5] ? Math.floor(parseFloat(row[5]) || 0) : 0 }, //Version
                { attribute: "YvIn2QEep25", value: row[7] || "" }, //Purchased date
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "biAXx5doufe", value: row[6] || "" }, //Developed by
                        { attribute: "J2GkQ7g6IFk", value: row[8] || "" }, //Purchased cost
                        { attribute: "RP06q4eZ8Sp", value: row[9] || "" }, //Valid from
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getCapacityBuildingNeedsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "VjFxjvQk0cO", value: row[4] || "" }, //Activity Description
                { attribute: "Ni5mF1bxTcq", value: row[5] || "" }, //Activity State
                { attribute: "nyeFHN5Z9oJ", value: row[6] || "" }, //Activty type
                { attribute: "vYOjuRKymY8", value: row[8] || "" }, //Focus activity
                { attribute: "wcnA9Wodtf2", value: row[11] || "" }, //Capacity Building Needs From/Source

                { attribute: "juVzRNadmPI", value: row[7] || "" }, //Other(specify)
                { attribute: "fGpjwVJPSUZ", value: row[9] || "" }, //Other(Specify)
                { attribute: "fGfO0hrRRgq", value: row[10] || "" }, //Description
                { attribute: "mdO1ngv0Qt0", value: row[12] || "" }, //Budget Allocated
                { attribute: "r7PY1VqUaTr", value: row[13] || "" }, //Accredited consultant
                { attribute: "JgjD9cTUbhm", value: row[14] || "" }, //Expected start date
                { attribute: "T7LiYCQ3LAm", value: row[15] || "" }, //Expected completion date
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "VjFxjvQk0cO", value: row[4] || "" }, //Activity Description
                        { attribute: "Ni5mF1bxTcq", value: row[5] || "" }, //Activity State
                        { attribute: "nyeFHN5Z9oJ", value: row[6] || "" }, //Activty type
                        { attribute: "vYOjuRKymY8", value: row[8] || "" }, //Focus activity
                        { attribute: "wcnA9Wodtf2", value: row[11] || "" }, //Capacity Building Needs From/Source
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getDisasterPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "RMSqAr6nFf1", value: row[5] || "" }, //Disaster type
                { attribute: "UJBblniqPOI", value: row[6] || "" }, //Community

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "x4qBAYjalCD", value: row[7] || "" }, //Remarks
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "RMSqAr6nFf1", value: row[5] || "" }, //Disaster type
                        { attribute: "UJBblniqPOI", value: row[6] || "" }, //Community
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getDecisionsAndComplaintsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        // Map values to valid options
        let meetingType = row[4] || "";
        if (meetingType === "General Assembly") meetingType = "GA";
        if (meetingType === "Management Meeting") meetingType = "Management Meetings";
        if (meetingType === "Public Relations and Complaints Committee(PRCC)") meetingType = "PRCC";

        let type = row[5] || "";
        if (type === "Complaint") type = "Complain";

        let serviceType = row[6] || "";
        if (serviceType === "Recreational  services") serviceType = "Recreational  services and Security";

        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "xYKvhN8Oxh8", value: meetingType }, //Meeting type
                { attribute: "JRxGCfymyCQ", value: type }, //Type
                { attribute: "dKf1SQYMnnb", value: row[8] || "" }, //Decision
                { attribute: "CVOeyCI3cvs", value: row[9] || "" }, //Meeting reference number
                { attribute: "jhd0GBgu38n", value: serviceType }, //Decision focus
                { attribute: "f1V1vDibPCS", value: row[7] || "" }, //Others(specify)
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "xYKvhN8Oxh8", value: meetingType }, //Meeting type
                        { attribute: "JRxGCfymyCQ", value: type }, //Type
                        { attribute: "dKf1SQYMnnb", value: row[8] || "" }, //Decision
                        { attribute: "CVOeyCI3cvs", value: row[9] || "" }, //Meeting reference number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getConsultingAndContractorsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Cq3sRyzWsDo", value: row[4] || "" }, //Consulting Firm
                { attribute: "aNIaNqGn92L", value: row[5] || "" }, //Consulting and contractors agency
                { attribute: "ACV6gQvl2H9", value: row[6] || "" }, //Lead consultant
                { attribute: "f0aBWJl90eO", value: row[7] || "" }, //Tin
                { attribute: "SKeHl5XTZVG", value: row[9] || "" }, //Email Address
                { attribute: "sGe7MGw4BVN", value: row[10] || "" }, //Phone

                { attribute: "XDjgAYmON2o", value: row[8] || "" }, //Address Location
                // { attribute: "cPGCeyMceZl", value: row[11] || "" }, //Site Coordinates
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Cq3sRyzWsDo", value: row[4] || "" }, //Consulting Firm
                        { attribute: "aNIaNqGn92L", value: row[5] || "" }, //Consulting and contractors agency
                        { attribute: "ACV6gQvl2H9", value: row[6] || "" }, //Lead consultant
                        { attribute: "f0aBWJl90eO", value: row[7] || "" }, //Tin
                        { attribute: "SKeHl5XTZVG", value: row[9] || "" }, //Email Address
                        { attribute: "sGe7MGw4BVN", value: row[10] || "" }, //Phone
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getDistrictGeneralPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    //District level option set
    const parseDistrictLevel = (value) => {
        const mappings = {
            "District": "District",
            "Metropolitan": "Metropolitan",
            "Municipal": "Municipal",
        };
        return mappings[value] || "";
    };


    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "snUEn55Te11", value: row[6] || "" }, //Contact number

                { attribute: "pPOoDG2bvmo", value: parseFile(row[4]) }, //District Logo
                { attribute: "nVGQlVwOvld", value: parseDistrictLevel(row[5]) }, //District Level
                { attribute: "SKeHl5XTZVG", value: row[7] || "" }, //Email address
                { attribute: "BZbNSkBY5w5", value: row[8] || "" }, //Public Hotline
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[9]) }, //Location coordinate
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "snUEn55Te11", value: row[6] || "" }, //Contact number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

const parseNumeric = (value) => {
    if (!value || value === "-") return 0;
    return parseFloat(value.toString().replace(/,/g, "")) || 0;
};

export const getExpenditurePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Ik7fouv4KOA", value: row[4] || "" }, //Select year
                { attribute: "b43bkz6RXZp", value: parseNumeric(row[6]) }, //Compensation baseline
                { attribute: "nPF1S77QJlJ", value: parseNumeric(row[7]) }, //Compensation target
                { attribute: "RkqGw55wSjg", value: parseNumeric(row[8]) }, //Goods and services baseline
                { attribute: "H6w6dGV8Z2h", value: parseNumeric(row[9]) }, //Goods and services target
                { attribute: "iUIpVf849wt", value: parseNumeric(row[10]) }, //Investment/Assets baseline
                { attribute: "w6nouX0rtwI", value: parseNumeric(row[11]) }, //Investment/Assets target

                { attribute: "fGfO0hrRRgq", value: row[5] || "" }, //Description
                { attribute: "y8FhVo7h4bT", value: parseNumeric(row[12]) }, //Compensation released
                { attribute: "I7FJHirf7vx", value: parseNumeric(row[13]) }, //Goods and services released
                { attribute: "SmhM5TLddYH", value: parseNumeric(row[14]) }, //Investment/Assets released
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Ik7fouv4KOA", value: row[4] || "" }, //Select year
                        { attribute: "b43bkz6RXZp", value: parseNumeric(row[6]) }, //Compensation baseline
                        { attribute: "nPF1S77QJlJ", value: parseNumeric(row[7]) }, //Compensation target
                        { attribute: "RkqGw55wSjg", value: parseNumeric(row[8]) }, //Goods and services baseline
                        { attribute: "H6w6dGV8Z2h", value: parseNumeric(row[9]) }, //Goods and services target
                        { attribute: "iUIpVf849wt", value: parseNumeric(row[10]) }, //Investment/Assets baseline
                        { attribute: "w6nouX0rtwI", value: parseNumeric(row[11]) }, //Investment/Assets target
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getDistrictAssemblyDepartmentsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "bRQoKAk6wsQ", value: row[4] || "" }, //Department

                { attribute: "xJWv6hywE6t", value: row[5] || "" }, //Staff Department
                { attribute: "ZvZNxRhU4VP", value: row[6] || "" }, //Number of females
                { attribute: "XZTj0OIaCW3", value: row[7] || "" }, //Number of males
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "bRQoKAk6wsQ", value: row[4] || "" }, //Department
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getJobPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Year
                { attribute: "OCBgYfq4nyM", value: row[8] || "" }, //Type of resource invested
                { attribute: "gyfJjP84zNY", value: row[6] || "" }, //Activity/Type of support

                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "kmo4am36IO0", value: row[7] || "" }, //Job Sector
                { attribute: "f1V1vDibPCS", value: row[9] || "" }, //Other(Specify)
                { attribute: "J1E8xz9hUfl", value: row[10] || "" }, //Name of job
                { attribute: "pYCLApFzDQJ", value: row[11] || "" }, //Nature of job



            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Year
                        { attribute: "OCBgYfq4nyM", value: row[8] || "" }, //Type of resource invested
                        { attribute: "gyfJjP84zNY", value: row[6] || "" }, //Activity/Type of support
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

const parseBool = (value) => {
    if (!value || value === "-") return "";
    return value === "Yes" ? true : value === "No" ? false : "";
};

const parsePositiveInt = (value) => {
    if (!value || value === "-") return 0;
    const num = parseInt(value);
    return num >= 0 ? num : 0;
};

const parseCoordinate = (value) => {
    // Always return empty string for coordinates to avoid validation errors
    return "";
};

const parseUniqueTIN = (value) => {
    if (!value || value === "-" || value === "N/A") return "";
    return value;
};

const parseFile = (value) => {
    if (!value || value === "-") return "";
    return "";
};

export const getFoodVendorsRegisterPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YxKVJA1budd", value: row[4] || "" }, //Name of vendor/Business
                { attribute: "pF64ANEoPYx", value: row[6] || "" }, //Location

                { attribute: "IQv3CJDmDna", value: row[5] || "" }, //Ghana card number
                { attribute: "YqP6CROSeSq", value: row[7] || "" }, //Digital Postal Address
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[8]) }, //Location Coordinate
                { attribute: "VjFxjvQk0cO", value: row[9] || "" }, //Activity Description
                { attribute: "lgarW8cAulg", value: row[10] || "" }, //Sales and hygiene status
                { attribute: "IrWHkIny02S", value: row[11] || "" }, //Type of food
                { attribute: "Gfx6GlDNJnT", value: row[12] || "" }, //Scale of operation
                { attribute: "DtQDOJCAct2", value: parsePositiveInt(row[13]) }, //Average revenue
                { attribute: "FBMLDuwpMha", value: parsePositiveInt(row[14]) }, //Average sales per anum
                { attribute: "sGe7MGw4BVN", value: row[15] || "" }, //Phone
                { attribute: "f0aBWJl90eO", value: parseUniqueTIN(row[16]) }, //TIN
                { attribute: "L9ZHQjoJzfE", value: row[17] || "" }, //Food vendor status
                { attribute: "AFgZ6dLBncW", value: row[18] || "" }, //Number of employees
                { attribute: "wO2BqNRuILL", value: parseFile(row[19]) }, //Site photo
                { attribute: "NWY9LMko2gQ", value: parseBool(row[20]) }, //Is food and beverage vendors screened?
                { attribute: "fNPStFg1WZL", value: parseBool(row[21]) }, //Is there a certificate
                { attribute: "ZQl1IGDUy4u", value: parseBool(row[22]) }, //Are you a registered vendor
                { attribute: "Jdkob4wXg1b", value: row[23] || "" }, //Enter registration id
                { attribute: "NhLS79OdYtg", value: parsePositiveInt(row[24]) }, //Average sales per day
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YxKVJA1budd", value: row[4] || "" }, //Name of vendor/Business
                        { attribute: "pF64ANEoPYx", value: row[6] || "" }, //Location
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getEvaluationAndPMEPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    const parseEvaluationType = (value) => {
        const mapping = {
            "Evaluation": "Evaluation",
            "Monitoring Evaluation": "Participatory Monitoring Evaluation",
            "Participatory Evaluation": "Participatory Evaluation"
        };
        return mapping[value] || "";
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "PsxxJj3wx44", value: parseEvaluationType(row[4]) }, //Evaluation type 
                { attribute: "hx05ofamA7l", value: row[5] || "" }, //Evaluation Name
                { attribute: "oTcsi23MG05", value: row[6] || "" }, //Policy/programme/project involved
                { attribute: "ECGp5Dsci98", value: row[7] || "" }, //Consultant or resource persons involved
                { attribute: "FB3EHelJc3s", value: row[8] || "" }, //Methodology used

                { attribute: "rxta8ovzPOU", value: row[9] || "" }, //Effectiveness
                { attribute: "Nucps6dfRKm", value: row[10] || "" }, //Impact
                { attribute: "DL9jvB5DFJJ", value: row[11] || "" }, //Sustainability
                { attribute: "WGmQWjynmrn", value: row[12] || "" }, //Revelance
                { attribute: "NgkaHPzEGPM", value: row[13] || "" }, //Efficiency
                { attribute: "YcoTv20WMiO", value: row[14] || "" }, //Findings
                { attribute: "G0tGOE5UsOg", value: row[15] || "" }, //Recommendations
                { attribute: "fGfO0hrRRgq", value: row[16] || "" }, //Description
                { attribute: "YfoGKu8N6An", value: row[17] || "" }, //Date
                { attribute: "Ax9xIaMCs52", value: parseFile(row[18]) }, //Picture
                { attribute: "jtoMESZwY58", value: parseFile(row[19]) }, //Picture 1
                { attribute: "OxK7S6eyZis", value: parseFile(row[20]) }, //Picture 2
                { attribute: "fAJMRMzoFez", value: row[21] || "" }, //Findings PME
                { attribute: "KfYBTZsE4gK", value: parseFile(row[22]) }, //File
                { attribute: "niTuRjlNLym", value: parseFile(row[23]) }, //File 1
                { attribute: "V81KdyYKmPm", value: parseFile(row[24]) }, //File 2
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "PsxxJj3wx44", value: parseEvaluationType(row[4]) }, //Evaluation type 
                        { attribute: "hx05ofamA7l", value: row[5] || "" }, //Evaluation Name
                        { attribute: "oTcsi23MG05", value: row[6] || "" }, //Policy/programme/project involved
                        { attribute: "ECGp5Dsci98", value: row[7] || "" }, //Consultant or resource persons involved
                        { attribute: "FB3EHelJc3s", value: row[8] || "" }, //Methodology used
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getDumpingSiteOrEngineeredLandfillsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                { attribute: "vIkEALDVio6", value: row[5] || "" }, //Ownerwship type
                { attribute: "XgZK7dL7XeI", value: parseBool(row[6]) }, //Is there a co-ownership for the site
                { attribute: "kLrk8oInbNY", value: row[10] || "" }, //Dumping site waste type
                { attribute: "SbhCyq5YIw6", value: parseBool(row[12]) }, //Is the site engineered or well-maintained dumping site
                { attribute: "ihwNh0qiX0W", value: parseBool(row[13]) }, //Is it EPA certified

                { attribute: "Rh9laTzbNnz", value: row[7] || "" }, //Specify Co-0wner
                { attribute: "ydFU2ZUEl4V", value: row[8] || "" }, //Contract file number
                { attribute: "NoK1DjRAofh", value: row[9] || "" }, //Contractual Arrangement Summary
                { attribute: "cPGCeyMceZl", value: parseCoordinate(row[11]) }, //Site coordinates
                { attribute: "YqP6CROSeSq", value: row[14] || "" }, //Digital postal address
                { attribute: "XDjgAYmON2o", value: row[15] || "" }, //Address Location
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "vIkEALDVio6", value: row[5] || "" }, //Ownerwship type
                        { attribute: "XgZK7dL7XeI", value: parseBool(row[6]) }, //Is there a co-ownership for the site
                        { attribute: "kLrk8oInbNY", value: row[10] || "" }, //Dumping site waste type
                        { attribute: "SbhCyq5YIw6", value: parseBool(row[12]) }, //Is the site engineered or well-maintained dumping site
                        { attribute: "ihwNh0qiX0W", value: parseBool(row[13]) }, //Is it EPA certified
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getDPATScoringSheetPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Name

                { attribute: "B7jdqUI7GCR", value: parsePositiveInt(row[5]) || 0 }, //At least three ordinary meetings held(GA)
                { attribute: "VG5LYobYDbk", value: parsePositiveInt(row[6]) || 0 }, //Two weeks notice before GA meetings
                { attribute: "iST35r1RAuK", value: parsePositiveInt(row[7]) || 0 }, //Evidence of GA meetings minute
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Name
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getInspectorateUnitActivityPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YfoGKu8N6An", value: row[4] || "" }, //Date
                { attribute: "Ituuy7n8JGg", value: row[5] || "" }, //Type
                { attribute: "ZERTtsbXXc7", value: row[8] || "" }, //Supervisor
                { attribute: "XDjgAYmON2o", value: row[9] || "" }, //Address location
                { attribute: "IsUOT8aa9xW", value: row[12] || "" }, //Identified issue
                { attribute: "G0tGOE5UsOg", value: row[13] || "" }, //Recommendations

                { attribute: "cu7n4P98dsa", value: row[6] || "" }, //Inspection details
                { attribute: "f1V1vDibPCS", value: row[7] || "" }, //Other(Specify)
                { attribute: "cPGCeyMceZl", value: parseCoordinate(row[10]) }, //Site coordinates
                { attribute: "FU78t4lTqTx", value: row[11] || "" }, //Stakeholders involved
                { attribute: "Ax9xIaMCs52", value: parseFile(row[14]) }, //Picture
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YfoGKu8N6An", value: row[4] || "" }, //Date
                        { attribute: "Ituuy7n8JGg", value: row[5] || "" }, //Type
                        { attribute: "ZERTtsbXXc7", value: row[8] || "" }, //Supervisor
                        { attribute: "XDjgAYmON2o", value: row[9] || "" }, //Address location
                        { attribute: "IsUOT8aa9xW", value: row[12] || "" }, //Identified issue
                        { attribute: "bR0F7QVZjXC", value: row[13] || "" }, //Recommendations (using correct program attribute)
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getKeyCriticalPovertyIssuesPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "AVnIp8rij7C", value: row[5] || "" }, //Critical development and poverty issues

                { attribute: "S2QBmG02ok2", value: row[4] || "" }, //Description
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "AVnIp8rij7C", value: row[5] || "" }, //Critical development an poverty issues
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getPermitsRequestPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YfoGKu8N6An", value: row[5] || "" }, //Date
                { attribute: "wca7mlI2exE", value: row[6] || "" }, //Name
                { attribute: "FuOpGyKgvyG", value: row[7] || "" }, //Purpose
                { attribute: "LNAq7fnyatP", value: row[8] || "" }, //Type of Request
                { attribute: "pWkYqcKukAY", value: row[10] || "" }, //Year
                { attribute: "HfzMa3hSgln", value: row[11] || "" }, //Submitted by
                { attribute: "LEV8QecVUev", value: row[12] || "" }, //Received by

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "IymGu0GBHJk", value: parsePositiveInt(row[9]) || 0 }, //Fees
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YfoGKu8N6An", value: row[5] || "" }, //Date
                        { attribute: "wca7mlI2exE", value: row[6] || "" }, //Name
                        { attribute: "FuOpGyKgvyG", value: row[7] || "" }, //Purpose
                        { attribute: "LNAq7fnyatP", value: row[8] || "" }, //Type of Request
                        { attribute: "pWkYqcKukAY", value: row[10] || "" }, //Year
                        { attribute: "HfzMa3hSgln", value: row[11] || "" }, //Submitted by
                        { attribute: "LEV8QecVUev", value: row[12] || "" }, //Received by
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getStreetNamingPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Nb0p0tlOqVE", value: row[4] || "" }, //Locality
                { attribute: "bWDiirSEBSX", value: row[5] || "" }, //Location
                { attribute: "pF64ANEoPYx", value: row[6] || "" }, //Identifiable number
                { attribute: "pL0FwhfkQpm", value: parseBool(row[7]) }, //Is the street tarred
                { attribute: "pya3uRXtS2R", value: parseBool(row[8]) }, //Is the street named

                { attribute: "YqP6CROSeSq", value: row[9] || "" }, //Digital postal address
                { attribute: "cPGCeyMceZl", value: parseCoordinate(row[10]) }, //Site coordinates
                { attribute: "fGfO0hrRRgq", value: row[11] || "" }, //Description
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Nb0p0tlOqVE", value: row[4] || "" }, //Locality
                        { attribute: "bWDiirSEBSX", value: row[5] || "" }, //Location
                        { attribute: "pF64ANEoPYx", value: row[6] || "" }, //Identifiable number
                        { attribute: "pL0FwhfkQpm", value: parseBool(row[7]) }, //Is the street tarred
                        { attribute: "pya3uRXtS2R", value: parseBool(row[8]) }, //Is the street named
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getStatutoryMemberPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                { attribute: "sGe7MGw4BVN", value: row[5] ? parseInt(row[5].replace(/^0+/, '') || '0') : 0 }, //Phone
                { attribute: "SKeHl5XTZVG", value: row[6] || "" }, //Email address
                { attribute: "IQv3CJDmDna", value: row[7] || "" }, //Ghana card number
                { attribute: "j3CyzRTfdAk", value: row[8] || "" }, //Gender
                { attribute: "kFAoAaBEqwE", value: row[9] || "" }, //Statutory committee department
                { attribute: "YI5FBDBBU8Z", value: row[10] || "" }, //Assembly member type
                { attribute: "bSO81USC3ZN", value: row[11] || "" }, //Electoral area
                { attribute: "XDjgAYmON2o", value: row[12] || "" }, //Address location
                { attribute: "Ax9xIaMCs52", value: parseFile(row[13]) }, //picture
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "sGe7MGw4BVN", value: row[5] ? parseInt(row[5].replace(/^0+/, '') || '0') : 0 }, //Phone
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getLogisticPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "tcF1c2zJO29", value: row[4] || "" }, //Item category
                { attribute: "Ik7fouv4KOA", value: row[5] || "" }, //Select year
                { attribute: "zlmMobounnu", value: row[6] || "" }, //Required
                { attribute: "kLaD82vCQLh", value: row[7] || "" }, //Actual

                { attribute: "x4qBAYjalCD", value: row[8] || "" }, //Remarks
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "tcF1c2zJO29", value: row[4] || "" }, //Item category
                        { attribute: "Ik7fouv4KOA", value: row[5] || "" }, //Select year
                        { attribute: "zlmMobounnu", value: row[6] || "" }, //Required
                        { attribute: "kLaD82vCQLh", value: row[7] || "" }, //Actual
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getVulnerabilityPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "FtQuKEoL20x", value: row[4] || "" }, //Hotline number

                { attribute: "bRQoKAk6wsQ", value: row[5] || "" }, //Department
                { attribute: "SKeHl5XTZVG", value: row[6] || "" }, //Email address
                { attribute: "pF64ANEoPYx", value: row[7] || "" }, //Location
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[8]) }, //Location coordinates
                { attribute: "fGfO0hrRRgq", value: row[9] || "" }, //Description
                { attribute: "Ax9xIaMCs52", value: parseFile(row[10]) }, //Picture
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "FtQuKEoL20x", value: row[4] || "" }, //Hotline number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getLegalCasePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "K5AYrUoz6EC", value: row[4] || "" }, //Case no

                { attribute: "AH081uHFEkI", value: row[5] || "" }, //Court
                { attribute: "FNC6n574VZa", value: row[6] || "" }, //Plaintiff
                { attribute: "MOWKE4YxRHp", value: parseBool(row[7]) }, //Is the district the plaintiff
                { attribute: "rqcbVfHltXQ", value: row[8] || "" }, //List of plaintiffs
                { attribute: "aGNtk4AMHW7", value: row[9] || "" }, //Defendant
                { attribute: "sFMR9b9DFYo", value: row[10] || "" }, //Name of presiding judge/magistrate 
                { attribute: "Vg0UasqsKBQ", value: row[11] || "" }, //Legal Firm
                { attribute: "Zfsdc8LKrcY", value: row[12] || "" }, //Areas of legal cases
                { attribute: "x4qBAYjalCD", value: row[13] || "" }, //remarks
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "K5AYrUoz6EC", value: row[4] || "" }, //Case no
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getLEDRelatedProgramsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // LED meeting type mapping
    const getLEDMeetingTypeMapping = (value) => {
        const mappings = {
            "Assembly Meeting": "Assembly Meeting",
            "Business Forum": "Business Forum",
            "Community Durbar": "Community Durbar",
            "LED Forum": "LED Forum",
            "Town Hall Meetings": "Town Hall Meetings"
        };
        return mappings[value] || "Other Meeting";
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YfoGKu8N6An", value: row[4] || "" }, //Date
                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "tORGLTLHCtn", value: getLEDMeetingTypeMapping(row[7]) }, //Type
                { attribute: "x2GKaz9PPqu", value: row[9] || "" }, //Agenda/Purpose
                { attribute: "nFPavqcYnNs", value: row[13] || "" }, //No. of direct beneficiaries male
                { attribute: "I8AqLbJESVm", value: row[14] || "" }, //No. of direct beneficiaries female

                { attribute: "fGfO0hrRRgq", value: row[6] || "" }, //Description
                { attribute: "vtjEzZ8uIXx", value: row[8] || "" }, //Venue
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[10]) }, //Location coordinate
                { attribute: "FVPxJuIxIrM", value: row[11] || "" }, //Primary funding source
                { attribute: "meUnqUwQ2ha", value: row[12] || "" }, //Other funding source
                { attribute: "Br9IEOZyKPW", value: row[15] || "" }, //Number of decisions
                { attribute: "dKf1SQYMnnb", value: row[16] || "" }, //Decision/complaint
                { attribute: "x4qBAYjalCD", value: row[17] || "" }, //Remarks
                { attribute: "Tzmw26h9rvx", value: row[18] || "" }, //Name
                { attribute: "SiG3jwOG8w2", value: row[19] || "" }, //Meeting venue
            ],

            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YfoGKu8N6An", value: row[4] || "" }, //Date
                        { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                        { attribute: "tORGLTLHCtn", value: getLEDMeetingTypeMapping(row[7]) }, //Type
                        { attribute: "x2GKaz9PPqu", value: row[9] || "" }, //Agenda/Purpose
                        { attribute: "nFPavqcYnNs", value: row[13] || "" }, //No. of direct beneficiaries male
                        { attribute: "I8AqLbJESVm", value: row[14] || "" }, //No. of direct beneficiaries female
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getPropertyTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Nb0p0tlOqVE", value: row[4] || "" }, //Locality
                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "vIkEALDVio6", value: row[7] || "" }, //Ownership type

                { attribute: "KeSsfvs1awo", value: row[6] || "" }, //Owner/Leader
                { attribute: "bWDiirSEBSX", value: row[8] || "" }, //Identifiable Number
                { attribute: "zzT3Eg2Cwuy", value: row[9] || "" }, //Valuation date
                { attribute: "OsW4vEs9VL0", value: parseNumeric(row[10]) }, //Estimated Value
                { attribute: "jX9DTUsh6mx", value: parseCoordinate(row[11]) }, //GIS coordinate
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Nb0p0tlOqVE", value: row[4] || "" }, //Locality
                        { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                        { attribute: "vIkEALDVio6", value: row[7] || "" }, //Ownership type
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getMarketingBusinessTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Quality Standard mapping 
    const getQualityStandardMapping = (value) => {
        const mappings = {
            "EU Standards": "EU Standard",
            "US Standards": "US Standards",
            "GH Standards": "GH Standards",
            "Other (Specify)": "Other (Specify)"
        };
        return mappings[value] || value;
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "ttyKWvSBAZH", value: row[4] || "" }, //Name of Business
                { attribute: "VIU6RY5WpCP", value: row[5] || "" }, //Business Category
                { attribute: "Dy3Xf20x913", value: row[8] || "" }, //Scale of operation
                { attribute: "bh6EtWj6etP", value: getQualityStandardMapping(row[9]) }, //Quality Standard Requirement
                { attribute: "sGe7MGw4BVN", value: row[19] ? parseInt(row[19].replace(/^0+/, '') || '0') : 0 }, //Phone

                { attribute: "nynzYpVAPSv", value: row[6] || "" }, //Business/Service Details
                { attribute: "oqLQ7vkqJke", value: row[7] || "" }, //Location(s) of Business
                { attribute: "K3sY2afSJ65", value: row[10] || "" }, //Other Quality Standard Requirement (specify)
                { attribute: "mw1gCNMOvju", value: row[11] || "" }, //Association/Promoter Details
                { attribute: "IQv3CJDmDna", value: row[12] || "" }, //Ghana Card Number
                { attribute: "f0aBWJl90eO", value: row[13] || "" }, //TIN
                { attribute: "OoXObWSFTiE", value: row[14] || "" }, //Number of Jobs Created
                { attribute: "YqP6CROSeSq", value: row[15] || "" }, //Digital Postal Address
                { attribute: "XDjgAYmON2o", value: row[16] || "" }, //Address Location
                { attribute: "SKeHl5XTZVG", value: row[17] || "" }, //Email Address
                { attribute: "vUVEUS3VXbF", value: row[18] || "" }, //Postal Address
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[20]) }, //Location Coordinate
                { attribute: "LJsIpMkGOJF", value: parseBool(row[21]) }, //Has the district contributed to the creation of this business?
                { attribute: "DWozHg6rSXy", value: row[22] || "" }, //District investment Details
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "ttyKWvSBAZH", value: row[4] || "" }, //Name of Business
                        { attribute: "VIU6RY5WpCP", value: row[5] || "" }, //Business Category
                        { attribute: "Dy3Xf20x913", value: row[8] || "" }, //Scale of operation
                        { attribute: "bh6EtWj6etP", value: getQualityStandardMapping(row[9]) }, //Quality Standard Requirement
                        { attribute: "sGe7MGw4BVN", value: row[19] ? parseInt(row[19].replace(/^0+/, '') || '0') : 0 }, //Phone
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getPaymentPointPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Payment Point Type mapping
    const getPaymentPointTypeMapping = (value) => {
        const mappings = {
            "District": "D",
            "Metropolitan": "M",
            "Municipal": "Mn",
            "Other": "O"
        };
        return mappings[value] || value;
    };

    // Payment Point Site mapping
    const getPaymentPointSiteMapping = (value) => {
        const mappings = {
            "Outside the Assembly Premisses": "Outside",
            "Within the Assembly Premisses": "Within",
        };
        return mappings[value] || value;
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "rMNArgwjSNi", value: getPaymentPointTypeMapping(row[6]) }, //Payment Point Type
                { attribute: "cOxc3578azW", value: getPaymentPointSiteMapping(row[10]) }, //Payment Point Site

                { attribute: "xrpTPu2RvpC", value: row[4] || "" }, //Payment Point Reference No
                { attribute: "f1V1vDibPCS", value: row[7] || "" }, //Other (specify)
                { attribute: "pF64ANEoPYx", value: row[8] || "" }, //Location
                { attribute: "cPGCeyMceZl", value: parseCoordinate(row[9]) }, //Site Coordinates
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                        { attribute: "rMNArgwjSNi", value: getPaymentPointTypeMapping(row[6]) }, //Payment Point Type
                        { attribute: "cOxc3578azW", value: getPaymentPointSiteMapping(row[10]) }, //Payment Point Site
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getAuditIssuesPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "WYgiGtg3fbF", value: row[4] || "" }, //Audit Category
                { attribute: "Ik7fouv4KOA", value: row[8] || "" }, //Select Year

                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "fGfO0hrRRgq", value: row[6] || "" }, //Description
                { attribute: "bZCYo3nyrum", value: row[7] || "" }, //Audit Recommendation
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "WYgiGtg3fbF", value: row[4] || "" }, //Audit Category
                        { attribute: "Ik7fouv4KOA", value: row[8] || "" }, //Select Year
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getAnnualProgressReportPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "IHP9xBgvYu7", value: row[4] || "" }, //Activity Name

                { attribute: "fGfO0hrRRgq", value: row[5] || "" }, //Description
                { attribute: "Uh9i4InWdbN", value: row[6] || "" }, //Executive Summary
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "IHP9xBgvYu7", value: row[4] || "" }, //Activity Name
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getRevenuePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "Ik7fouv4KOA", value: row[4] || "" }, //Select Year

                { attribute: "fGfO0hrRRgq", value: row[5] || "" }, //Description
                { attribute: "wvkcmief4Md", value: parseNumeric(row[6]) }, //IGF Baseline
                { attribute: "dFUhZ0RTNm1", value: parseNumeric(row[7]) }, //IGF Target
                { attribute: "ERzBEeWqm8v", value: parseNumeric(row[8]) }, //DACF Baseline
                { attribute: "WPgMygTaQPE", value: parseNumeric(row[9]) }, //DACF Target
                { attribute: "mil8GQUWXKn", value: parseNumeric(row[10]) }, //MPs CF Baseline
                { attribute: "YKkbeT1cWxq", value: parseNumeric(row[11]) }, //MPs CF Target
                { attribute: "zV8GC0aTfMx", value: parseNumeric(row[12]) }, //PWDs CF Baseline
                { attribute: "fzmOUbl4xJ4", value: parseNumeric(row[13]) }, //PWDs CF Target
                { attribute: "ZQTg0EJma86", value: parseNumeric(row[14]) }, //DACF-RFG Baseline
                { attribute: "ILzpS1dryP7", value: parseNumeric(row[15]) }, //DACF-RFG Target
                { attribute: "GV4Azm9cqym", value: parseNumeric(row[16]) }, //Decentralized Dept Baseline
                { attribute: "n1YNAjagk9P", value: parseNumeric(row[17]) }, //Decentralized Dept Target
                { attribute: "v6RSxf0H9rv", value: parseNumeric(row[18]) }, //GOG Salaries Baseline
                { attribute: "D1nrnwEd9NR", value: parseNumeric(row[19]) }, //GOG Salaries Target
                { attribute: "Qy9R3DHPDCU", value: parseNumeric(row[20]) }, //MDF Baseline
                { attribute: "Q33KoLkJoud", value: parseNumeric(row[21]) }, //MDF Target
                { attribute: "KLzJohYEAeC", value: parseNumeric(row[22]) }, //Stool Lands Baseline
                { attribute: "XM0aRSGYvCG", value: parseNumeric(row[23]) }, //Stool Lands Target
                { attribute: "bhQtVq03XnY", value: parseNumeric(row[24]) }, //CIDA Baseline
                { attribute: "FevvxT7CDep", value: parseNumeric(row[25]) }, //CIDA Target
                { attribute: "FbosSuT4jaL", value: parseNumeric(row[26]) }, //Other Donors Baseline
                { attribute: "T0dM7hVCbHR", value: parseNumeric(row[27]) }, //Other Donors Target
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "Ik7fouv4KOA", value: row[4] || "" }, //Select Year
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getPublicationsPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Publication Channel mapping
    const getPublicationChannelMapping = (value) => {
        const mappings = {
            "Social Media": "Others",
            "Website": "Website",
            "Newspaper": "Newspaper",
            "Notice Board": "Notice Board",
            "Website and Notice Board": "Website and Notice Board",
            "Media Station": "Media Station",
            "Multi-Channel": "Multi-Channel",
            "Others": "Others"
        };
        return mappings[value] || "Others";
    };

    // Date formatting function
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "-") return "";
        // Handle dates like "2023-10-1" -> "2023-10-01"
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1].padStart(2, '0');
            const day = parts[2].padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return dateStr;
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "ozmSnpGukjT", value: formatDate(row[4]) }, //Published Date
                { attribute: "VYCQ5lh0HdP", value: getPublicationChannelMapping(row[5]) }, //Publication Channel
                { attribute: "Iu8c8cj8Dyy", value: row[8] || "" }, //Document Published

                { attribute: "esLqs2on3wb", value: row[6] || "" }, //Publication Channel Other
                { attribute: "PcAeFR1VZmn", value: row[7] || "" }, //Published Website
                { attribute: "dLpaJdUcdI1", value: parseFile(row[9]) }, //Notice Board Image
                { attribute: "h2qzIw9348I", value: parseBool(row[10]) }, //Distributed to MPCU Members
                { attribute: "VVe0mEoykVD", value: formatDate(row[11]) }, //MPCU Members Distribution Date
                { attribute: "usccm7IEAoD", value: row[12] || "" }, //Document Reference
                { attribute: "c4ZR8yj3VZH", value: row[13] || "" }, //Transmittal Letter to MPCU Reference No.
                { attribute: "sL5SfjbM6yv", value: parseBool(row[14]) }, //Distributed to Assembly Members
                { attribute: "CGzoXfumfSl", value: formatDate(row[15]) }, //Assembly Members Distribution Date
                { attribute: "gGPbCe38wqg", value: row[16] || "" }, //Transmittal Letter to Assembly Members Reference No.
                { attribute: "Jc3p19yBvnN", value: parseBool(row[17]) }, //Distributed to Sub-structures Committees
                { attribute: "VaAsLRhe81v", value: formatDate(row[18]) }, //Sub Structure Committee Distribution Date
                { attribute: "pXBfRA6syLE", value: row[19] || "" }, //Transmittal Letter to Sub Structure Committee Reference No.
                { attribute: "RtVONJyhKAh", value: formatDate(row[20]) }, //Document Approval Date
            ],

            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "ozmSnpGukjT", value: formatDate(row[4]) }, //Published Date
                        { attribute: "VYCQ5lh0HdP", value: getPublicationChannelMapping(row[5]) }, //Publication Channel
                        { attribute: "Iu8c8cj8Dyy", value: row[8] || "" }, //Document Published
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getSanitationAndWasteTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YfoGKu8N6An", value: row[5] || "" }, //Date
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YfoGKu8N6An", value: row[5] || "" }, //Date
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}
// INCOPLETE  TESTING>>
export const getSocialInclusiveProgramTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Number validation function
    const parseNumber = (value) => {
        if (!value || value === "-") return "";
        const num = parseInt(value);
        return isNaN(num) ? "" : num.toString();
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "CxW1R33QUV2", value: row[5] || "" }, //Social Inclusive Programme
                { attribute: "FVPxJuIxIrM", value: row[7] || "" }, //Primary Funding Source
                { attribute: "ZERTtsbXXc7", value: row[9] || "" }, //Supervisor
                { attribute: "n7h6V5qo8Td", value: parseNumber(row[10]) }, //Number of Target Beneficiaries
                { attribute: "mdO1ngv0Qt0", value: parseNumber(row[13]) }, //Budget Allocated (Ghana cedis)
                { attribute: "gkqU35LKO4t", value: row[14] || "" }, //Start Date

                { attribute: "qkHXURztKyc", value: row[15] || "" }, //End Date
                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "ZXbvKuyurxe", value: row[6] || "" }, //Other (specify)
                { attribute: "Z4ibyZpPR1T", value: row[8] || "" }, //Other (specify)
                { attribute: "ilVNpuD0NUj", value: parseNumber(row[11]) }, //Target Male Beneficiary
                { attribute: "N2RLXZiGLBy", value: parseNumber(row[12]) }, //Target Female Beneficiary
                { attribute: "x4qBAYjalCD", value: row[16] || "" }, //Remarks
            ],

            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "CxW1R33QUV2", value: row[5] || "" }, //Social Inclusive Programme
                        { attribute: "FVPxJuIxIrM", value: row[7] || "" }, //Primary Funding Source
                        { attribute: "ZERTtsbXXc7", value: row[9] || "" }, //Supervisor
                        { attribute: "n7h6V5qo8Td", value: parseNumber(row[10]) }, //Number of Target Beneficiaries
                        { attribute: "mdO1ngv0Qt0", value: parseNumber(row[13]) }, //Budget Allocated (Ghana cedis)
                        { attribute: "gkqU35LKO4t", value: row[14] || "" }, //Start Date
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}

export const getSubStructureActivityTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Activity funding source mapping
    const getFundingSourceMapping = (value) => {
        if (!value || value === "-") return "";

        const mappings = {
            "2% of DACF": "DACF",
            "DACF": "DACF",
            "Revenue Ceded": "Revenue Ceded",
            "IGF": "Revenue Ceded", // Map IGF to Revenue Ceded if that's the closest match
            "Internally Generated Fund": "Revenue Ceded",
            "Other": "Revenue Ceded" // Default fallback
        };

        // Check for partial matches
        const lowerValue = value.toLowerCase();
        if (lowerValue.includes('dacf')) return "DACF";
        if (lowerValue.includes('revenue') || lowerValue.includes('igf')) return "Revenue Ceded";

        return mappings[value] || "Revenue Ceded"; // Default to Revenue Ceded
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "sI8Kj3pfa6k", value: row[4] || "" }, //Name of Sub structure
                { attribute: "hQVox0xawJI", value: row[5] || "" }, //Amount
                { attribute: "VjFxjvQk0cO", value: row[8] || "" }, //Activity Description

                { attribute: "PReqkv3CYaE", value: getFundingSourceMapping(row[6]) }, //Activity funding source
                { attribute: "YfoGKu8N6An", value: row[7] || "" }, //Date
            ],

            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "sI8Kj3pfa6k", value: row[4] || "" }, //Name of Sub structure
                        { attribute: "hQVox0xawJI", value: row[5] || "" }, //Amount
                        { attribute: "VjFxjvQk0cO", value: row[8] || "" }, //Activity Description
                    ]
                }
            ],
        };

        payload.push(tempDataSet);
    });

    return {
        "trackedEntities": payload
    }
}//TESTED

export const getSubStructureCommitteePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "sI8Kj3pfa6k", value: row[4] || "" }, //Name of Sub Structure	
                { attribute: "HpWdkwq4K4Q", value: row[5] || "" }, //Sub Structure Committee Category
                { attribute: "AlVMRjjWuVo", value: row[7] || "" }, //Established Date

                { attribute: "f1V1vDibPCS", value: row[6] || "" }, //Other (specify)       
                { attribute: "yWbhfTquC4O", value: row[8] || "" }, //Committee Established Type
                { attribute: "bSO81USC3ZN", value: row[9] || "" }, //Electoral Area
                { attribute: "bIGyTZp8ORb", value: row[10] || "" }, //Names of Assembly Members
                { attribute: "sGe7MGw4BVN", value: row[11] || "" }, //Phone
                { attribute: "h6jVcd8pSCZ", value: parseCoordinate(row[12]) }, //Location Coordinate
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "sI8Kj3pfa6k", value: row[4] || "" }, //Name of Sub Structure	
                        { attribute: "HpWdkwq4K4Q", value: row[5] || "" }, //Sub Structure Committee Category
                        { attribute: "AlVMRjjWuVo", value: row[7] || "" }, //Established Date
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getTestFruitApplicationPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "JsjIwEt18J0", value: parseBool(row[4]) }, //Fruit | On the scale of 1 - 5

                { attribute: "mB5J8mki06Q", value: row[5] || "" }, //Fruit Option 1
                { attribute: "N4S0i2fi0xa", value: row[6] || "" }, //Fruit Option 2
                { attribute: "fNavKvngj9W", value: parseBool(row[7]) }, //Do you like mango?
                { attribute: "GwCgBmiICKl", value: parseBool(row[8]) }, //Do you like orange?
                { attribute: "Z7Fgg9OWyHg", value: parseBool(row[9]) }, //Do you like coconut?
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "JsjIwEt18J0", value: parseBool(row[4]) }, //Fruit | On the scale of 1 - 5
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getResidentialHomeCentrePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name 
                { attribute: "sGe7MGw4BVN", value: parseNumeric(row[8]) }, //Phone
                { attribute: "BZbNSkBY5w5", value: row[9] || "" }, //Public Hotline

                { attribute: "SKeHl5XTZVG", value: row[5] || "" }, //Email Address
                { attribute: "pF64ANEoPYx", value: row[6] || "" }, //Location
                { attribute: "YqP6CROSeSq", value: row[7] || "" }, //Digital Postal Address
                { attribute: "XDjgAYmON2o", value: row[10] || "" }, //Address Location
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "sGe7MGw4BVN", value: parseNumeric(row[8]) }, //Phone
                        { attribute: "BZbNSkBY5w5", value: row[9] || "" }, //Public Hotline
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getUserProfilePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "yPvU4sPN9hh", value: row[4] || "" }, //First Name
                { attribute: "PtqWutejid0", value: row[5] || "" }, //Last Name
                { attribute: "j3CyzRTfdAk", value: row[6] || "" }, //Gender

                { attribute: "MQ7qa7gOxzb", value: row[7] || "" }, //Date of Birth
                { attribute: "sGe7MGw4BVN", value: parseNumeric(row[8]) }, //Phone
                { attribute: "mUHeOAckLf1", value: row[9] || "" }, //Password
                { attribute: "Ax9xIaMCs52", value: parseFile(row[10]) }, //Picture
                { attribute: "mewas520GEZ", value: row[11] || "" }, //NHIS
                { attribute: "XsUFsoszfgr", value: row[12] || "" }, //Next of Kin name
                { attribute: "Ada5shKwWZB", value: row[13] || "" }, //Next of Kin phone
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "yPvU4sPN9hh", value: row[4] || "" }, //First Name
                        { attribute: "PtqWutejid0", value: row[5] || "" }, //Last Name
                        { attribute: "j3CyzRTfdAk", value: row[6] || "" }, //Gender
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getDocumentsHubPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                { attribute: "HegQ9f2EvbC", value: row[5] || "" }, //Document Type
                { attribute: "wPNjapyO0Jl", value: row[6] || "" }, //Validity Period
                { attribute: "iSGLs8Qaq7E", value: row[7] || "" }, //Reference Number

                { attribute: "tigrJR4126b", value: row[8] || "" }, //Frequency of monitoring
                { attribute: "mfvOjwBcpEMV", value: row[9] || "" }, //District Supervisory Body
                { attribute: "MZWUSf9PCHv", value: row[10] || "" }, //Version
                { attribute: "RtVONJyhKAh", value: row[11] || "" }, //Document Approval Date
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "HegQ9f2EvbC", value: row[5] || "" }, //Document Type
                        { attribute: "wPNjapyO0Jl", value: row[6] || "" }, //Validity Period
                        { attribute: "iSGLs8Qaq7E", value: row[7] || "" }, //Reference Number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getInspectorateUnitEstablishmentTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "AlVMRjjWuVo", value: row[4] || "" }, //Established Date
                { attribute: "RXTTz95xaoO", value: row[5] || "" }, //List of Staff

                { attribute: "w9leRrwWrLB", value: parseBool(row[6]) }, //Has an office been made available for the unit?
                { attribute: "fGfO0hrRRgq", value: row[7] || "" }, //Description
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "AlVMRjjWuVo", value: row[4] || "" }, //Established Date
                        { attribute: "RXTTz95xaoO", value: row[5] || "" }, //List of Staff
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getInternallyGeneratedFundTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Year
                { attribute: "jcFWiKH0Kud", value: row[5] || "" }, //IGF Source
                { attribute: "tsmYBpRcYxU", value: row[6] || "" }, //Total Number Issued
                { attribute: "xSAif899MME", value: row[7] || "" }, //Amount Budgeted
                { attribute: "nlZbT98zSio", value: row[8] || "" }, //Amount Collected

                { attribute: "x4qBAYjalCD", value: row[9] || "" }, //Remarks
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "pWkYqcKukAY", value: row[4] || "" }, //Year
                        { attribute: "jcFWiKH0Kud", value: row[5] || "" }, //IGF Source
                        { attribute: "tsmYBpRcYxU", value: row[6] || "" }, //Total Number Issued
                        { attribute: "xSAif899MME", value: row[7] || "" }, //Amount Budgeted
                        { attribute: "nlZbT98zSio", value: row[8] || "" }, //Amount Collected
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getOneDistrictOneWarehouseTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "YLKXcF4M13E", value: row[4] || "" }, //Ownership Type
                { attribute: "DdrX62P5Fnm", value: row[5] || "" }, //1D1W Component
                { attribute: "tTbvdaHiwu2", value: row[6] || "" }, //Status of implementation

                { attribute: "xzxLzkpzWsc", value: row[7] || "" }, //Application requirement for beneficiaries
                { attribute: "IhvthaZKFv5", value: row[8] || "" }, //Name of responsible institution or schedule officer
                { attribute: "C3p06b9wwvc", value: row[9] || "" }, //Contact details of institution or schedule officer
                { attribute: "MotoRaHYNig", value: row[10] || "" }, //Number of male beneficiaries
                { attribute: "HpEdGx1AVWM", value: row[11] || "" }, //Number of beneficiaries - Male
                { attribute: "zFxTIbayz4U", value: row[12] || "" }, //Estimated Beneficiaries
                { attribute: "VjFxjvQk0cO", value: row[13] || "" }, //Activity Description
                { attribute: "cPGCeyMceZl", value: parseCoordinate(row[14]) }, //Site Coordinates
                { attribute: "wO2BqNRuILL", value: parseFile(row[15]) }, //Site Photo
                { attribute: "S3O6siQ5UBo", value: row[16] || "" }, //Relationship
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "YLKXcF4M13E", value: row[4] || "" }, //Ownership Type
                        { attribute: "DdrX62P5Fnm", value: row[5] || "" }, //1D1W Component
                        { attribute: "tTbvdaHiwu2", value: row[6] || "" }, //Status of implementation
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED

export const getSocialInclusiveProgramBeneficiariesTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "yPvU4sPN9hh", value: row[5] || "" }, //First Name
                { attribute: "PtqWutejid0", value: row[6] || "" }, //Last Name
                { attribute: "j3CyzRTfdAk", value: row[7] || "" }, //Gender
                { attribute: "UJBblniqPOI", value: row[8] || "" }, //Community

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "HgemfhhsXBc", value: row[9] || "" }, //Mobile Number
                { attribute: "vUVEUS3VXbF", value: row[10] || "" }, //Postal Address
                { attribute: "SKeHl5XTZVG", value: row[11] || "" }, //Email Address 
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "yPvU4sPN9hh", value: row[5] || "" }, //First Name
                        { attribute: "PtqWutejid0", value: row[6] || "" }, //Last Name
                        { attribute: "j3CyzRTfdAk", value: row[7] || "" }, //Gender
                        { attribute: "UJBblniqPOI", value: row[8] || "" }, //Community
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

export const getCommunityProfilePayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                { attribute: "qdDngSjZY9H", value: row[6] || "" }, //Classification

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "jX9DTUsh6mx", value: parseCoordinate(row[7]) }, //GIS Coordinates
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[5] || "" }, //Name
                        { attribute: "qdDngSjZY9H", value: row[6] || "" }, //Classification
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }
}//TESTED

export const getClientServiceUnitTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "KKvCqPE0o4r", value: parseBool(row[5]) }, //Office Available (Yes/No)
                { attribute: "AfBfUzcvMVC", value: parseBool(row[6]) }, //Complaint’s Book available (Yes/No)
                { attribute: "YPoOqFSzwjc", value: parseBool(row[7]) }, //Work plan available (Yes/No)
                { attribute: "HnIZkFq81E4", value: row[8] || "" }, //Schedule Officer Name  
                { attribute: "Xwogv0s7lDX", value: row[9] || "" }, //Dedicated Mobile Number

                { attribute: "AlVMRjjWuVo", value: row[4] || "" }, //Established Date
                { attribute: "SKeHl5XTZVG", value: row[10] || "" }, //Email Address

            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "KKvCqPE0o4r", value: parseBool(row[5]) }, //Office Available (Yes/No)
                        { attribute: "AfBfUzcvMVC", value: parseBool(row[6]) }, //Complaint’s Book available (Yes/No)
                        { attribute: "YPoOqFSzwjc", value: parseBool(row[7]) }, //Work plan available (Yes/No)
                        { attribute: "HnIZkFq81E4", value: row[8] || "" }, //Schedule Officer Name  
                        { attribute: "Xwogv0s7lDX", value: row[9] || "" }, //Dedicated Mobile Number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}//TESTED
export const getATSheetTrainingAttendanceSheetTrackerPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    // Designation mapping
    const parseDesignationMapping = (value) => {
        const mappings = {
            "Director": "Director",
            "Accounts Officer": "Accounts Officer",
            "Other": "Other (Specify)"
        };
        return mappings[value] || value;
    };

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "s0psXh4E3zv", value: row[4] || "" }, //Fullname
                { attribute: "deLo7BbZ8Z3", value: row[5] || "" }, //Institution
                { attribute: "J7IrEy5foBT", value: parseDesignationMapping(row[6]) }, //Designation
                { attribute: "HgemfhhsXBc", value: parseNumeric(row[7]) }, //Mobile Number

                { attribute: "SKeHl5XTZVG", value: row[8] || "" }, //Email Address
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "s0psXh4E3zv", value: row[4] || "" }, //Fullname
                        { attribute: "deLo7BbZ8Z3", value: row[5] || "" }, //Institution
                        { attribute: "J7IrEy5foBT", value: parseDesignationMapping(row[6]) }, //Designation
                        { attribute: "HgemfhhsXBc", value: parseNumeric(row[7]) }, //Mobile Number
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}
export const getAgriculturalExtensionandSupportOfficersPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "yPvU4sPN9hh", value: row[5] || "" }, //First Name *
                { attribute: "PtqWutejid0", value: row[6] || "" }, //Last Name *
                { attribute: "j3CyzRTfdAk", value: row[7] || "" }, //Gender *

                { attribute: "IztkGQj5EqM", value: row[4] || "" }, //Unique ID
                { attribute: "MQ7qa7gOxzb", value: row[8] || "" }, //Date of Birth
                { attribute: "Ax9xIaMCs52", value: parseFile(row[9]) }, //Picture	
                { attribute: "HgemfhhsXBc", value: parseNumeric(row[10]) }, //Mobile Number
                { attribute: "SKeHl5XTZVG", value: row[11] || "" }, //Email Address
                { attribute: "IQv3CJDmDna", value: row[12] || "" }, //Ghana Card Number
                { attribute: "YqP6CROSeSq", value: row[13] || "" }, //Digital Postal Address
                { attribute: "vUVEUS3VXbF", value: row[14] || "" }, //Postal Address
                { attribute: "MlZZaEBs9uC", value: row[15] || "" }, //Date of Employment
                { attribute: "gpfdSyKVC9R", value: row[16] || "" }, //Officers Position/Specialization
                { attribute: "ijaTnXxuWKJ", value: row[17] || "" }, //Other Position/Specialization (specify)
                { attribute: "uOSiNltNDjn", value: row[18] || "" }, //Grades
                { attribute: "I0z9Oq0lrj8", value: row[19] || "" }, //Academic Qualification
                { attribute: "kuqX8ZqvbhS", value: row[20] || "" }, //Promotion Details
                { attribute: "eYhNbIb7nYk", value: row[21] || "" }, //Professional Qualification
                { attribute: "SbsvgoYMOps", value: row[22] || "" }, //Duty Station
                { attribute: "saSCm0QDfyU", value: row[23] || "" }, //Current Date Post
                { attribute: "q88J6EIuC5p", value: parseCoordinate(row[24]) }, //Duty Location Coordinates
                { attribute: "x4qBAYjalCD", value: row[25] || "" }, //Remarks
            ],


            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "yPvU4sPN9hh", value: row[5] || "" }, //First Name *
                        { attribute: "PtqWutejid0", value: row[6] || "" }, //Last Name *
                        { attribute: "j3CyzRTfdAk", value: row[7] || "" }, //Gender *
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}

// Program type mapping function
const getProgramTypeMapping = (value) => {
    const mappings = {
        "Economic Empowerment": "Capacity Building",
        "Health Support": "Capacity Building",
        "Education Support": "Capacity Building",
        "Social Support": "Capacity Building",
        "Vocational Training": "Vocation",
        "Skills Development": "Vocation"
    };
    return mappings[value] || "Capacity Building"; // Default to Capacity Building
};

export const getProgramPayload = (data, orgUnit, program, trackedEntityType) => {
    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit,
            trackedEntityType,
            attributes: [
                { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                { attribute: "Y7ts1V4n4Gc", value: row[6] || "" }, //PWD Activity Description
                { attribute: "k0JMgRqxmiJ", value: getProgramTypeMapping(row[12]) }, //PWD Program type

                { attribute: "XDjgAYmON2o", value: row[5] || "" }, //Address Location
                { attribute: "FVPxJuIxIrM", value: row[7] || "" }, //Primary Funding Source
                { attribute: "JDAhouXsGGO", value: row[9] === "-" ? null : row[9] === "Yes" ? true : row[9] === "No" ? false : null }, //Is there additional funding
                { attribute: "QRX2hooQpCo", value: row[11] || "" }, //PWD program budget
                { attribute: "MjCjeCH2TbP", value: row[13] || "" }, //Start Date
                { attribute: "EKTp0a9qtum", value: row[14] || "" }, //End Date
                { attribute: "Ax9xIaMCs52", value: "" }, //Picture
                { attribute: "I8AqLbJESVm", value: row[16] || "" }, //Number of direct beneficiaries female
                { attribute: "nFPavqcYnNs", value: row[17] || "" }, //Number of direct beneficiaries Male

            ],

            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: (row[2] && row[2] !== "-") ? row[2] : "2025-01-01T00:00:00.000",
                    occurredAt: (row[3] && row[3] !== "-") ? row[3] : "2025-01-01T00:00:00.000",
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "wca7mlI2exE", value: row[4] || "" }, //Name
                        { attribute: "Y7ts1V4n4Gc", value: row[6] || "" }, //PWD Activity Description
                        { attribute: "k0JMgRqxmiJ", value: getProgramTypeMapping(row[12]) }, //PWD Program type - FIXED
                    ]
                }
            ],
        };

        payload.push(tempDataSet);

    });

    return {
        "trackedEntities": payload
    }

}


const clean = (val) => (val === "-" || val === undefined ? "" : val);

// Mapping functions
const getMeetingTypeMapping = (value) => {
    const mappings = {
        "General Assembly": "GA",
        "Management Meeting": "Management Meetings",
        "Public Relations and Complaints Committee(PRCC)": "PRCC"
    };
    return mappings[value] || value || "";
};

const getSignerMapping = (value) => {
    const mappings = {
        "Presiding Member": "PM",
        "Convener": "C"
    };
    return mappings[value] || value || "";
};

const getAssemblyTypeMapping = (value) => {
    const mappings = {
        "Extra Ordinary Meeting": "Special Meeting",
        "Emergency Meeting": "Special Meeting"
    };
    return mappings[value] || value || "";
};


function generateProjectId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `${randomLetters}${randomNumbers}`;
}


export const getProjectPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        // Utility to replace "-" with "" and preserve 0 for numbers
        const projectId = generateProjectId();


        // Build attributes array
        const attributes = [
            { attribute: "s9DLL3i1DoG", value: projectId }, // project id
            { attribute: "wca7mlI2exE", value: clean(row[7]) }, // name
            { attribute: "pF64ANEoPYx", value: clean(row[10]) }, // location
            { attribute: "XlP38Ti4IDm", value: clean(row[12]) }, // development dimension
            { attribute: "HBT45AEPUEY", value: clean(row[15]) }, // contractor
            { attribute: "Gjp3MCitNjZ", value: row[18] === "-" ? 0 : row[18] }, // contract sum
            { attribute: "lXixoqQDyMf", value: clean(row[19]) }, // currency
            { attribute: "FVPxJuIxIrM", value: clean(row[20]) }, // primary funding source
            { attribute: "nqfJw87a0OY", value: clean(row[5]) }, // contract no
            { attribute: "wtf3BR2YO8w", value: clean(row[6]) }, // project & programme type
            { attribute: "fGfO0hrRRgq", value: clean(row[8]) }, // description
            { attribute: "x4qBAYjalCD", value: clean(row[9]) }, // remarks
            { attribute: "k921oNWPSd4", value: clean(row[13]) }, // sector
            { attribute: "EkU6HmV2UhW", value: clean(row[16]) }, // awarded date
            { attribute: "Xlu1Z8uDhbU", value: clean(row[17]) }, // consultant
            { attribute: "TbBnbZpfSB0", value: clean(row[21]) }, // project & programme funding source type
            { attribute: "laeUzGtaHGQ", value: row[22] === "-" ? 0 : row[22] }, // primary amount contributed
            { attribute: "SJhftGrkUr4", value: clean(row[23]) }, // secondary funding source
            { attribute: "VT3vVii1aCg", value: row[24] === "-" ? 0 : row[24] }, // secondary amount contributed
            { attribute: "UGSorHuKv95", value: clean(row[25]) }, // tertiary funding source
            { attribute: "ILWcSvIhjql", value: row[26] === "-" ? 0 : row[26] }, // tertiary amount contributed
            { attribute: "JgjD9cTUbhm", value: clean(row[30]) }, // expected start date
            { attribute: "T7LiYCQ3LAm", value: clean(row[31]) }, // expected completion date
            { attribute: "gkqU35LKO4t", value: clean(row[32]) }, // start date
            { attribute: "qkHXURztKyc", value: clean(row[33]) }, // end date
            { attribute: "hSgCkWoDT1D", value: clean(row[34]) }, // total male beneficiary
            { attribute: "kGdgXatUQ8a", value: clean(row[35]) }, // total female beneficiary
            { attribute: "bzOiJtn6tC4", value: clean(row[37]) }, // EPA permit number
            { attribute: "bRQoKAk6wsQ", value: clean(row[38]) }, // department
            { attribute: "BcgmVvDqyk0", value: clean(row[39]) }, // collaborating department
            { attribute: "W8Wvul1ckiS", value: row[40] === "-" ? 0 : row[40] }, // estimated cost
            { attribute: "dWaFloDzwWh", value: row[41] === "-" ? 0 : row[41] }, // actual release
            { attribute: "UyeEjhOXiyW", value: row[42] === "-" ? 0 : row[42] }, // rollover cost
            { attribute: "NfY4xJLSfAf", value: clean(row[43]) }, // project focus
            { attribute: "r79D4IOU6DU", value: row[44] === "-" ? 0 : row[44] }, // revise contract sum
        ];

        const tempDataSet = {
            orgUnit, // from your existing variable
            trackedEntityType,
            attributes,
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "2025-01-01", // Enrollment Date
                    occurredAt: row[3] || "2025-01-01", // Incident Date
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "s9DLL3i1DoG", value: projectId }, // project id
                        { attribute: "wca7mlI2exE", value: clean(row[7]) }, // name
                        { attribute: "pF64ANEoPYx", value: clean(row[10]) }, // location
                        { attribute: "XlP38Ti4IDm", value: clean(row[12]) }, // development dimension
                        { attribute: "HBT45AEPUEY", value: clean(row[15]) }, // contractor
                        { attribute: "Gjp3MCitNjZ", value: row[18] === "-" ? 0 : row[18] }, // contract sum
                        { attribute: "lXixoqQDyMf", value: clean(row[19]) }, // currency
                        { attribute: "FVPxJuIxIrM", value: clean(row[20]) }, // primary funding source
                        { attribute: "nqfJw87a0OY", value: clean(row[5]) }, // contract no
                        { attribute: "wtf3BR2YO8w", value: clean(row[6]) }, // project & programme type
                    ]
                }
            ]
        };

        payload.push(tempDataSet);
    });


    return {
        "trackedEntities": payload
    }

}


export const getMandatoryFieldByTracker = (tracker) => {
    const trackerFields = {
        "Projects & Programmes Register (P&P)": [
            { attribute: "s9DLL3i1DoG", description: "Project ID" },
            { attribute: "wca7mlI2exE", description: "Name" },
            { attribute: "pF64ANEoPYx", description: "Location" },
            { attribute: "XlP38Ti4IDm", description: "Development Dimension" },
            { attribute: "HBT45AEPUEY", description: "Contractor" },
            { attribute: "Gjp3MCitNjZ", description: "Contract Sum" },
            { attribute: "lXixoqQDyMf", description: "Currency" },
            { attribute: "FVPxJuIxIrM", description: "Primary Funding Source" },
            { attribute: "nqfJw87a0OY", description: "Contract No" },
            { attribute: "wtf3BR2YO8w", description: "Project & Programme Type" },
        ],

        "Annual Action Plan (AAP)": [
            { attribute: "pWkYqcKukAY", description: "Year" },
            { attribute: "IHP9xBgvYu7", description: "Activity Name" },
            { attribute: "VjFxjvQk0cO", description: "Activity Description" },
            { attribute: "Ni5mF1bxTcq", description: "Activity State" },
            { attribute: "vYOjuRKymY8", description: "Focus Activity" },
            { attribute: "JgjD9cTUbhm", description: "Expected Start Date" },
            { attribute: "Go8eelOBPsP", description: "Lead Implementing Agency" },
            { attribute: "IZZ2dtfaCC1", description: "Activity Type" },
        ],

        "Bill Tracker": [
            { attribute: "QUuxyqTen7u", description: "Serial Number" },
            { attribute: "YfoGKu8N6An", description: "Date" },
            { attribute: "TBJZqGzKrLx", description: "Has it been issued" },
            { attribute: "zud2JY8pPTV", description: "Bill Status" },
            { attribute: "hQVox0xawJI", description: "Bill Amount" },
        ],

        "Annual Action Plan Baselines and Targets": [
            { attribute: "Ik7fouv4KOA", description: "Year" }
        ],

        "Budget Allocation Tracker": [
            { attribute: "Ik7fouv4KOA", description: "Year" },
            { attribute: "DVNScIHo9ik", description: "Budget Categroy" },
            { attribute: "t9GmH5N6fuW", description: "Allocated Budget" }
        ],

        "Operational Health Facility Tracker": [
            { attribute: "wca7mlI2exE", decription: "Name" }, // Name
            { attribute: "pF64ANEoPYx", description: "Location" }, // Location
            { attribute: "KeSsfvs1awo", decription: "Owner/leader" }, // Owner/leader
            { attribute: "vIkEALDVio6", description: "Ownersip Type" }, // Ownersip Type
        ],
        "Sport Facility Tracker": [
            { attribute: "d4vGACWAj7R", decription: "Name of sport facility" }, // Name of sport facility
            { attribute: "NU2g62mWHJQ", decription: "Facility ownership type" }, // facility ownership type
        ],
        "Service Providers Tracker": [
            { attribute: "Hq8it9qapWz", decription: "Service Provider" }, // Service Provider
            { attribute: "ttyKWvSBAZH", decription: "Name of Business" }, // Name of Business 
            { attribute: "XDjgAYmON2o", decription: "Address location" }, // Address location
            { attribute: "SKeHl5XTZVG", decription: "Period of contract" }, // Period of contract
            { attribute: "tb0nGRwpQEw", decription: "Start date" }, // Start date
        ],
        "School Profile Tracker": [
            { attribute: "UJBblniqPOI", decription: "Community" }, // Community
            { attribute: "RYU3GpNzokp", decription: "Type" }, // Type
        ],
        "Meetings Tracker": [
            { attribute: "eOsejnvfYiV", decription: "Invitation letter date" }, // Invitation letter date
            { attribute: "Mm3f9fbAT8r", decription: "Invitation letter reference number" }, // Invitation letter reference number
            { attribute: "rSKzHSBlOyB", decription: "Who signed the invitation letter?" }, // Who signed the invitation letter
            { attribute: "Ub0V9Z06aBc", decription: "Meeting date" }, // Meeting date
            { attribute: "kghpIZgHFsT", decription: "Meeting type" }, // Meeting type
            { attribute: "b7uAJaX9obN", decription: "Meeting title" }, // Meeting title
            { attribute: "HmdJqjjAZZ4", decription: "Meeting venue" }, // Meeting venue
            { attribute: "Br9IEOZyKPW", decription: "Number of desicions" }, // Number of desicions
            { attribute: "U2RjiIApoYu", decription: "Number of Attendance Male" }, // Number of Attendance Male
            { attribute: "iHz18pXkmMd", decription: "Number of Attendance Female" }, // Number of Attendance Female
        ],
        "People With Disability Tracker": [
            { attribute: "yPvU4sPN9hh", description: "First Name" }, //First Name
            { attribute: "PtqWutejid0", description: "Last Name" }, //Last Name
            { attribute: "j3CyzRTfdAk", description: "Gender" }, //Gender
            { attribute: "NA5Bek1ME81", description: "Disability type" }, //Disability type
            { attribute: "yUDWmWXB08P", description: "Does this PWD have a caretaker" }, //Does this PWD have a caretaker
        ],
        "Program Tracker": [
            { attribute: "wca7mlI2exE", decription: "Name" }, //Name
            { attribute: "Y7ts1V4n4Gc", decription: "PWD Activity Description" }, //PWD Activity Description
            { attribute: "k0JMgRqxmiJ", decription: "PWD Program type" }, //PWD Program type
        ],
        "Boundary Dispute Tracker": [
            { attribute: "mM7z6LuxndL", description: "Does the district have boundary issue" }, //Does the district have boundary issue
        ],
        "Computerized Billing System": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "biAXx5doufe", description: "Developed by" }, //Developed by
            { attribute: "J2GkQ7g6IFk", description: "Purchased cost" }, //Purchased cost
            { attribute: "RP06q4eZ8Sp", description: "Valid from" }, //Valid from
        ],
        "Capacity Building Needs": [
            { attribute: "VjFxjvQk0cO", description: "Activity Description" }, //Activity Description
            { attribute: "Ni5mF1bxTcq", description: "Activity State" }, //Activity State
            { attribute: "nyeFHN5Z9oJ", description: "Activity type" }, //Activity type
            { attribute: "vYOjuRKymY8", description: "Focus activity" }, //Focus activity
            { attribute: "wcnA9Wodtf2", description: "Capacity Building Needs from" }, //Capacity Building Needs From/Source
        ],
        "Consulting And Contractors": [
            { attribute: "Cq3sRyzWsDo", description: "Consulting Firm" }, //Consulting Firm
            { attribute: "aNIaNqGn92L", description: "Consulting and contractors agency" }, //Consulting and contractors agency
            { attribute: "ACV6gQvl2H9", description: "Lead consultant" }, //Lead consultant
            { attribute: "f0aBWJl90eO", description: "Tin" }, //Tin
            { attribute: "SKeHl5XTZVG", description: "Email Address" }, //Email Address
            { attribute: "sGe7MGw4BVN", description: "Phone" }, //Phone
        ],
        "Decisions And Complaints": [
            { attribute: "xYKvhN8Oxh8", description: "Meeting type" }, //Meeting type
            { attribute: "JRxGCfymyCQ", description: "Type" }, //Type
            { attribute: "dKf1SQYMnnb", description: "Decision" }, //Decision
            { attribute: "CVOeyCI3cvs", description: "Meeting reference number" }, //Meeting reference number
        ],
        "Disaster Tracker": [
            { attribute: "RMSqAr6nFf1", description: "Disaster type" }, //Disaster type
            { attribute: "UJBblniqPOI", description: "Community" }, //Community
        ],
        "District General Tracker": [
            { attribute: "snUEn55Te11", description: "Contact number" }, //Contact number
        ],
        "Expenditure Tracker": [
            { attribute: "Ik7fouv4KOA", description: "Select year" }, //Select year
            { attribute: "b43bkz6RXZp", description: "Compensation baseline" }, //Compensation baseline
            { attribute: "nPF1S77QJlJ", description: "Compensation target" }, //Compensation target
            { attribute: "RkqGw55wSjg", description: "Goods and services baseline" }, //Goods and services baseline
            { attribute: "H6w6dGV8Z2h", description: "Goods and services target" }, //Goods and services target
            { attribute: "iUIpVf849wt", description: "Investment/Assets baseline" }, //Investment/Assets baseline
            { attribute: "w6nouX0rtwI", description: "Investment/Assets target" }, //Investment/Assets target
        ],
        "District Assembly Departments": [
            { attribute: "bRQoKAk6wsQ", description: "Department" }, //Department
        ],
        "Job Tracker": [
            { attribute: "pWkYqcKukAY", description: "Year" }, //Year
            { attribute: "OCBgYfq4nyM", description: "Type of resource invested" }, //Type of resource invested
            { attribute: "gyfJjP84zNY", description: "Activity/Type of support" }, //Activity/Type of support
        ],
        "Food Vendors Register": [
            { attribute: "YxKVJA1budd", description: "Name of vendor/Business" }, //Name of vendor/Business
            { attribute: "pF64ANEoPYx", description: "Location" }, //Location
        ],
        "Evaluation And PME Tracker": [
            { attribute: "PsxxJj3wx44", description: "Evaluation type" }, //Evaluation type 
            { attribute: "hx05ofamA7l", description: "Evaluation Name" }, //Evaluation Name
            { attribute: "oTcsi23MG05", description: "Policy/programme/project involved" }, //Policy/programme/project involved
            { attribute: "ECGp5Dsci98", description: "Consultant or resource persons involved" }, //Consultant or resource persons involved
            { attribute: "FB3EHelJc3s", description: " Methodology used" }, //Methodology used
        ],
        "Dumping Site or engineered landfills": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "vIkEALDVio6", description: "Ownerwship type" }, //Ownerwship type
            { attribute: "XgZK7dL7XeI", description: "Is there a co-ownership for the site" }, //Is there a co-ownership for the site
            { attribute: "kLrk8oInbNY", description: "Dumping site waste type" }, //Dumping site waste type
            { attribute: "SbhCyq5YIw6", description: "Is the site engineered or well-maintained dumping site" }, //Is the site engineered or well-maintained dumping site
            { attribute: "ihwNh0qiX0W", description: "Is it EPA certified" }, //Is it EPA certified
        ],
        "DPAT Scoring Sheet": [
            { attribute: "pWkYqcKukAY", description: "Name" }, //Name
        ],
        "Inspectorate Unit Activity Tracker": [
            { attribute: "YfoGKu8N6An", description: "Date" }, //Date
            { attribute: "Ituuy7n8JGg", description: "Type" }, //Type
            { attribute: "ZERTtsbXXc7", description: "Supervisor" }, //Supervisor
            { attribute: "XDjgAYmON2o", description: "Address location" }, //Address location
            { attribute: "IsUOT8aa9xW", description: "Identified issue" }, //Identified issue
            { attribute: "G0tGOE5UsOg", description: "Recommendations" }, //Recommendations
        ],
        "Key Critical Poverty Issues Tracker": [
            { attribute: "AVnIp8rij7C", description: "Critical development and poverty issues" }, //Critical development and poverty issues
        ],
        "Permits Request Tracker": [
            { attribute: "YfoGKu8N6An", description: "Date" }, //Date
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "FuOpGyKgvyG", description: "Purpose" }, //Purpose
            { attribute: "LNAq7fnyatP", description: "Type of Request" }, //Type of Request
            { attribute: "pWkYqcKukAY", description: "Year" }, //Year
            { attribute: "HfzMa3hSgln", description: "Submitted by" }, //Submitted by
            { attribute: "LEV8QecVUev", description: "Received by" }, //Received by
        ],
        "Street Naming Tracker": [
            { attribute: "Nb0p0tlOqVE", description: "Locality" }, //Locality
            { attribute: "bWDiirSEBSX", description: "Location" }, //Location
            { attribute: "pF64ANEoPYx", description: "Identifiable number" }, //Identifiable number
            { attribute: "pL0FwhfkQpm", description: "Is the street tarred" }, //Is the street tarred
            { attribute: "pya3uRXtS2R", description: "Is the street named" }, //Is the street named
        ],
        "Statutory Member Tracker": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "sGe7MGw4BVN", description: "Phone" }, //Phone
        ],
        "Logistic Tracker": [
            { attribute: "tcF1c2zJO29", description: "Item category" }, //Item category
            { attribute: "Ik7fouv4KOA", description: "Select year" }, //Select year
            { attribute: "zlmMobounnu", description: "Required" }, //Required
            { attribute: "kLaD82vCQLh", description: "Actual" }, //Actual
        ],
        "Vulnerability Tracker": [
            { attribute: "FtQuKEoL20x", description: "Hotline number" }, //Hotline number
        ],
        "Legal Case Tracker": [
            { attribute: "K5AYrUoz6EC", description: "Case no" }, //Case no
        ],
        "LED Related Programs": [
            { attribute: "YfoGKu8N6An", description: "Date" }, //Date
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "tORGLTLHCtn", description: "Type" }, //Type
            { attribute: "x2GKaz9PPqu", description: "Agenda/Purpose" }, //Agenda/Purpose
            { attribute: "nFPavqcYnNs", description: "No. of direct beneficiaries male" }, //No. of direct beneficiaries male
            { attribute: "I8AqLbJESVm", description: "No. of direct beneficiaries female" }, //No. of direct beneficiaries female
        ],
        "Property Tracker": [
            { attribute: "Nb0p0tlOqVE", description: "Locality" }, //Locality
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "vIkEALDVio6", description: "Ownership type" }, //Ownership type
        ],
        "Marketing Business Tracker": [
            { attribute: "ttyKWvSBAZH", description: "Name of Business" }, //Name of Business
            { attribute: "VIU6RY5WpCP", description: "Business Category" }, //Business Category
            { attribute: "Dy3Xf20x913", description: "Scale of operation" }, //Scale of operation
            { attribute: "bh6EtWj6etP", description: "Quality Standard Requirement" }, //Quality Standard Requirement
            { attribute: "sGe7MGw4BVN", description: "Phone" }, //Phone
        ],
        "Payment Point Tracker": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "rMNArgwjSNi", description: "Payment Point type" }, //Payment Point Type
            { attribute: "cOxc3578azW", description: "Payment Point Site" }, //Payment Point Site
        ],
        "Audit Issues Tracker": [
            { attribute: "WYgiGtg3fbF", description: "Audit Category" }, //Audit Category
            { attribute: "Ik7fouv4KOA", description: "Select Year" }, //Select Year
        ],
        "Annual Progress Report Tracker": [
            { attribute: "IHP9xBgvYu7", description: "Activity Name" }, //Activity Name
        ],
        "Revenue Tracker": [
            { attribute: "Ik7fouv4KOA", description: "Select Year" }, //Select Year
        ],
        "Publications Tracker": [
            { attribute: "ozmSnpGukjT", description: "Published Date" }, //Published Date
            { attribute: "VYCQ5lh0HdP", description: "Publication Channel" }, //Publication Channel
            { attribute: "Iu8c8cj8Dyy", description: "Document Published" }, //Document Published
        ],
        "Sanitation and Waste Tracker": [
            { attribute: "YfoGKu8N6An", description: "Date" }, //Date
        ],
        "Social Inclusive Program Tracker": [
            { attribute: "CxW1R33QUV2", description: "Social Inclusive Programme" }, //Social Inclusive Programme
            { attribute: "FVPxJuIxIrM", description: "Primary Funding Source" }, //Primary Funding Source
            { attribute: "ZERTtsbXXc7", description: "Supervisor" }, //Supervisor
            { attribute: "n7h6V5qo8Td", description: "umber of Target Beneficiaries" }, //Number of Target Beneficiaries
            { attribute: "mdO1ngv0Qt0", description: "Budget Allocated(Ghana cedis)" }, //Budget Allocated (Ghana cedis)
            { attribute: "gkqU35LKO4t", description: "Start Date" }, //Start Date
        ],
        "Sub Structure Activity Tracker": [
            { attribute: "sI8Kj3pfa6k", description: "Name of Sub structure" }, //Name of Sub structure
            { attribute: "hQVox0xawJI", description: "Amount" }, //Amount
            { attribute: "VjFxjvQk0cO", description: "Activity Description" }, //Activity Description
        ],
        "Sub Structure Committee": [
            { attribute: "sI8Kj3pfa6k", description: "Sub Structure Committee" }, //Sub Structure Committee	
            { attribute: "HpWdkwq4K4Q", description: "Sub Structure Committee Category" }, //Sub Structure Committee Category
            { attribute: "AlVMRjjWuVo", description: "Established Date" }, //Established Date
        ],
        "Test Fruit Application": [
            { attribute: "JsjIwEt18J0", description: "Fruit | On the scale of 1 - 5" }, //Fruit | On the scale of 1 - 5
        ],
        "Residential Home Centre": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "sGe7MGw4BVN", description: "Phone" }, //Phone
            { attribute: "BZbNSkBY5w5", description: "Public Hotline" }, //Public Hotline
        ],
        "User Profile": [
            { attribute: "yPvU4sPN9hh", description: "First Name" }, //First Name
            { attribute: "PtqWutejid0", description: "Last Name" }, //Last Name
            { attribute: "j3CyzRTfdAk", description: "Gender" }, //Gender 
        ],
        "Documents Hub": [
            { attribute: "wca7mlI2exE", description: "Name" }, //Name
            { attribute: "HegQ9f2EvbC", description: "Document Type" }, //Document Type
            { attribute: "wPNjapyO0Jl", description: "Validity Period" }, //Validity Period
            { attribute: "iSGLs8Qaq7E", description: "Reference Number" }, //Reference Number
        ],
        "Inspectorate Unit Establishment Tracker": [
            { attribute: "AlVMRjjWuVo", description: "Established Date" }, //Established Date
            { attribute: "RXTTz95xaoO", description: "List of Staff" }, //List of Staff
        ],
        "Internally Generated Fund Tracker": [
            { attribute: "pWkYqcKukAY", description: "Year" }, //Year
            { attribute: "jcFWiKH0Kud", description: "IGF Source" }, //IGF Source
            { attribute: "tsmYBpRcYxU", description: "Total Number Issued" }, //Total Number Issued
            { attribute: "xSAif899MME", description: "Amount Budgeted" }, //Amount Budgeted
            { attribute: "nlZbT98zSio", description: "Amount Collected " }, //Amount Collected
        ],
        "One District One Warehouse Tracker": [
            { attribute: "YLKXcF4M13E", description: "Ownership Type" }, //Ownership Type
            { attribute: "DdrX62P5Fnm", description: "1D1W Component" }, //1D1W Component
            { attribute: "tTbvdaHiwu2", description: "Status of implementation" }, //Status of implementation
        ],
        "Social Inclusive Program Beneficiaries Tracker": [
            { attribute: "yPvU4sPN9hh", description: "First Name" }, //First Name
            { attribute: "PtqWutejid0", description: "Last Name" }, //Last Name
            { attribute: "j3CyzRTfdAk", description: "Gender" }, //Gender
            { attribute: "UJBblniqPOI", description: "Community" }, //Community
        ],
        "Community Profile": [
            { attribute: "wca7mlI2exE", description: "Community" }, //Name
            { attribute: "qdDngSjZY9H", description: "Classification" }, //Classification
        ],
        "Client Service Unit Tracker": [
            { attribute: "KKvCqPE0o4r", description: "Office Available (Yes/No)" }, //Office Available (Yes/No)
            { attribute: "AfBfUzcvMVC", description: "Complaints Book available (Yes/No)" }, //Complaint’s Book available (Yes/No)
            { attribute: "YPoOqFSzwjc", description: "Work plan available (Yes/No)" }, //Work plan available (Yes/No)
            { attribute: "HnIZkFq81E4", description: "Schedule Officer Name" }, //Schedule Officer Name  
            { attribute: "Xwogv0s7lDX", description: "Dedicated Mobile Number" }, //Dedicated Mobile Number
        ],
        "ATSheet Training Attendance Sheet Tracker": [
            { attribute: "s0psXh4E3zv", description: "Fullname" }, //Fullname
            { attribute: "deLo7BbZ8Z3", description: "Institution" }, //Institution
            { attribute: "J7IrEy5foBT", description: "Designation" }, //Designation
            { attribute: "HgemfhhsXBc", description: "Mobile Number" }, //Mobile Number
        ],
        "Agricultural Extension and Support Officers": [
            { attribute: "yPvU4sPN9hh", description: "First Name" }, //First Name
            { attribute: "PtqWutejid0", description: "Last Name" }, //Last Name
            { attribute: "j3CyzRTfdAk", description: "Gender" }, //Gender
        ]
    };

    return trackerFields[tracker] || [];
};



export const getMissingMandatoryFieldsMessage = (fields, payload) => {
    let messages = [];

    if (!payload || !Array.isArray(payload)) {
        return "❌ Invalid payload data";
    }

    payload.forEach((entity, index) => {
        let missing = [];

        fields.forEach((field) => {
            const match = entity.attributes.find(
                (attr) => attr.attribute === field.attribute
            );

            if (!match || match.value === null || match.value === undefined || match.value === "") {
                missing.push(field.description || field.attribute);
            }
        });

        if (missing.length > 0) {
            messages.push(
                `Row ${index + 1}: Missing fields → ${missing.join(", ")}`
            );
        }
    });

    if (messages.length === 0) {
        return "✅ All mandatory fields are populated.";
    }

    return messages.join("\n");
};


