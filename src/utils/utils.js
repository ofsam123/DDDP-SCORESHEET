export function calculatePercentage(part, total) {
  if (total === 0) {
    return 0;
  }
  return (part / total) * 100;
}

export function countApplicationsForEachDomain(data, reports) {

  let noOfApplications = 0;
  let noOfApplicationsProcessed = 0;
  let noOfApplicationsProvided = 0;

  reports?.forEach(rep => {
    const currentReport = data.find(ser => ser.trackedEntity === rep.trackedEntity);

    if (currentReport) {
      const reps = rep.dataValues;
      reps.forEach(curRep => {
        if (curRep.dataElement === "vue6siD7aka") {
          noOfApplications += parseInt(curRep.value);
        }

        if (curRep.dataElement === "rn9j4w7pW9D") {
          noOfApplicationsProcessed += parseInt(curRep.value);
        }

        if (curRep.dataElement === "N0YnoMAm445") {
          noOfApplicationsProvided += parseInt(curRep.value);
        }
      })

    }
  });

  return [noOfApplications, noOfApplicationsProcessed, noOfApplicationsProvided];
}

export function getAttributeValue(key, val) {
  const attr = val?.attributes.find(attr => attr.displayName === key);
  return attr ? attr.value : "N/A";
};

export function formatDataGeneral(data, property, value) {
  return data?.filter(item =>
    item.attributes.some(attr =>
      attr.displayName === property && attr.value === value
    )
  );
}

export function getDataRank(index) {

  switch (index) {
    case 0: return "1st";
    case 1: return "2nd";
    case 2: return "3rd";
    case 3: return "4th";
    default: return "Other";
  }

}

export function filterTrackedEntitiesByCreatedAt(entities, start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return entities.filter(entity => {
    const created = new Date(entity.createdAt);
    return created >= startDate && created <= endDate;
  });
}

export function getPlanExecutionStats(formatedPlans, reports) {
  const counts = {};

  // Step 1: Count total and completed per `dd`
  formatedPlans.forEach(plan => {
    const dd = plan.dd;

    if (!counts[dd]) {
      counts[dd] = { total: 0, completed: 0 };
    }

    counts[dd].total += 1;

    const currentReport = reports.find(rep => rep.trackedEntity === plan.trackedEntity);

    if (currentReport) {
      const isCompleted = currentReport.dataValues.some(rep =>
        rep.dataElement === "SZcHb5mvjJx" && rep.value === "Completed"
      );

      if (isCompleted) {
        counts[dd].completed += 1;
      }
    }
  });

  // Step 2: Convert to array with numbering
  const resultArray = Object.entries(counts).map(([dimension, values], index) => ({
    no: index + 1,
    dimension,
    planned: values.total,
    executed: values.completed
  }));

  // Step 3: Calculate total planned and executed
  const totalPlanned = resultArray.reduce((sum, item) => sum + item.planned, 0);
  const totalExecuted = resultArray.reduce((sum, item) => sum + item.executed, 0);

  // Step 4: Add the final summary row
  resultArray.push({
    dimension: "Total",
    planned: totalPlanned,
    executed: totalExecuted
  });

  return resultArray;
}


export function countByDd(data) {
  return data.reduce((acc, item) => {
    const key = item.dd;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export function getQuarterDate(index, year) {

  switch (index) {
    case 0: return `15/04/${year}`;
    case 1: return `15/07/${year}`;
    case 2: return `15/10/${year}`;
    case 3: return `15/01/${year + 1}`;
    default: return "Other";
  }

}

export function getFileLinkIfExist(reports, attribute, trackedEntity) {
  const currentReport = reports.find(rep => rep.trackedEntity === trackedEntity);

  if (currentReport) {
    const eventId = currentReport.event;
    for (const rep of currentReport.dataValues) {

      if (rep.dataElement === attribute) {
        return eventId;
      }
    }
  }

  return "";
}

export function getFirstFileLinkIfExist(reports, attribute, trackedEntity, stageId, type = "report") {
  const currentReport = reports.find(rep =>
    (rep.trackedEntity === trackedEntity) &&
    (rep.dataValues.length > 0) &&
    (rep.programStage === stageId)
  );

  if (type === "status") {
    if (currentReport) {

      for (const rep of currentReport.dataValues) {

        if (rep.dataElement === attribute) {
          return rep.value;
        }
      }
    }
  } else {
    if (currentReport) {
      const eventId = currentReport.event;
      for (const rep of currentReport.dataValues) {

        if (rep.dataElement === attribute) {
          return eventId;
        }
      }
    }
  }

  return "";
}

export function checkECANDGAMeetingFulfillment(meetings) {

  if (meetings.length === 0) {
    return 'Not Fulfilled';
  }

  for (const mt of meetings) {

    const ecDate = new Date(mt.ecaMeetingDate);
    const gaDate = new Date(mt.gaMeetingDate);

    const missingFields =
      mt.docs === "Not Uploaded" ||
      mt.invitation === "Not Uploaded" ||
      mt.recommendation === "Not Uploaded"


    if ((ecDate > gaDate) || missingFields) {
      return 'Not Fulfilled';
    }
  }

  return 'Fulfilled';
}

export function formatSubStructureMeetings(data) {
  const grouped = {};

  data.filter(val => val.meeting !== "N/A").forEach(item => {
    const meetingName = item.meeting;
    if (!grouped[meetingName]) {
      grouped[meetingName] = {
        meeting: meetingName,
        firstMeeting: null,
        secondMeeting: null,
        thirdMeeting: null,
        firstLink: null,
        secondLink: null,
        thirdLink: null
      };
    }

    // Find the next available slot (first, second, third)
    if (!grouped[meetingName].firstMeeting) {
      grouped[meetingName].firstMeeting = item.meetingDate;
      grouped[meetingName].firstLink = item.docs;
    } else if (!grouped[meetingName].secondMeeting) {
      grouped[meetingName].secondMeeting = item.meetingDate;
      grouped[meetingName].secondLink = item.docs;
    } else if (!grouped[meetingName].thirdMeeting) {
      grouped[meetingName].thirdMeeting = item.meetingDate;
      grouped[meetingName].thirdLink = item.docs;
    }
  });

  return Object.values(grouped);
}

export function formatSubStatutoryMeetings(data) {
  const grouped = {};

  data.filter(val => val.meeting !== "N/A").forEach(item => {
    const meetingName = item.meeting;
    if (!grouped[meetingName]) {
      grouped[meetingName] = {
        meeting: meetingName,
        firstMeeting: null,
        secondMeeting: null,
        thirdMeeting: null,
        firstLink: null,
        secondLink: null,
        thirdLink: null
      };
    }

    // Find the next available slot (first, second, third)
    if (!grouped[meetingName].firstMeeting) {
      grouped[meetingName].firstMeeting = item.meetingDate;
      grouped[meetingName].firstLink = item.docs;
    } else if (!grouped[meetingName].secondMeeting) {
      grouped[meetingName].secondMeeting = item.meetingDate;
      grouped[meetingName].secondLink = item.docs;
    } else if (!grouped[meetingName].thirdMeeting) {
      grouped[meetingName].thirdMeeting = item.meetingDate;
      grouped[meetingName].thirdLink = item.docs;
    }
  });

  return Object.values(grouped);
}




