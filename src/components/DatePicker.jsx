import React, { useState, useEffect } from 'react';
import './date-picker/date-picker.css';
import dateUtils from './date-picker/date-picker-utils';

const DatePicker = ({ date }) => {
    const TAG = 'DatePicker';
    const initialDate = date || dateUtils.getCurrDate();
    const [selectedDate, setSelectedDate] = useState(initialDate);
  
    useEffect(() => {
      if (date) {
        setSelectedDate(date);
      }
    }, [date]);
  
    const handleDateClick = (newDate) => {
      setSelectedDate(newDate);
      console.log(TAG, `Selected date: ${newDate}`);
    };
  
    const renderCalendar = (unit = dateUtils.UNIT.DAY) => {
        if (unit === dateUtils.UNIT.MONTH) {
            return <CalendarMonth/>;
        } else if (unit === dateUtils.UNIT.YEAR) {
            return <CalendarYear/>;
        } else {
            return <CalendarDay/>;
        } 
    };

    const CalendarDay = () => {
        const days = new Array(42).fill("x");
        return (
        <div className = "calendar">
            <CalendarControlBar unit = {dateUtils.UNIT.DAY}/>
            <div className = "calendar-container day">
                {days.map((day) => (
                <div className="calendar-day">
                    {day}
                </div>
                ))}
            </div>
        </div>
        );
    }

    const CalendarMonth = () => {
        return <div>Month {selectedDate}</div>;

    }

    const CalendarYear = () => {
        return <div>Year {selectedDate}</div>;
    }

    const CalendarControlBar = ({unit}) => {
        let title, cb, prev, next;
        if (unit == dateUtils.UNIT.DAY) {
            title = `${dateUtils.getCurrYear()} ${dateUtils.months[dateUtils.getCurrMonth()].abbr}`;
            cb = () => {console.log("render month")}
            prev = () => {console.log("render Day, month-1 ")}
            next = () => {console.log("render day, month+1")}
        }

        return (
        <div className = "calendar-control-bar">
            <div className="prev"> {"<"} </div>
            <div className = "title"> {title} </div>
            <div className="next"> {">"} </div>
        </div>
        );
    }

    return (
      <div className = "date-picker">
        <input type="text" placeholder={selectedDate} />
        {renderCalendar(dateUtils.UNIT.DAY)}
      </div>
    );
  };
  
  export default DatePicker;