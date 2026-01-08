"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectItem {
  item_id: string
  item_name: string
}

interface MultiSelectProps {
  items: MultiSelectItem[]
  value: MultiSelectItem[]
  onChange: (value: MultiSelectItem[]) => void
  placeholder?: string
}

export function MultiSelectVirtual({
  items,
  value,
  onChange,
  placeholder = "Select items",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!search) return items
    return items.filter((item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search])

  const isSelected = (id: string) =>
    value.some((v) => v.item_id === id)

  const toggleItem = (item: MultiSelectItem) => {
    if (isSelected(item.item_id)) {
      onChange(value.filter((v) => v.item_id !== item.item_id))
    } else {
      onChange([...value, item])
    }
  }
  const removeItem = (item_id: string) => {
    const filteredItems = value.filter((item) => item.item_id != item_id)
    onChange(filteredItems)
  }


  return (
    <div className="space-y-4">
      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <div
            key={item.item_id}
            className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
          >
            {item.item_name}
            <button
              onClick={() => { removeItem(item.item_id); }}
              className="ml-1 rounded-sm p-0.5 hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search items..."
              value={search}
              onValueChange={setSearch}
            />
            {filteredItems.length === 0 && (
              <CommandEmpty>
                {search ? "No items found." : "No items available."}
              </CommandEmpty>
            )}

            {filteredItems.length > 0 && (
              <CommandGroup className="max-h-60 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.item_id}
                    className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm hover:bg-accent rounded"
                    onClick={() => { toggleItem(item); }}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        isSelected(item.item_id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span className="truncate">{item.item_name}</span>
                  </div>
                ))}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>


    </div>
  )
}
