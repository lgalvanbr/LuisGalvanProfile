import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Portfolio from './pages/Portfolio';
import LGI from './pages/LGI';
import LgiAI from './pages/LgiAI';
import LgiSolar from './pages/LgiSolar';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/lgi" element={<LGI />} />
          <Route path="/ia" element={<LgiAI />} />
          <Route path="/ai" element={<LgiAI />} />
          <Route path="/solar" element={<LgiSolar />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
