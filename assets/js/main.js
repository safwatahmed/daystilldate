// Generic code to fetch cookies by name
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


// Set any cookies by name
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }



// Code to check if date and event name cookies have been set
function checkSetCookies() {
  // Assigning Variables to for cookie existence check
  let date_cookie = getCookie("Date");
  let event_name_cookie = getCookie("Event");

  // Check if valid date is set
  if (date_cookie != "") {
    // Call the Calculation Function
    daysRemaining(date_cookie,event_name_cookie) 
    }
  else {
    document.getElementById("post_calc").classList.add("hidden")
    document.getElementById("pre_calc").classList.remove("hidden")

  }
  
  }

// Set / Update event date and name
function setEvent() {
  
  // Assigning variables from input fields
  var targetDate = document.getElementById("dateInput").value;
  var eventName = document.getElementById("eventInput").value;

  // Setting the cookies
  setCookie("Date",targetDate,365);
  setCookie("Event",eventName,365);

  // Running the calculation function
  daysRemaining(targetDate,eventName) ;
}

// Day or days
function dayOrDays(result) {
  d = result;
  var r;
  if (d == 1) {
    r = " day";
  }
  else {
    r = " days";
  }
  return r;
}


// Calculation New

function daysRemaining(date,name) {

  //Getting Current Date
  const today = new Date();

  // Getting Calculation and Display Values from params
  var targetDate = new Date(date);
  var eventName = name;

  // calculating date difference
  var difference = targetDate.getTime() - today.getTime();

  // converting date difference in days, rounded up as result
  var result = Math.ceil(difference/(1000 * 60 * 60 * 24));

  // Checking the value and executing actions accordingly
  // Days Remaining till Event Date
  if (result > 0) {
    day = dayOrDays(result);
    document.getElementById("result").innerHTML = result + day;
    document.getElementById("event_name").innerHTML = eventName;
    document.title = `${result + day} till ${eventName}`;
  }
  // On Event Date
  else if (result == 0) {
    document.getElementById("result").innerHTML = "Today";
    document.getElementById("event_name").innerHTML = eventName;
    document.getElementById("till").innerHTML="is";
    document.title = `Today is${eventName}`;

    //Confetti
    confetti();

  }

  else {
    result = result * -1;
    day = dayOrDays(result);
    document.getElementById("result").innerHTML = result + day;
    document.getElementById("event_name").innerHTML = eventName;
    document.getElementById("till").innerHTML = "since";
    document.title = `${result + day} since ${eventName}`;

    // Confetti
    confetti();

  }

  //Make Result Page Visible
  document.getElementById("post_calc").classList.remove("hidden")
  document.getElementById("pre_calc").classList.add("hidden")  

}

// Change Current Setting

function changeSetting() {
  // Assigning Variables to for cookie existence check
  let date_cookie = getCookie("Date");
  let event_name_cookie = getCookie("Event");

  // Prefilling the Inputfields with current Settings
  document.getElementById("dateInput").value = date_cookie
  document.getElementById("eventInput").value = event_name_cookie

  // Making the existing input fields visible and results invisible
  document.getElementById("post_calc").classList.add("hidden")
  document.getElementById("pre_calc").classList.remove("hidden")
  

}