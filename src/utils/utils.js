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

export function getDataByTypes(data, property, values) {
  return data?.filter(item =>
    item.attributes.some(attr =>
      attr.displayName === property && values.includes(attr.value)
    )
  );
}

export function getProjectDetails(projects, reports) {
  const temp = [];
  projects.forEach((project, idx) => {

    const currentReport = reports.filter(rep => rep.trackedEntity === project.trackedEntity);
    let projectStatus = "";

    if (currentReport) {

      currentReport.forEach(curReport => {
        curReport.dataValues.forEach(rep => {
          if (rep.dataElement === "tE3QKB203nh") {
            projectStatus = rep.value;
          }

        });
      })

    }

    const dataSetTemp = {
      no: idx + 1,
      expectedStart: getAttributeValue("Expected Start Date", project),
      expectedCompletion: getAttributeValue("Expected Completion Date", project),
      department: getAttributeValue("Department", project),
      sector: getAttributeValue("Sector", project),
      rolloverCost: getAttributeValue("Rollover Cost", project),
      projectBuget: getAttributeValue("Actual Released", project),
      contract: getAttributeValue("Contract Sum", project),
      reviseContract: getAttributeValue("Revise Contract Sum", project),
      projectStatus
    };

    temp.push(dataSetTemp);
  });

  return temp;
}

export const groupProjectsBySectorAmountWithBudget = (projects, departments, sectorBudget, year) => {

  const grouped = {};
  const temp = [];

  departments.forEach(dep => {
    const departmentProjects = projects.filter(
      project => project.department && project.department.includes(dep)
    );

    let rolloverCost = 0;
    let newCost = 0;

    departmentProjects.forEach(p => {
      if (p.expectedStart.includes(year)) {
        newCost += p.projectBuget !== 'N/A' ? parseFloat(p.projectBuget) : 0;
      }

      if (!p.expectedStart.includes(year)) {
        const projectYear = new Date(p.expectedCompletion).getFullYear();
        if ((projectYear < year) && !p.projectStatus.includes("Completed")) {
          rolloverCost += p.rolloverCost !== 'N/A' ? parseFloat(p.rolloverCost) : 0;
        }
      }


    });

    grouped[dep] = departmentProjects;
    const currentSectorBudget = sectorBudget.find(s => s.sector === dep)
    const tempDataSet = {
      sector: dep,
      rolloverCost,
      newCost,
      capitalEnvelop: currentSectorBudget ? currentSectorBudget.budget : 0
    };

    temp.push(tempDataSet);

  });

  let newTotal = 0;
  let rolloverTotal = 0;
  let budgetTotal = 0

  temp.forEach(tp => {
    newTotal += tp.newCost;
    rolloverTotal += tp.rolloverCost;
    budgetTotal += parseFloat(tp.capitalEnvelop);
  });

  const total = {
    sector: "Total",
    rolloverCost: rolloverTotal,
    newCost: newTotal,
    capitalEnvelop: budgetTotal
  };

  temp.push(total);

  return temp;
}

export const groupProjectsBySectorAmountWithoutBudget = (projects, departments, year) => {

  const grouped = {};
  const temp = [];

  departments.forEach(dep => {
    const departmentProjects = projects.filter(
      project => project.department && project.department.includes(dep)
    );

    let rolloverCost = 0;
    let newCost = 0;
    let contractSum = 0;
    let reviseContractSum = 0;
    let actualPayment = 0

    departmentProjects.forEach(p => {
      if (p.expectedStart.includes(year)) {
        contractSum += p.contract !== 'N/A' ? parseFloat(p.contract) : 0;
        reviseContractSum += p.reviseContract !== 'N/A' ? parseFloat(p.reviseContract) : 0;
      }

      if (!p.expectedStart.includes(year)) {
        const projectYear = new Date(p.expectedCompletion).getFullYear();
        if ((projectYear < year) && !p.projectStatus.includes("Completed")) {
          rolloverCost += p.rolloverCost !== 'N/A' ? parseFloat(p.rolloverCost) : 0;
        }
      }


    });

    grouped[dep] = departmentProjects;
    const tempDataSet = {
      sector: dep,
      rolloverCost,
      contractSum,
      reviseContractSum,
      actualPayment,
      outstanding: parseFloat(contractSum) - parseFloat(actualPayment) - parseFloat(rolloverCost),
      percentage: 0
    };

    temp.push(tempDataSet);

  });

  let contractTotal = 0;
  let contractReviseTotal = 0;
  let actualTotal = 0;
  let outstandingTotal = 0;
  let rolloverTotal = 0;
  let percentage = 0;

  temp.forEach(tp => {
    contractTotal += parseFloat(tp.contractSum);
    rolloverTotal += parseFloat(tp.rolloverCost);
    contractReviseTotal += parseFloat(tp.reviseContractSum);
    actualTotal = parseFloat(tp.actualPayment);
    outstandingTotal = parseFloat(tp.outstanding);
    percentage = 0
  });

  const total = {
    sector: "Total",
    rolloverCost: rolloverTotal,
    contractSum: contractTotal,
    reviseContractSum: contractReviseTotal,
    actualPayment: actualTotal,
    outstanding: outstandingTotal,
    percentage
  };

  temp.push(total);

  return temp;
}

