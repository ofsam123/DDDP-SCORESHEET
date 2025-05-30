export function calculatePercentage(part, total) {
    if (total === 0) {
      return 0;
    }
    return (part / total) * 100;
  }

export  function countApplicationsForEachDomain (data, reports){
 
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

export function getAttributeValue (key, val){
  const attr = val?.attributes.find(attr => attr.displayName === key);
  return attr ? attr.value : "N/A";
};

export  function formatDataGeneral(data, property, value) {
  return data?.filter(item =>
      item.attributes.some(attr =>
          attr.displayName === property && attr.value === value
      )
  );
}
  