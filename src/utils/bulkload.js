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

const clean = (val) => (val === "-" || val === undefined ? "" : val);

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


