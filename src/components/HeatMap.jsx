import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import backendApi from "../services/backendApi";
import { useAuth } from "../context/AuthContext";

const today = new Date();

const HeatMap = ({ id }) => {
  const { token } = useAuth();
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchHeatMap = async () => {
      try {
        const response = await backendApi.get(`/atividade/${id}?dias=60`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const fetchedData = response.data.data.map(item => ({
          date: new Date(item.data),
          count: item.quantidade,
        }));

        setHeatmapData(fetchedData);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };

    fetchHeatMap();
  }, [id, token]);

  const startDate = shiftDate(today, -60);
  const endDate = today;

  return (
    <div className='heatmap-content'>
      <p>{startDate.toDateString()} - {endDate.toDateString()}</p>
      <div className="calendar-container">
        <div className="weekday-labels">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
            <div key={index} className="weekday-label">{day}</div>
          ))}
        </div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapData}
          classForValue={value => {
            if (!value || value.count === 0) return 'color-empty';
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.date) {
              return { 'data-tooltip-id': 'tooltip', 'data-tooltip-content': 'Sem dados' };
            }
            return {
              'data-tooltip-id': 'tooltip',
              'data-tooltip-content': `${value.date.toISOString().slice(0, 10)}: ${value.count} atividade(s)`,
            };
          }}
          showWeekdayLabels={false}
          showMonthLabels={false}
        />
        <ReactTooltip id="tooltip" />
      </div>
    </div>
  );
};

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export default HeatMap;