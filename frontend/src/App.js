import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Experience from "./pages/Experience";

const ComingSoon = ({ title }) => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingLeft: 44 }}>
    <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 11, fontWeight: 300, letterSpacing: '0.3em', opacity: 0.3 }}>
      {title} — COMING SOON
    </p>
  </div>
);

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Experience />} />
              <Route path="/gallery" element={<ComingSoon title="GALLERY" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
