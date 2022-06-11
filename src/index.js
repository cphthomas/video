import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Front from './routes/front';
import Andel from './routes/andel';
import Toandele from './routes/toandele';
import ToandeleTest from './routes/toandele_1';
import Meanraw from './routes/meanraw';
import Mean from './routes/mean';

import Normal from './routes/normal';
import Binomial from './routes/binomial';
import Hypergeo from './routes/hypergeo';
import Poisson from './routes/poisson';
import Chi2 from './routes/chi2';
import Anova from './routes/anova';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="front" element={<Front />} />
        <Route path="andel" element={<Andel />} />
        <Route path="toandele" element={<Toandele />}></Route>
        <Route path="toandele_1" element={<ToandeleTest />}></Route>
        <Route path="meanraw" element={<Meanraw />}></Route>
        <Route path="mean" element={<Mean />}></Route>
        <Route path="normal" element={<Normal />}></Route>
        <Route path="binomial" element={<Binomial />}></Route>
        <Route path="hypergeo" element={<Hypergeo />}></Route>
        <Route path="poisson" element={<Poisson />}></Route>
        <Route path="chi2" element={<Chi2 />}></Route>
        <Route path="anova" element={<Anova />}></Route>
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
