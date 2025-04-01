//Help 1
//Chatgpt: how to change clock format from 24h to 12h in js
//Help 2
//Chatgpt: how to change div, h1, select color using select options in js
//Help 3
//Chatgpt: how to change timezone using select options in js
//Help 4
//Chatgpt: how to count how long you have been on a website in js
//Help 5
//Chatgpt: how to turn id element off/on using button in select options  in js
//Help 6
//Chatgpt: how to save stuff into local storage in js
//////////////////////////////////////////////////////////////////////////////

let isClockVisible = true;
let is24HourFormat = true;
let clockColor = '#000000';
let backgroundColor = '#ffffff';
let startTime = new Date().getTime();
let timeSpent = 0;
let currentTimeZone = 'Europe/Tallinn';

const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const clockColorSelect = document.getElementById('clockColor');
const timeFormatSelect = document.getElementById('timeFormat');
const bgColorSelect = document.getElementById('bgColor');
const changeLocationSelect = document.getElementById('changeLocation');
const showTimeSpentButton = document.getElementById('showTimeSpent');
const toggleClockSelect = document.getElementById('toggleClock');

// Load from localStorage if exists //Help 6
function loadPreferences() {
    if (localStorage.getItem('is24HourFormat')) {
        is24HourFormat = JSON.parse(localStorage.getItem('is24HourFormat'));
    }
    if (localStorage.getItem('clockColor')) {
        clockColor = localStorage.getItem('clockColor');
    }
    if (localStorage.getItem('backgroundColor')) {
        backgroundColor = localStorage.getItem('backgroundColor');
    }
    if (localStorage.getItem('currentTimeZone')) {
        currentTimeZone = localStorage.getItem('currentTimeZone');
    }
    if (localStorage.getItem('startTime')) {
        startTime = parseInt(localStorage.getItem('startTime'));
    }
    if (localStorage.getItem('clockColor')) {
        clockColor = localStorage.getItem('clockColor');
    }
    if (localStorage.getItem('backgroundColor')) {
        backgroundColor = localStorage.getItem('backgroundColor');
    }
}

// Save to localStorage //Help 6
function savePreferences() {
    localStorage.setItem('is24HourFormat', JSON.stringify(is24HourFormat));
    localStorage.setItem('clockColor', clockColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('currentTimeZone', currentTimeZone);
    localStorage.setItem('startTime', startTime.toString());
}

// Update //Help 6
function updatePreferences() {
    clockElement.style.color = clockColor;
    document.body.style.backgroundColor = backgroundColor;

    // Set the dropdowns
    timeFormatSelect.value = is24HourFormat ? '24' : '12';
    changeLocationSelect.value = currentTimeZone;
    clockColorSelect.value = clockColor;
    bgColorSelect.value = backgroundColor;


    applyTextColor();
}

//Help 2
function applyTextColor() {
    const labels = document.querySelectorAll('label');
    const h1Elements = document.querySelectorAll('h1');
    const pElements = document.querySelectorAll('p');
    const divElements = document.querySelectorAll('div');

    labels.forEach(label => {
        label.style.color = clockColor;
    });
    h1Elements.forEach(h1 => {
        h1.style.color = clockColor;
    });
    pElements.forEach(p => {
        p.style.color = clockColor;
    });
    divElements.forEach(div => {
        div.style.color = clockColor;
    });
}

function updateClock() {
    const now = new Date();

    // Time Format //Help 1
    const timeFormat = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24HourFormat,
        timeZone: currentTimeZone
    });
    clockElement.innerText = timeFormat.format(now);

    // Date Format //Help 1
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    dateElement.innerText = dateFormat.format(now);

    // Time spent //Help 4
    timeSpent = new Date().getTime() - startTime;
}

// 12h/24h format //Help 1
timeFormatSelect.addEventListener("change", () => {
    is24HourFormat = timeFormatSelect.value === "24";
    savePreferences();
    updateClock();
});

// Clock color //Help 2
clockColorSelect.addEventListener('change', (event) => {
    clockColor = event.target.value;
    savePreferences();
    clockElement.style.color = clockColor;

    applyTextColor();
});

// Background color //Help 2
bgColorSelect.addEventListener('change', (event) => {
    backgroundColor = event.target.value;
    savePreferences();
    document.body.style.backgroundColor = backgroundColor;
});

// Time zone //Help 3
changeLocationSelect.addEventListener('change', (event) => {
    currentTimeZone = event.target.value;
    savePreferences();
    updateClock();
});

// Time spent //Help 4
showTimeSpentButton.addEventListener('click', () => {
    const timeInSeconds = Math.floor(timeSpent / 1000); // Total
    const hours = Math.floor(timeInSeconds / 3600); // H
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // Min
    const seconds = timeInSeconds % 60; // S

    alert('Oled kella vaadanud umbes ' + hours + 'h ' + minutes + 'min ' + seconds + 's');
});

// Clock visibility //Help 5
toggleClockSelect.addEventListener('change', (event) => {
    if (event.target.value === 'hide') {
        isClockVisible = false;
        savePreferences();
        clockElement.style.display = 'none';
    } else {
        isClockVisible = true;
        savePreferences();
        clockElement.style.display = 'block';
    }
});


loadPreferences();
updatePreferences();

clockElement.style.display = 'block';  // Ensure clock is visible when page loads
updateClock();
setInterval(updateClock, 1000);
