// Your code here

function createEmployeeRecord(newEmployeeArray) {
  const newEmployee = {
    firstName:      newEmployeeArray[0],
    familyName:     newEmployeeArray[1],
    title:          newEmployeeArray[2],
    payPerHour:     newEmployeeArray[3],
    timeInEvents:   [],
    timeOutEvents:  []
  }
  return newEmployee;
}

function createEmployeeRecords(newEmployeeData) {
  return newEmployeeData.map( newEmployee => createEmployeeRecord(newEmployee) );
}

function createTimeInEvent(employeeRecord, timeInString) {
  const [date, hour] = timeInString.split(' ');
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  })
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOutString) {
  const [date, hour] = timeOutString.split(' ');
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  })
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateString) {
  const timeInEvent = employeeRecord.timeInEvents.find(e => e.date === dateString)
  const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === dateString)
  
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateString) {
  return hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const daysWorked = employeeRecord.timeInEvents.map(e => e.date);
  const totalWages = daysWorked.reduce((runningTotal, day) => {
    return runningTotal + wagesEarnedOnDate(employeeRecord, day);
  }, 0)
  return totalWages;
}

function calculatePayroll(employeeRecordsArray) {
  return employeeRecordsArray.reduce((runningTotal, employee) => {
    return runningTotal + allWagesFor(employee);
  }, 0)
}

function findEmployeeByFirstName(employeeRecordsArray, firstName) {
  return employeeRecordsArray.find(e => e.firstName === firstName);
}