import React, { useState, useEffect } from 'react';
import './style/app.css';
import DatePicker from './components/DatePicker';
import dateUtils from './components/date-picker/date-picker-utils';

const App = () => {
    const initialDate = dateUtils.getCurrDate(); // yyyy-mm-dd
    const [dateBegin, setDateBegin] = useState(initialDate);
    const [dateEnd, setDateEnd] = useState(initialDate);
    const [isAlertVisible, setIsAlertVisible] = useState(false);    
    const [isStartCalVisible, setIsStartCalVisible] = useState(false);
    const [isEndCalVisible, setIsEndCalVisible] = useState(false);

    console.log(`isStartCalVisible ${isStartCalVisible} isEndCalVisible ${isEndCalVisible}`)
    useEffect(() => {
        if (dateBegin && dateEnd) {
            isValidDateRange(dateBegin, dateEnd);
        }
    }, [dateBegin, dateEnd, isStartCalVisible, isEndCalVisible]);


    const isValidDateRange = (dateBegin, dateEnd) => {
        let d1 = new Date(dateBegin);
        let d2 = new Date(dateEnd);
        //console.log(dateBegin, dateEnd);
        if (d2 < d1) {
            console.log('show alert');
            setIsAlertVisible(true);
        } else {
            setIsAlertVisible(false);
        }
    }

    return (
        <div className = "main-container">
            <h2>Date Picker</h2>
            <div className = "date-container">
                <div onClick={()=>{
                    setIsStartCalVisible(true);
                    setIsEndCalVisible(false);
                }}>
                    <span className = "date start">Begin date</span>
                    <DatePicker date = {dateBegin} showCalendar={isStartCalVisible} onDateChange = {(date)=>{
                        setDateBegin(date);
                    }}/>
                </div>
                <div onClick={()=>{
                    setIsStartCalVisible(false);
                    setIsEndCalVisible(true);
                }}>
                    <span className = "date end">End date</span>
                    <DatePicker date = {dateEnd} showCalendar={isEndCalVisible} onDateChange = {(date)=>{
                        setDateEnd(date);
                    }}/>
                    {isAlertVisible && <span className = "alert">End date shouldn't be earlier than Begin date</span>}
                </div>
            </div>
        </div>
    );
}
export default App;
