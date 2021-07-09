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



function checkCookie() {
  let something = getCookie("Date");
  let something2 = getCookie("Event");

  if (something != "") {
    document.getElementById("dateInput").value = something
    document.getElementById("eventInput").value = something2
    daysRemaining()

  }

  else {
    document.getElementById("pre_calc").classList.remove("hidden")
  }

}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function daysRemaining() {

  if (document.getElementById("dateInput").value == "") {
    return window.alert("Please Enter a date");
  }
  if (document.getElementById("eventInput").value == "") {
    return window.alert("Please Enter an event name");
  }

  const d = new Date();
  var targetDate = document.getElementById("dateInput").value;
    setCookie("Date",targetDate,365);
  var eventName = document.getElementById("eventInput").value;


  var dateNow = d;
  var targetDate = new Date(targetDate);


  var time_difference = targetDate.getTime() - dateNow.getTime();

  var day = " days"
  var result = Math.ceil(time_difference / (1000 * 60 * 60 * 24));

  if (result == 1) {var day = " day";};

  setCookie("Event",eventName,365);

  return document.getElementById("result").innerHTML =
       result + day,
       document.getElementById("event_name").innerHTML =
       eventName,
       document.title = result + day + " till " + eventName,
       document.getElementById("pre_calc").classList.add("hidden"),
       document.getElementById("post_calc").classList.remove("hidden")
       ;
             }


function changeSetting() {
  document.getElementById("pre_calc").classList.remove("hidden"),
  document.getElementById("post_calc").classList.add("hidden"),
  document.title = "Days Till Date Calculator"

}
