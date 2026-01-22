"use client"

import { type LucideIcon } from "lucide-react"
import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  handleClick,
  numnotification,
  setnumnotification
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
   

  }[]
  numnotification: number
  setnumnotification: React.Dispatch<React.SetStateAction<number>>
  handleClick: (url: string) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
   
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => { if(item.title=='Orders') setnumnotification(0); handleClick(item.url);  }}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
       

                {numnotification > 0 && item.title=='Orders' && <span className="absolute  top-2 right-2 pb-1 pl-0.3 h-3 w-3 rounded-full flex items-center justify-center  text-xs ml-auto bg-destructive bg-red font-light text-xs text-white font-serif ">{numnotification}</span>}

              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
