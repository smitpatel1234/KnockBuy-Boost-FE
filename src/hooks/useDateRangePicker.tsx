'use client'
import React, { useCallback } from "react";
import {useState , useEffect  , useRef ,type JSX} from "react";
import type { DateRangePickerProps , DateRange } from '@/types/DateRangePicker.types'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";
import { PRESETS } from '@/data/datePickerConst'
import { cn } from "@/lib/utils";
import { getPresetRange ,areRangesEqual ,getDateAdjustedForTimezone} from "@/utils/helper/DatePickerHelper";
export const useDateRangePicker = ({ 
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)), initialDateTo,initialCompareFrom, initialCompareTo,
}: DateRangePickerProps) => {  
  const [isOpen, setIsOpen] = useState(false)
  const [range, setRange] = useState<DateRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom)
  })
  const setResetValuesFunction = ( )=>{
    let  form : Date | string ,   to : Date  | string  ;
    if(typeof initialDateFrom === 'string')
      form = getDateAdjustedForTimezone(initialDateFrom)
    else
      form = initialDateFrom
    
    if (initialDateTo) {
      if(typeof initialDateTo === 'string'){
        to = getDateAdjustedForTimezone(initialDateTo)
      }else{
        to = initialDateTo
      }}
      else {
        to = form
      }
    return {
      from: form,
      to: to
    }
  }

  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0))
        }: undefined
  )
  const setResetValuesFunctionCompare = ( )=>{
    if (initialCompareFrom) {
      let  form : Date | string ,   to : Date  | string  ;
      if (typeof initialCompareFrom === 'string') 
        form = getDateAdjustedForTimezone(initialCompareFrom)
      else 
        form = initialCompareFrom
      if (initialCompareTo) {
        if (typeof initialCompareTo === 'string') {
           to = getDateAdjustedForTimezone(initialCompareTo)
        } else {
          to = initialCompareTo
        }
      } else {
        to = form
      }
      return {
        from: form,
        to: to
      }
    }
  }

  const openedRangeRef = useRef<DateRange | undefined>(undefined)
  const openedRangeCompareRef = useRef<DateRange | undefined>(undefined)
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    setIsSmallScreen( globalThis.window.innerWidth < 960)
    const handleResize = (): void => {
      setIsSmallScreen(globalThis.window.innerWidth < 960)
    }
    globalThis.window.addEventListener('resize', handleResize)
    return () => {
      globalThis.window.removeEventListener('resize', handleResize)
    }
  }, [])
  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset)
    setRange(range)
    if (rangeCompare) {
      const rangeCompare = {
        from: new Date( range.from.getFullYear() - 1, range.from.getMonth(), range.from.getDate() ),
        to: range.to ? new Date( range.to.getFullYear() - 1, range.to.getMonth(), range.to.getDate() ) : undefined
      }
      setRangeCompare(rangeCompare)
    }
  }

  const checkPreset = useCallback((): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name)

      const normalizedRangeFrom = new Date(range.from);
      normalizedRangeFrom.setHours(0, 0, 0, 0);
      const normalizedPresetFrom = new Date( presetRange.from.setHours(0, 0, 0, 0))
      const normalizedRangeTo = new Date(range.to ?? 0);
      normalizedRangeTo.setHours(0, 0, 0, 0);
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      )

      if ( normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() && normalizedRangeTo.getTime() === normalizedPresetTo.getTime()) {
        setSelectedPreset(preset.name)
         return
      }
    }
    setSelectedPreset(undefined)
  },[range])

  const resetValues = (): void => {
    setRange( setResetValuesFunction())
    setRangeCompare(setResetValuesFunctionCompare())
  }

  useEffect(() => {
    checkPreset()
  }, [range,checkPreset])

  const PresetButton = ({ preset, label, isSelected }: { preset: string, label: string, isSelected: boolean }): JSX.Element => (  

    <Button className={cn(isSelected && 'pointer-events-none')} variant="ghost"  onClick={() => {setPreset(preset) }}>
      <React.Fragment>
        <span className={cn('pr-2 opacity-0', isSelected && 'opacity-70')}>
          <CheckIcon width={18} height={18} />
        </span>
        {label}
      </React.Fragment>
    </Button>
  )
  useEffect(() => {
    if (isOpen) { openedRangeCompareRef.current = rangeCompare }
  }, [isOpen, rangeCompare])
  return {
    isOpen,
    setIsOpen,
    range,
    setRange,
    rangeCompare,
    setRangeCompare,
    selectedPreset,
    isSmallScreen,
    PresetButton,
    areRangesEqual,
    openedRangeRef,
    openedRangeCompareRef,
    resetValues,
    setPreset
  }
}