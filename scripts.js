const shortNameDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Суб"];
const nameDay = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const shower = document.getElementById("listInfo")
const selecterName = document.getElementById('selecterName');
const overlay = document.getElementById('overlay')
const selecterDay = document.getElementById('selecterDay')
const addToHomeScreen = document.getElementById('addToHomeScreen');

var lastselectday = 1;

function getTodayNumber(tommorow = false) {
    const today = new Date();
    if (tommorow) {
        today.setDate(today.getDate() + 1);
    }
    const dayOfWeek = today.getDay();
    return dayOfWeek
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
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (mm < 9) {
        newYear = true;
        Yseptember = yyyy - 1
        var september = new Date(yyyy - 1, 8, 1);
    } else {
        Yseptember = yyyy
        var september = new Date(yyyy, 8, 1);
    }
    dayOfSeptember = (september.getDay() + 6) % 7;

    if (dayOfSeptember == 6) {
        firstWeak = new Date(Yseptember, 8, 1)
    } else {
        firstWeak = new Date(Yseptember, 7, 31 - dayOfSeptember)
    }

    var WeaksNumber = Math.ceil((today - firstWeak) / (7 * 24 * 60 * 60 * 1000)) - 1;
    if (WeaksNumber % 2 == 0) {
        today = 'Числитель';
    } else {
        today = 'Знаменатель';
    }
    return today
}

function parseToNormalView(array) {

    time = `${array[1]} - ${array[2]}`
    name = `${array[3]}`
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
    teacher = array[5]
    number = array[6]

    text = `⌚ ${time}<br>
📖 ${name}<br>
🔎 ${type}<br>
🧑‍🏫 ${teacher}<br>
🚪 ${number}<br>`
    return text
}

const schedulejson = {
    "Понедельник":
        "08:30-10:00 Теория информации и кодирования (Л), доцент Задорожнева Ю.В., Ауд. 1-19 М<br>10:10-11:40 Теория информации и кодирования (Лаб), доцент Задорожнева Ю.В., Ауд. 2-13б М",
    "Вторник": {
        "Числитель": "12:00-13:30 Комплексная система защиты информации (Л), доцент Стебенькова Н.А., Ауд. 2-17 М<br>13:40-15:10 Теория электросвязи (Л), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>15:20-16:50 Теория электросвязи (Пр), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>17:00-18:30 Электроника и схемотехника (Пр), доцент Стебеньков А.М., Ауд. 2-17 М",
        "Знаменатель": "12:00-13:30 Комплексная система защиты информации (Пр), доцент Стебенькова Н.А., Ауд. 2-17 М<br>13:40-15:10 Теория электросвязи (Л), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М"
    },
    "Среда": "13:40-15:10 Сети и системы передачи информации (Л), доцент Ромасевич П.В., Ауд. 2-13 М<br>15:20-16:50 Сети и системы передачи информации (Пр), доцент Ромасевич П.В., Ауд. 2-13 М<br>17:00-18:30 Цифровые системы передачи (Пр), доцент Ромасевич П.В., Ауд. 2-13 М",
    "Четверг": {
        "Числитель": "12:00-13:30 Теория электросвязи (Лаб), старший преподаватель Ермакова Н.Н., Ауд. 2-06 М<br>13:40-15:10 Теория электросвязи (Пр), старший преподаватель Ермакова Н.Н., Ауд. 2-06 М",
        "Знаменатель": "Нет"
    },
    "Пятница": {
        "Числитель": "12:00-13:30 Системы коммутаций (Лаб), доцент Семенов Е.С., Ауд. 2-06 М<br>13:40-15:10 Комплексная система защиты информации (Лаб), доцент Стебенькова Н.А., Ауд. 2-13а М<br>15:20-16:50 Комплексная система защиты информации (Лаб), доцент Стебенькова Н.А., Ауд. 1-19 М",
        "Знаменатель": "12:00-13:30 Системы коммутаций (Лаб), доцент Семенов Е.С., Ауд. 2-06 М<br>13:40-15:10 Системы коммутаций (Пр), доцент Семенов Е.С., Ауд. 2-13 М<br>15:20-16:50 Теория информации и кодирования (Пр), доцент Задорожнева Ю.В., Ауд. 1-19 М"
    },
    "Суббота": "08:30-10:00 Электроника и схемотехника (Л), доцент Стебеньков А.М., Ауд. 2-01 К<br>10:10-11:40 Электроника и схемотехника (Лаб), доцент Стебеньков А.М., Ауд. 3-15 К<br>12:00-13:30 Сети и системы передачи информации (Лаб), ассистент Ромасевич Е.П.,  Ауд. 2-13б М<br>13:40-15:10 Цифровые системы передачи (Лаб), ассистент Ромасевич Е.П.,  Ауд. 2-13б М"
}

function checkSplit(day) {
    if (day === 0) {
        return false
    }
    const infoShedule = schedulejson[nameDay[day]]
    const nowDay = Object.keys(infoShedule)
    if (nowDay.length === 2) {
        return true
    } else {
        return false
    }
}

function selectDay() {

    selecterDay.style.display = 'flex';
    overlay.style.display = 'block';


    overlay.onclick = function (event) {
        if (event.target === overlay) {
            selecterDay.style.display = "none";
            selecterName.style.display = "none";
            overlay.style.display = "none";
            addToHomeScreen.style.display = "none";
        }
    };

}

