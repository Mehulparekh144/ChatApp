"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface SidebarIconsProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: any;
  active?: boolean;
}

export default function DesktopSidebarIcons({
  label,
  href,
  onClick,
  icon: Icon,
  active,
}: SidebarIconsProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href ?? "#"}
        className={cn(
          `group flex gap-x-3 rounded-md p-3 text-sm transition leading-6 font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-primary-foreground hover:text-zinc-900 dark:hover:text-zinc-100 ` , active && 'bg-gray-100 dark:bg-primary-foreground dark:text-zinc-100 text-zinc-900'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
