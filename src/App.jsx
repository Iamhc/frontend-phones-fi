import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-6xl px-6 py-16">
              <p className="text-ink2">Page not found.</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}