function selectName() {


    selecterDay.style.display = 'flex';
    overlay.style.display = 'block';

}

function selectD(day) {
    lastselectday = day;
    selecterDay.style.display = "none";
    overlay.style.display = "none";
    if (checkSplit(day)) {
        selecterName.style.display = 'flex';
        overlay.style.display = 'block';
    } else {
        getDaySchedule(day, false)
    }
}

function selectDN(name) {
    selecterName.style.display = "none";
    overlay.style.display = "none";
    getDaySchedule(lastselectday, name);
}

function getDaySchedule(nameDayC, nameWeekC) {
    if (nameDayC === 0) {
        shower.textContent = "";
        const lessonDiv = document.createElement('div');
        lessonDiv.classList.add('infoBlock')
        lessonDiv.innerHTML = "Воскресение, отдыхаем"
        shower.appendChild(lessonDiv);
        return
    }
    const infoShedule = schedulejson[nameDay[nameDayC]]
    const nowDay = Object.keys(infoShedule)

    const regex = /^(\d{2}:\d{2})-(\d{2}:\d{2})\s(.+?)\s\((Л|Лаб|Пр)\)\s*,\s*(.+?),\s*Ауд\.\s([\d\-]+[а-яА-Я]?\s?[МК]?)$/;

    var textToShow = "";
    shower.textContent = "";
    const lessonDiv = document.createElement('div');
    lessonDiv.classList.add('infoBlock');
    lessonDiv.innerHTML = nameWeekC
        ? `${nameDay[nameDayC]} | ${nameWeekC}`
        : `${nameDay[nameDayC]}`;
    shower.appendChild(lessonDiv);

    if (nowDay.length === 2) {
        const text = infoShedule[nameWeekC]
        const list = text.split("<br>");

        if (text === 'Нет') {
            shower.textContent = "";
            const lessonDiv = document.createElement('div');
            lessonDiv.classList.add('infoBlock')
            lessonDiv.innerHTML = `${nameDay[nameDayC]} | ${nameWeekC} | Пар нет`
            shower.appendChild(lessonDiv);
            return
        }

        list.forEach(function (element, index, array) {
            const match = element.match(regex);


            const lessonDiv = document.createElement('div');
            lessonDiv.classList.add('infoBlock');

            const lessonDivIn = document.createElement('div');
            console.log(match);
            lessonDivIn.innerHTML = parseToNormalView(match);
            lessonDivIn.classList.add('inInfoBlock');
            lessonDiv.appendChild(lessonDivIn);

            shower.appendChild(lessonDiv);
        });
    } else {

        if (infoShedule === 'Нет') {
            shower.textContent = "";
            const lessonDiv = document.createElement('div');
            lessonDiv.classList.add('infoBlock')
            lessonDiv.innerHTML = `${nameDay[nameDayC]} | Пар нет`
            shower.appendChild(lessonDiv);
            return
        }

        const list = infoShedule.split("<br>");
        list.forEach(function (element, index, array) {
            const match = element.match(regex);
            const lessonDiv = document.createElement('div');
            lessonDiv.classList.add('infoBlock');


            const lessonDivIn = document.createElement('div');
            lessonDivIn.innerHTML = parseToNormalView(match);
            lessonDivIn.classList.add('inInfoBlock');
            
            lessonDiv.appendChild(lessonDivIn);

            shower.appendChild(lessonDiv);
        });
    }
}

var nowToday = false;

function switchDay() {
    var day = !nowToday ? "Завтра" : "Сегодня";
    console.log(nowToday);
    console.log(getTodayNumber(true));
    Telegram.WebApp.MainButton.showProgress();
    Telegram.WebApp.MainButton.text = day;
    Telegram.WebApp.MainButton.hideProgress();
    if (!nowToday) {
        nowToday = true;
        if (checkSplit(getTodayNumber())) {
            getDaySchedule(getTodayNumber(), getNowWeekName());
        } else {
            getDaySchedule(getTodayNumber(), false);
        }
    } else {
        nowToday = false;
        if (checkSplit(getTodayNumber(true))) {
            getDaySchedule(getTodayNumber(true), getNowWeekName(true));
        } else {
            getDaySchedule(getTodayNumber(true), false);
        }
    }

}

const date = new Date();

const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0');
const yy = String(date.getFullYear());
const formattedDate = `${dd}.${mm}.${yy}`;

document.getElementById("today_naming").textContent = `${getNowWeekName()} | ${formattedDate}   `

switchDay();

const MyApp = {
    initData: Telegram.WebApp.initData || "",
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},

    init(options) {
        Telegram.WebApp.isVerticalSwipesEnabled = false;
        Telegram.WebApp.MainButton.setParams({
            text: "Завтра",
            position: "left",
            is_visible: true,
        }).onClick(() => {
            switchDay();
        });
        Telegram.WebApp.SecondaryButton.setParams({
            text: "Определенный день",
            is_visible: true,
            position: "right",
            textColor: Telegram.WebApp.themeParams.button_text_color,
            color: Telegram.WebApp.themeParams.button_color,
        }).onClick(() => {
            selectDay();
        });


        Telegram.WebApp.ready();
    },
};
MyApp.init();
Telegram.WebApp.SecondaryButton.textColor = Telegram.WebApp.themeParams.button_text_color;