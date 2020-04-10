const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

// Challenge 1

const currentlyInfectedImpact = (dataObj) => dataObj.reportedCases * 10;

const currentlyInfectedSevereImpact = (dataObj) => dataObj.reportedCases * 50;

const periodType = (dataObj) => {
  let days;
  if (dataObj.periodType === 'weeks') {
    days = dataObj.timeToElapse * 7;
    return Math.trunc(days / 3);
  }
  if (dataObj.periodType === 'months') {
    days = dataObj.timeToElapse * 30;
    return Math.trunc(days / 3);
  }

  return Math.trunc(dataObj.timeToElapse / 3);
};

const days = (dataObj) => {
  if (dataObj.periodType === 'weeks') {
    return dataObj.timeToElapse * 7;
  }
  if (dataObj.periodType === 'months') {
    return dataObj.timeToElapse * 30;
  }
  return data.timeToElapse;
};

const RequestedTimeImpact = (dataObj) => {
  const currentlyInfected = dataObj.reportedCases * 10;
  const factor = periodType(dataObj);
  return currentlyInfected * (2 ** factor);
};

const RequestedTimeSevereImpact = (dataObj) => {
  const currentlyInfected = dataObj.reportedCases * 50;
  const factor = periodType(dataObj);
  return currentlyInfected * (2 ** factor);
};

// Challenge 2

const impactCases = (dataObj) => Math.trunc(0.15 * RequestedTimeImpact(dataObj));

const severeCases = (dataObj) => Math.trunc(0.15 * RequestedTimeSevereImpact(dataObj));

const hospitalBedsImpact = (dataObj) => {
  const bedSpace = 0.35 * dataObj.totalHospitalBeds;
  return Math.trunc(bedSpace - impactCases(dataObj));
};

const hospitalBedsSevereImpact = (dataObj) => {
  const bedSpace = 0.35 * dataObj.totalHospitalBeds;
  return Math.trunc(bedSpace - severeCases(dataObj));
};

// Challenge 3

const ICUImpact = (dataObj) => Math.trunc(0.05 * RequestedTimeImpact(dataObj));

const ICUSevereImpact = (dataObj) => Math.trunc(0.05 * RequestedTimeSevereImpact(dataObj));

const VentilatorsImpact = (dataObj) => Math.trunc(0.02 * RequestedTimeImpact(dataObj));

const VentilatorsSevere = (dataObj) => Math.trunc(0.02 * RequestedTimeSevereImpact(dataObj));

const dollarsInFlightImpact = (dataObj) => {
  const infectionsByRequestedTime = RequestedTimeImpact(dataObj);
  const avgIncomePop = dataObj.region.avgDailyIncomePopulation;
  const avgIncomeUSD = dataObj.region.avgDailyIncomeInUSD;
  return Math.trunc(
    (infectionsByRequestedTime * avgIncomePop * avgIncomeUSD) / days(dataObj)
  );
};

const dollarsInFlightSevereImpact = (dataObj) => {
  const infectionsByRequestedTime = RequestedTimeSevereImpact(dataObj);
  const avgIncomePop = dataObj.region.avgDailyIncomePopulation;
  const avgIncomeUSD = dataObj.region.avgDailyIncomeInUSD;
  return Math.trunc(
    (infectionsByRequestedTime * avgIncomePop * avgIncomeUSD) / days(dataObj)
  );
};

const covid19ImpactEstimator = (dataObj) => console.log({
  data, // the input data you got
  estimates: {
    impact: {
      currentlyInfected: currentlyInfectedImpact(dataObj),
      infectionsByRequestedTime: RequestedTimeImpact(dataObj),
      severeCasesByRequestedTime: impactCases(dataObj),
      hospitalBedsByRequestedTime: hospitalBedsImpact(dataObj),
      casesForICUByRequestedTime: ICUImpact(dataObj),
      casesForVentilatorsByRequestedTime: VentilatorsImpact(dataObj),
      dollarsInFlight: dollarsInFlightImpact(dataObj)
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact(dataObj),
      infectionsByRequestedTime: RequestedTimeSevereImpact(dataObj),
      severeCasesByRequestedTime: severeCases(dataObj),
      hospitalBedsByRequestedTime: hospitalBedsSevereImpact(dataObj),
      casesForICUByRequestedTime: ICUSevereImpact(dataObj),
      casesForVentilatorsByRequestedTime: VentilatorsSevere(dataObj),
      dollarsInFlight: dollarsInFlightSevereImpact(dataObj)
    } // your severe case estimation
  }
});

covid19ImpactEstimator(data);

// export default covid19ImpactEstimator;
