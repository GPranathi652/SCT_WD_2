// DOM Elements
const display = document.getElementById("display");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const lapsContainer = document.getElementById("laps");

// Timer Variables
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer = null;
let timerState = "stopped"; // 'stopped', 'running', 'paused'

// Event Listeners
rightBtn.addEventListener("click", () => {
    if (timerState === "running") {
        pauseTimer();
    } else {
        startTimer();
    }
});

leftBtn.addEventListener("click", () => {
    if (timerState === "running") {
        recordLap();
    } else if (timerState === "paused") {
        resetTimer();
    }
});

// Timer Functions
function startTimer() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(updateDisplay, 10);
    timerState = "running";
    updateButtons();
}

function pauseTimer() {
    clearInterval(timer);
    timerState = "paused";
    updateButtons();
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    display.textContent = "00:00:00.00";
    lapsContainer.innerHTML = "";
    timerState = "stopped";
    updateButtons();
}

function updateDisplay() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = Math.floor(milliseconds / 10).toString().padStart(2, '0');
    display.textContent = `${h}:${m}:${s}.${ms}`;
}

function recordLap() {
    const lapTime = display.textContent;
    const lapNumber = lapsContainer.children.length + 1;
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `<span>Lap ${lapNumber}</span><span>${lapTime}</span>`;
    lapsContainer.prepend(lapItem);
}

// UI Update Function
function updateButtons() {
    if (timerState === "stopped") {
        rightBtn.textContent = "Start";
        rightBtn.className = "btn-start";
        leftBtn.textContent = "Lap";
        leftBtn.className = "btn-lap";
        leftBtn.disabled = true;
    } else if (timerState === "running") {
        rightBtn.textContent = "Stop";
        rightBtn.className = "btn-stop";
        leftBtn.textContent = "Lap";
        leftBtn.className = "btn-lap";
        leftBtn.disabled = false;
    } else if (timerState === "paused") {
        rightBtn.textContent = "Resume";
        rightBtn.className = "btn-start";
        leftBtn.textContent = "Reset";
        leftBtn.className = "btn-reset";
        leftBtn.disabled = false;
    }
}

// Initialize buttons on page load
updateButtons();
