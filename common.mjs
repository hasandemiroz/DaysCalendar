// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
import daysData from "./days.json" with { type: "json" };

let counter = 0;
export function findingEvent(daysData, year, month, day) {
    if((new Date(year, month + 1, 0).getDate()) < day){
        counter = 0;
    } console.log(new Date(year, month + 1, 0).getDate(), "for reseting")
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
    // console.log(ocaisions)
    ocaisions.sort((a,b) => a.occuranceIndex - b.occuranceIndex);
    // console.log(ocaisions);
    for(let ocaision of ocaisions){
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
// for(let i =1; i<=30;i++){
//     console.log(getGreeting(daysData, year, 8, i))
// }
// const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const today = new Date(year, month, 1);
// const todayWeekDayName = weekDays[today.getDay()];
// console.log(todayWeekDayName)

// for(let n = 0; n < monthsInDaysData.length; n++){
//         if (monthsInDaysData[n].occurence === "first" && currentDayName == monthsInDaysData[n].dayName && counter === 0) {
//         return {
//             day,
//             name: monthsInDaysData[n].name,
//             link: monthsInDaysData[n].descriptionURL
//         };[n]
//     } else if (monthsInDaysData[n].occurence === "second" && currentDayName == monthsInDaysData[n].dayName  && counter === 1) {
//         return {
//             day,
//             name: monthsInDaysData[n].name,
//             link: monthsInDaysData[n].descriptionURL
//         };
//     }else if(monthsInDaysData[n].occurence === "third" && currentDayName == monthsInDaysData[n].dayName  && counter === 2) {
//         return {
//             day,
//             name: monthsInDaysData[n].name,
//             link: monthsInDaysData[n].descriptionURL
//         };
//     }else if(monthsInDaysData[n].occurence === "fourth" && currentDayName == monthsInDaysData[n].dayName  && counter === 3) {
//         return {
//             day,
//             name: monthsInDaysData[n].name,
//             link: monthsInDaysData[n].descriptionURL
//         };
//     }
//     else if(monthsInDaysData[n].occurence === "last" && currentDayName == monthsInDaysData[n].dayName  && counter === 4) {
//         return {
//             day,
//             name: monthsInDaysData[n].name,
//             link: monthsInDaysData[n].descriptionURL
//         };
//     }
//     }
