'use client'
import React, { type FC, type JSX } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { DateInput } from '@/components/molecules/DateInputForRange'
import { Label } from '@/components/atoms/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import type { DateRangePickerProps,DateRange } from '@/types/DateRangePicker.types'
import { PRESETS } from '@/data/datePickerConst'
import { useDateRangePicker } from '@/hooks/useDateRangePicker'
import { formatDate } from '@/utils/helper/DatePickerHelper'
const CompareToggle: FC<{ showCompare: boolean; rangeCompare: DateRange  | undefined; onToggle: (checked: boolean) => void }> = ({ showCompare, rangeCompare, onToggle }) => {
  if (!showCompare) return null
  return (
    <div className="flex items-center space-x-2 pr-4 py-1">
      <Switch defaultChecked={Boolean(rangeCompare)} onCheckedChange={onToggle} id="compare-mode" />
      <Label htmlFor="compare-mode">Compare</Label>
    </div>
  )
}

const DateInputPair: FC<{ fromDate: Date; toDate?: Date; onFromChange: (date: Date) => void; onToChange: (date: Date) => void }> = ({ fromDate, toDate, onFromChange, onToChange }) => (
  <div className="flex gap-2">
    <DateInput value={fromDate} onChange={onFromChange} />
    <div className="py-1">-</div>
    <DateInput value={toDate} onChange={onToChange} />
  </div>
)

const PresetButtons: FC<{ isSmallScreen: boolean; selectedPreset: string | undefined; onSelect: (value: string) => void }> = ({ isSmallScreen, selectedPreset, onSelect }) => {
  const presetJSX = PRESETS.map((preset) => (
    <SelectItem key={preset.name} value={preset.name}>
      {preset.label}
    </SelectItem>
  ))
  
  if (isSmallScreen) {
    return (
      <Select defaultValue={selectedPreset} onValueChange={onSelect}>
        <SelectTrigger className="w-[180px] mx-auto mb-2">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>{presetJSX}</SelectContent>
      </Select>
    )
  }
  return null
}

export const DateRangePicker: FC<DateRangePickerProps> & { filePath: string } = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = 'end',
  locale = 'en-US',
  showCompare = true
}): JSX.Element => {
  const { isOpen, setIsOpen, range, setRange, rangeCompare, setRangeCompare, selectedPreset, isSmallScreen, PresetButton, areRangesEqual, openedRangeRef, openedRangeCompareRef, resetValues  ,setPreset} = useDateRangePicker({ initialDateFrom, initialDateTo, initialCompareFrom, initialCompareTo })
  
  const handleCompareToggle = (checked: boolean) => {
    if (checked) {
      if (!range.to) setRange({ from: range.from, to: range.from })
      setRangeCompare({ from: new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate() - 365), to: range.to ? new Date(range.to.getFullYear() - 1, range.to.getMonth(), range.to.getDate()) : new Date(range.from.getFullYear() - 1, range.from.getMonth(), range.from.getDate()) })
    } else setRangeCompare(undefined)
  }

  const handleRangeFromChange = (date: Date) => {
    const toDate = range.to == null || date > range.to ? date : range.to
    setRange({ ...range, from: date, to: toDate })
  }

  const handleRangeToChange = (date: Date) => {
    const fromDate = date < range.from ? date : range.from
    setRange({ ...range, from: fromDate, to: date })
  }

  const handleCompareFromChange = (date: Date) => {
    if (rangeCompare) {
      const compareToDate = rangeCompare.to == null || date > rangeCompare.to ? date : rangeCompare.to
      setRangeCompare({ ...rangeCompare, from: date, to: compareToDate })
    } else setRangeCompare({ from: date, to: new Date() })
  }

  const handleCompareToChange = (date: Date) => {
    if (rangeCompare?.from) {
      const compareFromDate = date < rangeCompare.from ? date : rangeCompare.from
      setRangeCompare({ ...rangeCompare, from: compareFromDate, to: date })
    }
  }

  return (
    <Popover modal={true} open={isOpen} onOpenChange={(open: boolean) => { !open && resetValues(); setIsOpen(open) }}>
      <PopoverTrigger asChild>
        <Button size={'sm'} variant='outline'>
          <div className="text-right">
            <div className="py-1">{`${formatDate(range.from, locale)}${range.to != null ? ' - ' + formatDate(range.to, locale) : ''}`}</div>
            {rangeCompare != null && <div className="opacity-60 text-xs -mt-1">vs. {formatDate(rangeCompare.from, locale)}{rangeCompare.to != null ? ` - ${formatDate(rangeCompare.to, locale)}` : ''}</div>}
          </div>
          <div className="pl-1 opacity-60 -mr-2 scale-125">{isOpen ? <ChevronUpIcon width={24} /> : <ChevronDownIcon width={24} />}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
              <CompareToggle showCompare={showCompare} rangeCompare={rangeCompare}  onToggle={handleCompareToggle} />
              <div className="flex flex-col gap-2">
                <DateInputPair fromDate={range.from} toDate={range.to} onFromChange={handleRangeFromChange} onToChange={handleRangeToChange} />
                {rangeCompare != null && <DateInputPair fromDate={rangeCompare.from} toDate={rangeCompare.to} onFromChange={handleCompareFromChange} onToChange={handleCompareToChange} />}
              </div>
            </div>
            <PresetButtons isSmallScreen={isSmallScreen} selectedPreset={selectedPreset} onSelect={(value) =>{ setPreset(value)}} />
            <Calendar mode="range" onSelect={(value: { from?: Date; to?: Date } | undefined) => { if (value?.from) setRange({ from: value.from, to: value.to }) }} selected={range} numberOfMonths={isSmallScreen ? 1 : 2} defaultMonth={new Date(new Date().setMonth(new Date().getMonth() - (isSmallScreen ? 0 : 1)))} />
          </div>
          {!isSmallScreen && <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">{PRESETS.map((preset) => <PresetButton key={preset.name} preset={preset.name} label={preset.label} isSelected={selectedPreset === preset.name} />)}</div>}
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4">
          <Button onClick={() => { setIsOpen(false); resetValues() }} variant="ghost">Cancel</Button>
          <Button onClick={() => { setIsOpen(false); if (!areRangesEqual(range, openedRangeRef.current) || !areRangesEqual(rangeCompare, openedRangeCompareRef.current)) onUpdate?.({ range, rangeCompare }) }}>Update</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = 'DateRangePicker'
DateRangePicker.filePath = 'libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx'