import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import CursorEffect from "./components/CursorEffect";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogGenZ from "./pages/BlogGenZ";
import BlogSkinFirst from "./pages/BlogSkinFirst";
import BlogAIBeauty from "./pages/BlogAIBeauty";

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
      <CursorEffect />
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Blogs />} />
              <Route path="/blog/gen-z-beauty" element={<BlogGenZ />} />
              <Route path="/blog/skin-first-revolution" element={<BlogSkinFirst />} />
              <Route path="/blog/ai-beauty-retail" element={<BlogAIBeauty />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cv-request" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
