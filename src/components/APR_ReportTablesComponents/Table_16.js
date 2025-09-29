
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import APRComment from "./APRComment.js/AprComments";
import APRmemo from "./APRComment.js/APRmemo";

const agricultureData = [
  { indicator: "Maize", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Rice (milled)", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Cassava", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Yam", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Cocoyam", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Plantain", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Cocoa", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Oil palm", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Cattle", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Sheep", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Goat", baseline: 0, target: 0, actual: 0, nextActual: 0 },
];

const establishmentData = [
  { indicator: "Agriculture", id: "Agric", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Industry", id: "Industry", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Services", id: "Services", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const newJobsData = [
  { indicator: "Agriculture", id: "Agric", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Industry", id: "Industry", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Services", id: "Services", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const poultryData = [
  { indicator: "Cattle", id: "Cattle", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Sheep", id: "Sheep", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Goat", id: "Goat", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Pigs", id: "Pig", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Poultry", id: "Poultry", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const governanceData = [
  {
    indicator: "Rape",
    id: "Rape",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Armed robbery",
    id: "Armed robbery",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Defilement",
    id: "Defilement",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Murder",
    id: "Murder",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Drug trafficking",
    id: "Drug trafficking",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Peddling",
    id: "Peddling",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Drug abuse",
    id: "Drug abuse",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Domestic violence",
    id: "Domestic violence",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  }
];

const implementationData = [
  { indicator: "Percentage of annual action plan implemented", id: "Agric", baseline: 94, target: 80, actual: 60, nextActual: 0 },
  { indicator: "Percentage change in access to information", id: "myfyWYvcxzQ", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Tele-density penetration", id: "pkTJsjNywi4", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const emergencyData = [
  { indicator: "Bushfire", id: "Bushfire", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Floods", id: "Floods", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Windstorm/Rainstorm", id: "Windstorm/Rainstorm", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Male", id: "Male", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Female", id: "Female", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Percentage of communities affected by disaster (%)", id: "District", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "No. of Climate change programmes organized", id: "District", baseline: 0, target: 0, actual: 0, nextActual: 0 }

];

const electricityData = [
  { indicator: "District", id: "District", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Rural", id: "Rural", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Urban", id: "Urban", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const roadNetworkData = [
  { indicator: "Total", id: "Total", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Urban", id: "Urban", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Feeder", id: "Feeder", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const schoolCompletionRateData = [
  { indicator: "Kindergarten", id: "Kindergarten", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Primary", id: "Primary", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "JHS", id: "Junior High", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "SHS", id: "Senior High", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const schoolGenderParityData = [
  { indicator: "Kindergarten", id: "Kindergarten", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Primary", id: "Primary", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "JHS", id: "Junior High", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "SHS", id: "Senior High", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const schoolPassRateData = [
  { indicator: "JHS", id: "JHS", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "SHS", id: "SHS", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Retention Rate", id: "Retention Rate", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Drop – Out Rate", id: "Drop – Out Rate", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Percentage of School benefiting from School feeding", id: "Retention Rate", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Gross Enrolment Rate", id: "Gross Enrolment Rate", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Net Admissions in Primary", id: "Net Admissions in Primary", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const healthFacilityData = [
  { indicator: "CHPS Compound", id: "CHP Compound", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Clinic", id: "Clinic", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Health Centre", id: "Health Centre", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Polyclinic", id: "Poly Clinic", baseline: 0, target: 0, actual: 0, nextActual: 0 },
  { indicator: "Hospital", id: "Hospitals", baseline: 0, target: 0, actual: 0, nextActual: 0 }
];

const nhisData = [
  {
    indicator: "Indigents",
    id: "Indigents | NHIS",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Informal",
    id: "Informal | NHIS",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Aged",
    id: "NHIS Aged",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Under 18years",
    id: "Under 18 years | NHIS",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  },
  {
    indicator: "Pregnant women",
    id: "Pregnant Women | NHIS",
    baselineMale: 0,
    baselineFemale: 0,
    targetMale: 0,
    targetFemale: 0,
    actualMale: 0,
    actualFemale: 0,
    nextActualMale: 0,
    nextActualFemale: 0
  }
];


const Table_16 = ({
  year, district, dataElements, categories,
  districtWideConstant, economicDataElements,
  socialDataElements, period , hideTableDis}) => {

  const [tableData, setTableData] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [total, setTotal] = useState(null);
  const [agriculture, setAgriculture] = useState([]);
  const [newEstablishment, setNewEstablishment] = useState([]);
  const [newJobs, setNewJobs] = useState([]);
  const [poultry, setPoultry] = useState([]);
  const [governance, setGovernance] = useState([]);
  const [implmentation, setImplmentation] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [network, setNetwork] = useState([]);
  const [schoolEnrollment, setSchoolEnrollment] = useState([]);
  const [schoolCompletionRate, setSchoolCompletionRate] = useState([]);
  const [schoolGenderParity, setSchoolGenderParity] = useState([]);
  const [schoolPassRate, setSchoolPassRate] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);
  const [nhis, setNhis] = useState([]);

  useEffect(() => {
    getEconomicDevelopment();
    getSocialDevelopment();
    getEnvironmental();
    getGovernance();
    getEmergencyPlanning();
    getImplementationMonitoring();
  }, [year, district, period]);


  function populateEconomicDevelopmentData(economicData, constantsData) {

    const stappleCropActuals = economicData.filter(
      item => item.dataElementName.includes("Stapple Crops")
    );
    const stappleCropBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("Stapple Crops")
    );

    const newEstablishmentActuals = economicData.filter(
      item => item.dataElementName.includes("NDPC| Target and Actual - New Establishment")
    );

    const newEstablishmentBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline - New Establishment by Sector of Economy")
    );

    const newJobsActuals = economicData.filter(
      item => item.dataElementName.includes("NDPC| Target and Actual - New Job Created")
    );

    const newJobsBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline - New Job by Sector of Economy")
    );

    const poultryActuals = economicData.filter(
      item => item.dataElementName.includes("NDPC| Target and Actual - Livestock, Poultry and Fish")
    );

    const poultryBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline Livestock & Poultry")
    );


    agricultureData.forEach(item => {
      const actual = stappleCropActuals.find(el => el.categoryOptionComboName.includes(item.indicator));

      if (actual) {
        item.actual = `${actual.value}MT`;
      }

      const baseline = stappleCropBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.indicator}, Baseline`));

      if (baseline) {
        item.baseline = `${baseline.value}MT`;
      }

      const target = stappleCropBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.indicator}, Target`));

      if (target) {
        item.target = `${target.value}MT`;
      }
    });

    establishmentData.forEach(item => {
      const actual = newEstablishmentActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = newEstablishmentBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = newEstablishmentBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    newJobsData.forEach(item => {
      const actual = newJobsActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = newJobsBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = newJobsBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    poultryData.forEach(item => {
      const actual = poultryActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = poultryBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = poultryBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    setAgriculture(agricultureData);
    setNewEstablishment(establishmentData);
    setNewJobs(establishmentData);
    setPoultry(poultryData);
  }

  function populateSocialDevelopmentData(socialData, constantsData) {

    const schoolEnrolmentActuals = socialData.filter(item =>
    (item.dataElementName.includes("School Enrollment By Gender") ||
      item.dataElementName.includes("School Enrolment By Gender")
    )

    );
    // setTableData(schoolEnrolmentActuals)
    const schoolEnrolmentBaselineAndTarget = constantsData.filter(item =>
    (item?.dataElementName?.includes("School Enrollment By Gender") ||
      item?.dataElementName?.includes("School Enrolment By Gender"))
    );

    const schoolGenderParityBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("School Gender Parity")
    );
    const schoolGenderParityActuals = socialData.filter(item =>
      item?.dataElementName?.includes("School Gender Parity")
    );

    const schoolCompletionRateBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("School Completion Rate")
    );

    const schoolCompletionRateActuals = socialData.filter(item =>
      item?.dataElementName?.includes("School Completion Rate")
    );

    const schoolPassRateBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("School Pass Rate")
    );

    const schoolPassRateActuals = socialData.filter(item =>
      item?.dataElementName?.includes("School Pass Rate")
    );

    const healthFacityBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("Operational Health Facilities")
    );

    const healthFacityActuals = socialData.filter(item =>
      item?.dataElementName?.includes("Operational Health Facilities")
    );

    const nhisBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("valid NHIS")
    );

    const nhisActuals = socialData.filter(item =>
      item?.dataElementName?.includes("valid NHIS")
    );

    console.log("NHIS: ", { nhisActuals, nhisBaselineAndTarget });


    schoolCompletionRateData.forEach(item => {
      const actual = schoolCompletionRateActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = schoolCompletionRateBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = schoolCompletionRateBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    schoolGenderParityData.forEach(item => {
      const actual = schoolGenderParityActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = schoolGenderParityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = schoolGenderParityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    schoolPassRateData.forEach(item => {
      const actual = schoolPassRateActuals.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = schoolPassRateBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = schoolPassRateBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    healthFacilityData.forEach(item => {
      const actual = healthFacityActuals.find(el => el.categoryOptionComboName.includes(`${item.id}, Public`));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = healthFacityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = healthFacityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    nhisData.forEach(item => {
      const actualMale = nhisActuals.find(el => el.categoryOptionComboName.includes(`${item.id}, Actual, Male`));

      if (actualMale) {
        item.actualMale = actualMale.value;
      }

      const actualFemale = nhisActuals.find(el => el.categoryOptionComboName.includes(`${item.id}, Actual, Female`));

      if (actualFemale) {
        item.actualFemale = actualFemale.value;
      }

      const baselineMale = nhisBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline, Male`));

      if (baselineMale) {
        item.baselineMale = baselineMale.value;
      }

      const baselineFemale = nhisBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline, Female`));

      if (baselineFemale) {
        item.baselineFemale = baselineFemale.value;
      }

      const targetMale = nhisBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target, Male`));

      if (targetMale) {
        item.targetMale = targetMale.value;
      }

      const targetFemale = nhisBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target, Female`));

      if (targetFemale) {
        item.targetFemale = targetFemale.value;
      }
    });

    const schoolEnrollments = countSchoolEnrolment(schoolEnrolmentBaselineAndTarget, schoolEnrolmentActuals);

    setSchoolEnrollment(schoolEnrollments)
    setSchoolCompletionRate(schoolCompletionRateData);
    setSchoolGenderParity(schoolGenderParityData);
    setSchoolPassRate(schoolPassRateData);
    setHealthFacility(healthFacilityData);
    setNhis(nhisData);
    // console.log("nhis: ", nhisData);
  }

  function countSchoolEnrolment(rawData, actuals) {

    const summary = {
      PreSchool: { baseline: 0, target: 0, actual: 0 },
      Primary: { baseline: 0, target: 0, actual: 0 },
      JHS: { baseline: 0, target: 0, actual: 0 },
      SHS: { baseline: 0, target: 0, actual: 0 }
    };

    //count baselines and targets
    rawData.forEach(item => {
      const name = item.dataElementName.toLowerCase();
      const category = item.categoryOptionComboName.toLowerCase();
      const value = parseFloat(item.value) || 0;

      if (name.includes("pre-school") || name.includes("nursery")) {
        if (category.includes("baseline")) summary.PreSchool.baseline += value;
        else if (category.includes("target")) summary.PreSchool.target += value;
        else summary.PreSchool.actual += value;
      } else if (name.includes("primary")) {
        if (category.includes("baseline")) summary.Primary.baseline += value;
        else if (category.includes("target")) summary.Primary.target += value;
        else summary.Primary.actual += value;
      } else if (name.includes("junior high school")) {
        if (category.includes("baseline")) summary.JHS.baseline += value;
        else if (category.includes("target")) summary.JHS.target += value;
        else summary.JHS.actual += value;
      } else if (name.includes("senior high school")) {
        if (category.includes("baseline")) summary.SHS.baseline += value;
        else if (category.includes("target")) summary.SHS.target += value;
        else summary.SHS.actual += value;
      }
    });

    //count actuals
    actuals.forEach(item => {
      const name = item.dataElementName.toLowerCase();
      const value = parseFloat(item.value) || 0;

      if (name.includes("pre-school") || name.includes("nursery")) {
        summary.PreSchool.actual += value;
      } else if (name.includes("primary")) {
        summary.Primary.actual += value;
      } else if (name.includes("junior high school")) {
        summary.JHS.actual += value;
      } else if (name.includes("senior high school")) {
        summary.SHS.actual += value;
      }
    });


    const finalResult = [
      {
        indicator: "Kindergarten",
        baseline: summary.PreSchool.baseline,
        target: summary.PreSchool.target,
        actual: summary.PreSchool.actual,
        nextActual: 0
      },
      {
        indicator: "Primary",
        baseline: summary.Primary.baseline,
        target: summary.Primary.target,
        actual: summary.Primary.actual,
        nextActual: 0
      },
      {
        indicator: "JHS",
        baseline: summary.JHS.baseline,
        target: summary.JHS.target,
        actual: summary.JHS.actual,
        nextActual: 0
      },
      {
        indicator: "SHS",
        baseline: summary.SHS.baseline,
        target: summary.SHS.target,
        actual: summary.SHS.actual,
        nextActual: 0
      }
    ];

    return finalResult;

  }

  function populateEnvironmentalData(data, constantsData) {

    const networkBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline & Target - Percentage Road Network in Good Condition")
    );


    const electricityBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline & Target - Percentage of communities covered by electricity")
    );

    roadNetworkData.forEach(item => {
      const actual = data.find(el => el.categoryOptionComboName.includes(item.indicator));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = networkBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = networkBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    electricityData.forEach(item => {
      const actual = data.find(el => el.categoryOptionComboName.includes(item.indicator));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = electricityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline`));

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = electricityBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target`));

      if (target) {
        item.target = target.value;
      }
    });

    roadNetworkData[0].baseline = parseInt(roadNetworkData[1].baseline) + parseInt(roadNetworkData[2].baseline);
    roadNetworkData[0].target = parseInt(roadNetworkData[1].target) + parseInt(roadNetworkData[2].target);
    roadNetworkData[0].actual = parseInt(roadNetworkData[1].actual) + parseInt(roadNetworkData[2].actual);

    setElectricity(electricityData);
    setNetwork(roadNetworkData);

    // console.log("environment: ", { electricityData, roadNetworkData });
  }

  function populateGovernanceData(data, constantsData) {

    const governanceBaselineAndTarget = constantsData.filter(
      item => item?.dataElementName?.includes("NDPC| Baseline & Target - Reported Crime cases by gender")
    );

    governanceData.forEach(item => {
      const actualMale = data.find(el => el.categoryOptionComboName.includes(`${item.id}, Actual, Male`));

      if (actualMale) {
        item.actualMale = actualMale.value;
      }

      const actualFemale = data.find(el => el.categoryOptionComboName.includes(`${item.id}, Actual, Female`));

      if (actualFemale) {
        item.actualFemale = actualFemale.value;
      }

      const baselineMale = governanceBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline, Male`));

      if (baselineMale) {
        item.baselineMale = baselineMale.value;
      }

      const baselineFemale = governanceBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Baseline, Female`));

      if (baselineFemale) {
        item.baselineFemale = baselineFemale.value;
      }

      const targetMale = governanceBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target, Male`));

      if (targetMale) {
        item.targetMale = targetMale.value;
      }

      const targetFemale = governanceBaselineAndTarget.find(el => el.categoryOptionComboName.includes(`${item.id}, Target, Female`));

      if (targetFemale) {
        item.targetFemale = targetFemale.value;
      }
    });

    setGovernance(governanceData);
  }

  function populateEmergencyData(data, constantsData) {
    const emergencyBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("NDPC| Baseline & Target - Count of Communities Affected by Disaster") ||
      item?.dataElementName?.includes("NDPC| Baseline & Target - Percentage of communities affected by disaster") ||
      item?.dataElementName?.includes("NDPC| Baseline & Target - Count of Climate change programmes organized") ||
      item?.dataElementName?.includes("NDPC| Baseline & Target - Proportion of population who have tested positive for Covid-19")
    );

    // console.log("emergency: ", { data, emergencyBaselineAndTarget });

    emergencyData.forEach(item => {
      const actual = data.find(el => el.categoryOptionComboName.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = emergencyBaselineAndTarget.find(el =>
        el.categoryOptionComboName.includes(`${item.id}, Baseline`)
      );

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = emergencyBaselineAndTarget.find(el =>
        el.categoryOptionComboName.includes(`${item.id}, Target`)
      );
      if (target) {
        item.target = target.value;
      }
    });

    // console.log("emergency process: ", emergencyData);
    setEmergency(emergencyData);

  }

  function populateImplementationData(data, constantsData) {

    const implementationBaselineAndTarget = constantsData.filter(item =>
      item?.dataElementName?.includes("NDPC| Baseline & Target - Tele-density penetration") ||
      item?.dataElementName?.includes("NDPC| Baseline & Target - Percentage change in access to information")
    );

    implementationData.forEach(item => {
      const actual = data.find(el => el.dataElement.includes(item.id));

      if (actual) {
        item.actual = actual.value;
      }

      const baseline = implementationBaselineAndTarget.find(el =>
        el.categoryOptionComboName.includes('District, Baseline') &&
        el.dataElementName?.includes(item.indicator)
      );

      if (baseline) {
        item.baseline = baseline.value;
      }

      const target = implementationBaselineAndTarget.find(el =>
        el.categoryOptionComboName.includes('District, Target') &&
        el.dataElementName?.includes(item.indicator)
      );
      if (target) {
        item.target = target.value;
      }
    });

    setImplmentation(implementationData);
  }

  function enrichData(mainData, element) {

    const dataElementMap = {};
    const comboMap = {};

    element.forEach(item => {
      dataElementMap[item.dataElement.id] = item.dataElement.name;
    });

    categories.forEach(item => {
      comboMap[item.id] = item.name;
    });

    // Enrich each record
    return mainData.map(item => ({
      ...item,
      dataElementName: dataElementMap[item.dataElement] || 'Unknown',
      categoryOptionComboName: comboMap[item.categoryOptionCombo] || 'Unknown'
    }));
  }


  function getEconomicDevelopment() {

    axios
      .get(`/dataValueSets?dataSet=Xj0f6QZwYeO&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const economicDevelopment = enrichData(result.data.dataValues, economicDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateEconomicDevelopmentData(economicDevelopment, constants);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getSocialDevelopment() {

    axios
      .get(`/dataValueSets?dataSet=cfMIscR3rdL&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const socialDevelopment = enrichData(result.data.dataValues, socialDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateSocialDevelopmentData(socialDevelopment, constants);

      })
      .catch(err => {
        console.log(err);
      });
  }

  function getEnvironmental() {

    axios
      .get(`/dataValueSets?dataSet=xGhMYfP13Yh&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const environmental = enrichData(result.data.dataValues, economicDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateEnvironmentalData(environmental, constants);

      })
      .catch(err => {
        console.log(err);
      });
  }

  function getGovernance() {

    axios
      .get(`/dataValueSets?dataSet=AsSyAiD5keB&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const governance = enrichData(result.data.dataValues, economicDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateGovernanceData(governance, constants);

      })
      .catch(err => {
        console.log(err);
      });
  }

  function getEmergencyPlanning() {

    axios
      .get(`/dataValueSets?dataSet=j4M7F8pcrH0&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const emergency = enrichData(result.data.dataValues, economicDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateEmergencyData(emergency, constants);

      })
      .catch(err => {
        console.log(err);
      });
  }

  function getImplementationMonitoring() {

    axios
      .get(`/dataValueSets?dataSet=rfew5qLb2ec&orgUnit=${district}&startDate=${year}-01-01&endDate=${year}-12-31`)
      .then(result => {
        const implementation = enrichData(result.data.dataValues, economicDataElements);
        const constants = enrichData(districtWideConstant, dataElements);
        populateImplementationData(implementation, constants);

      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="col-12">
      <h3>Table 16: Performance of Core Indicators of the End of the Year, {year}</h3>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h5>Update on Indicators and Targets </h5>
          The assessment of progress of implementation of the 2022 Annual Action Plan and the
          MTDP of the Assembly are based on the analysis of indicator achievements as well as the
          progress made in implementing programmes and projects outlined in the plan.
          There are both national (core) and municipal specific set indicators including Integrated
          Social Services, which are tracked to measure the performance during monitoring and
          evaluation exercises. Table 2.5 presents the details of the indicator levels for the year
          under review.
          In summary, most of the indicators performed well in the period under review. A detailed analysis of the performance under
          various sectors has been presented below based on the development dimensions.
          <br />
          <br />
          <APRmemo
            year={year}
            districtId={district}
            tableCommentedId={`table16-${year}`}
            hideTableDis={hideTableDis}

          />
          {/* {JSON.stringify(tableData)} */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{

                border: '1px solid #000',
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: '20px',
                backgroundColor: '#d4edda',
              }}>
                <tr>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>No.</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Indicators (categorized by development dimension of Agenda for Jobs)</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Baseline</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Target</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Actual</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Target</th>
                  <th style={{ border: '1px solid #000', fontWeight: 'bold' }}>Reasons for the year’s performance</th>
                </tr>
              </thead>
              {agriculture && <tbody>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}> ECONOMIC DEVELOPMENT</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>1</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Total output in agricultural production (In metric tons)</td>
                </tr>
                {agriculture.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>2</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Average productivity of selected crop (mt/ha)</td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>3</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Number of new establishments</td>
                </tr>
                {newEstablishment.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>4</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Number of new jobs created</td>
                </tr>

                {newJobs.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>5</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Percentage change in livestock/poultry production</td>
                </tr>

                {poultry.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}> SOCIAL DEVELOPMENT</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>6</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Net enrolment ratio</td>
                </tr>
                {schoolEnrollment.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>7</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Gender Parity Index</td>
                </tr>
                {schoolGenderParity.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>8</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Completion rate</td>
                </tr>
                {schoolCompletionRate.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>9</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Pass rate</td>
                </tr>
                {schoolPassRate.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>10</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Proportion of health facilities that are functional</td>
                </tr>
                {healthFacility.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}>
                    IMPLEMENTATION, COORDINATION, MONITORING AND EVALUATION DIMENSION</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>

                {implmentation.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}>
                    EMERGENCY PLANNING AND PREPAREDNESS DIMENSION</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>11</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>
                    Number of communities affected by disaster & Proportion of population who have been tested positive for Covid-19</td>
                </tr>

                {emergency.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}>
                    ENVIRONMENT, INFRASTRUCTURE AND HUMAN SETTLEMENT</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>12</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Percentage of road network in good condition</td>
                </tr>

                {network.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>13</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Percentage of communities covered by electricity</td>
                </tr>

                {electricity.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baseline}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.target}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actual}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.nextActual}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}

                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>

                  <td style={{ border: 'none', fontWeight: 'bold' }}> GOVERNANCE, CORRUPTION AND PUBLIC ACCOUNTABILITY</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>15</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Reported cases of crime</td>
                </tr>


              </tbody>}
            </table>
            <table className="table table-bordered p-0">
              <thead style={{

                border: '1px solid #000',
                borderCollapse: 'collapse',
                width: '100%'
              }}>
                <tr>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}></th>
                  <th style={{ border: '1px solid #000' }}>M</th>
                  <th style={{ border: '1px solid #000' }}>F</th>
                  <th style={{ border: '1px solid #000' }}>M</th>
                  <th style={{ border: '1px solid #000' }}>F</th>
                  <th style={{ border: '1px solid #000' }}>M</th>
                  <th style={{ border: '1px solid #000' }}>F</th>
                  <th style={{ border: '1px solid #000' }}>M</th>
                  <th style={{ border: '1px solid #000' }}>F</th>

                </tr>
              </thead>
              <tbody>

                {governance.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baselineMale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baselineFemale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.targetMale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.targetFemale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualMale}</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualFemale}</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}
                <tr style={{ border: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000' }}>17</td>
                  <td style={{ border: 'none', fontWeight: 'bold' }}>Proportion of population with valid NHIS card</td>
                </tr>
                {nhis.map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                      borderTop: 'none',
                      borderBottom: 'none'
                    }}>

                    </td>
                    <td style={{ border: '1px solid #000' }}>{row.indicator}</td>
                    <td style={{ border: '1px solid #000' }}>{row.baselineMale}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.baselineFemale}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.targetMale}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.targetFemale}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualMale}%</td>
                    <td style={{ border: '1px solid #000' }}>{row.actualFemale}%</td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                    <td style={{ border: '1px solid #000' }}>
                      <p>

                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            <small>Source: MPCU</small>
          </p>
          <APRComment
            data={tableData}
            year={year}
            districtId={district}
            tableCommentedId={`table2_5-${year}`}

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
};

export default Table_16;
