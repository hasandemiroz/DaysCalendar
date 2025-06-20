import daysData from "./days.json" with { type: "json" };
import { findingEvent, prepareOccasions } from "./common.mjs"


const newDate = new Date();
export function createTable(newDate){
    const day = newDate.getDate();
    const month = newDate.getMonth(); 
    const year = newDate.getFullYear();
    
    const indexOfFirstDayOfMonth = new Date(year, month, 1).getDay();
    console.log(indexOfFirstDayOfMonth);
    
    const formattedIndexIfFirstDay = indexOfFirstDayOfMonth == 0 ? 6 : indexOfFirstDayOfMonth -1;
    console.log(formattedIndexIfFirstDay);

    let dayCount = 1;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(totalDaysInMonth, " total days")

    const tableContainer = document.getElementById("tableContainer");
    
    const tableCalender = document.getElementById("table");
    tableCalender.innerHTML = "";

    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // <-- clear old events

    const weekDaysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[month];

    const dateLabel = document.querySelector("h3");
    dateLabel.innerHTML = `${currentMonth}-${year}`;

    let ocaisions = prepareOccasions(daysData, weekDaysName, currentMonth); // prepare data from daysData for current month
    let weekdayCounters = Array(7).fill(0); // counters for Sunday=0 ... Saturday=6

    const weekDaysNameTR = document.createElement("tr");
    for(let i = 0; i <= 6; i++){
        let weekName = document.createElement("th");
        weekName.innerHTML = weekDaysName[i];
        weekName.style.border = "solid black 1px";
        weekDaysNameTR.appendChild(weekName);
    }
    tableCalender.appendChild(weekDaysNameTR);

    const firstRowDays = document.createElement("tr");
    for(let i = 0; i < formattedIndexIfFirstDay; i++){
        let emptyCell = document.createElement("td");
        emptyCell.innerHTML = "-";
        emptyCell.style.border = "solid black 1px";
        firstRowDays.appendChild(emptyCell);
    }
    tableCalender.appendChild(firstRowDays);

   
    for(let i = formattedIndexIfFirstDay ; i <= 6; i++){
        let firstCellsTD = document.createElement("td");
        const receivedInfo = findingEvent(ocaisions, year, month, dayCount, weekdayCounters);
            if(typeof receivedInfo == "object"){
                firstCellsTD.innerHTML = receivedInfo.name;
                firstCellsTD.style.backgroundColor = "lightcoral";
                createEventElement(receivedInfo);
            }
            else{
                firstCellsTD.innerHTML = dayCount;
            }
        firstCellsTD.style.border = "solid black 1px";
        firstRowDays.appendChild(firstCellsTD);
        dayCount++;
    }
    tableCalender.appendChild(firstRowDays);

    while(dayCount <= totalDaysInMonth){
        if(dayCount > totalDaysInMonth){
            break;
        }
        const restRow = document.createElement("tr");
        for(let i=0; i<=6; i++){
            if(dayCount > totalDaysInMonth){
            break;
            }
            let restCell = document.createElement("td");
            const receivedInfo = findingEvent(ocaisions, year, month, dayCount, weekdayCounters);
            //console.log("Day:", dayCount, "receivedInfo:", receivedInfo);
            if(typeof receivedInfo == "object"){
                restCell.innerHTML = `${receivedInfo.day}-${receivedInfo.name}`;
                restCell.style.backgroundColor = "lightcoral";
                createEventElement(receivedInfo);
            }
            else{
                restCell.innerHTML = dayCount;
            }
            restCell.style.border = "solid black 1px";
            restRow.appendChild(restCell);
            dayCount++
        }
        tableCalender.appendChild(restRow);
    }
    tableContainer.appendChild(tableCalender);
    
}

async function getTextFile(link) { // fetching and getting the text from the link
  try {
    const response = await fetch(link);
    if (!response.ok) throw new Error('Failed to fetch');
    const textContent = await response.text();
    console.log(textContent);
    return textContent;
  } catch (err) {
    console.error(err);
  }
}

async function createEventElement(receivedInfo) { // gets the text and creates a li for the event description
        let eventText = await getTextFile(receivedInfo.link);
        console.log(eventText);

        let eventLi = document.createElement("li");
        eventLi.innerHTML = eventText;
        document.getElementById("event-list").appendChild(eventLi);
      }



//createTable(newDate);