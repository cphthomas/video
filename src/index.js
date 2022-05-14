import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Front from './routes/front';
import Andel from './routes/andel';
import Toandele from './routes/toandele';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="front" element={<Front />} />
        <Route path="andel" element={<Andel />} />
        <Route path="toandele" element={<Toandele />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>Intet indhold på denne side!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
