const clock = document.querySelector(".clock");
const alarmHrs = document.querySelector(".alarm-hrs");
const alarmMins = document.querySelector(".alarm-mins");
const setButton = document.querySelector(".setButton");
const clearButton = document.querySelector(".clearButton");

setButton.addEventListener("click", alarmSet);
clearButton.addEventListener("click", alarmClear);

let sound = new Audio(
  "https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3"
);

const currentTime = setInterval(function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  alarmHrs.value = hours;
  alarmMins.value = minutes + 1;

  clock.textContent = `${addZero(hours)}:${addZero(minutes)}`;
}, 1000);

function addZero(time) {
  return time < 10 ? "0" + time : time;
}

function hoursMenu() {
  let hrs = 24;
  for (i = 1; i <= hrs; i++) {
    alarmHrs.options[alarmHrs.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
hoursMenu();

function minMenu() {
  let min = 59;
  for (i = 0; i <= min; i++) {
    alarmMins.options[alarmMins.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
minMenu();

function alarmSet() {
  const selectedHour = alarmHrs.options[alarmHrs.selectedIndex].value;
  const selectedMin = alarmMins.options[alarmMins.selectedIndex].value;
  const defaultSeconds = 0;

  const alarmTime = `${addZero(selectedHour)}:${addZero(selectedMin)}:${defaultSeconds}`;

  alarmHrs.disabled = true;
  alarmMins.disabled = true;

  //when alarmtime is equal to currenttime then play a sound
  setInterval(function () {
    const date = new Date();
    const seconds = date.getSeconds();
    const currentTime = `${clock.textContent}:${seconds}`;

    if (alarmTime == currentTime) {
      sound.play();
    }
  }, 1000);
}


function alarmClear() {
  alarmHrs.disabled = false;
  alarmMins.disabled = false;
  sound.pause();
}