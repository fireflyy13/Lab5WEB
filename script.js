let timerRef = document.querySelector(".clock");
let dateRef = document.querySelector(".currentDate");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];

function addZero(value) {
  return value < 10 ? "0" + value : value.toString();
}

function formatInput(num) {
  let value = parseInt(num.value);
  if (!isNaN(value) && value < 10) {
    num.value = addZero(value);
  }
}

hourInput.addEventListener("change", () => formatInput(hourInput));
minuteInput.addEventListener("change", () => formatInput(minuteInput));
dayInput.addEventListener("change", () => formatInput(dayInput));
monthInput.addEventListener("change", () => formatInput(monthInput));

function displayTimer() {
  const date = new Date();
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
  dateRef.innerHTML = `${day}.${month}.${year}`;
  dateRef.style.fontSize = "20px";

  alarmsArray.forEach((alarm, index) => {
    if (
      alarm[5] &&
      alarm[0] === hours &&
      alarm[1] === minutes &&
      alarm[2] === day &&
      alarm[3] === month &&
      alarm[4] === year
    ) {
      alert("Wake up!");
      alarmsArray[index][5] = false;
      updateAlarmsDisplay();
    }
  });
}

function updateAlarmsDisplay() {
  activeAlarms.innerHTML = "";
  alarmsArray.forEach((alarm, index) => {
    const alarmElement = document.createElement("div");
    alarmElement.classList.add("alarm");
    console.log(`Час, на який налаштований будильник: ${alarm[0]}:${alarm[1]}`);
    console.log(`Вибрана дата: ${alarm[2]}.${alarm[3]}.${alarm[4]}`);
    console.log("Будильник вимкнено.");
    alarmElement.innerHTML = `<span>${alarm[2]}.${alarm[3]}.${alarm[4]} - ${alarm[0]}:${alarm[1]}</span>`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = alarm[5];
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        startAlarm(index);
        console.log("Будильник увімкнено.");
      } else {
        stopAlarm(index);
        console.log("Будильник вимкнено.");
      }
    });
    alarmElement.appendChild(checkbox);
    activeAlarms.appendChild(alarmElement);
  });
}

setAlarm.addEventListener("click", () => {
  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  if (
    !isNaN(hour) &&
    !isNaN(minute) &&
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(year)
  ) {
    alarmsArray.push([
      addZero(hour),
      addZero(minute),
      addZero(day),
      addZero(month),
      year,
      true,
    ]);
    updateAlarmsDisplay();
  } else {
    alert("Будь ласка, введіть коректну дату та час!.");
  }

  hourInput.value = "";
  minuteInput.value = "";
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
});

function startAlarm(index) {
  alarmsArray[index][5] = true;
}

function stopAlarm(index) {
  alarmsArray[index][5] = false;
}

setInterval(displayTimer, 1000);
