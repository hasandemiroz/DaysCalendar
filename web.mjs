// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import daysData from "./days.json" with { type: "json" };
import { createTable } from "./table.mjs";
let newDate = new Date();

function previousMonth(){
    document.getElementById("previousMonth").addEventListener("click", ()=>{
        const date = new Date(newDate);
        let year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let preMonth = 0;
        if((month - 1) < 0){
            preMonth = 11;
            year = year - 1;
        }
        else{
            preMonth = month - 1;
        }
        newDate = new Date(year, preMonth, day);
        createTable(newDate);
    })
}

function nextMonth(){
    document.getElementById("nextMonth").addEventListener("click", ()=>{
        const date = new Date(newDate);
        let year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let nextMonth = 0;
        if((month + 1) > 11){
            nextMonth = 0;
            year = year + 1;
        }
        else{
            nextMonth = month + 1;
        }
        newDate = new Date(year, nextMonth, day);
        createTable(newDate);
    })
}

function selectYearMonth(){
    
    for(let i = 1950; i <= 2050; i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        document.getElementById("yearDropDown").appendChild(opt);
    }
    

    const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    for(let i = 0; i <= 11; i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = monthNames[i];
        document.getElementById("monthDropDown").appendChild(opt);
    }
    let selectedMonth = null;
    let selectedYear = null;
    document.getElementById("form-select").addEventListener("click", (e)=>{
        e.preventDefault();
        document.getElementById("monthDropDown").addEventListener("change", (event)=>{
        selectedMonth = event.target.value;
        console.log("Selected month:", selectedMonth);
        })
        document.getElementById("yearDropDown").addEventListener("change", (event)=>{
        selectedYear = event.target.value;
        console.log("Selected year:", selectedYear);
        })
        
        if (selectedMonth === "" || selectedYear === "") {
            alert("Please select both a month and year.");
            return;
        }
        const day = new Date(newDate).getDate();
        newDate = new Date(selectedYear, selectedMonth, day);
        createTable(newDate);
    })
}

window.onload = function() {
    
    createTable(newDate);
    previousMonth();
    nextMonth()
    selectYearMonth()
}
