import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/lib/styles/github-light.css'; // Caminho corrigido para o estilo highlight.js

createRoot(document.getElementById("root")!).render(<App />);