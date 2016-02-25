// ! ! !
// Three Bugs

// var arrayAtticus = ["Atticus", "2405", "47000", 3];
// var arrayJem = ["Jem", "62347", "63500", 4];
// var arrayBoo = ["Boo", "11435", "54000", 3];
// var arrayScout = ["Scout", "6243", "74750", 5];

function Employee(name, employeeNumber, salary, reviewScore){
	this.name = name;
	this.employeeNumber = employeeNumber;
	this.salary = salary;
	this.reviewScore = reviewScore;
}

var Atticus = new Employee("Atticus", "2405", "47000", 3);
var Jem = new Employee("Jem", "62347", "63500", 4);
var Boo = new Employee("Boo", "11435", "54000", 3);
var Scout = new Employee("Scout", "6243", "74750", 5);


var array = [Atticus, Jem, Boo, Scout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	// 
	var updatedEmployeeResult = calculateSTI(array[i]);

	//This section simply writes the code
	newEl = document.createElement('li');
	newText = document.createTextNode(updatedEmployeeResult);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(employeeArray){
	var newArray = [];

	var employeeNumber = employeeArray.employeeNumber;
	var baseSalary = employeeArray.salary;
	var reviewScore = employeeArray.reviewScore;
	var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
	// console.log("Wat is Bonus: " + bonus);
	if(bonus > 0.13){
		bonus = 0.13;
	}



	newArray[0] = employeeArray.name;
	// console.log("Test 1: " + newArray[0]);
	newArray[1] = bonus;
	// console.log("Test 2: " + newArray[1]);
	newArray[2] = Math.round(baseSalary * (1.0 + bonus)); // Not sure why Scout's bonus was not rounded properly..?
	// console.log("Test 3: " + newArray[2]);
	newArray[3] = Math.round(baseSalary * bonus);
	// console.log("Test 4: " + newArray[3]);

	console.log("Initial Test: " + newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
	return newArray;
}

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
	//console.log("Test 1: " + basePercent);
	return basePercent;

}

function getYearAdjustment(employeeNumber){
	var yearAdjustment = 0;
	if(employeeNumber.length == 4){
		yearAdjustment = 0.05;
	}
	//console.log("Test 2: " + yearAdjustment);
	return yearAdjustment;
}

function getIncomeAdjustment(salary){
	var incomeAdjustment = 0;
	salary = parseInt(salary);
	if(salary > 65000){
		incomeAdjustment = 0.01;
	}
	//console.log("Test 3: " + incomeAdjustment);
	return incomeAdjustment;
}