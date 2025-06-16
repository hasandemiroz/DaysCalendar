import daysData from "./days.json" with { type: "json" };
let year = 2025;
let month = 8;

export function prepareOccasions(daysData, weekDays, currentMonth) {
  const conditions = ["first", "second", "third", "fourth", "last"];

  //Filtering events for the current month
  const filteredEvents = daysData.filter(event => event.monthName === currentMonth);

  // Step Map filtered events to the shape of object we neddi
  const mappedEvents = filteredEvents.map(event => {
    const occurenceIndex = conditions.indexOf(event.occurence) + 1;
    const dayIndex = weekDays.indexOf(event.dayName);
    return {
      dayName: event.dayName,
      dayIndex: dayIndex,
      occurence: event.occurence,
      occuranceIndex: occurenceIndex,
      name: event.name,
      descriptionURL: event.descriptionURL
    };
  });

  // sorting  events by occuranceIndex 
  const sortedEvents = mappedEvents.sort((a, b) => a.occuranceIndex - b.occuranceIndex);

  return sortedEvents;
}



export function findingEvent(ocaisions, year, month, day, weekdayCounters) {
  const currentDate = new Date(year, month, day);
  let currentDayIndex = currentDate.getDay();
  currentDayIndex = currentDayIndex == 0 ? 6 : currentDayIndex -1;

  // Increase the counter for this weekday
  weekdayCounters[currentDayIndex] = (weekdayCounters[currentDayIndex] || 0) + 1;

  for (let i = 0; i < ocaisions.length; i++) {
    const ocaision = ocaisions[i];

    if (ocaision.dayIndex === currentDayIndex) {
      // Check if the counter for this weekday is same as this event's occurrence index
      if (weekdayCounters[currentDayIndex] === ocaision.occuranceIndex) {
        const eventDay = {
          day: day,
          name: ocaision.name,
          link: ocaision.descriptionURL
        };

        // Remove matched occasion
        ocaisions.splice(i, 1);

        return eventDay;
      }
    }
  }

  return day;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = monthNames[month];
let ocaisions = prepareOccasions(daysData, weekDays, currentMonth);

let weekdayCounters = Array(7).fill(0); // counters for Sunday=0 ... Saturday=6

const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let day = 1; day <= daysInMonth; day++) {
  const result = findingEvent(ocaisions, year, month, day, weekdayCounters);
  console.log(result);
}




