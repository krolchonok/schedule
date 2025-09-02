function parseToNormalView(array) {
  const [, start, end, name, typeCode, teacher, number] = array;
  const lessonTypes = {
    "Л": "Лекция",
    "Лаб": "Лабораторная работа",
    "Пр": "Практика",
  };
  const type = lessonTypes[typeCode] || "Неизвестный тип";

  return `⌚ ${start} - ${end}<br>
📖 ${name}<br>
🔎 ${type}<br>
🧑‍🏫 ${teacher}<br>
🚪 ${number}<br>`;
}

function hasDayInSchedule(dayNumber) {
  const group = getCookie("group");
  const dayName = nameDay[dayNumber];
  const groupSchedule = schedulejson[group] || {};
  return Boolean(groupSchedule[dayName]);
}

function checkSplit(day) {
  if (!hasDayInSchedule(day)) {
    return false;
  }
  const group = getCookie("group");
  const infoSchedule = schedulejson[group][nameDay[day]];
  return Object.keys(infoSchedule).length === 2;
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
  let textScheduleOnDay = groupSchedule[nameDay[dayNumber]];

  topBarSetText(
    nameWeek ? `${nameDay[dayNumber]} | ${nameWeek}` : `${nameDay[dayNumber]}`
  );

  if (nameWeek) {
    textScheduleOnDay = textScheduleOnDay[nameWeek];
  }

  const list = textScheduleOnDay.split("<br>");

  list.forEach((element) => {
    if (/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(element.trim())) return;

    const match = element.match(regex);
    if (!match) return;

    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("infoBlock");

    const lessonDivIn = document.createElement("div");
    lessonDivIn.innerHTML = parseToNormalView(match);
    lessonDivIn.classList.add("inInfoBlock");
    lessonDiv.appendChild(lessonDivIn);

    const copyB = document.createElement("button");
    copyB.innerHTML = "<i class='fa-regular fa-copy'></i>";
    copyB.className = "copyButton";
    lessonDiv.appendChild(copyB);
    copyB.addEventListener("click", () => {
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
    button.addEventListener("click", () => {
      setCookie("group", item);
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
