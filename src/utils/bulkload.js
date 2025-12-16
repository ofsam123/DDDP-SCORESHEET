export const getGeneralDistrictPayload = (data, orgUnit, program, trackedEntityType) => {

    const payload = [];

    data.forEach(row => {
        const tempDataSet = {
            orgUnit, // from your existing variable
            trackedEntityType,
            attributes: [
                { attribute: "nVGQlVwOvld", value: row[4] || "" }, // District Level
                { attribute: "snUEn55Te11", value: row[5] || "" }, // Contact Number
                { attribute: "SKeHl5XTZVG", value: row[6] || "" }, // Email Address
                { attribute: "BZbNSkBY5w5", value: row[7] || "" }  // Public Hotline
            ],
            enrollments: [
                {
                    program,
                    orgUnit,
                    enrolledAt: row[2] || "2025-01-01", // Enrollment Date
                    occurredAt: row[3] || "2025-01-01", // Incident Date
                    status: "ACTIVE",
                    attributes: [
                        { attribute: "nVGQlVwOvld", value: row[4] || "" },
                        { attribute: "snUEn55Te11", value: row[5] || "" },
                        { attribute: "SKeHl5XTZVG", value: row[6] || "" },
                        { attribute: "BZbNSkBY5w5", value: row[7] || "" }
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
                    enrolledAt: row[2] || "", // Enrollment Date
                    occurredAt: row[3] || "", // Incident Date
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
                { attribute: "wO2BqNRuILL", value: (row[22] && row[22] !== "-") ? row[22] : "" }, // Site photo

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
                // { attribute: "rSKzHSBlOyB", value: row[7] || "" }, 
                { attribute: "rSKzHSBlOyB", value: getSignerMapping(row[7]) }, // Who signed the invitation letter
                { attribute: "Ub0V9Z06aBc", value: row[8] || "" }, // Meeting date
                // { attribute: "kghpIZgHFsT", value: row[10] || "" }, 
                { attribute: "kghpIZgHFsT", value: getMeetingTypeMapping(row[10]) }, // Meeting type
                { attribute: "b7uAJaX9obN", value: row[15] || "" }, // Meeting title
                { attribute: "HmdJqjjAZZ4", value: row[17] || "" }, // Meeting venue
                { attribute: "Br9IEOZyKPW", value: row[21] || "" }, // Number of desicions
                { attribute: "U2RjiIApoYu", value: row[24] || "" }, // Number of Attendance Male
                { attribute: "iHz18pXkmMd", value: row[25] || "" }, // Number of Attendance Female

                { attribute: "AiPyh2A2DZ8", value: row[6] || "" }, // Means of invitation letter distribution
                { attribute: "unVPW9dCS5B", value: row[9] || "" }, // Minute file number
                // { attribute: "j0kNoCtC8pj", value: row[11] || "" }, 
                { attribute: "j0kNoCtC8pj", value: getAssemblyTypeMapping(row[11]) }, // General assembly meeting types
                { attribute: "hfCSE8B2L9p", value: row[12] || "" }, // Statutory committee types
                { attribute: "sI8Kj3pfa6k", value: row[13] || "" }, // Name of sub structure
                { attribute: "f1V1vDibPCS", value: row[14] || "" }, // Other (specify)
                { attribute: "mH8uydlfv03", value: row[16] || "" }, // Meeting agenda
                { attribute: "uRdPt6OIxvU", value: row[22] || "" }, // Number of cpmplaints
                { attribute: "DGDc7z1ESlb", value: row[23] || "" }, // Number of recommendations made
                // { attribute: "SdtJSE3jJkV", value: row[26] || "" }, 
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

        "District General Tracker": [
            { attribute: "nVGQlVwOvld", description: "District Level" },
            { attribute: "snUEn55Te11", description: "Contact Number" },
            { attribute: "SKeHl5XTZVG", description: "Email Address" },
            { attribute: "BZbNSkBY5w5", description: "Public Hotline" },
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
        ]

    };

    return trackerFields[tracker] || [];
};



export const getMissingMandatoryFieldsMessage = (fields, payload) => {
    let messages = [];

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


