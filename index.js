// Your code here createEmployeeRecord(){

let createEmployeeRecord = function(arr){
  let record = {}
  return record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []

 }
}

let createEmployeeRecords = function(arrOfArr){
  return arrOfArr.map(createEmployeeRecord);

}

function createObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(obj, dateStamp){
    obj.timeInEvents.push(createObj("TimeIn", dateStamp))
    return obj
}

let createTimeOutEvent = function(ob,dte) {
  ob.timeOutEvents.push(createObj("TimeOut", dte))
  return ob
}




let hoursWorkedOnDate = function (ob, dat){
  let inTime = ob.timeInEvents.find(function(a){
    return a.date===dat
  })
  let outTime = ob.timeOutEvents.find(function(a){
    return a.date===dat
  })
  return (outTime.hour-inTime.hour)/100
}
let wagesEarnedOnDate = function (ob, date){
  return ob.payPerHour * hoursWorkedOnDate(ob, date)
}
let allWagesFor = function(ob){
  const wage = ob.timeInEvents.map((e)=>{return wagesEarnedOnDate(ob,e.date)})
  return wage.reduce((acc , cv)=> acc +cv)
}
let findEmployeeByFirstName=function(srArr,firt_Name) {
  return srArr.find((record)=>record.firstName===firt_Name)
}

let calculatePayroll = function (arr) {
  const wage = arr.map((record)=>allWagesFor(record))

  return wage.reduce((acc,av) =>acc +av)
}
