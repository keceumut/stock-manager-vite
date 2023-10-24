import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };


  const renderDays = () => {
    const days = [];
    const firstDay = startOfMonth(currentMonth).getDay();
    const lastDay = endOfMonth(currentMonth).getDate();
  
    for (let i = 1; i <= lastDay; i++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();
  
      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'bg-contrast text-white hover:bg-contrast/80' : 'hover:bg-contrast/20'} 
          text-center p-0.5 rounded-full transition-colors cursor-pointer `}
          onClick={() => selectDate(i)}
        >
          {i}
        </div>
      );
    }
  
    for (let i = 0; i < firstDay; i++) {
      days.unshift(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
  
    return days;
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const selectDate = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  return (
    <div className="relative ">
       {selectedDate && (
        <p className="mt-4 text-gray-800">
          Selected Date: {selectedDate.toLocaleDateString()}
        </p>
      )} 
      <button
        onClick={toggleCalendar}
        className="button"
      >
        Pick a Date
      </button>
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="calendar border-2 border-primary-200 bg-primary rounded-md shadow-lg p-4 absolute mt-2 z-10 w-80"
          >
            <div className="calendar-header flex items-center justify-between mb-4">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={prevMonth}
              >
                &lt;
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {currentMonth.toLocaleString('en-us', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={nextMonth}
              >
                &gt;
              </button>
            </div>
            <div className="calendar-grid grid grid-cols-7 gap-2">
              <div className="day-header text-gray-600">Sun</div>
              <div className="day-header text-gray-600">Mon</div>
              <div className="day-header text-gray-600">Tue</div>
              <div className="day-header text-gray-600">Wed</div>
              <div className="day-header text-gray-600">Thu</div>
              <div className="day-header text-gray-600">Fri</div>
              <div className="day-header text-gray-600">Sat</div>
              {renderDays()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
