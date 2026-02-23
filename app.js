const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

const calendarDays = document.getElementById("calendar-days");
const monthPicker = document.getElementById("month-picker");
const yearDisplay = document.getElementById("year");
const prevYear = document.getElementById("prev-year");
const nextYear = document.getElementById("next-year");
const monthList = document.getElementById("month-list");
const darkToggle = document.getElementById("dark-mode-toggle");

const modal = document.getElementById("event-modal");
const eventText = document.getElementById("event-text");
const eventTitle = document.getElementById("event-title");
const saveEvent = document.getElementById("save-event");
const closeEvent = document.getElementById("close-event");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = "";

let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

/* Create month list */
monthNames.forEach((month, index) => {
    const div = document.createElement("div");
    div.textContent = month;
    div.onclick = () => {
        currentMonth = index;
        monthList.classList.remove("show");
        renderCalendar();
    };
    monthList.appendChild(div);
});

monthPicker.onclick = () => {
    monthList.classList.toggle("show");
};

/* Render Calendar */
function renderCalendar() {
    calendarDays.innerHTML = "";
    monthPicker.textContent = monthNames[currentMonth];
    yearDisplay.textContent = currentYear;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarDays.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= totalDays; day++) {
        const div = document.createElement("div");
        div.textContent = day;

        const key = `${day}-${currentMonth}-${currentYear}`;

        if (events[key]) div.classList.add("has-event");

        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) div.classList.add("today");

        div.onclick = () => openEvent(day);
        calendarDays.appendChild(div);
    }
}

/* Events */
// function openEvent(day) {
//     selectedDate = `${day}-${currentMonth}-${currentYear}`;
//     eventTitle.textContent = `Event on ${day} ${monthNames[currentMonth]} ${currentYear}`;
//     eventText.value = events[selectedDate] || "";
//     modal.classList.add("active");
// }

// saveEvent.onclick = () => {
//     if (eventText.value.trim()) {
//         events[selectedDate] = eventText.value;
//     } else {
//         delete events[selectedDate];
//     }
//     localStorage.setItem("calendarEvents", JSON.stringify(events));
//     modal.classList.remove("active");
//     renderCalendar();
// };

// closeEvent.onclick = () => modal.classList.remove("active");

/* Navigation */
prevYear.onclick = () => {
    currentYear--;
    renderCalendar();
};

nextYear.onclick = () => {
    currentYear++;
    renderCalendar();
};

darkToggle.onclick = () => {
    document.body.classList.toggle("theme-dark");
};

renderCalendar();