// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
import daysData from "./days.json" with { type: "json" };
let year = 2025;
let month = 8;
let counter = 0;
const weekdayCounters = {
  Sunday: 0,
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0
};
export function findingEvent(daysData, year, month, day) {
    if((new Date(year, month + 1, 0).getDate()) <= day){
        counter = 0;
    } 
    // console.log(new Date(year, month + 1, 0).getDate(), "for reseting")
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const conditions = ["first", "second", "third", "last"];

    const currentMonth = monthNames[month];

    const currentDate = new Date(year, month, day);
    const currentDayName = weekDays[currentDate.getDay()];

    const monthsInDaysData = [];
    for(let i = 0; i < daysData.length; i++){
        if(daysData[i].monthName == currentMonth){
            monthsInDaysData.push(daysData[i])
        }
    }
    if(monthsInDaysData.length == 0){
        return day;
    }
    
    let result = {};
    const ocaisions = monthsInDaysData.map(event => { // it will be a list of objects with dayName and occurance and occurenceIndex
        const occurenceIndex = (conditions.indexOf(event.occurence)) + 1;
        const dayIndex = weekDays.indexOf(event.dayName);
        return {dayName: event.dayName, dayIndex: dayIndex, occurence: event.occurence, occuranceIndex: occurenceIndex, name: event.name, descriptionURL: event.descriptionURL}
    });
    // console.log(ocaisions);
    ocaisions.sort((a,b) => a.occuranceIndex - b.occuranceIndex);
    // console.log(ocaisions, "ocaision");
    for (let i = 0; i < ocaisions.length; i++) {
        const ocaision = ocaisions[i];
        if(new Date(year, month, day).getDay() == ocaision.dayIndex){
            counter++;
            if(counter == ocaision.occuranceIndex){
                const eventDay = {
                    day: day,
                    name: ocaision.name,
                    link: ocaision.descriptionURL
                  };
                return eventDay;
            }
        }
    }
    return day;
}
for(let i =1; i<=31;i++){
    console.log(findingEvent(daysData, year, month, i))
}

// findingEvent(daysData, year, month, 1)
