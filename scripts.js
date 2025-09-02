function getTodayNumber(tommorow = false) {
  const today = new Date();
  if (tommorow) {
    today.setDate(today.getDate() + 1);
  }
  return today.getDay();
}

function getNowWeekName(tommorow = false) {
  const today = new Date();

  if (tommorow) {
    today.setDate(today.getDate() + 1);
  }

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let Yseptember;
  let september;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (mm < 9) {
    Yseptember = yyyy - 1;
    september = new Date(yyyy - 1, 8, 1);
  } else {
    Yseptember = yyyy;
    september = new Date(yyyy, 8, 1);
  }
  const dayOfSeptember = (september.getDay() + 6) % 7;

  let firstWeak;
  if (dayOfSeptember == 6) {
    firstWeak = new Date(Yseptember, 8, 1);
  } else {
    firstWeak = new Date(Yseptember, 7, 31 - dayOfSeptember);
  }

  const WeaksNumber =
    Math.ceil((today - firstWeak) / (7 * 24 * 60 * 60 * 1000)) - 1;
  return WeaksNumber % 2 == 0 ? "Числитель" : "Знаменатель";
}

function OpenDaySelector() {
  selecterDay.style.display = "flex";
  overlay.style.display = "block";
  selecterName.style.display = "none";
  overlay.onclick = function (event) {
    if (event.target === overlay) {
      selecterDay.style.display = "none";
      selecterName.style.display = "none";
      overlay.style.display = "none";
    }
  };
}

function SelectDay(day) {
  lastSelectedDay = day;
  selecterDay.style.display = "none";
  overlay.style.display = "none";
  if (checkSplit(day)) {
    selecterName.style.display = "flex";
    overlay.style.display = "block";
  } else {
    setDaySchedule(day, false);
  }
}

function OpenNameWeekSelector(name) {
  selecterName.style.display = "none";
  overlay.style.display = "none";
  setDaySchedule(lastSelectedDay, name);
}

let nowToday = false;

function switchDay() {
  const day = !nowToday ? "Завтра" : "Сегодня";
  Telegram.WebApp.MainButton.showProgress();
  Telegram.WebApp.MainButton.text = day;
  Telegram.WebApp.MainButton.hideProgress();
  if (!nowToday) {
    nowToday = true;
    if (checkSplit(getTodayNumber())) {
      setDaySchedule(getTodayNumber(), getNowWeekName());
    } else {
      setDaySchedule(getTodayNumber(), false);
    }
  } else {
    nowToday = false;
    if (checkSplit(getTodayNumber(true))) {
      setDaySchedule(getTodayNumber(true), getNowWeekName(true));
    } else {
      setDaySchedule(getTodayNumber(true), false);
    }
  }
}

function startMiniApp() {
  if (checkCookie("group")) {
    switchDay();
  } else {
    showSelecterGroup();
  }
}

startMiniApp();

function newOpenDaySelector() {
  cleanMainScreen();
  topBarSetText("Выберите день");

  buttonDaySelecter.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.className = "buttonSelector";
    button.addEventListener("click", () => {
      newSelectDay(item.data);
    });
    shower.appendChild(button);
  });
}

function newSelectDay(day) {
  lastSelectedDay = day;
  if (checkSplit(day)) {
    newOpenNameWeekSelector();
  } else {
    setDaySchedule(day, false);
  }
}

let oldStyle = getCookie("oldStyle") !== "false";

function oldStyleSwitcher() {
  oldStyle = !oldStyle;
  setCookie("oldStyle", oldStyle);
}

function newOpenNameWeekSelector() {
  cleanMainScreen();
  topBarSetText(nameDay[lastSelectedDay]);

  buttonNameWeekDay.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    button.className = "buttonSelector";
    button.addEventListener("click", () => {
      OpenNameWeekSelector(item);
    });
    shower.appendChild(button);
  });
}