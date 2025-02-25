// Массивы с днями недели
const shortNameDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Суб"];
const nameDay = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];



const groupArray = [
  "ИБТС-211",
  "РСК-211"
];

const buttonDaySelecter = [
  { name: "Понедельник", data: 1 },
  { name: "Вторник", data: 2 },
  { name: "Среда", data: 3 },
  { name: "Четверг", data: 4 },
  { name: "Пятница", data: 5 },
  { name: "Суббота", data: 6 },
];

const regex = /^(\d{2}:\d{2})-(\d{2}:\d{2})\s+(.+?)\s+\((Л|Лаб|Пр)\),\s*(.+?),\s*Ауд\.\s*([\d\-]+[а-яА-Я]?\s?[МК]?)$/;

const buttonNameWeekDay = ["Числитель", "Знаменатель"];

// DOM-элементы
const shower = document.getElementById("listInfo");
const selecterName = document.getElementById("selecterName");
const overlay = document.getElementById("overlay");
const selecterDay = document.getElementById("selecterDay");
const addToHomeScreen = document.getElementById("addToHomeScreen");
const topBar = document.getElementById('today_naming')
var lastselectday = 1;  // последняя выбранная дата

function cleanMainScreen() {
  shower.textContent = "";
}

function topBarSetText(text) {
  topBar.innerHTML = text;
}

