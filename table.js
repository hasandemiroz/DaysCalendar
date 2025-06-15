import daysData from "./days.json" with { type: "json" };
import { getGreeting } from "./common.mjs";
const newDate = new Date();
export function createTable(newDate){
    const day = newDate.getDate();
    const month = 9; //newDate.getMonth();
    const year = newDate.getFullYear();
    console.log(year);
    const indexOfFirstDayOfMonth = new Date(year, month, 1).getDay();
    console.log(indexOfFirstDayOfMonth);
    
    const formattedIndexIfFirstDay = indexOfFirstDayOfMonth == 0 ? 6 : indexOfFirstDayOfMonth -1;
    console.log(formattedIndexIfFirstDay);

    let dayCount = 1;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(totalDaysInMonth, " total days")

    const tableCalender = document.getElementById("table");

    const weekDaysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
        const receivedInfo = getGreeting(daysData, year, month, dayCount);
            if(typeof receivedInfo == "object"){
                firstCellsTD.innerHTML = receivedInfo.name;
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
            const receivedInfo = getGreeting(daysData, year, month, dayCount);
            if(typeof receivedInfo == "object"){
                restCell.innerHTML = receivedInfo.name;
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




    
}

createTable(newDate);