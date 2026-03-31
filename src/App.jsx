import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Revise from './pages/Revise';
import Practice from './pages/Practice';
import PastPapers from './pages/PastPapers';
import GlossaryPage from './pages/GlossaryPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/revise" element={<Revise />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/pastpapers" element={<PastPapers />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </Layout>
  );
}
