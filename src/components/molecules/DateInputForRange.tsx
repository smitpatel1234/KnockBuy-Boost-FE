import React from 'react'
import type { DateInputPropsForDatePicker as DateInputProps  } from '@/types/dateinput.types'
import { useDateRangePicker } from '@/hooks/useDateHook'


const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
   
 const  {
        handleInputChange,
        handleKeyDown,
        handleBlur,
        date, 
        monthRef,
        dayRef,
        yearRef
    } = useDateRangePicker({value, onChange})
  return (
    <div className="flex border rounded-lg items-center text-sm px-1">
      <input
        type="text"
        ref={monthRef}
        max={12}
        maxLength={2}
        value={date.month.toString()}
        onChange={handleInputChange('month')}
        onKeyDown={handleKeyDown('month')}
        onFocus={(e) => {
          if (globalThis.window.innerWidth > 1024) {
            e.target.select()
          }
        }}
        onBlur={handleBlur('month')}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="M"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={dayRef}
        max={31}
        maxLength={2}
        value={date.day.toString()}
        onChange={handleInputChange('day')}
        onKeyDown={handleKeyDown('day')}
        onFocus={(e) => {
          if (globalThis.window.innerWidth > 1024) {
            e.target.select()
          }
        }}
        onBlur={handleBlur('day')}
        className="p-0 outline-none w-7 border-none text-center"
        placeholder="D"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={yearRef}
        max={9999}
        maxLength={4}
        value={date.year.toString()}
        onChange={handleInputChange('year')}
        onKeyDown={handleKeyDown('year')}
        onFocus={(e) => {
          if (globalThis.window.innerWidth > 1024) {
            e.target.select()
          }
        }}
        onBlur={handleBlur('year')}
        className="p-0 outline-none w-12 border-none text-center"
        placeholder="YYYY"
      />
    </div>
  )
}

DateInput.displayName = 'DateInput'

export { DateInput }