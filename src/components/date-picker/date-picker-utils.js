const UNIT = { DAY: 'D', MONTH: 'M', YEAR: 'Y'};
const months = [
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

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];


// Get the current date in yyyymmdd format
const getCurrDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

// Get the current year
const getCurrYear = () => {
    return new Date().getFullYear();
};

// Get the current month (0~11)
const getCurrMonth = () => {
    return new Date().getMonth();
};

// Get the day of the week index (0~6, Sunday~Saturday)
const getWeekDayIndex = (date) => {
    const [year, month, day] = date.split("-").map((val) => parseInt(val, 10));
    const d = new Date(year, month - 1, day);
    return d.getDay(); // 0~6
};

// Get the number of days in a month (28~31)
const getDaysOfMonth = (date) => {
    const [year, month] = date.split("-").map((v) => parseInt(v, 10));
    return new Date(year, month, 0).getDate();
};

// console.log("getCurrDate ", getCurrDate());
// console.log("getCurrYear ", getCurrYear());
// console.log("getCurrMonth ", getCurrMonth());
// console.log("getWeekDayIndex ", getWeekDayIndex("2020-11-11"));
// console.log("getDaysOfMonth ", getDaysOfMonth("2020-11-11"));


export default {
    UNIT,
    months,
    weekDays,
    getCurrDate,
    getCurrYear,
    getCurrMonth,
    getWeekDayIndex,
    getDaysOfMonth
};