// ! ! !
// Three Bugs

var peopleArray = [];
var Atticus = new Employee("Atticus", "2405", "47000", 3);
var Jem = new Employee("Jem", "62347", "63500", 4);
var Boo = new Employee("Boo", "11435", "54000", 3);
var Scout = new Employee("Scout", "6243", "74750", 5);


//Loop the array, extracting each array and writing information to the DOM
$(document).ready(function(){
	for(var i = 0; i < peopleArray.length; i++){
	var updatedEmployeeResult = appendDom(calculateSTI(peopleArray[i]));
	}
});

//Input: Takes in new or current employee information
//Output: Creates a new object with current or last year's employee information
function Employee(name, employeeNumber, salary, reviewScore){
	this.name = name;
	this.employeeNumber = employeeNumber;
	this.salary = salary;
	this.reviewScore = reviewScore;
	peopleArray.push(this);
}

// Input: Takes in updated employee object
// Output: Creates new DOM elements that present requested data to web document 
function appendDom(object){
	$('.container').append('<div class="person"></div>');
	var $element = $('.container').children().last();

	$element.append('<p>Employee: ' + object.name + '</p>');
	$element.append('<p>Bonus Percentage This Year: ' + object.bonusPercentage + '%</p>');
	$element.append('<p>2016 Bonus Amount: $' + object.calculatedBonus + '</p>');
	$element.append('<p>Adjusted Salary: $' + object.adjustedSalary + '</p>');
}

// Input: Takes in employees performance and salary information
// Output: Returns updated employee information in an object
function calculateSTI(employeeArray){
	
	var employeeName = employeeArray.name;
	var employeeNumber = employeeArray.employeeNumber;
	var baseSalary = employeeArray.salary;
	var reviewScore = employeeArray.reviewScore;
	var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);

	// Client stated that no bonus can be above 13%: function ets bonus to 13%
	bonus = bonusCap(bonus);

	var adjustedSalary = Math.round(baseSalary * (1.0 + bonus));
	var calculatedBonus = Math.round(baseSalary * bonus);

	// Sets to whole number, use if needed for DOM presentation
	bonus = setWholeNumber(bonus);

	// Input: Takes in final calcuated information
	// Output: Returns employee object with requested updated information
	function updatedEmployer(name, bonusPercentage, adjustedSalary, calculatedBonus){
		this.name = name;
		this.bonusPercentage = bonusPercentage;
		this.adjustedSalary = adjustedSalary;
		this.calculatedBonus = calculatedBonus;
		return this;
	}
	return updatedEmployer(employeeName, bonus, adjustedSalary, calculatedBonus);
}

// Input: Takes in employees' performance review score
// Output: Returns base percentage based on review score
function getBaseSTI(reviewScore){
	var basePercent;
	switch(reviewScore){
		case 1:
			basePercent = 0;
			break;
		case 2:
			basePercent = 0;
			break;
		case 3:
			basePercent = 0.04;
			break;
		case 4:
			basePercent = 0.06;
			break;
		case 5:
			basePercent = 0.10;
			break;
	}
	return basePercent;

}

// Input: Takes in employees number
// Output: Returns year adjustment of bonus percentage based on employee number
function getYearAdjustment(employeeNumber){
	var yearAdjustment = 0;
	if(employeeNumber.length == 4){
		yearAdjustment = 0.05;
	}
	return yearAdjustment;
}

// Input: Takes in employees current salary
// Output: Returns income adjustment based on current salary size 
function getIncomeAdjustment(salary){
	var incomeAdjustment = 0;
	salary = parseInt(salary);
	if(salary > 65000){
		incomeAdjustment = 0.01;
	}
	return incomeAdjustment;
}

// Input: Takes in the calculated bonus percentage
// Return: Caps bonus at 13% and returns adjusted bonus
function bonusCap(bonus){
	if(bonus > 0.13){
		bonus = 0.13;
	}
	return bonus;
}

// Input: Takes in final bonus amount
// Output: Returns number as a whole number
function setWholeNumber(bonus){
	bonus *= 100;
	return bonus;
}