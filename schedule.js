function parseToNormalView(array) {
  const time = `${array[1]} - ${array[2]}`;
  const name = `${array[3]}`;
  let type;
  switch (array[4]) {
    case "Л":
      type = "Лекция";
      break;
    case "Лаб":
      type = "Лабораторная работа";
      break;
    case "Пр":
      type = "Практика";
      break;
    default:
      type = "Неизвестный тип";
  }
  const teacher = array[5];
  const number = array[6];

  return `⌚ ${time}<br>
📖 ${name}<br>
🔎 ${type}<br>
🧑‍🏫 ${teacher}<br>
🚪 ${number}<br>`;
}

function hasDayInSchedule(dayNumber) {
  const group = getCookie("group");

  if (nameDay[dayNumber] in schedulejson[group]) {
    return true;
  } else {
    return false;
  }
}

function checkSplit(day) {
  if (!hasDayInSchedule(day)) {
    return false;
  }
  const group = getCookie("group");

  const groupshe = schedulejson[group];
  const infoShedule = groupshe[nameDay[day]];
  const nowDay = Object.keys(infoShedule);
  if (nowDay.length === 2) {
    return true;
  } else {
    return false;
  }
}

function setDaySchedule(dayNumber, nameWeek) {
  cleanMainScreen();
  const group = getCookie("group");

  if (!hasDayInSchedule(dayNumber)) {
    topBarSetText(nameDay[dayNumber]);
    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("infoBlock");
    lessonDiv.innerHTML = 'Пар нет!';
    shower.appendChild(lessonDiv);
    return;
  }

  const groupSchedule = schedulejson[group];
  var textScheduleOnDay = groupSchedule[nameDay[dayNumber]]

  let textToShow = "";
  topBarSetText(nameWeek
    ? `${nameDay[dayNumber]} | ${nameWeek}`
    : `${nameDay[dayNumber]}`);

  if (nameWeek) {
    textScheduleOnDay = textScheduleOnDay[nameWeek]
  }

  const list = textScheduleOnDay.split("<br>");

  list.forEach(function (element) {
    if (/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(element.trim())) return;

    const match = element.match(regex);
    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("infoBlock");

    const lessonDivIn = document.createElement("div");
    lessonDivIn.innerHTML = parseToNormalView(match);
    lessonDivIn.classList.add("inInfoBlock");
    lessonDiv.appendChild(lessonDivIn);

    const copyB = document.createElement("button");
    copyB.innerHTML = "<i class='fa-regular fa-copy'></i>"
    copyB.className = "copyButton";
    lessonDiv.appendChild(copyB);
    copyB.addEventListener("click", function () {
      const textToCopy = lessonDivIn.innerText;
      navigator.clipboard.writeText(textToCopy);
    });

    shower.appendChild(lessonDiv);
  });
}

function showSelecterGroup() {
  cleanMainScreen();
  topBarSetText("Выберите группу");

  groupArray.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    button.className = "buttonSelector";
    button.addEventListener("click", function () {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 10);
      document.cookie = `group=${item
        }; path=/; expires=${expires.toUTCString()}`;
      startMiniApp();
    });
    shower.appendChild(button);
  });
}

function showSettingsPage() {
  cleanMainScreen();
  topBarSetText("Настройки");

  const selectStyle = document.createElement("button");
  selectStyle.textContent = oldStyle ? "Новый стиль" : "Старый стиль";
  selectStyle.className = "buttonSelector";
  selectStyle.addEventListener("click", function () {
    oldStyleSwitcher();
    selectStyle.textContent = oldStyle ? "Новый стиль" : "Старый стиль";
  });
  shower.appendChild(selectStyle);

  const selectGroup = document.createElement("button");
  selectGroup.textContent = "Поменять группу";
  selectGroup.className = "buttonSelector";
  selectGroup.addEventListener("click", function () {
    showSelecterGroup();
  });

  shower.appendChild(selectGroup);
}