window.onload = function(){
    var dateNow = new Date();
    var month = dateNow.getMonth();
    var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
    var prevMonth = month -1;
    var day = dateNow.getDate();
    var year = dateNow.getFullYear();

    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
    var weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
    
    //binding weekdays
    for(var i=0; i< weekdayNames.length;i++){
        weekdayNamesList = "<li>" + weekdayNames[i] + "</li>";
        document.getElementById("weekdays").innerHTML += weekdayNamesList;
    }

    //binding dates
    var days = getNumberOfDays(year,month);
    for(var j=1;j<=days;j++){
        dayPerMonth= "<li>" + j + "</li>";
        document.getElementById("days").innerHTML += dayPerMonth;
        BindDates(month,year);
    }

    //binding month
    var monthText = GetMonthName(month);
    text = '<li id="monthName" value="6">'+monthText+'<br><span style="font-size:18px" id="yearName">'+year+'</span></li>'
    document.getElementById("monthName").innerHTML += text;
};

var yr, mo;
var dateNow = new Date();
yr = dateNow.getFullYear();
mo = dateNow.getMonth();

function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function GetMonthName(monthNumber) {
    monthNumber = monthNumber < 0 ? 11 : monthNumber;
    if(monthNumber == 12){
        monthNumber = 0;
    }
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber];
  }

function MonthChange(inc)
{
  // Increment/decrement the displayed month
  if(inc == 1){
    mo = ++mo;
  }else{
      mo = --mo;
  }
  
  if (yr >= 2400  &&  mo > 11)
    return;
  if (yr <= 1600  &&  mo < 0)
    return;
  dateNow.setDate(1);
  dateNow.setMonth(mo);
  var moName = GetMonthName(mo);
  if(mo == 12){
      yr= ++yr;
      mo = 0;
  }else if(mo == -1){
      yr = --yr;
      mo = 11;
  }
  text = '<li id="monthName" value="">'+moName+'<br><span style="font-size:18px" id="yearName">'+yr+'</span></li>'
  document.getElementById("monthName").innerHTML = text;
  BindDates(mo,yr);
}

function BindDates(month,year){
    var now = new Date(); 
    var calendar_html ="";

    this_month = new Date(year, month, 1);
    prev_month = new Date(year, month - 1, 1);
    next_month = new Date(year, month + 1, 1);

    first_week_day = this_month.getDay();
    days_in_this_month = Math.floor((next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24));

    for(week_day = 0; week_day < first_week_day; week_day++)
        {
            calendar_html += '<li> </li>';   
        }
            
         week_day = first_week_day;

    for(day_counter = 1; day_counter <= days_in_this_month; day_counter++)
        {
            week_day %= 7;
    
    //if(week_day == 0)
        //calendar_html += '</li><li bgcolor="#6296CA">';
    
    //Do something different for the current day.
    // if(day == day_counter)   
    //     calendar_html += '<li align="center" bgcolor="#FF6600"><b>' + day_counter + '</b></li>';
    // else
        calendar_html += '<li align="center"> ' +  day_counter + ' </li>';
    
    week_day++;
    }
    document.getElementById("days").innerHTML = calendar_html;
}

function Month(id, val){
    var code;
    switch(val) {
        case 0:
            code = "January"
            break;
        case 1:
            code = "February"
            break;
        case 2:
            code = "March"
            break;
        case 3:
            code = "April"
            break;
        case 4:
            code = "May"
            break;
        case 5:
            code = "June"
            break;
        case 6:
            code = "July"
            break;
        case 7:
            code = "August"
            break;
        case 8:
            code = "September"
            break;
        case 9:
            code = "October"
            break;
        case 10:
            code = "November"
            break;
        case 11:
            code = "December"
            break;
        default:
            code="Invalid month";
    }
    return code;
    var dateNow = new Date();
    var month = dateNow.getMonth();
    console.log("The month is ",Month(month));
    if(id == 'prev'){
        var prevMonth = month -1;
    }else{
        var nextMonth = month+1; 
    }
}