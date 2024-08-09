const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");
const lapButtonEl = document.getElementById("lap-id");
const lap = document.querySelector(".lap");

let startTime = 0;
let elapsedTime = 0;
let lapTime = "00:00:00.00";
let timerInterval;
let lapcount = 1;

function startTimer() {
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;

    timerEl.textContent = formatTime(elapsedTime);
  }, 10);

  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;
  lapButtonEl.disabled = false;
  startButtonEl.style.backgroundColor = "rgba(240, 128, 128, 0.371)";
  stopButtonEl.style.backgroundColor = "lightcoral";
  resetButtonEl.style.backgroundColor = "lightcoral";
  lapButtonEl.style.backgroundColor = "lightcoral";
  stopButtonEl.style.display = "block";
  resetButtonEl.style.display = "block";
  lapButtonEl.style.display = "block";
}

function formatTime(elapsedTime) {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}
function stopTimer() {
  clearInterval(timerInterval);
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  lapButtonEl.disabled = true;
  startButtonEl.style.backgroundColor = "lightcoral";
  stopButtonEl.style.backgroundColor = "rgba(240, 128, 128, 0.371)";
  lapButtonEl.style.backgroundColor = "rgba(240, 128, 128, 0.371)";
  resetButtonEl.style.backgroundColor = "lightcoral";
}

function resetTimer() {
  clearInterval(timerInterval);

  elapsedTime = 0;
  lapcount = 1;
  timerEl.textContent = "00:00:00";
  lapTime = "00:00:00.00";
  lap.innerHTML = "";
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  startButtonEl.style.backgroundColor = "lightcoral";
  stopButtonEl.style.backgroundColor = "rgba(240, 128, 128, 0.371)";
  resetButtonEl.style.backgroundColor = "lightcoral";
  lapButtonEl.style.backgroundColor = "lightcoral";
  stopButtonEl.style.display = "none";
  resetButtonEl.style.display = "none";
  lapButtonEl.style.display = "none";
  lap.style.display = "none";
}

function laptimer() {
  let currenttime = timerEl.textContent;
  let value = lapTime;
  console.log(currenttime);
  console.log(value);
  let Cmilliseconds = parseInt(currenttime.substring(9));
  let Vmilliseconds = parseInt(value.substring(9));
  let Cseconds = parseInt(currenttime.substring(6, 8));
  let Vseconds = parseInt(value.substring(6, 8));
  let Cminutes = parseInt(currenttime.substring(3, 5));
  let Vminutes = parseInt(value.substring(3, 5));
  let Chour = parseInt(currenttime.substring(0, 2));
  let Vhour = parseInt(value.substring(0, 2));

  if (Vmilliseconds > Cmilliseconds) {
    Cmilliseconds += 100;
    --Cseconds;
  }
  let fmilliseconds = Cmilliseconds - Vmilliseconds;

  fmilliseconds = fmilliseconds
    ? fmilliseconds > 9
      ? fmilliseconds
      : "0" + fmilliseconds
    : "00";

  if (Vseconds > Cseconds) {
    Cseconds += 60;
    --Cminutes;
  }
  let fseconds = Cseconds - Vseconds;

  fseconds = fseconds ? (fseconds > 9 ? fseconds : "0" + fseconds) : "00";

  if (Vminutes > Cminutes) {
    Cminutes += 60;
    --Chour;
  }
  let fminutes = Cminutes - Vminutes;

  fminutes = fminutes ? (fminutes > 9 ? fminutes : "0" + fminutes) : "00";

  let fhour = Chour - Vhour;
  fhour = fhour ? (fhour > 9 ? fhour : "0" + fhour) : "00";

  let finallaptime = `${fhour}:${fminutes}:${fseconds}.${fmilliseconds}`;
  console.log(finallaptime);
  lapTime = currenttime;
  if (lapcount === 1) {
    lap.innerHTML = `<div class="lap-columns">
    <div>Lap</div>
    <div>Lap time</div>
    <div>Total</div></div>   `;
  }
  lap.innerHTML += ` <div class="lap-columns"><div>${lapcount}</div><div>${finallaptime}</div><div>${currenttime}</div></div>`;
  lapcount++;
  lapButtonEl.disabled = false;
  lap.style.display = "flex";
}

startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);
lapButtonEl.addEventListener("click", laptimer);