export const groupProjectByDevelopmentDimension = (projects, departments, year) => {

    const grouped = {};
    const temp = [];

    departments.forEach(dep => {
      const departmentProjects = projects.filter(
        project => project.department && project.department.includes(dep)
      );

      let rolloverCounter = 0;
      let newCounter = 0;

      departmentProjects.forEach(p=>{
        if(p.expectedStart.includes(year)){
          newCounter += 1;
        }

        if(!p.expectedStart.includes(year)){
          const projectYear = new Date(p.expectedCompletion).getFullYear();
          if((projectYear < year) && !p.projectStatus.includes("Completed")){
            rolloverCounter += 1;
          }
        }
        
      });

      grouped[dep] = departmentProjects;
      const tempDataSet = {
        department: dep,
        rollover: rolloverCounter,
        new: newCounter
        
      };

      temp.push(tempDataSet);

    });

    let newTotal = 0;
    let rolloverTotal = 0;

    temp.forEach(tp=>{
      newTotal += tp.new;
      rolloverTotal += tp.rollover
    });

    const total = {
       department: "Total" ,
        rollover: rolloverTotal,
        new: newTotal
    };

    temp.push(total);

    return temp;
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

export function filterTrackedEntitiesByCreatedAt(entities, year, period) {
  let start, end;

  switch (period) {
    case "Q1":
      start = `${year}-01-01`;
      end = `${year}-03-31`;
      break;
    case "Q2":
      start = `${year}-04-01`;
      end = `${year}-06-30`;
      break;
    case "Q3":
      start = `${year}-07-01`;
      end = `${year}-09-30`;
      break;
    case "Q4":
      start = `${year}-10-01`;
      end = `${year}-12-31`;
      break;
    case "yearly":
    default:
      start = `${year}-01-01`;
      end = `${year}-12-31`;
      break;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  return entities.filter(entity => {
    const created = new Date(entity.createdAt);
    return created >= startDate && created <= endDate;
  });
}

export function filterTrackedEntitiesByYear(entities, startDate, endDate) {

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
        rep.dataElement === "SZcHb5mvjJx" && (rep.value === "Completed" || rep.value === "Ongoing" || rep.value === "Abandoned")
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

export const getMeetingRank = (index, type) => {
  if (type === 'GA') {
    switch (index) {
      case 0: return "1st Ordinary Meeting";
      case 1: return "2nd Ordinary Meeting";
      case 2: return "3rd Ordinary Meeting";
      default: return "Bonus Ordinary Meeting";
    }
  }
  else if (type === 'EC') {
    switch (index) {
      case 0: return "1st";
      case 1: return "2nd";
      case 2: return "3rd";
      default: return "Other";
    }
  } else if (type === 'Management Meetings') {
    switch (index) {
      case 0: return "1st";
      case 1: return "2nd";
      case 2: return "3rd";
      case 3: return "4th";
      default: return "Other";
    }
  } else if ((type === 'Entity Tender Committee (ETC)') || (type === 'Audit Committee')) {
    switch (index) {
      case 0: return "1st Quarter";
      case 1: return "2nd Quarter";
      case 2: return "3rd Quarter";
      case 3: return "4th Quarter";
      default: return "Other";
    }
  }
};


export const getStageValue = (currentReport, uuid) => {

  for (let rep of currentReport.dataValues) {
    if (rep.dataElement === uuid) {
      return parseFloat(rep.value);
    }
  }

}






