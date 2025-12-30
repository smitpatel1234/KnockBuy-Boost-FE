import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
// Demo wrapper to show the component working
export default function DateInputComponent({ placeholder, value, onChange }: { placeholder?: string, value?: string, onChange?: (date: string) => void }) {
  // Use internal state if value/onChange not provided (controlled vs uncontrolled behavior could be better, but this matches the wrapper pattern)
  const [internalDate, setInternalDate] = useState('');

  const effectiveValue = value !== undefined ? value : internalDate;
  const effectiveOnChange = onChange || setInternalDate;

  return (
    <DateInput
      placeholder={placeholder}
      value={effectiveValue}
      onChange={effectiveOnChange}
    />
  );
}

// The actual DateInput component
interface DateInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (date: string) => void;
  disabled?: boolean;
  className?: string;
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  (
    { label, placeholder = 'Pick a date', value, onChange, disabled = false, className = '' },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const selectedDate = React.useMemo(() => {
      if (!value) return undefined;
      const date = new Date(value + 'T00:00:00');
      return isNaN(date.getTime()) ? undefined : date;
    }, [value]);

    const displayDate = React.useMemo(() => {
      if (!selectedDate) return null;
      return selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }, [selectedDate]);

    const handleDateSelect = (date: Date | undefined) => {
      if (date && onChange) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        onChange(dateString);
      }
      setOpen(false);
    };

    return (
      <div ref={ref} className={`flex flex-col gap-2 w-full ${className}`}>


        <div className="relative">
          <button
            type="button"
            onClick={() => !disabled && setOpen(!open)}
            disabled={disabled}
            className={`
              w-full h-10 px-4 flex items-center justify-start gap-2
              bg-white border rounded-lg
              transition-all duration-200
              ${disabled
                ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60'
                : open
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-slate-300 hover:border-slate-400'
              }
              ${!value && !disabled ? 'text-slate-400' : 'text-slate-700'}
              font-normal text-sm
            `}
          >
            <Calendar className={`h-4 w-4 ${open ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="flex-1 text-left">{displayDate || placeholder}</span>
          </button>

          {open && !disabled && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
              <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-lg shadow-md border border-slate-200 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <MiniCalendar
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={disabled}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

// Simple calendar component
interface MiniCalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabled?: boolean;
}

function MiniCalendar({ selected, onSelect, disabled }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => selected || new Date());

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear();
  };

  const handleDayClick = (day: number) => {
    if (disabled) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(date);
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <button
        key={day}
        type="button"
        onClick={() => handleDayClick(day)}
        disabled={disabled}
        className={`
          h-8 rounded font-medium text-xs
          transition-all duration-150
          ${isSelected(day)
            ? 'bg-blue-500 text-white shadow-lg scale-105 font-bold'
            : isToday(day)
              ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 font-semibold'
              : 'text-slate-700 hover:bg-slate-100 hover:scale-105'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-slate-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-slate-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}