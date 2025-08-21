export const gaMeetingColumns = [
        { title: "Meeting", dataIndex: "meeting", key: "meeting" },
        { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
        { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
        { title: "Interval (Days)", dataIndex: "interval", key: "interval" },
        { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
        { title: "Signatory of Invitation Letter", dataIndex: "signatoryInvitationLetter", key: "signatoryInvitationLetter" },
        { title: "Signatories to minutes of meeting", dataIndex: "signatoriesMinutes", key: "signatoriesMinutes" },
        { title: "Invitation", dataIndex: "invitation", key: "invitation" },
        { title: "Minutes", dataIndex: "docs", key: "docs" }
    ];

export const budgetApprovalColumns = [
        { title: "Meeting (Statutory Organ)", dataIndex: "meeting", key: "meeting" },
        { title: "Date(s) Held", dataIndex: "date", key: "date" },
        { title: "Key Documents Discussed", dataIndex: "documents", key: "documents" },
        { title: "Key Decisions Approval", dataIndex: "approvals", key: "approvals" },
        { title: "Date (Decision/Approval)", dataIndex: "decisions", key: "decisions" },
    ];

export const subStructureEstablishmentColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "meeting" },
    { title: "Date of establishment", dataIndex: "date", key: "date" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "No.", dataIndex: "no", key: "no" },
];


export const subStructureColumns = [
    { title: " ", dataIndex: "meeting", key: "meeting" },
    { title: "1st Meeting Date", dataIndex: "firstMeeting", key: "firstMeeting" },
    { title: "2nd Meeting Date", dataIndex: "secondMeeting", key: "secondMeeting" },
    { title: "3rd Meeting Date", dataIndex: "thirdMeeting", key: "thirdMeeting" },
    { title: "1st Minutes", dataIndex: "firstLink", key: "firstLink" },
    { title: "2nd Minutes", dataIndex: "secondLink", key: "secondLink" },
    { title: "3rd Minutes", dataIndex: "thirdLink", key: "secondLink" }
];


export const revenueSharingColumns = [
    { title: "Name of substructure", dataIndex: "name", key: "name" },
    { title: "Amount collected (GHS)", dataIndex: "collected", key: "collected" },
    { title: "Amount Ceded by MMDA (GHS)", dataIndex: "ceded", key: "ceded" },
    { title: "% Ceded", dataIndex: "percentage", key: "percentage" },
    { title: "Attached Evidence", dataIndex: "docs", key: "docs" }
];

export const ECAMeetingColumns = [
    { title: "Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "General Assembly Meeting Date", dataIndex: "gaMeetingDate", key: "gaMeetingDate" },
    { title: "EC/A Meeting Date", dataIndex: "ecaMeetingDate", key: "ecaMeetingDate" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Attendance", dataIndex: "attendance", key: "attendance" },
    { title: "Minutes", dataIndex: "docs", key: "docs" },
    { title: "Recommendations", dataIndex: "recommendation", key: "recommendation" }
];

export const membersColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Member", dataIndex: "name", key: "name" },
    { title: "Elected/Appointed ", dataIndex: "type", key: "type" },
    { title: "Department", dataIndex: "department", key: "department" }
];


export const subCommitteeCompositionColumns = [
    { title: "No", dataIndex: "key", key: "key" },
    { title: "Name of Sub- Committee", dataIndex: "department", key: "department" },
    { title: "No. of members determined by MA", dataIndex: "count", key: "count" }
];

export const subStatutoryMeetingsColumns = [
    { title: "Committees", dataIndex: "meeting", key: "meeting" },
    { title: "1st Meeting Date", dataIndex: "firstMeeting", key: "firstMeeting" },
    { title: "2nd Meeting Date", dataIndex: "secondMeeting", key: "secondMeeting" },
    { title: "3rd Meeting Date", dataIndex: "thirdMeeting", key: "thirdMeeting" },
    { title: "1st Minutes", dataIndex: "firstLink", key: "firstLink" },
    { title: "2nd Minutes", dataIndex: "secondLink", key: "secondLink" },
    { title: "3rd Minutes", dataIndex: "thirdLink", key: "secondLink" }
];

export const PRCCMeetingColumns = [
    { title: "PRCC Meeting No", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Attendance Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" },
    { title: "Recommendation Link", dataIndex: "recommendation", key: "recommendation" }
];

export const spcMeetingColumns = [
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Attendance Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" },
    { title: "Allowances Link", dataIndex: "recommendation", key: "recommendation" }
];

export const ETCMeetingColumns = [
    { title: "Quarterly ETC Meeting", dataIndex: "meeting", key: "meeting" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Attendance Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" },
    { title: "Recommendation Link", dataIndex: "recommendation", key: "recommendation" }
];

export const internalAuditColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Audit", dataIndex: "audit", key: "audit" },
    { title: "Recommendation", dataIndex: "recommendation", key: "recommendation" }
];

export const internalAuditMeetingColumns = [
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterRef", key: "invitationLetterRef" },
    { title: "Munites Reference", dataIndex: "muniteRef", key: "muniteRef" },
    { title: "Attendance Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" },
    { title: "Reports", dataIndex: "recommendation", key: "recommendation" }
];

export const townHallMeetingColumns = [
    { title: "Invitation Date", dataIndex: "invitationDate", key: "invitationDate" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Invitation Letter Reference", dataIndex: "invitationLetterReference", key: "invitationLetterReference" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Attendance Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" }
];

export const managementMeetingColumns = [
    { title: "Quarter", dataIndex: "meeting", key: "meeting" },
    { title: "Meeting Date", dataIndex: "meetingDate", key: "meetingDate" },
    { title: "Number of Departments in MMDA", dataIndex: "departments", key: "departments" },
    { title: "HODs in Attendance", dataIndex: "hodAttendance", key: "hodAttendance" },
    { title: "Number in Attendance", dataIndex: "attendance", key: "attendance" },
    { title: "Minutes Ref.", dataIndex: "minutes", key: "minutes" },
    { title: "Invitation Letter Link", dataIndex: "invitation", key: "invitation" },
    { title: "Munite Link", dataIndex: "docs", key: "docs" },
    { title: "Decision Link", dataIndex: "recommendation", key: "recommendation" }
];

// =====================================SDI Columns================================

export const serviceDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    { title: "Total No. of decisions taken", dataIndex: "total", key: "total" },
    { title: "No. of decisions on service delivery", dataIndex: "serviceDecision", key: "serviceDecision" },
    { title: "% of decisions on service delivery ", dataIndex: "percentage", key: "percentage" }
];

const renderWithLineBreaks = (str) => {
    return str?.split(/<br\s*\/?>/i).map((line, index) => (
        <div key={index}>{line}</div>
    ));
};

export const serviceDeliveryDecisionColumns = [
    { title: "GAM", dataIndex: "gam", key: "gam" },
    {
        title: "Service Delivery Decisions", dataIndex: "service", key: "service",
        render: (cell, row) => renderWithLineBreaks(cell)
    }
];
