"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function Combobox({name}:{name:string}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white border-slate-300  transition-colors"
            name={name}
          >
            <span className={value ? "text-gray-900" : "text-gray-500"}>
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework..."}
            </span>
            <ChevronsUpDown className={cn("ml-2 h-4 w-4 shrink-0", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 shadow-lg border-slate-200">
          <Command>
            <CommandInput 
              placeholder="Search framework..." 
              className="h-9 border-b border-slate-200" 
            />
            <CommandList>
              <CommandEmpty className="py-4 text-center text-sm text-gray-500">
                No framework found.
              </CommandEmpty>
              <CommandGroup className="p-1">
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="cursor-pointer hover:bg-blue-50 rounded px-2 py-1.5"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100 text-blue-600" : "opacity-0"
                      )}
                    />
                    <span className={value === framework.value ? "font-semibold text-blue-600" : ""}>
                      {framework.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
