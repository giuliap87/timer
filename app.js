const form = document.querySelector("#setup-form");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const display = document.querySelector("#display");
const setBtn = document.querySelector("#set");
const sound = document.querySelector('.sound');

startBtn.disabled = resetBtn.disabled = true;

let interval;

// create var to toggle text in start/pause button
let toggleBtn = false;

const hours = {
  input: document.querySelector("#hours"),
  value: "00",
};

const minutes = {
  input: document.querySelector("#minutes"),
  value: "00",
};
const seconds = {
  input: document.querySelector("#seconds"),
  value: "00",
};

const timeArray = [hours, minutes, seconds];

timeArray.forEach((el) => {
  el.input.addEventListener("change", () => {
    let val = el.input.value;
    if (!val) {
      val = "00";
    } else if (val >= 0 && val < 60 && val.length < 3) {
      if (val < 10 && val.length < 2) {
        val = `0${val}`;
      }
      el.value = val;
    } else {
      val = "00";
      return;
    }
  });
});

function setTimer(e) {
  e.preventDefault();
  startBtn.disabled = resetBtn.disabled = false;

  display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
}

function startTimer() {
  let totSecs = +hours.value * 3600 + +minutes.value * 60 + +seconds.value - 1;
  let timeIsUp = false;
  setBtn.disabled = true;

  interval = setInterval(() => {
    hours.value = Math.floor(totSecs / 3600);
    minutes.value = Math.floor((totSecs % 3600) / 60);
    seconds.value = Math.floor(totSecs % 60);

    if (hours.value < 10) {
      hours.value = `0${hours.value}`;
    }
    if (minutes.value < 10) {
      minutes.value = `0${minutes.value}`;
    }
    if (seconds.value < 10) {
      seconds.value = `0${seconds.value}`;
    }

    if (totSecs > 0 && timeIsUp === false) {
      totSecs--;
      display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
    } else {
      timeIsUp = true;
      totSecs++;
      startBtn.disabled = true;
      resetBtn.innerText = "Stop";
      display.innerText = `Time is up! : - ${hours.value}:${minutes.value}:${seconds.value}`;
      // sound.currentTime = 0;
      sound.play();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  timeArray.forEach((el) => {
    el.input.value = 0;
    el.value = "00";
  });
  display.innerText = "00:00:00";
  startBtn.innerText = "Start";
  resetBtn.innerText = "Reset";

  toggleBtn = false;
  startBtn.disabled = resetBtn.disabled = true;
  setBtn.disabled = false;
  sound.pause();
}

function pauseTimer() {
  clearInterval(interval);
}

setBtn.addEventListener("click", setTimer);
startBtn.addEventListener("click", () => {
  toggleBtn = !toggleBtn;

  if (toggleBtn) {
    startTimer();
    startBtn.innerText = "Pause";
  } else {
    startBtn.innerText = "Start";
    pauseTimer();
  }
});
resetBtn.addEventListener("click", resetTimer);
