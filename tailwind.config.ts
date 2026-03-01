import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Cores personalizadas para o tema 'Soft Lavender Productivity' (Light Mode)
        'lavender-soft': 'hsl(240 70% 70%)', // Principal tom de lavanda
        'lavender-light': 'hsl(240 70% 90%)', // Lavanda mais claro para fundos de hover/ativo
        'lavender-dark': 'hsl(240 70% 40%)', // Lavanda mais escuro para texto em fundos claros
        'charcoal-dark': 'hsl(222.2 84% 4.9%)', // Cor principal para cabeçalhos/texto
        'gray-medium': 'hsl(215.4 16.3% 46.9%)', // Cor secundária/texto muted
        'canvas-light': 'hsl(0 0% 98%)', // Fundo muito claro para o canvas/palco
        'panel-white': 'hsl(0 0% 100%)', // Branco puro para painéis/cards
        'border-light': 'hsl(214.3 31.8% 91.4%)', // Cinza muito claro para divisores
        // Cores para Callouts
        'callout-tip-border': 'hsl(142.1 76.2% 36.3%)', // Verde suave
        'callout-tip-bg': 'hsl(142.1 76.2% 96.3%)',
        'callout-warning-border': 'hsl(48 96% 50%)', // Laranja suave
        'callout-warning-bg': 'hsl(48 96% 95%)',
        'callout-exercise-border': 'hsl(240 70% 70%)', // Lavender-soft
        'callout-exercise-bg': 'hsl(240 70% 95%)',

        // Cores para o tema Dark (VS Code-like)
        'vscode-bg-global': '#1E1E1E',
        'vscode-bg-sidebar': '#252526',
        'vscode-border-sidebar': '#333333',
        'vscode-text-lesson': '#D4D4D4',
        'vscode-text-heading': '#FFFFFF', // White for headings
        'vscode-menu-active-hover': '#37373D',
        'vscode-text-blue': '#9CDCFE', // For specific blue text if needed
      },
      borderRadius: {
        lg: "12px", // Arredondamento generoso
        md: "8px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;