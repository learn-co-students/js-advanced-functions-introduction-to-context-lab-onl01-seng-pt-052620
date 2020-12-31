// Your code here
function createEmployeeRecord(employee) {
    let person = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3]
    }
    
    person = Object.assign(person, {timeInEvents: []}, {timeOutEvents: []})

    return person
}

function createEmployeeRecords(employeeRecords) {
    let personalRecords = employeeRecords.map(x => createEmployeeRecord(x))

    return personalRecords;
}

function createTimeInEvent(empRecord, date) {
    let timeIn = date.split(" ");

    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeIn[1]),
        date: timeIn[0]
    })

    return empRecord
}

function createTimeOutEvent(empRecord, date) {
    let timeOut = date.split(" ");

    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeOut[1]),
        date: timeOut[0]
    })

    return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
    let workDateIn = empRecord.timeInEvents.find(workDay =>  workDay.date === date)
    let workDateOut = empRecord.timeOutEvents.find(workDay => workDay.date === date)

    let hoursWorked = workDateOut.hour - workDateIn.hour;
   
    return hoursWorked / 100;


}

function wagesEarnedOnDate(empRecord, date) {
    let hoursWorked = hoursWorkedOnDate(empRecord, date);

    let dailyPay = hoursWorked * empRecord.payPerHour;

    return dailyPay;
}

function allWagesFor(empRecord) {
    let weeklyTotal = 0;

    empRecord.timeInEvents.forEach(workDay => weeklyTotal += wagesEarnedOnDate(empRecord, workDay.date))

    return weeklyTotal;

}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(person => person.firstName === firstName)
}

function calculatePayroll(employeeRecords) {
    let totalPay = 0;
    employeeRecords.forEach(person => person.timeInEvents.forEach(workDay => totalPay += wagesEarnedOnDate(person, workDay.date)))

    return totalPay;
}