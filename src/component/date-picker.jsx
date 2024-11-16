import React from 'react';
import $ from 'jquery';
import './date-picker.css';

const DatePicker = () => {
    return <div id ="divCalendar"/>
}


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

const calendar = {
    'year': 2024,
    'month': 1,
    'start': 0,
    'days': 28,
    'selected': 10,
}

const renderCalendar = (data, unit) => {
    //reset calendar
    $("#divCalendar").html("");

    if (unit === UNIT.MONTH) {
        renderCalendarMonth(data);
    } else if (unit === UNIT.YEAR) {
        renderCalendarYear(data);
    } else {
        renderCalendarDay(data);
    }

};

const renderCalendarDay = (data) => {
    //build calendar title
    const controlBar = genControlBar(data, `${months[data.month].abbr} ${data.year}`, ()=>{renderCalendar(data, UNIT.MONTH);});
    $("#divCalendar").append(controlBar);

    //build calendar header row
    const headerRow = $('<div></div>')
    .addClass('canlendar-row');
    for (let i=0; i<weekDays.length; i++) {
        const newColumn = $('<div></div>')
        .attr('id', `divCalendarColumn-${i}-${j}`)
        .addClass('calendar-column')
        .addClass('header')
        .text(weekDays[i].toUpperCase());
        // if (i==0) {
        //     newColumn.css({"background-color": 'red'});
        // } else if (i==6) {
        //     newColumn.css({"background-color": 'green'});
        // }
        headerRow.append(newColumn);
    }
    $("#divCalendar").append(headerRow);

    //build calendar content
    for (let j=0; j<5; j++) {
        let weekRow = $('<div></div>')
        .addClass('canlendar-row');
        for (let i=0; i<weekDays.length; i++) {
            const monthDay = j*weekDays.length+i;
            const date = monthDay-data.start+1;
            const newColumn = $('<div></div>')
            .attr('id', `divCalendarColumn-${i}`)
            .addClass('calendar-column')
            .addClass('date');
            if (monthDay < data.start || monthDay > data.start+data.days-1) {
                newColumn.css({"visibility": "hidden"});
            } else {
                newColumn.text(date);
            }
            // if (i==0) {
            //     newColumn.css({"background-color": '#995555'});
            // } else if (i==6) {
            //     newColumn.css({"background-color": '#559999'});
            // } else {
            //     newColumn.css({"background-color": '#BBBBBB'});
            // }
            if (date == data.selected) {
                newColumn.addClass("selected")
            } else {
                newColumn.click(()=>{
                    console.log(date);
                    $("#divSelectedDate").text(date);
                    renderCalendar({...data, selected:date}, UNIT.DAY);
                });
            }
            weekRow.append(newColumn);
        }
        $("#divCalendar").append(weekRow);
    }
}

const renderCalendarMonth = (data) => {
    //build calendar title
    const controlBar = genControlBar(data, data.year, ()=>{renderCalendar(data, UNIT.YEAR);});
    $("#divCalendar").append(controlBar);
    const divContainer = $('<div></div>')
    .addClass("calendar-container")
    .addClass("month");
    for (let i=0; i<months.length; i++) {
        const divMonth = $('<div></div>').text(months[i].abbr);
        if(data.month == i) {
            divMonth.css({"background-color": "yellow"});
        }
        divMonth.click(()=>{
            renderCalendar({...data, month: i}, UNIT.DAY);
        })
        divContainer.append(divMonth);
    }
    $("#divCalendar").append(divContainer);
}

const renderCalendarYear = (data) => {
    //build calendar title
    const yearFrom = data.year-data.year%10;
    const controlBar = genControlBar(data, 
    `${yearFrom}-${yearFrom+9}`, ()=>{console.log("do nothing")});
    $("#divCalendar").append(controlBar);
    const divContainer = $('<div></div>')
    .addClass("calendar-container")
    .addClass("month");
    for (let i=yearFrom-1; i<yearFrom+11; i++) {
        const divYear = $('<div></div>').text(i);
        if(data.year == i) {
            divYear.css({"background-color": "yellow"});
        }
        divYear.click(()=>{
            renderCalendar({...data, month: -1, year: i}, UNIT.MONTH);
        })
        divContainer.append(divYear);
    }
    $("#divCalendar").append(divContainer);
}

const genControlBar = (data, txtTitle, cb) => {
    const controlBar = $('<div></div>')        
    .addClass('canlendar-row');
    const prev = $('<div>&lt</div>')
    .attr('id', 'divPrev')
    .addClass('calendar-column')
    .addClass('paging');
    const next = $('<div>&gt</div>')
    .attr('id', 'divNext')
    .addClass('calendar-column')
    .addClass('paging');
    const title = $('<div></div>')
    .attr('id', 'divTitle')
    .addClass('calendar-column')
    .addClass('title')
    .text(txtTitle)
    .click(cb);
    controlBar.append(prev);
    controlBar.append(title);
    controlBar.append(next);
    return controlBar;
}

renderCalendar(calendar, UNIT.DAY);



export default DatePicker;