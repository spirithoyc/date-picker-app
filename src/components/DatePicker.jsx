import React, { useState, useEffect } from 'react';
import './date-picker/date-picker.css';
import dateUtils from './date-picker/date-picker-utils';

const DatePicker = ({ date }) => {
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
    console.log(TAG, renderedDate.month, initialDate);

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
    }, [date]);


  
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
        const days = dateUtils.genDaysArray(renderedDate.year, renderedDate.month, isSelected?selectedDate:"");
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
                    <div key = {`${day.type}_${day.val}`} className={`day ${day.type}`}>
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
                        <div key = { `month_${idx}`} className={`month ${month.type}`}>
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
                        <div key = { `year_${idx}`} className={`year ${year.type}`}>
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
        <input type="text" placeholder={selectedDate} />
        {renderCalendar()}
      </div>
    );
  };
  
  export default DatePicker;