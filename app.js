const form = document.querySelector("#setup-form");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const display = document.querySelector("#display");

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
    if (val) {
      if (val >= 0 && val < 60) {
        if (val < 10) {
          val = `0${val}`;
        }
        el.value = val;
        display.innerText = `${hours.value}:${minutes.value}:${seconds.value}`;
      }
    } else {
      return;
    }
  });
});
