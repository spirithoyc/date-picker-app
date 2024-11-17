import React from 'react';
import './style/app.css';
import DatePicker from './components/DatePicker';

const App = () => {
    return (
        <div>
            <h2>Date Picker</h2>
            <DatePicker date = "2024-11-18"/>
        </div>
    );
}
export default App;
