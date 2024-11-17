const UNIT = { DAY: 'D', MONTH: 'M', YEAR: 'Y'};
const CALENDAR_DAYS_NUM = 7 * 6;
const CALENDAR_MONTHS_NUM = 12;
const CALENDAR_YEARS_NUM = 12;
const CALENDAR_MONTHS = [
    { name: "January", abbr: "Jan", index: 0 },
    { name: "February", abbr: "Feb", index: 1 },
    { name: "March", abbr: "Mar", index: 2 },
    { name: "April", abbr: "Apr", index: 3 },
    { name: "May", abbr: "May", index: 4 },
    { name: "June", abbr: "Jun", index: 5 },
    { name: "July", abbr: "Jul", index: 6 },
    { name: "August", abbr: "Aug", index: 7 },
    { name: "September", abbr: "Sep", index: 8 },
    { name: "October", abbr: "Oct", index: 9 },
    { name: "November", abbr: "Nov", index: 10 },
    { name: "December", abbr: "Dec", index: 11 }
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Get the current date in yyyy-mm-dd format
const getCurrDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getYear = (date) => getYearMonthDay(date).year;

const getMonth = (date) => getYearMonthDay(date).month;

const getDay = (date) => getYearMonthDay(date).day;

const genDaysArray = (year, month, selectedDate) => {
    let days = new Array(CALENDAR_DAYS_NUM);

    const firstWeekDay = getWeekDayIndex(year, month, 1);
    const monthDays = getDaysOfMonth(year, month);
    const prevMonthDays = getDaysOfMonth(year, month - 1);

    for (let i = 1; i <= CALENDAR_DAYS_NUM; i++) {
        if (i <= firstWeekDay) {
            days[i] = {val: prevMonthDays - (firstWeekDay - i), type: 'prev'};
        } else if (i > firstWeekDay + monthDays) {
            days[i] = {val: i - (firstWeekDay + monthDays), type: 'next'};
        } else {
            days[i] = {val: i - firstWeekDay, type: 'curr'};
            if (isSameDate(year, month, days[i].val, selectedDate, UNIT.DAY)) {
                days[i].type = 'selected';
            } else if (isToday(year, month, days[i].val)) {
                days[i].type = 'today';
            }
        }
    }
    return days;
}

const genMonthsArray = (year, month, selectedDate) => {
    let months = new Array(CALENDAR_MONTHS_NUM);
    for (let i = 0; i < CALENDAR_MONTHS_NUM; i++) {
        months[i] = {val: CALENDAR_MONTHS[i].abbr, type: ""}
        if (isSameDate(year, i+1, 0, selectedDate, UNIT.MONTH)) {
            months[i].type = 'selected';
        }
    }
    return months;
}

const genYearsArray = (year, selectedDate) => {
    let years = new Array(CALENDAR_YEARS_NUM);
    let startFrom = year - year %10 -1;

    for (let i = 0; i < CALENDAR_YEARS_NUM; i++) {
        const displayYear = i+startFrom;
        if (i == 0) {
            years[i] = {val: displayYear, type: "prev"}
        } else if (i == CALENDAR_YEARS_NUM-1) {
            years[i] = {val: displayYear, type: "next"}
        } else { 
            years[i] = {val: displayYear, type: "curr"}
            if (isSameDate(displayYear, 0, 0, selectedDate, UNIT.YEAR)) {
                years[i].type = 'selected';
            }
        }
    }
    return years;
}


/////////////////////////////////////////////////////////////////////////
// private

const isToday = (year, month, day) => {
    const today = new Date();
    return (
        today.getFullYear() === year &&
        today.getMonth() + 1 === month &&
        today.getDate() === day
    );
};

//targetDate format yyyy-mm-dd, mode: DAY, MONTH, YEAR
const isSameDate = (year, month, day, targetDate, mode) => {
    const TAG = "isSameDate";

    //console.log(`${TAG}: Input -> year: ${year}, month: ${month}, day: ${day}, targetDate: ${targetDate}, mode: ${mode}`);
    if(!isValidDate(targetDate)) {
        return false;
    }
    if (year != getYear(targetDate)) {
        return false;
    }
    if (mode == UNIT.YEAR) {
        return true;
    }
    if (month != getMonth(targetDate)) {
        return false;
    }
    if (mode == UNIT.MONTH) {
        return true;
    }
    if (day!= getDay(targetDate)) {
        return false;
    }
    return true;
}


const getYearMonthDay = (date) => {
    if (!isValidDate(date)) {
        return {year: -1, month: -1, day: -1};
    }
    const [year, month, day] = date.split('-').map((val) => Number(val));
    return {year, month, day};
}

// Check valid date with format yyyy-mm-dd
const isValidDate = (date) => {
    const TAG = "isValidDate";
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    //check format
    if (!dateRegex.test(date)) {
        console.log(TAG, "invalid date", date);
        return false;
    }

    //check real date
    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    
    if (parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day) {
        console.log(TAG, "not real date", date);
        return false;
    }
    return true;
}

// Get the day of the week index (0~6, Sunday~Saturday)
const getWeekDayIndex = (year, month, day) => {
    const d = new Date(year, month - 1, day);
    return d.getDay(); //0~6
};

// Get the number of days in a month (28~31)
const getDaysOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const getTitleOfDateCalendar = (year, month) => {
    if (!isValidDate) {
        return "";
    }
    return `${CALENDAR_MONTHS[month-1].abbr} ${year}`;
}
// console.log(getYear("2023-11-16")); // 2023
// console.log(getMonth("2023-11-16")); // 11
// console.log(getDay("2023-11-16")); // 16

// console.log(getYear("2023-02-30")); // -1 (invalid date)
// console.log(getMonth("2023-02-30")); // -1 (invalid date)
// console.log(getDay("2023-02-30")); // -1 (invalid date)

// console.log(getYearMonthDay("")); // { year: -1, month: -1, day: -1 }
// console.log(getYearMonthDay("abcd-ef-gh")); // { year: -1, month: -1, day: -1 }
// console.log(genDaysArray('2024-11-01'));


export default {
    UNIT,
    WEEKDAYS,
    getCurrDate,
    getYear,
    getMonth,
    getDay,
    genDaysArray,
    genMonthsArray,
    genYearsArray,
    getTitleOfDateCalendar
};