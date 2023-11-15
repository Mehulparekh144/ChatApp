"use client";
import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import DesktopSidebarIcons from "./DesktopSidebarIcons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { HiMoon } from "react-icons/hi";
import { HiMiniSun } from "react-icons/hi2";
import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";

interface DesktopSidebarProps {
  currentUser: User;
}

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between h-full items-center">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopSidebarIcons
              key={item.label}
              active={item.active}
              icon={item.icon}
              onClick={item.onClick}
              label={item.label}
              href={item.href}
            />
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4">
          <Button
            size={"icon"}
            onClick={
              theme === "light"
                ? () => setTheme("dark")
                : () => setTheme("light")
            }
          >
            {theme === "light" ? (
              <HiMoon className="h-5 w-5" />
            ) : (
              <HiMiniSun className="h-5 w-5" />
            )}
          </Button>
          <UserAvatar user={currentUser}/>
        </div>
      </nav>
    </div>
  );
}
