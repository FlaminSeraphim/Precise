//these are the labels for the days of the week
var calDaysLabels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
//Labels for the calendars months
var calMonthsLables = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//this is an array of how many days are in a month in order
var calDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//current date
var calCurrentDate = new Date();

//Calendar Constructor
function Calendar(month, year){

  if(isNaN(month) || month === null){
    this.month = calCurrentDate.getMonth();
  } else {
    this.month = month;
  }

  if (isNaN(year) || year === null){
    this.year = calCurrentDate.getFullYear();
  } else {
    this.year = year;
  }

  this.html = '';
}


Calendar.prototype.generateHTML = function (){
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();

  var monthLength = calDaysInMonth[this.month];

  if (this.month == 1) { // February only!
    if((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0){
      monthLength = 29;
    }
  }


};

var cal = new Calendar();
 cal.generateHTML();


// var startingDay = firstDay.getDay();
