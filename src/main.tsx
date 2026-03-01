import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import 'highlight.js/styles/github-light.css'; // Importação do estilo highlight.js movida para cá

createRoot(document.getElementById("root")!).render(<App />);