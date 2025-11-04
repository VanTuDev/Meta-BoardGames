import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import PrivateLetter from "./pages/PrivateLetter.jsx";
import CoutRound from "./pages/CoutRound.jsx";
import { I18nProvider } from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<App />} />

          {/* Trang bức thư Huyền Hoàng */}
          <Route path="/private-letter" element={<PrivateLetter />} />

          {/* Trang đếm round */}
          <Route path="/cout-round" element={<CoutRound />} />
          <Route path="/cout-round/:round" element={<CoutRound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>
);
