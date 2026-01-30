import { useState } from 'react';
import type { MiniCalendarProps } from '@/types/dateinput.types';

export function MiniCalendar({ selected, onSelect, disabled }: Readonly<MiniCalendarProps>) {
  const [currentMonth, setCurrentMonth] = useState(() => selected ?? new Date());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); };
  const nextMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); };

  const isSelected = (day: number) => selected ?  selected.getDate() === day && selected.getMonth() === currentMonth.getMonth() && selected.getFullYear() === currentMonth.getFullYear() : false;
  const isToday = (day: number) => { const today = new Date(); return today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear(); };
  const isTodayStyle = (day: number) => isToday(day) ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 font-semibold' : 'text-slate-700 hover:bg-slate-100 hover:scale-105';
  const handleDayClick =async  (day: number) => {
    if (disabled) return;
    await onSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${String(i)}`} className="h-8" />);
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <button key={day} type="button" onClick={() => {handleDayClick(day).catch((err : unknown ) => {console.error("Error handling day click:", err);})}} disabled={disabled} className={`h-8 rounded font-medium text-xs transition-all duration-150 ${isSelected(day) ? 'bg-blue-500 text-white shadow-lg scale-105 font-bold' : isTodayStyle(day)} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
        {day}
      </button>
    );
  }

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
        <button type="button" onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded transition-colors">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-slate-800">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button type="button" onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded transition-colors">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-slate-500">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
}
