"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn

interface ThemeSwitchProps {
  className?: string;
  scale?: number; // Adicionar a prop scale
}

export function ThemeSwitch({ className, scale = 1 }: ThemeSwitchProps) { // Aceita a prop className e scale
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div 
      className={cn("flex items-center space-x-1 justify-center p-5 transition-colors duration-200", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }} // Aplicar a escala via estilo inline
    >
      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
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