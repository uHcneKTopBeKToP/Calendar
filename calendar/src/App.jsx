import { useState } from 'react';
import React from 'react';
import { useTheme } from './ThemeContext';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { theme, toggleTheme } = useTheme();

  const getMonthName = (date) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getYear = (date) => { return date.getFullYear(); };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 7 : firstDay.getDay();
  };

  const getNumberOfDaysInMonth = (date) => { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); };

  const generateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const numberOfDays = getNumberOfDaysInMonth(currentDate);

    let days = [];
    let prevMonthDays = 0;

    if (firstDay !== 1) {
      prevMonthDays = getNumberOfDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
      for (let i = prevMonthDays - firstDay + 2; i <= prevMonthDays; i++) {
        days.push({ day: i, currentMonth: false });
      }
    }

    for (let i = 1; i <= numberOfDays; i++) {
      days.push({ day: i, currentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false });
    }
    return days;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const calendarDays = generateCalendar();

  return (
    <div className={`app ${theme}`}>
      <div className='calendar'>
        <header>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          <h2>{getMonthName(currentDate)} {getYear(currentDate)}</h2>
          <button onClick={() => handleMonthChange('previous')}>{"<"}</button>
          <button onClick={goToToday}>Today</button>
          <button onClick={() => handleMonthChange('next')}>{">"}</button>
        </header>
        <div className="calendar-weekdays">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={index} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.currentMonth ? '' : 'other-month'} ${day.day === currentDate.getDate() ? 'today' : ''}`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
