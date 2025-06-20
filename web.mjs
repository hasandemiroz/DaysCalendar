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

function nextMonth(newdate){
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

window.onload = function() {
    
    createTable(newDate);
    previousMonth();
    nextMonth()
}
