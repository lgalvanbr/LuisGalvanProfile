import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Portfolio from './pages/Portfolio';
import LGI from './pages/LGI';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/lgi" element={<LGI />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
