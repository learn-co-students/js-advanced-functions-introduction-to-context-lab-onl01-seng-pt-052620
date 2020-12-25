//populates a record from an array
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],//populates a firstName field from the 0th element

        familyName: row[1],//populates a familyName field from the 1th element

        title: row[2],//populates a title field from the 2th element

        payPerHour: row[3],//populates a payPerHour field from the 3th element

        timeInEvents: [],//initializes a field, timeInEvents, to hold an empty Array

        timeOutEvents: []//initializes a field, timeOutEvents, to hold an empty Array
    }
}
//creates two records
//correctly assigns the first names
//creates more than 2 records

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
//has a function called createTimeInEvent
let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')//created date hour in array form

    employee.timeInEvents.push({ 
        type: "TimeIn", //creates the correct type
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

