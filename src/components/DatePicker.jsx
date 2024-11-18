import React, { useState, useEffect } from 'react';
import './date-picker/date-picker.css';
import dateUtils from './date-picker/date-picker-utils';
import calendarIcon from '../resources/images/ico_calendar.png';
const DatePicker = ({ date, showCalendar, onDateChange }) => {
    const TAG = 'DatePicker';
    const initialDate = date || dateUtils.getCurrDate(); // yyyy-mm-dd
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [isSelected, setIsSelected] = useState(true);
    const [renderedDate, setRenderedDate] = useState({
        year: dateUtils.getYear(initialDate),
        month: dateUtils.getMonth(initialDate),
        day: 1,
    });
    const [renderMode, setRenderMode] = useState(dateUtils.UNIT.DAY);
    const [isCalendarVisible, setIsCalendarVisible] = useState(showCalendar);

    console.log(TAG, `Render date ${selectedDate} showCalendar ${showCalendar}`);

    useEffect(() => {
        if (date) {
            setSelectedDate(date);
            setIsSelected(true);
            setRenderedDate({
                year: dateUtils.getYear(date),
                month: dateUtils.getMonth(date),
                day: 1,
            });
            setRenderMode(dateUtils.UNIT.DAY);
        }
    }, [date, showCalendar]);


  
    const renderCalendar = () => {
        switch (renderMode) {
            case dateUtils.UNIT.MONTH:
                return <CalendarMonth/>;
            case dateUtils.UNIT.YEAR:
                return <CalendarYear/>;
            case dateUtils.UNIT.DAY:
            default:
                return <CalendarDay/>;
        } 
    };

    const CalendarDay = () => {
        const {year, month} = renderedDate;
        const days = dateUtils.genDaysArray(year, month, isSelected?selectedDate:"");
        const weekDays = dateUtils.WEEKDAYS;
        return (
            <div className = "calendar">
                <CalendarControlBar unit = {dateUtils.UNIT.DAY}/>
                <div className = "calendar-header-row">
                    {weekDays.map((weekDay, idx) => (
                        <div key = {`weekday${weekDay}`}>
                            {weekDay}
                        </div>
                    ))}
                </div>
                <div className = "calendar-container day">
                    {days.map((day) => (
                    <div key = {`${day.type}_${day.val}`} 
                         className={`day ${day.type}`} 
                         onClick={() => {
                            let selected;
                            if (day.type == 'next') {
                                selected = dateUtils.parseDateFormat(year, month+1, day.val);
                            } else if (day.type == 'prev') {
                                selected = dateUtils.parseDateFormat(year, month-1, day.val);
                            } else {
                                selected = dateUtils.parseDateFormat(year, month, day.val);
                            }
                             
                            console.log(TAG, `Selected ${selected}`);
                            onDateChange(selected);
                            setIsCalendarVisible(false);
                        }}>
                        {day.val}
                    </div>
                    ))}
                </div>
            </div>
        );
    }

    const CalendarMonth = () => {
        const months = dateUtils.genMonthsArray(renderedDate.year, renderedDate.month, selectedDate)
        console.log(TAG, months);
        return (
            <div className = "calendar">
                <CalendarControlBar unit = {dateUtils.UNIT.MONTH}/>
                <div className = "calendar-container month">
                    {months.map((month, idx) => (
                        <div key = { `month_${idx}`} className={`month ${month.type}`} onClick = {
                            () => {
                                console.log(TAG, `Selected month ${idx+1}`)
                                setRenderMode(dateUtils.UNIT.DAY);
                                setRenderedDate({...renderedDate, month: idx+1});
                            }}>
                            {month.val}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const CalendarYear = () => {
        const years = dateUtils.genYearsArray(renderedDate.year, selectedDate)
        console.log(TAG, years);
        return (
            <div className = "calendar">
                <CalendarControlBar unit = {dateUtils.UNIT.YEAR}/>
                <div className = "calendar-container year">
                    {years.map((year, idx) => (
                        <div key = { `year_${idx}`} className={`year ${year.type}`} onClick = {
                            () => {
                                console.log(TAG, `Selected month ${idx+1}`)
                                setRenderMode(dateUtils.UNIT.MONTH);
                                setRenderedDate({...renderedDate, year: year.val});
                            }}>
                            {year.val}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const CalendarControlBar = ({unit}) => {
        let title, cb, prev, next;
        if (unit == dateUtils.UNIT.DAY) {
            title = dateUtils.getTitleOfDateCalendar(renderedDate.year, renderedDate.month);
            cb = () => {
                setRenderMode(dateUtils.UNIT.MONTH);
                console.log("render month")
            }
            prev = () => {
                let {month, year} = renderedDate;
                if (month == 1) {
                    year--;
                    month = 12;
                } else {
                    month--;
                }
                setRenderedDate({...renderedDate, month, year});
            }
            next = () => {
                let {month, year} = renderedDate;
                if (month == 12) {
                    year++;
                    month = 1;
                } else {
                    month++;
                }
                setRenderedDate({...renderedDate, month, year});
            }
        } else if (renderMode == dateUtils.UNIT.MONTH) {
            title = renderedDate.year;
            cb = () => {
                setRenderMode(dateUtils.UNIT.YEAR);
                console.log("render year")
            }
            prev = () => {
                setRenderedDate({...renderedDate, year: renderedDate.year - 1});
            }
            next = () => {
                setRenderedDate({...renderedDate, year: renderedDate.year + 1});
            }
        } else if (renderMode == dateUtils.UNIT.YEAR) {
            title = `${renderedDate.year-renderedDate.year%10}-${renderedDate.year-renderedDate.year%10+9}`;
            cb = () => {
                console.log("do nothing")
            }
            prev = () => {
                setRenderedDate({...renderedDate, year: renderedDate.year - 10});
            }
            next = () => {
                setRenderedDate({...renderedDate, year: renderedDate.year + 10});
            }
        }

        return (
        <div className = "calendar-control-bar">
            <div className="prev" onClick={prev}> {"<"} </div>
            <div className = "title" onClick={cb}> {title} </div>
            <div className="next" onClick={next}> {">"} </div>
        </div>
        );
    }

    return (
      <div className = "date-picker">
        <div className = "input-container"
            onClick={()=>{
                setIsCalendarVisible(true);
            }}>
            <img className = "icon" src = {calendarIcon} />
            <input type="text" placeholder={initialDate} maxLength={10} value={selectedDate}       
                onChange={(e)=>{
                    const regexYearMonth = /^\d{4}-(\d{1,2})$/; 
                    let inputValue = e.target.value;
                    inputValue = inputValue.replace(/[^0-9-]/g, "");
                    setSelectedDate(inputValue);

                    // if full format pass
                    if (dateUtils.isValidDate(inputValue)) {
                        setRenderedDate(dateUtils.getYearMonthDay(inputValue));
                        setIsCalendarVisible(false);
                    }
                    console.log(TAG, `Input ${inputValue}`);
                }}/>
        </div>
        {isCalendarVisible && showCalendar && renderCalendar()}
      </div>
    );
  };
  
  export default DatePicker;