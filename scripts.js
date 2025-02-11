var lastselectday = 1;

function getTodayNumber(tommorow = false) {
  const today = new Date();
  if (tommorow) {
    today.setDate(today.getDate() + 1);
  }
  const dayOfWeek = today.getDay();
  return dayOfWeek;
}

function getNowWeekName(tommorow = false) {
  var today = new Date();

  if (tommorow) {
    today.setDate(today.getDate() + 1);
  }

  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var newYear = false;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (mm < 9) {
    newYear = true;
    Yseptember = yyyy - 1;
    var september = new Date(yyyy - 1, 8, 1);
  } else {
    Yseptember = yyyy;
    var september = new Date(yyyy, 8, 1);
  }
  dayOfSeptember = (september.getDay() + 6) % 7;

  if (dayOfSeptember == 6) {
    firstWeak = new Date(Yseptember, 8, 1);
  } else {
    firstWeak = new Date(Yseptember, 7, 31 - dayOfSeptember);
  }

  var WeaksNumber =
    Math.ceil((today - firstWeak) / (7 * 24 * 60 * 60 * 1000)) - 1;
  if (WeaksNumber % 2 == 0) {
    today = "Числитель";
  } else {
    today = "Знаменатель";
  }
  return today;
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
  lastselectday = day;
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
  setDaySchedule(lastselectday, name);
}

var nowToday = false;

function switchDay() {
  var day = !nowToday ? "Завтра" : "Сегодня";
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

startMiniApp()

function newOpenDaySelector() {
  cleanMainScreen();
  topBarSetText("Выберите день");

  buttonDaySelecter.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.className = "buttonSelector";
    button.addEventListener("click", function () {
      newSelectDay(item.data)
    });
    shower.appendChild(button);
  });
}

function newSelectDay(day) {
  lastselectday = day;
  if (checkSplit(day)) {
    newOpenNameWeekSelector()
  } else {
    setDaySchedule(day, false);
  }
}

var oldStyle = getCookie("oldStyle") | true;

function oldStyleSwitcher() {
  oldStyle = !oldStyle;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);
  document.cookie = `oldStyle=${oldStyle
    }; path=/; expires=${expires.toUTCString()}`;
}

function newOpenNameWeekSelector() {
  cleanMainScreen();
  topBarSetText(nameDay[lastselectday]);

  buttonNameWeekDay.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    button.className = "buttonSelector";
    button.addEventListener("click", function () {
      OpenNameWeekSelector(item)
    });
    shower.appendChild(button);
  });
}