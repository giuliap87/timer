const form = document.querySelector("#setup-form");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const display = document.querySelector("#display");
const setBtn = document.querySelector("#set");
const sound = document.querySelector(".sound");
const icon = document.querySelector(".icon");

// disabled start and reset button
startBtn.disabled = resetBtn.disabled = true;

// create global interval var in order to assign it and clear it in diff funcs
let interval;

// create var to toggle text in start/pause button
let toggleBtn = false;

// time objs
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

// loop through time array and listen to inputs change

timeArray.forEach((el) => {
  el.input.addEventListener("change", () => {
    resetBtn.disabled = false;
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

// set time in timer

function setTimer(e) {
  e.preventDefault();

  // if all inputs's vals are 0 do not enabled the start btn
  if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
    startBtn.disabled = true;
  } else {
    startBtn.disabled = resetBtn.disabled = false;
  }

  // shows time set by user in paragraph under input
  display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
}

function startTimer() {
  // calculate tot time in seconds
  let totSecs = +hours.value * 3600 + +minutes.value * 60 + +seconds.value - 1;
  let timeIsUp = false;
  setBtn.disabled = true;

  interval = setInterval(() => {
    // calculate time in hours, mins, secs from seconds
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
      icon.classList.remove("hidden");

      display.innerText = `Time is up! : - ${hours.value}:${minutes.value}:${seconds.value}`;

      //play audio clip
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
  sound.currentTime = 0;
  icon.classList.add("hidden");
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
