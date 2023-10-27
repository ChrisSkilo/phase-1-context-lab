/* Your Code Here */
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(arrayOfArrays) {
    
    const employeeRecords = [];
  
    // Iterate over each nested array and create an employee record
    for (const employeeData of arrayOfArrays) {
      const employeeRecord = createEmployeeRecord(employeeData);
      employeeRecords.push(employeeRecord);
    }
  
    return employeeRecords;
  }


  function createTimeInEvent(employeeRecord, dateStamp) {
    // Split the dateStamp into date and hour components
    const [date, time] = dateStamp.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split("");
  
    // Create a time-in event object
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    };
  
    // Add the time-in event to the employee's record
    employeeRecord.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    // Split the dateStamp into date and hour components
    const [date, time] = dateStamp.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split("");
  
    // Create a time-out event object
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    };
  
    // Add the time-out event to the employee's record
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    // Find the timeInEvent for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  
    // Find the timeOutEvent for the given date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    // Check if both timeInEvent and timeOutEvent exist for the date
    if (timeInEvent && timeOutEvent) {
      // Calculate the hours worked by subtracting the timeInEvent hour from the timeOutEvent hour
      const hoursWorked = timeOutEvent.hour - timeInEvent.hour;
      return hoursWorked;
    }
  
    // If there are no events for the given date, return 0 hours worked
    return 0;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    // Get the hours worked on the specified date using the hoursWorkedOnDate function
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  
    // Calculate the amount owed by multiplying the hours worked by the pay rate
    const amountOwed = hoursWorked * employeeRecord.payPerHour;
  
    // Return the calculated amount as a number
    return amountOwed;
  }

  function allWagesFor(employeeRecord) {
    // Get the unique dates for which there are timeInEvents
    const uniqueDates = employeeRecord.timeInEvents.map(event => event.date);
  
    // Initialize a variable to accumulate the total pay
    let totalPay = 0;
  
    // Calculate the pay for each unique date and accumulate it
    for (const date of uniqueDates) {
      const payOnDate = wagesEarnedOnDate(employeeRecord, date);
      totalPay += payOnDate;
    }
  
    // Return the total pay as a number
    return totalPay;
  }

  function findEmployeeByFirstName(srcArray, firstName) {
   
    return srcArray.find(employeeRecord => employeeRecord.firstName === firstName);
  }

  function calculatePayroll(employeeRecords) {
    
    let totalPayroll = 0;
  
    // Calculate the total pay for each employee and accumulate it
    for (const employeeRecord of employeeRecords) {
      const payForEmployee = allWagesFor(employeeRecord);
      totalPayroll += payForEmployee;
    }
  
    
    return totalPayroll;
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

