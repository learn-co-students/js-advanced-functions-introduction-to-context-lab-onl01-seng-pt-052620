function createEmployeeRecord(record) {
    let newRecord = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return newRecord
}

function createEmployeeRecords(records) {
    return records.map(record => {
        return createEmployeeRecord(record)
    });
}

function createTimeInEvent(employee, timeStamp) {
    let time = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    }
    employee.timeInEvents.push(time)
    return employee
}

function createTimeOutEvent(employee, timeStamp) {
    let time = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    }
    employee.timeOutEvents.push(time)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find((event) => {return event.date === date});
    let hourIn = timeIn.hour;
    let timeOut = employee.timeOutEvents.find((event) => {return event.date === date});
    let hourOut = timeOut.hour;
    let hoursWorked = (hourOut - hourIn) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    let pay = hours * employee.payPerHour;
    return pay
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => {
        return event.date
    });
    let wages = dates.map(date => {
        return wagesEarnedOnDate(employee, date)
    });
    let total = wages.reduce((total, currentVal) => total + currentVal, 0)
    return total
}

function calculatePayroll(employees) {
    let payroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return payroll
}

function findEmployeeByFirstName(src, name) {
    return src.find((employee) => {
        return employee.firstName === name  
    });
}