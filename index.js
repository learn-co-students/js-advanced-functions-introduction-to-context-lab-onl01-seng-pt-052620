function createEmployeeRecord(array){
  debugger
  let employeeObject = {}
    employeeObject.firstName = array[0]
    employeeObject.familyName = array[1]
    employeeObject.title = array[2]
    employeeObject.payPerHour = array[3]
    employeeObject.timeInEvents = []
    employeeObject.timeOutEvents= []
    return employeeObject
}

function createEmployeeRecords(arrays){
  return  arrays.map(are=> createEmployeeRecord(are))
}

function createTimeInEvent(employee_record, date){
   let newObject = {}
   newObject.type = "TimeIn"
   newObject.hour = parseInt(date.split(" ")[1])
   newObject.date = date.split(" ")[0]
   employee_record.timeInEvents.push(newObject) 
   return employee_record 
}

function createTimeOutEvent(employee_record, date){
   let newObject = {}
   newObject.type = "TimeOut"
   newObject.hour = parseInt(date.split(" ")[1])
   newObject.date = date.split(" ")[0]
   employee_record.timeOutEvents.push(newObject) 
   return employee_record 
}

function hoursWorkedOnDate(employee_record, date){
  let newTime = employee_record.timeOutEvents.filter(d => d.date === date)[0].hour - employee_record.timeInEvents.filter(d => d.date === date)[0].hour
  return newTime/100
}

function wagesEarnedOnDate(employee_record, date){
let newWage = hoursWorkedOnDate(employee_record, date) * employee_record.payPerHour
return newWage

}
  
function allWagesFor(employee_record){
let eligibleDates = employee_record.timeInEvents.map(a => a.date)
let payable = eligibleDates.reduce(function(memo, d){
  return memo + wagesEarnedOnDate(employee_record, d)
}, 0)
return payable 
} 

function calculatePayroll(employee_record){
  return employee_record.reduce(function(memo, record){
    return memo + allWagesFor(record)
  }, 0)
}

function findEmployeeByFirstName(array, name){
 return array.find(a => a.firstName === name)
}