import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import type { DateInputProps } from '@/types/dateinput.types';
import { MiniCalendar } from './MiniCalendar';

// Demo wrapper to show the component working
export default function DateInputComponent({ placeholder, value, onChange ,className}:
    {readonly placeholder?: string,readonly value?: string,readonly onChange?: (date: string) => Promise<void> | void ,readonly className:string}) {
  // Use internal state if value/onChange not provided (controlled vs uncontrolled behavior could be better, but this matches the wrapper pattern)
  const [internalDate, setInternalDate] = useState('');

  const effectiveValue = value ?? internalDate;
  const effectiveOnChange = onChange ?? setInternalDate;

  return (
    <DateInput
      className={className}
      placeholder={placeholder}
      value={effectiveValue}
      onChange={effectiveOnChange}
    />
  );
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  ({ placeholder = 'Pick a date', value, onChange, disabled = false, className = '' },
    ref) => {
    const [open, setOpen] = useState(false);

    const selectedDate = React.useMemo(() => {
      if (!value) return undefined;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? undefined : date;
    }, [value]);

    const displayDate = React.useMemo(() => {
      if (!selectedDate) return null;
      return selectedDate.toLocaleDateString('en-US', { month: 'short' , day: 'numeric' , year: 'numeric'});}, [selectedDate]);

    const handleDateSelect = async (date: Date | undefined) => {
      if (date && onChange) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
       
        const dateString = `${String(year)}-${month}-${day}`;
        await  onChange(dateString);
      }
      setOpen(false);
    };

    return (
      <div ref={ref} className={`flex flex-col gap-2 w-full ${className}`}>


        <div className="relative">
          <button
            type="button"
            onClick={() => { if (!disabled) setOpen(!open); }}
            disabled={disabled}
            className={`
              w-full h-10 px-4 flex items-center justify-start gap-2
              bg-white border rounded-lg
              transition-all duration-200
              ${disabled
                ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60' : open ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-slate-300 hover:border-slate-400'
              }
              ${!value && !disabled ? 'text-slate-400' : 'text-slate-700'}
              font-normal text-sm
            `}
          >
            <Calendar className={`h-4 w-4 ${open ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="flex-1 text-left text-gray-500 font-medium">{displayDate ?? placeholder}</span>
          </button>

          {open && !disabled && (
            <>
              <div className="fixed inset-0 z-50" onClick={() => { setOpen(false); }} />
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