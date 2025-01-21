import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();

const HeatMap = () => {
  const randomValues = getRange(65).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 4),
    };
  });

  const startDate = shiftDate(today, -65);
  const endDate = today;

  return (
    <div className='heatmap-content'>
        <p>01/11/2024 - 05/01/2025</p>
      <div className="calendar-container">
        <div className="weekday-labels">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
            <div key={day} className="weekday-label">{day}</div>
          ))}
        </div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={randomValues}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.date) {
              return { 'data-tooltip-id': 'tooltip', 'data-tooltip-content': 'No data available' };
            }
            return {
              'data-tooltip-id': 'tooltip',
              'data-tooltip-content': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
            };
          }}
          
          showWeekdayLabels={false} 
          showMonthLabels={false}
        />
        <ReactTooltip id="tooltip" />

      </div>
    </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default HeatMap;
