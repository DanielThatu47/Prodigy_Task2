let isRunning = false;
let lapCount = 1;
let stopwatchInterval;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function toggleStartPause() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

startPauseBtn.addEventListener('click', toggleStartPause);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapCount = 1;
    lapList.innerHTML = '';
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`; /* Fixed lap item format */
    lapList.appendChild(lapItem);
    lapCount++;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}