const schedulejson = {
  "ИБТС-211": {
    Вторник: {
      Числитель:
        "12:00-13:30 Теория электросвязи (Л), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>13:40-15:10 Теория электросвязи (Пр), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>15:20-16:50 Теория телетрафика (Л), старший преподаватель Тюхтяев Д.А., Ауд. 3-26 К<br>17:00-18:30 ",
      Знаменатель:
        "12:00-13:30 Теория электросвязи (Л), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>13:40-15:10 Теория электросвязи (Пр), старший преподаватель Ермакова Н.Н., Ауд. 2-17 М<br>15:20-16:50 Теория телетрафика (Л), старший преподаватель Тюхтяев Д.А., Ауд. 3-26 К<br>17:00-18:30 Методы и средства криптографической защиты информации (Пр), старший преподаватель Бушнева М.А., Ауд. 2-24б К",
    },
    Среда:
      "08:30-10:00 Теория информации и кодирования (Л), доцент Задорожнева Ю.В., Ауд. 2-17 М<br>10:10-11:40 Теория информации и кодирования (Лаб), доцент Задорожнева Ю.В., Ауд. 2-17 М<br>12:00-13:30 Экономическая оценка инвестиций и инноваций в телекоммуникациях (Л), доцент Арепьева Е.Е., Ауд. 2-17 М<br>13:40-15:10 Экономическая оценка инвестиций и инноваций в телекоммуникациях (Пр), доцент Арепьева Е.Е., Ауд. 2-17 М",
    Четверг: {
      Числитель:
        "10:10-11:40 Теория телетрафика (Пр), старший преподаватель Тюхтяев Д.А., Ауд. 2-17 М<br>12:00-13:30 Теория телетрафика (Лаб), старший преподаватель Тюхтяев Д.А., Ауд. 2-13а М<br>13:40-15:10 Теория информации и кодирования (Пр), доцент Задорожнева Ю.В., Ауд. 1-19 М",
      Знаменатель:
        "10:10-11:40 Теория телетрафика (Пр), старший преподаватель Тюхтяев Д.А., Ауд. 2-17 М<br>12:00-13:30 Теория телетрафика (Лаб), старший преподаватель Тюхтяев Д.А., Ауд. 2-13а М<br>13:40-15:10 Факультатив: Основы робототехники (Лаб),  старший преподаватель Безбожнов О.Н., Ауд. 2-13а М",
    },
    Пятница: {
      Числитель:
        "12:00-13:30 <br>13:40-15:10 Методы и средства криптографической защиты информации (Л), старший преподаватель Бушнева М.А., Ауд. 2-24б К<br>15:20-16:50 Методы и средства криптографической защиты информации (Лаб), старший преподаватель Бушнева М.А., Ауд. 2-24б К<br>17:00-18:30 Производственная практика, научно-исследовательская работа (Пр), доцент Сафонова О.Е., Ауд. 2-01 К",
      Знаменатель:
        "12:00-13:30 Теория электросвязи (Лаб), старший преподаватель Ермакова Н.Н., Ауд. 2-06 М<br>13:40-15:10 Методы и средства криптографической защиты информации (Л), старший преподаватель Бушнева М.А., Ауд. 2-24б К<br>15:20-16:50 Методы и средства криптографической защиты информации (Лаб), старший преподаватель Бушнева М.А., Ауд. 2-24б К<br>17:00-18:30 Производственная практика, научно-исследовательская работа (Пр), доцент Сафонова О.Е., Ауд. 2-01 К",
    }
  },
  "РСК-211": {
    Вторник:
      "12:00-13:30 Сети и системы радиосвязи (Лаб), старший преподаватель Тюхтяев Д.А., Ауд. 3-15а К<br>13:40-15:10 Системы коммутаций (Лаб), доцент Сафонова О.Е., Ауд. 3-15б К<br>15:20-16:50 Теория телетрафика (Л), старший преподаватель Тюхтяев Д.А., Ауд. 3-26 К",
    Среда: {
      Числитель:
        "13:40-15:10 <br>15:20-16:50 Устройства генерирования и формирования сигналов (Л), старший преподаватель Пономарев И.Н., Ауд. 2-01 К<br>17:00-18:30 Устройства приема и преобразования сигналов (Л), старший преподаватель Пономарев И.Н., Ауд. 2-30 К",
      Знаменатель:
        "13:40-15:10 Устройства генерирования и формирования сигналов (Лаб), старший преподаватель Пономарев И.Н., Ауд. 3-15 К<br>15:20-16:50 Устройства генерирования и формирования сигналов (Л), старший преподаватель Пономарев И.Н., Ауд. 2-01 К<br>17:00-18:30 Устройства приема и преобразования сигналов (Л), старший преподаватель Пономарев И.Н., Ауд. 2-30 К",
    },
    Четверг: {
      Числитель:
        "12:00-13:30 Основы теории нечеткого управления в радиосистемах (Пр),  старший преподаватель Безбожнов О.Н., Ауд. 2-13 М<br>13:40-15:10 Факультатив: Основы робототехники (Лаб),  старший преподаватель Безбожнов О.Н., Ауд. 2-13а М<br>15:20-16:50 Сети и системы радиосвязи (Л), старший преподаватель Пономарев И.Н., Ауд. 2-30 К<br>17:00-18:30 Устройства приема и преобразования сигналов (Лаб), старший преподаватель Пономарев И.Н., Ауд. 3-15 К",
      Знаменатель:
        "12:00-13:30 Основы теории нечеткого управления в радиосистемах (Пр),  старший преподаватель Безбожнов О.Н., Ауд. 2-13 М<br>13:40-15:10 Системы коммутаций (Л), доцент Семенов Е.С., Ауд. 2-30 К<br>15:20-16:50 Сети и системы радиосвязи (Л), старший преподаватель Пономарев И.Н., Ауд. 2-30 К<br>17:00-18:30 Устройства приема и преобразования сигналов (Лаб), старший преподаватель Пономарев И.Н., Ауд. 3-15 К",
    },
    Пятница: {
      Числитель:
        "15:20-16:50 Теория телетрафика (Лаб), старший преподаватель Тюхтяев Д.А., Ауд. 2-13а М<br>17:00-18:30 Теория телетрафика (Лаб), старший преподаватель Тюхтяев Д.А., Ауд. 2-13а М",
      Знаменатель:
        "15:20-16:50 Производственная практика, научно-исследовательская работа (Пр), доцент Арепьева Е.Е., Ауд. 2-13а М<br>17:00-18:30 Производственная практика, научно-исследовательская работа (Пр), доцент Арепьева Е.Е., Ауд. 2-13а М",
    }
  },
};
