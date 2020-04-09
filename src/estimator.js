const data = {
	region: {
		name: "Africa",
		avgAge: 19.7,
		avgDailyIncomeInUSD: 5,
		avgDailyIncomePopulation: 0.71
	},
	periodType: "days",
	timeToElapse: 38,
	reportedCases: 2747,
	population: 66622705,
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
		var months = data.timeToElapse * 30;
		return months/3;
	}
}

const infectionsByRequestedTime_impact = (data) => {
	var currentlyInfected = data.reportedCases * 10;
	var factor = periodType(data);
	console.log('factor ', factor)
	var toFixed = Math.trunc(factor);
	console.log('toFixed ', toFixed)
	return currentlyInfected * Math.pow(2, toFixed);
}

const infectionsByRequestedTime_severeImpact = (data) => {
	var currentlyInfected = data.reportedCases * 50;
	var factor = periodType(data);
	console.log('factor ', factor)
	var toFixed = Math.trunc(factor);
	console.log('toFixed ', toFixed)
	return currentlyInfected * Math.pow(2, toFixed);
}

// Challenge 2

const severeCasesByRequestedTime_impact = data => {
	return 15/100 * infectionsByRequestedTime_impact(data);
}

const severeCasesByRequestedTime_severeImpact = data => {
	return 15/100 * infectionsByRequestedTime_severeImpact(data);
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

const covid19ImpactEstimator = (data) => {

	return console.log({
		data: data, // the input data you got
		estimates: {
			impact: {
				currentlyInfected: currentlyInfected_impact(data),
				infectionsByRequestedTime: infectionsByRequestedTime_impact(data),
				severeCasesByRequestedTime: severeCasesByRequestedTime_impact(data),
				hospitalBedsByRequestedTime: hospitalBedsByRequestedTime_impact(data)
			}, // your best case estimation
			severeImpact: {
				currentlyInfected: currentlyInfected_severeImpact(data),
				infectionsByRequestedTime: infectionsByRequestedTime_severeImpact(data),
				severeCasesByRequestedTime: severeCasesByRequestedTime_severeImpact(data),
				hospitalBedsByRequestedTime: hospitalBedsByRequestedTime_severeImpact(data)
			} // your severe case estimation
		}	
	})
};

covid19ImpactEstimator(data);

//export default covid19ImpactEstimator;
