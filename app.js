const form = document.querySelector("#setup-form");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const display = document.querySelector("#display");
const setBtn = document.querySelector("#set");

let interval;

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
  display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
}

function startTimer() {
  let totSecs = +hours.value * 3600 + +minutes.value * 60 + +seconds.value;
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

    if (totSecs >= 0) {
      totSecs--;
      display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
    }
  }, 1000);
};

function resetTimer() {
 clearInterval(interval); 
 timeArray.forEach((el) => {
   el.input.value = 0;
   el.value = "00"; 
  })
  display.innerText = "00:00:00";
}



setBtn.addEventListener("click", setTimer);
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);