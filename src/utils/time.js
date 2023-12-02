import { Radio } from "../UI";

/*
  Time/Date helper functions
*/

//Convert to js timestamp which uses miliseconds 
export const convertTime = (timestamp) => {
  if(!isNaN(timestamp)) {
    if(typeof(timestamp) === 'number') {
      timestamp = Math.floor(timestamp);
    }
    if(String(timestamp).length === 10) {
      return(timestamp * 1000);
    }
  }
  return(timestamp);
}

//Get formatted time from timestamp Ex: 12:00 PM
export const getTime = (timestamp) => {
  const date = new Date(convertTime(timestamp));
  let hour = date.getHours();
  let morning = 'PM';
  if(hour === 0) {
    hour = 12;
    morning = 'AM';
  } else {
    morning = hour > 11 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
  }
  return(`${hour}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${morning}`)
}

//Get formatted date from timestamp Ex: 3/25 
export const getDate = (timestamp) => {
  const date = new Date(convertTime(timestamp));
  return(`${date.getMonth() + 1}/${date.getDate()}`);
}

//Get abbreviated day of the week Ex: Fri
export const getDayOfWeek = (timestamp, long=false) => {
  const date = new Date(convertTime(timestamp));
  return(date.toLocaleString('default', {weekday: long ? 'long' : 'short'}));
}

//Get full formatted date Ex: Fri 3/24 at 3:30 PM
export const getFullDate = (timestamp) => {
  const date = new Date(convertTime(timestamp));
  return(`${getDayOfWeek(date)} ${getDate(date)} at ${getTime(date)}`)
}

//Is timestamp before current date
export const isPastDue = (timestamp) => {
  return(convertTime(timestamp) < Date.now());
}

//Is within 3 days
export const isSoon = (timestamp) => {
  timestamp = convertTime(timestamp);
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return(date >= (new Date(timestamp)).getTime() && !isPastDue(timestamp));
}

//Is within 3 days
export const isRecent = (timestamp) => {
  timestamp = convertTime(timestamp);
  const date = new Date();
  date.setDate(date.getDate() - 3);
  return(date >= (new Date(timestamp)).getTime() && !isPastDue(timestamp));
}

export const sortOldest = (a, b) => {
  if(a.deadline.T < b.deadline.T && !isPastDue(a.deadline.T)) {
    return(-1);
  } else{
    return(1);
  }
}

export const sortNewest = (a, b) => {
  if((a.deadline.T < b.deadline.T && !isPastDue(a.deadline.T)) || (a.hasSubmission === false && isPastDue(a.deadline.T))) {
    return(-1);
  } else{
    return(1);
  }
}

export const isNotDone = (assignment) => {
  return(isPastDue(assignment.deadline.T) && assignment.hasSubmission === false)
}

//Calculate how many days late
export const daysLate = (timestamp, due) => {
  const days = Math.floor((convertTime(timestamp) - convertTime(due)) / 86400000)
  return(days > 0 ? days : 0);
}

//Get color based on submitted & due date
export const getColor = (assignment) => {
  if(isNotDone(assignment)) {
    return('danger');
  }
  if(assignment.hasSubmission === false && isSoon(assignment.deadline.T)) {
    return('warn');
  }
  return(null);
}

//Convert to full time string
export const timeApiConvert = (timestring) => {
  //2023-08-29T00:15 => 2023-08-29T00:15:00.000Z
  return((new Date(timestring)).toISOString())
}