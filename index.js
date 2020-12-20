
function createEmployeeRecord(arr) {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function(arr) {
   let newArray = arr.map(val => {
       return createEmployeeRecord(val)
    });
    return newArray
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })

    return employee

}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })

    return employee

}

function hoursWorkedOnDate(employeeObj, date) {

    let hoursIn = employeeObj.timeInEvents.find(function(e) { 
        return e.date === date 
    }).hour
    let hoursOut = employeeObj.timeOutEvents.find(function(e) { 
        return e.date === date 
    }).hour
    
    return (hoursOut - hoursIn) / 100 

}


function wagesEarnedOnDate(employeeObj, date) {
    let payRate = employeeObj.payPerHour;

    let pay = hoursWorkedOnDate(employeeObj, date) * payRate
    return pay

}

function allWagesFor(employeeObj) {
    let employee = employeeObj
    let wagesDates = employee.timeInEvents.map( e => {
        return e.date;
    } )
    let perDatePayTotal = wagesDates.map(e => {
        return wagesEarnedOnDate(employee, e)
    })
    let wagesPerDate = perDatePayTotal.reduce((accumulator, currentValue) => accumulator + currentValue)
    return wagesPerDate
}

function findEmployeeByFirstName(arrayOfRecords, firstName) {
    let findName = arrayOfRecords.find(e => {
        return e.firstName = firstName
    })
    return findName
}


function calculatePayroll(array) {
    let allWagesEach = array.map(e => {
        return allWagesFor(e)
    })

    let totalWages = allWagesEach.reduce((accumulator, currentValue) => accumulator + currentValue)

    return totalWages
}