import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/styles/vscode-dark-plus.css'; // Caminho de importação corrigido

createRoot(document.getElementById("root")!).render(<App />);