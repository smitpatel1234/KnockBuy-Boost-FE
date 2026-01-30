"use client";
import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  BoxesIcon,
  GalleryHorizontalEndIcon
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUserProfile } from "@/redux/features/auth-slice";
import PopUp from "./molecules/PopUp";


const data = {

  navMain: [
    {
      title: "Orders",
      url: "/adminLogin/admin/order",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Category",
      url: "/adminLogin/admin/category",
      icon: BoxesIcon,
    },
    {
      title: "Products",
      url: "/adminLogin/admin/item",
      icon: ListIcon,
    },
    {
      title: "Discount",
      url: "/adminLogin/admin/discount",
      icon: BarChartIcon,
    },
     {
      title: "Varient",
      url: "/adminLogin/admin/varient",
      icon: GalleryHorizontalEndIcon,
    },
    {
      title: "User",
      url: "/adminLogin/admin/user",
      icon: UsersIcon,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/adminLogin/admin/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/adminLogin/admin/help",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "/adminLogin/admin/search",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const user = useAppSelector((store)=>(store.auth.user))
  const dispatch = useAppDispatch()
  React.useEffect(()=>{
  
    void dispatch(fetchUserProfile());
  },[dispatch])
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (

    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/adminLogin/admin/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <PopUp/>
        <NavMain items={data.navMain} handleClick={handleClick} numnotification={props.numnotification} setnumnotification={props.setnumnotification}  />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
