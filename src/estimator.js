const data = {
	region: {
		name: "Africa",
		avgAge: 19.7,
		avgDailyIncomeInUSD: 4,
		avgDailyIncomePopulation: 0.73
	},
	periodType: "days",
	timeToElapse: 38,
	reportedCases: 2747,
	population: 92931687,
	totalHospitalBeds: 678874
}

// Challenge 1

const currentlyInfected_impact = (data) => {
	return data.reportedCases * 10;
}

const currentlyInfected_severeImpact = (data) => {
	return data.reportedCases * 50;
}

const periodType = data => {
	if (data.periodType === 'days') {
		return data.timeToElapse/3;
	}
	if (data.periodType === 'weeks') {
		var days = data.timeToElapse * 7;
		return days/3;
	}
	if (data.periodType === 'months') {
		var days = data.timeToElapse * 30;
		return days/3;
	}
}

const infectionsByRequestedTime_impact = (data) => {
	var currentlyInfected = data.reportedCases * 10;
	var factor = periodType(data);
	var toFixed = Math.trunc(factor);
	return currentlyInfected * Math.pow(2, toFixed);
}

const infectionsByRequestedTime_severeImpact = (data) => {
	var currentlyInfected = data.reportedCases * 50;
	var factor = periodType(data);
	var toFixed = Math.trunc(factor);
	return currentlyInfected * Math.pow(2, toFixed);
}

// Challenge 2

const severeCasesByRequestedTime_impact = data => {
	return Math.trunc(15/100 * infectionsByRequestedTime_impact(data));
}

const severeCasesByRequestedTime_severeImpact = data => {
	return Math.trunc(15/100 * infectionsByRequestedTime_severeImpact(data));
}

const hospitalBedsByRequestedTime_impact = data => {
	var bedSpace = 35/100 * data.totalHospitalBeds;
	return Math.trunc(bedSpace - severeCasesByRequestedTime_impact(data));
}

const hospitalBedsByRequestedTime_severeImpact = data => {
	var bedSpace = 35/100 * data.totalHospitalBeds;
	return Math.trunc(bedSpace - severeCasesByRequestedTime_severeImpact(data));
}

// Challenge 3

const casesForICUByRequestedTime_impact = data => {
	return Math.trunc(5/100 * infectionsByRequestedTime_impact(data));
}

const casesForICUByRequestedTime_severeImpact = data => {
	return Math.trunc(5/100 * infectionsByRequestedTime_severeImpact(data));
}

const casesForVentilatorsByRequestedTime_impact = data => {
	return Math.trunc(2/100 * infectionsByRequestedTime_impact(data));
}

const casesForVentilatorsByRequestedTime_severeImpact = data => {
	return Math.trunc(2/100 * infectionsByRequestedTime_severeImpact(data));
}

const dollarsInFlight_impact = data => {
	var infectionsByRequestedTime = infectionsByRequestedTime_impact(data);
	var avgIncome = data.region.avgDailyIncomeInUSD;
	var population = 0.65 * data.population;
	var period = periodType(data);
	return infectionsByRequestedTime * 0.65 * avgIncome * period;
}

const dollarsInFlight_severeImpact = data => {
	var infectionsByRequestedTime = infectionsByRequestedTime_severeImpact(data);
	var avgIncome = data.region.avgDailyIncomeInUSD;
	var population = 0.65 * data.population;
	var period = periodType(data);
	return infectionsByRequestedTime * 0.65 * avgIncome * period;
}

const covid19ImpactEstimator = (data) => {

	return console.log({
		data: data, // the input data you got
		estimates: {
			impact: {
				currentlyInfected: currentlyInfected_impact(data),
				infectionsByRequestedTime: infectionsByRequestedTime_impact(data),
				severeCasesByRequestedTime: severeCasesByRequestedTime_impact(data),
				hospitalBedsByRequestedTime: hospitalBedsByRequestedTime_impact(data),
				casesForICUByRequestedTime: casesForICUByRequestedTime_impact(data),
				casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime_impact(data),
				dollarsInFlight: dollarsInFlight_impact(data)
			}, // your best case estimation
			severeImpact: {
				currentlyInfected: currentlyInfected_severeImpact(data),
				infectionsByRequestedTime: infectionsByRequestedTime_severeImpact(data),
				severeCasesByRequestedTime: severeCasesByRequestedTime_severeImpact(data),
				hospitalBedsByRequestedTime: hospitalBedsByRequestedTime_severeImpact(data),
				casesForICUByRequestedTime: casesForICUByRequestedTime_severeImpact(data),
				casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime_severeImpact(data),
				dollarsInFlight: dollarsInFlight_severeImpact(data)
			} // your severe case estimation
		}	
	})
};

covid19ImpactEstimator(data);

//export default covid19ImpactEstimator;
