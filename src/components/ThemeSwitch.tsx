"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn

interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className }: ThemeSwitchProps) { // Aceita a prop className
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className={cn("flex items-center space-x-1 justify-center py-2 transition-colors duration-200", className)}> {/* Aplica className e ajusta space-x */}
      <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
  )
}