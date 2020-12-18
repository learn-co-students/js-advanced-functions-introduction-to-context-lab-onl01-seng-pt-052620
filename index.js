// Your code here
function createEmployeeRecord (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employees) {
    return employees.map(x => createEmployeeRecord(x))
}

function createTimeInEvent (record, datestamp) {
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    })
    return record
}

function createTimeOutEvent (record, datestamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    })
    return record
}

function hoursWorkedOnDate (record, date){
    return (record.timeOutEvents.find( x => x.date === date).hour - record.timeInEvents.find( x => x.date === date).hour)/100
}

function wagesEarnedOnDate (record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor (record) {
    let dates = [] 
    for (let x of record.timeInEvents){
        dates.push(x.date)
    }
    let y = dates.map( x => wagesEarnedOnDate(record, x))
    return y.reduce( (total, z) => z + total )
}

function calculatePayroll (employees) {
    return employees.reduce( (t, x) => t + allWagesFor(x), 0)
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find( x => x.firstName === firstName)
} 