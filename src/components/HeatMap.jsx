import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap'; // Importa o componente de mapa de calor
import { Tooltip as ReactTooltip } from 'react-tooltip'; // Importa o componente de tooltip
import 'react-calendar-heatmap/dist/styles.css'; // Importa os estilos do mapa de calor

const today = new Date(); // Obtém a data atual

const HeatMap = () => {
  // Gera valores aleatórios para preencher o mapa de calor
  const randomValues = getRange(65).map(index => {
    return {
      date: shiftDate(today, -index), // Gera datas retroativas
      count: getRandomInt(1, 4), // Gera contagens aleatórias entre 1 e 4
    };
  });

  const startDate = shiftDate(today, -65); // Define a data inicial (65 dias atrás)
  const endDate = today; // Define a data final como hoje

  return (
    <div className='heatmap-content'>
        <p>01/11/2024 - 05/01/2025</p> {/* Exibe o intervalo de datas */}
      <div className="calendar-container">
        <div className="weekday-labels">
          {/* Rótulos dos dias da semana */}
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
  <div key={index} className="weekday-label">{day}</div>
))}


        </div>
        <CalendarHeatmap
          startDate={startDate} // Data inicial do mapa de calor
          endDate={endDate} // Data final do mapa de calor
          values={randomValues} // Valores aleatórios gerados
          classForValue={value => {
            if (!value) {
              return 'color-empty'; // Classe para células sem dados
            }
            return `color-scale-${value.count}`; // Classe baseada na contagem
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.date) {
              return { 'data-tooltip-id': 'tooltip', 'data-tooltip-content': 'No data available' }; // Tooltip para células sem dados
            }
            return {
              'data-tooltip-id': 'tooltip',
              'data-tooltip-content': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`, // Tooltip com data e contagem
            };
          }}
          showWeekdayLabels={false} // Oculta rótulos dos dias da semana no calendário
          showMonthLabels={false} // Oculta rótulos dos meses no calendário
        />
        <ReactTooltip id="tooltip" /> {/* Componente de tooltip */}
      </div>
    </div>
  );
}

// Função para ajustar uma data em um número específico de dias
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

// Função para gerar um array de números sequenciais
function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

// Função para gerar um número inteiro aleatório entre min e max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default HeatMap; // Exporta o componente HeatMap