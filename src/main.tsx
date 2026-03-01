import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/styles/github.css'; // Caminho corrigido para o estilo padrão do GitHub

createRoot(document.getElementById("root")!).render(<App />);