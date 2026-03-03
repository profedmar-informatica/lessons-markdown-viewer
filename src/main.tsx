import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/styles/base16/vscode-dark-plus.css'; // Importar o tema do highlight.js aqui

createRoot(document.getElementById("root")!).render(<App />);