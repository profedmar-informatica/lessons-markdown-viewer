import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/styles/vs2015.css'; // Caminho de importação corrigido para vs2015.css

createRoot(document.getElementById("root")!).render(<App />);